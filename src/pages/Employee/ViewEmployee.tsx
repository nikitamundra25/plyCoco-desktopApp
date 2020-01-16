import React, { Component, FunctionComponent, useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Row } from "reactstrap";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import { useLazyQuery } from "@apollo/react-hooks";
import { EmployeeQueries } from "../../queries";
import { useParams } from "react-router";
import { AppConfig } from "../../config";
import { IEmployee } from "../../interfaces";
import { languageTranslation } from "../../helpers";
import moment from "moment";
const [, GET_EMPLOYEE_BY_ID] = EmployeeQueries;
let employee: any;
const ViewEmployee: FunctionComponent = () => {
  let { id } = useParams();
  // To get the employee details by id
  const [getEmployeeDetails, { data, error, refetch }] = useLazyQuery<any>(
    GET_EMPLOYEE_BY_ID
  );
  console.log("data is", data);
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
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100" />
      </CardHeader>
      <CardBody>
        {data ? (
          <div className="employee-details">
            <Row>
              <Col lg={"4"} md={"4"} className="mb-3">
                <div className="employee-title">
                  {languageTranslation("PERSONAL_INFORMATION")}
                </div>
                <div className="user-item">
                  {employee && employee.firstName ? (
                    <span className="text-label text-capitalize">
                      {languageTranslation("EMPLOYEE_NAME")}
                    </span>
                  ) : (
                    "N/A"
                  )}
                  <span className="text-value text-capitalize">
                    :&nbsp;&nbsp;
                    {employee && employee.firstName
                      ? employee.firstName
                      : "N/A"}
                    &nbsp;&nbsp;
                    {employee && employee.lastName ? employee.lastName : "N/A"}
                  </span>
                </div>
                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("EMPLOYEE_EMAIL_ADDRESS_LABEL")}
                  </span>

                  <span className="text-value">
                    :&nbsp;&nbsp;{" "}
                    {employee && employee.email ? employee.email : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("CONTACT_NO")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;{" "}
                    {employee && employee.phoneNumber
                      ? employee.phoneNumber
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("EMPLOYEE_USERNAME")}
                  </span>

                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.userName ? employee.userName : "N/A"}
                  </span>
                </div>
                <div className="user-item">
                  <span className="text-label">Status</span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    <span
                      className={`status-btn ${
                        employee.isActive ? "active" : "inactive"
                      }`}
                    >
                      {employee.isActive
                        ? languageTranslation("ACTIVE")
                        : languageTranslation("DISABLE")}
                    </span>
                  </span>
                </div>
              </Col>

              <Col lg={"4"} md={"4"} className="mb-3">
                <div className="employee-title">
                  {languageTranslation("BANK_ACCOUNT_INFORMATION")}
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("EMPLOYEE_BANK_NAME_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.bankDetails &&
                    employee.bankDetails.bankName
                      ? employee.bankDetails.bankName
                      : "N/A"}
                  </span>
                </div>
                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("BANK_ACCOUNT_HOLDER_NAME_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
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
                  <span className="text-value">
                    :&nbsp;&nbsp;
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
                  <span className="text-value">
                    :&nbsp;&nbsp;
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
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.bankDetails &&
                    employee.bankDetails.additionalText
                      ? employee.bankDetails.additionalText
                      : "N/A"}
                  </span>
                </div>
              </Col>

              <Col lg={"4"} md={"4"} className="mb-4">
                <div className="employee-title">
                  {languageTranslation("PROFILE_IMAGE")}
                </div>
                {/* {employee && employee.profileImage ? ( */}
                <div className="user-item">
                  <span className="text-value">
                    <div className="profile-img">
                      <img
                        src={`${AppConfig.FILES_ENDPOINT}${
                          employee && employee.profileImage
                            ? employee.profileImage
                            : "N/A"
                        }`}
                        className="img-fluid"
                      />
                    </div>
                  </span>
                </div>
              </Col>

              <Col lg={"12"} md={"12"}>
                <div className="employee-title">
                  {languageTranslation("OTHER_INFORMATION")}
                </div>
              </Col>
              <Col lg={"6"} md={"6"} className="mb-3">
                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("REGION")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.region && employee.region.regionName
                      ? employee.region.regionName
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("EMPLOYEE_JOINING_DATE_LABEL")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee &&
                    employee.employee &&
                    employee.employee.joiningDate
                      ? moment(employee.employee.joiningDate).format(
                          "Do MMM, YYYY"
                        )
                      : "N/A"}
                  </span>
                </div>

                <div className="user-item">
                  <span className="text-label">
                    {languageTranslation("ADDRESS")}
                  </span>
                  <span className="text-value">
                    :&nbsp;&nbsp;
                    {employee && employee.employee && employee.employee.address1
                      ? employee.employee.address1
                      : "N/A"}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <h2>No Data Found</h2>
        )}
      </CardBody>
    </Card>
  );
};

export default ViewEmployee;
