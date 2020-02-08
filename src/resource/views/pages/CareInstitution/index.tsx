import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip
} from "reactstrap";
import { AppRoutes, PAGE_LIMIT, sortFilter } from "../../../../config";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../../../routes/routes";
import { CareInstitutionQueries } from "../../../../graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  ICareInstitutionListDataInterface,
  ISearchValues,
  IReactSelectInterface
} from "../../../../interfaces";
import { RouteComponentProps } from "react-router";
import PaginationComponent from "../../components/Pagination";
import * as qs from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import Search from "../../components/SearchFilter";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { languageTranslation, logger } from "../../../../helpers";
import { ConfirmBox } from "../../components/ConfirmBox";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "../../containers/Loader/Loader";
import ButtonTooltip from "../../components/Tooltip/ButtonTooltip";
import { CareInstitutionMutation } from "../../../../graphql/Mutations";
let toastId: any = null;
const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST
] = CareInstitutionQueries;

const [
  UPDATE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION_STATUS,
  UPDATE_DEPARTMENT_CARE_INSTITUTION,
  UPDATE_NEW_CONTACT_CARE_INSTITUTION,
  DELETE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  ADD_NEW_CONTACT_CARE_INSTITUTION,
  ADD_NEW_CARE_INTITUTION,
  ADD_DEPARTMENT_CARE_INSTITUTION,
  DELETE_DEPARTMENT
] = CareInstitutionMutation;

const CareInstitution = (props: RouteComponentProps) => {
  const [
    fetchCareInstitutionList,
    { data, called, loading, refetch }
  ] = useLazyQuery<any>(GET_CARE_INSTITUTION_LIST, {
    fetchPolicy: "no-cache"
  });

  let userData: [Object] | any;
  let history = useHistory();
  const { search, pathname } = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Mutation to update careInstitution status
  const [updateStatus] = useMutation<
    { changeStatusCareInstitution: any },
    { id: string; isActive: boolean }
  >(UPDATE_CARE_INSTITUTION_STATUS);

  // Mutation to delete employee
  const [deleteCareInstitution, { error }] = useMutation<
    { deleteCareInstitution: any },
    { id: string }
  >(DELETE_CARE_INSTITUTION);

  const [
    addUser,
    { error: addUserError, data: CareIntitutionId, loading: Loading }
  ] = useMutation<{ addUser: any }>(ADD_NEW_CARE_INTITUTION);

  // Similar to componentDidMount and componentDidUpdate: updateStatus
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
        : undefined;
      setSearchValues({
        searchValue: searchBy,
        sortBy,
        isActive
      });
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    fetchCareInstitutionList({
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
    // logger('path', path);
  };

  const onPageChanged = (currentPage: number) => {
    // logger('onPageChanged', currentPage);
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      "?"
    );
    history.push(path);
  };

  const handleStatus = async (id: any, status: boolean) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: status
        ? languageTranslation("CONFIRM_CARE_INSTITUTION_DISABLED_MSG")
        : languageTranslation("CONFIRM_CARE_INSTITUTION_ACTIVATE_MSG")
    });
    if (!value) {
      return;
    } else {
      try {
        toast.dismiss();
        await updateStatus({
          variables: {
            id,
            isActive: !status
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toast.success(
            languageTranslation("CARE_INSTITUTION_STATUS_UPDATE_MSG")
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

  const {
    searchValue = "",
    sortBy = undefined,
    isActive = undefined
  } = searchValues ? searchValues : {};

  const queryVariables = {
    page: currentPage,
    isActive: isActive ? isActive.value : "",
    sortBy: sortBy && sortBy.value ? parseInt(sortBy.value) : 0,
    searchBy: searchValue ? searchValue : "",
    limit: PAGE_LIMIT
  };

  const onDelete = async (id: any) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_CARE_INSTITUTION_DELETE_MSG")
    });
    if (!value) {
      return;
    } else {
      try {
        await deleteCareInstitution({
          variables: {
            id
          }
        });
        refetch();
        toast.success(
          languageTranslation("CARE_INSTITUTION_DELETE_SUCCESS_MSG")
        );
      } catch (error) {
        const message = error.message
          .replace("SequelizeValidationError: ", "")
          .replace("Validation error: ", "")
          .replace("GraphQL error: ", "");
      }
    }
  };

  useEffect(() => {
    if (CareIntitutionId) {
      const { addUser } = CareIntitutionId;
      props.history.push(
        AppRoutes.ADD_CARE_INSTITUTION.replace(":id", addUser.id)
      );
    }
  }, [CareIntitutionId]);

  const handleAddNewCareInstitution = () => {
    addUser({
      variables: {
        careInstInput: {
          firstName: ""
        }
      }
    });
  };

  if (data && data.getCareInstitutions) {
    userData = data.getCareInstitutions.careInstitutionData;
  }
  const tableData: any[] = [];
  const query = qs.parse(search);

  <>
    {userData && userData.length
      ? userData.map(
          (user: ICareInstitutionListDataInterface, index: number) => {
            return tableData.push(
              <tr>
                <td className={"sno-th-column text-center"}>
                  <span>{index + 1}</span>
                </td>
                <td>
                  <div className="info-column">
                    <div className="description-column">
                      <div className="info-title text-capitalize">
                        {`${user.firstName} ${user.lastName}`}
                      </div>
                      <p className="description-text">
                        <i className="fa fa-envelope mr-2"></i>
                        <span className="align-middle">{user.email}</span>
                      </p>
                      <p className="description-text">
                        <i className="fa fa-phone mr-2"></i>
                        <span className="align-middle">
                          {user.phoneNumber ? user.phoneNumber : "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="company-column text-capitalize">
                    <div className="company-text">
                      <i className="fa fa-building mr-2"></i>
                      <span className="align-middle">
                        {" "}
                        {user.canstitution && user.canstitution.companyName
                          ? user.canstitution.companyName
                          : "N/A"}
                      </span>
                    </div>
                    <p className="company-text">
                      <i className="fa fa-id-card mr-2"></i>
                      <span className="align-middle">
                        {" "}
                        {user.canstitution && user.canstitution.shortName
                          ? user.canstitution.shortName
                          : "N/A"}
                      </span>
                    </p>
                    <p className="company-text">
                      <i className="fa fa-user mr-2"></i>
                      <span className="align-middle">
                        {user.userName ? user.userName : "N/A"}
                      </span>
                    </p>
                  </div>
                </td>
                <td className="date-th-column ">
                  {user.createdAt ? moment(user.createdAt).format("lll") : ""}
                </td>
                <td className="text-center">
                  <span
                    className={`status-btn ${
                      user.isActive === true ? "active" : "inactive"
                    }`}
                    onClick={() => handleStatus(user.id, user.isActive)}
                  >
                    {user.isActive === true ? "Active" : "Disable"}
                  </span>
                </td>
                <td>
                  <div className="action-btn">
                    <ButtonTooltip
                      id={`edit${index}`}
                      message={"Click here to edit Care Institution"}
                      redirectUrl={AppRoutes.CARE_INSTITUION_VIEW.replace(
                        ":id",
                        user.id.toString()
                      )}
                    >
                      <i className="fa fa-pencil"></i>
                    </ButtonTooltip>
                    <ButtonTooltip
                      id={`view${index}`}
                      message={"Click here to view Care Institution"}
                      redirectUrl={AppRoutes.CARE_INSTITUION_VIEW.replace(
                        ":id",
                        user.id.toString()
                      )}
                    >
                      <i className="fa fa-eye"></i>
                    </ButtonTooltip>
                    <span
                      className="btn-icon "
                      id={`delete${index}`}
                      onClick={() => onDelete(user.id)}
                    >
                      <UncontrolledTooltip
                        placement="top"
                        target={`delete${index}`}
                      >
                        Click here to delete Care Institution
                      </UncontrolledTooltip>
                      <i className="fa fa-trash"></i>
                    </span>
                  </div>
                </td>
              </tr>
            );
          }
        )
      : tableData.push(
          <tr className={"text-center no-hover-row"}>
            <td colSpan={6} className={"pt-5 pb-5"}>
              {!query.page ? (
                <div className="no-data-section">
                  <div className="no-data-icon">
                    <i className="icon-ban" />
                  </div>
                  <h4 className="mb-1">
                    Currently there are no care institution added.{" "}
                  </h4>
                  <p>Please click above button to add new. </p>
                </div>
              ) : (
                <div className="no-search-section">
                  <div className="no-data-icon">
                    <i className="icon-magnifier" />
                  </div>
                  <h4 className="mb-1">
                    No details found related your search{" "}
                  </h4>
                  <div className="text-left search-text">
                    <p>
                      <span className="pr-2">&#8226;</span>Try to simplify your
                      search
                    </p>
                    <p>
                      <span className="pr-2">&#8226;</span>Use different
                      keywords
                    </p>
                    <p>
                      <span className="pr-2">&#8226;</span>Make sure words are
                      spelled correctly
                    </p>
                  </div>
                </div>
              )}
            </td>
          </tr>
        )}
  </>;

  const values: ISearchValues = {
    searchValue,
    isActive,
    sortBy
  };
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <Button
          color={"primary"}
          className={"btn-add"}
          disabled={Loading}
          id={"add-new-pm-tooltip"}
          onClick={() => handleAddNewCareInstitution()}
        >
          {Loading ? (
            <i className="fa fa-spinner fa-spin loader" />
          ) : (
            <i className={"fa fa-plus"} />
          )}
          &nbsp; Add New Care Institution
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          <Formik
            initialValues={values}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            children={(props: FormikProps<ISearchValues>) => (
              <Search {...props} label={"care institution"} />
            )}
          />
        </div>
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="sno-th-column text-center">
                {languageTranslation("S_NO")}
              </th>
              <th>Care Institution Information</th>
              <th className="company-th-column">Company Details</th>
              <th className="date-th-column">
                {languageTranslation("CREATED_DATE")}
              </th>
              <th className="text-center status-column">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {!called || loading ? (
              <tr>
                <td className={"table-loader"} colSpan={7}>
                  <Loader />
                </td>
              </tr>
            ) : (
              tableData
            )}
          </tbody>
        </Table>
        {data &&
        userData &&
        userData.length &&
        data.getCareInstitutions &&
        data.getCareInstitutions.totalCount ? (
          <PaginationComponent
            totalRecords={data.getCareInstitutions.totalCount}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        ) : null}
      </CardBody>
    </Card>
  );
};
export default CareInstitution;
