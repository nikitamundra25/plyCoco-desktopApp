import React, { FunctionComponent } from 'react';

import '../index.scss';
import {
  IAppointmentCareInstitutionList,
  IDaysArray
} from '../../../../../interfaces';
import Loader from '../../../containers/Loader/Loader';

const CarinstituionListView: FunctionComponent<IAppointmentCareInstitutionList> = (
  props: IAppointmentCareInstitutionList
) => {
  const { daysData, careInstitutionList, loading } = props;
  const { daysArr = [] } = daysData ? daysData : {};
  return (
    <>
      <div className='calender-section custom-scrollbar mt-3'>
        <div className='custom-appointment-calendar'>
          <div className='custom-appointment-calendar-head'>
            <div className='custom-appointment-row '>
              <div className='custom-appointment-col name-col'>
                CareInstitution
              </div>
              <div className='custom-appointment-col h-col'>H</div>
              <div className='custom-appointment-col s-col text-center'>S</div>
              <div className='custom-appointment-col u-col text-center'>U</div>
              <div className='custom-appointment-col v-col text-center'>V</div>
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
          <div className='custom-appointment-calendar-body'>
            {loading ? (
              <Loader />
            ) : careInstitutionList && careInstitutionList.length ? (
              careInstitutionList.map((list: any, index: number) => {
                return (
                  <div className='custom-appointment-row' key={index}>
                    <div className='custom-appointment-col name-col appointment-color1 text-capitalize'>
                      {`${list.firstName} ${list.lastName}`}
                    </div>
                    <div className='custom-appointment-col h-col appointment-color2'></div>
                    <div className='custom-appointment-col s-col text-center'>
                      <i className='fa fa-star-o' />
                    </div>
                    <div className='custom-appointment-col u-col text-center'>
                      <i className='fa fa-star-o' />
                    </div>
                    <div className='custom-appointment-col v-col text-center'>
                      <i className='fa fa-arrow-down' />
                    </div>
                    {/* map */}
                    {daysArr.map((key: any, i: number) => {
                      return (
                        <div
                          className='custom-appointment-col calender-col text-center '
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
                  Currently there are no CareInstitution added.{' '}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarinstituionListView;
