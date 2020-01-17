import React, { Component, useEffect, Suspense, useState, FunctionComponent } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { CareInstituionValidationSchema } from "../../../validations";
import { ICareInstitutionFormValues, IHandleSubmitInterface } from "../../../interfaces";
import AddCareInstitution from "./AddCareInstitution";
import { CareInstitutionQueries } from "../../../queries";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { logger, languageTranslation } from "../../../helpers";
import { toast } from "react-toastify";
import { useHistory, RouteComponentProps } from "react-router";
import { AppRoutes } from "../../../config";
import { careInstitutionRoutes } from "../Sidebar/SidebarRoutes/ConstitutionRoutes";
import add from "../../../assets/img/add.svg";
import reminder from "../../../assets/img/reminder.svg";
import password from "../../../assets/img/password.svg";
import appointment from "../../../assets/img/appointment.svg";
import clear from "../../../assets/img/clear.svg";

const CareInstitutionSidebar = React.lazy(() =>
  import(
    "../Sidebar/SidebarLayout/CareInstitutionLayout"
  )
);

const CareInstitutionTabs = careInstitutionRoutes

const [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION
] = CareInstitutionQueries;

export const CareInstitutionForm: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> & RouteComponentProps & IHandleSubmitInterface> = (props: FormikProps<ICareInstitutionFormValues> & RouteComponentProps) => {
  const [addCareInstitution, { error, data }] = useMutation<{
    addCareInstitution: ICareInstitutionFormValues;
  }>(ADD_CARE_INSTITUTION);

  let history = useHistory();
  console.log("Data", data);

  const handleSubmit = async (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>
  ) => {
    //to set submit state to false after successful signup
    try {
      const dataSubmit: any = {
        salutation: values && values.salutation ? values.salutation.label : "",
        city: values.city,
        companyName: values.companyName,
        email: values.email,
        fax: values.fax,
        firstName: values.firstName,
        lastName: values.lastName,
        mobileNumber: values.mobileNumber,
        phoneNumber: values.phoneNumber,
        shortName: values.shortName,
        street: values.street,
        userName: values.userName,
        zipCode: values.zipCode,
        countryId: values && values.country ? values.country.value : null,
        stateId: values && values.state ? values.state.value : null
      };
      await addCareInstitution({
        variables: {
          careInstitutionInput: dataSubmit
        }
      });
      toast.success(languageTranslation("CARE_INSTITUTION_ADD_SUCCESS_MSG"));
      const Data: any = data
      console.log("Data", data);
      if (data) {
        history.push(AppRoutes.CARE_INSTITUION_VIEW.replace(":id", Data.id));
      }
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      toast.error(message);
      logger(error);
    }
    setSubmitting(false);
  };

  const [activeTab, setactiveTab] = useState(0)

  // const { data, loading, error, refetch } = useQuery(GET_USERS);
  // console.log(data, 'dataaaaa');
  const values: ICareInstitutionFormValues = {
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    fax: "",
    shortName: "",
    companyName: "",
    street: "",
    city: "",
    isArchive: false
  };
  return (
    <div className="common-detail-page">
      <div className="common-detail-section">
        <Suspense fallback={"Loading.."}>
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center ">
              <div className="user-select">
                Add Care Institution
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={add} alt="" />
                </span>
                <span className="header-nav-text">New Care Institution</span>
              </div>
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
                <span className="header-nav-text">Display Appointments</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={clear} alt="" />
                </span>
                <span className="header-nav-text">Clear</span>
              </div>
            </div>
            <CareInstitutionSidebar
              tabs={CareInstitutionTabs}
              activeTab={activeTab}
              onTabChange={""}
            />
          </div>
        </Suspense>
        <Suspense fallback={""}>
          <div className="common-content flex-grow-1">
            {activeTab === 0 ? (
              <div className={"form-section forms-main-section"}>
                <Formik
                  initialValues={values}
                  onSubmit={handleSubmit}
                  children={(props: FormikProps<ICareInstitutionFormValues>) => (
                    <AddCareInstitution {...props} />
                  )}
                  validationSchema={CareInstituionValidationSchema}
                />
              </div>
            ) : null}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CareInstitutionForm;
