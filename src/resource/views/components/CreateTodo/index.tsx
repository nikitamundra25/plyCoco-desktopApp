import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { useParams } from 'react-router-dom';

import CreateTodoForm from './CreateTodoForm';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { ICreateTodoFormValues } from '../../../../interfaces';
import { languageTranslation, logger } from '../../../../helpers';
import { toast } from 'react-toastify';
import { CreateTodoFormValidationSchema } from '../../../validations';
import { client } from '../../../../config';
import { ProfileQueries } from '../../../../graphql/queries';
import { useMutation } from '@apollo/react-hooks';
import { ToDoMutations } from '../../../../graphql/Mutations';
import moment from 'moment';
const [VIEW_PROFILE] = ProfileQueries;
const [ADD_TO_DO] = ToDoMutations;
const CreateTodo: FunctionComponent<any> = (props: any) => {
  console.log(props);

  let { id } = useParams();
  const userId: any | undefined = id;
  console.log('userId', userId);

  // const userData: any = client.readQuery({
  //   query: VIEW_PROFILE
  // });

  // const { viewAdminProfile }: any = userData ? userData : {};

  // const { firstName = '', lastName = '', id = '' } = viewAdminProfile
  //   ? viewAdminProfile
  //   : {};

  // To add todo details into db
  const [addToDo, { error, data }] = useMutation<{ toDoInput: any }>(ADD_TO_DO);

  const handleSubmit = async (
    values: ICreateTodoFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ICreateTodoFormValues>
  ) => {
    try {
      const { time, comment, date, priority, juridiction } = values;
      const toDoInput: any = {
        time,
        comment,
        date,
        priority: priority && priority.value ? priority.value : null,
        juridiction,
        userId: parseInt(userId),
        userType: props.userRole.toLowerCase()
      };

      await addToDo({
        variables: {
          toDoInput
        }
      });
      resetForm();
      toast.success(languageTranslation('ADD_NEW_DEPARTMENT_CARE_INSTITUTION'));

      setSubmitting(false);
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
      logger(error);
    }
    setSubmitting(false);
  };

  let values: ICreateTodoFormValues;

  values = {
    time: '',
    comment: '',
    date: '',
    priority: undefined,
    juridiction: ''
  };

  return (
    <>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        children={(formikProps: FormikProps<ICreateTodoFormValues>) => (
          <CreateTodoForm {...formikProps} {...props} />
        )}
        validationSchema={CreateTodoFormValidationSchema}
      />
      {/* <CreateTodoForm {...props} /> */}
    </>
  );
};
export default CreateTodo;
