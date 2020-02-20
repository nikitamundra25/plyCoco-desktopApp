import React, { FunctionComponent, useEffect, useState } from 'react';
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
const [ADD_TO_DO, UPDATE_TO_DO] = ToDoMutations;
const [, , , , GET_CONTACT_LIST_BY_ID] = CareInstitutionQueries;

const CreateTodo: FunctionComponent<any> = (mainProps: any) => {
  const { userRole, handleClose, userData, show, name, editToDo } = mainProps;

  let { id } = useParams();
  let userId: any | undefined = id;

  //To get contact list by id
  const [
    fetchContactsByUserID,
    { data: contactList, loading: contactListLoading }
  ] = useLazyQuery<any>(GET_CONTACT_LIST_BY_ID);
  userId = userId ? userId : userData ? userData.userId : undefined;

  useEffect(() => {
    // Fetch contact details by care institution id
    if (userId && userRole === 'careInstitution') {
      fetchContactsByUserID({
        variables: { userId: parseInt(userId) }
      });
    }
  }, [userData]);

  // To add todo details into db
  const [addToDo, { error, data }] = useMutation<{ toDoInput: any }>(ADD_TO_DO);
  const [editToDoList, {}] = useMutation<{ id: number; toDoInput: any }>(
    UPDATE_TO_DO
  );

  useEffect(() => {
    if (data) {
      mainProps.newDataUpdate();
    }
  }, [data]);

  const handleSubmit = async (
    values: ICreateTodoFormValues,
    { setSubmitting, resetForm }: FormikHelpers<ICreateTodoFormValues>
  ) => {
    try {
      const { time, comment, date, priority, juridiction, contact } = values;
      const toDoInput: any = {
        time,
        comment,
        date: date ? date : new Date(),
        priority: priority && priority.value ? priority.value : null,
        juridiction,
        userId: parseInt(userId),
        userType: userRole.toLowerCase(),
        contactId: contact && contact.value ? parseInt(contact.value) : null
      };
      if (userData) {
        await editToDoList({
          variables: {
            id: parseInt(userData.id),
            toDoInput
          }
        });
      } else {
        await addToDo({
          variables: {
            toDoInput
          }
        });
      }
      resetForm();
      toast.success(languageTranslation('ADD_NEW_DEPARTMENT_CARE_INSTITUTION'));
      handleClose();
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

  const [todoValues, setTodoValues] = useState<ICreateTodoFormValues>({
    time: '',
    comment: '',
    date: '',
    priority: undefined,
    juridiction: '',
    contact: undefined
  });

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

  useEffect(() => {
    if (userData) {
      const { time, comment, date, priority, juridiction, contact } = userData;
      setTodoValues({
        time,
        comment,
        date: new Date(date),
        priority: priority
          ? {
              label: priority.toUpperCase(),
              value: priority
            }
          : undefined,
        juridiction,
        contact: contact
          ? {
              label: `${contact.firstName} ${contact.surName} (${contact.contactType})`,
              value: contact.id ? contact.id : ''
            }
          : undefined
      });
    } else {
      mainProps.setisnewDataUpdate();
      setTodoValues({
        time: '',
        comment: '',
        date: '',
        priority: undefined,
        juridiction: 'internally',
        contact: undefined
      });
    }
  }, [show]);

  return (
    <>
      <Formik
        initialValues={todoValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ICreateTodoFormValues>) => (
          <CreateTodoForm
            {...props}
            contactOptions={contactOptions}
            handleClose={() => {
              props.resetForm();
              handleClose();
            }}
            show={show}
            userRole={userRole}
            editToDo={editToDo}
            name={name}
          />
        )}
        validationSchema={CreateTodoFormValidationSchema}
      />
      {/* <CreateTodoForm {...props} /> */}
    </>
  );
};
export default CreateTodo;
