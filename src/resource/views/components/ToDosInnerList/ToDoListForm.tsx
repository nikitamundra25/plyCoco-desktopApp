import React, { FunctionComponent } from 'react';
import {
  Table,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import moment from 'moment';
import { languageTranslation } from '../../../../helpers';
import '../../pages/CareGiver/caregiver.scss';
import { defaultDateFormat, TODO_PAGE_LIMIT } from '../../../../config';
import { FormikProps } from 'formik';
import { ISearchToDoValues } from '../../../../interfaces';
import { useLocation } from 'react-router-dom';
import Loader from '../../containers/Loader/Loader';
import { NoSearchFound } from '../SearchFilter/NoSearchFound';
import * as qs from 'query-string';
import PaginationComponent from '../Pagination';

const ToDoListForm: FunctionComponent<FormikProps<ISearchToDoValues> & any> = (
  props: FormikProps<ISearchToDoValues> & any
) => {
  const { search } = useLocation();
  // const path = [pathname, qs.stringify({ tab: 'reminders/todos' })].join('?');
  const query = qs.parse(search);

  const {
    called,
    loading,
    data,
    onPageChanged,
    handleStatusChange,
    handlePriorityChange,
    deleteToDo,
    editToDo,
    currentPage,
    userRole,
    Id
  } = props;

  let count = (currentPage - 1) * TODO_PAGE_LIMIT + 1;

  return (
    <>
      <div className='todo-section'>
        <div className='table-minheight'>
          <Table bordered hover responsive>
            <thead className='thead-bg'>
              <tr>
                <th className='sno-th-column text-center'>
                  {languageTranslation('S_NO')}
                </th>
                <th className='date-th-column'>
                  {languageTranslation('DATE_TIME')}{' '}
                </th>
                {userRole === 'careinstitution' ? (
                  <th className='contact-th-column'>
                    {languageTranslation('CONTACT')}
                  </th>
                ) : (
                  ''
                )}
                <th className='remark-col'>{languageTranslation('REMARKS')}</th>
                <th className='checkbox-th-column text-center'>
                  {' '}
                  {languageTranslation('DONE')}
                </th>
                <th className='checkbox-th-column text-center'>
                  {' '}
                  {languageTranslation('EXTERNAL')}
                </th>
                <th className='prio-col text-center'>
                  {' '}
                  {languageTranslation('PRIORITY')}
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
                data.getToDos.result.map((item: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className={
                        item.status === 'completed'
                          ? 'done-bg'
                          : moment().isAfter(item.date)
                          ? 'table-danger'
                          : ''
                      }
                    >
                      <td className='sno-th-column text-center'>
                        <span>{count++}</span>
                      </td>
                      <td className='date-th-column'>
                        {' '}
                        {`${moment(item.date).format(defaultDateFormat)}, ${
                          item.time
                        }`}
                      </td>
                      {userRole === 'careinstitution' ? (
                        <td className='contact-th-column'>
                          <span className=' word-wrap'>
                            {item.contact
                              ? `${item.contact.firstName} ${
                                  item.contact.surName
                                }  ${
                                  item.contact.contact_type
                                    ? `(${item.contact.contact_type.contactType})`
                                    : ''
                                }`
                              : '-'}
                          </span>
                        </td>
                      ) : (
                        ''
                      )}
                      <td className='remark-col'>
                        <span className='word-wrap'>{item.comment}</span>
                      </td>
                      <td className='checkbox-th-column text-center'>
                        <span className=' checkbox-custom '>
                          <input
                            type='checkbox'
                            id='check'
                            className=''
                            name={'status'}
                            checked={item.status === 'completed' ? true : false}
                            onChange={e =>
                              handleStatusChange(item.id, item.status, null)
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
                            checked={
                              item.juridiction === 'externally' ? true : false
                            }
                          />
                          <label className=''> </label>
                        </span>
                      </td>
                      <td className='priority-th-column'>
                        <div className='action-btn text-capitalize'>
                          <UncontrolledButtonDropdown className='custom-dropdown'>
                            <DropdownToggle
                              className={'text-capitalize m-width-72'}
                              caret
                              size='sm'
                            >
                              {item.priority === 'normal'
                                ? languageTranslation('NORMAL')
                                : item.priority}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                onClick={(e: any) =>
                                  handlePriorityChange(item.id, null, 'low')
                                }
                              >
                                {languageTranslation('LOW')}
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e: any) =>
                                  handlePriorityChange(item.id, null, 'normal')
                                }
                              >
                                {languageTranslation('NORMAL')}
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e: any) =>
                                  handlePriorityChange(item.id, null, 'high')
                                }
                              >
                                {languageTranslation('HIGH')}
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </div>
                      </td>
                      <td>
                        <div className={`action-btn `}>
                          <span
                            className='btn-icon mr-2'
                            id={`edit${index}`}
                            onClick={() => editToDo(item)}
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
                            onClick={() => deleteToDo(item.id)}
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
                    {query.toDoFilter ||
                    query.priority ||
                    query.search ||
                    query.sortByDate ? (
                      <NoSearchFound />
                    ) : (
                      <div className='no-data-section'>
                        <div className='no-data-icon'>
                          <i className='icon-ban' />
                        </div>
                        <h4 className='mb-1'>
                          {languageTranslation('NO_TODO_LIST')}{' '}
                        </h4>
                        <p>{languageTranslation('NO_TODO_LIST_MESSAGE')} </p>
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
      </div>
    </>
  );
};

export default ToDoListForm;
