import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";

import { useParams } from "react-router-dom";

import ToDoListForm from "./ToDoListForm";

const ToDos: FunctionComponent<RouteComponentProps> = (props: any) => {

  let { id } = useParams();
  const Id: any | undefined = id;

  return (
    <>
      {/* <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        children={(props: FormikProps<IToDoFormValues>) => (
          <ToDoListForm {...props} />
        )}
        validationSchema={CreateTodoFormValidationSchema}
      /> */}
       <ToDoListForm {...props} />
    </>
  );
};
export default ToDos;
