import React, { FunctionComponent, useEffect, useState } from "react";
import { Row, Card, CardHeader, CardBody } from "reactstrap";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { AppBreadcrumb } from "@coreui/react";
import { toast } from "react-toastify";
import { ApolloError } from "apollo-client";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ProfileFormComponent } from "./ProfileFormComponent";
import { ProfileQueries } from "../../../../graphql/queries";
import { AdminProfileMutations } from "../../../../graphql/Mutations";
import { ChangePwdFormComponent } from "./ChangePwdFormComponent";
import { languageTranslation } from "../../../../helpers";
import routes from "../../../../routes/routes";
import {
  ProfileValidationSchema,
  ChangePasswordValidationSchema
} from "../../../validations";
import {
  IProfileValues,
  IChangePasswordValues,
  IProfileFormvalues
} from "../../../../interfaces";
import { errorFormatter } from "../../../../helpers";
import EmployeeForm from "../Employee/AddEmployee";
import Loader from "../../containers/Loader/Loader";

const [UPDATE_ADMIN_PROFILE, CHANGE_PASSWORD] = AdminProfileMutations;
const [VIEW_PROFILE] = ProfileQueries;

let toastId: any = null;

const MyProfile: FunctionComponent = () => {
  const [profileValues, setProfileValues] = useState<IProfileValues | null>(
    null
  );
  const [employeeData, setEmployeeData] = useState<any>();

  // update profile mutation
  const [updateAdminProfile, { loading }] = useMutation<
    {
      updateAdminProfile: any;
    },
    { userInput: IProfileFormvalues }
  >(UPDATE_ADMIN_PROFILE, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("UPDATE_PROFILE_SUCCESS"));
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });
  // Change password
  const [changePassword, { loading: changePwdLoading }] = useMutation<
    {
      changePassword: any;
    },
    { password: string; oldPassword: string }
  >(CHANGE_PASSWORD, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("UPDATE_PASSWORD_SUCCESS"));
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });
  const { data: profileData, loading: profileLoading, called } = useQuery(
    VIEW_PROFILE
  );
  useEffect(() => {
    if (profileData) {
      const {
        viewAdminProfile: { firstName, lastName, email, userRole }
      } = profileData;

      setProfileValues({ firstName, lastName, email, userRole });
      if (userRole === languageTranslation("EMPLOYEE")) {
        setEmployeeData(profileData.viewAdminProfile);
      }
    }
  }, [profileData]);
  // Function to update profile
  const handleSubmit = async (
    values: IProfileFormvalues,
    { setSubmitting }: FormikHelpers<IProfileFormvalues>
  ) => {
    try {
      toast.dismiss();
      updateAdminProfile({
        variables: {
          userInput: {
            firstName: firstName ? firstName.trim() : "",
            lastName: lastName ? lastName.trim() : "",
            email: email ? email.trim() : ""
          }
        }
      });
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  };
  // Function to update password into db
  const onChangePassword = async (
    { oldPassword, password }: IChangePasswordValues,
    { resetForm }: FormikHelpers<IChangePasswordValues>
  ) => {
    try {
      await changePassword({ variables: { oldPassword, password } });
      resetForm();
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  };
  const {
    firstName = "",
    lastName = "",
    email = "",
    userRole = ""
  } = profileValues ? profileValues : {};
  const values: IProfileFormvalues = {
    firstName,
    lastName,
    email
  };
  const ChangePasswordValues = {
    oldPassword: "",
    password: "",
    confirmPassword: ""
  };

  return (
    <>
      {!called || profileLoading ? (
        <Loader />
      ) : userRole === languageTranslation("EMPLOYEE") ? (
        <>
          <EmployeeForm employeeValues={employeeData} />
          <Formik
            initialValues={ChangePasswordValues}
            enableReinitialize={true}
            onSubmit={onChangePassword}
            children={(props: FormikProps<IChangePasswordValues>) => (
              <ChangePwdFormComponent
                {...props}
                changePwdLoading={changePwdLoading}
              />
            )}
            validationSchema={ChangePasswordValidationSchema}
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className="flex-grow-1 " />
          </CardHeader>
          <CardBody>
            <Row>
              <Formik
                initialValues={values}
                enableReinitialize={true}
                onSubmit={handleSubmit}
                children={(props: FormikProps<IProfileFormvalues>) => (
                  <ProfileFormComponent {...props} loading={loading} />
                )}
                validationSchema={ProfileValidationSchema}
              />
              <Formik
                initialValues={ChangePasswordValues}
                enableReinitialize={true}
                onSubmit={onChangePassword}
                children={(props: FormikProps<IChangePasswordValues>) => (
                  <ChangePwdFormComponent
                    {...props}
                    changePwdLoading={changePwdLoading}
                  />
                )}
                validationSchema={ChangePasswordValidationSchema}
              />
            </Row>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default MyProfile;
