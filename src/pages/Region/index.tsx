import React, { useEffect, useState, FunctionComponent } from "react";

import { Button, Card, CardHeader, CardBody, Table } from "reactstrap";
import { AppRoutes, PAGE_LIMIT } from "../../config";
import { useHistory, useLocation } from "react-router";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import Search from "../../common/SearchFilter";
import { languageTranslation, logger } from "../../helpers";
import { RegionQueries } from "../../queries/Region";
import { ISearchValues } from "../../interfaces";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import * as qs from "query-string";
import { FormikHelpers, FormikProps, Formik } from "formik";
import PaginationComponent from "../../common/Pagination";

const [, GET_REGIONS] = RegionQueries;

const sortFilter: any = {
  3: "name",
  4: "name-desc",
  2: "oldest",
  1: "newest"
};

export const Region: FunctionComponent = () => {
  let history = useHistory();
  const { search, pathname } = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // To get emplyee list from db
  const [fetchRegionList, { data, loading }] = useLazyQuery<any>(GET_REGIONS);
  console.log("data", data);

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
      sortBy.label = "Sort by A-Z";
    }
    if (sortByValue === "4") {
      sortBy.label = "Sort by Z-A";
    }
    if (sortByValue === "2") {
      sortBy.label = "Sort by Oldest";
    }
    if (sortByValue === "1") {
      sortBy.label = "Sort by Newest";
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
        : "";
      setSearchValues({
        searchValue: searchBy,
        sortBy
      });
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    fetchRegionList({
      variables: {
        searchBy,
        sortBy: sortByValue ? parseInt(sortByValue) : 0,
        limit: PAGE_LIMIT,
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
    // if (isActive && isActive.value !== '') {
    //   params.status = isActive.value === 'true' ? 'active' : 'deactive';
    // }
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
  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <Button
          color={"primary"}
          className={"btn-add"}
          id={"add-new-pm-tooltip"}
          onClick={() => {
            history.push(AppRoutes.ADD_REGION);
          }}
        >
          <i className={"fa fa-plus"} />
          &nbsp; {languageTranslation("ADD_NEW_REGION_BUTTON")}
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          <Formik
            initialValues={values}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            children={(props: FormikProps<ISearchValues>) => (
              <Search {...props} label={"region"} />
            )}
          />
          {/* <Search /> */}
        </div>
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th>S no.</th>
              <th>{languageTranslation("REGION_NAME")}</th>
              <th className="text-center">
                {languageTranslation("NUMBER_OF_CANSTITUTION")}
              </th>
              <th className="text-center">
                {languageTranslation("NUMBER_OF_CARE_GIVERS")}
              </th>
              <th className="text-center">
                {languageTranslation("CURRENT_ONGOING_APPOINTMENTS_COUNTER")}
              </th>
              {/* <th className="text-center">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <p>Loading ...</p>
            ) : (
              data &&
              data.getRegions &&
              data.getRegions.regionData &&
              data.getRegions.regionData.map((region: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{count++}</td>
                    <td>{region.regionName}</td>
                    <td className='text-center'>0</td>
                    <td className='text-center'>0</td>
                    <td className='text-center'>0</td>
                    {/* <td>
                    <div className="action-btn">
                      <ButtonTooltip
                        id={`careGiverDelete${index}`}
                        message={languageTranslation("REGION_DELETE")}
                      >
                        <i className="fa fa-trash"></i>
                      </ButtonTooltip>
                    </div>
                  </td> */}
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
        {data && data.getRegions && data.getRegions.totalCount && (
          <PaginationComponent
            totalRecords={data.getRegions.totalCount}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Region;
