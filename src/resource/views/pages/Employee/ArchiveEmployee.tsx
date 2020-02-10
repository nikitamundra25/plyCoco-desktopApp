import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Card, CardHeader, CardBody, Table } from 'reactstrap';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { AppBreadcrumb } from '@coreui/react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import * as qs from 'query-string';
import { UncontrolledTooltip } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { AppConfig, sortFilter } from '../../../../config';
import { AppRoutes, PAGE_LIMIT } from '../../../../config';
import routes from '../../../../routes/routes';
import Search from '../../components/SearchFilter';
import { languageTranslation, logger } from '../../../../helpers';
import ButtonTooltip from '../../components/Tooltip/ButtonTooltip';
import { EmployeeQueries } from '../../../../graphql/queries';
import { EmployeeMutations } from '../../../../graphql/Mutations';
import PaginationComponent from '../../components/Pagination';
import {
  ISearchValues,
  IEmployee,
  IReactSelectInterface,
  IObjectType,
  IReplaceObjectInterface
} from '../../../../interfaces';
import { ConfirmBox } from '../../components/ConfirmBox';
import defaultProfile from '../../../assets/avatars/default-profile.png';
import Loader from '../../containers/Loader/Loader';
import { NoSearchFound } from '../../components/SearchFilter/NoSearchFound';
let toastId: any = null;

const [, , GET_ARCHIVE_EMPLOYEES] = EmployeeQueries;
const [, , , , RESTORE_EMPLOYEE] = EmployeeMutations;
const ArchiveEmployee: FunctionComponent = () => {
  let history = useHistory();

  const { search, pathname, state } = useLocation();
  const location = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);

  // To get archive employee list from db
  const [
    fetchArchiveEmployeeList,
    { data, called, loading, refetch }
  ] = useLazyQuery<any>(GET_ARCHIVE_EMPLOYEES, {
    fetchPolicy: 'no-cache'
  });

  // To restore archive user
  const [restoreEmployee, { error }] = useMutation<
    { restoreEmployee: any },
    { id: string }
  >(RESTORE_EMPLOYEE);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const query = qs.parse(search);
    let searchBy: string = '';
    let sortBy: IReactSelectInterface | undefined = { label: '', value: '' };
    let isActive: IReactSelectInterface | undefined = { label: '', value: '' };
    // To handle display and query param text
    let sortByValue: string | undefined = '1';
    if (query.sortBy) {
      sortByValue = Object.keys(sortFilter).find(
        (key: string) => sortFilter[key] === query.sortBy
      );
    }
    logger(sortByValue);
    logger(typeof sortByValue);
    if (sortByValue === '3') {
      sortBy.label = 'A-Z';
    }
    if (sortByValue === '4') {
      sortBy.label = 'Z-A';
    }
    if (sortByValue === '2') {
      sortBy.label = 'Oldest';
    }
    if (sortByValue === '1') {
      sortBy.label = 'Newest';
    }
    if (query) {
      searchBy = query.search ? (query.search as string) : '';
      sortBy = sortByValue
        ? {
            ...sortBy,
            value:
              Object.keys(sortFilter).find(
                (key: any) => sortFilter[key] === query.sortBy
              ) || '1'
          }
        : { label: 'Newest', value: '1' };
      isActive = query.status
        ? query.status === 'active'
          ? { label: languageTranslation('ACTIVE'), value: 'true' }
          : { label: languageTranslation('DISABLE'), value: 'false' }
        : { label: '', value: '' };
      setSearchValues({
        searchValue: searchBy,
        sortBy,
        isActive
      });
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
      setIsFilter(
        searchBy !== '' ||
          query.status !== undefined ||
          query.sortBy !== undefined
      );
    }

    // call query
    fetchArchiveEmployeeList({
      variables: {
        userRole: 'employee',
        searchBy,
        sortBy: sortByValue ? parseInt(sortByValue) : 0,
        limit: PAGE_LIMIT,
        page: query.page ? parseInt(query.page as string) : 1,
       
      }
    });
  }, [search]); // It will run when the search value gets changed

  const {
    searchValue = '',
    sortBy = undefined,
    isActive = undefined
  } = searchValues ? searchValues : {};

  const handleSubmit = async (
    { searchValue, isActive, sortBy }: ISearchValues,
    { setSubmitting }: FormikHelpers<ISearchValues>
  ) => {
    let params: IObjectType = {};
    params.page = 1;
    if (searchValue) {
      params.search = searchValue;
    }
    if (isActive && isActive.value !== '') {
      params.status = isActive.value === 'true' ? 'active' : 'disable';
    }
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
      '?'
    );
    history.push(path);
  };
  const queryVariables = {
    page: currentPage,
    isActive: isActive ? isActive.value : '',
    sortBy: sortBy && sortBy.value ? parseInt(sortBy.value) : 0,
    searchBy: searchValue ? searchValue : '',
    limit: PAGE_LIMIT
  };

  const onRestoreEmployee = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMPLOYEE_RESTORE_MSG')
    });
    if (!value) {
      return;
    } else {
      try {
        await restoreEmployee({
          variables: {
            id
          }
        });
        refetch();

        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('EMPLOYEE_RESTORED_SUCCESS')
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
  const values: ISearchValues = {
    searchValue,
    isActive,
    sortBy
  };
  let count = (currentPage - 1) * PAGE_LIMIT + 1;
  console.log(data, 'data');

  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
        <Button
          color={'primary'}
          className={'btn-add'}
          id={'add-new-pm-tooltip'}
          onClick={() => history.push(AppRoutes.EMPLOYEE)}
        >
          &nbsp;{'Employee List'}
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          <Formik
            initialValues={values}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            children={(props: FormikProps<ISearchValues>) => (
              <Search
                {...props}
                label={'archiveEmployee'}
                setSearchValues={setSearchValues}
              />
            )}
          />
          {/* <Search /> */}
        </div>
        <Table bordered hover responsive>
          <thead className='thead-bg'>
            <tr>
              <th className='sno-th-column text-center'>
                {languageTranslation('S_NO')}
              </th>
              <th>{languageTranslation('EMPLOYEE_NAME')}</th>
              <th>{languageTranslation('USERNAME')}</th>
              <th>{languageTranslation('EMAIL')}</th>
              <th className='date-th-column'>
                {languageTranslation('DELETED_DATE')}
              </th>
              <th className='text-center'>
                {languageTranslation('TABLE_HEAD_ACTION')}
              </th>
            </tr>
          </thead>
          <tbody>
            {!called || loading ? (
              <tr>
                <td className={'table-loader'} colSpan={7}>
                  <Loader />
                </td>
              </tr>
            ) : data &&
              data.trashUserList &&
              data.trashUserList.result &&
              data.trashUserList.result.length ? (
              data.trashUserList.result.map((trashUser: any, index: number) => {
                var elements = [trashUser.firstName, trashUser.lastName];
                return (
                  <tr key={index}>
                    <td className='sno-th-column text-center'>
                      <span>{index + 1}</span>
                    </td>
                    <td>
                      <div className='info-column'>{elements.join(' ')}</div>
                    </td>
                    <td>{trashUser.userName}</td>
                    <td>{trashUser.email}</td>
                    <td className='date-th-column '>
                      {trashUser.deletedAt
                        ? moment(trashUser.deletedAt).format('lll')
                        : ''}
                    </td>
                    <td>
                      <div className='action-btn'>
                        <Button onClick={() => onRestoreEmployee(trashUser.id)}>
                          {languageTranslation("RESTORE")}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              //   <tr className={'text-center no-hover-row'}>
              //     <td colSpan={7} className={'pt-5 pb-5'}>
              //       {isFilterApplied ? (
              //         <NoSearchFound />
              //       ) : (
              //         <div className='no-data-section'>
              //           <div className='no-data-icon'>
              //             <i className='icon-ban' />
              //           </div>
              //           <h4 className='mb-1'>
              //             Currently there are no employees added.{' '}
              //           </h4>
              //           <p>Please click above button to add new. </p>
              //         </div>
              //       )}
              //     </td>
              //   </tr>
              ''
            )}
          </tbody>
        </Table>
        {data && data.trashUserList && data.trashUserList.totalCount ? (
          <PaginationComponent
            totalRecords={data.trashUserList.totalCount}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        ) : null}
      </CardBody>
    </Card>
  );
};

export default ArchiveEmployee;
