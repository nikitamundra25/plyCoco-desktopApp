import React, { FunctionComponent, useState } from 'react';
import { Table, Button, Nav, NavItem, NavLink } from 'reactstrap';
import '../index.scss';
import {
  IAppointmentCareInstitutionList,
  IDaysArray
} from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';
import { SelectableGroup, SelectAll, DeselectAll } from 'react-selectable-fast';
import CellCareinstitution from './Cell';
import moment from 'moment';
import DetaillistCareinstitutionPopup from '../DetailedList/DetailListCareinstitution';
import {
  dbAcceptableFormat,
  appointmentDateFormat
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
import UnlinkAppointment from '../unlinkModal';

let toastId: any = null;
const CarinstituionListView: FunctionComponent<IAppointmentCareInstitutionList &
  any> = (props: IAppointmentCareInstitutionList & any) => {
  const {
    daysData,
    careInstitutionList,
    loading,
    onAddingRow,
    qualificationList,
    handleSelectedUser,
    handleFirstStarCanstitution,
    careInstituionDeptData,
    starCanstitution,
    deptLoading,
    onhandleSecondStarCanstitution,
    secondStarCanstitution,
    selectedCareGiver,
    selectedCareinstitution,
    activeDateCaregiver,
    activeDateCareinstitution,
    handleSelection,
    selectedCellsCareinstitution,
    selectedCells,
    onLinkAppointment
  } = props;
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);

  // const handleFirstStar = (list: object, index: number, name: string) => {
  //   if (starMarkIndex !== index) {
  //     setstarMarkIndex(index);
  //     handleSelectedUser(list, null, name);
  //   } else {
  //     setstarMarkIndex(-1);
  //   }
  // };

  // const onhandleSecondStar = (list: object, index: number, name: string) => {
  //   if (!starMark) {
  //     if (starMarkIndex === index) {
  //       setstarMark(!starMark);
  //       handleSecondStar(list, index, name);
  //     }
  //   } else {
  //     setstarMark(!starMark);
  //     handleReset(name);
  //   }
  // };

  //use state for toggel menu item
  const [toggleMenuButton, settoggleMenuButton] = useState<boolean>(false);

  const handleRightMenuToggle = () => {
    // alert("zdfsadfsa");
    settoggleMenuButton(!toggleMenuButton);
  };
  const { daysArr = [] } = daysData ? daysData : {};

  const [onEnterMenu, setonEnterMenu] = useState(false);

  // window.addEventListener('click', function(e) {
  //   const rightMenuOption: any = document.getElementById('clickbox');
  //   console.log('onEnterMenu', onEnterMenu);

  //   if (onEnterMenu && toggleMenuButton) {
  //     if (rightMenuOption.contains(e.target)) {
  //       // Clicked in box
  //       console.log('inside');
  //     } else{
  //       setonEnterMenu(false);
  //       handleRightMenuToggle();
  //       console.log('outside');
  //     }
  //   }
  // });

  // select multiple
  const [selectedDays, setSelectedDays] = useState<any[]>([]);
  const onSelectFinish = (selectedCells: any[]) => {
    const selected: any = [];
    let list: any = [];
    for (let i = 0; i < selectedCells.length; i++) {
      const { props: cellProps } = selectedCells[i];
      const { item, list: careinstitutionData } = cellProps;
      selected.push({
        dateString: cellProps.day ? cellProps.day.dateString : '',
        item,
        list: careinstitutionData
      });

      if (selectedCells[0].props.list) {
        list = selectedCells[0].props.list;
      }
      setSelectedDays(selected);
    }
    let selctedAvailability: any;
    let selectedRows: any[] = [];
    if (
      list &&
      list.careinstitution_requirements &&
      list.careinstitution_requirements.length
    ) {
      if (selected && selected.length) {
        for (let index = 0; index < selected.length; index++) {
          const { dateString, item, list } = selected[index];
          // let temp = item.filter(
          //   (avabilityData: any, index: number) =>
          //     moment(avabilityData.date).format('DD.MM.YYYY') ===
          //     moment(dateString).format('DD.MM.YYYY')
          // );

          selctedAvailability = item;
          selectedRows.push({
            id: list.id,
            qualificationIds: list.qualificationId,
            item,
            dateString
          });
        }
      }

      // selctedAvailability = list.careinstitution_requirements.filter(
      //   (avabilityData: any, index: number) => {
      //     return (
      //       moment(selected[0].isoString).format(dbAcceptableFormat) ===
      //         moment(avabilityData.date).format(dbAcceptableFormat) &&
      //       (avabilityData.f === avabilityData.f ||
      //         avabilityData.s === avabilityData.s ||
      //         avabilityData.n === avabilityData.n)
      //     );
      //   }
      // );
    }

    handleSelection(selectedRows, 'careinstitution');
    handleSelectedUser(
      list,
      selected,
      'careinstitution',
      selctedAvailability ? selctedAvailability : {}
    );
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
              if (name === 'link') {
                selectedData.push({
                  avabilityId: parseInt(key.item.id),
                  requirementId: parseInt(element.item.id),
                  date: moment(element.dateString).format(dbAcceptableFormat),
                  status: 'appointment'
                });
              } else {
                selectedData.push({
                  avabilityId: parseInt(key.item.id),
                  requirementId: parseInt(element.item.id),
                  status: 'unlinked'
                });
              }
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
  const handleUnLinkAppointments = (name: string) => {
    setshowUnlinkModal(!showUnlinkModal);
  };

  const handleUnlinkData = (likedBy: string, check: boolean) => {
    let appointmentId: any = [];
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.map((key: any, index: number) => {
        return appointmentId.push({
          appointmentId: parseInt('1' /* key.appointmentId */),
          likedBy: likedBy,
          isMark: check
        });
      });
      // console.log('appointmentId', appointmentId);
      onLinkAppointment(appointmentId, 'unlink');
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
  };

  // open care institution bulk Email section
  const handleCareInstitutionBulkEmail = () => {
    setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
  };

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
              <NavLink>
                <img src={new_appointment} className='mr-2' alt='' />
                <span>New appointment</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={delete_appointment} className='mr-2' alt='' />
                <span>Delete free appointments</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink>
                <img src={all_list} className='mr-2' alt='' />
                <span>Select all appointments of the caregiver</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink onClick={() => setShowList(true)}>
                <img src={detail_list} className='mr-2' alt='' />
                <span>Detailed List</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink
                disabled={
                  selectedCellsCareinstitution
                    ? selectedCellsCareinstitution.length === 0
                    : true
                }
                onClick={() => {
                  handleCareGiverBulkEmail('division', true);
                  handleCareInstitutionBulkEmail();
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
                  selectedCellsCareinstitution
                    ? selectedCellsCareinstitution.length === 0
                    : true
                }
                onClick={() => handleCareGiverBulkEmail('day', true)}
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
                  selectedCellsCareinstitution
                    ? selectedCellsCareinstitution.length === 0
                    : true
                }
                onClick={() => handleCareGiverBulkEmail('division', false)}
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
                  selectedCellsCareinstitution
                    ? selectedCellsCareinstitution.length === 0
                    : true
                }
                onClick={() => handleCareGiverBulkEmail('day', false)}
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
                <span>Set on offered</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={unset_confirm} className='mr-2' alt='' />
                <span>Reset offered</span>
              </NavLink>
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink onClick={() => handleLinkAppointments('link')}>
                <img src={connect} className='mr-2' alt='' />
                <span>Link appointments</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink onClick={() => handleUnLinkAppointments('unlink')}>
                <img src={disconnect} className='mr-2' alt='' />
                <span>Unlink appointments</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink>
                <img src={offer_sent} className='mr-2' alt='' />
                <span>Offer caregivers (ordered by day)</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={offer_sent} className='mr-2' alt='' />
                <span>Offer appointments (ordered by department)</span>
              </NavLink>
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink>
                <img src={confirm_appointment} className='mr-2' alt='' />
                <span>Confirm appointments (ordered by day) </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={confirm_appointment} className='mr-2' alt='' />
                <span>Confirm appointments (ordered by department)</span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={set_confirm} className='mr-2' alt='' />
                <span>Set on confirmed </span>
              </NavLink>{' '}
            </NavItem>
            <NavItem>
              <NavLink>
                <img src={unset_confirm} className='mr-2' alt='' />
                <span>Reset confirmed</span>
              </NavLink>
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink>
                <img src={invoice} className='mr-2' alt='' />
                <span>Create prepayment invoice</span>
              </NavLink>
            </NavItem>
            <NavItem className='bordernav' />
            <NavItem>
              <NavLink>
                <img src={refresh} className='mr-2' alt='' />
                <span>Refresh </span>
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
      <SelectableGroup
        allowClickWithoutSelected
        className='custom-row-selector'
        clickClassName='tick'
        resetOnStart={true}
        onSelectionFinish={onSelectFinish}
        onSelectionClear={onSelectionClear}
        ignoreList={['.name-col', '.h-col', '.s-col', '.u-col', '.v-col']}
      >
        <div className='calender-section custom-scrollbar  mt-3'>
          <Table hover bordered className='mb-0 appointment-table'>
            <thead className='thead-bg'>
              <tr>
                <th className='thead-sticky name-col custom-appointment-col '>
                  <div className='position-relative'>
                    CareInstitution
                    <Button
                      onClick={() => handleRightMenuToggle()}
                      className='btn-more d-flex align-items-center justify-content-center'
                    >
                      <i className='icon-options-vertical' />
                    </Button>
                  </div>
                </th>
                <th className='thead-sticky h-col custom-appointment-col text-center'>
                  H
                </th>
                <th className='thead-sticky s-col custom-appointment-col text-center'>
                  S
                </th>
                <th className='thead-sticky u-col custom-appointment-col text-center'>
                  A
                </th>
                <th className='thead-sticky v-col custom-appointment-col text-center'>
                  V
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
                        className={`'thead-sticky calender-col custom-appointment-col text-center' ${
                          date === todaysDate
                            ? 'today'
                            : '' || isWeekend
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
              {loading ? (
                <tr>
                  <td className={'table-loader'} colSpan={40}>
                    <Loader />
                  </td>
                </tr>
              ) : careInstituionDeptData &&
                !careInstituionDeptData.length &&
                !starCanstitution.isStar ? (
                careInstitutionList && careInstitutionList.length ? (
                  careInstitutionList.map((list: any, index: number) => {
                    return list.availabilityData && list.availabilityData.length
                      ? list.availabilityData.map((item: any, row: number) => (
                          <tr key={index}>
                            <th className='thead-sticky name-col custom-appointment-col'>
                              <div
                                className='text-capitalize view-more-link one-line-text'
                                // onClick={() =>
                                //   handleSelectedUser(
                                //     list,
                                //     null,
                                //     'careinstitution'
                                //   )
                                // }
                              >
                                {row === 0
                                  ? `${list.lastName ? list.lastName : ''} ${
                                      list.firstName ? list.firstName : ''
                                    }`
                                  : ''}
                              </div>
                            </th>
                            <td className='h-col custom-appointment-col text-center'></td>
                            <td
                              className='s-col custom-appointment-col text-center'
                              onClick={() =>
                                handleFirstStarCanstitution(list, index)
                              }
                            >
                              {starCanstitution.setIndex === index ||
                              starCanstitution.isStar ? (
                                <i className='fa fa-star theme-text' />
                              ) : (
                                <i className='fa fa-star-o' />
                              )}
                            </td>
                            <td
                              className='u-col custom-appointment-col text-center'
                              // onClick={() =>
                              //   onhandleSecondStar(list, index, 'careinstitution')
                              // }
                            >
                              {secondStarCanstitution ? (
                                <i className='fa fa-star theme-text' />
                              ) : (
                                <i className='fa fa-star-o' />
                              )}
                            </td>
                            <td
                              className='v-col custom-appointment-col text-center'
                              onClick={e =>
                                onAddingRow(e, 'careinstitution', index)
                              }
                            >
                              <i className='fa fa-arrow-down' />
                            </td>
                            {/* map */}
                            {daysArr.map((key: any, i: number) => {
                              return (
                                <CellCareinstitution
                                  key={`${key}-${i}`}
                                  day={key}
                                  list={list}
                                  item={
                                    item
                                      ? item.filter((avabilityData: any) => {
                                          return (
                                            moment(key.isoString).format(
                                              'DD.MM.YYYY'
                                            ) ===
                                            moment(avabilityData.date).format(
                                              'DD.MM.YYYY'
                                            )
                                          );
                                        })[0]
                                      : ''
                                  }
                                  handleSelectedAvailability
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
                          Currently there are no CareInstitution added.{' '}
                        </h4>
                      </div>
                    </td>
                  </tr>
                )
              ) : deptLoading ? (
                <tr>
                  <td className={'table-loader'} colSpan={40}>
                    <Loader />
                  </td>
                </tr>
              ) : careInstituionDeptData && careInstituionDeptData.length ? (
                careInstituionDeptData.map((dept: any, index: number) => {
                  if (!dept.locked) {
                    return (
                      <tr key={`${dept.id}-${index}`}>
                        <th className='name-col custom-appointment-col thead-sticky'>
                          <div
                            className='text-capitalize view-more-link one-line-text'
                            // onClick={() =>
                            //   handleSelectedUser(list, null, 'caregiver')
                            // }
                          >
                            {!dept.newRow ? (dept.name ? dept.name : '') : ''}
                          </div>
                        </th>
                        <td className='h-col custom-appointment-col text-center'></td>
                        <td
                          className='s-col custom-appointment-col text-center'
                          onClick={() => handleFirstStarCanstitution(null)}
                        >
                          {starCanstitution.setIndex === index ||
                          starCanstitution.isStar ? (
                            <i className='fa fa-star theme-text' />
                          ) : (
                            <i className='fa fa-star-o' />
                          )}
                        </td>
                        <td
                          className='u-col custom-appointment-col text-center'
                          onClick={() => onhandleSecondStarCanstitution(dept)}
                        >
                          {secondStarCanstitution ? (
                            <i className='fa fa-star theme-text' />
                          ) : (
                            <i className='fa fa-star-o' />
                          )}
                        </td>
                        <td
                          className='v-col custom-appointment-col text-center'
                          onClick={e => onAddingRow(e, 'caregiver', index)}
                        >
                          <i className='fa fa-arrow-down' />
                        </td>
                        {daysArr.map((key: any, i: number) => {
                          return (
                            <CellCareinstitution
                              key={`${key}-${i}`}
                              day={key}
                              item={
                                dept
                                  ? dept.filter((avabilityData: any) => {
                                      return (
                                        moment(key.isoString).format(
                                          'DD.MM.YYYY'
                                        ) ===
                                        moment(avabilityData.date).format(
                                          'DD.MM.YYYY'
                                        )
                                      );
                                    })[0]
                                  : ''
                              }
                              list={dept}
                              handleSelectedAvailability
                            />
                          );
                        })}
                      </tr>
                    );
                  }
                })
              ) : (
                <tr className={'text-center no-hover-row'}>
                  <td colSpan={40} className={'pt-5 pb-5'}>
                    <div className='no-data-section'>
                      <div className='no-data-icon'>
                        <i className='icon-ban' />
                      </div>
                      <h4 className='mb-1'>
                        {languageTranslation(
                          'NO_DEPARTMENT_CAREINSTITUTION_APPOINTMENT_LIST'
                        )}
                      </h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </SelectableGroup>
      <BulkEmailCareInstitutionModal
        openModal={openCareInstitutionBulkEmail}
        handleClose={() => handleCareInstitutionBulkEmail()}
        qualification={props.qualification}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={props.gte}
        lte={props.lte}
      />
      <BulkEmailCareGiverModal
        openModal={openCareGiverBulkEmail}
        qualification={props.qualification}
        handleClose={() => handleCareGiverBulkEmail('', false)}
        gte={props.gte}
        lte={props.lte}
        sortBy={sortBy}
        showButton={showButton}
      />
      <DetaillistCareinstitutionPopup
        show={showList ? true : false}
        handleClose={() => setShowList(false)}
        qualificationList={qualificationList}
        activeDateCaregiver={activeDateCaregiver}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
      />
      <UnlinkAppointment
        show={showUnlinkModal}
        handleClose={() => setshowUnlinkModal(false)}
        handleUnlinkData={handleUnlinkData}
      />
      />
    </>
  );
};

export default CarinstituionListView;
