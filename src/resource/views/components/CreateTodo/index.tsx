import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import { useParams } from 'react-router-dom';

import CreateTodoForm from './CreateTodoForm';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import {
  ICreateTodoFormValues,
  IReactSelectInterface
} from '../../../../interfaces';
import { languageTranslation, logger } from '../../../../helpers';
import { toast } from 'react-toastify';
import { CreateTodoFormValidationSchema } from '../../../validations';
import { client } from '../../../../config';
import {
  ProfileQueries,
  CareInstitutionQueries
} from '../../../../graphql/queries';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { ToDoMutations } from '../../../../graphql/Mutations';
import moment from 'moment';
const [VIEW_PROFILE] = ProfileQueries;
const [ADD_TO_DO] = ToDoMutations;
const [, , , , GET_CONTACT_LIST_BY_ID] = CareInstitutionQueries;

const CreateTodo: FunctionComponent<any> = (props: any) => {
  console.log(props);

  let { id } = useParams();
  const userId: any | undefined = id;
  console.log('userId', userId);

  //To get contact list by id
  const [
    fetchContactsByUserID,
    { data: contactList, loading: contactListLoading }
  ] = useLazyQuery<any>(GET_CONTACT_LIST_BY_ID);

  useEffect(() => {
    // Fetch contact details by care institution id
    if (userId && props.userRole === 'careInstitution') {
      fetchContactsByUserID({
        variables: { userId: parseInt(userId) }
      });
    }
  }, []);

  // To add todo details into db
  const [addToDo, { error, data }] = useMutation<{ toDoInput: any }>(ADD_TO_DO);

  const handleSubmit = async (
    values: ICreateTodoFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ICreateTodoFormValues>
  ) => {
    try {
      const { time, comment, date, priority, juridiction, contact } = values;
      const toDoInput: any = {
        time,
        comment,
        date,
        priority: priority && priority.value ? priority.value : null,
        juridiction,
        userId: parseInt(userId),
        userType: props.userRole.toLowerCase(),
        contact: contact && contact.value ? contact.value : null
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
    juridiction: '',
    contact: undefined
  };

  // set contact list options
  const contactOptions: IReactSelectInterface[] | undefined = [];
  if (contactList && contactList.getContactsByUserID) {
    const { getContactsByUserID } = contactList;
    if (getContactsByUserID && getContactsByUserID.length) {
      getContactsByUserID.map((list: any) => {
        return contactOptions.push({
          label: `${list.firstName} ${list.surName} (${list.contactType})`,
          value: list.id ? list.id : ''
        });
      });
    }
  }

  return (
    <>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        children={(formikProps: FormikProps<ICreateTodoFormValues>) => (
          <CreateTodoForm
            {...formikProps}
            {...props}
            contactOptions={contactOptions}
          />
        )}
        validationSchema={CreateTodoFormValidationSchema}
      />
      {/* <CreateTodoForm {...props} /> */}
    </>
  );
};
export default CreateTodo;
