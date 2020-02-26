import React, {
  Component,
  FunctionComponent,
  useEffect,
  useState
} from 'react';
import {
  Col,
  Row,
  FormGroup,
  Input,
  Table,
  Label,
  UncontrolledTooltip
} from 'reactstrap';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { languageTranslation } from '../../../../helpers';
import {
  defaultDateFormat,
  PAGE_LIMIT,
  AppRoutes,
  TODO_PAGE_LIMIT
} from '../../../../config';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { ToDoQueries } from '../../../../graphql/queries';
import Loader from '../../containers/Loader/Loader';
import { NoSearchFound } from '../../components/SearchFilter/NoSearchFound';
import moment from 'moment';
import CreateTodo from '../../components/CreateTodo';
import { ConfirmBox } from '../../components/ConfirmBox';
import { toast } from 'react-toastify';
import { ToDoMutations } from '../../../../graphql/Mutations';
import PaginationComponent from '../../components/Pagination';
import * as qs from 'query-string';
import {
  ISearchValues,
  ISearchToDoValues,
  IReactSelectInterface
} from '../../../../interfaces';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import Search from '../../components/SearchFilter';

const [GET_TO_DOS] = ToDoQueries;
const [
  ,
  ,
  UPDATE_CARE_INSTITUTION_TODO_STATUS,
  DELETE_CARE_INSTITUTION_TODO_STATUS
] = ToDoMutations;
let toastId: any = null;

const CareInstitutionTodo: FunctionComponent = () => {
  let { id } = useParams();
  let history = useHistory();
  const { pathname, search } = useLocation();

  const userId: string | undefined = id;
  const [showToDo, setShowToDo] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValues, setSearchValues] = useState<ISearchToDoValues | null>();

  const path = pathname.split('/');
  const userRole: string =
    path[1] === AppRoutes.CAREGIVER_TODO ? 'caregiver' : 'careinstitution';

  //To get todo list by id
  const [fetchToDoByUserID, { data, called, loading, refetch }] = useLazyQuery<
    any
  >(GET_TO_DOS, { fetchPolicy: 'no-cache' });

  // Mutation to update careInstitution todo status
  const [updateStatus] = useMutation<{
    id: string;
    status: string;
    priority: string;
  }>(UPDATE_CARE_INSTITUTION_TODO_STATUS);

  // Mutation to delete careInstitution todo status
  const [deleteStatus] = useMutation<{
    id: string;
  }>(DELETE_CARE_INSTITUTION_TODO_STATUS);

  useEffect(() => {
    const query = qs.parse(search);
    const current: string | any = history.location.search;
    let searchData: any = {};
    searchData = { ...qs.parse(current) };
    // Fetch TODO details by care giver or care institution according to path
    fetchToDoByUserID({
      variables: {
        userType: userRole,
        searchBy: '',
        priority: '',
        sortBy: '',
        futureOnly: false,
        limit: TODO_PAGE_LIMIT
      }
    });
  }, []);

  //  useEffect for searching, filtering
  useEffect(() => {
    const query = qs.parse(search);

    let searchBy: string = '';
    let sortBy: IReactSelectInterface | undefined = { label: '', value: '' };
    let sortByDate: IReactSelectInterface | undefined = {
      label: '',
      value: ''
    };
    let priority: IReactSelectInterface | undefined = { label: '', value: '' };

    // To handle display and query param text
    if (query) {
      const current: string | any = history.location.search;
      let searchData: any = {};
      searchData = { ...qs.parse(current) };

      if (searchData && searchData.search) {
        searchBy = searchData.search;
      }
      if (searchData && searchData.toDoFilter) {
        sortBy = searchData.toDoFilter;
      }
      if (searchData && searchData.sortByDate) {
        sortByDate = searchData.sortByDate;
      }
      if (searchData && searchData.priority) {
        priority = searchData.priority;
      }

      setSearchValues({
        toDoFilter: searchData.toDoFilter
          ? {
              label: searchData.toDoFilter,
              value: searchData.toDoFilter
            }
          : undefined,
        searchValue: searchData.search,
        priority: searchData.priority
          ? searchData.priority === 'normal'
            ? {
                label: languageTranslation('NORMAL'),
                value: searchData.priority
              }
            : {
                label: searchData.priority,
                value: searchData.priority
              }
          : undefined,
        sortByDate: searchData.sortByDate
          ? {
              label: searchData.sortByDate,
              value: searchData.sortByDate
            }
          : undefined
      });

      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
      // call query

      fetchToDoByUserID({
        variables: {
          userType: userRole,
          userId: userId ? parseInt(userId) : null,
          searchBy: searchBy ? searchBy : '',
          sortBy: searchData.toDoFilter ? searchData.toDoFilter : null,
          sortByDate: searchData.sortByDate ? searchData.sortByDate : null,
          priority: searchData.priority,
          limit: TODO_PAGE_LIMIT,
          page: query.page ? parseInt(query.page as string) : 1
        }
      });
    }
  }, [search]);

  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?'
    );
    history.push(path);
  };

  const editToDo = (list: any) => {
    setShowToDo(true);
    setSelectUser(list);
  };

  //  call refetch to update todo list
  const handleRefetch = () => {
    refetch();
  };

  const handleSubmit = async (
    { searchValue, toDoFilter, priority, sortByDate }: ISearchToDoValues,
    { setSubmitting }: FormikHelpers<ISearchToDoValues>
  ) => {
    let params: {
      [key: string]: any;
    } = {};
    params.page = 1;
    if (searchValue && searchValue !== '') {
      params.search = searchValue;
    }
    if (toDoFilter && toDoFilter.value !== '') {
      params.toDoFilter = toDoFilter.value !== '' ? toDoFilter.value : '';
    }
    if (priority && priority.value !== '') {
      params.priority = priority.value !== '' ? priority.value : '';
    }
    if (sortByDate && sortByDate.value !== '') {
      params.sortByDate = sortByDate.value !== '' ? sortByDate.value : '';
    }

    const path = [pathname, qs.stringify(params)].join('?');
    history.push(path);
  };

  const handleChange = async (id: any, status: string, priority: string) => {
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
            priority
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
  const handleUserRedirect = (id: any) => {
    if (path[1] !== 'caregiver-todo') {
      history.push(
        `${AppRoutes.CARE_INSTITUION_VIEW.replace(
          ':id',
          id
        )}?tab=${encodeURIComponent('reminders/todos')}`
      );
    } else {
      history.push(
        `${AppRoutes.CARE_GIVER_VIEW.replace(
          ':id',
          id
        )}?tab=${encodeURIComponent('reminders/todos')}`
      );
    }
  };

  let count = (currentPage - 1) * TODO_PAGE_LIMIT + 1;

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
  console.log('values', values);

  return (
    <>
      <div>
        <h5 className='content-title'>
          {path[1] === 'caregiver-todo'
            ? languageTranslation('MENU_TO_DO_CARE_GIVER')
            : languageTranslation('MENU_TO_DO_INSTITUTION')}
        </h5>
        <Row>
          <Col lg={'12'}>
            <div className='filter-form form-section'>
              <Formik
                initialValues={values}
                enableReinitialize={true}
                onSubmit={handleSubmit}
                children={(props: FormikProps<ISearchToDoValues>) => (
                  <Search {...props} label={'toDos'} />
                )}
              />
            </div>
            <div className='archieve-table-minheight '>
              <Table bordered hover responsive>
                <thead className='thead-bg'>
                  <tr>
                    <th className='sno-th-column text-center'>
                      {languageTranslation('S_NO')}
                    </th>
                    <th className='date-th-column'>
                      {languageTranslation('DATE_TIME')}{' '}
                    </th>
                    <th className='file-th-column'>
                      {' '}
                      {languageTranslation('NAME')}
                    </th>
                    {userRole !== 'caregiver' ? (
                      <th className='contact-th-column'>
                        {languageTranslation('CONTACT')}
                      </th>
                    ) : (
                      ''
                    )}
                    <th className='remark-col'>
                      {languageTranslation('REMARKS')}
                    </th>
                    <th className='checkbox-th-column text-center'>
                      {' '}
                      {languageTranslation('DONE')}
                    </th>
                    <th className='checkbox-th-column text-center'>
                      {' '}
                      {languageTranslation('EXTERNAL')}
                    </th>
                    <th className={'text-center action-th-column'}>
                      {languageTranslation('TABEL_HEAD_CG_ACTION')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!called || loading ? (
                    <tr>
                      <td className={'table-loader'} colSpan={8}>
                        <Loader />
                      </td>
                    </tr>
                  ) : data &&
                    data.getToDos &&
                    data.getToDos.result &&
                    data.getToDos.result.length ? (
                    data.getToDos.result.map((list: any, index: number) => {
                      return (
                        <tr
                          className={
                            list.status === 'completed'
                              ? 'done-bg'
                              : moment().isAfter(list.date)
                              ? 'table-danger'
                              : ''
                          }
                          key={index}
                        >
                          <td className='sno-th-column text-center'>
                            {count++}
                          </td>
                          <td className='date-th-column'>
                            {' '}
                            {`${moment(list.date).format(defaultDateFormat)}, ${
                              list.time
                            }`}{' '}
                          </td>
                          <td className='file-th-column'>
                            <span
                              className='view-more-link word-wrap'
                              onClick={() => handleUserRedirect(list.userId)}
                            >
                              {list.user
                                ? `${list.user.firstName} ${list.user.lastName}`
                                : '-'}
                            </span>
                          </td>
                          {userRole !== 'caregiver' ? (
                            <td className='contact-th-column'>
                              <span className=' word-wrap'>
                                {list.contact
                                  ? `${list.contact.firstName} ${
                                      list.contact.surName
                                    }  ${
                                      list.contact.contact_type
                                        ? `(${list.contact.contact_type.contactType})`
                                        : ''
                                    }`
                                  : '-'}
                              </span>
                            </td>
                          ) : (
                            ''
                          )}
                          <td className='remark-col'>
                            <span className='word-wrap'>{list.comment}</span>
                          </td>
                          <td className='checkbox-th-column text-center'>
                            <span className=' checkbox-custom '>
                              <input
                                type='checkbox'
                                id='check'
                                className=''
                                name={'status'}
                                checked={
                                  list.status === 'completed' ? true : false
                                }
                                onChange={e =>
                                  handleChange(
                                    list.id,
                                    list.status,
                                    list.priority
                                  )
                                }
                              />
                              <label className=''> </label>
                            </span>
                          </td>
                          <td className='checkbox-th-column text-center'>
                            <span className=' checkbox-custom '>
                              <input
                                type='checkbox'
                                id='checkAll'
                                className='cursor-notallowed'
                                name={'juridiction'}
                                disabled={list.juridiction === 'internally'}
                                checked={
                                  list.juridiction === 'externally'
                                    ? true
                                    : false
                                }
                              />
                              <label className=''> </label>
                            </span>
                          </td>
                          <td>
                            <div className={`action-btn `}>
                              <span
                                className='btn-icon mr-2'
                                id={`edit${index}`}
                                onClick={() => editToDo(list)}
                              >
                                <UncontrolledTooltip
                                  placement='top'
                                  target={`edit${index}`}
                                >
                                  {languageTranslation('EDIT')}
                                </UncontrolledTooltip>
                                <i className='fa fa-pencil'></i>
                              </span>
                              <span
                                className={`btn-icon mr-2 `}
                                id={`delete${index}`}
                                onClick={() => deleteToDo(list.id)}
                              >
                                <UncontrolledTooltip
                                  placement='top'
                                  target={`delete${index}`}
                                >
                                  {languageTranslation('DELETE')}
                                </UncontrolledTooltip>
                                <i className='fa fa-trash'></i>
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr className={'text-center no-hover-row'}>
                      <td colSpan={8} className={'pt-5 pb-5'}>
                        {search ? (
                          <NoSearchFound />
                        ) : (
                          <div className='no-data-section'>
                            <div className='no-data-icon'>
                              <i className='icon-ban' />
                            </div>
                            <h4 className='mb-1'>
                              {languageTranslation('NO_TODO_LIST')}
                            </h4>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            {data && data.getToDos && data.getToDos.totalCount ? (
              <PaginationComponent
                totalRecords={data.getToDos.totalCount}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                pageLimit={TODO_PAGE_LIMIT}
              />
            ) : null}
          </Col>
        </Row>
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
          userRole={
            path[1] === AppRoutes.CAREGIVER_TODO
              ? 'caregiver'
              : 'careInstitution'
          }
          handleRefetch={handleRefetch}
        />
      </div>
    </>
  );
};

export default CareInstitutionTodo;
