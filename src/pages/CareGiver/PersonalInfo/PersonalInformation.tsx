import React, { Component, FunctionComponent, useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  Card
} from "reactstrap";
import { assignIn } from "lodash";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps, useParams, useHistory } from "react-router";
import { languageTranslation } from "../../../helpers";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent";
import BillingSettingsFormComponent from "./BillingSettingsFormComponent";
import QualificationFormComponent from "./QualificationFormComponent";
import AttributeFormComponent from "./AttributesFromComponent";
import RemarkFormComponent from "./RemarkFormComponent";
import { Formik, FormikHelpers, Form } from "formik";
import { Mutation } from "@apollo/react-components";
import { UPDATE_CAREGIVER, GET_CAREGIVER_BY_ID, UPDATE_BILLING_SETTINGS, GET_BILLING_SETTINGS } from "../../../queries/CareGiver";
import { ICareGiverValues, IEditCareGInput, IPersonalObject, IBillingSettingsValues } from "../../../interfaces";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";

export const PersonalInformation: FunctionComponent = () => {
  let { id } = useParams();
  let history = useHistory();
  const [
    careGiverData,
    setCareGiverData,
  ] = useState<ICareGiverValues | null>();


  // To update employee details into db
  const [updateCaregiver] = useMutation<
    { updateCaregiver: ICareGiverValues },
    { id: number; careGiverInput: IPersonalObject }
  >(UPDATE_CAREGIVER);

  const [updateBillingSettings] = useMutation<
    { updateBillingSettings: IBillingSettingsValues },
    { id: number; careGiverInput: IPersonalObject }
  >(UPDATE_BILLING_SETTINGS);

  // To get the employee details by id
  const [
    getCaregiverDetails,
    { data: caregiverDetails, error: detailsError, refetch },
  ] = useLazyQuery<any>(GET_CAREGIVER_BY_ID);

  const [
    getBillingSettignsDetails,
    { data: billingSettingDetails, error },
  ] = useLazyQuery<any>(GET_BILLING_SETTINGS);

  useEffect(() => {
    // Fetch details by employee id
    if (id) {
      getCaregiverDetails({
        variables: { id: parseInt(id) },
      });
      getBillingSettignsDetails({
        variables: { userId: parseInt(id) },
      });
    }
    if (caregiverDetails) {
      assignIn(caregiverDetails, caregiverDetails.getCaregiver, caregiverDetails.getCaregiver.caregiverDetails)
      assignIn(caregiverDetails, caregiverDetails.caregiverDetails)
      if (caregiverDetails.getCaregiver.bankDetails) {
        assignIn(caregiverDetails, caregiverDetails, caregiverDetails.getCaregiver.bankDetails)
      }
      if (caregiverDetails.getCaregiver.billingSettingDetails) {
        assignIn(caregiverDetails, caregiverDetails, caregiverDetails.getCaregiver.billingSettingDetails)
      } else {
        assignIn(caregiverDetails, caregiverDetails, {
          fee: "",
          weekendAllowancePerHour: "",
          holidayAllowancePerHourFee: "",
          nightAllowancePerHour: "",
          leasingPrice: "",
          invoiceInterval: ""
        })
      }
      delete caregiverDetails.getCaregiver;
      delete caregiverDetails.bankDetails;
      delete caregiverDetails.billingSettingDetails;
      delete caregiverDetails.caregiverDetails;

      setCareGiverData({
        ...caregiverDetails
      });
    }
  }, [caregiverDetails]);

  const handleSubmit = async (
    values: ICareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<ICareGiverValues>,
  ) => {
    //to set submit state to false after successful signup
    // const {
    //   personalInformation: {
    //     userName,
    //     stateId,
    //     registartionSince,
    //     gender,
    //     title,
    //     salutation,
    //     firstName,
    //     lastName,
    //     dateOfBirth,
    //     age,
    //     address1,
    //     address2,
    //     driversLicense,
    //     driverLicenseNumber,
    //     vehicleAvailable,
    //     qualifications,
    //     street,
    //     city,
    //     postCode,
    //     countryId,
    //     phoneNumber,
    //     fax,
    //     mobileNumber,
    //     email,
    //     taxNumber,
    //     socialSecurityContribution,
    //     // bankName: "",
    //     iban,
    //     password,
    //     belongTo,
    //     legalForm,
    //     companyName,
    //     registerCourt,
    //     registrationNumber,
    //     executiveDirector,
    //     employed,
    //     additionalText,
    //     status,
    //     remarks
    //   },
    //   billingSettings
    // } = values;
    // try {
    //   let careGiverInput: IPersonalInfoObject = {
    //     personalInformation
    //   };
    //   // Edit employee details
    //   if (id) {
    //     await updateCaregiver({
    //       variables: {
    //         id: parseInt(id),
    //         careGiverInput,
    //       },
    //     });
    //     toast.success(languageTranslation('EMPLOYEE_UPDATE_SUCCESS_MSG'));
    //   } else {
    //     await addEmployee({
    //       variables: {
    //         employeeInput,
    //       },
    //     });
    //     toast.success(languageTranslation('EMPLOYEE_ADD_SUCCESS_MSG'));
    //   }
    //   history.push(AppRoutes.EMPLOYEE);
    // } catch (error) {
    //   const message = error.message
    //     .replace('SequelizeValidationError: ', '')
    //     .replace('Validation error: ', '')
    //     .replace('GraphQL error: ', '');
    //   // setFieldError('email', message);
    //   toast.error(message);
    // }
    // setSubmitting(false);
  };

  const {
    userName = "",
    stateId = undefined,
    registartionSince = "",
    gender = "",
    title = "",
    salutation = "",
    firstName = "",
    lastName = "",
    dateOfBirth = "",
    age = "",
    address1 = "",
    address2 = "",
    driversLicense = false,
    driverLicenseNumber = "",
    vehicleAvailable = false,
    qualifications = [],
    street = "",
    city = "",
    postCode = "",
    countryId = undefined,
    phoneNumber = "",
    fax = "",
    mobileNumber = "",
    email = "",
    taxNumber = "",
    socialSecurityContribution = false,
    // bankName: "",
    iban = "",
    password = "",
    belongTo = "",
    legalForm = "",
    companyName = "",
    registerCourt = "",
    registrationNumber = "",
    executiveDirector = "",
    employed = false,
    additionalText = "",
    status = "active",
    remarks = { createdBy: "", description: "" },
    fee = "",
    weekendAllowancePerHour = "",
    holidayAllowancePerHourFee = "",
    nightAllowancePerHour = "",
    leasingPrice = "",
    invoiceInterval = ""
  } = caregiverDetails ? caregiverDetails : {}

  const values: ICareGiverValues = {
    userName,
    stateId,
    registartionSince,
    gender,
    title,
    salutation,
    firstName,
    lastName,
    dateOfBirth,
    age,
    address1,
    address2,
    driversLicense,
    driverLicenseNumber,
    vehicleAvailable,
    qualifications,
    street,
    city,
    postCode,
    countryId,
    phoneNumber,
    fax,
    mobileNumber,
    email,
    taxNumber,
    socialSecurityContribution,
    // bankName: "",
    iban,
    password,
    belongTo,
    legalForm,
    companyName,
    registerCourt,
    registrationNumber,
    executiveDirector,
    employed,
    additionalText,
    status,
    remarks,
    fee,
    weekendAllowancePerHour,
    holidayAllowancePerHourFee,
    nightAllowancePerHour,
    leasingPrice,
    invoiceInterval
  };

  return (<Formik
    initialValues={values}
    onSubmit={handleSubmit}
    render={(props: any) => {
      return (
        <Form className="form-section forms-main-section">
          <Row>
            <Col lg={"4"}>
              <PersonalInfoFormComponent {...props} />
            </Col>

            <Col lg={"4"}>
              <BillingSettingsFormComponent {...props} />
              <QualificationFormComponent {...props} />

              {/* <AttributeFormComponent {...props} /> */}
            </Col>
            <Col lg={4}>
              <RemarkFormComponent {...props} />
            </Col>
          </Row>
          <Button onSubmit={props.handleSubmit}>Save</Button>
        </Form>
      );
    }}
  />)

}
export default PersonalInformation;
