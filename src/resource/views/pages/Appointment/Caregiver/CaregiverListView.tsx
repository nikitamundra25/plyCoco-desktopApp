import React, { FunctionComponent, useState } from 'react';
import { Table, Nav, NavItem, NavLink, Button } from 'reactstrap';
import moment from 'moment';
import classnames from 'classnames';
import {
  IAppointmentCareGiverList,
  IDaysArray
} from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';
import { SelectableGroup } from 'react-selectable-fast';
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
  deactivatedListColor
} from '../../../../../config';
import { useHistory } from 'react-router';
import { dbAcceptableFormat } from '../../../../../config';
import { toast } from 'react-toastify';
import UnlinkAppointment from '../unlinkModal';
import '../index.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { languageTranslation } from '../../../../../helpers';
import BulkEmailCareInstitutionModal from '../BulkEmailCareInstitution';
import { Link } from 'react-router-dom';

let toastId: any = null;
const CaregiverListView: FunctionComponent<IAppointmentCareGiverList> = (
  props: IAppointmentCareGiverList
) => {
  let history = useHistory();
  const {
    daysData,
    careGiversList,
    loading,
    onAddingRow,
    selectedCells,
    handleSelection,
    handleSecondStar,
    handleReset,
    onReserve,
    onDeleteEntries,
    onCaregiverQualificationFilter,
    selectedCellsCareinstitution,
    onLinkAppointment,
    setOnConfirmedCaregiver,
    setOnNotConfirmedCaregiver,
    onNewAvailability,
    totalCaregiver,
    getNext,

    qualificationList
  } = props;

  const [starMark, setstarMark] = useState<boolean>(false);
  const [openToggleMenu, setopenToggleMenu] = useState<boolean>(false);
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
    false
  );

  // state for care institution bulk email
  const [
    openCareInstitutionBulkEmail,
    setopenCareInstitutionBulkEmail
  ] = useState<boolean>(false);

  // Open care giver bulk Email section
  const handleCareGiverBulkEmail = () => {
    if (openCareGiverBulkEmail === true) {
      setconfirmApp(false);
      setunlinkedBy('');
    }
    setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
  };

  const { daysArr = [] } = daysData ? daysData : {};
  // select multiple
  const [selectedDays, setSelectedDays] = useState<any[]>([]);

  const onSelectFinish = (selectedCellsData: any[]) => {
    let selectedRows: any[] = [];
    if (selectedCellsData && selectedCellsData.length) {
      selectedRows = selectedCellsData.map((selectedCell: any) => {
        const { props: cellProps } = selectedCell;
        const { item, list: caregiverData, day } = cellProps;
        const {
          id = '',
          firstName = '',
          lastName = '',
          email = '',
          caregiver = {},
          qualificationId = []
        } = caregiverData ? caregiverData : {};
        return {
          id,
          firstName,
          lastName,
          email,
          caregiver,
          item,
          qualificationIds: qualificationId,
          dateString: day ? day.dateString : ''
        };
      });

      handleSelection ? handleSelection(selectedRows, 'caregiver') : undefined;
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

  const [confirmApp, setconfirmApp] = useState<boolean>(false);
  //unLinked by
  const [unlinkedBy, setunlinkedBy] = useState('');
  //  UnLink appointmnets
  const handleUnLinkAppointments = () => {
    setshowUnlinkModal(!showUnlinkModal);
  };
  const [isFromUnlink, setisFromUnlink] = useState(false);
  const handleUnlinkData = (likedBy: string, check: boolean) => {
    setunlinkedBy(likedBy);
    let appointmentId: any = [];
    if (selectedCells && selectedCells.length) {
      selectedCells.map((key: any, index: number) => {
        if (key.item && key.item.appointments && key.item.appointments.length) {
          // let appointId: any = key.item.appointments.filter(
          //   (appointment: any) => {
          //     return (
          //       moment(key.dateString).format('DD.MM.YYYY') ===
          //       moment(appointment.date).format('DD.MM.YYYY')
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
        }
      });
      onLinkAppointment(appointmentId, 'unlink');
      if (likedBy !== 'employee') {
        setisFromUnlink(true);
        setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
        setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
      }
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error('Please select appointment/s.');
      }
    }
  };

  // open care institution bulk Email section
  const handleCareInstitutionBulkEmail = () => {
    setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
    if (openCareInstitutionBulkEmail) {
      setunlinkedBy('');
    }
  };

  const [showList, setShowList] = useState<boolean>(false);

  let disconnectAppCond: any;
  let connectAppCondition: any;
  let confirmAppCond: any;

  if (selectedCells && selectedCells.length) {
    disconnectAppCond = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.item && x.item.status !== 'linked';
      } else {
        return ['abc'];
      }
    });
  }
  if (selectedCells && selectedCells.length) {
    connectAppCondition = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.item && x.item.status !== 'default';
      } else {
        return ['abc'];
      }
    });
  }
  if (selectedCells && selectedCells.length) {
    confirmAppCond = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.item && x.item.status !== 'linked';
      } else {
        return ['abc'];
      }
    });
  }

  return (
    <div>
      <div
        className={classnames({
          'right-manu-close': true,
          'd-none': !openToggleMenu
        })}
        onClick={handleToggleMenuItem}
      ></div>
      <div
        className={classnames({
          'rightclick-menu top-open': true,
          'custom-scrollbar': true,
          'd-none': !openToggleMenu
        })}
      >
        <Nav vertical>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                onNewAvailability ? onNewAvailability() : undefined;
              }}
            >
              <img src={new_appointment} className='mr-2' alt='' />
              <span className='align-middle'>New appointment</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                onReserve ? onReserve() : undefined;
              }}
            >
              <img src={reserve} className='mr-2' alt='' />
              <span className='align-middle'>Reserve</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                onDeleteEntries ? onDeleteEntries('caregiver') : undefined;
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
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                setShowList(true);
              }}
            >
              <img src={detail_list} className='mr-2' alt='' />
              <span className='align-middle'>Detailed List</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem
            disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              setopenToggleMenu(false);
              onCaregiverQualificationFilter
                ? onCaregiverQualificationFilter()
                : undefined;
            }}
          >
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
            >
              <img src={filter} className='mr-2' alt='' />
              <span className='align-middle'>
                Filter by qualifications of caregiver
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                handleCareGiverBulkEmail();
              }}
            >
              <img src={offer_sent} className='mr-2' alt='' />
              <span className='align-middle'>
                Offer all available calendar entries
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (connectAppCondition && connectAppCondition.length !== 0)
                  : true
              }
              onClick={() => {
                setopenToggleMenu(false);
                handleLinkAppointments('link');
              }}
            >
              <img src={connect} className='mr-2' alt='' />
              <span className='align-middle'>Connect appointments</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (disconnectAppCond && disconnectAppCond.length !== 0)
                  : true
              }
              onClick={() => {
                setopenToggleMenu(false);
                handleUnLinkAppointments();
              }}
            >
              <img src={disconnect} className='mr-2' alt='' />
              <span className='align-middle'>Disconnect appointments</span>
            </NavLink>
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (disconnectAppCond && disconnectAppCond.length !== 0)
                  : true
              }
              onClick={() => {
                setOnConfirmedCaregiver();
                setconfirmApp(true);
                setopenToggleMenu(false);
                handleCareGiverBulkEmail();
                setOnConfirmedCaregiver();
              }}
            >
              <img src={confirm_appointment} className='mr-2' alt='' />
              <span className='align-middle'>Confirmed appointments</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (selectedCells[0].item &&
                      selectedCells[0].item.status !== 'linked')
                  : true
              }
            >
              <img src={set_confirm} className='mr-2' alt='' />
              <span
                className='align-middle'
                onClick={() => {
                  setopenToggleMenu(false);
                  setOnConfirmedCaregiver();
                }}
              >
                Set on confirmed
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (selectedCells[0].item &&
                      selectedCells[0].item.status !== 'confirmed')
                  : true
              }
            >
              <img src={unset_confirm} className='mr-2' alt='' />
              <span
                className='align-middle'
                onClick={() => {
                  setopenToggleMenu(false);
                  setOnNotConfirmedCaregiver();
                }}
              >
                Set on not confirmed
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
            >
              <img src={leasing_contact} className='mr-2' alt='' />
              <span className='align-middle'>
                Request temporary leasing contract
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
            >
              <img src={termination} className='mr-2' alt='' />
              <span className='align-middle'>Create termination agreement</span>
            </NavLink>{' '}
          </NavItem>
          {/*<NavItem className='bordernav' />
          <NavItem>
            <NavLink>
              <img src={refresh} className='mr-2' alt='' />
              <span className='align-middle'>Refresh</span>
            </NavLink>
          </NavItem> */}
        </Nav>
      </div>
      <div className='position-relative'>
        <InfiniteScroll
          loader={<div className='appointment-list-loader'>{''}</div>}
          hasMore={careGiversList && careGiversList.length !== totalCaregiver}
          dataLength={
            careGiversList && careGiversList.length ? careGiversList.length : 0
          }
          next={() => {
            getNext(careGiversList.length);
          }}
          // endMessage={<p />}
          scrollableTarget={'scrollableDiv-1'}
          // hasChildren
        >
          <div
            className='calender-section custom-scrollbar'
            id='scrollableDiv-1'
          >
            <SelectableGroup
              allowClickWithoutSelected
              className='custom-row-selector'
              clickClassName='tick'
              resetOnStart={true}
              // duringSelection={(data: any) =>
              //   console.log(data, 'duringSelection')
              // }
              onSelectionFinish={onSelectFinish}
              onSelectionClear={onSelectionClear}
              ignoreList={['.name-col', '.h-col', '.s-col', '.u-col', '.v-col']}
            >
              <Table
                hover
                bordered
                className='mb-0 appointment-table'
                id='appointment-table'
              >
                <thead className='thead-bg'>
                  <tr>
                    <th className='thead-sticky name-col custom-appointment-col '>
                      <div className='all-star-wrap'>
                        <div className='position-relative username-col align-self-center'>
                          <div className='calender-heading'>Caregiver</div>
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
                        index: number
                      ) => {
                        const todaysDate = moment(today).format(
                          appointmentDateFormat
                        );
                        return (
                          <th
                            className={`thead-sticky calender-col custom-appointment-col text-center p-0`}
                            key={index}
                          >
                            <div
                              className={`${
                                date === todaysDate
                                  ? 'today'
                                  : isWeekend
                                  ? 'weekend'
                                  : ''
                              }`}
                            >
                              <div className='custom-appointment-calendar-date'>
                                {' '}
                                {date}
                              </div>
                              <div className='custom-appointment-calendar-day'>
                                {day}
                              </div>
                            </div>
                          </th>
                        );
                      }
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
                      return list.availabilityData &&
                        list.availabilityData.length
                        ? list.availabilityData.map(
                            (item: any, row: number) => (
                              <tr key={`${list.id}-${index}-${row}`}>
                                <th className='name-col custom-appointment-col thead-sticky'>
                                  <div className='all-star-wrap'>
                                    <div
                                      className='text-capitalize one-line-text  username-col name-text'
                                      // onClick={() =>
                                      //   history.push(
                                      //     AppRoutes.CARE_GIVER_VIEW.replace(
                                      //       ':id',
                                      //       list.id
                                      //     )
                                      //   )
                                      // }

                                      style={{
                                        backgroundColor: !list.isActive
                                          ? deactivatedListColor
                                          : list.caregiver &&
                                            list.caregiver.attributes
                                          ? list.caregiver.attributes.includes(
                                              CaregiverTIMyoCYAttrId
                                            )
                                            ? leasingListColor
                                            : list.caregiver.attributes.includes(
                                                'Plycoco'
                                              )
                                            ? selfEmployesListColor
                                            : ''
                                          : ''
                                      }}
                                      title={[list.lastName, list.firstName]
                                        .filter(Boolean)
                                        .join(' ')}
                                      id={`caregiver-${list.id}`}
                                    >
                                      <Link
                                        to={AppRoutes.CARE_GIVER_VIEW.replace(
                                          ':id',
                                          list.id
                                        )}
                                        target='_blank'
                                        className='text-body'
                                      >
                                        {row === 0
                                          ? `${
                                              list.lastName ? list.lastName : ''
                                            } ${
                                              list.firstName
                                                ? list.firstName
                                                : ''
                                            }`
                                          : ''}
                                      </Link>
                                    </div>
                                    <div className='h-col custom-appointment-col text-center'></div>
                                    <div
                                      className='s-col custom-appointment-col text-center cursor-pointer'
                                      onClick={() =>
                                        onhandleSecondStar(
                                          list,
                                          index,
                                          'caregiver'
                                        )
                                      }
                                    >
                                      {starMark ? (
                                        <i className='fa fa-star theme-text' />
                                      ) : (
                                        <i className='fa fa-star-o' />
                                      )}
                                    </div>
                                    <div
                                      className='u-col custom-appointment-col text-center cursor-pointer'
                                      onClick={() =>
                                        onhandleSecondStar(
                                          list,
                                          index,
                                          'caregiver'
                                        )
                                      }
                                    >
                                      {starMark ? (
                                        <i className='fa fa-star theme-text' />
                                      ) : (
                                        <i className='fa fa-star-o' />
                                      )}
                                    </div>
                                    <div
                                      className='v-col custom-appointment-col text-center cursor-pointer'
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
                                      daysArr={key.isWeekend}
                                      day={key}
                                      list={list}
                                      item={
                                        item.filter((avabilityData: any) => {
                                          return (
                                            moment(key.isoString).format(
                                              'DD.MM.YYYY'
                                            ) ===
                                            moment(avabilityData.date).format(
                                              'DD.MM.YYYY'
                                            )
                                          );
                                        })[0]
                                      }
                                    />
                                  );
                                })}
                              </tr>
                            )
                          )
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
                            Currently there are no Caregiver added.{' '}
                          </h4>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </SelectableGroup>
          </div>
        </InfiniteScroll>
      </div>
      <BulkEmailCareGiverModal
        openModal={openCareGiverBulkEmail}
        qualification={props.qualification}
        handleClose={() => handleCareGiverBulkEmail()}
        gte={props.gte}
        lte={props.lte}
        selectedCells={selectedCells}
        confirmApp={confirmApp}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        unlinkedBy={unlinkedBy}
        isFromUnlink={isFromUnlink}
      />
      <BulkEmailCareInstitutionModal
        openModal={openCareInstitutionBulkEmail}
        handleClose={() => handleCareInstitutionBulkEmail()}
        qualification={props.qualification}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={props.gte}
        lte={props.lte}
        unlinkedBy={unlinkedBy}
        isFromUnlink={isFromUnlink}
      />
      <DetaillistCaregiverPopup
        show={showList ? true : false}
        handleClose={() => setShowList(false)}
        selectedCells={selectedCells}
        qualificationList={qualificationList}
      />
      <UnlinkAppointment
        show={showUnlinkModal}
        handleClose={() => setshowUnlinkModal(false)}
        handleUnlinkData={handleUnlinkData}
      />
    </div>
  );
};

export default CaregiverListView;
