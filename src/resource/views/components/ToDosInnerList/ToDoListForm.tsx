import React, { FunctionComponent } from 'react';
import {
  Row,
  Col,
  Table,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
  Button
} from 'reactstrap';
import moment from 'moment';
import { languageTranslation, logger } from '../../../../helpers';
import '../../pages/CareGiver/caregiver.scss';
import Select from 'react-select';
import { Priority, TodoStatus, PAGE_LIMIT } from '../../../../config';
import { FormikProps, Form } from 'formik';
import {
  IReactSelectInterface,
  ISearchToDoValues
} from '../../../../interfaces';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from '../../containers/Loader/Loader';
import { NoSearchFound } from '../SearchFilter/NoSearchFound';
import * as qs from 'query-string';
import PaginationComponent from '../Pagination';

const ToDoListForm: FunctionComponent<FormikProps<ISearchToDoValues> & any> = (
  props: FormikProps<ISearchToDoValues> & any
) => {
  let history = useHistory();
  const { search, pathname } = useLocation();
  const path = [pathname, qs.stringify({ tab: 'reminders/todos' })].join('?');

  const {
    values: { searchBy, sortBy, priority, futureOnly },
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    called,
    loading,
    data,
    isFilterApplied,
    onPageChanged,
    currentPage
  } = props;

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, 'value');
    setFieldValue(name, selectOption);
  };

  let count = (currentPage - 1) * PAGE_LIMIT + 1;

  return (
    <>
      <div className='todo-section'>
        <h5 className='content-title'>
          {languageTranslation('CG_SUB_MENU_REMINDER')}
        </h5>
        <Form className='filter-form form-section' onSubmit={handleSubmit}>
          <Row>
            <Col lg={'3'} md={'3'}>
              <FormGroup className='mb-2'>
                <Label className='col-form-label'>
                  {languageTranslation('SEARCH_LABEL')} :
                </Label>
                <Input
                  type='text'
                  name='searchBy'
                  id='search'
                  value={searchBy}
                  onChange={handleChange}
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
                  options={TodoStatus}
                  isSearchable={false}
                  isClearable={true}
                  value={sortBy && sortBy.value !== '' ? sortBy : null}
                  onChange={(value: any) => handleSelect(value, 'sortBy')}
                />
              </FormGroup>
            </Col>
            <Col lg={'2'} md={'3'}>
              <FormGroup>
                <Label className='col-form-label'>
                  {languageTranslation('PRIORITY')} :
                </Label>
                <Select
                  placeholder={languageTranslation('PRIORITY')}
                  classNamePrefix='custom-inner-reactselect'
                  className={'custom-reactselect'}
                  options={Priority}
                  isSearchable={false}
                  isClearable={true}
                  value={priority && priority.value !== '' ? priority : null}
                  onChange={(value: any) => handleSelect(value, 'priority')}
                />
              </FormGroup>
            </Col>
            <Col lg={'1'} md={'3'}>
              <FormGroup>
                <Label className='col-form-label'>
                  {languageTranslation('FUTURE_ONLY')} :
                </Label>
                <span className='checkboxli checkbox-custom checkbox-default'>
                  <input
                    type='checkbox'
                    id='check'
                    className=''
                    name={'futureOnly'}
                    checked={futureOnly}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const {
                        target: { checked }
                      } = e;
                      setFieldValue('futureOnly', checked);
                    }}
                  />
                  <Label for='check'></Label>
                </span>
              </FormGroup>
            </Col>
            <Col lg={'2'} md={'3'}>
              <div className='label-height'></div>
              <div className='filter-btn-wrap'>
                <Button className='btn-filter mr-2' type='submit' id='search1'>
                  <UncontrolledTooltip placement='top' target='search1'>
                    {languageTranslation('SEARCH_LABEL')}
                  </UncontrolledTooltip>
                  <i className='fa fa-search'></i>
                  <span className='search-text'>
                    {languageTranslation('SEARCH_LABEL')}
                  </span>
                </Button>
                <Button
                  className='btn-filter mr-2'
                  id='reset'
                  onClick={() => {
                    resetForm();
                    history.push(path);
                  }}
                >
                  <UncontrolledTooltip placement='top' target='reset'>
                    {languageTranslation('RESET_LABEL')}
                  </UncontrolledTooltip>
                  <i className='fa fa-refresh '></i>
                  <span className='search-text'>
                    {languageTranslation('RESET_LABEL')}
                  </span>
                </Button>
              </div>
            </Col>
          </Row>
        </Form>

        <Table bordered hover responsive>
          <thead className='thead-bg'>
            <tr>
              <th className='sno-th-column text-center'>
                {languageTranslation('S_NO')}
              </th>
              <th className='date-th-column'>{languageTranslation('DATE')} </th>
              <th className='remark-col'>{languageTranslation('REMARKS')}</th>
              <th className='checkbox-th-column text-center'>
                {' '}
                {languageTranslation('DONE')}
              </th>
              <th className='checkbox-th-column text-center'>
                {' '}
                {languageTranslation('EXTERNAL')}
              </th>
              <th className='prio-col'> {languageTranslation('PRIORITY')}</th>
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
                  <tr key={index}>
                    <td className='sno-th-column text-center'>
                      <span>{count++}</span>
                    </td>
                    <td className='date-th-column'>
                      {' '}
                      {moment(item.createdAt).format('DD.MM.YYYY')}
                    </td>
                    <td className='remark-col'>
                      <span className='word-wrap'>{item.comment}</span>
                    </td>
                    <td className='checkbox-th-column text-center'>
                      <span className='checkboxli checkbox-custom checkbox-default'>
                        <input type='checkbox' id='checkAll' className='' />
                        <label className=''> </label>
                      </span>
                    </td>
                    <td className='checkbox-th-column text-center'>
                      <span className='checkboxli checkbox-custom checkbox-default'>
                        <input type='checkbox' id='checkAll' className='' />
                        <label className=''> </label>
                      </span>
                    </td>
                    <td className='priority-th-column'>
                      <Select
                        placeholder='Select Priority'
                        classNamePrefix='custom-inner-reactselect'
                        className={'custom-reactselect'}
                        options={Priority}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className={'text-center no-hover-row'}>
                <td colSpan={8} className={'pt-5 pb-5'}>
                  {isFilterApplied ? (
                    <NoSearchFound />
                  ) : (
                    <div className='no-data-section'>
                      <div className='no-data-icon'>
                        <i className='icon-ban' />
                      </div>
                      <h4 className='mb-1'>
                        Currently there are no todos added.{' '}
                      </h4>
                      <p>Please click above button to add new. </p>
                    </div>
                  )}
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
        {/* <Table responsive className="todolist-table">
            <thead className="thead-bg">
              <tr>
                <th className="date-col">{languageTranslation("DATE")} </th>
                <th className="remarks-col">
                  {languageTranslation("REMARKS")}
                </th>
                <th className="done-col"> {languageTranslation("DONE")}</th>
                <th className="extreme-col">
                  {" "}
                  {languageTranslation("EXTREME")}
                </th>
                <th className="prio-col"> {languageTranslation("PRIO")}</th>

                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5}>
                  <div className="date-title">
                    <span className="align-middle mr-2">
                      <i className="icon-arrow-down" />
                    </span>
                    <span className="align-middle ">Date: 2019</span>
                  </div>
                  <div>
                    <Table
                      bordered
                      hover
                      responsive
                      className="inner-tododlist-table"
                    >
                      <tbody>
                        <tr>
                          <td className="date-col">30.12.2020</td>
                          <td className="remarks-col">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </td>
                          <td className="done-col">
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td className="extreme-col">
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td className="prio-col">
                            <div className="form-section">
                              <FormGroup className="todo-select">
                                <Input
                                  type="select"
                                  name="select"
                                  id="exampleSelect"
                                >
                                  <option>Name</option>
                                  <option>low</option>
                                  <option>Normal</option>
                                  <option>high</option>
                                </Input>
                              </FormGroup>
                            </div>
                          </td>
                          
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan={5}>
                  <div className="date-title">
                    <span className="align-middle mr-2">
                      <i className="icon-arrow-down" />
                    </span>
                    <span className="align-middle ">Date: 2018</span>
                  </div>
                  <div>
                    <Table
                      bordered
                      hover
                      responsive
                      className="inner-tododlist-table"
                    >
                      <tbody>
                        <tr>
                          <td className="date-col">30.12.2020</td>
                          <td className="remarks-col">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </td>
                          <td className="done-col">
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td className="extreme-col">
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td className="prio-col">
                            <div className="form-section">
                              <FormGroup className="todo-select">
                                <Input
                                  type="select"
                                  name="select"
                                  id="exampleSelect"
                                >
                                  <option>Name</option>
                                  <option>low</option>
                                  <option>Normal</option>
                                  <option>high</option>
                                </Input>
                              </FormGroup>
                            </div>
                          </td>
                          
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan={5}>
                  <div className="date-title">
                    <span className="align-middle mr-2">
                      <i className="icon-arrow-down" />
                    </span>
                    <span className="align-middle ">Date: 2017</span>
                  </div>
                  <div>
                    <Table
                      bordered
                      hover
                      responsive
                      className="inner-tododlist-table"
                    >
                      <tbody>
                        <tr>
                          <td className="date-col">30.12.2020</td>
                          <td className="remarks-col">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </td>
                          <td className="done-col">
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td className="extreme-col">
                            <span className="checkboxli checkbox-custom checkbox-default">
                              <input
                                type="checkbox"
                                id="checkAll"
                                className=""
                              />
                              <label className=""> </label>
                            </span>
                          </td>
                          <td className="prio-col">
                            <div className="form-section">
                              <FormGroup className="todo-select">
                                <Input
                                  type="select"
                                  name="select"
                                  id="exampleSelect"
                                >
                                  <option>Name</option>
                                  <option>low</option>
                                  <option>Normal</option>
                                  <option>high</option>
                                </Input>
                              </FormGroup>
                            </div>
                          </td>
                          
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table> */}
      </div>
    </>
  );
};

export default ToDoListForm;
