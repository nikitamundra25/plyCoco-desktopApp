import React, {
  Component,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  CardGroup,
  Container,
  Input,
  Col,
  Row,
  Form,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from 'reactstrap';
import { pullAllBy } from 'lodash';
import * as qs from 'query-string';
import { AppRoutes, PAGE_LIMIT } from '../../config';
import { RouteComponentProps, useLocation, useHistory } from 'react-router';
import { AppBreadcrumb } from '@coreui/react';
import routes from '../../routes/routes';
import { userData } from './CareGiverData';
import { string } from 'prop-types';
import Search from '../../common/SearchFilter';
import ButtonTooltip from '../../common/Tooltip/ButtonTooltip';
import { languageTranslation } from '../../helpers';
import { UsersQuery } from '../../queries';
import { GET_CAREGIVERS, DELETE_CAREGIVER } from '../../queries/CareGiver';
import {
  ISearchValues,
  IReactSelectInterface,
  ICareGiver,
} from '../../interfaces';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { FormikHelpers, Formik, FormikProps } from 'formik';
import { ConfirmBox } from '../../common/ConfirmBox';
import PaginationComponent from '../../common/Pagination';
import Loader from '../../containers/Loader/Loader';
import { NoSearchFound } from '../../common/SearchFilter/NoSearchFound';

const sortFilter: any = {
  3: 'name',
  4: 'name-desc',
  2: 'oldest',
  1: 'newest',
};

const CareGiver: FunctionComponent = () => {
  let history = useHistory();
  const { search, pathname } = useLocation();
  const [searchValues, setSearchValues] = useState<ISearchValues | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFilterApplied, setIsFilter] = useState<boolean>(false);

  // To get care giver list from db
  const [fetchCareGiverList, { data, loading }] = useLazyQuery<any, any>(
    GET_CAREGIVERS,
  );

  // Mutation to delete care giver
  const [deleteCaregiver, { error }] = useMutation<
    { deleteCaregiver: any },
    { id: number }
  >(DELETE_CAREGIVER);

  useEffect(() => {
    const query = qs.parse(search);
    let searchBy: string = '';
    let sortBy: IReactSelectInterface | undefined = { label: '', value: '' };
    let isActive: IReactSelectInterface | undefined = { label: '', value: '' };
    // To handle display and query param text
    let sortByValue: any = Object.keys(sortFilter).find(
      (key: any) => sortFilter[key] === query.sortBy,
    );
    console.log(sortByValue);
    console.log(typeof sortByValue);
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
                (key: any) => sortFilter[key] === query.sortBy,
              ) || '',
          }
        : undefined;
      isActive = query.status
        ? query.status === 'active'
          ? { label: languageTranslation('ACTIVE'), value: 'true' }
          : { label: languageTranslation('DISABLE'), value: 'false' }
        : undefined;
      setSearchValues({
        searchValue: searchBy,
        sortBy,
        // isActive
      });
      setIsFilter(
        searchBy !== '' || isActive !== undefined || sortBy !== undefined,
      );
      setCurrentPage(query.page ? parseInt(query.page as string) : 0);
    }
    // call query
    fetchCareGiverList({
      variables: {
        searchBy,
        sortBy: sortByValue ? parseInt(sortByValue) : 0,
        limit: PAGE_LIMIT,
        page: query.page ? parseInt(query.page as string) : 0,
        isActive: query.status
          ? query.status === 'active'
            ? true
            : false
          : undefined,
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
    params.page = 0;
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
    console.log('onPageChanged', currentPage);
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?',
    );
    history.push(path);
  };

  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMPLOYEE_DELETE_MSG'),
    });
    if (!value) {
      return;
    } else {
      await deleteCaregiver({
        variables: {
          id: parseInt(id),
        },
        update: async cache => {
          let data: any = await cache.readQuery({
            query: GET_CAREGIVERS,
            variables: {
              searchBy: '',
              sortBy: 0,
              limit: PAGE_LIMIT,
              page: 0,
              isActive: undefined,
            },
          });
          console.log('==before==', data.getCaregivers);
          pullAllBy(data.getCaregivers, [{ id }], 'id');
          cache.writeQuery({
            query: GET_CAREGIVERS,
            data: {
              getCaregiversCount: data.getCaregiversCount - 1,
              getCaregivers: data.getCaregivers,
            },
          });
          let dataNe: any = await cache.readQuery({ query: GET_CAREGIVERS });
          console.log('==after==', dataNe.getCaregivers);
        },
      });
    }
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
    <Row className='m-0'>
      <Col xs={'12'} lg={'12'} className='p-0'>
        <Card>
          <CardHeader>
            <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
            <Button
              color={'primary'}
              className={'btn-add'}
              id={'add-new-pm-tooltip'}
              onClick={() => history.push(AppRoutes.ADD_CARE_GIVER)}
            >
              <i className={'fa fa-plus'} />
              &nbsp; Add New Care Giver
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
            </div>
          </CardBody>
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
                          <DropdownItem>
                            {languageTranslation('ACTIVE')}
                          </DropdownItem>
                          <DropdownItem>Disable</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </th>
                <th>{languageTranslation('TABEL_HEAD_CG_INFO')}</th>
                <th>{languageTranslation('TABEL_HEAD_CG_QUALIFICATION')}</th>
                <th>{languageTranslation('TABEL_HEAD_CG_REGION')}</th>
                <th>{languageTranslation('TABEL_HEAD_CG_APPLYING_AS')}</th>
                <th>{languageTranslation('TABEL_HEAD_CG_STATUS')}</th>
                <th>{languageTranslation('TABEL_HEAD_CG_ACTION')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className={'table-loader'} colSpan={7}>
                    <Loader />
                  </td>
                </tr>
              ) : data && data.getCaregivers ? (
                data.getCaregivers.map((careGiverData: any, index: number) => {
                  const replaceObj: any = {
                    ':id': careGiverData.id,
                    ':userName': careGiverData.userName,
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
                            <span className='checkbox-no'>{index + 1}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='info-column'>
                          <div className='description-column'>
                            <div className='info-title'>{`${careGiverData.salutation} ${careGiverData.firstName} ${careGiverData.lastName}`}</div>
                            <p className='description-text'>
                              <i className='fa fa-envelope mr-2'></i>
                              <span className='align-middle'>
                                {careGiverData.email}
                              </span>
                            </p>
                            <p className='description-text'>
                              <i className='fa fa-phone mr-2'></i>
                              <span className='align-middle'>
                                {careGiverData.phoneNumber}
                              </span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='description-column  ml-0'>
                          {careGiverData.caregiverDetails.qualifications
                            ? careGiverData.caregiverDetails.qualifications.map(
                                (qualification: any) => (
                                  <>
                                    <p className='description-text '>
                                      <span className='text-label mr-1'>
                                        <i className='fa fa-angle-right'></i>
                                      </span>
                                      <span className='align-middle'>
                                        {qualification}
                                      </span>
                                    </p>
                                  </>
                                ),
                              )
                            : null}
                        </div>
                      </td>

                      <td>
                        <div className='description-column  ml-0'>
                          {careGiverData.caregiverDetails.workZones
                            ? careGiverData.caregiverDetails.workZones.map(
                                (wZ: string) => (
                                  <p className='description-text '>
                                    <span className='text-label mr-1'>
                                      <i className='fa fa-angle-right'></i>
                                    </span>
                                    <span className='align-middle'>{wZ}</span>
                                  </p>
                                ),
                              )
                            : null}
                        </div>
                      </td>
                      <td>
                        <div>
                          <p className='description-text'>
                            <span className='align-middle'>
                              {careGiverData.caregiverDetails.legalForm}
                            </span>
                          </p>
                        </div>
                      </td>
                      <td className='text-center'>
                        <span
                          className={`status-btn ${
                            careGiverData.isActive ? 'active' : 'inactive'
                          }`}
                        >
                          {careGiverData.isActive ? 'Active' : 'Disable'}
                        </span>
                      </td>
                      <td>
                        <div className='action-btn'>
                          <ButtonTooltip
                            id={`view${index}`}
                            message={languageTranslation('CAREGIVER_VIEW')}
                            onBtnClick={() =>
                              history.push(
                                AppRoutes.CARE_GIVER_VIEW.replace(
                                  /:id/gi,
                                  function(matched) {
                                    return replaceObj[matched];
                                  },
                                ),
                              )
                            }
                          >
                            {' '}
                            <i className='fa fa-eye'></i>
                          </ButtonTooltip>
                          <ButtonTooltip
                            id={`delete${index}`}
                            message={languageTranslation('CAREGIVER_DELETE')}
                            onBtnClick={() => onDelete(careGiverData.id)}
                          >
                            <i className='fa fa-trash'></i>
                          </ButtonTooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className={'text-center no-hover-row'}>
                  <td colSpan={7} className={'pt-5 pb-5'}>
                    {isFilterApplied ? (
                      <NoSearchFound />
                    ) : (
                      <div className='no-data-section'>
                        <div className='no-data-icon'>
                          <i className='icon-ban' />
                        </div>
                        <h4 className='mb-1'>
                          Currently there are no care giver Added.{' '}
                        </h4>
                        <p>Please click above button to add new. </p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {data && data.getCaregiversCount ? (
            <PaginationComponent
              totalRecords={data.getCaregiversCount}
              currentPage={currentPage}
              onPageChanged={onPageChanged}
            />
          ) : null}
        </Card>
      </Col>
    </Row>
  );
};

export default CareGiver;
