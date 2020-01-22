import React, {
  Component,
  useState,
  FunctionComponent,
  Suspense,
  useEffect
} from "react";
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const buttonDiv: HTMLElement | null = document.getElementById(
      "caregiver-add-btn"
    );
    if (buttonDiv) {
      if (scrollPositionY >= 35) {
        buttonDiv.classList.add("sticky-save-btn");
      } else {
        buttonDiv.classList.remove("sticky-save-btn");
      }
    }
  };

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
      userName,
      gender,
      email,
      phoneNumber,
      mobileNumber,
      title,
      dateOfBirth,
      age,
      street,
      city,
      postalCode,
      address1,
      address2,
      country,
      state,
      fax,
      taxNumber,
      bankName,
      IBAN,
      driversLicense,
      driverLicenseNumber,
      vehicleAvailable,
      socialSecurityContribution,
      workZones,
      status,
      belongTo,
      employed,
      companyName,
      registrationNumber,
      registerCourt,
      executiveDirector,
      legalFormValue,
      qualifications,
      remarks,
      comments,
      nightAllownce,
      invoiceInterval,
      leasingPricingList
    } = values;
    
    try {
      let careGiverInput: any = {
        salutation: salutation && salutation.label ? salutation.label : "",
        firstName,
        lastName,
        address1,
        address2,
        street,
        city,
        stateId: state && state.value ? state.value : undefined,
        countryId:
          country && country.value ? country.value : undefined,
        postalCode,
        email,
        IBAN,
        employed,
        dateOfBirth,
        bankName,
        gender: gender && gender.value? gender.value: "",
        phoneNumber,
        fax,
        comments,
        mobileNumber,
        nightAllownce,
        userName,
        // qualifications:
        //   qualifications && qualifications.length
        //     ? qualifications.map(quali => quali.value)
        //     : [],
        driverLicenseNumber,
        driversLicense,
        vehicleAvailable,
        legalForm: legalFormValue && legalFormValue.value ? legalFormValue.value : "",
        companyName,
        registrationNumber,
        registerCourt,
        age,
        title,
        executiveDirector,
        socialSecurityContribution,
        taxNumber,
        // remarks: remarks && remarks.length ? remarks : [],
        // workZones:
        //   workZones && workZones.length ? workZones.map(wz => wz.value) : [],
        status
      };
      console.log("careGiverInput",careGiverInput);
      
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
    postalCode = "",
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
    postalCode,
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
