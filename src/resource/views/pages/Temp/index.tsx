import React, { useEffect, useState } from "react";
import { CaregiverList } from "./CaregiverList";
import { CareInstitutionList } from "./CareInstitutionList";
import "./../Appointment/index.scss";
import { CaregiverForm } from "./CaregiverForm";
import { Row, Col, Button } from "reactstrap";
import AppointmentNav from "./AppointmentNav";
import CareinstitutionForm from "./CareInstitutionForm";
import { useQuery } from "@apollo/react-hooks";
import { IQualifications } from "../../../../interfaces";
import { GET_QUALIFICATION_ATTRIBUTE } from "../../../../graphql/queries";
import { map } from "lodash";
import { languageTranslation } from "../../../../helpers";

export const TempPage = () => {
  const [selectedCaregiverData, setSelectedCaregiver] = useState<any>([]);
  const [selectedCareinstitutionData, setSelectedCareinstitution] = useState<
    any
  >([]);
  const [updatedCareinstItem, setUpdatedCareinstItem] = useState<any>([]);
  const [updatedCaregiverItem, setUpdatedCaregiverItem] = useState<any>([]);
  const [filterObject, setFilterObject] = useState<any>({
    showAppointments: "showWithAppointments",
  });
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

  /**
   *
   * @param data
   */
  const handleupdateData = (data:any,name:string) => {
  if(name === "careinstitution"){
    setUpdatedCareinstItem(data)
  }else{
    setUpdatedCaregiverItem(data)
  }
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
                <CaregiverList
                  caregiverSelected={caregiverSelected}
                  filters={filterObject}
                  updatedCaregiverItem={updatedCaregiverItem}
                />
                <CareInstitutionList
                  careinstitutionSelected={careinstitutionSelected}
                  filters={filterObject}
                  setCareInstDeptList={setCareInstDeptList}
                  qualificationList={qualifications}
                  updatedCareinstItem={updatedCareinstItem}
                  selected={selectedCareinstitutionData}
                />
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
                    handleupdateData={handleupdateData}
                  />
                </Col>
                <Col lg={"6"} className='pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0'>
                  <CareinstitutionForm
                    selected={selectedCareinstitutionData}
                    qualificationList={qualifications}
                    departmentList={careInstDeptList}
                    setSelectedCareinstitution={setSelectedCareinstitution}
                    handleupdateData={
                      handleupdateData
                    }
                  />
                </Col>
                <Col lg={"12"}>
                  <div className='d-flex align-items-center justify-content-center'>
                    <Button
                      className='btn-common  mt-0 mb-2 mx-2'
                      color='primary'>
                      <i className='fa fa-save mr-2' />
                      {languageTranslation("SAVE_BOTH")}
                    </Button>
                    <Button
                      className='btn-common mt-0 mb-2 mx-2'
                      color='secondary'>
                      <i className='fa fa-link mr-2' />

                      {languageTranslation("LINK")}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
