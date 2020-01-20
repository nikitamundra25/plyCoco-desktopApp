import React, { useEffect, useState, FunctionComponent } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Collapse,
  Input,
  Row,
  Col,
  FormGroup,
  Form,
  Label
} from "reactstrap";
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
import { NoSearchFound } from "../../common/SearchFilter/NoSearchFound";
import AddRegion from "./AddRegion";

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
  const [searchValues, setSearchValues] = useState<ISearchValues | null>({
    searchValue: "",
    sortBy: { label: "Newest", value: "1" }
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // To get emplyee list from db
  const [fetchRegionList, { data, loading }] = useLazyQuery<any>(GET_REGIONS);

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
        searchBy !== "" || isActive !== undefined || sortBy !== undefined
      );
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
        <div className="add-region-wrap">
          <Button
            color={"primary"}
            className={"btn-add"}
            id={"add-new-pm-tooltip"}
            onClick={toggle}
          >
            <i className={"fa fa-plus"} />
            &nbsp; {languageTranslation("ADD_NEW_REGION_BUTTON")}
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Collapse isOpen={isOpen} className="region-input-section">
          <AddRegion />
          {/* <Form onSubmit={handleSubmit} className="form-section">
            <FormGroup>
              <Row>
                <Col sm="3">
                  <Label className="form-label col-form-label ">
                    {languageTranslation("REGION_NAME_OF_REGION_LABEL")}
                    <span className="required">*</span>
                  </Label>
                </Col>
                <Col sm="7">
                  <Input
                    type="text"
                    name={"regionName"}
                    placeholder={languageTranslation(
                      "REGION_NAME_OF_REGION_PLACEHOLDER"
                    )}
                    onChange={handleChange}
                    maxLength="30"
                    onBlur={handleBlur}
                    value={regionName}
                    className={
                      errors.regionName && touched.regionName
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.regionName && touched.regionName && (
                      <div className="required-error">{errors.regionName}</div>
                    )}
                </Col>
                <Col sm="2">
                  <Button
                    color={"primary"}
                    // disabled={isSubmitting}
                    className={"btn-region"}
                    onClick={handleSubmit}
                  >
                    {isSubmitting === true ? (
                      <i className="fa fa-spinner fa-spin loader" />
                    ) : (
                      ""
                    )}
                    {languageTranslation("SAVE_BUTTON")}
                  </Button>
                </Col>
              </Row>
            </FormGroup>

            <div className="d-flex align-items-center justify-content-between">
              <div className="mandatory-text">
                {languageTranslation("REQUIRED_FIELDS")}
              </div>
            </div>
          </Form> */}
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
            ) : data &&
              data.getRegions &&
              data.getRegions.regionData &&
              data.getRegions.regionData.length ? (
              data.getRegions.regionData.map((region: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{count++}</td>
                    <td>{region.regionName}</td>
                    <td className="text-center">0</td>
                    <td className="text-center">0</td>
                    <td className="text-center">0</td>
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
            ) : (
              <tr className={"text-center no-hover-row"}>
                <td colSpan={5} className={"pt-5 pb-5"}>
                  {isFilterApplied ? (
                    <NoSearchFound />
                  ) : (
                    <div className="no-data-section">
                      <div className="no-data-icon">
                        <i className="icon-ban" />
                      </div>
                      <h4 className="mb-1">
                        Currently there are no employee Added.{" "}
                      </h4>
                      <p>Please click above button to add new. </p>
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
          />
        ) : null}
      </CardBody>
    </Card>
  );
};

export default Region;
