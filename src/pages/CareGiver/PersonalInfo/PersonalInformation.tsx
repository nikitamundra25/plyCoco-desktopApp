import React, {
  Component,
  FunctionComponent,
  useState,
  useEffect
} from "react";
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
import { Formik, FormikHelpers, Form, FormikProps } from "formik";
import { Mutation, Query } from "@apollo/react-components";
import {
  UPDATE_CAREGIVER,
  GET_CAREGIVER_BY_ID,
  UPDATE_BILLING_SETTINGS,
  GET_BILLING_SETTINGS
} from "../../../queries/CareGiver";
import {
  ICareGiverValues,
  IEditCareGInput,
  IPersonalObject,
  IBillingSettingsValues,
  ICareGiverInput
} from "../../../interfaces";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { AppRoutes } from "../../../config";

export const PersonalInformation: FunctionComponent<any> = (props: any) => {
  let { id } = useParams();
  let history = useHistory();
  const [careGiverData, setCareGiverData] = useState<ICareGiverValues | null>();

  // To update employee details into db
  const [updateCaregiver] = useMutation<
    { updateCaregiver: ICareGiverValues },
    { id: number; careGiverInput: IPersonalObject }
  >(UPDATE_CAREGIVER);

  const [updateBillingSettings] = useMutation<
    { updateBillingSettings: IBillingSettingsValues },
    { id: number; careGiverInput: IPersonalObject }
  >(UPDATE_BILLING_SETTINGS);

  const handleSubmit = async(
    values: ICareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<ICareGiverValues>
  ) => {
    // to set submit state to false after successful signup
    const {
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
      invoiceInterval,
      leasingPrice
    } = values;
    try {
      let careGiverInput: IPersonalObject = {
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
        qualifications: qualifications && qualifications.length
          ? qualifications.map(quali => quali.value)
          : [],
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
        legalForm: legalForm,
        companyName,
        registerCourt,
        registrationNumber,
        executiveDirector,
        employed,
        additionalText,
        status,
        remarks
      };
      // Edit employee details
      if (id) {
        await updateCaregiver({
          variables: {
            id: parseInt(id),
            careGiverInput,
          },
        });
        toast.success(languageTranslation('EMPLOYEE_UPDATE_SUCCESS_MSG'));
      }
      history.push(AppRoutes.CARE_GIVER);
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
    }
    setSubmitting(false);
  };

  const {
    userName = "",
    stateId = {label:"", value:""},
    registartionSince = "",
    gender = "",
    title = "",
    salutation = {label:"", value:""},
    firstName = "",
    lastName = "",
    dateOfBirth = "",
    age = "",
    address1 = "",
    address2 = "",
    driversLicense = false,
    driverLicenseNumber = "",
    vehicleAvailable = false,
    qualifications = undefined,
    street = "",
    city = "",
    postCode = "",
    countryId = {label:"", value:""},
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
    legalForm = {label:"", value:""},
    companyName = "",
    registerCourt = "",
    registrationNumber = "",
    executiveDirector = "",
    employed = false,
    additionalText = "",
    status = "active",
    remarks = [],
    workZones = [],
    fee = "",
    weekendAllowancePerHour = "",
    holidayAllowancePerHourFee = "",
    nightAllowancePerHour = "",
    leasingPrice = "",
    invoiceInterval = ""
  } = props.getCaregiver ? props.getCaregiver : {};

  const initialValues: ICareGiverValues = {
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      render={(props: FormikProps<ICareGiverValues>) => {
        return (
          <Form className="form-section forms-main-section">
            <Row>
            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="mandatory-text">* Required Fields</div>
              </div>
              <Button
                color="primary"
                type="submit"
                className="btn-sumbit"
                onClick={props.handleSubmit}
              >
                Save
            </Button>
            </Col>
              <Col lg={"4"}>
                <PersonalInfoFormComponent {...props} />
              </Col>
              <Col lg={"4"}>
                <BillingSettingsFormComponent {...props} />
                <QualificationFormComponent {...props} />
              </Col>
              <Col lg={4}>
                <RemarkFormComponent />
              </Col>
            </Row>
          </Form>
        );
      }}
    />
  );
};


class GetData extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  formatData = (caregiverDetails: any) => {
    assignIn(caregiverDetails, caregiverDetails.caregiverDetails);
    assignIn(caregiverDetails, caregiverDetails.caregiverDetails);
    if (caregiverDetails.bankDetails) {
      assignIn(
        caregiverDetails,
        caregiverDetails,
        caregiverDetails.bankDetails
      );
    }
    if (caregiverDetails.billingSettingDetails) {
      assignIn(
        caregiverDetails,
        caregiverDetails,
        caregiverDetails.billingSettingDetails
      );
    } else {
      assignIn(caregiverDetails, caregiverDetails, {
        fee: "",
        weekendAllowancePerHour: "",
        holidayAllowancePerHourFee: "",
        nightAllowancePerHour: "",
        leasingPrice: "",
        invoiceInterval: ""
      });
    }
    caregiverDetails.salutation = {
      value: caregiverDetails.salutation,
      label: caregiverDetails.salutation
    };
    caregiverDetails.state = {
      value: caregiverDetails.state,
      label: caregiverDetails.state
    };
    caregiverDetails.legalForm = {
      value: caregiverDetails.legalForm,
      label: caregiverDetails.legalForm
    };
    caregiverDetails.workZones = caregiverDetails.workZones.length
      ? caregiverDetails.workZones.map((wz: String) => {
        return { label: wz, value: wz };
      })
      : [];
    delete caregiverDetails.bankDetails;
    delete caregiverDetails.billingSettingDetails;
    delete caregiverDetails.caregiverDetails;
    return caregiverDetails;
  };

  render() {
    return (
      <PersonalInformation
      {...this.props}
      // getCaregiver={this.formatData(data.getCaregiver)}
    />
    );
  }
}
export default GetData;
