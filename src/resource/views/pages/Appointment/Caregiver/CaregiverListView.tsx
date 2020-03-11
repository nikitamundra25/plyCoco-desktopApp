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
import '../index.scss';

const CaregiverListView: FunctionComponent<IAppointmentCareGiverList & any> = (
  props: IAppointmentCareGiverList & any,
) => {
  const {
    daysData,
    careGiversList,
    loading,
    onAddingRow,
    handleSelectedUser,
    handleSelection,
    handleSecondStar,
    handleReset,
    onReserve,
    onDeleteEntries,
    onCaregiverQualificationFilter,
  } = props;

  const [starMark, setstarMark] = useState<boolean>(false);
  const [openToggleMenu, setopenToggleMenu] = useState<boolean>(false);

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
    console.log('VVVVVVVVVVVVVVV');

    setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
  };

  const { daysArr = [] } = daysData ? daysData : {};
  // select multiple
  const [selectedDays, setSelectedDays] = useState<any[]>([]);

  const onSelectFinish = (selectedCells: any[]) => {
    const selected: any = [];
    let list: any = [];
    if (selectedCells.length) {
      for (let i = 0; i < selectedCells.length; i++) {
        const { props: cellProps } = selectedCells[i];
        console.log(selectedCells, 'cellProps');
        const { item, list: caregiverData } = cellProps;
        selected.push({
          dateString: cellProps.day ? cellProps.day.dateString : '',
          item,
          list: caregiverData,
        });
        if (selectedCells[0].props.list) {
          list = selectedCells[0].props.list;
        }
        setSelectedDays(selected);
      }
      let selctedAvailability: any = {};
      let selectedRows: any[] = [];
      // if (
      //   list &&
      //   list.caregiver_avabilities &&
      //   list.caregiver_avabilities.length
      // ) {
      if (selected && selected.length) {
        for (let index = 0; index < selected.length; index++) {
          const { item, list, dateString } = selected[index];
          selctedAvailability = item;
          selectedRows.push({
            id: list.id,
            qualificationIds: list.qualificationId,
            item,
            dateString,
          });
        }
      }
      // }
      console.log(selectedRows, 'selectedRows');
      handleSelection(selectedRows);
      handleSelectedUser(list, selected, 'caregiver', selctedAvailability);
    }
  };
  const onSelectionClear = () => {
    setSelectedDays([]);
  };
  const [showList, setShowList] = useState<boolean>(false);

  return (
    <>
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
            <NavLink onClick={onReserve}>
              <img src={reserve} className='mr-2' alt='' />
              <span className='align-middle'>Reserve</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={onDeleteEntries}>
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
          <NavItem onClick={onCaregiverQualificationFilter}>
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
            <NavLink>
              <img src={connect} className='mr-2' alt='' />
              <span className='align-middle'>Connect availabilities</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink>
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
              <span className='align-middle'>Set on confirmed</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <img src={unset_confirm} className='mr-2' alt='' />
              <span className='align-middle'>Set on not confirmed</span>
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
      <SelectableGroup
        allowClickWithoutSelected
        className='custom-row-selector'
        clickClassName='tick'
        resetOnStart={true}
        onSelectionFinish={onSelectFinish}
        onSelectionClear={onSelectionClear}
        ignoreList={['.name-col', '.h-col', '.s-col', '.u-col', '.v-col']}
      >
        <div>
          <div className='calender-section custom-scrollbar'>
            <Table hover bordered className='mb-0 appointment-table'>
              <thead className='thead-bg'>
                <tr>
                  <th className='thead-sticky name-col custom-appointment-col  '>
                    <div className='position-relative'>
                      Caregiver
                      <Button
                        onClick={() => handleToggleMenuItem()}
                        className='btn-more d-flex align-items-center justify-content-center'
                      >
                        <i className='icon-options-vertical' />
                      </Button>
                      {/* <UncontrolledDropdown className='custom-dropdown options-dropdown'>
                      <DropdownToggle
                        className={"text-capitalize btn-more"}
                        size="sm"
                      >
                        <i className="icon-options-vertical" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <span>New appointment</span>
                        </DropdownItem>
                        <DropdownItem>
                          <span>Reserve</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Delete free and reserved calender entries</span>
                        </DropdownItem>{" "}
                        <DropdownItem onClick={() => setShowList(true)}>
                          <span>Detailed List</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Filter by qualifications of caregiver</span>
                        </DropdownItem>{" "}
                        <DropdownItem
                          onClick={() => handleCareGiverBulkEmail()}
                        >
                          <span>Offer all available calendar entries</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Connect availabilities</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Disconnect availabilities</span>
                        </DropdownItem>
                        <DropdownItem>
                          <span>Confirmed appointments</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Set on confirmed</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Set on not confirmed</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Request temporary leasing contract</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Create termination agreement</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Refresh</span>
                        </DropdownItem>{" "}
                      </DropdownMenu>
                    </UncontrolledDropdown> */}
                    </div>
                  </th>
                  <th className='thead-sticky h-col custom-appointment-col text-center'>
                    H
                  </th>
                  <th className='thead-sticky s-col custom-appointment-col text-center'>
                    S
                  </th>
                  <th className='thead-sticky u-col custom-appointment-col text-center'>
                    U
                  </th>
                  <th className='thead-sticky v-col custom-appointment-col text-center'>
                    V
                  </th>
                  {/* array for showing day */}
                  {daysArr.map(
                    (
                      { date, day, isoString, isWeekend }: IDaysArray,
                      index: number,
                    ) => {
                      return (
                        <th
                          className='thead-sticky calender-col custom-appointment-col text-center'
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
                              <div
                                className='text-capitalize view-more-link one-line-text'
                                // onClick={() =>
                                //   handleSelectedUser(list, null, 'caregiver')
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
                                onhandleSecondStar(list, index, 'caregiver')
                              }
                            >
                              {starMark ? (
                                <i className='fa fa-star theme-text' />
                              ) : (
                                <i className='fa fa-star-o' />
                              )}
                            </td>
                            <td
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
                            </td>
                            <td
                              className='v-col custom-appointment-col text-center'
                              onClick={e => onAddingRow(e, 'caregiver', index)}
                            >
                              <i className='fa fa-arrow-down' />
                            </td>
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
                          Currently there are no CareGiver added.{' '}
                        </h4>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </SelectableGroup>
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
      />
    </>
  );
};

export default CaregiverListView;
