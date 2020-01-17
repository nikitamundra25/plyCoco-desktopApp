import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import { AppBreadcrumb } from "@coreui/react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import * as qs from "query-string";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { AppConfig } from "../../config";
import { AppRoutes, PAGE_LIMIT, client } from "../../config";
import routes from "../../routes/routes";
import Search from "../../common/SearchFilter";
import { languageTranslation, logger } from "../../helpers";
import ButtonTooltip from "../../common/Tooltip/ButtonTooltip";
import { EmployeeQueries } from "../../queries";
import PaginationComponent from "../../common/Pagination";
import {
  ISearchValues,
  IEmployee,
  IReactSelectInterface
} from "../../interfaces";
import { ConfirmBox } from "../../common/ConfirmBox";
import { toast } from "react-toastify";
import defaultProfile from "../../assets/avatars/default-profile.png";
import Loader from "../../containers/Loader/Loader";
import { NoSearchFound } from "../../common/SearchFilter/NoSearchFound";

const [
  ,
  ,
  GET_EMPLOYEES,
  ,
  UPDATE_EMPLOYEE_STATUS,
  DELETE_EMPLOYEE
] = EmployeeQueries;

const sortFilter: any = {
  3: "name",
  4: "name-desc",
  2: "oldest",
  1: "newest"
};

const Employee: FunctionComponent = () => {
  let history = useHistory();
  console.log("above use lcoation");

  const { search, pathname, state } = useLocation();
  const location = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);

  // To get employee list from db
  const [fetchEmployeeList, { data, loading, refetch }] = useLazyQuery<any>(
    GET_EMPLOYEES
  );
  console.log(refetch, "refecth");

  // Mutation to delete employee
  const [deleteEmployee, { error }] = useMutation<
    { deleteEmployee: any },
    { id: string }
  >(DELETE_EMPLOYEE);

  // Mutation to update employee status
  const [updateEmployeeStatus] = useMutation<
    { activeStatusEmployee: any },
    { id: string; isActive: boolean }
  >(UPDATE_EMPLOYEE_STATUS);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const query = qs.parse(search);
    let searchBy: string = "";
    let sortBy: IReactSelectInterface | undefined = { label: "", value: "" };
    let isActive: IReactSelectInterface | undefined = { label: "", value: "" };
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
        : { label: "", value: "" };
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
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
      setIsFilter(
        searchBy !== "" || isActive !== undefined || sortBy !== undefined
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
          : ""
      }
    });
  }, [search]); // It will run when the search value gets changed
  console.log(searchValues, "searchValuessearchValues");

  useEffect(() => {
    console.log(location, "location");

    logger(state, "state in useEffect");
    if (state && state.isValid) {
      // const {
      //   searchValue = '',
      //   sortBy = undefined,
      //   isActive = undefined,
      // } = searchValues ? searchValues : {};
      console.log(refetch);

      // refetch({
      //   limit: PAGE_LIMIT,
      //   page: 1,
      //   searchBy: '',
      //   sortBy: 0,
      //   isActive: '',
      // });
      // fetchEmployeeList({
      //   variables: {
      //     limit: PAGE_LIMIT,
      //     page: 1,
      //     searchBy: '',
      //     sortBy: 0,
      //     isActive: '',
      //   },
      // });
    }
  }, [location]);
  const {
    searchValue = "",
    sortBy = undefined,
    isActive = undefined
  } = searchValues ? searchValues : {};

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
  const queryVariables = {
    page: currentPage,
    isActive: isActive ? isActive.value : "",
    sortBy: sortBy ? sortBy.value : 0,
    searchBy: searchValue ? searchValue : "",
    limit: PAGE_LIMIT
  };
  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_EMPLOYEE_DELETE_MSG")
    });
    if (!value) {
      return;
    } else {
      try {
        await deleteEmployee({
          variables: {
            id
          }
        });

        const data = await client.readQuery({
          query: GET_EMPLOYEES,
          variables: queryVariables
        });
        const newEmployees = data.getEmployees.employeeData.filter(
          (employee: any) => employee.id !== id
        );

        const updatedData = {
          ...data,
          getEmployees: {
            ...data.getEmployees,
            employeeData: newEmployees,
            totalCount: newEmployees.length
          }
        };
        client.writeQuery({
          query: GET_EMPLOYEES,
          variables: queryVariables,
          data: updatedData
        });
      } catch (error) {
        const message = error.message
          .replace("SequelizeValidationError: ", "")
          .replace("Validation error: ", "")
          .replace("GraphQL error: ", "");
        toast.error(message);
        logger(error.message, "error");
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
      )
    });
    if (!value) {
      return;
    } else {
      try {
        await updateEmployeeStatus({
          variables: {
            id,
            isActive: status
          }
        });
        toast.success(languageTranslation("EMPLOYEE_STATUS_UPDATE_MSG"));
      } catch (error) {
        const message = error.message
          .replace("SequelizeValidationError: ", "")
          .replace("Validation error: ", "")
          .replace("GraphQL error: ", "");
        toast.error(message);
      }
    }
  };

  const values: ISearchValues = {
    searchValue,
    isActive,
    sortBy
  };
  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  logger(data, "dataaaaaaaa");

  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <Button
          color={"primary"}
          className={"btn-add"}
          id={"add-new-pm-tooltip"}
          onClick={() => history.push(AppRoutes.ADD_EMPLOYEE)}
        >
          <i className={"fa fa-plus"} />
          &nbsp;{languageTranslation("ADD_NEW_EMPLOYEE_BUTTON")}
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          <Formik
            initialValues={values}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            children={(props: FormikProps<ISearchValues>) => (
              <Search {...props} label={"employee"} />
            )}
          />
          {/* <Search /> */}
        </div>
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th>
                <div className="table-checkbox-wrap">
                  <div className="btn-group btn-check-action-wrap">
                    <span className="btn"></span>
                  </div>
                </div>
              </th>
              <th>{languageTranslation("TABLE_HEAD_EMP_INFO")}</th>
              <th>{languageTranslation("REGION")}</th>
              <th>{languageTranslation("CREATED_DATE")}</th>
              <th className="text-center">
                {languageTranslation("TABLE_HEAD_ASSIGNED_CANSTITUTION")}
              </th>
              <th className="text-center">{languageTranslation("STATUS")}</th>
              <th className="text-center">
                {languageTranslation("TABLE_HEAD_ACTION")}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className={"table-loader"} colSpan={12}>
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
                    userName,
                    email,
                    phoneNumber,
                    region,
                    assignedCanstitution,
                    isActive,
                    profileThumbnailImage
                  }: IEmployee,
                  index: number
                ) => {
                  const replaceObj: any = {
                    ":id": id,
                    ":userName": userName
                  };
                  return (
                    <tr key={index}>
                      <td>
                        <div className="table-checkbox-wrap">
                          <div className="btn-group btn-check-action-wrap">
                            {/* <span className="btn">
                              <span className="checkboxli checkbox-custom checkbox-default">
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
                          <div className="img-column">
                            <img
                              src={`${
                                profileThumbnailImage
                                  ? `${AppConfig.FILES_ENDPOINT}${profileThumbnailImage}`
                                  : defaultProfile
                              }`}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          <div className="description-column">
                            <div className="info-title">
                              {firstName ? firstName : ""}
                            </div>
                            <div className="description-text">
                              <i className="fa fa-envelope mr-2"></i>
                              <span className="align-middle">
                                {email ? email : ""}
                              </span>
                            </div>
                            {phoneNumber ? (
                              <div className="description-text">
                                <i className="fa fa-phone mr-2"></i>
                                <span className="align-middle">
                                  {phoneNumber}
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="description-column  ml-0">
                          {region ? region.regionName : "-"}
                        </div>
                      </td>
                      <td>
                        <div className="description-column  ml-0">
                          12 Dec, 2019
                        </div>
                      </td>
                      <td className="text-center">
                        <div>{0}</div>
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
                            onBtnClick={() =>
                              history.push(
                                AppRoutes.EDIT_EMPLOYEE.replace(
                                  /:id|:userName/gi,
                                  function(matched) {
                                    return replaceObj[matched];
                                  }
                                )
                              )
                            }
                          >
                            {" "}
                            <i className="fa fa-pencil"></i>
                          </ButtonTooltip>
                          <ButtonTooltip
                            id={`view${index}`}
                            message={languageTranslation("EMP_VIEW")}
                            onBtnClick={() =>
                              history.push(
                                AppRoutes.VIEW_EMPLOYEE.replace(
                                  /:id|:userName/gi,
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
                            message={languageTranslation("EMP_DELETE")}
                            onBtnClick={() => onDelete(id)}
                          >
                            {" "}
                            <i className="fa fa-trash"></i>
                          </ButtonTooltip>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr className={"text-center"}>
                <td colSpan={6} className={"pt-5 pb-5"}>
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
        {data && data.getEmployees && data.getEmployees.totalCount ? (
          <PaginationComponent
            totalRecords={data.getEmployees.totalCount}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        ) : null}
      </CardBody>
    </Card>
  );
};

export default Employee;
