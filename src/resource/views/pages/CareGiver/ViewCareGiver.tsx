import React, { FunctionComponent, useState, Suspense, useEffect } from 'react';
import { RouteComponentProps, useLocation, useParams } from 'react-router';
import Select from 'react-select';
import qs from 'query-string';
import { useLazyQuery } from '@apollo/react-hooks';
import { AppRoutes } from '../../../../config';
import { careGiverRoutes } from './Sidebar/SidebarRoutes/CareGiverRoutes';
import { IReactSelectInterface } from '../../../../interfaces';
import Loader from '../../containers/Loader/Loader';
import { CareGiverQueries } from '../../../../graphql/queries';
import CustomOption from '../../components/CustomOptions';
import { languageTranslation } from '../../../../helpers';
import add from '../../../assets/img/add.svg';
import reminder from '../../../assets/img/reminder.svg';
import password from '../../../assets/img/password.svg';
import appointment from '../../../assets/img/appointment.svg';
import clear from '../../../assets/img/clear.svg';

const CareGiverSidebar = React.lazy(() =>
  import('./Sidebar/SidebarLayout/CareGiverLayout')
);
const PersonalInfo = React.lazy(() => import('./PersonalInfo'));
const Offer = React.lazy(() => import('./Offers'));
const LoginLogs = React.lazy(() => import('../../components/Logins'));
const Invoices = React.lazy(() => import('./Invoices/Invoices'));
const ToDo = React.lazy(() => import('../../components/ToDosInnerList'));
const Documents = React.lazy(() => import('./Documents'));
const Email = React.lazy(() => import('./Emails'));
const CreateTodo = React.lazy(() =>
  import('../../components/CreateTodo/index')
);
const LeasingPersonalData = React.lazy(() => import('./LeasingData'));
const GroupedBelow = React.lazy(() => import('./GroupedBelow'));

const [GET_CAREGIVERS] = CareGiverQueries;
const CareGiverRoutesTabs = careGiverRoutes;

const ViewCareGiver: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  let { id } = useParams();
  const Id: any | undefined = id;
  const [showToDo, setShowToDo] = useState<boolean>(false);
  // To fetch the list of all caregiver
  const [
    fetchCareGivers,
    { data: careGivers, loading, refetch }
  ] = useLazyQuery<any>(GET_CAREGIVERS, {
    fetchPolicy: 'no-cache'
  });

  let [selectUser, setselectUser] = useState<IReactSelectInterface>({
    label: '',
    value: ''
  });

  const [activeTab, setactiveTab] = useState(0);
  const { search, pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Fetch list of caregivers
    fetchCareGivers({
      variables: {
        searchBy: '',
        sortBy: 3,
        limit: 500,
        page: 1,
        isActive: ''
      }
    });
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
      if (scrollPositionY >= 12) {
        buttonDiv.classList.add('sticky-save-btn');
      } else {
        buttonDiv.classList.remove('sticky-save-btn');
      }
    }
  };

  const careGiverOpt: IReactSelectInterface[] | undefined = [];
  if (
    careGivers &&
    careGivers.getCaregivers &&
    careGivers.getCaregivers.result
  ) {
    careGiverOpt.push({
      label: languageTranslation('NAME'),
      value: languageTranslation('ID')
    });
    careGivers.getCaregivers.result.forEach(
      ({ id, firstName, lastName }: any) =>
        careGiverOpt.push({
          label: `${firstName}${' '}${lastName}`,
          value: id
        })
    );
  }
  // It's used to set active tab
  useEffect(() => {
    const query: any = qs.parse(search);
    setactiveTab(
      query.tab
        ? careGiverRoutes.findIndex(
            d => d.name === decodeURIComponent(query.tab)
          )
        : 0
    );
  }, [search]);

  const [isnewDataUpdate, setisnewDataUpdate] = useState(false);

  // Set selected caregiver
  useEffect(() => {
    const currenCareGiver = careGiverOpt.filter(
      (careGiver: any) => careGiver.value === id
    )[0];
    setselectUser(currenCareGiver);
  }, [careGivers, pathname]);
  const [newContactAdded, setnewContactAdded] = useState(false);

  const onTabChange = (activeTab: number) => {
    props.history.push(
      `${AppRoutes.CARE_GIVER_VIEW.replace(':id', Id)}?tab=${encodeURIComponent(
        careGiverRoutes[activeTab].name
      )}`
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
        const {
          location: { search }
        } = props;
        const query = qs.parse(search);
        props.history.push(
          [
            `${AppRoutes.CARE_GIVER_VIEW.replace(':id', e.value)}`,
            qs.stringify({ ...query })
          ].join('?')
        );
        // props.history.push(
        //   `${AppRoutes.CARE_GIVER_VIEW.replace(
        //     ":id",
        //     e.value
        //   )}?tab=${encodeURIComponent(careGiverRoutes[activeTab].name)}`
        // );
        setisUserChange((isUserChange = true));
      }
    }
  };

  const handleAddNewCareGiver = () => {
    props.history.push(AppRoutes.ADD_CARE_GIVER);
  };

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
                          'custom-reactselect custom-reactselect-menu-width'
                        }
                        defaultValue={selectUser}
                        placeholder='Select Caregiver'
                        value={selectUser}
                        onChange={(e: any) => handleSelect(e)}
                        options={careGiverOpt}
                        components={{ Option: CustomOption }}
                        isOptionDisabled={option =>
                          option.value === languageTranslation('ID')
                        }
                      />
                    </div>
                    <div
                      onClick={handleAddNewCareGiver}
                      className='header-nav-item'
                    >
                      <span className='header-nav-icon'>
                        <img src={add} alt='' />
                      </span>
                      <span className='header-nav-text'>
                        {languageTranslation('CG_MENU_NEW_CAREGIVER')}
                      </span>
                    </div>
                    <div
                      className='header-nav-item'
                      onClick={() => setShowToDo(true)}
                    >
                      <span className='header-nav-icon'>
                        <img src={reminder} alt='' />
                      </span>
                      <span className='header-nav-text'>
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
                  <CareGiverSidebar
                    tabs={CareGiverRoutesTabs}
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
                    <PersonalInfo careGiverOpt={careGiverOpt} />
                  ) : null}
                  {activeTab === 1 ? <Offer {...props} /> : null}
                  {activeTab === 2 ? <LoginLogs /> : null}
                  {activeTab === 3 ? <Invoices /> : null}
                  {activeTab === 4 ? <Documents /> : null}
                  {activeTab === 5 ? (
                    <Email
                      selectedUserName={
                        selectUser && selectUser.label ? selectUser.label : ''
                      }
                      userRole={
                        careGivers &&
                        careGivers.getCaregivers &&
                        careGivers.getCaregivers.result &&
                        selectUser &&
                        selectUser.value
                          ? careGivers.getCaregivers.result.find(
                              (careGiver: any) =>
                                careGiver.id === selectUser.value
                            ).userRole
                          : ''
                      }
                    />
                  ) : null}
                  {activeTab === 6 ? (
                    <ToDo
                      {...props}
                      userRole='caregiver'
                      isnewDataUpdate={isnewDataUpdate}
                      Id={Id}
                    />
                  ) : null}
                  {activeTab === 7 ? <LeasingPersonalData {...props} /> : null}
                  {activeTab === 8 ? <GroupedBelow /> : null}
                </div>
              </Suspense>
            </>
          )}
        </div>
      </div>
      <CreateTodo
        {...props}
        show={showToDo ? true : false}
        handleClose={() => setShowToDo(false)}
        name={selectUser ? selectUser.label : null}
        userRole={'careGiver'}
        newDataUpdate={() => setisnewDataUpdate(true)}
        setisnewDataUpdate={() => setisnewDataUpdate(false)}
        Id={Id}
        newContactAdded={false}
        setnewContactAdded={() => setnewContactAdded(false)}
      />
    </div>
  );
};
export default ViewCareGiver;
