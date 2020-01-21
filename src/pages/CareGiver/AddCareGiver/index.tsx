import React, { Component, useState, FunctionComponent, Suspense } from "react";
import {
  CareGiverValues,
  ICareGiverInput,
  IAddCargiverRes,
  IReactSelectInterface
} from "../../../interfaces";
import { FormikHelpers, Formik, FormikProps } from "formik";
import CareGiverFormComponent from "./CareGiverFormComponent";
import { CareGiverValidationSchema } from "../../../validations/CareGiverValidationSchema";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CAREGIVER, GET_CAREGIVERS } from "../../../queries/CareGiver";
import { Mutation } from "@apollo/react-components";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { languageTranslation } from "../../../helpers";
import { AppRoutes, PAGE_LIMIT } from "../../../config";
import CareGiverSidebar from "../Sidebar/SidebarLayout/CareGiverLayout";
import reminder from "../../../assets/img/reminder.svg";
import password from "../../../assets/img/password.svg";
import appointment from "../../../assets/img/appointment.svg";
import clear from "../../../assets/img/clear.svg";
import { careGiverRoutes } from "../Sidebar/SidebarRoutes/CareGiverRoutes";

const CareGiverRoutesTabs = careGiverRoutes;

export const CareGiverForm: FunctionComponent = () => {
  let history = useHistory();

  const [caregiverData, setCaregiverData] = useState<CareGiverValues | null>();

  // To add emplyee details into db
  const [addCaregiver, { error, data }] = useMutation<
    { addCaregiver: IAddCargiverRes },
    { careGiverInput: ICareGiverInput }
  >(ADD_CAREGIVER);

  let { id } = useParams();
  const Id: any | undefined = id;

  // function to add/edit employee information
  const handleSubmit = async (
    values: CareGiverValues,
    { setSubmitting, setFieldError }: FormikHelpers<CareGiverValues>
  ) => {
    //to set submit state to false after successful signup
    const {
      salutation,
      firstName,
      lastName,
      address1,
      address2,
      street,
      city,
      stateId,
      countryId,
      postCode,
      pinCode,
      email,
      dateOfBirth,
      phoneNumber,
      fax,
      mobileNumber,
      userName,
      qualifications,
      driverLicenseNumber,
      driversLicense,
      vehicleAvailable,
      legalForm,
      companyName,
      registrationNumber,
      registerCourt,
      executiveDirector,
      socialSecurityContribution,
      taxNumber,
      remarks,
      workZones,
      status
    } = values;
    try {
      let careGiverInput: ICareGiverInput = {
        salutation: salutation && salutation.label ? salutation.label : "",
        firstName,
        lastName,
        address1,
        address2,
        street,
        city,
        stateId: stateId && stateId.value ? parseInt(stateId.value) : undefined,
        countryId:
          countryId && countryId.value ? parseInt(countryId.value) : undefined,
        postCode,
        pinCode,
        email,
        dateOfBirth,
        phoneNumber,
        fax,
        mobileNumber,
        userName,
        qualifications:
          qualifications && qualifications.length
            ? qualifications.map(quali => quali.value)
            : [],
        driverLicenseNumber,
        driversLicense,
        vehicleAvailable,
        legalForm: legalForm && legalForm.value ? legalForm.value : "",
        companyName,
        registrationNumber,
        registerCourt,
        executiveDirector,
        socialSecurityContribution,
        taxNumber,
        remarks: remarks && remarks.length ? remarks : undefined,
        workZones:
          workZones && workZones.length ? workZones.map(wz => wz.value) : [],
        status
      };
      await addCaregiver({
        variables: {
          careGiverInput
        },
        update: (cache, { data: { addCaregiver } }: any) => {
          const data: any = cache.readQuery({
            query: GET_CAREGIVERS,
            variables: {
              searchBy: "",
              sortBy: 0,
              limit: PAGE_LIMIT,
              page: 0,
              isActive: undefined
            }
          });
          cache.writeQuery({
            query: GET_CAREGIVERS,
            data: {
              getCaregiversCount: data.getCaregiversCount + 1,
              getCaregivers: data.getCaregivers.concat([addCaregiver])
            }
          });
        }
      });
      toast.success(languageTranslation("CAREGIVER_ADD_SUCCESS_MSG"));

      history.push(AppRoutes.CARE_GIVER);
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      // setFieldError('email', message);
      toast.error(message);
      setSubmitting(false);
    }
  };
  const [activeTab, setactiveTab] = useState(0);

  const {
    salutation = undefined,
    firstName = "",
    lastName = "",
    address1 = "",
    address2 = "",
    street = "",
    city = "",
    stateId = undefined,
    countryId = undefined,
    postCode = "",
    pinCode = "",
    email = "",
    dateOfBirth = "",
    phoneNumber = "",
    fax = "",
    mobileNumber = "",
    userName = "",
    qualifications = undefined,
    driverLicenseNumber = "",
    driversLicense = false,
    vehicleAvailable = false,
    legalForm = undefined,
    companyName = "",
    registrationNumber = "",
    registerCourt = "",
    executiveDirector = "",
    socialSecurityContribution = false,
    taxNumber = "",
    remarks = undefined,
    workZones = undefined,
    status = ""
  } = caregiverData ? caregiverData : {};

  const initialValues: CareGiverValues = {
    salutation,
    firstName,
    lastName,
    address1,
    address2,
    street,
    city,
    stateId,
    countryId,
    postCode,
    pinCode,
    email,
    dateOfBirth,
    phoneNumber,
    fax,
    mobileNumber,
    userName,
    qualifications,
    driverLicenseNumber,
    driversLicense,
    vehicleAvailable,
    legalForm,
    companyName,
    registrationNumber,
    registerCourt,
    executiveDirector,
    socialSecurityContribution,
    taxNumber,
    remarks,
    workZones,
    status
  };
  return (
    <>
      <div>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <Suspense fallback={"Loading.."}>
              <div className="sticky-common-header">
                <div className="common-topheader d-flex align-items-center ">
                  <div className="common-title">Add New Care Giver</div>

                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={reminder} alt="" />
                    </span>
                    <span
                      className="header-nav-text"
                      // onClick={() => {
                      //   this.setState({ show: true });
                      // }}
                    >
                      Create Todo/Reminder
                    </span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={password} alt="" />
                    </span>
                    <span className="header-nav-text">New Password</span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={appointment} alt="" />
                    </span>
                    <span className="header-nav-text">
                      Display Appointments
                    </span>
                  </div>
                  <div className="header-nav-item">
                    <span className="header-nav-icon">
                      <img src={clear} alt="" />
                    </span>
                    <span className="header-nav-text">Clear</span>
                  </div>
                </div>
                <CareGiverSidebar
                  tabs={CareGiverRoutesTabs}
                  activeTab={activeTab}
                />
              </div>
            </Suspense>
            <Suspense fallback={""}>
              <div className="common-content flex-grow-1">
                {activeTab === 0 ? (
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={CareGiverValidationSchema}
                    render={(props: FormikProps<CareGiverValues>) => {
                      return <CareGiverFormComponent {...props} />;
                    }}
                  />
                ) : null}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareGiverForm;
