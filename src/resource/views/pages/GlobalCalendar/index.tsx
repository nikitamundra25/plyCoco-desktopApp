import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody } from "reactstrap";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../../routes/routes";
// import { AppRoutes } from "../../../../config";
import { languageTranslation } from "../../../../helpers";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
// import { useHistory } from "react-router-dom";
import { ICountries, IStates, IState } from "../../../../interfaces";
import { CountryQueries } from "../../../../graphql/queries";
import CalendarView from "./CalendarView";
import AddHolidays from "./AddHolidays";

const GlobalCalendar: FunctionComponent = (): JSX.Element => {
  const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;
  // initial states
  const [states, setStates] = useState<IState[]>([]);
  // fech country list
  const { data: allCountries, loading: countriesLoading } = useQuery<
    ICountries
  >(GET_COUNTRIES);
  // To fetch the states of selected contry & don't want to query on initial load
  const [
    getStatesByCountry,
    { data: statesData, loading: statesLoading }
  ] = useLazyQuery<IStates>(GET_STATES_BY_COUNTRY);
  // check if companies are loaded
  useEffect(() => {
    // check if allCountries are set
    if (allCountries) {
      const { countries: resCountries } = allCountries;
      // get index of Germany for initial load
      const germenyIndex: number = resCountries.findIndex(
        d => d.name.toLowerCase() === "Germany".toLowerCase()
      );
      if (germenyIndex > -1) {
        // get states of Germany
        getStatesByCountry({
          variables: {
            countryid: (resCountries as any)[germenyIndex].id
          }
        });
      }
    }
  }, [countriesLoading, allCountries]);
  // handles the state data
  useEffect(() => {
    if (statesData && !statesLoading) {
      setStates(statesData.states);
    }
  }, [statesData, statesLoading]);
  // handle add modal
  const [showAddModal, setAddModal] = useState<boolean>(false);

  // returns JSX
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <Button
          color={"primary"}
          className={"btn-add"}
          id={"add-new-pm-tooltip"}
          onClick={() => setAddModal(true)}
        >
          <i className={"fa fa-refresh"} />
          &nbsp;{languageTranslation("UPDATE_CALEDAR")}
        </Button>
      </CardHeader>
      <CardBody>
        <CalendarView
          isLoading={statesLoading || countriesLoading}
          states={states}
        />
        {/*  */}
        <AddHolidays
          isOpen={showAddModal}
          handleClose={() => setAddModal(false)}
          states={states}
        />
      </CardBody>
    </Card>
  );
};

export default GlobalCalendar;
