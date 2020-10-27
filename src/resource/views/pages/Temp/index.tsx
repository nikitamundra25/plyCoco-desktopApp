import React from "react";
import { CaregiverList } from "./CaregiverList";
import { CareInstitutionList } from "./CareInstitutionList";
import "./../Appointment/index.scss";

export const TempPage = () => {
  return (
    <div className='common-detail-page'>
      <div className='common-detail-section'>
        <div className='common-content flex-grow-1'>
          <div className='appointment-page-row'>
            <div
              className='appointment-page-list-section'
              id='appointment_list_section'>
              <div className='calender-section'>
                <div className='custom-appointment-calendar overflow-hidden'>
                  <CaregiverList />
                </div>
                <div className='custom-appointment-calendar overflow-hidden'>
                  <CareInstitutionList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
