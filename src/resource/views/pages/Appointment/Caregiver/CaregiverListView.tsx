import React, { FunctionComponent, useState } from 'react';

import '../index.scss';
import {
  IAppointmentCareGiverList,
  IDaysArray
} from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';
import '../index.scss';

const CaregiverListView: FunctionComponent<IAppointmentCareGiverList> = (
  props: IAppointmentCareGiverList
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
      handleSelectedUser(list, name);
    } else {
      setstarMarkIndex(-1);
    }
  };
  const onhandleSecondStar = (list: object, index: number, name: string) => {
    if (!starMark) {
      if (starMarkIndex === index) {
        setstarMark(!starMark);
        handleSecondStar(list, index, name);
      }
    } else {
      setstarMark(!starMark);
      handleReset(name);
    }
  };
  const { daysArr = [] } = daysData ? daysData : {};
  return (
    <>
      <div className='calender-section custom-scrollbar'>
        <div className='custom-appointment-calendar'>
          <div className='custom-appointment-calendar-head'>
            <div className='custom-appointment-row '>
              <div className='custom-appointment-col name-col'>Caregiver</div>
              <div className='custom-appointment-col h-col'>H</div>
              <div className='custom-appointment-col s-col text-center'>S</div>
              <div className='custom-appointment-col u-col text-center'>U</div>
              <div className='custom-appointment-col v-col text-center'>V</div>
              {/* array for showing day */}
              {daysArr.map(
                (
                  { date, day, isoString, isWeekend }: IDaysArray,
                  index: number
                ) => {
                  return (
                    <div
                      className='custom-appointment-col calender-col text-center'
                      key={index}
                    >
                      <div className='custom-appointment-calendar-date'>
                        {' '}
                        {date}
                      </div>
                      <div className='custom-appointment-calendar-day'>
                        {day}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* array for showing list */}
          <div className='custom-appointment-calendar-body'>
            {loading ? (
              <Loader />
            ) : careGiversList && careGiversList.length ? (
              careGiversList.map((list: any, index: number) => {
                return (
                  <div className='custom-appointment-row' key={index}>
                    <div
                      className='custom-appointment-col name-col appointment-color1 text-capitalize view-more-link'
                      onClick={() => handleSelectedUser(list, 'caregiver')}
                    >
                      {`${list.firstName ? list.firstName : ''} ${
                        list.lastName ? list.lastName : ''
                      }`}
                    </div>
                    <div className='custom-appointment-col h-col appointment-color2'></div>
                    <div
                      className='custom-appointment-col s-col text-center'
                      onClick={() => handleFirstStar(list, index, 'caregiver')}
                    >
                      {starMarkIndex === index || starMark ? (
                        <i className='fa fa-star-o icon-d' />
                      ) : (
                        <i className='fa fa-star-o' />
                      )}
                    </div>
                    <div
                      className='custom-appointment-col u-col text-center'
                      onClick={() =>
                        onhandleSecondStar(list, index, 'caregiver')
                      }
                    >
                      {starMark ? (
                        <i className='fa fa-star-o icon-d' />
                      ) : (
                        <i className='fa fa-star-o' />
                      )}
                    </div>
                    <div
                      className='custom-appointment-col v-col text-center'
                      onClick={e => onAddingRow(e, 'caregiver', index)}
                    >
                      <i className='fa fa-arrow-down' />
                    </div>
                    {daysArr.map((key: any, i: number) => {
                      return (
                        <div
                          className='custom-appointment-col calender-col text-center'
                          key={i}
                        ></div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <div className='no-data-section pt-5 pb-5 bg-white text-center'>
                <div className='no-data-icon'>
                  <i className='icon-ban' />
                </div>
                <h4 className='mb-1'>
                  Currently there are no CareGiver added.{' '}
                </h4>
              </div>
            )}
            {/* end array here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaregiverListView;
