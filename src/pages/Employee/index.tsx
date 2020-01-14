import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBreadcrumb } from '@coreui/react';
import { useLazyQuery } from '@apollo/react-hooks';
import * as qs from 'query-string';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { AppRoutes, PAGE_LIMIT } from '../../config';
import routes from '../../routes/routes';
import Search from '../../common/SearchFilter';
import { languageTranslation, logger } from '../../helpers';
import ButtonTooltip from '../../common/Tooltip/ButtonTooltip';
import { EmployeeQueries } from '../../queries';
import PaginationComponent from '../../common/Pagination';
import { ISearchValues } from '../../interfaces';

const [, , GET_EMPLOYEES] = EmployeeQueries;

const sortFilter: any = {
  3: 'name',
  4: 'name-desc',
  2: 'oldest',
  1: 'newest',
};

const Employee: FunctionComponent = () => {
  let history = useHistory();
  const { search, pathname } = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  // To get emplyee list from db
  const [fetchEmployeeList, { data, loading }] = useLazyQuery<any>(
    GET_EMPLOYEES,
  );

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const query = qs.parse(search);
    let searchBy: string = '';
    let sortBy: any = { label: '', value: '' };
    // To handle display and query param text
    let sortByValue: any = Object.keys(sortFilter).find(
      (key: any) => sortFilter[key] === query.sortBy,
    );
    logger(sortByValue);
    logger(typeof sortByValue);
    if (sortByValue === '3') {
      sortBy.label = 'Sort by A-Z';
    }
    if (sortByValue === '4') {
      sortBy.label = 'Sort by Z-A';
    }
    if (sortByValue === '2') {
      sortBy.label = 'Sort by Oldest';
    }
    if (sortByValue === '1') {
      sortBy.label = 'Sort by Newest';
    }
    if (query) {
      searchBy = query.search ? (query.search as string) : '';
      sortBy = sortByValue
        ? {
            ...sortBy,
            value:
              Object.keys(sortFilter).find(
                (key: any) => sortFilter[key] === query.sortBy,
              ) || '',
          }
        : '';
      setSearchValues({
        searchValue: searchBy,
        sortBy,
      });
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    fetchEmployeeList({
      variables: {
        searchBy,
        sortBy: sortByValue ? parseInt(sortByValue) : 0,
        limit: PAGE_LIMIT,
        page: query.page ? parseInt(query.page as string) : 1,
        isActive: query.status
          ? query.status === 'active'
            ? { label: 'Active', value: 'true' }
            : { label: 'Deactive', value: 'false' }
          : '',
      },
    });
  }, [search]); // It will run when the search value gets changed

  const handleSubmit = async (
    { searchValue, isActive, sortBy }: ISearchValues,
    { setSubmitting }: FormikHelpers<ISearchValues>,
  ) => {
    let params: {
      [key: string]: any;
    } = {};
    params.page = 1;
    if (searchValue) {
      params.search = searchValue;
    }
    // if (isActive && isActive.value !== '') {
    //   params.status = isActive.value === 'true' ? 'active' : 'deactive';
    // }
    if (sortBy && sortBy.value !== '') {
      params.sortBy = sortBy.value !== '' ? sortFilter[sortBy.value] : '';
    }
    const path = [pathname, qs.stringify(params)].join('?');
    history.push(path);
    logger('path', path);
  };

  const onPageChanged = (currentPage: number) => {
    logger('onPageChanged', currentPage);
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?',
    );
    history.push(path);
  };

  const {
    searchValue = '',
    sortBy = undefined,
    isActive = undefined,
  } = searchValues ? searchValues : {};

  const values: ISearchValues = {
    searchValue,
    isActive,
    sortBy,
  };
  let count = (currentPage - 1) * PAGE_LIMIT + 1;

  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
        <Button
          color={'primary'}
          className={'btn-add'}
          id={'add-new-pm-tooltip'}
          onClick={() => history.push(AppRoutes.ADD_EMPLOYEE)}
        >
          <i className={'fa fa-plus'} />
          &nbsp; Add New Empolyee
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          <Formik
            initialValues={values}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            children={(props: FormikProps<ISearchValues>) => (
              <Search {...props} />
            )}
          />
          {/* <Search /> */}
        </div>
        <Table bordered hover responsive>
          <thead className='thead-bg'>
            <tr>
              <th>
                <div className='table-checkbox-wrap'>
                  <div className='btn-group btn-check-action-wrap'>
                    <span className='btn'>
                      <span className='checkboxli checkbox-custom checkbox-default'>
                        <input type='checkbox' id='checkAll' className='' />
                        <label className=''></label>
                      </span>
                    </span>
                    <UncontrolledDropdown className='custom-dropdown'>
                      <DropdownToggle caret color='link' />
                      <DropdownMenu>
                        <DropdownItem>Delete</DropdownItem>
                        <DropdownItem>Active</DropdownItem>
                        <DropdownItem>Disable</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </th>
              <th>{languageTranslation('TABLE_HEAD_EMP_INFO')}</th>
              <th>{languageTranslation('REGION')}</th>
              <th>{languageTranslation('TABLE_HEAD_ASSIGNED_CANSTITUTION')}</th>
              <th>{languageTranslation('STATUS')}</th>
              <th>{languageTranslation('TABLE_HEAD_ACTION')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <p>Loading ...</p>
            ) : (
              data &&
              data.getEmployees &&
              data.getEmployees.employeeData &&
              data.getEmployees.employeeData.map(
                (employee: any, index: number) => {
                  const replaceObj: any = {
                    ':id': employee.id,
                    ':userName': employee.userName,
                  };
                  return (
                    <tr key={index}>
                      <td>
                        <div className='table-checkbox-wrap'>
                          <div className='btn-group btn-check-action-wrap'>
                            <span className='btn'>
                              <span className='checkboxli checkbox-custom checkbox-default'>
                                <input
                                  type='checkbox'
                                  id='checkAll'
                                  className=''
                                />
                                <label className=''></label>
                              </span>
                            </span>
                            <span className='checkbox-no'>{count++}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='info-column'>
                          <div className='img-column'>
                            <img
                              src='https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg'
                              className='img-fluid'
                            />
                          </div>
                          <div className='description-column'>
                            <div className='info-title'>
                              {employee.firstName ? employee.firstName : ''}
                            </div>
                            <p className='description-text'>
                              <i className='fa fa-envelope mr-2'></i>
                              <span className='align-middle'>
                                {employee.email ? employee.email : ''}
                              </span>
                            </p>
                            {employee.phoneNumber ? (
                              <p className='description-text'>
                                <i className='fa fa-phone mr-2'></i>
                                <span className='align-middle'>
                                  {employee.phoneNumber}
                                </span>
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='description-column  ml-0'>
                          {employee.region
                            ? employee.region
                              ? employee.region.map((region: any) => (
                                  <p className='description-text '>
                                    <span className='text-label mr-1'>
                                      <i className='fa fa-angle-right'></i>
                                    </span>
                                    <span className='align-middle'>
                                      {region}
                                    </span>
                                  </p>
                                ))
                              : null
                            : null}
                        </div>
                      </td>
                      <td className='text-center'>
                        <div>{employee.assignedCanstitution}</div>
                      </td>
                      <td className='text-center'>
                        {employee.isActive}
                        <span
                          className={`status-btn ${
                            employee.isActive ? 'active' : 'inactive'
                          }`}
                        >
                          {employee.isActive
                            ? languageTranslation('ACTIVE')
                            : languageTranslation('DISABLE')}
                        </span>
                      </td>
                      <td>
                        <div className='action-btn'>
                          <ButtonTooltip
                            id={`edit${index}`}
                            message={languageTranslation('EMP_EDIT')}
                            onclick={() =>
                              history.push(
                                AppRoutes.EDIT_EMPLOYEE.replace(
                                  /:id|:userName/gi,
                                  function(matched) {
                                    return replaceObj[matched];
                                  },
                                ),
                              )
                            }
                          >
                            {' '}
                            <i className='fa fa-pencil'></i>
                          </ButtonTooltip>
                          <ButtonTooltip
                            id={`view${index}`}
                            message={languageTranslation('EMP_VIEW')}
                            onclick={() =>
                              history.push(AppRoutes.VIEW_EMPLOYEE)
                            }
                          >
                            {' '}
                            <i className='fa fa-eye'></i>
                          </ButtonTooltip>

                          <ButtonTooltip
                            id={`delete${index}`}
                            message={languageTranslation('EMP_DELETE')}
                            onclick={() => history.push('')}
                          >
                            {' '}
                            <i className='fa fa-trash'></i>
                          </ButtonTooltip>
                        </div>
                      </td>
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </Table>
        {data && data.getEmployees && data.getEmployees.totalCount && (
          <PaginationComponent
            totalRecords={data.getEmployees.totalCount}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Employee;
