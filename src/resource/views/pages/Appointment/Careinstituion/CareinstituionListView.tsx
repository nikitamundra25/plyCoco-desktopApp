import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  Table,
  Button,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip
} from 'reactstrap';
import '../index.scss';
import {
  IAppointmentCareInstitutionList,
  IDaysArray,
  IReactSelectInterface
} from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';
import { SelectableGroup, SelectAll, DeselectAll } from 'react-selectable-fast';
import CellCareinstitution from './Cell';
import moment from 'moment';
import DetaillistCareinstitutionPopup from '../DetailedList/DetailListCareinstitution';
import {
  dbAcceptableFormat,
  appointmentDateFormat,
  AppRoutes,
  CareInstTIMyoCYAttrId,
  CareInstPlycocoAttrId,
  leasingListColor,
  selfEmployesListColor,
  deactivatedListColor
} from '../../../../../config';
import new_appointment from '../../../../assets/img/dropdown/new_appointment.svg';
import all_list from '../../../../assets/img/dropdown/all_list.svg';
import delete_appointment from '../../../../assets/img/dropdown/delete.svg';
import detail_list from '../../../../assets/img/dropdown/detail_list.svg';
import offer_sent from '../../../../assets/img/dropdown/offer_sent.svg';
import connect from '../../../../assets/img/dropdown/connect.svg';
import disconnect from '../../../../assets/img/dropdown/disconnect.svg';
import confirm_appointment from '../../../../assets/img/dropdown/confirm_appointment.svg';
import set_confirm from '../../../../assets/img/dropdown/confirm.svg';
import unset_confirm from '../../../../assets/img/dropdown/not_confirm.svg';
import invoice from '../../../../assets/img/dropdown/invoice.svg';
import refresh from '../../../../assets/img/refresh.svg';
import classnames from 'classnames';
import { languageTranslation } from '../../../../../helpers';
import BulkEmailCareGiverModal from '../BulkEmailCareGiver';
import BulkEmailCareInstitutionModal from '../BulkEmailCareInstitution';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import UnlinkAppointment from '../unlinkModal';
import { Link } from 'react-router-dom';

let toastId: any = null;
const CarinstituionListView: FunctionComponent<IAppointmentCareInstitutionList &
  any> = (props: IAppointmentCareInstitutionList & any) => {
  let history = useHistory();
  const {
    daysData,
    careInstitutionList,
    loading,
    onAddingRow,
    qualificationList,
    fetchCareinstitutionList,
    handleFirstStarCanstitution,
    careInstituionDeptData,
    starCanstitution,
    deptLoading,
    onhandleSecondStarCanstitution,
    secondStarCanstitution,
    activeDateCaregiver,
    handleSelection,
    selectedCellsCareinstitution,
    selectedCells,
    onLinkAppointment,
    onDeleteEntries,
    setOnConfirmedCareInst,
    setOnNotConfirmedCareInst,
    setOnOfferedCareInst,
    handleSelectedAppoitment,
    setOnNotOfferedCareInst,
    onNewRequirement,
    showSelectedCaregiver
  } = props;
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);

  const [openToggleMenu, setopenToggleMenu] = useState<boolean>(false);
  //use state for toggel menu item
  const [toggleMenuButton, settoggleMenuButton] = useState<boolean>(false);

  const handleRightMenuToggle = () => {
    settoggleMenuButton(!toggleMenuButton);
  };
  const { daysArr = [] } = daysData ? daysData : {};

  const [onEnterMenu, setonEnterMenu] = useState(false);
  const [selectedDays, setSelectedDays] = useState<any[]>([]);

  const onSelectFinish = (selectedCells: any[]) => {
    let selectedRows: any[] = [];
    if (selectedCells && selectedCells.length) {
      selectedRows = selectedCells.map((selectedCell: any) => {
        const { props: cellProps } = selectedCell;
        const { item, list: careInstData, day } = cellProps;

        const {
          userId = '',
          id = '',
          name = '', //department name on solo care institution
          firstName = '',
          lastName = '',
          caregiver = {},
          canstitution = {},
          qualificationId = [],
          deptId = '',
          divisions = []
        } = careInstData ? careInstData : {};
        let qualification1: IReactSelectInterface[] = [];
        if (
          qualificationList &&
          qualificationList.length &&
          item &&
          item.qualificationId
        ) {
          qualification1 = qualificationList.filter(({ value }: any) =>
            item.qualificationId.includes(value)
          );
        } else if (qualificationId && qualificationId.length) {
          qualification1 = qualificationList.filter(({ value }: any) =>
            qualificationId.includes(value)
          );
        }
        let temp = {
          ...item,
          qualificationId: qualification1 ? qualification1 : []
        };
        return {
          id: deptId ? userId : id,
          firstName,
          lastName,
          name:
            canstitution && canstitution.companyName
              ? canstitution.companyName
              : '',
          caregiver,
          canstitution,
          dept: { id: deptId, name },
          item: temp ? temp : item,
          qualificationIds: qualificationId,
          dateString: day ? day.dateString : '',
          divisions
        };
      });
      handleSelection(selectedRows, 'careinstitution');
    }
  };

  const onSelectionClear = () => {
    setSelectedDays([]);
  };
  // Link appointments
  const handleLinkAppointments = (name: string) => {
    let selectedData: any = [],
      checkError: boolean = false;
    if (
      selectedCellsCareinstitution &&
      selectedCellsCareinstitution.length &&
      selectedCells &&
      selectedCells.length
    ) {
      if (selectedCellsCareinstitution.length !== selectedCells.length) {
        if (!toast.isActive(toastId)) {
          toastId = toast.error('Please select same length cells');
        }
      } else {
        let qualiCheck: any[] = [];
        selectedCells.map((key: any, index: number) => {
          const element = selectedCellsCareinstitution[index];
          if (
            key.qualificationIds &&
            key.qualificationIds.length &&
            element.item.qualificationId &&
            element.item.qualificationId.length
          ) {
            qualiCheck = element.item.qualificationId.filter((e: any) =>
              key.qualificationIds.includes(e.value)
            );
          }
          if (qualiCheck && qualiCheck.length <= 0) {
            if (!toast.isActive(toastId)) {
              toastId = toast.error(
                languageTranslation('QUALIFICATION_UNMATCH')
              );
            }
            checkError = true;
            return true;
          }
          if (
            moment(key.dateString).format(dbAcceptableFormat) !==
            moment(element.dateString).format(dbAcceptableFormat)
          ) {
            checkError = true;
            if (!toast.isActive(toastId)) {
              toastId = toast.error(
                'Date range between appointments & requirement mismatch.'
              );
            }
            return false;
          } else if (key.item === undefined || element.item === undefined) {
            checkError = true;
            if (!toast.isActive(toastId)) {
              toastId = toast.error(
                'Create requirement or appointment first for all selected cells.'
              );
            }
            return false;
          } else {
            if (!checkError) {
              selectedData.push({
                avabilityId: parseInt(key.item.id),
                requirementId: parseInt(element.item.id),
                date: moment(element.dateString).format(dbAcceptableFormat),
                status: 'appointment'
              });
            }
          }
        });
        if (!checkError) {
          onLinkAppointment(selectedData, name);
        }
      }
    }
  };

  //unLinked by
  const [unlinkedBy, setunlinkedBy] = useState<string>('');

  //  UnLink appointmnets
  const handleUnLinkAppointments = (name: string) => {
    setshowUnlinkModal(!showUnlinkModal);
  };

  const [isFromUnlink, setisFromUnlink] = useState(false);
  const handleUnlinkData = (likedBy: string, check: boolean) => {
    setunlinkedBy(likedBy);
    let appointmentId: any = [];
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.map((key: any, index: number) => {
        // let appointId: any = key.item.appointments.filter(
        //   (appointment: any) => {
        //     return (
        //       moment(key.dateString).format(dbAcceptableFormat) ===
        //       moment(appointment.date).format(dbAcceptableFormat)
        //     );
        //   }
        // );
        return appointmentId.push({
          appointmentId: parseInt(
            key.item.appointments ? key.item.appointments[0].id : ''
          ),
          unlinkedBy: likedBy,
          deleteAll: check
        });
      });
      onLinkAppointment(appointmentId, 'unlink');
      if (likedBy !== 'employee') {
        setisFromUnlink(true);
        setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
        setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
      }
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(
          languageTranslation('SELECT_APPOINTMENT_IN_UNLINK')
        );
      }
    }
  };

  const [showList, setShowList] = useState<boolean>(false);

  // state for care giver bulk email
  const [openCareGiverBulkEmail, setopenCareGiverBulkEmail] = useState<boolean>(
    false
  );

  // state for care institution bulk email
  const [
    openCareInstitutionBulkEmail,
    setopenCareInstitutionBulkEmail
  ] = useState<boolean>(false);

  // lable for care institution
  const [sortBy, setSortBy] = useState<string>('');

  // show button for care institution
  const [showButton, setShowButton] = useState<boolean>(false);

  // Open care giver bulk Email section
  const handleCareGiverBulkEmail = (sortBy: string, showButton: boolean) => {
    setSortBy(sortBy);
    setShowButton(showButton);
    setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
    if (openCareGiverBulkEmail) {
      setunlinkedBy('');
    }
  };

  // open care institution bulk Email section
  const handleCareInstitutionBulkEmail = () => {
    if (openCareInstitutionBulkEmail) {
      setunlinkedBy('');
    }
    setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
  };
  const [StatusTo, setStatusTo] = useState('');

  const renderTableRows = (listData: any) => {
    if (starCanstitution.isStar && listData && !listData.length) {
      listData = careInstitutionList.filter(
        (item: any) => item.id === starCanstitution.id
      );
    }

    let temp: any[] = [];
    if (listData && listData.length) {
      listData.forEach((list: any, index: number) => {
        if (list.availabilityData && list.availabilityData.length) {
          list.availabilityData.map((item: any, row: number) =>
            temp.push(
              <tr key={`${list.id}-${index}-${row}`}>
                <th className='thead-sticky name-col custom-appointment-col'>
                  <div className='all-star-wrap'>
                    <div
                      style={{
                        backgroundColor: !list.isActive
                          ? deactivatedListColor
                          : list.canstitution && list.canstitution.attributes
                          ? list.canstitution.attributes.includes(
                              CareInstTIMyoCYAttrId
                            )
                            ? leasingListColor
                            : list.canstitution.attributes.includes(
                                CareInstPlycocoAttrId
                              )
                            ? selfEmployesListColor
                            : ''
                          : ''
                      }}
                      // onClick={() =>
                      //   history.push(
                      //     AppRoutes.CARE_INSTITUION_VIEW.replace(':id', list.id)
                      //   )
                      // }
                      title={list.name}
                      className='text-capitalize view-more-link one-line-text username-col name-text'
                      id={`careinst-${list.id}`}
                    >
                      <Link
                        to={AppRoutes.CARE_INSTITUION_VIEW.replace(
                          ':id',
                          list.id
                        )}
                        target='_blank'
                        className='text-body'
                      >
                        {row === 0 ? list.name : null}
                      </Link>
                    </div>
                    <div className='h-col custom-appointment-col text-center'></div>
                    <div
                      className='s-col custom-appointment-col text-center cursor-pointer'
                      onClick={() => handleFirstStarCanstitution(list, index)}
                    >
                      {starCanstitution.setIndex === index ||
                      starCanstitution.isStar ? (
                        <i className='fa fa-star theme-text' />
                      ) : (
                        <i className='fa fa-star-o' />
                      )}
                    </div>
                    <div
                      className='u-col custom-appointment-col text-center cursor-pointer'
                      onClick={() => onhandleSecondStarCanstitution(list)}
                    >
                      {secondStarCanstitution &&
                      secondStarCanstitution.isStar ? (
                        <i className='fa fa-star theme-text' />
                      ) : (
                        <i className='fa fa-star-o' />
                      )}
                    </div>
                    <div
                      className='v-col custom-appointment-col text-center cursor-pointer'
                      onClick={e => onAddingRow(e, 'careinstitution', index)}
                    >
                      <i className='fa fa-arrow-down' />
                    </div>
                  </div>
                </th>

                {/* map */}
                {daysArr.map((key: any, i: number) => {
                  return (
                    <CellCareinstitution
                      key={`${key}-${i}`}
                      day={key}
                      list={list}
                      daysArr={key.isWeekend}
                      showSelectedCaregiver={showSelectedCaregiver}
                      item={
                        item
                          ? item.filter((avabilityData: any) => {
                              return (
                                moment(key.isoString).format('DD.MM.YYYY') ===
                                moment(avabilityData.date).format('DD.MM.YYYY')
                              );
                            })[0]
                          : ''
                      }
                      handleSelectedAvailability
                    />
                  );
                })}
              </tr>
            )
          );
        }
      });
    } else {
      console.log('fgdfhgjdhfgbj');
      // <tr>
      //   {' '}
      //   <th>
      //     <div>'No data'</div>
      //   </th>
      // </tr>;
    }
    return temp /* firstStarData */;
  };
  let emailOptionCond: any;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    emailOptionCond = selectedCellsCareinstitution.filter((x: any) => {
      if (x.item && x.item.id) {
        return (
          x.item && x.item.status !== 'default' && x.item.status !== 'offered'
        );
      } else {
        return ['abc'];
      }
    });
  }
  return (
    <>
      <div
        className={classnames({
          'right-manu-close': true,
          'd-none': !toggleMenuButton
        })}
        onClick={() => handleRightMenuToggle()}
      ></div>
      <div
        className={classnames({
          'rightclick-menu': true,
          'custom-scrollbar': true,
          'd-none': !toggleMenuButton
        })}
        id={'clickbox'}
      >
        <div
          onMouseOver={() => {
            setonEnterMenu(true);
          }}
        >
          <Nav vertical>
            <NavItem>
              <NavLink
                disabled={
                  selectedCellsCareinstitution &&
                  selectedCellsCareinstitution.length &&
                  selectedCellsCareinstitution[0].id === ''
                    ? 'disabled-class'
                    : ''
                }
                onClick={() => {
                  handleRightMenuToggle();
                  onNewRequirement();
                }}
              >
                <img src={new_appointment} className='mr-2' alt='' />
                <span>New appointment</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                disabled={
                  selectedCellsCareinstitution &&
                  selectedCellsCareinstitution.length &&
                  selectedCellsCareinstitution[0].id === ''
                    ? 'disabled-class'
                    : ''
                }
                onClick={() => {
                  handleRightMenuToggle();
                  onDeleteEntries();
                }}
                // onClick={() => onDeleteEntries()}
              >
                <img src={delete_appointment} className='mr-2' alt='' />
                <span>Delete free appointments</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => handleSelectedAppoitment()}>
                <img src={all_list} className='mr-2' alt='' />
                <span>Select all appointments of the caregiver</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink
                onClick={() => {
                  handleRightMenuToggle();
                  setShowList(true);
                }}
              >
                <img src={detail_list} className='mr-2' alt='' />
                <span>Detailed List</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink
                disabled={
                  (selectedCellsCareinstitution &&
                    selectedCellsCareinstitution.length &&
                    selectedCellsCareinstitution[0].id === '') ||
                  (emailOptionCond && emailOptionCond.length !== 0)
                    ? 'disabled-class'
                    : ''
                }
                onClick={() => {
                  handleCareGiverBulkEmail('division', true);
                  handleCareInstitutionBulkEmail();
                  handleRightMenuToggle();
                  setOnOfferedCareInst();
                }}
              >
                <img src={offer_sent} className='mr-2' alt='' />
                <span>
                  Select available caregivers, offer them appointments and set
                  them on offered (sorted by division)
                </span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink
                disabled={
                  (selectedCellsCareinstitution &&
                    selectedCellsCareinstitution.length &&
                    selectedCellsCareinstitution[0].id === '') ||
                  (emailOptionCond && emailOptionCond.length !== 0)
                    ? 'disabled-class'
                    : ''
                }
                onClick={() => {
                  handleCareGiverBulkEmail('day', true);
                  handleCareInstitutionBulkEmail();
                  // setOnOfferedCareInst();
                  handleRightMenuToggle();
                }}
              >
                <img src={offer_sent} className='mr-2' alt='' />
                <span>
                  Select available caregivers, offer them appointments and set
                  them on offered (sorted by day)
                </span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink
                disabled={
                  (selectedCellsCareinstitution &&
                    selectedCellsCareinstitution.length &&
                    selectedCellsCareinstitution[0].id === '') ||
                  (emailOptionCond && emailOptionCond.length !== 0)
                    ? 'disabled-class'
                    : ''
                }
                onClick={() => {
                  handleCareGiverBulkEmail('division', false);
                  handleCareInstitutionBulkEmail();
                  // setOnOfferedCareInst();
                  handleRightMenuToggle();
                }}
              >
                <img src={offer_sent} className='mr-2' alt='' />
                <span>
                  Select available caregivers, offer them appointments and set
                  them on offered (no direct booking; sorted by division)
                </span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink
                disabled={
                  (selectedCellsCareinstitution &&
                    selectedCellsCareinstitution.length &&
                    selectedCellsCareinstitution[0].id === '') ||
                  (emailOptionCond && emailOptionCond.length !== 0)
                    ? 'disabled-class'
                    : ''
                }
                onClick={() => {
                  handleCareGiverBulkEmail('day', false);
                  handleCareInstitutionBulkEmail();
                  // setOnOfferedCareInst();
                  handleRightMenuToggle();
                }}
              >
                <img src={offer_sent} className='mr-2' alt='' />
                <span>
                  Select available caregivers, offer them appointments and set
                  them on offered (no direct booking; sorted by day)
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={set_confirm} className='mr-2' alt='' />
                <span
                  onClick={() => {
                    handleRightMenuToggle();
                    setOnOfferedCareInst();
                  }}
                >
                  Set on offered
                </span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={unset_confirm} className='mr-2' alt='' />
                <span
                  onClick={() => {
                    handleRightMenuToggle();
                    setOnNotOfferedCareInst();
                  }}
                >
                  Reset offered
                </span>
              </NavLink>
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink
                onClick={() => {
                  handleRightMenuToggle();
                  handleLinkAppointments('link');
                }}
              >
                <img src={connect} className='mr-2' alt='' />
                <span>Connect appointments</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  handleRightMenuToggle();
                  handleUnLinkAppointments('unlink');
                }}
              >
                <img src={disconnect} className='mr-2' alt='' />
                <span>Disconnect appointments</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink
                onClick={() => {
                  handleCareInstitutionBulkEmail();
                  setStatusTo('offered');
                  setopenToggleMenu(false);
                  setSortBy('day');
                }}
              >
                <img src={offer_sent} className='mr-2' alt='' />
                <span>Offer appointments (ordered by day)</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  handleCareInstitutionBulkEmail();
                  setStatusTo('offered');
                  handleRightMenuToggle();
                  setSortBy('division');
                }}
              >
                <img src={offer_sent} className='mr-2' alt='' />
                <span>Offer appointments (ordered by department)</span>
              </NavLink>
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink
                onClick={() => {
                  handleCareInstitutionBulkEmail();
                  setStatusTo('confirmed');
                  handleRightMenuToggle();
                  setOnConfirmedCareInst();
                  setSortBy('day');
                }}
              >
                <img src={confirm_appointment} className='mr-2' alt='' />
                <span>Confirm appointments (ordered by day) </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => {
                  handleCareInstitutionBulkEmail();
                  setStatusTo('confirmed');
                  handleRightMenuToggle();
                  setOnConfirmedCareInst();
                  setSortBy('division');
                }}
              >
                <img src={confirm_appointment} className='mr-2' alt='' />
                <span>Confirm appointments (ordered by department)</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={set_confirm} className='mr-2' alt='' />
                <span
                  onClick={() => {
                    handleRightMenuToggle();
                    setOnConfirmedCareInst();
                  }}
                >
                  Set on confirmed
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={unset_confirm} className='mr-2' alt='' />
                <span
                  onClick={() => {
                    handleRightMenuToggle();

                    setOnNotConfirmedCareInst();
                  }}
                >
                  Reset confirmed
                </span>
              </NavLink>
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink>
                <img src={invoice} className='mr-2' alt='' />
                <span>Create prepayment invoice</span>
              </NavLink>
            </NavItem>
            {/*  <NavItem className='bordernav' />
            <NavItem>
              <NavLink>
                <img src={refresh} className='mr-2' alt='' />
                <span>Refresh </span>
              </NavLink>
            </NavItem> */}
          </Nav>
        </div>
      </div>
      <div className='calender-section custom-scrollbar  mt-3'>
        <SelectableGroup
          allowClickWithoutSelected
          className='custom-row-selector'
          clickClassName='tick'
          resetOnStart={true}
          onSelectionFinish={onSelectFinish}
          onSelectionClear={onSelectionClear}
          ignoreList={['.name-col', '.h-col', '.s-col', '.u-col', '.v-col']}
        >
          <Table hover bordered className='mb-0 appointment-table'>
            <thead className='thead-bg'>
              <tr>
                <th className='thead-sticky name-col custom-appointment-col '>
                  <div className='all-star-wrap'>
                    <div className='position-relative  username-col align-self-center'>
                      <div className='calender-heading'>
                        {languageTranslation('MENU_INSTITUTION')}
                      </div>
                      <Button
                        onClick={() => handleRightMenuToggle()}
                        className='btn-more d-flex align-items-center justify-content-center'
                      >
                        <i className='icon-options-vertical' />
                      </Button>
                    </div>

                    <div className='thead-sticky h-col custom-appointment-col text-center'>
                      H
                    </div>
                    <div className='thead-sticky s-col custom-appointment-col text-center'>
                      S
                    </div>
                    <div className='thead-sticky u-col custom-appointment-col text-center'>
                      A
                    </div>
                    <div className='thead-sticky v-col custom-appointment-col text-center'>
                      V
                    </div>
                  </div>
                </th>

                {/* array for showing day */}
                {daysArr.map(
                  (
                    { date, day, isWeekend, today }: IDaysArray,
                    index: number
                  ) => {
                    const todaysDate = moment(today).format(
                      appointmentDateFormat
                    );
                    return (
                      <th
                        key={index}
                        className={`thead-sticky calender-col custom-appointment-col text-center ${
                          date === todaysDate
                            ? 'today'
                            : isWeekend
                            ? 'weekend'
                            : ''
                        }`}
                      >
                        <div className='custom-appointment-calendar-date'>
                          {date}
                        </div>
                        <div className='custom-appointment-calendar-day'>
                          {day}
                        </div>
                      </th>
                    );
                  }
                )}
              </tr>
            </thead>
            <tbody>
              {console.log('starCanstitution', starCanstitution)}
              {console.log('careInstitutionList', careInstitutionList)}

              {loading || (starCanstitution.isStar && deptLoading) ? (
                <tr>
                  <td className={'table-loader'} colSpan={40}>
                    <Loader />
                  </td>
                </tr>
              ) : (
                renderTableRows(
                  !starCanstitution.isStar
                    ? careInstitutionList
                    : secondStarCanstitution.isStar
                    ? careInstituionDeptData && careInstituionDeptData.length
                      ? careInstituionDeptData.filter(
                          (dept: any) => dept.id === secondStarCanstitution.id
                        )
                      : []
                    : careInstituionDeptData
                )
              )}
            </tbody>
          </Table>
        </SelectableGroup>
      </div>
      <BulkEmailCareInstitutionModal
        openModal={openCareInstitutionBulkEmail}
        handleClose={() => handleCareInstitutionBulkEmail()}
        qualification={props.qualification}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={props.gte}
        lte={props.lte}
        statusTo={StatusTo}
        sortBy={sortBy}
        unlinkedBy={unlinkedBy}
        isFromUnlink={isFromUnlink}
      />
      <BulkEmailCareGiverModal
        openModal={openCareGiverBulkEmail}
        qualification={props.qualification}
        handleClose={() => handleCareGiverBulkEmail('', false)}
        selectedCells={selectedCells}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={props.gte}
        lte={props.lte}
        sortBy={sortBy}
        showButton={showButton}
        unlinkedBy={unlinkedBy}
      />
      <DetaillistCareinstitutionPopup
        show={showList ? true : false}
        handleClose={() => setShowList(false)}
        qualificationList={qualificationList}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        fetchCareinstitutionList={fetchCareinstitutionList}
      />
      <UnlinkAppointment
        show={showUnlinkModal}
        handleClose={() => setshowUnlinkModal(false)}
        handleUnlinkData={handleUnlinkData}
      />
    </>
  );
};

export default CarinstituionListView;
