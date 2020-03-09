import React, { FunctionComponent, useState, Suspense, useEffect } from 'react';
import { RouteComponentProps, useLocation, useParams } from 'react-router';
import qs from 'query-string';
import { Button } from 'reactstrap';
import Select from 'react-select';
import { FormikProps } from 'formik';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import {
  AppRoutes,
  deactivatedListColor,
  leasingListColor,
  selfEmployesListColor,
  CareInstTIMyoCYAttrId,
  CareInstPlycocoAttrId,
} from '../../../../config';
import { careInstitutionRoutes } from './Sidebar/SidebarRoutes/ConstitutionRoutes';
import {
  ICareInstitutionFormValues,
  IHandleSubmitInterface,
  IReactSelectInterface,
  IQualifications,
} from '../../../../interfaces';
import {
  CareInstitutionQueries,
  GET_QUALIFICATION_ATTRIBUTE,
} from '../../../../graphql/queries';
import { CareInstitutionMutation } from '../../../../graphql/Mutations';
import Loader from '../../containers/Loader/Loader';
import { languageTranslation } from '../../../../helpers';
import CustomOption from '../../components/CustomOptions';
import add from '../../../assets/img/add.svg';
import reminder from '../../../assets/img/reminder.svg';
import password from '../../../assets/img/password.svg';
import appointment from '../../../assets/img/appointment.svg';
import clear from '../../../assets/img/clear.svg';
import CareInstCustomOption from '../../components/CustomOptions/CustomCareInstOptions';

const PersonalInformation = React.lazy(() => import('./PersonalInfo'));
const Offers = React.lazy(() => import('./Offers'));
const Login = React.lazy(() => import('./Login/CareInstitutionLogin'));
const InvoiceMenu = React.lazy(() => import('./invoiceMenu'));
const Documents = React.lazy(() => import('./Documents'));
const Departments = React.lazy(() => import('./Departments'));
const Email = React.lazy(() => import('../CareGiver/Emails'));
// const Reminders = React.lazy(() => import('./Reminders'));
const Reminders = React.lazy(() => import('../../components/ToDosInnerList'));
const CreateTodo = React.lazy(() =>
  import('../../components/CreateTodo/index'),
);

const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST,
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
  DELETE_DEPARTMENT,
] = CareInstitutionMutation;

const CareInstitutionSidebar = React.lazy(() =>
  import('./Sidebar/SidebarLayout/CareInstitutionLayout'),
);

const CareInstitutionTabs = careInstitutionRoutes;

const ViewCareInstitution: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  RouteComponentProps &
  IHandleSubmitInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & RouteComponentProps,
) => {
  let { id } = useParams();
  const Id: any | undefined = id;
  const [showToDo, setShowToDo] = useState<boolean>(false);

  let sortBy: IReactSelectInterface | undefined = {
    label: '3',
    value: 'Sort by A-Z',
  };

  const [isnewDataUpdate, setisnewDataUpdate] = useState(false);

  const [
    addUser,
    { error: addUserError, data: CareIntitutionId, loading: Loading },
  ] = useMutation<{ addUser: any }>(ADD_NEW_CARE_INTITUTION);

  const [
    fetchCareInstitutionList,
    { data: careInstituition, loading, refetch },
  ] = useLazyQuery<any>(GET_CARE_INSTITUTION_LIST, {
    fetchPolicy: 'no-cache',
  });

  let [selectUser, setselectUser] = useState<IReactSelectInterface>({
    label: '',
    value: '',
    color: '',
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
      'caregiver-add-btn',
    );
    if (buttonDiv) {
      if (scrollPositionY >= 12) {
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
        isActive: '',
      },
    });
  }, []);

  let CareInstitutionList: IReactSelectInterface[] = [];
  if (careInstituition && careInstituition.getCareInstitutions) {
    const { getCareInstitutions } = careInstituition;
    const { careInstitutionData, canstitution } = getCareInstitutions;
    CareInstitutionList.push({
      label: languageTranslation('NAME'),
      value: languageTranslation('ID'),
      companyName: languageTranslation('COMPANY_NAME'),
    });
    careInstitutionData.map((data: any, index: any) => {
      const { canstitution } = data;
      let { attributes = [], companyName = '' } = canstitution
        ? canstitution
        : {};
      attributes = attributes ? attributes : [];
      console.log('attributes in view', attributes);
      console.log('data in view', data);

      CareInstitutionList.push({
        label: `${data.lastName}${' '}${data.firstName}`,
        value: data.id,
        color: !data.isActive
          ? deactivatedListColor
          : attributes.includes(CareInstTIMyoCYAttrId)
          ? leasingListColor
          : attributes.includes(CareInstPlycocoAttrId)
          ? selfEmployesListColor
          : '',
        companyName,
      });
      return true;
    });
  }

  // To fecth qualification attributes list
  const { data } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTE);
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (data && data.getQualifications) {
    data.getQualifications.forEach((quali: any) => {
      qualificationList.push({
        label: quali.name,
        value: quali.id,
      });
    });
  }

  const [activeTab, setactiveTab] = useState(0);
  const { search, pathname } = useLocation();
  const [newContactAdded, setnewContactAdded] = useState(false);

  useEffect(() => {
    const query: any = qs.parse(search);
    setactiveTab(
      query.tab
        ? CareInstitutionTabs.findIndex(
            d => d.name === decodeURIComponent(query.tab),
          )
        : 0,
    );
  }, [search]);

  // Set selected care institution
  useEffect(() => {
    const currenCareInstitution: any = CareInstitutionList.filter(
      (careInstitution: any) => careInstitution.value === id,
    )[0];
    setselectUser(currenCareInstitution);
  }, [careInstituition, pathname]);

  const onTabChange = (activeTab: number) => {
    props.history.push(
      `${AppRoutes.CARE_INSTITUION_VIEW.replace(
        ':id',
        Id,
      )}?tab=${encodeURIComponent(CareInstitutionTabs[activeTab].name)}`,
    );
  };
  let [isUserChange, setisUserChange] = useState(false);

  const handleSelect = (e: any) => {
    // if (careInstituition && careInstituition.getCareInstitutions) {
    //   const { getCareInstitutions } = careInstituition;
    //   const { careInstitutionData } = getCareInstitutions;
    //   let userRole = careInstitutionData.find(
    //     (careInstitutionData: any) => careInstitutionData.id === e.value
    //   ).userRole;
    // }

    if (e && e.value) {
      const data: IReactSelectInterface = {
        label: e.label,
        value: e.value,
        color: e.color,
      };
      setselectUser((selectUser = data));
      if (e.value !== Id) {
        props.history.push(
          `${AppRoutes.CARE_INSTITUION_VIEW.replace(
            ':id',
            e.value,
          )}?tab=${encodeURIComponent(CareInstitutionTabs[activeTab].name)}`,
        );
        setisUserChange((isUserChange = true));
      }
    }
  };

  useEffect(() => {
    if (CareIntitutionId) {
      const { addUser } = CareIntitutionId;
      props.history.push(
        AppRoutes.ADD_CARE_INSTITUTION.replace(':id', addUser.id),
      );
    }
  }, [CareIntitutionId]);

  const handleAddNewCareInstitution = () => {
    addUser({
      variables: {
        careInstInput: {
          firstName: '',
        },
      },
    });
  };
  console.log('neContactAdded', newContactAdded);

  return (
    <div>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          {loading ? (
            <div className='detailview-loader'>
              <Loader />
            </div>
          ) : (
            <>
              <Suspense fallback={''}>
                <div className='sticky-common-header'>
                  <div className='common-topheader d-flex align-items-center '>
                    <div className='user-select'>
                      <Select
                        classNamePrefix='custom-inner-reactselect'
                        className={
                          'custom-reactselect custom-reactselect-careinst-menu-width'
                        }
                        defaultValue={selectUser}
                        placeholder='Select Caregiver'
                        value={selectUser}
                        onChange={(e: any) => handleSelect(e)}
                        options={CareInstitutionList}
                        components={{ Option: CareInstCustomOption }}
                        isOptionDisabled={(option: any) =>
                          option.value === languageTranslation('ID')
                        }
                      />
                    </div>
                    <Button
                      onClick={handleAddNewCareInstitution}
                      disabled={Loading}
                      className='header-nav-item'
                    >
                      {Loading ? (
                        <span className='header-nav-icon'>
                          <i className='fa fa-spinner fa-spin ' />
                        </span>
                      ) : (
                        <span className='header-nav-icon'>
                          <img src={add} alt='' />
                        </span>
                      )}
                      <span className='header-nav-text'>
                        {languageTranslation('NEW_CAREINSTITUTION')}
                      </span>
                    </Button>
                    <div className='header-nav-item'>
                      <span className='header-nav-icon'>
                        <img src={reminder} alt='' />
                      </span>
                      <span
                        className='header-nav-text'
                        onClick={() => setShowToDo(true)}
                      >
                        {languageTranslation('CG_MENU_CREATE_TODO')}
                      </span>
                    </div>
                    <div className='header-nav-item'>
                      <span className='header-nav-icon'>
                        <img src={password} alt='' />
                      </span>
                      <span className='header-nav-text'>
                        {languageTranslation('CG_MENU_NEW_PASSWORD')}
                      </span>
                    </div>
                    <div className='header-nav-item'>
                      <span className='header-nav-icon'>
                        <img src={appointment} alt='' />
                      </span>
                      <span className='header-nav-text'>
                        {languageTranslation('CG_MENU_DISPLAY_APPOINTMENTS_')}
                      </span>
                    </div>
                    <div className='header-nav-item'>
                      <span className='header-nav-icon'>
                        <img src={clear} alt='' />
                      </span>
                      <span className='header-nav-text'>
                        {languageTranslation('CLEAR')}
                      </span>
                    </div>
                  </div>
                  <CareInstitutionSidebar
                    tabs={CareInstitutionTabs}
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                  />
                </div>
              </Suspense>
              <Suspense
                fallback={
                  <div className='overview-loader'>
                    <Loader />
                  </div>
                }
              >
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
                      neContactAdded={() => setnewContactAdded(true)}
                    />
                  ) : null}
                  {activeTab === 1 ? <Offers {...props} /> : null}
                  {activeTab === 2 ? <Login /> : null}
                  {activeTab === 3 ? <InvoiceMenu /> : null}
                  {activeTab === 4 ? <Documents /> : null}
                  {activeTab === 5 ? <Departments {...props} /> : null}
                  {activeTab === 6 ? (
                    <Email
                      selectedUserName={
                        selectUser && selectUser.label ? selectUser.label : ''
                      }
                      userRole={
                        careInstituition &&
                        careInstituition.getCareInstitutions &&
                        careInstituition.getCareInstitutions
                          .careInstitutionData &&
                        selectUser &&
                        selectUser.value
                          ? careInstituition.getCareInstitutions.careInstitutionData.find(
                              (careInstitutionData: any) =>
                                careInstitutionData.id === selectUser.value,
                            ).userRole
                          : ''
                      }
                    />
                  ) : null}
                  {activeTab === 7 ? (
                    <Reminders
                      {...props}
                      userRole='careinstitution'
                      isnewDataUpdate={isnewDataUpdate}
                      Id={Id}
                    />
                  ) : null}
                </div>
              </Suspense>
            </>
          )}
        </div>
        <CreateTodo
          show={showToDo}
          handleClose={() => setShowToDo(false)}
          name={selectUser ? selectUser.label : null}
          userRole={'careInstitution'}
          newDataUpdate={() => setisnewDataUpdate(true)}
          setisnewDataUpdate={() => setisnewDataUpdate(false)}
          newContactAdded={newContactAdded}
          setnewContactAdded={() => setnewContactAdded(false)}
          Id={Id}
        />
      </div>
    </div>
  );
};
export default ViewCareInstitution;
