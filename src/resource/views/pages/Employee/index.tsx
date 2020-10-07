import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import { AppBreadcrumb } from "@coreui/react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import * as qs from "query-string";
import { UncontrolledTooltip } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { Formik, FormikProps, FormikHelpers } from "formik";
import {
  AppConfig,
  sortFilter,
  defaultDateTimeFormat,
} from "../../../../config";
import { AppRoutes, PAGE_LIMIT } from "../../../../config";
import routes from "../../../../routes/routes";
import Search from "../../components/SearchFilter";
import {
  languageTranslation,
  logger,
  errorFormatter,
} from "../../../../helpers";
import ButtonTooltip from "../../components/Tooltip/ButtonTooltip";
import { EmployeeQueries } from "../../../../graphql/queries";
import PaginationComponent from "../../components/Pagination";
import {
  ISearchValues,
  IEmployee,
  IReactSelectInterface,
  IObjectType,
  IReplaceObjectInterface,
} from "../../../../interfaces";
import { ConfirmBox } from "../../components/ConfirmBox";
import defaultProfile from "../../../assets/avatars/default-profile.png";
import Loader from "../../containers/Loader/Loader";
import { NoSearchFound } from "../../components/SearchFilter/NoSearchFound";
import {
  EmployeeMutations,
  AdminProfileMutations,
} from "../../../../graphql/Mutations";
import { Helmet } from "react-helmet";

let toastId: any = null;


const [, GET_EMPLOYEES] = EmployeeQueries;

const [
  ,
  ,
  UPDATE_EMPLOYEE_STATUS,
  DELETE_EMPLOYEE,
  ,
  UPDATE_EMP_ACCESS_LEVEL,
] = EmployeeMutations;
const [, , GENERATE_NEW_PASSWORD] = AdminProfileMutations;
const Employee: FunctionComponent = () => {
  let history = useHistory();

  const { search, pathname, state } = useLocation();
  const location = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);
  const [readMore, setreadMore] = useState<boolean>(false);
  const [readMoreIndex, setreadMoreIndex] = useState<number>(-1);

  // To get employee list from db
  const [fetchEmployeeList, { data, called, loading, refetch }] = useLazyQuery<
    any
  >(GET_EMPLOYEES, {
    fetchPolicy: "no-cache",
  });

  // Mutation to delete employee
  const [deleteEmployee] = useMutation<
    { deleteEmployee: any },
    { id: string }
  >(DELETE_EMPLOYEE);

  // Mutation to update employee status
  const [updateEmployeeStatus] = useMutation<
    { activeStatusEmployee: any },
    { id: string; isActive: boolean }
  >(UPDATE_EMPLOYEE_STATUS);

  // Mutation to update employee status
  const [updateEmployeeAccessLevel] = useMutation<
    { updateAccessLevelEmployee: any },
    { id: string; accessLevel: string }
  >(UPDATE_EMP_ACCESS_LEVEL);

  // Similar to componentDidMount and componentDidUpdate:
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
              ) || "1",
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
        isActive,
      });
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
      setIsFilter(
        searchBy !== "" ||
          query.status !== undefined ||
          query.sortBy !== undefined
      );
    }
    // call query
    fetchEmployeeList({
      variables: {
        searchBy,
        sortBy: sortByValue ? parseInt(sortByValue) : 0,
        limit: PAGE_LIMIT,
        page: query.page ? parseInt(query.page as string) : 1,
        isActive: query.status
          ? query.status === "active"
            ? "true"
            : "false"
          : "",
      },
    });
  }, [search]); // It will run when the search value gets changed


  //  Function to manage read more/less regions
  const readMoreRegionsData = (index: number) => {
    if (index !== readMoreIndex) {
      setreadMore(true);
      setreadMoreIndex(index);
    } else {
      setreadMore(!readMore);
      setreadMoreIndex(index);
    }
  };

  const {
    searchValue = "",
    sortBy = undefined,
    isActive = undefined,
  } = searchValues ? searchValues : {};

  const handleSubmit = async (
    { searchValue, isActive, sortBy }: ISearchValues,
    { setSubmitting }: FormikHelpers<ISearchValues>
  ) => {
    let params: IObjectType = {};
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
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      "?"
    );
    history.push(path);
  };
  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_EMPLOYEE_DELETE_MSG"),
    });
    if (!value) {
      return;
    } else {
      try {
        await deleteEmployee({
          variables: {
            id,
          },
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation("EMPLOYEE_DELETED_SUCCESS")
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

  const onStatusUpdate = async (id: string, status: boolean) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation(
        status
          ? "CONFIRM_EMPLOYEE_STATUS_ACTIVATE_MSG"
          : "CONFIRM_EMPLOYEE_STATUS_DISABLED_MSG"
      ),
    });
    if (!value) {
      return;
    } else {
      try {
        toast.dismiss();
        await updateEmployeeStatus({
          variables: {
            id,
            isActive: status,
          },
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation("EMPLOYEE_STATUS_UPDATE_MSG")
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

  const changeAccessLevelValue = async (accessLevel: string, id: string) => {
    try {
      toast.dismiss();
      await updateEmployeeAccessLevel({
        variables: {
          id,
          accessLevel,
        },
      });
      refetch();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation("EMPLOYEE_ACCESS_LEVEL_UPDATE_MSG")
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
  };
  // gernerate new password for caregiver
  const [GenerateNewPassword] = useMutation<any, any>(GENERATE_NEW_PASSWORD);
  const generateNewPassword = async (employeeData: any): Promise<void> => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_REGENERATE_PASSWORD_MESSAGE", {
        userRole: languageTranslation("EMPLOYEE_LABEL").toLowerCase(),
        email: employeeData.email,
      }),
    });
    if (!value) {
      return;
    }
    if (toast.isActive(toastId)) {
      toast.dismiss(toastId);
    }
    try {
      await GenerateNewPassword({
        variables: {
          userId: employeeData.id,
        },
      });

      toastId = toast.success(
        languageTranslation("NEW_PASSWORD_SENT_SUCCESS", {
          email: employeeData.email,
        })
      );
    } catch (error) {
      const message = errorFormatter(error.message);
      toastId = toast.error(message);
    }
  };
  const values: ISearchValues = {
    searchValue,
    isActive,
    sortBy,
  };
  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  return (
    <>
      <Helmet>
        <title>{languageTranslation("EMPLOYEE_LABEL")} </title>
      </Helmet>
      <Card>
        <CardHeader>
          <AppBreadcrumb appRoutes={routes} className="flex-grow-1 mr-sm-3" />
          <div>
            <Button
              color={"primary"}
              className={"btn-add mr-3"}
              id={"add-new-pm-tooltip"}
              onClick={() => history.push(AppRoutes.EMPLOYEE_ARCHIVE)}
            >
              <i className={"fa fa-archive"} />
              &nbsp; {languageTranslation("VIEW_ARCHIVE")}
            </Button>
            <Button
              color={"primary"}
              className={"btn-add"}
              id={"add-new-pm-tooltip"}
              onClick={() => history.push(AppRoutes.ADD_EMPLOYEE)}
            >
              <i className={"fa fa-plus"} />
              &nbsp;{languageTranslation("ADD_NEW_EMPLOYEE_BUTTON")}
            </Button>
          </div>
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
                  label={"employee"}
                  filterbyStatus={true}
                  setSearchValues={setSearchValues}
                />
              )}
            />
            {/* <Search /> */}
          </div>
          <div className="table-minheight ">
            <Table bordered hover responsive>
              <thead className="thead-bg">
                <tr>
                  <th className="sno-th-column text-center">
                    {languageTranslation("S_NO")}
                  </th>
                  <th>{languageTranslation("TABLE_HEAD_EMP_INFO")}</th>
                  <th className="region-th-column">
                    {languageTranslation("REGION")}
                  </th>
                  <th className="date-th-column">
                    {languageTranslation("CREATED_DATE")}
                  </th>
                  <th className="status-column one-line-text">
                    {languageTranslation("EMPLOYEE_EMPLOYEE_RIGHTS_LABEL")}
                  </th>
                  <th className="text-center status-column">
                    {languageTranslation("STATUS")}
                  </th>
                  <th className="text-center">
                    {languageTranslation("TABLE_HEAD_ACTION")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {!called || loading ? (
                  <tr>
                    <td className={"table-loader"} colSpan={7}>
                      <Loader />
                    </td>
                  </tr>
                ) : data &&
                  data.getEmployees &&
                  data.getEmployees.employeeData &&
                  data.getEmployees.employeeData.length ? (
                  data.getEmployees.employeeData.map(
                    (
                      {
                        id,
                        firstName,
                        lastName,
                        userName,
                        email,
                        phoneNumber,
                        regions,
                        isActive,
                        profileThumbnailImage,
                        createdAt,
                        accessLevel,
                      }: IEmployee,
                      index: number
                    ) => {
                      const replaceObj: IReplaceObjectInterface = {
                        ":id": id,
                        ":userName": userName,
                      };
                      var elements = [lastName, firstName];

                      return (
                        <tr key={index}>
                          <td className="sno-th-column text-center">
                            <span>{count++}</span>
                          </td>
                          <td>
                            <div className="info-column">
                              <div className="img-column">
                                <img
                                  src={`${
                                    profileThumbnailImage
                                      ? `${AppConfig.FILES_ENDPOINT}${profileThumbnailImage}`
                                      : defaultProfile
                                  }`}
                                  onError={(
                                    e: React.ChangeEvent<HTMLImageElement>
                                  ) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultProfile;
                                  }}
                                  className="img-fluid"
                                  alt=""
                                />
                              </div>
                              <div className="description-column">
                                <span
                                  className="info-title text-capitalize"
                                  onClick={() =>
                                    history.push(
                                      AppRoutes.VIEW_EMPLOYEE.replace(
                                        /:id|:userName/gi,
                                        function (matched: string) {
                                          return replaceObj[matched];
                                        }
                                      )
                                    )
                                  }
                                >
                                  {elements.join(" ")}
                                </span>

                                <p className="description-text">
                                  <i className="fa fa-envelope mr-2"></i>
                                  <a
                                    href={`mailto:${email}`}
                                    className="align-middle one-line-text info-link"
                                    target={"_blank"}
                                  >
                                    {email}
                                  </a>
                                </p>
                                <p className="description-text">
                                  <i className="fa fa-user mr-2"></i>
                                  <span className="align-middle">
                                    {userName ? userName : ""}
                                  </span>
                                </p>
                                {phoneNumber ? (
                                  <p className="description-text">
                                    <i className="fa fa-phone mr-2"></i>
                                    <a
                                      className="align-middle one-line-text info-link"
                                      href={`tel:${phoneNumber}`}
                                      target={"_blank"}
                                    >
                                      {phoneNumber}
                                    </a>
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="region-list text-capitalize">
                              {regions && regions.length ? (
                                readMore && readMoreIndex === index ? (
                                  regions.map((region: any, index: number) => {
                                    return (
                                      <span
                                        className="region-label"
                                        key={index}
                                      >
                                        {region ? region.regionName : "-"}
                                      </span>
                                    );
                                  })
                                ) : (
                                  regions
                                    .slice(0, 3)
                                    .map((region: any, index: number) => {
                                      return (
                                        <span
                                          className="region-label"
                                          key={index}
                                        >
                                          {region ? region.regionName : "-"}
                                        </span>
                                      );
                                    })
                                )
                              ) : (
                                <div>-</div>
                              )}
                              {regions && regions.length > 3 ? (
                                <span
                                  onClick={() => readMoreRegionsData(index)}
                                  className="view-more-link theme-text"
                                >
                                  <br />
                                  {readMore && readMoreIndex === index
                                    ? languageTranslation("SHOW_LESS")
                                    : languageTranslation("SHOW_MORE")}
                                </span>
                              ) : null}
                            </div>
                          </td>
                          <td className="date-th-column ">
                            {createdAt
                              ? moment(createdAt).format(defaultDateTimeFormat)
                              : ""}
                          </td>
                          <td>
                            <div className="action-btn text-capitalize">
                              {accessLevel ? (
                                <UncontrolledButtonDropdown className="custom-dropdown">
                                  <DropdownToggle
                                    className={"text-capitalize m-width-72"}
                                    caret
                                    size="sm"
                                  >
                                    {accessLevel
                                      ? accessLevel === "invoiceLeasing"
                                        ? languageTranslation(
                                            "EMPLOYEE_LEASING_INVOICE"
                                          )
                                        : accessLevel === "invoiceSelfEmployeed"
                                        ? languageTranslation(
                                            "EMPLOYEE_SELF_EMPLOYEED_INVOICE"
                                          )
                                        : accessLevel
                                      : "-"}
                                    {/* {accessLevel ? accessLevel : '-'} */}
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      onClick={() =>
                                        changeAccessLevelValue("all", id)
                                      }
                                    >
                                      {languageTranslation("ALL")}
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() =>
                                        changeAccessLevelValue("basic", id)
                                      }
                                    >
                                      {languageTranslation("EMPLOYEE_BASIC")}
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() =>
                                        changeAccessLevelValue(
                                          "invoiceLeasing",
                                          id
                                        )
                                      }
                                    >
                                      {languageTranslation(
                                        "EMPLOYEE_LEASING_INVOICE"
                                      )}
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() =>
                                        changeAccessLevelValue(
                                          "invoiceSelfEmployeed",
                                          id
                                        )
                                      }
                                    >
                                      {languageTranslation(
                                        "EMPLOYEE_SELF_EMPLOYEED_INVOICE"
                                      )}
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledButtonDropdown>
                              ) : (
                                "-"
                              )}
                            </div>
                          </td>
                          <td className="text-center">
                            {isActive}
                            <span
                              className={`status-btn ${
                                isActive ? "active" : "inactive"
                              }`}
                              onClick={() => onStatusUpdate(id, !isActive)}
                            >
                              {isActive
                                ? languageTranslation("ACTIVE")
                                : languageTranslation("DISABLE")}
                            </span>
                          </td>
                          <td>
                            <div className="action-btn">
                          
                              <ButtonTooltip
                                id={`edit${index}`}
                                message={languageTranslation("EMP_EDIT")}
                                redirectUrl={AppRoutes.EDIT_EMPLOYEE.replace(
                                  /:id|:userName/gi,
                                  function (matched) {
                                    return replaceObj[matched];
                                  }
                                )}
                                currentPage={currentPage}
                              >
                                {" "}
                                <i className="fa fa-pencil"></i>
                              </ButtonTooltip>
                              {/* </Link> */}
                              <ButtonTooltip
                                id={`view${index}`}
                                message={languageTranslation("EMP_VIEW")}
                                redirectUrl={AppRoutes.VIEW_EMPLOYEE.replace(
                                  /:id|:userName/gi,
                                  function (matched) {
                                    return replaceObj[matched];
                                  }
                                )}
                              >
                                {" "}
                                <i className="fa fa-eye"></i>
                              </ButtonTooltip>
                              <span
                                id={`regenerate-password-${index}`}
                                className="btn-icon mr-2"
                                onClick={() =>
                                  generateNewPassword({ id, email })
                                }
                              >
                                <UncontrolledTooltip
                                  placement={"top"}
                                  target={`regenerate-password-${index}`}
                                >
                                  {languageTranslation("REGENERATE_PASSWORD")}
                                </UncontrolledTooltip>
                                <i className="fa fa-lock"></i>
                              </span>
                              <span
                                id={`delete${index}`}
                                className="btn-icon mr-2"
                                onClick={() => onDelete(id)}
                              >
                                <UncontrolledTooltip
                                  placement={"top"}
                                  target={`delete${index}`}
                                >
                                  {languageTranslation("EMP_DELETE")}
                                </UncontrolledTooltip>
                                <i className="fa fa-trash"></i>
                              </span>
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
                            {languageTranslation(
                              "CURRENTLY_THERE_ARE_NO_EMPLOYEES"
                            )}{" "}
                          </h4>
                          <p>
                            {languageTranslation("CLICK_ABOVE_TO_ADD_NEW")}{" "}
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {data && data.getEmployees && data.getEmployees.totalCount ? (
            <PaginationComponent
              totalRecords={data.getEmployees.totalCount}
              currentPage={currentPage}
              onPageChanged={onPageChanged}
            />
          ) : null}
        </CardBody>
      </Card>
    </>
  );
};

export default Employee;
