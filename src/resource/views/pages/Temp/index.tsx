import React, { Suspense, useEffect, useState } from "react";
import { CaregiverList } from "./CaregiverList";
import { CareInstitutionList } from "./CareInstitutionList";
import "./../Appointment/index.scss";
import { CaregiverForm } from "./CaregiverForm";
import { Row, Col, Button } from "reactstrap";
import AppointmentNav from "./AppointmentNav";
import CareinstitutionForm from "./CareInstitutionForm";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { IQualifications, IStarInterface } from "../../../../interfaces";
import {
  AppointmentsQueries,
  GET_QUALIFICATION_ATTRIBUTE,
} from "../../../../graphql/queries";
import { map } from "lodash";
import { languageTranslation } from "../../../../helpers";
import { toast } from "react-toastify";
import ConnectAppointment from "./ConnectAppointment";

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
  const [savingBoth, setsavingBoth] = useState(false);
  const [multipleAvailability, setMultipleAvailability] = useState<boolean>(
    false
  );
  const [multipleRequirement, setMultipleRequirement] = useState<boolean>(
    false
  );
  const [starMarkCanstitution, setstarMarkCanstitution] = useState<IStarInterface>({
    isStar: false,
    setIndex: -1,
    id: "",
    isSecondStar: false,
    divisionId: -1,
  });
  const [ caregiverStarData, setcaregiverStarData] = useState<IStarInterface>({
    isStar: false,
    id: '',
    isSecondStar: false
  });
  // If appointment is confirmed by care-institution need to update caregiver cell in case of leasing
  const [confirmLeasing, setConfirmLeasing] = useState<any>();

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
  const handleupdateData = (data: any, name: string) => {
    if (name === "careinstitution") {
      setUpdatedCareinstItem(data);
    } else if (name === "caregiver") {
      setUpdatedCaregiverItem(data);
    } else if (name === "both") {
      setUpdatedCareinstItem(data);
      setUpdatedCaregiverItem(data);
    }
  };

  console.log("selectedCaregiverData", selectedCaregiverData);
  console.log("selectedCareinstitutionData", selectedCareinstitutionData);

  /**
   *
   * @param data
   */
  const updateCaregiverDataLeasing = (list: any) => {
    setConfirmLeasing(list);
  };

  const handleSaveBoth = () => {
    setsavingBoth(true);
  };

/**
   *
   * @param starredItem
   */
const handleStarCareinst = (starredItem:any) =>{
  setstarMarkCanstitution(starredItem)
}
/**
   *
   * @param starCaregiver
   */
const handleStarCaregiverValue= (starCaregiver:IStarInterface) =>{
  setcaregiverStarData(starCaregiver)
} 
  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <AppointmentNav
            filterUpdated={setFilterObject}
            filters={filterObject}
            qualifications={qualifications}
            setSelectedCareinstitution={setSelectedCareinstitution}
            setSelectedCaregiver={setSelectedCaregiver}
            setCareInstDeptList={setCareInstDeptList}
          />
          <div className="common-content flex-grow-1">
            <div className="appointment-page-row">
              <div
                className="appointment-page-list-section"
                id="appointment_list_section"
              >
                <div className="calender-section">
                  <CaregiverList
                    caregiverSelected={caregiverSelected}
                    filterUpdated={setFilterObject}
                    filters={filterObject}
                    updatedCaregiverItem={updatedCaregiverItem}
                    setMultipleAvailability={setMultipleAvailability}
                    handleupdateData={handleupdateData}
                    multipleAvailability={multipleAvailability}
                    qualificationList={qualifications}
                    selectedCareinstitutionData={selectedCareinstitutionData}
                    setSelectedCareinstitution={setSelectedCareinstitution}
                    confirmLeasing={confirmLeasing}
                    handleStarCaregiverValue={handleStarCaregiverValue}
                  />
                  <CareInstitutionList
                    selectedCaregiverData={selectedCaregiverData}
                    careinstitutionSelected={careinstitutionSelected}
                    filters={filterObject}
                    setCareInstDeptList={setCareInstDeptList}
                    careInstDeptList={careInstDeptList}
                    qualificationList={qualifications}
                    updatedCareinstItem={updatedCareinstItem}
                    selected={selectedCareinstitutionData}
                    setMultipleRequirement={setMultipleRequirement}
                    handleupdateData={handleupdateData}
                    caregiverSelected={caregiverSelected}
                    updateCaregiverDataLeasing={updateCaregiverDataLeasing}
                    filterUpdated={setFilterObject}
                    handleStarCareinst={handleStarCareinst}
                    starMarkCanstitution={starMarkCanstitution}
                  />
                </div>
              </div>
              <div
                className="appointment-page-form-section"
                id="appointment_form_section"
              >
                <Row className="row-appointment">
                  <Col
                    lg={"6"}
                    className="pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0"
                  >
                    <CaregiverForm
                      selected={selectedCaregiverData}
                      setSelectedCaregiver={setSelectedCaregiver}
                      setSelectedCareinstitution={setSelectedCareinstitution}
                      handleupdateData={handleupdateData}
                      savingBoth={savingBoth}
                      setsavingBoth={setsavingBoth}
                      multipleAvailability={multipleAvailability}
                      selectedCareinstitutionData={selectedCareinstitutionData}
                      caregiverStarData={caregiverStarData}
                      filterUpdated={setFilterObject}
                      filters={filterObject}
                      setcaregiverStarData={setcaregiverStarData}
                    />
                  </Col>
                  <Col
                    lg={"6"}
                    className="pl-lg-0 mt-2 mt-xs-0 mt-lg-0 mt-xl-0"
                  >
                    <CareinstitutionForm
                      selected={selectedCareinstitutionData}
                      qualificationList={qualifications}
                      departmentList={careInstDeptList}
                      setCareInstDeptList={setCareInstDeptList}
                      setSelectedCareinstitution={setSelectedCareinstitution}
                      handleupdateData={handleupdateData}
                      savingBoth={savingBoth}
                      setsavingBoth={setsavingBoth}
                      multipleRequirement={multipleRequirement}
                      handleQualification={(values: any) =>
                        setFilterObject({
                          ...filterObject,
                          qualificationId: map(values, ({ value }) => value),
                          effects: "both",
                        })
                      }
                      starMarkCanstitution={starMarkCanstitution}
                      setstarMarkCanstitution={setstarMarkCanstitution}
                      filterUpdated={setFilterObject}
                      filters={filterObject}
                    />
                  </Col>
                  <Col lg={"12"}>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button
                        className="btn-common  mt-0 mb-2 mx-2"
                        color="primary"
                        disabled={
                          selectedCareinstitutionData &&
                          selectedCareinstitutionData.length === 1 &&
                          selectedCaregiverData &&
                          selectedCaregiverData.length === 1
                            ? false
                            : true
                        }
                        onClick={() => handleSaveBoth()}
                      >
                        <i className="fa fa-save mr-2" />
                        {languageTranslation("SAVE_BOTH")}
                      </Button>
                      <ConnectAppointment
                        selectedCaregiverData={selectedCaregiverData}
                        selectedCareinstitutionData={
                          selectedCareinstitutionData
                        }
                        qualifications={qualifications}
                        setSelectedCaregiver={setSelectedCaregiver}
                        setSelectedCareinstitution={setSelectedCareinstitution}
                        handleupdateData={handleupdateData}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
