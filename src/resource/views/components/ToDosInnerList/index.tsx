import React, { FunctionComponent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import ToDoListForm from './ToDoListForm';
import * as qs from 'query-string';
import { ToDoQueries } from '../../../../graphql/queries';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  IReactSelectInterface,
  ISearchToDoValues
} from '../../../../interfaces';
import { FormikHelpers, FormikProps, Formik } from 'formik';
import {
  PAGE_LIMIT,
  TodoStatus,
  Priority,
  TodoDateFilter
} from '../../../../config';
import { ConfirmBox } from '../ConfirmBox';
import { languageTranslation } from '../../../../helpers';
import { toast } from 'react-toastify';
import { ToDoMutations } from '../../../../graphql/Mutations';
import CreateTodo from '../CreateTodo';
const [
  ,
  ,
  UPDATE_CARE_INSTITUTION_TODO_STATUS,
  DELETE_CARE_INSTITUTION_TODO_STATUS
] = ToDoMutations;
const [GET_TO_DOS] = ToDoQueries;
let toastId: any = null;
const ToDoList: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const { userRole } = mainProps;
  let { id } = useParams();
  const userId: any | undefined = id;

  let history = useHistory();
  const { search, pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValues, setSearchValues] = useState<ISearchToDoValues | null>();
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);
  const [showToDo, setShowToDo] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<any>({});

  // To get todo list from db
  const [fetchToDoList, { data, called, loading, refetch }] = useLazyQuery<
    any,
    any
  >(GET_TO_DOS, {
    fetchPolicy: 'no-cache'
  });

  // Mutation to delete careInstitution todo status
  const [deleteStatus] = useMutation<{
    id: string;
  }>(DELETE_CARE_INSTITUTION_TODO_STATUS);

  // Mutation to update careInstitution todo status
  const [updateStatus] = useMutation<{
    id: string;
    status: string;
    priority: string;
  }>(UPDATE_CARE_INSTITUTION_TODO_STATUS);

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [mainProps.isnewDataUpdate]);

  // Delete todo
  const deleteToDo = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('DELETE_CARE_INSTITUTION_TODO')
    });
    if (!value) {
      return;
    } else {
      try {
        toast.dismiss();
        await deleteStatus({
          variables: {
            id: parseInt(id)
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toast.success(languageTranslation('TODO_SUCCESS_DELETE_MSG'));
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  const editToDo = (list: any) => {
    setShowToDo(true);
    setSelectUser(list);
  };

  useEffect(() => {
    const query = qs.parse(search);
    let searchBy: string = '';
    let sortBy: IReactSelectInterface | undefined = { label: '', value: '' };
    let sortByDate: IReactSelectInterface | undefined = {
      label: '',
      value: ''
    };
    let priority: IReactSelectInterface | undefined = { label: '', value: '' };
    let futureOnly: boolean | undefined = false;

    // To handle display and query param text
    if (query) {
      const current: string = history.location.search;
      let search: any = {};
      search = { ...qs.parse(current) };
      if (search.searchBy) {
        searchBy = search.searchBy;
      }

      if (search.futureOnly) {
        futureOnly = JSON.parse(search.futureOnly);
      }

      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
      // call query
      fetchToDoList({
        variables: {
          userId: parseInt(userId),
          searchBy,
          userType: userRole,
          sortBy: search.sortBy === 'all' ? null : search.sortBy,
          sortByDate: search.sortByDate,
          priority: search.priority,
          futureOnly,
          limit: PAGE_LIMIT,
          page: query.page ? parseInt(query.page as string) : 1
        }
      });

      if (search.sortBy) {
        sortBy =
          TodoStatus[
            TodoStatus.map(item => {
              return item.value;
            }).indexOf(search.sortBy)
          ];
      }

      if (search.sortByDate) {
        sortByDate =
          TodoDateFilter[
            TodoDateFilter.map(item => {
              return item.value;
            }).indexOf(search.sortByDate)
          ];
      }

      if (search.priority) {
        priority =
          Priority[
            Priority.map(item => {
              return item.value;
            }).indexOf(search.priority)
          ];
      }

      setSearchValues({
        searchBy,
        futureOnly,
        sortBy,
        sortByDate,
        priority
      });
    }
  }, [search]); // It will run when the search value gets changed

  const handleSubmit = async (
    values: ISearchToDoValues,
    {}: FormikHelpers<ISearchToDoValues>
  ) => {
    const { searchBy, sortBy, priority, futureOnly, sortByDate } = values;
    let params: any = qs.parse(search);

    // params.futureOnly = false;
    params.page = 1;

    if (searchBy) {
      params.searchBy = searchBy;
    }
    if (sortBy && sortBy.value !== '') {
      params.sortBy = sortBy.value;
    }
    if (sortByDate && sortByDate.value !== '') {
      params.sortByDate = sortByDate.value;
    }
    if (priority && priority.value !== '') {
      params.priority = priority.value;
    }

    // if (futureOnly) {
    //   params.futureOnly = futureOnly;
    // }

    const path = [pathname, qs.stringify(params)].join('?');
    history.push(path);
  };

  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?'
    );
    history.push(path);
  };

  const {
    searchValue = '',
    sortBy = undefined,
    sortByDate = undefined,
    toDoFilter = undefined,
    priority = undefined,
    futureOnly = false
  } = searchValues ? searchValues : {};

  const values: ISearchToDoValues = {
    searchValue,
    sortBy,
    sortByDate,
    toDoFilter,
    priority,
    futureOnly
  };

  const handleStatusChange = async (id: any, status: string, priority: any) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text:
        status === 'pending'
          ? languageTranslation('CONFIRM_CARE_INSTITUTION_TODO_DONE_MSG')
          : languageTranslation('CONFIRM_CARE_INSTITUTION_TODO_UNDONE_MSG')
    });
    if (!value) {
      return;
    } else {
      try {
        toast.dismiss();
        await updateStatus({
          variables: {
            id: parseInt(id),
            status: status === 'pending' ? 'completed' : 'pending',
            priority: null
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toast.success(
            languageTranslation('TODO_STATUS_UPDATED_SUCCESSFULLY')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  const handlePriorityChange = async (
    id: any,
    status: string,
    priority: string
  ) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_CARE_INSTITUTION_TODO_PRIORITY_MSG')
    });
    if (!value) {
      return;
    } else {
      try {
        toast.dismiss();
        await updateStatus({
          variables: {
            id: parseInt(id),
            status: null,
            priority: priority
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toast.success(
            languageTranslation('TODO_PRIORITY_UPDATED_SUCCESSFULLY')
          );
        }
      } catch (error) {
        const message = error.message
          .replace('SequelizeValidationError: ', '')
          .replace('Validation error: ', '')
          .replace('GraphQL error: ', '');
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  console.log('sortByDate', sortByDate);

  return (
    <>
      <Formik
        initialValues={values}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        children={(props: FormikProps<ISearchToDoValues>) => (
          <ToDoListForm
            {...props}
            onPageChanged={onPageChanged}
            called={called}
            loading={loading}
            data={data}
            isFilterApplied={isFilterApplied}
            handleStatusChange={handleStatusChange}
            handlePriorityChange={handlePriorityChange}
            currentPage={currentPage}
            userRole={userRole}
            deleteToDo={deleteToDo}
            editToDo={editToDo}
          />
        )}
      />
      <CreateTodo
        show={showToDo ? true : false}
        handleClose={() => setShowToDo(false)}
        name={
          selectUser && selectUser.user
            ? `${selectUser.user.firstName} ${selectUser.user.lastName}`
            : null
        }
        editToDo={true}
        userData={selectUser}
        userRole={userRole === 'caregiver' ? 'caregiver' : 'careInstitution'}
      />
    </>
  );
};
export default ToDoList;
