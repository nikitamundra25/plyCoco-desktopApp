import React, { FunctionComponent, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import CreateTodoForm from './CreateTodoForm';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import {
  ICreateTodoFormValues,
  IReactSelectInterface
} from '../../../../interfaces';
import { languageTranslation, logger } from '../../../../helpers';
import { toast } from 'react-toastify';
import { CreateTodoFormValidationSchema } from '../../../validations';
import { AppRoutes } from '../../../../config';
import {
  ProfileQueries,
  CareInstitutionQueries
} from '../../../../graphql/queries';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { ToDoMutations } from '../../../../graphql/Mutations';
const [VIEW_PROFILE] = ProfileQueries;
const [ADD_TO_DO, UPDATE_TO_DO] = ToDoMutations;
const [, , , , GET_CONTACT_LIST_BY_ID] = CareInstitutionQueries;

const CreateTodo: FunctionComponent<any> = (mainProps: any) => {
  const {
    userRole,
    handleClose,
    userData,
    show,
    name,
    editToDo,
    handleRefetch
  } = mainProps;

  let history = useHistory();

  let { id } = useParams();
  let userId: any | undefined = id;

  //To get contact list by id
  const [
    fetchContactsByUserID,
    { data: contactList, loading: contactListLoading, refetch }
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
      if (userRole === 'careInstitution') {
        history.push(
          `${AppRoutes.CARE_INSTITUION_VIEW.replace(
            ':id',
            mainProps.Id
          )}?tab=${encodeURIComponent('reminders/todos')}`
        );
      } else {
        history.push(
          `${AppRoutes.CARE_GIVER_VIEW.replace(
            ':id',
            mainProps.Id
          )}?tab=${encodeURIComponent('reminders/todos')}`
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [mainProps.newContactAdded]);

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
        userType: userRole=== "careInstitution" ? "canstitution":"caregiver",
        contactId: contact && contact.value ? parseInt(contact.value) : null
      };
      if (userData) {
        await editToDoList({
          variables: {
            id: parseInt(userData.id),
            toDoInput
          }
        });
        handleRefetch();
        toast.success(languageTranslation('TODO_UPDATE_SUCCESS'));
      } else {
        await addToDo({
          variables: {
            toDoInput
          }
        });
        toast.success(languageTranslation('TODO_ADD_SUCCESS'));
      }
      resetForm();
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
          label: `${list.firstName} ${list.surName} ${
            list.contact_type ? `(${list.contact_type.contactType})` : ''
          }`,
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
              label:
                priority === 'normal'
                  ? 'Medium'
                  : priority.charAt(0).toUpperCase() + priority.slice(1),
              value: priority
            }
          : undefined,
        juridiction,
        contact: contact
          ? {
              label: `${contact.firstName} ${contact.surName} ${
                contact.contact_type
                  ? `(${contact.contact_type.contactType})`
                  : ''
              }`,
              value: contact.id ? contact.id : ''
            }
          : undefined
      });
    } else {
      mainProps.setisnewDataUpdate();
      mainProps.setnewContactAdded();
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
