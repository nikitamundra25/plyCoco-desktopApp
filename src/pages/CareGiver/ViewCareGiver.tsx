import React, { FunctionComponent, useState, Suspense, useEffect } from 'react';
import { RouteComponentProps, useLocation, useParams } from 'react-router';
import Select from 'react-select';
import { CareGiver, AppRoutes, PAGE_LIMIT } from '../../config';
import add from '../../assets/img/add.svg';
import save from '../../assets/img/save.svg';
import reminder from '../../assets/img/reminder.svg';
import password from '../../assets/img/password.svg';
import appointment from '../../assets/img/appointment.svg';
import clear from '../../assets/img/clear.svg';
import { careGiverRoutes } from './Sidebar/SidebarRoutes/CareGiverRoutes';
import qs from 'query-string';
import { IReactSelectInterface } from '../../interfaces';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { GET_CAREGIVERS } from '../../queries';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import Invoices from './Invoices/Invoices';
import PersonalInformation from './PersonalInfo/PersonalInformation';
import DocumentsUpload from './Documents/DocumentsUpload';
import Offer from './Offers/Offer';
import LoginLogs from './Logins/CareLogin';
import InboxEmail from './Emails/InboxEmail';
import ToDo from './ToDos/ToDos';
import LeasingPersonalData from './LeasingData';
import QualificationAttribute from './QualificationAttributes/QualificationAttribute';

const CareGiverSidebar = React.lazy(() =>
  import('../../pages/CareGiver/Sidebar/SidebarLayout/CareGiverLayout'),
);

const CareGiverRoutesTabs = careGiverRoutes;

const ViewCareGiver: FunctionComponent<RouteComponentProps> = (
  props: RouteComponentProps,
) => {
  let { id } = useParams();
  const Id: any | undefined = id;

  let sortBy: IReactSelectInterface | undefined = {
    label: '3',
    value: 'Sort by A-Z',
  };
  // To fetch the list of all care giver
  const [
    fetchCareGivers,
    { data: careGivers, loading, refetch },
  ] = useLazyQuery<any>(GET_CAREGIVERS);

  let [selectUser, setselectUser] = useState<IReactSelectInterface | null>(
    null,
  );

  // if (careGiver && careGiver.getCaregivers) {
  //   const { getCaregivers } = careGiver;
  //   getCaregivers.map((data: any, index: any) => {
  //     CareGireList.push({
  //       label: `${data.firstName}${' '}${data.lastName}`,
  //       value: data.id,
  //     });
  //   });
  // }
  const [activeTab, setactiveTab] = useState(0);
  const { search, pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Fetch list of care givers
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
      if (scrollPositionY >= 35) {
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

  // Set selected care giver
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
          <Suspense fallback={'Loading..'}>
            <div className='sticky-common-header'>
              <div className='common-topheader d-flex align-items-center '>
                <div className='user-select'>
                  <Select
                  classNamePrefix="react-select"
                    defaultValue={selectUser}
                    placeholder='Select Caregiver'
                    value={selectUser}
                    onChange={(e: any) => handleSelect(e)}
                    options={careGiverOpt}
                  />
                </div>
                <div
                  onClick={handleAddNewCareGiver}
                  className='header-nav-item'
                >
                  <span className='header-nav-icon'>
                    <img src={add} alt='' />
                  </span>
                  <span className='header-nav-text'>New Care Giver</span>
                </div>
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
                  {...props}
                />
              ) : null}
              {activeTab === 1 ? <Offer {...props} /> : null}
              {activeTab === 2 ? <LoginLogs {...props} /> : null}
              {activeTab === 3 ? <Invoices {...props} /> : null}
              {activeTab === 4 ? <DocumentsUpload {...props} /> : null}
              {activeTab === 5 ? <InboxEmail {...props} /> : null}
              {activeTab === 6 ? <ToDo {...props} /> : null}
              {activeTab === 7 ? <LeasingPersonalData {...props} /> : null}
              {activeTab === 8 ? <QualificationAttribute {...props} /> : null}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default ViewCareGiver;
