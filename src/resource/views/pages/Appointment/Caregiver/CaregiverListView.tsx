import React, { FunctionComponent, useState } from 'react';
import { Table, Nav, NavItem, NavLink, Button } from 'reactstrap';
import moment from 'moment';
import classnames from 'classnames';
import {
  IAppointmentCareGiverList,
  IDaysArray,
} from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';
import { SelectableGroup, SelectAll, DeselectAll } from 'react-selectable-fast';
import Cell from './Cell';
import DetaillistCaregiverPopup from '../DetailedList/DetailListCaregiver';
import BulkEmailCareGiverModal from '../BulkEmailCareGiver';
import new_appointment from '../../../../assets/img/dropdown/new_appointment.svg';
import reserve from '../../../../assets/img/dropdown/block.svg';
import delete_appointment from '../../../../assets/img/dropdown/delete.svg';
import detail_list from '../../../../assets/img/dropdown/detail_list.svg';
import filter from '../../../../assets/img/filter.svg';
import offer_sent from '../../../../assets/img/dropdown/offer_sent.svg';
import connect from '../../../../assets/img/dropdown/connect.svg';
import disconnect from '../../../../assets/img/dropdown/disconnect.svg';
import confirm_appointment from '../../../../assets/img/dropdown/confirm_appointment.svg';
import set_confirm from '../../../../assets/img/dropdown/confirm.svg';
import unset_confirm from '../../../../assets/img/dropdown/not_confirm.svg';
import leasing_contact from '../../../../assets/img/dropdown/leasing.svg';
import termination from '../../../../assets/img/dropdown/aggrement.svg';
import refresh from '../../../../assets/img/refresh.svg';
import {
  appointmentDateFormat,
  AppRoutes,
  selfEmployesListColor,
  leasingListColor,
  CaregiverTIMyoCYAttrId,
  deactivatedListColor,
} from '../../../../../config';
import { useHistory } from 'react-router';
import { dbAcceptableFormat } from '../../../../../config';
import { toast } from 'react-toastify';
import UnlinkAppointment from '../unlinkModal';
import '../index.scss';

let toastId: any = null;
const CaregiverListView: FunctionComponent<IAppointmentCareGiverList & any> = (
  props: IAppointmentCareGiverList & any,
) => {
  let history = useHistory();
  const {
    daysData,
    careGiversList,
    loading,
    onAddingRow,
    selectedCells,
    handleSelectedUser,
    handleSelection,
    handleSecondStar,
    handleReset,
    selctedAvailability,
    activeDateCaregiver,
    onReserve,
    onDeleteEntries,
    onCaregiverQualificationFilter,
    selectedCellsCareinstitution,
    onLinkAppointment,
    setOnConfirmedCaregiver,
    setOnNotConfirmedCaregiver,
  } = props;

  const [starMark, setstarMark] = useState<boolean>(false);
  const [openToggleMenu, setopenToggleMenu] = useState<boolean>(false);
  const [getSelecetedCell, setSelecetdCell] = useState<any>();
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);

  const onhandleSecondStar = (list: object, index: number, name: string) => {
    if (!starMark) {
      setstarMark(!starMark);
      handleSecondStar(list, index, name);
    } else {
      setstarMark(!starMark);
      handleReset(name);
    }
  };

  const handleToggleMenuItem = () => {
    setopenToggleMenu(!openToggleMenu);
  };

  //State for care giver bulk email
  const [openCareGiverBulkEmail, setopenCareGiverBulkEmail] = useState<boolean>(
    false,
  );
  // Open care giver bulk Email section
  const handleCareGiverBulkEmail = () => {
    setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
  };

  const { daysArr = [] } = daysData ? daysData : {};
  // select multiple
  const [selectedDays, setSelectedDays] = useState<any[]>([]);

  const onSelectFinish = (selectedCellsData: any[]) => {
    console.log(selectedCellsData, 'onSelectFinish');
    let selectedRows: any[] = [];
    if (selectedCellsData && selectedCellsData.length) {
      selectedRows = selectedCellsData.map((selectedCell: any) => {
        const { props: cellProps } = selectedCell;
        const { item, list: caregiverData, day } = cellProps;
        const {
          id = '',
          firstName = '',
          lastName = '',
          caregiver = {},
          qualificationId = [],
        } = caregiverData ? caregiverData : {};
        return {
          id,
          firstName,
          lastName,
          caregiver,
          item,
          qualificationIds: qualificationId,
          dateString: day ? day.dateString : '',
        };
      });
      handleSelection(selectedRows, 'caregiver');
      // for (let index = 0; index < selected.length; index++) {
      //   const { item, list, dateString } = selected[index];
      //   selctedAvailability = item;
      //   selectedRows.push({
      //     id: list.id,
      //     qualificationIds: list.qualificationId,
      //     item,
      //     dateString,
      //   });
      // }
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
        selectedCells.map((key: any, index: number) => {
          const element = selectedCellsCareinstitution[index];
          if (
            moment(key.dateString).format(dbAcceptableFormat) !==
            moment(element.dateString).format(dbAcceptableFormat)
          ) {
            checkError = true;
            if (!toast.isActive(toastId)) {
              toastId = toast.error(
                'Date range between appointments & requirement mismatch.',
              );
            }
            return false;
          } else if (key.item === undefined || element.item === undefined) {
            checkError = true;
            if (!toast.isActive(toastId)) {
              toastId = toast.error(
                'Create requirement or appointment first for all selected cells.',
              );
            }
            return false;
          } else {
            if (!checkError) {
              selectedData.push({
                avabilityId: parseInt(key.item.id),
                requirementId: parseInt(element.item.id),
                date: moment(element.dateString).format(dbAcceptableFormat),
                status: 'appointment',
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

  //  UnLink appointmnets
  const handleUnLinkAppointments = () => {
    setshowUnlinkModal(!showUnlinkModal);
  };

  const handleUnlinkData = (likedBy: string, check: boolean) => {
    let appointmentId: any = [];
    if (selectedCells && selectedCells.length) {
      selectedCells.map((key: any, index: number) => {
        if (key.item && key.item.appointments && key.item.appointments.length) {
          let appointId: any = key.item.appointments.filter(
            (appointment: any) => {
              return (
                moment(key.dateString).format('DD.MM.YYYY') ===
                moment(appointment.date).format('DD.MM.YYYY')
              );
            },
          );
          return appointmentId.push({
            appointmentId: parseInt(appointId[0].id),
            unlinkedBy: likedBy,
            deleteAll: check,
          });
        }
      });
      // console.log('appointmentId', appointmentId);
      onLinkAppointment(appointmentId, 'unlink');
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error('Please select appointment/s.');
      }
    }
  };

  const [showList, setShowList] = useState<boolean>(false);

  return (
    <>
      <div
        className={classnames({
          'right-manu-close': true,
          'd-none': !openToggleMenu,
        })}
        onClick={handleToggleMenuItem}
      ></div>
      <div
        className={classnames({
          'rightclick-menu top-open': true,
          'custom-scrollbar': true,
          'd-none': !openToggleMenu,
        })}
      >
        <Nav vertical>
          <NavItem>
            <NavLink>
              <img src={new_appointment} className='mr-2' alt='' />
              <span className='align-middle'>New appointment</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                setopenToggleMenu(false);
                onReserve();
              }}
            >
              <img src={reserve} className='mr-2' alt='' />
              <span className='align-middle'>Reserve</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                setopenToggleMenu(false);
                onDeleteEntries();
              }}
            >
              <img src={delete_appointment} className='mr-2' alt='' />
              <span className='align-middle'>
                Delete free and reserved calender entries
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink onClick={() => setShowList(true)}>
              <img src={detail_list} className='mr-2' alt='' />
              <span className='align-middle'>Detailed List</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem
            onClick={() => {
              setopenToggleMenu(false);
              onCaregiverQualificationFilter();
            }}
          >
            <NavLink>
              <img src={filter} className='mr-2' alt='' />
              <span className='align-middle'>
                Filter by qualifications of caregiver
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink onClick={() => handleCareGiverBulkEmail()}>
              <img src={offer_sent} className='mr-2' alt='' />
              <span className='align-middle'>
                Offer all available calendar entries
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink
              onClick={() => {
                setopenToggleMenu(false);
                handleLinkAppointments('link');
              }}
            >
              <img src={connect} className='mr-2' alt='' />
              <span className='align-middle'>Connect availabilities</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                setopenToggleMenu(false);
                handleUnLinkAppointments();
              }}
            >
              <img src={disconnect} className='mr-2' alt='' />
              <span className='align-middle'>Disconnect availabilities</span>
            </NavLink>
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink>
              <img src={confirm_appointment} className='mr-2' alt='' />
              <span className='align-middle'>Confirmed appointments</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink>
              <img src={set_confirm} className='mr-2' alt='' />
              <span className='align-middle' onClick={setOnConfirmedCaregiver}>
                Set on confirmed
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <img src={unset_confirm} className='mr-2' alt='' />
              <span
                className='align-middle'
                onClick={setOnNotConfirmedCaregiver}
              >
                Set on not confirmed
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink>
              <img src={leasing_contact} className='mr-2' alt='' />
              <span className='align-middle'>
                Request temporary leasing contract
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink>
              <img src={termination} className='mr-2' alt='' />
              <span className='align-middle'>Create termination agreement</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink>
              <img src={refresh} className='mr-2' alt='' />
              <span className='align-middle'>Refresh</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div className='calender-section custom-scrollbar'>
        <SelectableGroup
          allowClickWithoutSelected
          className='custom-row-selector'
          clickClassName='tick'
          resetOnStart={true}
          duringSelection={(data: any) => console.log(data, 'duringSelection')}
          onSelectionFinish={onSelectFinish}
          onSelectionClear={onSelectionClear}
          ignoreList={['.name-col', '.h-col', '.s-col', '.u-col', '.v-col']}
        >
          <div>
            <Table hover bordered className='mb-0 appointment-table'>
              <thead className='thead-bg'>
                <tr>
                  <th className='thead-sticky name-col custom-appointment-col  head-name-col'>
                    <div className='all-star-wrap'>
                      <div className='position-relative one-line-text'>
                        Caregiver
                        <Button
                          onClick={() => handleToggleMenuItem()}
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
                        U
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
                      index: number,
                    ) => {
                      const todaysDate = moment(today).format(
                        appointmentDateFormat,
                      );
                      return (
                        <th
                          className={`thead-sticky calender-col custom-appointment-col text-center ${
                            date === todaysDate
                              ? 'today'
                              : isWeekend
                              ? 'weekend'
                              : ''
                          }`}
                          key={index}
                        >
                          <div className='custom-appointment-calendar-date'>
                            {' '}
                            {date}
                          </div>
                          <div className='custom-appointment-calendar-day'>
                            {day}
                          </div>
                        </th>
                      );
                    },
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className={'table-loader'} colSpan={40}>
                      <Loader />
                    </td>
                  </tr>
                ) : careGiversList && careGiversList.length ? (
                  careGiversList.map((list: any, index: number) => {
                    return list.availabilityData && list.availabilityData.length
                      ? list.availabilityData.map((item: any, row: number) => (
                          <tr key={`${list.id}-${index}-${row}`}>
                            <th className='name-col custom-appointment-col thead-sticky'>
                              <div className='all-star-wrap'>
                                <div
                                  className='text-capitalize view-more-link one-line-text'
                                  onClick={() =>
                                    history.push(
                                      AppRoutes.CARE_GIVER_VIEW.replace(
                                        ':id',
                                        list.id,
                                      ),
                                    )
                                  }
                                  style={{
                                    backgroundColor: !list.isActive
                                      ? deactivatedListColor
                                      : list.caregiver &&
                                        list.caregiver.attributes
                                      ? list.caregiver.attributes.includes(
                                          CaregiverTIMyoCYAttrId,
                                        )
                                        ? leasingListColor
                                        : list.caregiver.attributes.includes(
                                            'Plycoco',
                                          )
                                        ? selfEmployesListColor
                                        : ''
                                      : '',
                                  }}
                                >
                                  {row === 0
                                    ? `${list.lastName ? list.lastName : ''} ${
                                        list.firstName ? list.firstName : ''
                                      }`
                                    : ''}
                                </div>
                                <div className='h-col custom-appointment-col text-center'></div>
                                <div
                                  className='s-col custom-appointment-col text-center'
                                  onClick={() =>
                                    onhandleSecondStar(list, index, 'caregiver')
                                  }
                                >
                                  {starMark ? (
                                    <i className='fa fa-star theme-text' />
                                  ) : (
                                    <i className='fa fa-star-o' />
                                  )}
                                </div>
                                <div
                                  className='u-col custom-appointment-col text-center'
                                  onClick={() =>
                                    onhandleSecondStar(list, index, 'caregiver')
                                  }
                                >
                                  {starMark ? (
                                    <i className='fa fa-star theme-text' />
                                  ) : (
                                    <i className='fa fa-star-o' />
                                  )}
                                </div>
                                <div
                                  className='v-col custom-appointment-col text-center'
                                  onClick={e =>
                                    onAddingRow(e, 'caregiver', index)
                                  }
                                >
                                  <i className='fa fa-arrow-down' />
                                </div>
                              </div>
                            </th>

                            {daysArr.map((key: any, i: number) => {
                              return (
                                <Cell
                                  key={`${key}-${i}`}
                                  day={key}
                                  list={list}
                                  item={
                                    item.filter((avabilityData: any) => {
                                      return (
                                        moment(key.isoString).format(
                                          'DD.MM.YYYY',
                                        ) ===
                                        moment(avabilityData.date).format(
                                          'DD.MM.YYYY',
                                        )
                                      );
                                    })[0]
                                  }
                                />
                              );
                            })}
                          </tr>
                        ))
                      : null;
                  })
                ) : (
                  <tr className={'text-center no-hover-row'}>
                    <td colSpan={40} className={'pt-5 pb-5'}>
                      <div className='no-data-section'>
                        <div className='no-data-icon'>
                          <i className='icon-ban' />
                        </div>
                        <h4 className='mb-1'>
                          Currently there are no CareGiver added.{' '}
                        </h4>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </SelectableGroup>
      </div>
      <BulkEmailCareGiverModal
        openModal={openCareGiverBulkEmail}
        qualification={props.qualification}
        handleClose={() => handleCareGiverBulkEmail()}
        gte={props.gte}
        lte={props.lte}
      />
      <DetaillistCaregiverPopup
        show={showList ? true : false}
        handleClose={() => setShowList(false)}
        selectedCells={selectedCells}
      />
      <UnlinkAppointment
        show={showUnlinkModal}
        handleClose={() => setshowUnlinkModal(false)}
        handleUnlinkData={handleUnlinkData}
      />
    </>
  );
};

export default CaregiverListView;