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
// import "./index.scss";
import { useHistory, useParams, useLocation } from 'react-router-dom';
// import EmailMenus from "../CareGiver/Emails/EmailMenus";
import { languageTranslation } from '../../../../helpers';
import Select from 'react-select';
import {
  Priority,
  TodoFilter,
  defaultDateFormat,
  PAGE_LIMIT
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
import { IReactSelectInterface } from '../../../../interfaces';

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

  const userId: any | undefined = id;
  const [showToDo, setShowToDo] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const location = useLocation();
  const { pathname } = location;
  const { search } = useLocation();

  const path = pathname.split('/');

  //To get todo list by id
  const [fetchToDoByUserID, { data, called, loading, refetch }] = useLazyQuery<
    any
  >(GET_TO_DOS);

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
    // Fetch TODO details by care institution id
    const userRole: string =
      path[1] === 'caregiver-todo' ? 'caregiver' : 'careinstitution';

    fetchToDoByUserID({
      variables: {
        userType: userRole,
        searchBy: '',
        priority: '',
        sortBy: '',
        futureOnly: false,
        limit: PAGE_LIMIT
      }
    });
  }, []);

  //  useEffect for searching, filtering
  useEffect(() => {
    const query = qs.parse(search);
    let searchBy: string = '';
    let sortBy: IReactSelectInterface | undefined = { label: '', value: '' };
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
      const userRole: string =
        path[1] === 'caregiver-todo' ? 'caregiver' : 'careinstitution';
      // call query
      fetchToDoByUserID({
        variables: {
          userType: userRole,
          userId: parseInt(userId),
          searchBy,
          sortBy: search.sortBy === 'all' ? null : search.sortBy,
          priority: search.priority,
          futureOnly,
          limit: PAGE_LIMIT,
          page: query.page ? parseInt(query.page as string) : 1
        }
      });

      // if (search.sortBy) {
      //   sortBy =
      //     TodoStatus[
      //       TodoStatus.map(item => {
      //         return item.value;
      //       }).indexOf(search.sortBy)
      //     ];
      // }

      // if (search.priority) {
      //   priority =
      //     Priority[
      //       Priority.map(item => {
      //         return item.value;
      //       }).indexOf(search.priority)
      //     ];
      // }

      // setSearchValues({
      //   searchBy,
      //   futureOnly,
      //   sortBy,
      //   priority
      // });
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
            languageTranslation('CARE_INSTITUTION_STATUS_UPDATE_MSG')
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
          toast.success(
            languageTranslation('CARE_INSTITUTION_STATUS_UPDATE_MSG')
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
  let count = (currentPage - 1) * PAGE_LIMIT + 1;

  return (
    <>
      <div>
        <h5 className='content-title'>
          {languageTranslation('MENU_TO_DO_INSTITUTION')}
        </h5>
        <Row>
          <Col lg={'12'}>
            <div className='filter-form form-section'>
              <Row>
                <Col lg={'3'} md={'3'}>
                  <FormGroup className='mb-2'>
                    <Label className='col-form-label'>
                      {languageTranslation('SEARCH_LABEL')} :
                    </Label>
                    <Input
                      type='text'
                      name='search'
                      id='search'
                      placeholder={languageTranslation('SEARCH_LABEL')}
                    />
                  </FormGroup>
                </Col>
                <Col lg={'2'} md={'3'}>
                  <FormGroup>
                    <Label className='col-form-label'>
                      {languageTranslation('STATUS_LABEL')} :
                    </Label>
                    <Select
                      placeholder={languageTranslation('STATUS_PLACEHOLDER')}
                      classNamePrefix='custom-inner-reactselect'
                      className={'custom-reactselect'}
                      options={TodoFilter}
                    />
                  </FormGroup>
                </Col>
                <Col lg={'2'} md={'3'}>
                  <FormGroup>
                    <Label className='col-form-label'>
                      {languageTranslation('PRIORITY')} :
                    </Label>
                    <Select
                      placeholder='Select Priority'
                      classNamePrefix='custom-inner-reactselect'
                      className={'custom-reactselect'}
                      options={Priority}
                    />
                  </FormGroup>
                </Col>
                <Col lg={'2'} md={'3'}>
                  <div className='label-height'></div>
                  <div className='filter-btn-wrap mb-2'>
                    <span className='btn-filter mr-2' id='search1'>
                      <UncontrolledTooltip placement='top' target='search1'>
                        {languageTranslation('SEARCH_LABEL')}
                      </UncontrolledTooltip>
                      <i className='fa fa-search mr-1'></i>
                      {languageTranslation('SEARCH_LABEL')}
                    </span>
                    <span className='btn-filter mr-2' id='reset'>
                      <UncontrolledTooltip placement='top' target='reset'>
                        {languageTranslation('RESET_LABEL')}
                      </UncontrolledTooltip>
                      <i className='fa fa-refresh mr-1'></i>
                      {languageTranslation('RESET_LABEL')}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>

            <Table bordered hover responsive>
              <thead className='thead-bg'>
                <tr>
                  <th className='sno-th-column text-center'>
                    {languageTranslation('S_NO')}
                  </th>
                  <th className='date-th-column'>
                    {languageTranslation('DATE')}{' '}
                  </th>
                  <th className='file-th-column'>
                    {' '}
                    {languageTranslation('NAME')}
                  </th>
                  {path[1] !== 'caregiver-todo' ? (
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
                      <tr>
                        <td className='sno-th-column text-center'>
                          {index + 1}
                        </td>
                        <td className='date-th-column'>
                          {' '}
                          {`${moment(list.date).format(defaultDateFormat)} ${
                            list.time
                          }`}{' '}
                        </td>
                        <td className='file-th-column'>
                          <span className='view-more-link word-wrap'>
                            {list.user
                              ? `${list.user.firstName} ${list.user.lastName}`
                              : '-'}
                          </span>
                        </td>
                        {path[1] !== 'caregiver-todo' ? (
                          <td className='contact-th-column'>
                            <span className='view-more-link word-wrap'>
                              {list.contact
                                ? `${list.contact.firstName} ${list.contact.surName}`
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
                          <span className='checkboxli checkbox-custom checkbox-default'>
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
                          <span className='checkboxli checkbox-custom checkbox-default'>
                            <input
                              type='checkbox'
                              id='checkAll'
                              className=''
                              name={'juridiction'}
                              checked={
                                list.juridiction === 'externally' ? true : false
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
                                Edit
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
                                Move to trash
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
                      {/* {isFilterApplied ? ( */}
                      {/* <NoSearchFound /> */}
                      {/* ) : ( */}
                      <div className='no-data-section'>
                        <div className='no-data-icon'>
                          <i className='icon-ban' />
                        </div>
                        <h4 className='mb-1'>
                          Currently there are no careinstitution todo added.{' '}
                        </h4>
                        <p>Please click above button to add new. </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {data && data.getToDos && data.getToDos.totalCount ? (
              <PaginationComponent
                totalRecords={data.getToDos.totalCount}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
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
            path[1] === 'caregiver-todo' ? 'caregiver' : 'careInstitution'
          }
        />
      </div>
    </>
  );
};

export default CareInstitutionTodo;
