import React, { useState } from "react";
import { CaregiverList } from "./CaregiverList";
import { CareInstitutionList } from "./CareInstitutionList";
import "./../Appointment/index.scss";
import { CaregiverForm } from "./CaregiverForm";
import { Row, Col } from "reactstrap";
import CareinstitutionForm from "./CareInstitutionForm";

export const TempPage = () => {
  const [selectedCaregiverData, setSelectedCaregiver] = useState<any>({});
  const [selectedCareinstitutionData, setSelectedCareinstitution] = useState<
    any
  >({});

  /**
   *
   * @param caregiverData
   */
  const caregiverSelected = (caregiverData: any) => {
    setSelectedCaregiver(caregiverData);
  };

  /**
   *
   * @param careInstData
   */
  const careinstitutionSelected = (careInstData: any) => {
    setSelectedCareinstitution(careInstData);
  };
  console.log(selectedCaregiverData);
  return (
    <div className="common-detail-page">
      <div className="common-detail-section">
        <div className="common-content flex-grow-1">
          <div className="appointment-page-row">
            <div
              className="appointment-page-list-section"
              id="appointment_list_section"
            >
              <div className="calender-section">
                <div className="custom-appointment-calendar overflow-hidden">
                  <CaregiverList caregiverSelected={caregiverSelected} />
                </div>
                <div className="custom-appointment-calendar overflow-hidden">
                  <CareInstitutionList
                    careinstitutionSelected={careinstitutionSelected}
                  />
                </div>
              </div>
            </div>
            <div
              className="appointment-page-form-section"
              id="appointment_form_section"
            >
              <Row className="row-appointment">
                <Col lg={"6"} className="pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0">
                  <CaregiverForm selected={selectedCaregiverData} />
                </Col>
                <Col lg={"6"} className="pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0">
                  <CareinstitutionForm selected={selectedCareinstitutionData} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
