import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";

import { useParams } from "react-router-dom";

import CreateTodoForm from "./CreateTodoForm";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { ICreateTodoFormValues } from "../../../../interfaces";
import { languageTranslation, logger } from "../../../../helpers";
import { toast } from "react-toastify";
import { CreateTodoFormValidationSchema } from "../../../validations";

const CreateTodo: FunctionComponent<any> = (props: any) => {
  console.log(props);


  let { id } = useParams();
  const Id: any | undefined = id;

  const handleSubmit = async (
    values: ICreateTodoFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ICreateTodoFormValues>
  ) => {
    try {
      const toDoInput: any = {
        timeOfDay: values.timeOfDay,
        comment: values.comment
      };

      // await addDivision({
      //   variables: {
      //     id: parseInt(Id),
      //     divisionInput: toDoInput
      //   }
      // });
      resetForm();
      toast.success(
        languageTranslation("ADD_NEW_DEPARTMENT_CARE_INSTITUTION")
      );

      setSubmitting(false);
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

  let values: ICreateTodoFormValues;

  values = {
    timeOfDay: "",
    comment: "",
  };

  return (
    <>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ICreateTodoFormValues>) => (
          <CreateTodoForm {...props} />
        )}
        validationSchema={CreateTodoFormValidationSchema}
      />
      {/* <CreateTodoForm {...props} /> */}
    </>
  );
};
export default CreateTodo;
