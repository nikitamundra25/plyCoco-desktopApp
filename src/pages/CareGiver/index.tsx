import React, {
  Component,
  FunctionComponent,
  useState,
  useEffect
} from "react";
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  CardGroup,
  Container,
  Input,
  Col,
  Row,
  Form,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";
import { pullAllBy } from "lodash";
import * as qs from "query-string";
import { AppRoutes, PAGE_LIMIT } from "../../config";
import { RouteComponentProps, useLocation, useHistory } from "react-router";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import Search from "../../common/SearchFilter";
import ButtonTooltip from "../../common/Tooltip/ButtonTooltip";
import { languageTranslation } from "../../helpers";
import {
  GET_CAREGIVERS,
  DELETE_CAREGIVER,
  UPDATE_CARE_GIVER_STATUS
} from "../../queries/CareGiver";
import {
  ISearchValues,
  IReactSelectInterface,
  ICareGiver,
  IObjectType
} from "../../interfaces";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { FormikHelpers, Formik, FormikProps } from "formik";
import { ConfirmBox } from "../../common/ConfirmBox";
import PaginationComponent from "../../common/Pagination";
import Loader from "../../containers/Loader/Loader";
import { NoSearchFound } from "../../common/SearchFilter/NoSearchFound";
import { toast } from "react-toastify";
import moment from "moment";

const sortFilter: IObjectType = {
  3: "name",
  4: "name-desc",
  2: "oldest",
  1: "newest"
};
let toastId: any = "";

const CareGiver: FunctionComponent = () => {
  let history = useHistory();
  const { search, pathname } = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);

  // To get care giver list from db
  const [fetchCareGiverList, { data, loading }] = useLazyQuery<any, any>(
    GET_CAREGIVERS
  );

  // Mutation to update care giver status
  const [updateEmployeeStatus] = useMutation<
    { updateCareGiverStatus: any },
    { id: string; isActive: boolean }
  >(UPDATE_CARE_GIVER_STATUS);

  useEffect(() => {
    const query = qs.parse(search);
    let searchBy: string = "";
    let sortBy: IReactSelectInterface | undefined = { label: "", value: "" };
    let isActive: IReactSelectInterface | undefined = { label: "", value: "" };
    // To handle display and query param text
    let sortByValue: string | undefined = "1";
    if (query.sortBy) {
      sortByValue = Object.keys(sortFilter).find(
        (key: string) => sortFilter[key] === query.sortBy
      );
    }
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
              ) || "1"
          }
        : { label: "Newest", value: "1" };
      isActive = query.status
        ? query.status === "active"
          ? { label: languageTranslation("ACTIVE"), value: "true" }
          : { label: languageTranslation("DISABLE"), value: "false" }
        : { label: "", value: "" };
      setSearchValues({
        searchValue: searchBy,
        sortBy,
        isActive
      });
      setIsFilter(
        searchBy !== "" ||
          query.status !== undefined ||
          query.sortBy !== undefined
      );
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    fetchCareGiverList({
      variables: {
        searchBy,
        sortBy: sortByValue ? parseInt(sortByValue) : 0,
        limit: PAGE_LIMIT,
        page: query.page ? parseInt(query.page as string) : 1,
        isActive: query.status
          ? query.status === "active"
            ? "true"
            : "false"
          : ""
      }
    });
  }, [search]); // It will run when the search value gets changed

  const {
    searchValue = "",
    sortBy = undefined,
    isActive = undefined
  } = searchValues ? searchValues : {};

  // Mutation to delete care giver
  const [deleteCaregiver, { error }] = useMutation<
    { deleteCaregiver: any },
    { id: number }
  >(DELETE_CAREGIVER, {
    update(cache, { data: { deleteCareGiver } }: any) {
      console.log(data, "data");
      let caregiverData: any = cache.readQuery({
        query: GET_CAREGIVERS,
        variables: {
          page: currentPage,
          isActive: isActive ? isActive.value : "",
          sortBy: sortBy && sortBy.value ? parseInt(sortBy.value) : 0,
          searchBy: searchValue ? searchValue : "",
          limit: PAGE_LIMIT
        }
      });
      const id: any = deleteCareGiver ? deleteCareGiver.id : "";

      const newCareGiver = caregiverData.getCaregivers.result.filter(
        (caregiver: any) => caregiver.id !== id
      );

      const updatedData = {
        ...caregiverData,
        getCaregivers: {
          ...caregiverData.getCaregivers,
          result: newCareGiver,
          totalCount: newCareGiver.length
        }
      };

      cache.writeQuery({
        query: GET_CAREGIVERS,
        variables: {
          page: currentPage,
          isActive: isActive ? isActive.value : "",
          sortBy: sortBy && sortBy.value ? parseInt(sortBy.value) : 0,
          searchBy: searchValue ? searchValue : "",
          limit: PAGE_LIMIT
        },
        data: updatedData
      });
    }
  });

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
    if (isActive && isActive.value !== "") {
      params.status = isActive.value === "true" ? "active" : "disable";
    }
    if (sortBy && sortBy.value !== "") {
      params.sortBy = sortBy.value !== "" ? sortFilter[sortBy.value] : "";
    }
    const path = [pathname, qs.stringify(params)].join("?");
    history.push(path);
  };

  const onPageChanged = (currentPage: number) => {
    console.log("currentpge in opc", currentPage);

    const query = qs.parse(search);
    console.log("query", query);

    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      "?"
    );
    history.push(path);
  };

  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_CAREGIVER_DELETE_MSG")
    });
    if (!value) {
      return;
    } else {
      await deleteCaregiver({
        variables: {
          id: parseInt(id)
        }
      });
      if (!toast.isActive(toastId)) {
        toastId = toast.success("Care giver deleted successfully.");
      }
    }
  };

  const onStatusUpdate = async (id: string, status: boolean) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation(
        status
          ? "CONFIRM_CAREGIVER_STATUS_ACTIVATE_MSG"
          : "CONFIRM_CAREGIVER_STATUS_DISABLED_MSG"
      )
    });
    if (!value) {
      return;
    } else {
      try {
        toast.dismiss();
        await updateEmployeeStatus({
          variables: {
            id,
            isActive: status
          }
        });
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation("CAREGIVER_STATUS_UPDATE_MSG")
          );
        }
      } catch (error) {
        const message = error.message
          .replace("SequelizeValidationError: ", "")
          .replace("Validation error: ", "")
          .replace("GraphQL error: ", "");
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  const values: ISearchValues = {
    searchValue,
    isActive,
    sortBy
  };
  console.log("current page", currentPage);

  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  return (
    <Row className="m-0">
      <Col xs={"12"} lg={"12"} className="p-0">
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
            <Button
              color={"primary"}
              className={"btn-add"}
              id={"add-new-pm-tooltip"}
              onClick={() => history.push(AppRoutes.ADD_CARE_GIVER)}
            >
              <i className={"fa fa-plus"} />
              &nbsp; Add New Care Giver
            </Button>
          </CardHeader>
          <CardBody>
            <div>
              <Formik
                initialValues={values}
                enableReinitialize={true}
                onSubmit={handleSubmit}
                children={(props: FormikProps<ISearchValues>) => (
                  <Search
                    {...props}
                    searchPlacholderText={languageTranslation(
                      "SEARCH_CAREGIVER_PLACEHOLDER"
                    )}
                  />
                )}
              />
            </div>

            <Table bordered hover responsive>
              <thead className="thead-bg">
                <tr>
                  {/* <th>
                  <div className='table-checkbox-wrap'>
                    <div className='btn-group btn-check-action-wrap'>
                      <span className='btn'>
                        <span className='checkboxli checkbox-custom checkbox-default'>
                          <input type='checkbox' id='checkAll' className='' />
                          <label className=''></label>
                        </span>
                      </span>
                      <UncontrolledDropdown className='custom-dropdown'>
                        <DropdownToggle caret color='link' />
                        <DropdownMenu>
                          <DropdownItem>Delete</DropdownItem>
                          <DropdownItem>
                            {languageTranslation('ACTIVE')}
                          </DropdownItem>
                          <DropdownItem>Disable</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </th> */}
                  <th className={"text-center"}>
                    {languageTranslation("S_NO")}
                  </th>
                  <th>{languageTranslation("TABEL_HEAD_CG_INFO")}</th>
                  <th>{languageTranslation("TABEL_HEAD_CG_QUALIFICATION")}</th>
                  <th>{languageTranslation("TABEL_HEAD_CG_REGION")}</th>
                  <th>{languageTranslation("TABEL_HEAD_CG_APPLYING_AS")}</th>
                  <th>{languageTranslation("CREATED_DATE")}</th>
                  <th className={"text-center"}>
                    {languageTranslation("TABEL_HEAD_CG_STATUS")}
                  </th>
                  <th className={"text-center"}>
                    {languageTranslation("TABEL_HEAD_CG_ACTION")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className={"table-loader"} colSpan={7}>
                      <Loader />
                    </td>
                  </tr>
                ) : data &&
                  data.getCaregivers &&
                  data.getCaregivers.result &&
                  data.getCaregivers.result.length ? (
                  data.getCaregivers.result.map(
                    (careGiverData: any, index: number) => {
                      const replaceObj: any = {
                        ":id": careGiverData.id,
                        ":userName": careGiverData.userName
                      };
                      return (
                        <tr key={index}>
                          <td className={"text-center"}>
                            <div className="table-checkbox-wrap">
                              <div className="btn-group btn-check-action-wrap">
                                {/* <span className='btn'>
                                  <span className='checkboxli checkbox-custom checkbox-default'>
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                </span> */}
                                <span className="checkbox-no">{count++}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="info-column">
                              <div className="description-column">
                                <div className="info-title">{`${careGiverData.salutation} ${careGiverData.firstName} ${careGiverData.lastName}`}</div>
                                <p className="description-text">
                                  <i className="fa fa-envelope mr-2"></i>
                                  <span className="align-middle">
                                    {careGiverData.email}
                                  </span>
                                </p>
                                {careGiverData.phoneNumber ? (
                                  <p className="description-text">
                                    <i className="fa fa-phone mr-2"></i>
                                    <span className="align-middle">
                                      {careGiverData.phoneNumber}
                                    </span>
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="description-column region-column one-line-text  ml-0 text-capitalize">
                              {careGiverData.qualifications &&
                              careGiverData.qualifications.length
                                ? careGiverData.qualifications.map(
                                    (qualification: any, index: number) => {
                                      return (
                                        <p
                                          className="description-text"
                                          key={index}
                                        >
                                          <span className="text-label mr-1">
                                            <i className="fa fa-angle-right"></i>
                                          </span>
                                          <span className="align-middle">
                                            {qualification.attributeName}
                                          </span>
                                        </p>
                                      );
                                    }
                                  )
                                : "-"}
                            </div>
                          </td>
                          <td>
                            <div className="description-column  ml-0">
                              {careGiverData &&
                              careGiverData.caregiverDetails &&
                              careGiverData.caregiverDetails.workZones ? (
                                careGiverData.caregiverDetails.workZones.map(
                                  (wZ: string) => (
                                    <p className="description-text ">
                                      <span className="text-label mr-1">
                                        <i className="fa fa-angle-right"></i>
                                      </span>
                                      <span className="align-middle">{wZ}</span>
                                    </p>
                                  )
                                )
                              ) : (
                                <div className="text-center">-</div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              <p className="description-text">
                                <span className="align-middle">
                                  {careGiverData &&
                                  careGiverData.caregiver &&
                                  careGiverData.caregiver.legalForm
                                    ? careGiverData.caregiver.legalForm
                                    : "N/A"}
                                </span>
                              </p>
                            </div>
                          </td>

                          <td>
                            <div>
                              {careGiverData.createdAt
                                ? moment(careGiverData.createdAt).format("LLL")
                                : "-"}
                            </div>
                          </td>

                          <td className="text-center">
                            <span
                              className={`status-btn ${
                                careGiverData.isActive ? "active" : "inactive"
                              }`}
                              onClick={() =>
                                onStatusUpdate(
                                  careGiverData.id,
                                  !careGiverData.isActive
                                )
                              }
                            >
                              {careGiverData.isActive
                                ? languageTranslation("ACTIVE")
                                : languageTranslation("DISABLE")}
                            </span>
                          </td>
                          <td className="text-center">
                            <div className="action-btn">
                              <ButtonTooltip
                                id={`view${index}`}
                                message={languageTranslation("CAREGIVER_VIEW")}
                                onBtnClick={() =>
                                  history.push(
                                    AppRoutes.CARE_GIVER_VIEW.replace(
                                      /:id/gi,
                                      function(matched) {
                                        return replaceObj[matched];
                                      }
                                    )
                                  )
                                }
                              >
                                {" "}
                                <i className="fa fa-eye"></i>
                              </ButtonTooltip>
                              <ButtonTooltip
                                id={`delete${index}`}
                                message={languageTranslation(
                                  "CAREGIVER_DELETE"
                                )}
                                onBtnClick={() => onDelete(careGiverData.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </ButtonTooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr className={"text-center no-hover-row"}>
                    <td colSpan={7} className={"pt-5 pb-5"}>
                      {isFilterApplied ? (
                        <NoSearchFound />
                      ) : (
                        <div className="no-data-section">
                          <div className="no-data-icon">
                            <i className="icon-ban" />
                          </div>
                          <h4 className="mb-1">
                            Currently there are no care giver Added.{" "}
                          </h4>
                          <p>Please click above button to add new. </p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {data && data.getCaregivers && data.getCaregivers.totalCount ? (
              <PaginationComponent
                totalRecords={data.getCaregivers.totalCount}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
              />
            ) : null}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CareGiver;
