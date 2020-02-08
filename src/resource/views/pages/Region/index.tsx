import React, { useEffect, useState, FunctionComponent } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Collapse
} from "reactstrap";
import { useHistory, useLocation } from "react-router";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../../routes/routes";
import Search from "../../components/SearchFilter";
import { languageTranslation, logger } from "../../../../helpers";
import { RegionQueries } from "../../../../graphql/queries/Region";
import { ISearchValues } from "../../../../interfaces";
import { useLazyQuery } from "@apollo/react-hooks";
import * as qs from "query-string";
import { FormikHelpers, FormikProps, Formik } from "formik";
import PaginationComponent from "../../components/Pagination";
import { NoSearchFound } from "../../components/SearchFilter/NoSearchFound";
import AddRegion from "./AddRegion";
import moment from "moment";
import Loader from "../../containers/Loader/Loader";
import { sortFilter } from "../../../../config";

const [, GET_REGIONS] = RegionQueries;

const pageLimit: number = 25;

export const Region: FunctionComponent = () => {
  let history = useHistory();
  const { search, pathname } = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>({
    searchValue: "",
    sortBy: { label: "Newest", value: "1" }
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // To get emplyee list from db
  const [fetchRegionList, { data, loading, called, refetch }] = useLazyQuery<
    any
  >(GET_REGIONS, {
    fetchPolicy: "no-cache"
  });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const query = qs.parse(search);
    let searchBy: string = "";
    let sortBy: any = { label: "", value: "" };
    // To handle display and query param text
    let sortByValue: any = Object.keys(sortFilter).find(
      (key: any) => sortFilter[key] === query.sortBy
    );
    logger(sortByValue);
    logger(typeof sortByValue);
    if (sortByValue === "3") {
      sortBy.label = "A-Z";
    }
    if (sortByValue === "4") {
      sortBy.label = "Z-A";
    }
    if (sortByValue === "2") {
      sortBy.label = "Oldest";
    }
    if (sortByValue === "1") {
      sortBy.label = "Newest";
    }
    if (query) {
      searchBy = query.search ? (query.search as string) : "";
      sortBy = sortByValue
        ? {
            ...sortBy,
            value:
              Object.keys(sortFilter).find(
                (key: any) => sortFilter[key] === query.sortBy
              ) || ""
          }
        : { label: "Newest", value: "1" };
      setSearchValues({
        searchValue: searchBy,
        sortBy
      });
      setIsFilter(
        searchBy !== "" ||
          query.status !== undefined ||
          query.sortBy !== undefined
      );
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    fetchRegionList({
      variables: {
        searchBy,
        sortBy: sortByValue ? parseInt(sortByValue) : 0,
        limit: pageLimit,
        page: query.page ? parseInt(query.page as string) : 1,
        isActive: query.status
          ? query.status === "active"
            ? { label: "Active", value: "true" }
            : { label: "Deactive", value: "false" }
          : ""
      }
    });
  }, [search]); // It will run when the search value gets changed

  const handleSubmit = async (
    { searchValue, isActive, sortBy }: ISearchValues,
    { setSubmitting }: FormikHelpers<ISearchValues>
  ) => {
    let params: {
      [key: string]: any;
    } = {};
    params.page = 1;
    if (searchValue) {
      params.search = searchValue;
    }
    if (sortBy && sortBy.value !== "") {
      params.sortBy = sortBy.value !== "" ? sortFilter[sortBy.value] : "";
    }
    const path = [pathname, qs.stringify(params)].join("?");
    history.push(path);
    logger("path", path);
  };

  const onPageChanged = (currentPage: number) => {
    logger("onPageChanged", currentPage);
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      "?"
    );
    history.push(path);
  };

  const {
    searchValue = "",
    sortBy = undefined,
    isActive = undefined
  } = searchValues ? searchValues : {};

  const values: ISearchValues = {
    searchValue,
    isActive,
    sortBy
  };
  let count = (currentPage - 1) * pageLimit + 1;
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <div>
          <Button
            color={!isOpen ? "primary" : "danger"}
            className={"btn-add"}
            id={"add-new-pm-tooltip"}
            onClick={toggle}
          >
            {!isOpen ? (
              <>
                <i className={"fa fa-plus"} />
                &nbsp; {languageTranslation("ADD_NEW_REGION_BUTTON")}
              </>
            ) : (
              languageTranslation("CANCEL")
            )}
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Collapse isOpen={isOpen} className="region-input-section">
          <AddRegion toggle={toggle} refetch={refetch} />
        </Collapse>
        <div>
          <Formik
            initialValues={values}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            children={(props: FormikProps<ISearchValues>) => (
              <Search {...props} label={"region"} />
            )}
          />
        </div>
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="sno-th-column text-center">
                {languageTranslation("S_NO")}
              </th>
              <th className="region-th-column">
                {languageTranslation("REGION_NAME")}
              </th>
              <th className="text-center">
                {languageTranslation("NUMBER_OF_CANSTITUTION")}
              </th>
              <th className="text-center">
                {languageTranslation("NUMBER_OF_CARE_GIVERS")}
              </th>
              <th className="text-center">
                {languageTranslation("CURRENT_ONGOING_APPOINTMENTS_COUNTER")}
              </th>
              <th className="date-th-column">
                {languageTranslation("CREATED_DATE")}
              </th>
              {/* <th className="text-center">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {!called || loading ? (
              <tr>
                <td className={"table-loader"} colSpan={6}>
                  <Loader />
                </td>
              </tr>
            ) : data &&
              data.getRegions &&
              data.getRegions.regionData &&
              data.getRegions.regionData.length ? (
              data.getRegions.regionData.map((region: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="sno-th-column text-center">{count++}</td>
                    <td className="text-capitalize">{region.regionName}</td>
                    <td className="text-center">0</td>
                    <td className="text-center">0</td>
                    <td className="text-center">0</td>
                    <td className="date-th-column ">
                      {region && region.createdAt
                        ? moment(region.createdAt).format("lll")
                        : ""}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className={"text-center no-hover-row"}>
                <td colSpan={6} className={"pt-5 pb-5"}>
                  {isFilterApplied ? (
                    <NoSearchFound />
                  ) : (
                    <div className="no-data-section">
                      <div className="no-data-icon">
                        <i className="icon-ban" />
                      </div>
                      <h4 className="mb-1">
                        Currently there are no regions added.{" "}
                      </h4>
                      <p>Please click above button to add new.</p>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {data && data.getRegions && data.getRegions.totalCount ? (
          <PaginationComponent
            totalRecords={data.getRegions.totalCount}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            pageLimit={pageLimit}
          />
        ) : null}
      </CardBody>
    </Card>
  );
};

export default Region;
