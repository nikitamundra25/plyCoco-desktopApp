import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Table,
  UncontrolledTooltip
} from 'reactstrap';
import * as qs from 'query-string';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router';
import { AppBreadcrumb } from '@coreui/react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import {
  AppRoutes,
  PAGE_LIMIT,
  sortFilter,
  defaultDateTimeFormat
} from '../../../../config';
import routes from '../../../../routes/routes';
import Search from '../../components/SearchFilter';
import ButtonTooltip from '../../components/Tooltip/ButtonTooltip';
import { languageTranslation } from '../../../../helpers';
import {
  ISearchValues,
  IReactSelectInterface,
  IObjectType
} from '../../../../interfaces';
import { CareGiverMutations } from '../../../../graphql/Mutations';
import { ConfirmBox } from '../../components/ConfirmBox';
import PaginationComponent from '../../components/Pagination';
import Loader from '../../containers/Loader/Loader';
import { NoSearchFound } from '../../components/SearchFilter/NoSearchFound';
import { CareGiverQueries } from '../../../../graphql/queries';

const [GET_CAREGIVERS] = CareGiverQueries;
const [, , UPDATE_CARE_GIVER_STATUS, DELETE_CAREGIVER] = CareGiverMutations;

let toastId: any = '';

const CareGiver: FunctionComponent = () => {
  let history = useHistory();
  const { search, pathname } = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);

  // To get caregiver list from db
  const [fetchCareGiverList, { data, called, loading, refetch }] = useLazyQuery<
    any,
    any
  >(GET_CAREGIVERS, {
    fetchPolicy: 'no-cache'
  });

  // Mutation to update caregiver status
  const [updateEmployeeStatus] = useMutation<
    { updateCareGiverStatus: any },
    { id: string; isActive: boolean }
  >(UPDATE_CARE_GIVER_STATUS);

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
      setIsFilter(
        searchBy !== '' ||
          query.status !== undefined ||
          query.sortBy !== undefined
      );
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    fetchCareGiverList({
      variables: {
        searchBy,
        sortBy: sortByValue ? parseInt(sortByValue) : 0,
        limit: PAGE_LIMIT,
        page: query.page ? parseInt(query.page as string) : 1,
        isActive: query.status
          ? query.status === 'active'
            ? 'true'
            : 'false'
          : ''
      }
    });
  }, [search]); // It will run when the search value gets changed

  const {
    searchValue = '',
    sortBy = undefined,
    isActive = undefined
  } = searchValues ? searchValues : {};

  // Mutation to delete caregiver
  const [deleteCaregiver, { error }] = useMutation<
    { deleteCaregiver: any },
    { id: number }
  >(DELETE_CAREGIVER);

  const handleSubmit = async (
    { searchValue, isActive, sortBy }: ISearchValues,
    { setSubmitting }: FormikHelpers<ISearchValues>
  ) => {
    let params: {
      [key: string]: any;
    } = {};
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
  };

  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?'
    );
    history.push(path);
  };

  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_CAREGIVER_DELETE_MSG')
    });
    if (!value) {
      return;
    } else {
      await deleteCaregiver({
        variables: {
          id: parseInt(id)
        }
      });
      refetch();
      if (!toast.isActive(toastId)) {
        toastId = toast.success('Caregiver moved to trash.');
      }
    }
  };

  const onStatusUpdate = async (id: string, status: boolean) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation(
        status
          ? 'CONFIRM_CAREGIVER_STATUS_ACTIVATE_MSG'
          : 'CONFIRM_CAREGIVER_STATUS_DISABLED_MSG'
      )
    });
    if (!value) {
      return;
    } else {
      try {
        toast.dismiss();
        await updateEmployeeStatus({
          variables: {
            id,
            isActive: status
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('CAREGIVER_STATUS_UPDATE_MSG')
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
  return (
    <Row className='m-0'>
      <Col xs={'12'} lg={'12'} className='p-0'>
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />

            <Button
              color={'primary'}
              className={'btn-add mr-3'}
              id={'add-new-pm-tooltip'}
              onClick={() => history.push(AppRoutes.CAREGIVER_ARCHIVE)}
            >
              <i className={'fa fa-archive'} />
              &nbsp; {languageTranslation('VIEW_ARCHIVE')}
            </Button>

            <Button
              color={'primary'}
              className={'btn-add'}
              id={'add-new-pm-tooltip'}
              onClick={() => history.push(AppRoutes.ADD_CARE_GIVER)}
            >
              <i className={'fa fa-plus'} />
              &nbsp; Add New Caregiver
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
                    searchPlacholderText={languageTranslation(
                      'SEARCH_CAREGIVER_PLACEHOLDER'
                    )}
                  />
                )}
              />
            </div>

            <Table bordered hover responsive>
              <thead className='thead-bg'>
                <tr>
                  {/* <th>
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
                          <DropdownItem>
                            {languageTranslation('ACTIVE')}
                          </DropdownItem>
                          <DropdownItem>Disable</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </th> */}
                  <th className='sno-th-column text-center'>
                    {languageTranslation('S_NO')}
                  </th>
                  <th>{languageTranslation('TABEL_HEAD_CG_INFO')}</th>
                  <th className='qualifications-th-column'>
                    {languageTranslation('TABEL_HEAD_CG_QUALIFICATION')}
                  </th>
                  <th>{languageTranslation('TABEL_HEAD_CG_REGION')}</th>
                  <th className='applying-th-column'>
                    {languageTranslation('TABEL_HEAD_CG_APPLYING_AS')}
                  </th>
                  <th className='date-th-column'>
                    {languageTranslation('CREATED_DATE')}
                  </th>
                  <th className={'text-center status-column'}>
                    {languageTranslation('TABEL_HEAD_CG_STATUS')}
                  </th>
                  <th className={'text-center'}>
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
                  data.getCaregivers &&
                  data.getCaregivers.result &&
                  data.getCaregivers.result.length ? (
                  data.getCaregivers.result.map(
                    (careGiverData: any, index: number) => {
                      const replaceObj: any = {
                        ':id': careGiverData.id,
                        ':userName': careGiverData.userName
                      };
                      return (
                        <tr key={index}>
                          <td className='sno-th-column text-center'>
                            <span>{count++}</span>
                          </td>
                          <td>
                            <div className='info-column'>
                              <div className='description-column '>
                                <div
                                  className='info-title text-capitalize'
                                  onClick={() =>
                                    history.push(
                                      AppRoutes.CARE_GIVER_VIEW.replace(
                                        /:id/gi,
                                        function(matched) {
                                          return replaceObj[matched];
                                        }
                                      )
                                    )
                                  }
                                >
                                  {`${careGiverData.salutation} ${careGiverData.firstName} ${careGiverData.lastName}` +
                                    ','}
                                </div>
                                <p className='description-text'>
                                  <i className='fa fa-user mr-2'></i>
                                  <span className='align-middle'>
                                    {careGiverData.userName}
                                  </span>
                                </p>
                                <p className='description-text'>
                                  <i className='fa fa-envelope mr-2'></i>
                                  <span className='align-middle'>
                                    {careGiverData.email}
                                  </span>
                                </p>

                                {careGiverData.phoneNumber ? (
                                  <p className='description-text'>
                                    <i className='fa fa-phone mr-2'></i>
                                    <span className='align-middle'>
                                      {careGiverData.phoneNumber}
                                    </span>
                                  </p>
                                ) : (
                                  ''
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='region-list  text-capitalize'>
                              {careGiverData.qualifications &&
                              careGiverData.qualifications.length ? (
                                careGiverData.qualifications.map(
                                  (qualification: any, index: number) => {
                                    return (
                                      <span
                                        className='region-label'
                                        key={index}
                                      >
                                        {qualification.name}
                                      </span>
                                    );
                                  }
                                )
                              ) : (
                                <div>-</div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className=' text-capitalize'>
                              {careGiverData &&
                              careGiverData.regions &&
                              careGiverData.regions.length ? (
                                careGiverData.regions.map(
                                  (wZ: any, index: number) => (
                                    <span key={index}>{wZ.regionName}</span>
                                  )
                                )
                              ) : (
                                <div>-</div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div>
                              <span className='align-middle'>
                                {careGiverData &&
                                careGiverData.caregiver &&
                                careGiverData.caregiver.legalForm
                                  ? careGiverData.caregiver.legalForm
                                  : 'N/A'}
                              </span>
                            </div>
                          </td>

                          <td className='date-th-column '>
                            {careGiverData.createdAt
                              ? moment(careGiverData.createdAt).format(
                                  defaultDateTimeFormat
                                )
                              : '-'}
                          </td>

                          <td className='text-center'>
                            <span
                              className={`status-btn ${
                                careGiverData.isActive ? 'active' : 'inactive'
                              }`}
                              onClick={() =>
                                onStatusUpdate(
                                  careGiverData.id,
                                  !careGiverData.isActive
                                )
                              }
                            >
                              {careGiverData.isActive
                                ? languageTranslation('ACTIVE')
                                : languageTranslation('DISABLE')}
                            </span>
                          </td>
                          <td className='text-center'>
                            <div className='action-btn'>
                              <ButtonTooltip
                                id={`edit${index}`}
                                message={languageTranslation('CAREGIVER_EDIT')}
                                redirectUrl={AppRoutes.CARE_GIVER_VIEW.replace(
                                  /:id/gi,
                                  function(matched) {
                                    return replaceObj[matched];
                                  }
                                )}
                              >
                                {' '}
                                <i className='fa fa-pencil'></i>
                              </ButtonTooltip>
                              <ButtonTooltip
                                id={`view${index}`}
                                message={languageTranslation('CAREGIVER_VIEW')}
                                redirectUrl={AppRoutes.CARE_GIVER_VIEW.replace(
                                  /:id/gi,
                                  function(matched) {
                                    return replaceObj[matched];
                                  }
                                )}
                              >
                                {' '}
                                <i className='fa fa-eye'></i>
                              </ButtonTooltip>
                              <span
                                id={`delete${index}`}
                                className='btn-icon mr-2'
                                onClick={() => onDelete(careGiverData.id)}
                              >
                                <UncontrolledTooltip
                                  placement={'top'}
                                  target={`delete${index}`}
                                >
                                  {languageTranslation('CAREGIVER_DELETE')}
                                </UncontrolledTooltip>
                                <i className='fa fa-trash'></i>
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
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
                            Currently there are no caregiver added.{' '}
                          </h4>
                          <p>Please click above button to add new. </p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {data && data.getCaregivers && data.getCaregivers.totalCount ? (
              <PaginationComponent
                totalRecords={data.getCaregivers.totalCount}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
              />
            ) : null}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CareGiver;
