import React, { FunctionComponent, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Col, Row, Button } from "reactstrap";
import { useParams } from "react-router";
import moment from "moment";
import { AppBreadcrumb } from "@coreui/react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import routes from "../../../../routes/routes";
import { EmployeeQueries } from "../../../../graphql/queries";
import { AppConfig, AppRoutes, defaultDateFormat } from "../../../../config";
import { IReplaceObjectInterface } from "../../../../interfaces";
import { languageTranslation } from "../../../../helpers";
import defaultProfile from "../../../assets/avatars/default-profile.png";
import { ConfirmBox } from "../../components/ConfirmBox";
import { EmployeeMutations } from "../../../../graphql/Mutations";
import LoginLogs from "../../components/Logins";
import { errorFormatter } from "../../../../helpers";
import Loader from "../../containers/Loader/Loader";
import { Helmet } from "react-helmet";

const [GET_EMPLOYEE_BY_ID] = EmployeeQueries;
const [, , UPDATE_EMPLOYEE_STATUS] = EmployeeMutations;
let employee: any;
let toastId: any = null;

const ViewEmployee: FunctionComponent = () => {
  let history = useHistory();
  let { id } = useParams();
  // To get the employee details by id
  const [getEmployeeDetails, { data, loading }] = useLazyQuery<any>(
    GET_EMPLOYEE_BY_ID
  );
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [updateEmployeeStatus] = useMutation<
    { activeStatusEmployee: any },
    { id: string; isActive: boolean }
  >(UPDATE_EMPLOYEE_STATUS);
  if (data) {
    employee = data.viewEmployee;
  }
  useEffect(() => {
    // Fetch details by employee id
    if (id) {
      getEmployeeDetails({
        variables: { id }
      });
    }
  }, []); // Pass empty array to only run once on mount. Here it will run when the value of employeeDetails get changed.

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
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  const replaceObj: IReplaceObjectInterface = {
    ":id": employee && employee.id,
    ":userName": employee && employee.userName
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
         <Helmet>
    <title>{languageTranslation("VIEW_EMPLOYEE")} </title>
  </Helmet>
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className="flex-grow-1 mr-sm-3" />
            <div>
              {showLogin ? (
                <Button className="btn-add" onClick={() => setShowLogin(false)}>
                  {languageTranslation("EMP_VIEW")}
                </Button>
              ) : (
                <>
                  <Button
                    className="btn-add mr-3"
                    color={"secondary"}
                    onClick={() => setShowLogin(true)}
                  >
                    <i className={"fa fa-hourglass-2 "} />
                    &nbsp;{languageTranslation("LOGIN_HISTORY")}
                  </Button>
                  <Button
                    className="btn-add"
                    color={"primary"}
                    onClick={() =>
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
                    <i className={"icon-note"} />
                    &nbsp;{languageTranslation("EDIT_EMPLOYEE_BUTTON")}
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardBody>
            {showLogin ? (
              <LoginLogs label={showLogin} />
            ) : (
              <div className="employee-details">
                {data ? (
                  <Row className="custom-col">
                    <Col lg={"12"} className="mb-2">
                      <div className="user-item emloyee-detail-card d-block">
                      <div className="employee-title">
                          {languageTranslation("EMPLOYEE_PERSONAL_DETAILS")}
                        </div>
                        <div className="personal-info-card">
                        <div className="profile-wrap">
                          <div className="profile-img-tile">
                            <div className="emloyee-profile-img">
                              <div className="user-back-img-wrap">
                                <img
                                  src={
                                    employee && employee.profileImage
                                      ? AppConfig.FILES_ENDPOINT +
                                        employee.profileImage
                                      : defaultProfile
                                  }
                                  onError={(
                                    e: React.ChangeEvent<HTMLImageElement>
                                  ) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultProfile;
                                  }}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="profile-text-tile color-black"></div>
                        </div>

                        <div className="profile-text">
                          {/* <div className="employee-title">
                      {languageTranslation("PERSONAL_INFORMATION")}
                    </div> */}
                          <div className="user-item">
                            {/* <Button>Edit</Button> */}
                            <span className=" text-label">
                              {" "}
                              {employee && employee.firstName ? (
                                <>{languageTranslation("NAME")}</>
                              ) : (
                                <>{languageTranslation("NAME")}</>
                              )}
                            </span>
                            <span className="text-value  d-flex align-items-center">
                              <span className="text-capitalize">
                                {employee && employee.lastName
                                  ? employee.lastName
                                  : "N/A"}
                                &nbsp;
                                {employee && employee.firstName
                                  ? employee.firstName
                                  : "N/A"}
                              </span>
                              {/* <Badge color="" className="degination"> FreeLancer</Badge> */}
                            </span>
                          </div>
                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation("EMPLOYEE_USER_NAME_LABEL")}
                            </span>

                            <span className="text-value ">
                              {employee && employee.userName
                                ? employee.userName
                                : "N/A"}
                            </span>
                          </div>
                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation(
                                "EMPLOYEE_EMAIL_ADDRESS_LABEL"
                              )}
                            </span>

                            <span className="text-value ">
                              {employee && employee.email
                                ? employee.email
                                : "N/A"}
                            </span>
                          </div>

                          <div className="user-item">
                            <div className="text-label">
                              {languageTranslation(
                                "EMPLOYEE_TELEPHONE_NUMBER_LABEL"
                              )}
                            </div>
                            <span className="text-value ">
                              {employee && employee.phoneNumber
                                ? employee.phoneNumber
                                : "N/A"}
                            </span>
                          </div>

                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation("STATUS")}
                            </span>
                            <span className="text-value ">
                              {/* <span
                      className={`status-btn ${
                        employee && employee.isActive ? "active" : "inactive"
                      }`}
                    >
                      {employee && employee.isActive
                        ? languageTranslation("ACTIVE")
                        : languageTranslation("DISABLE")}
                    </span> */}
                              <span
                                className={`status-btn text-center ${
                                  employee && employee.isActive
                                    ? "active"
                                    : "inactive"
                                }`}
                                onClick={() =>
                                  onStatusUpdate(
                                    employee && employee.id,
                                    employee && !employee.isActive
                                  )
                                }
                              >
                                {employee && employee.isActive
                                  ? languageTranslation("ACTIVE")
                                  : languageTranslation("DISABLE")}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="profile-text">
                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation("ADRESS")}
                            </span>
                            <span className="text-value ">
                              {employee &&
                              employee.employee &&
                              employee.employee.address1
                                ? employee.employee.address1
                                : "N/A"}
                            </span>
                          </div>

                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation("ADDRESS2")}
                            </span>
                            <span className="text-value ">
                              {employee &&
                              employee.employee &&
                              employee.employee.address2
                                ? employee.employee.address2
                                : "N/A"}
                            </span>
                          </div>
                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation("ZIP")}
                            </span>
                            <span className="text-value ">
                              {employee &&
                              employee.employee &&
                              employee.employee.zipCode
                                ? employee.employee.zipCode
                                : "N/A"}
                            </span>
                          </div>

                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation("CITY")}
                            </span>
                            <span className="text-value ">
                              {employee &&
                              employee.employee &&
                              employee.employee.city
                                ? employee.employee.city
                                : "N/A"}
                            </span>
                          </div>

                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation("COUNTRY")}
                            </span>
                            <span className="text-value ">
                              {employee &&
                              employee.employee &&
                              employee.employee.country
                                ? employee.employee.country
                                : "N/A"}
                            </span>
                          </div>

                          <div className="user-item">
                            <span className="text-label">
                              {languageTranslation("STATE")}
                            </span>
                            <span className="text-value ">
                              {employee &&
                              employee.employee &&
                              employee.employee.state
                                ? employee.employee.state
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                        </div>
                      </div>
                    </Col>

                    <Col lg={"6"} md={"6"}>
                      <div className="emloyee-detail-card other-detail-card">
                        <div className="employee-title">
                          {languageTranslation("BANK_ACCOUNT_INFORMATION")}
                        </div>

                        <div className="user-item">
                          <span className="text-label">
                            {languageTranslation("EMPLOYEE_BANK_NAME_LABEL")}
                          </span>
                          <span className="text-value ">
                            {employee &&
                            employee.bankDetails &&
                            employee.bankDetails.bankName
                              ? employee.bankDetails.bankName
                              : "N/A"}
                          </span>
                        </div>
                        <div className="user-item">
                          <span className="text-label">
                            {languageTranslation(
                              "BANK_ACCOUNT_HOLDER_NAME_LABEL"
                            )}
                          </span>
                          <span className="text-value ">
                            {employee &&
                            employee.bankDetails &&
                            employee.bankDetails.accountHolder
                              ? employee.bankDetails.accountHolder
                              : "N/A"}
                          </span>
                        </div>

                        <div className="user-item">
                          <span className="text-label">
                            {languageTranslation("BANK_IBAN_LABEL")}
                          </span>
                          <span className="text-value ">
                            {employee &&
                            employee.bankDetails &&
                            employee.bankDetails.IBAN
                              ? employee.bankDetails.IBAN
                              : "N/A"}
                          </span>
                        </div>

                        <div className="user-item">
                          <span className="text-label">
                            {languageTranslation("BANK_BIC_LABEL")}
                          </span>
                          <span className="text-value ">
                            {employee &&
                            employee.bankDetails &&
                            employee.bankDetails.BIC
                              ? employee.bankDetails.BIC
                              : "N/A"}
                          </span>
                        </div>

                        <div className="user-item">
                          <span className="text-label">
                            {languageTranslation("ADDITIONAL_TEXT_LABEL")}
                          </span>
                          <span className="text-value ">
                            {employee &&
                            employee.bankDetails &&
                            employee.bankDetails.additionalText
                              ? employee.bankDetails.additionalText
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col lg={"6"} md={"6"}>
                      <div className="emloyee-detail-card   emloyee-other-info other-detail-card">
                        <div className="employee-title">
                          {languageTranslation("OTHER_INFORMATION")}
                        </div>

                        <div className="user-item">
                          <span className="text-label">
                            {languageTranslation("EMPLOYEE_JOINING_DATE_LABEL")}
                          </span>
                          <span className="text-value ">
                            {employee &&
                            employee.employee &&
                            employee.employee.joiningDate
                              ? moment(employee.employee.joiningDate).format(
                                  defaultDateFormat
                                )
                              : "N/A"}
                          </span>
                        </div>

                        <div className="user-item">
                          <span className="text-label">
                            {languageTranslation("REGION")}
                          </span>
                          <span className="text-value  text-capitalize">
                            {employee &&
                            employee.regions &&
                            employee.regions.length
                              ? employee.regions
                                  .map((region: any) => region.regionName)
                                  .join(", ")
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </div>
            )}
          </CardBody>
        </Card>
        </>
      )}
    </>
  );
};

export default ViewEmployee;
