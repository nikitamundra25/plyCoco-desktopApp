import { useLazyQuery } from "@apollo/react-hooks";
import { debounce, map } from "lodash";
import moment from "moment";
import { useLocation, useHistory } from 'react-router';
import React, { FunctionComponent, useState, useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Select from "react-select";
import {
  Input,
  UncontrolledTooltip,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { dbAcceptableFormat, Without_Appointments } from "../../../../config";
import { AppointmentsQueries ,CareInstitutionQueries} from "../../../../graphql/queries";
import { languageTranslation } from "../../../../helpers";
import caregiver from "../../../assets/img/caregiver.svg";
import careinstitution from "../../../assets/img/careinstitution.svg";
import filter from "../../../assets/img/filter.svg";
import left_arrow from "../../../assets/img/leftarrow.svg";
import right_arrow from "../../../assets/img/rightarrow.svg";
import CaregiverCustomAsyncList from "../../components/DropdownList/CareGiverCustomAsyncSelect";
import CareinstitutionCustomAsyncList from "../../components/DropdownList/CareInstitutionCustomAsyncSelect";
import { AttributeFilterModal } from "./AttributeFilterModal";
const [
  ,
  ,
  GET_CAREINSTITUTION_REQUIREMENT_BY_ID,
] = AppointmentsQueries;
const [, , GET_DEPARTMENT_LIST, , , ,] = CareInstitutionQueries;

const AppointmentNav: FunctionComponent<any> = ({
  filterUpdated = () => {},
  filters = {},
  qualifications = [],
  setSelectedCareinstitution,
  setSelectedCaregiver,
  setCareInstDeptList
}: any) => {
   // To fetch id from display appointments
   const { state: locationState }: any = useLocation();
 // To check whether it comes from caregiver or careInstitution page or not
 const { action } = useHistory();
   // To fetch avabality & requirement by id
   const [
    fetchAppointmentFilterById,
    { data: appointmentFilterById, loading: idSearchAppointmentLoading },
  ] = useLazyQuery<any, any>(GET_CAREINSTITUTION_REQUIREMENT_BY_ID, {
    fetchPolicy: 'no-cache', onCompleted: data => {
      if (
        appointmentFilterById &&
        appointmentFilterById.getRequirementAndAvabilityById
      ) {
        const { getRequirementAndAvabilityById } = appointmentFilterById;
        const { requirementData, avabilityData } = getRequirementAndAvabilityById;
        updateRequirementData(requirementData);
        updateAvabilityData(avabilityData);

      }
    }
  });

     // To get department list
     const [
      getDepartmentList,
      { data: departmentList, loading: deptLoading },
    ] = useLazyQuery<any>(GET_DEPARTMENT_LIST, {
      onCompleted: (daata:any) => {
        setCareInstDeptList(departmentList)
      }
    });

  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const [showCaregiveAttributeModal, setShowCaregivettributeModal] = useState(
    false
  );
  const [showAttributeModal, setShowAttributeModal] = useState(false);
  const [user, setuser] = useState<string>("avability");
  const [userId, setuserId] = useState<string>("");
  /**
   * toggle the filter by id dropdown
   */
  const toggle = () => setOpen(!dropdownOpen);

  /**
   * fomatted date
   */
  const formatDate = moment(filters.gte).format("MMMM YYYY");
  /**
   *
   * @param startDate
   * @param endDate
   */
  const onMonthChange = (startDate: any, endDate: any) => {
    filterUpdated({
      ...filters,
      gte: startDate,
      lte: endDate,
      effects: "both",
    });
  };

  /**
   *
   * @param requirementData
   */
  const updateRequirementData = (requirementData: any) => {
    const {
      user= {},
    } = requirementData ? requirementData : {}
    let temp = requirementData ? requirementData : {}
    delete temp.user
      let data: any = 
        [{
          isWeekend: '',
          canstitution: {
            ...user,
          },
          item: temp,
        }]
      setSelectedCareinstitution(data);
  };

  /**
   *
   * @param avabilityData
   */
  const updateAvabilityData = (avabilityData: any) => {
    const {
      user= {},
    } = avabilityData ? avabilityData : {}
    let temp = avabilityData ? avabilityData : {}
    delete temp.user
      let data: any = 
        [{
          isWeekend: '',
          caregiver: {
            ...user,
          },
          item: temp,
        }]
      setSelectedCaregiver(data);
  };

  /**
   * debouce to prevent unwanted api calls to server
   */
  const handleQualificationChange = debounce((values: any[]) => {
    filterUpdated({
      ...filters,
      qualificationId: map(values, ({ value }) => value),
      effects: "both",
    });
  }, 500);

/**
   *
   * @param e
   * @param name
   */
  const handleSelect = (e: any, name: string) => {
    if (name === "dropdown") {
      setuser(e.target.value);
      setuserId("");
    } else {
      setuserId(e.target.value);
    }
  };

  /**
   *
   * @param e
   */
  const handleKeyPress = (e: any) => {
    if (e.which === 13 || e.keyCode === 13) {
      handleBlur();
    } else {
      return;
    }
  };

  const handleBlur = () => {
    if (userId) {
      let userRole = user ? user : "avability";
      onFilterByUserId(userId, userRole);
    }
  };

  const onFilterByUserId = (userId: string, userRole: string) => {
    if(userId){
      fetchAppointmentFilterById({
        variables: {
          id: parseInt(userId),
          searchIn: userRole
        },
      });
    }
  };


   //To set locationstate data into filter
   useEffect(() => {
    if (locationState && locationState.caregiver && action === 'PUSH') {
      let temp = {
        label: locationState.name,
        value: locationState.caregiver,
      }
      filterUpdated({
        ...filters,
        caregiverId: locationState && locationState.caregiver ? locationState.caregiver : null,
        soloCaregiver: temp,
        effects: "caregiver",
      })
    } 
     if (
      locationState &&
      locationState.canstitution &&
      action === 'PUSH'
    ) {      
      let stemp = {
        label: locationState.canstitutionName ? locationState.canstitutionName :  locationState.name,
        value: locationState.canstitution,
      }
      filterUpdated({
        ...filters,
        careInstitutionId: locationState && locationState.canstitution
          ? locationState.canstitution
          : null,
        soloCareinstitution: stemp,
        effects: "careinstitution",
      })
      getDepartmentList({
        variables: {
          userId: careinstitution
          ? parseInt(locationState.canstitution)
          : null,
          locked: false,
        },
      });
    }
    if (locationState && locationState.avabilityId) {
      onFilterByUserId(locationState.avabilityId, 'avability');
    }
  }, [locationState]);
  
  /**
   *
   */
  return (
    <>
      <div className='sticky-common-header'>
        <div className='common-topheader d-flex  align-items-center px-2 mb-1 appointment-commonheader'>
          <div
            className='common-label px-1 cursor-pointer'
            onClick={() =>
              onMonthChange(
                moment().startOf("month").format(dbAcceptableFormat),
                moment().endOf("month").format(dbAcceptableFormat)
              )
            }>
            {languageTranslation("Today")}
          </div>
          <div
            className='header-nav-item'
            onClick={() =>
              onMonthChange(
                moment(filters.gte)
                  .subtract(1, "month")
                  .startOf("month")
                  .format(dbAcceptableFormat),
                moment(filters.gte)
                  .subtract(1, "month")
                  .endOf("month")
                  .format(dbAcceptableFormat)
              )
            }>
            <span className='header-nav-icon pr-0'>
              <img src={left_arrow} alt='' />
            </span>
          </div>
          <div className='common-header-input pr-1'>
            <DayPickerInput
              formatDate={() => formatDate}
              value={formatDate}
              dayPickerProps={{
                month: moment(filters.gte).toDate(),
                canChangeMonth: false,
              }}
              inputProps={{ readOnly: true }}
            />
          </div>
          <div
            className='header-nav-item'
            onClick={() =>
              onMonthChange(
                moment(filters.gte)
                  .add(1, "month")
                  .startOf("month")
                  .format(dbAcceptableFormat),
                moment(filters.gte)
                  .add(1, "month")
                  .endOf("month")
                  .format(dbAcceptableFormat)
              )
            }>
            <span className='header-nav-icon pr-0'>
              <img src={right_arrow} alt='' />
            </span>
          </div>
          <div className='user-select mx-1'>
            <Select
              classNamePrefix='custom-inner-reactselect'
              className={"custom-reactselect "}
              placeholder={languageTranslation("SELECT_APPOINTMENT_LABEL")}
              options={Without_Appointments}
              value={
                filters.showAppointments
                  ? Without_Appointments.find(
                      ({ value }) => value === filters.showAppointments
                    )
                  : {
                      value: "showAll",
                      label: languageTranslation("SHOW_ALL"),
                    }
              }
              onChange={({ value }: any) =>
                filterUpdated({
                  ...filters,
                  showAppointments: value === "showAll" ? null : value,
                  effects: "both",
                })
              }
            />
          </div>

          <div className='user-select mx-1'>
            <div className='custom-select-checkbox'>
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel={languageTranslation(
                  "CAREGIVER_QUALIFICATION_PLACEHOLDER"
                )}
                options={qualifications}
                placeholder={languageTranslation(
                  "CAREGIVER_QUALIFICATION_PLACEHOLDER"
                )}
                value={qualifications.filter(
                  (qualification: any) =>
                    (filters.qualificationId || []).indexOf(qualification.value) >
                    -1
                )}
                className={
                  "custom-reactselect custom-reactselect-menu-width-appointment"
                }
                classNamePrefix='custom-inner-reactselect'
                onChange={handleQualificationChange}
              />
            </div>
          </div>

          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={caregiver} alt='' />
            </span>
          </div>
          {/* caregiver */}
          <div
            className='header-nav-item'
            onClick={() => {
              setShowCaregivettributeModal(true);
            }}>
            <span className='header-nav-icon'>
              <img src={filter} alt='' />
            </span>
            <span className='header-nav-text'>
              {languageTranslation("ATTRIBUTES")}
            </span>
          </div>
          <div className='user-select mx-1'>
            <CaregiverCustomAsyncList
              placeholderLabel={languageTranslation("SELECT_CAREGIVER")}
              onChange={(caregiver: any) =>
                filterUpdated({
                  ...filters,
                  caregiverId: caregiver ? caregiver.value : null,
                  soloCaregiver: caregiver,
                  effects: "caregiver",
                })
              }
              value={
                filters && filters.soloCaregiver && filters.soloCaregiver.value !== ""
                  ? filters.soloCaregiver
                  : null
              }
            />
          </div>
          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={careinstitution} alt='' />
            </span>
          </div>
            {/* careinstitution */}
          <div
            className='header-nav-item'
            onClick={() => setShowAttributeModal(true)}>
            <span className='header-nav-icon'>
              <img src={filter} alt='' />
            </span>
            <span className='header-nav-text'>
              {languageTranslation("ATTRIBUTES")}
            </span>
          </div>
          <div className='user-select mx-1'>
            <CareinstitutionCustomAsyncList
              placeholderLabel={languageTranslation("SELECT_CARE_INSTITUTION")}
              value={
                filters && filters.soloCareinstitution && filters.soloCareinstitution.value !== ""
                  ? filters.soloCareinstitution
                  : null
              }
              onChange={(careinstitution: any) =>
               { filterUpdated({
                  ...filters,
                  careInstitutionId: careinstitution
                    ? parseInt(careinstitution.value)
                    : null,
                  soloCareinstitution: careinstitution,
                  effects: "careinstitution",
                })
                if(careinstitution && careinstitution.value&& careinstitution.value !==null){
                  getDepartmentList({
                   variables: {
                     userId: careinstitution
                     ? parseInt(careinstitution.value)
                     : null,
                     locked: false,
                   },
                 });
                }
              }
              }
            />
          </div>
          <div
            className={`header-nav-item pt-1`}
            onClick={() =>
              filterUpdated({
                effects: "both",
                  showAppointments: "showWithAppointments"
              })
            }>
            <span className='header-nav-icon'>
              <i className='fa fa-refresh '></i>
            </span>
            <span className='header-nav-text'>
              {languageTranslation("RESET_LABEL")}
            </span>
          </div>
          <div className='common-header-input  mx-1 header-dropdown-wrap'>
            <ButtonDropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              className='button-group-dropdown custom-dropdown text-capitalize'>
              <Input
                placeholder={
                  user
                    ? user === "avability"
                      ? languageTranslation("CAREGIVER_AVABILITY")
                      : languageTranslation("CAREINST_REQUIREMENT")
                      :""
                }
                type='text'
                name='id'
                value={userId}
                onChange={(e: any) => handleSelect(e, "text")}
                onKeyPress={(e: any) => handleKeyPress(e)}
              />
              <UncontrolledTooltip placement={"top"} target={"dropdown-1"}>
                {languageTranslation("SELECT_USER")}
              </UncontrolledTooltip>
              <DropdownToggle caret color='primary' id={"dropdown-1"} />
              <DropdownMenu
              onClick={(e: any) => handleSelect(e, "dropdown")}
              >
                <DropdownItem value='avability'>
                  {languageTranslation("CAREGIVER_AVABILITY")}
                </DropdownItem>
                <DropdownItem value='requirement'>
                  {languageTranslation("CAREINST_REQUIREMENT")}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
      </div>
      <AttributeFilterModal
        isOpen={showCaregiveAttributeModal}
        onClose={() => setShowCaregivettributeModal(false)}
        onFilterUpdated={(attrFilter: any) => {
          filterUpdated({
            ...filters,
            ...attrFilter,
          });
        }}
        filter='caregiver'
      />
      <AttributeFilterModal
        isOpen={showAttributeModal}
        onClose={() => setShowAttributeModal(false)}
        onFilterUpdated={(attrFilter: any) => {
          filterUpdated({
            ...filters,
            ...attrFilter,
          });
        }}
        filter='careInstitution'
      />
    </>
  );
};

export default AppointmentNav;
