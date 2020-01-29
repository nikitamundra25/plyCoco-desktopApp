import React, { FunctionComponent, useState, Suspense, useEffect } from 'react';
import { RouteComponentProps, useLocation, useParams } from 'react-router';
import Select from 'react-select';
import { AppRoutes } from '../../../../config';
import { Button } from 'reactstrap';
import { careInstitutionRoutes } from './Sidebar/SidebarRoutes/ConstitutionRoutes';
import PersonalInformation from './PersonalInfo';
import Offers from './Offers';
import Login from './Login';
import InvoiceMenu from './invoiceMenu';
import Documents from './Documents';
import Departments from './Departments';
import Reminders from './Reminders';
import qs from 'query-string';
import {
  ICareInstitutionFormValues,
  IHandleSubmitInterface,
  IReactSelectInterface
} from '../../../../interfaces';
import { FormikProps } from 'formik';
import {
  CareInstitutionQueries,
  GET_QUALIFICATION_ATTRIBUTE,
} from '../../../../graphql/queries';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import { IQualifications } from '../../../../interfaces/qualification';
import Loader from '../../containers/Loader/Loader';
import Email from './Emails';
import add from '../../../assets/img/add.svg';
import reminder from '../../../assets/img/reminder.svg';
import password from '../../../assets/img/password.svg';
import appointment from '../../../assets/img/appointment.svg';
import clear from '../../../assets/img/clear.svg';
import { CareInstitutionMutation } from '../../../../graphql/Mutations';

const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST
] = CareInstitutionQueries;

const [
  UPDATE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION_STATUS,
  UPDATE_DEPARTMENT_CARE_INSTITUTION,
  UPDATE_NEW_CONTACT_CARE_INSTITUTION,
  DELETE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  ADD_NEW_CONTACT_CARE_INSTITUTION,
  ADD_NEW_CARE_INTITUTION,
  ADD_DEPARTMENT_CARE_INSTITUTION,
  DELETE_DEPARTMENT
] = CareInstitutionMutation;

const CareInstitutionSidebar = React.lazy(() =>
  import('./Sidebar/SidebarLayout/CareInstitutionLayout')
);

const CareInstitutionTabs = careInstitutionRoutes;

const ViewCareInstitution: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  RouteComponentProps &
  IHandleSubmitInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & RouteComponentProps
) => {
  let { id } = useParams();
  const Id: any | undefined = id;
  let sortBy: IReactSelectInterface | undefined = {
    label: '3',
    value: 'Sort by A-Z'
  };

  const [
    addUser,
    { error: addUserError, data: CareIntitutionId, loading: Loading }
  ] = useMutation<{ addUser: any }>(ADD_NEW_CARE_INTITUTION);

  const [
    fetchCareInstitutionList,
    { data: careInstituition, loading, refetch }
  ] = useLazyQuery<any>(GET_CARE_INSTITUTION_LIST, {
    fetchPolicy: 'no-cache'
  });

  let [selectUser, setselectUser] = useState<IReactSelectInterface>({
    label: '',
    value: ''
  });
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const buttonDiv: HTMLElement | null = document.getElementById(
      'caregiver-add-btn'
    );
    if (buttonDiv) {
      if (scrollPositionY >= 18) {
        buttonDiv.classList.add('sticky-save-btn');
      } else {
        buttonDiv.classList.remove('sticky-save-btn');
      }
    }
  };

  useEffect(() => {
    fetchCareInstitutionList({
      variables: {
        searchBy: null,
        sortBy: 3,
        limit: 200,
        page: 1,
        isActive: ''
      }
    });
  }, []);

  let CareInstitutionList: Object[] = [];
  if (careInstituition && careInstituition.getCareInstitutions) {
    const { getCareInstitutions } = careInstituition;
    const { careInstitutionData } = getCareInstitutions;
    careInstitutionData.map((data: any, index: any) => {
      CareInstitutionList.push({
        label: `${data.firstName}${' '}${data.lastName}`,
        value: data.id
      });
      return true;
    });
  }

  // To fecth qualification attributes list
  const { data } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTE);
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (data && data.getQualificationAttributes) {
    data.getQualificationAttributes.forEach((quali: any) => {
      qualificationList.push({
        label: quali.attributeName,
        value: quali.id
      });
    });
  }

  const [activeTab, setactiveTab] = useState(0);
  const { search, pathname } = useLocation();

  useEffect(() => {
    const query: any = qs.parse(search);
    setactiveTab(
      query.tab
        ? CareInstitutionTabs.findIndex(
            d => d.name === decodeURIComponent(query.tab)
          )
        : 0
    );
  }, [search]);

  const onTabChange = (activeTab: number) => {
    props.history.push(
      `${AppRoutes.CARE_INSTITUION_VIEW.replace(
        ':id',
        Id
      )}?tab=${encodeURIComponent(CareInstitutionTabs[activeTab].name)}`
    );
  };
  let [isUserChange, setisUserChange] = useState(false);
  const handleSelect = (e: any) => {
    if (e && e.value) {
      const data: IReactSelectInterface = {
        label: e.label,
        value: e.value
      };
      setselectUser((selectUser = data));
      if (e.value !== Id) {
        props.history.push(
          `${AppRoutes.CARE_INSTITUION_VIEW.replace(
            ':id',
            e.value
          )}?tab=${encodeURIComponent(CareInstitutionTabs[activeTab].name)}`
        );
        setisUserChange((isUserChange = true));
      }
    }
  };

  useEffect(() => {
    if (CareIntitutionId) {
      const { addUser } = CareIntitutionId;
      props.history.push(
        AppRoutes.ADD_CARE_INSTITUTION.replace(':id', addUser.id)
      );
    }
  }, [CareIntitutionId]);

  const handleAddNewCareInstitution = () => {
    addUser({
      variables: {
        careInstInput: {
          firstName: ''
        }
      }
    });
  };

  return (
    <div>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <Suspense fallback={<Loader />}>
            <div className='sticky-common-header'>
              <div className='common-topheader d-flex align-items-center '>
                <div className='user-select'>
                  <Select
                    classNamePrefix='react-select'
                    defaultValue={selectUser}
                    placeholder='Select Caregiver'
                    value={selectUser}
                    onChange={(e: any) => handleSelect(e)}
                    options={CareInstitutionList}
                  />
                </div>
                <Button
                  onClick={handleAddNewCareInstitution}
                  disabled={Loading}
                  className='header-nav-item'
                >
                  {Loading ? (
                    <span className='header-nav-icon'>
                      <i className='fa fa-spinner fa-spin loader' />
                    </span>
                  ) : (
                    <span className='header-nav-icon'>
                      <img src={add} alt='' />
                    </span>
                  )}
                  <span className='header-nav-text'>New Care Institution</span>
                </Button>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={reminder} alt='' />
                  </span>
                  <span
                    className='header-nav-text'
                    // onClick={() => {
                    //   this.setState({ show: true });
                    // }}
                  >
                    Create Todo/Reminder
                  </span>
                </div>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={password} alt='' />
                  </span>
                  <span className='header-nav-text'>New Password</span>
                </div>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={appointment} alt='' />
                  </span>
                  <span className='header-nav-text'>Display Appointments</span>
                </div>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={clear} alt='' />
                  </span>
                  <span className='header-nav-text'>Clear</span>
                </div>
              </div>
              <CareInstitutionSidebar
                tabs={CareInstitutionTabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            </div>
          </Suspense>
          <Suspense fallback={''}>
            <div className='common-content flex-grow-1'>
              {activeTab === 0 ? (
                <PersonalInformation
                  CareInstitutionList={CareInstitutionList}
                  currentSelectuser={(Data: IReactSelectInterface) => {
                    setselectUser((selectUser = Data));
                  }}
                  handleIsUserChange={() =>
                    setisUserChange((isUserChange = false))
                  }
                  isUserChange={isUserChange}
                  qualificationList={qualificationList}
                  {...props}
                />
              ) : null}
              {activeTab === 1 ? <Offers {...props} /> : null}
              {activeTab === 2 ? <Login {...props} /> : null}
              {activeTab === 3 ? <InvoiceMenu {...props} /> : null}
              {activeTab === 4 ? <Documents {...props} /> : null}
              {activeTab === 5 ? <Departments {...props} /> : null}
              {activeTab === 6 ? <Email /> : null}
              {activeTab === 7 ? <Reminders {...props} /> : null}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default ViewCareInstitution;
