import React, { FunctionComponent, useState } from 'react';
import {
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from 'reactstrap';
import '../index.scss';
import {
  IAppointmentCareGiverList,
  IDaysArray
} from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';
import '../index.scss';
import { SelectableGroup, SelectAll, DeselectAll } from 'react-selectable-fast';
import Cell from './Cell';
import moment from 'moment';
const CaregiverListView: FunctionComponent<IAppointmentCareGiverList> = (
  props: IAppointmentCareGiverList & any
) => {
  const {
    daysData,
    careGiversList,
    loading,
    onAddingRow,
    handleSelectedUser,
    handleSecondStar,
    handleReset
  } = props;

  const [starMark, setstarMark] = useState<boolean>(false);
  const [starMarkIndex, setstarMarkIndex] = useState<number>(-1);

  const handleFirstStar = (list: object, index: number, name: string) => {
    if (starMarkIndex !== index) {
      setstarMarkIndex(index);
      handleSelectedUser(list, null, name);
    } else {
      setstarMarkIndex(-1);
    }
  };
  const onhandleSecondStar = (list: object, index: number, name: string) => {
    if (!starMark) {
      setstarMark(!starMark);
      handleSecondStar(list, index, name);
    } else {
      setstarMark(!starMark);
      handleReset(name);
    }
  };
  const { daysArr = [] } = daysData ? daysData : {};
  // select multiple
  const [selectedDays, setSelectedDays] = useState<any[]>([]);
  const onSelectFinish = (selectedCells: any[]) => {
    const selected: any = [];
    let list: any = [];
    for (let i = 0; i < selectedCells.length; i++) {
      const { props: cellProps } = selectedCells[i];
      selected.push(cellProps.day);
      if (selectedCells[0].props.list) {
        list = selectedCells[0].props.list;
      }
      setSelectedDays(selected);
    }
    let selctedAvailability: any = [];
    if (
      list &&
      list.caregiver_avabilities &&
      list.caregiver_avabilities.length
    ) {
      if (selected && selected.length) {
        for (let index = 0; index < selected.length; index++) {
          const element = selected[index];
          const availability = list.caregiver_avabilities.filter(
            (avabilityData: any, index: number) => {
              return (
                moment(element.isoString).format('DD.MM.YYYY') ===
                  moment(avabilityData.date).format('DD.MM.YYYY') &&
                (avabilityData.f === 'available' ||
                  avabilityData.s === 'available' ||
                  avabilityData.n === 'available')
              );
            }
          );
          if (availability && availability.length) {
            selctedAvailability.push(availability[0]);
          } else {
          }
        }
      }
    }
    handleSelectedUser(
      list,
      selected,
      'caregiver',
      selctedAvailability && selctedAvailability.length
        ? selctedAvailability[0]
        : {}
    );
  };
  const onSelectionClear = () => {
    setSelectedDays([]);
  };
  return (
    <>
      <SelectableGroup
        allowClickWithoutSelected
        className='custom-row-selector'
        clickClassName='tick'
        resetOnStart={true}
        onSelectionFinish={onSelectFinish}
        onSelectionClear={onSelectionClear}
        ignoreList={['.name-col', '.h-col', '.s-col', '.u-col', '.v-col']}
      >
        <div className='calender-section custom-scrollbar'>
          <Table hover bordered className='mb-0 appointment-table'>
            <thead className='thead-bg'>
              <tr>
                <th className='thead-sticky name-col custom-appointment-col  '>
                  <div className='position-relative'>
                    Caregiver
                    <UncontrolledDropdown className='custom-dropdown options-dropdown'>
                      <DropdownToggle
                        className={'text-capitalize btn-more'}
                        size='sm'
                      >
                        <i className='icon-options-vertical' />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <span>New appointment</span>
                        </DropdownItem>
                        <DropdownItem>
                          <span>Reserve</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Delete free and reserved calender entries</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Detailed List</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Filter by qualifications of caregiver</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Offer all available calendar entries</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Connect availabilities</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Disconnect availabilities</span>
                        </DropdownItem>
                        <DropdownItem>
                          <span>Confirmed appointments</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Set on confirmed</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Set on not confirmed</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Request temporary leasing contract</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Create termination agreement</span>
                        </DropdownItem>{' '}
                        <DropdownItem>
                          <span>Refresh</span>
                        </DropdownItem>{' '}
                      </DropdownMenu>
                    </UncontrolledDropdown>
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
                    index: number
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
                  return (
                    <tr key={`${list.id}-${index}`}>
                      <th className='name-col custom-appointment-col thead-sticky'>
                        <div
                          className='text-capitalize view-more-link one-line-text'
                          onClick={() =>
                            handleSelectedUser(list, null, 'caregiver')
                          }
                        >
                          {!list.newRow
                            ? `${list.firstName ? list.firstName : ''} ${
                                list.lastName ? list.lastName : ''
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
                          <i className='fa fa-star-o icon-d' />
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
                          <i className='fa fa-star-o icon-d' />
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
                            handleSelectedAvailability
                          />
                        );
                      })}
                    </tr>
                  );
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
    </>
  );
};

export default CaregiverListView;
