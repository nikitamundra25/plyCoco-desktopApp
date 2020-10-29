import React, { useEffect, useState } from "react";
import { CaregiverList } from "./CaregiverList";
import { CareInstitutionList } from "./CareInstitutionList";
import "./../Appointment/index.scss";
import { CaregiverForm } from "./CaregiverForm";
import { Row, Col } from "reactstrap";
import AppointmentNav from "./AppointmentNav";
import CareinstitutionForm from "./CareInstitutionForm";
import { useQuery } from "@apollo/react-hooks";
import { IQualifications } from "../../../../interfaces";
import { GET_QUALIFICATION_ATTRIBUTE } from "../../../../graphql/queries";
import { map } from "lodash";

export const TempPage = () => {
  const [selectedCaregiverData, setSelectedCaregiver] = useState<any>([]);
  const [selectedCareinstitutionData, setSelectedCareinstitution] = useState<
    any
  >([]);
  const [filterObject, setFilterObject] = useState<any>({});
  const [qualifications, setQualifications] = useState<any[]>([]);
  const [careInstDeptList, setCareInstDeptList] = useState<any>({});

  // To fetch qualification attributes list
  const { data: qualificationData, loading } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTE
  );
  const setQualificationData = () => {
    if (qualificationData && qualificationData.getQualifications) {
      console.log(qualificationData.getQualifications);
      const list = map(qualificationData.getQualifications, (quali: any) => ({
        label: quali.name,
        value: quali.id,
      }));
      setQualifications(list);
    }
  };
  /**
   * handles the query data for qualification
   */
  useEffect(() => {
    if (!loading) {
      setQualificationData();
    }
  }, [loading]);
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

  return (
    <div className='common-detail-page'>
      <div className='common-detail-section'>
        <AppointmentNav
          filterUpdated={setFilterObject}
          filters={filterObject}
          qualifications={qualifications}
        />
        <div className='common-content flex-grow-1'>
          <div className='appointment-page-row'>
            <div
              className='appointment-page-list-section'
              id='appointment_list_section'>
              <div className='calender-section'>
                <div className='custom-appointment-calendar overflow-hidden'>
                  <CaregiverList
                    caregiverSelected={caregiverSelected}
                    filters={filterObject}
                  />
                </div>
                <div className='custom-appointment-calendar overflow-hidden'>
                  <CareInstitutionList
                    careinstitutionSelected={careinstitutionSelected}
                    filters={filterObject}
                    setCareInstDeptList={setCareInstDeptList}
                  />
                </div>
              </div>
            </div>
            <div
              className='appointment-page-form-section'
              id='appointment_form_section'>
              <Row className='row-appointment'>
                <Col lg={"6"} className='pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0'>
                  <CaregiverForm
                    selected={selectedCaregiverData}
                    setSelectedCaregiver={setSelectedCaregiver}
                  />
                </Col>
                <Col lg={"6"} className='pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0'>
                  <CareinstitutionForm selected={selectedCareinstitutionData} qualificationList={qualifications}
                  departmentList={careInstDeptList} setSelectedCareinstitution={setSelectedCareinstitution} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
