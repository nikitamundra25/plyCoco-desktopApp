import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Card, CardHeader, CardBody } from "reactstrap";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../../routes/routes";
import { languageTranslation } from "../../../../helpers";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import {
  ICountries,
  IStates,
  IState,
  IAddHolidaysFormValues
} from "../../../../interfaces";
import { CountryQueries } from "../../../../graphql/queries";
import CalendarView from "./CalendarView";
import AddHolidays from "./AddHolidays";
import UpdateWeekends from "./UpdateWeekends";

let refreshList: any = undefined;
const GlobalCalendar: FunctionComponent<{}> = (): JSX.Element => {
  const [GET_COUNTRIES, , GET_STATES_BY_COUNTRY] = CountryQueries;
  // initial states
  const [states, setStates] = useState<IState[]>([]);
  const defaultEditInfo: IAddHolidaysFormValues = {
    date: ""
  };
  const [editInfo, setEditInfo] = useState<IAddHolidaysFormValues>(
    defaultEditInfo
  );
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
      const countryIds: string[] = resCountries.findInfo(
        "sortname",
        ["AT", "DE"],
        "id"
      );
      if (countryIds.length) {
        // get states of Germany
        getStatesByCountry({
          variables: {
            countryid: countryIds
          }
        });
      }
    }
  }, [countriesLoading, allCountries]);
  // handles the state data
  useEffect(() => {
    if (statesData && !statesLoading && statesData.statesByIds) {
      setStates(statesData.statesByIds);
    }
  }, [statesData, statesLoading]);
  // editCalendar
  const editHoliday = (details: IAddHolidaysFormValues): void => {
    setEditInfo(details);
    setAddModal(true);
  };
  // handle add modal
  const [showAddModal, setAddModal] = useState<boolean>(false);
  // handle add modal
  const [showWeekendModal, setShowWeekendModal] = useState<boolean>(false);
  // returns JSX
  const isLoading: boolean = statesLoading || countriesLoading;

  return (
    <Card>
      <CardHeader className="global-calendar-header">
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <Button
          color={"primary"}
          className={"btn-add"}
          onClick={() => (isLoading ? undefined : setAddModal(true))}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fa fa-spinner fa-spin mr-2" />
          ) : (
            <i className={"fa fa-plus"} />
          )}
          &nbsp;{languageTranslation("UPDATE_CALEDAR")}
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          color={"primary"}
          className={"btn-add"}
          onClick={() => (isLoading ? undefined : setShowWeekendModal(true))}
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fa fa-spinner fa-spin mr-2" />
          ) : (
            <i className={"fa fa-refresh"} />
          )}
          &nbsp;{languageTranslation("UPDATE_WEEKENDS")}
        </Button>
      </CardHeader>
      <CardBody>
        <CalendarView
          isLoading={isLoading}
          states={states}
          refresh={(refetch: (variables?: any) => void): void => {
            if (!refreshList) {
              refreshList = refetch;
            }
          }}
          onEdit={editHoliday}
        />
        {/*  */}
        <AddHolidays
          isOpen={showAddModal}
          handleClose={() => {
            setEditInfo(defaultEditInfo);
            setAddModal(false);
          }}
          states={states}
          refresh={refreshList}
          editInfo={editInfo}
        />
        <UpdateWeekends
          isOpen={showWeekendModal}
          handleClose={() => {
            setShowWeekendModal(false);
          }}
          states={states}
          refresh={refreshList}
        />
      </CardBody>
    </Card>
  );
};

export default GlobalCalendar;
