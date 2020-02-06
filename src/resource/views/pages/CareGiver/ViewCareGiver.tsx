import React, { FunctionComponent, useState, Suspense, useEffect } from 'react';
import { RouteComponentProps, useLocation, useParams } from 'react-router';
import Select from 'react-select';
import qs from 'query-string';
import { useLazyQuery } from '@apollo/react-hooks';
import { AppRoutes } from '../../../../config';
import { careGiverRoutes } from './Sidebar/SidebarRoutes/CareGiverRoutes';
import { IReactSelectInterface } from '../../../../interfaces';
import Invoices from './Invoices/Invoices';
import PersonalInformation from './PersonalInfo/PersonalInformation';
import Offer from './Offers/Offer';
import ToDo from './ToDos/ToDos';
import LeasingPersonalData from './LeasingData';
import QualificationAttribute from './GroupedBelow';
import Loader from '../../containers/Loader/Loader';
import Email from './Emails';
import add from '../../../assets/img/add.svg';
import reminder from '../../../assets/img/reminder.svg';
import password from '../../../assets/img/password.svg';
import appointment from '../../../assets/img/appointment.svg';
import clear from '../../../assets/img/clear.svg';
import { CareGiverQueries } from '../../../../graphql/queries';
import LoginLogs from './Logins/CareLogin';
import CreateTodo from '../../components/CreateTodo';
import CustomOption from '../../components/CustomOptions';
import { languageTranslation } from '../../../../helpers';
import Documents from './Documents';
const CareGiverSidebar = React.lazy(() =>
  import('./Sidebar/SidebarLayout/CareGiverLayout'),
);

const [GET_CAREGIVERS] = CareGiverQueries;
const CareGiverRoutesTabs = careGiverRoutes;

const ViewCareGiver: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps,
) => {
  let { id } = useParams();
  const Id: any | undefined = id;
  const [showToDo, setShowToDo] = useState<boolean>(false);
  let sortBy: IReactSelectInterface | undefined = {
    label: '3',
    value: 'Sort by A-Z',
  };
  // To fetch the list of all caregiver
  const [
    fetchCareGivers,
    { data: careGivers, loading, refetch },
  ] = useLazyQuery<any>(GET_CAREGIVERS, {
    fetchPolicy: 'no-cache',
  });

  let [selectUser, setselectUser] = useState<IReactSelectInterface | null>(
    null,
  );

  const [activeTab, setactiveTab] = useState(0);
  const { search, pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Fetch list of caregivers
    fetchCareGivers({
      variables: {
        searchBy: '',
        sortBy: 3,
        limit: 200,
        page: 1,
        isActive: '',
      },
    });
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

  const careGiverOpt: IReactSelectInterface[] | undefined = [];
  if (
    careGivers &&
    careGivers.getCaregivers &&
    careGivers.getCaregivers.result
  ) {
    careGiverOpt.push({
      label: languageTranslation('NAME'),
      value: languageTranslation('ID'),
    });
    careGivers.getCaregivers.result.forEach(
      ({ id, firstName, lastName }: any) =>
        careGiverOpt.push({
          label: `${firstName}${' '}${lastName}`,
          value: id,
        }),
    );
  }
  // It's used to set active tab
  useEffect(() => {
    const query: any = qs.parse(search);
    setactiveTab(
      query.tab
        ? careGiverRoutes.findIndex(
            d => d.name === decodeURIComponent(query.tab),
          )
        : 0,
    );
  }, [search]);

  // Set selected caregiver
  useEffect(() => {
    const currenCareGiver = careGiverOpt.filter(
      (careGiver: any) => careGiver.value === id,
    )[0];
    setselectUser(currenCareGiver);
  }, [careGivers]);

  const onTabChange = (activeTab: number) => {
    props.history.push(
      `${AppRoutes.CARE_GIVER_VIEW.replace(':id', Id)}?tab=${encodeURIComponent(
        careGiverRoutes[activeTab].name,
      )}`,
    );
  };
  let [isUserChange, setisUserChange] = useState(false);
  const handleSelect = (e: any) => {
    if (e && e.value) {
      const data: IReactSelectInterface = {
        label: e.label,
        value: e.value,
      };
      setselectUser((selectUser = data));
      if (e.value !== Id) {
        props.history.push(
          `${AppRoutes.CARE_GIVER_VIEW.replace(
            ':id',
            e.value,
          )}?tab=${encodeURIComponent(careGiverRoutes[activeTab].name)}`,
        );
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
          <Suspense fallback={<Loader />}>
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
                    isOptionDisabled={option => option.value === 'Id'}
                  />
                </div>
                <div
                  onClick={handleAddNewCareGiver}
                  className='header-nav-item'
                >
                  <span className='header-nav-icon'>
                    <img src={add} alt='' />
                  </span>
                  <span className='header-nav-text'>New Caregiver</span>
                </div>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={reminder} alt='' />
                  </span>
                  <span
                    className='header-nav-text'
                    onClick={() => setShowToDo(true)}
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
              <CareGiverSidebar
                tabs={CareGiverRoutesTabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            </div>
          </Suspense>
          <Suspense fallback={''}>
            <div className='common-content flex-grow-1'>
              {activeTab === 0 ? (
                <PersonalInformation
                  currentSelectuser={(Data: IReactSelectInterface) => {
                    setselectUser((selectUser = Data));
                  }}
                  handleIsUserChange={() =>
                    setisUserChange((isUserChange = false))
                  }
                  Id={Id}
                  isUserChange={isUserChange}
                  careGiverOpt={careGiverOpt}
                  {...props}
                />
              ) : null}
              {activeTab === 1 ? <Offer /> : null}
              {activeTab === 2 ? <LoginLogs /> : null}
              {activeTab === 3 ? <Invoices /> : null}
              {activeTab === 4 ? <Documents /> : null}
              {activeTab === 5 ? (
                <Email
                  selectedUserName={
                    selectUser && selectUser.label ? selectUser.label : ''
                  }
                />
              ) : null}
              {activeTab === 6 ? <ToDo /> : null}
              {activeTab === 7 ? <LeasingPersonalData {...props} /> : null}
              {activeTab === 8 ? <QualificationAttribute /> : null}
            </div>
          </Suspense>
        </div>
      </div>
      <CreateTodo
        show={showToDo}
        handleClose={() => setShowToDo(false)}
        name={selectUser ? selectUser.label : null}
        userRole={'careGiver'}
      />
    </div>
  );
};
export default ViewCareGiver;
