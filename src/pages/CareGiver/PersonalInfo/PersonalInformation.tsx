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
  ICareGiverInput,
  IReactSelectInterface,
  ICountries,
  IStates
} from "../../../interfaces";
import { CareGiverValidationSchema } from "../../../validations/CareGiverValidationSchema";

import { useMutation, useLazyQuery, useQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { AppRoutes, Country } from "../../../config";
import "../caregiver.scss";
import { GET_QUALIFICATION_ATTRIBUTES, CountryQueries } from "../../../queries";
import { IQualifications } from "../../../interfaces/qualification";

export const PersonalInformation: FunctionComponent<any> = (props: any) => {
  let { id } = useParams();
  let history = useHistory();
  const [careGiverData, setCareGiverData] = useState<ICareGiverValues | null>();

  // To update care giver details into db
  const [updateCaregiver] = useMutation<
    { updateCaregiver: ICareGiverValues },
    { id: number; careGiverInput: IPersonalObject }
  >(UPDATE_CAREGIVER);

  const [updateBillingSettings] = useMutation<
    { updateBillingSettings: IBillingSettingsValues },
    { id: number; careGiverInput: IPersonalObject }
  >(UPDATE_BILLING_SETTINGS);

  // To fecth qualification attributes list
  const { data, loading, error, refetch } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTES
  );
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (data && data.getQualificationAttributes) {
    data.getQualificationAttributes.forEach((quali: any) => {
      qualificationList.push({
        label: quali.attributeName,
        value: quali.id
      });
    });
  }

  const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;

  //To get country details
  const { data: countries, loading: countryLoading } = useQuery<ICountries>(
    GET_COUNTRIES
  );
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );

  useEffect(() => {
    if (props.getCaregiver && props.getCaregiver.caregiver) {
      getStatesByCountry({
        variables: {
          countryid: props.getCaregiver
            ? props.getCaregiver.caregiver.countryId
            : ""
        }
      });
    }
  }, [props.getCaregiver]);

  const handleSubmit = async (
    values: ICareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<ICareGiverValues>
  ) => {
    // to set submit state to false after successful signup
    const {
      userName,
      stateId,
      gender,
      title,
      salutation,
      firstName,
      lastName,
      dateOfBirth,
      age,
      state,
      address1,
      regionId,
      address2,
      driversLicense,
      driverLicenseNumber,
      vehicleAvailable,
      street,
      city,
      postalCode,
      countryId,
      country,
      phoneNumber,
      fax,
      mobileNumber,
      email,
      taxNumber,
      socialSecurityContribution,
      belongTo,
      legalForm,
      bankName,
      companyName,
      registerCourt,
      registrationNumber,
      executiveDirector,
      employed,
      comments,
      qualifications,
      status,
      remarks,
      fee,
      nightAllowance,
      weekendAllowance,
      night,
      holiday
    } = values;
    try {
      let careGiverInput: any = {
        userName,
        gender: gender && gender.value ? gender.value : "",
        title,
        salutation: salutation && salutation.value ? salutation.value : "",
        firstName,
        lastName,
        dateOfBirth,
        age: age ? parseInt(age) : null,
        address1,
        address2,
        driversLicense,
        driverLicenseNumber,
        vehicleAvailable,
        qualificationId:
          qualifications && qualifications.length
            ? `{${qualifications
                .map(
                  (qualification: IReactSelectInterface) => qualification.value
                )
                .join(", ")}}`
            : null,
        street,
        city,
        zipCode: postalCode,
        phoneNumber,
        fax,
        mobileNumber,
        email,
        taxNumber,
        socialSecurityContribution,
        countryId: country && country.value ? country.value : null,
        stateId: state && state.value ? state.value : null,
        bankName,
        password,
        // belongTo,
        // legalForm: legalForm,
        companyName,
        registerCourt,
        registrationNumber,
        executiveDirector,
        employed,
        comments,
        status,
        remarks,
        fee: fee ? parseInt(fee) : null,
        nightAllowance:
          nightAllowance && nightAllowance.value ? nightAllowance.value : null,
        weekendAllowance: weekendAllowance ? parseInt(weekendAllowance) : null,
        holiday: holiday ? parseInt(holiday) : null,
        night: night ? parseInt(night) : null,
        regionId: regionId && regionId.value ? `{${regionId.value}}` : null
      };
      // Edit employee details
      if (id) {
        await updateCaregiver({
          variables: {
            id: parseInt(id),
            careGiverInput
          }
        });
        toast.success(languageTranslation("CARE_GIVER_UPDATED_SUCCESS"));
      }
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      // setFieldError('email', message);
      toast.error(message);
    }
    setSubmitting(false);
  };

  const {
    userName = "",
    stateId = "",
    gender = "",
    title = "",
    firstName = "",
    lastName = "",
    dateOfBirth = "",
    countryId = "",
    email = "",
    socialSecurityContribution = false,
    bankName = "",
    password = "",
    belongTo = "",
    legalForm = "",
    status = "active",
    invoiceInterval = "",
    qualifications = [],
    caregiver = {}
  } = props.getCaregiver ? props.getCaregiver : {};
  const qualificationsData: IReactSelectInterface[] | undefined = [];
  if (qualifications) {
    qualifications.forEach(({ attributeName, id }: any) => {
      qualificationsData.push({ label: attributeName, value: id });
    });
  }
  let countryData: Number;

  if (props.getCaregiver && props.getCaregiver.caregiver) {
    countryData = props.getCaregiver.caregiver.countryId;
  }

  let userSelectedCountry: any = {};

  if (countries && countries.countries) {
    const userCountry = countries.countries.filter(
      (x: any) => x.id === countryData
    );

    if (userCountry && userCountry.length) {
      userSelectedCountry = {
        label: userCountry[0].name,
        value: userCountry[0].id
      };
    }
  }

  const stateData =
    props.getCaregiver && props.getCaregiver.caregiver
      ? props.getCaregiver.caregiver.stateId
      : "";

  let userSelectedState: any = {};
  if (statesData && statesData.states) {
    const userState = statesData.states.filter((x: any) => x.id === stateData);
    if (userState && userState.length) {
      userSelectedState = {
        label: userState[0].name,
        value: userState[0].id
      };
    }
  }

  const initialValues: ICareGiverValues = {
    id,
    userName,
    state: userSelectedState,
    title:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.title
        : null,
    firstName,
    lastName,
    phoneNumber: props.getCaregiver ? props.getCaregiver.phoneNumber:"",
    dateOfBirth: props.getCaregiver && props.getCaregiver.caregiver
    ? props.getCaregiver.caregiver.dateOfBirth
    : null,
    age:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.age
        : null,
    address1:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.address1
        : "",
    address2:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.address2
        : "",
    driversLicense:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.driversLicense
        : false,
    driverLicenseNumber:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.driverLicenseNumber
        : "",

    country: userSelectedCountry,
    vehicleAvailable:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.vehicleAvailable
        : false,
    street:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.street
        : "",
    city:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.city
        : "",
    postalCode:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.zipCode
        : "",
    countryId,
    regionId:
      props.getCaregiver &&
      props.getCaregiver.regions &&
      props.getCaregiver.regions.length
        ? {
            label: props.getCaregiver.regions[0].regionName,
            value: props.getCaregiver.regions[0].id
          }
        : undefined,
    fax:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.fax
        : "",
    mobileNumber:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.mobileNumber
        : "",
    email,
    taxNumber:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.taxNumber
        : "",
    socialSecurityContribution,
    bankName:
      props.getCaregiver && props.getCaregiver.bankDetails
        ? props.getCaregiver.bankDetails.bankName
        : "",
    IBAN:
      props.getCaregiver && props.getCaregiver.bankDetails
        ? props.getCaregiver.bankDetails.IBAN
        : "",
    belongTo,
    legalForm,
    companyName:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.companyName
        : "",
    registerCourt:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.registerCourt
        : "",
    registrationNumber:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.registrationNumber
        : "",
    executiveDirector:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.executiveDirector
        : "",
    employed:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.employed
        : false,
    comments:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.comments
        : "",
    status,
    remarks:
      props.getCaregiver && props.getCaregiver.caregiver
        ? props.getCaregiver.caregiver.remarks
        : [],
    invoiceInterval,
    qualifications: qualificationsData,
    fee:
      props.getCaregiver &&
      props.getCaregiver.caregiver &&
      props.getCaregiver.caregiver.fee
        ? props.getCaregiver.caregiver.fee
        : null,
    nightAllowance:
      props.getCaregiver &&
      props.getCaregiver.caregiver &&
      props.getCaregiver.caregiver.nightAllowance
        ? props.getCaregiver.caregiver.nightAllowance
        : null,
    weekendAllowance:
      props.getCaregiver &&
      props.getCaregiver.caregiver &&
      props.getCaregiver.caregiver.weekendAllowance
        ? props.getCaregiver.caregiver.weekendAllowance
        : null,
    holiday:
      props.getCaregiver &&
      props.getCaregiver.caregiver &&
      props.getCaregiver.caregiver.holiday
        ? props.getCaregiver.caregiver.holiday
        : null,
    night:
      props.getCaregiver &&
      props.getCaregiver.caregiver &&
      props.getCaregiver.caregiver.night
        ? props.getCaregiver.caregiver.night
        : null,
    salutation:
      props.getCaregiver && props.getCaregiver.salutation
        ? {
            label: props.getCaregiver.salutation,
            value: props.getCaregiver.salutation
          }
        : undefined,
    gender:
      props.getCaregiver && props.getCaregiver.gender
        ? {
            label: props.getCaregiver.gender,
            value: props.getCaregiver.gender
          }
        : undefined
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validationSchema={CareGiverValidationSchema}
      render={(props: FormikProps<ICareGiverValues>) => {
        return (
          <Form className="form-section forms-main-section">
            <Button
              disabled={false}
              id={"caregiver-add-btn"}
              onClick={props.handleSubmit}
              color={"primary"}
              className={"save-button"}
            >
              {languageTranslation("SAVE_BUTTON")}
            </Button>
            <Row>
              <Col lg={"4"}>
                <PersonalInfoFormComponent {...props} />
              </Col>
              <Col lg={"4"}>
                <div className="common-col">
                  <BillingSettingsFormComponent {...props} />
                  <div className="quality-attribute-section d-flex flex-column">
                    <QualificationFormComponent
                      {...props}
                      qualificationList={qualificationList}
                    />
                    <AttributeFormComponent {...props} />
                  </div>
                </div>
              </Col>
              <RemarkFormComponent {...props} />
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
    caregiverDetails.regionId = {
      value: caregiverDetails.regions[0]._id,
      label: caregiverDetails.regions[0].regionName
    };
    caregiverDetails.workZones =
      caregiverDetails.workZones && caregiverDetails.workZones.length
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
      <Query
        query={GET_CAREGIVER_BY_ID}
        fetchPolicy="network-only"
        variables={{ id: parseInt(this.props.Id) }}
      >
        {({ loading, error, data }: any) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Caught error: {error.message}</div>;
          return (
            <PersonalInformation
              {...this.props}
              getCaregiver={data.getCaregiver}
            />
          );
        }}
      </Query>
    );
  }
}
export default GetData;
