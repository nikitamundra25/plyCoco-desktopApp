import React, { FunctionComponent, useState } from "react";
import {
  ButtonDropdown,
  Input,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledTooltip
} from "reactstrap";
import Select from "react-select";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { languageTranslation } from "../../../../helpers";
import {
  Without_Appointments,
  appointmentMonthFormat
} from "../../../../config";
import { IAppointmentNav, IReactSelectInterface } from "../../../../interfaces";
import AttributeFilter from "./AttributeFilter";
import right_arrow from "../../../assets/img/rightarrow.svg";
import left_arrow from "../../../assets/img/leftarrow.svg";
import filter from "../../../assets/img/filter.svg";
import caregiver from "../../../assets/img/caregiver.svg";
import careinstitution from "../../../assets/img/careinstitution.svg";
import CustomOption from "../../components/CustomOptions";
import "react-day-picker/lib/style.css";
import "./index.scss";
import moment from "moment";
import CareInstCustomOption from "../../components/CustomOptions/CustomCareInstOptions";
import AsyncSelect from 'react-select/async';
import CareInstitutionDropdownList from "../../components/DropdownList";


const AppointmentNav: FunctionComponent<IAppointmentNav> = (
  props: IAppointmentNav
) => {
  const {
    handleNext,
    handlePrevious,
    daysData,
    qualificationList,
    handleQualification,
    careGiversList,
    careInstitutionList,
    handleDayClick,
    handleToday,
    qualification,
    careinstitutionSoloFilter,
    caregiverSoloFilter,
    applyFilter,
    handleSelectAppointment,
    onFilterByUserId,
    handleResetFilters,
    filterByAppointments,
    handleUserList,
    isPositive,
    setIsPositive,
    isNegative,
    setIsNegative,
    positive,
    handleLoadMoreCanstitution,
    negative
  } = props;
  const { month = "", year = "" } = daysData ? daysData : {};

  const [attributeSearch, setShowAttribute] = useState<boolean>(false);
  const [attributeFilter, setAttributeFilter] = useState<string | null>(null);
  const [user, setuser] = useState<string>("");
  const [userId, setuserId] = useState<string>("");
  const [dropdownOpen, setOpen] = useState<boolean>(false);

  // To check whether any filter is set or not
  let isFilterSet: boolean =
    (caregiverSoloFilter && caregiverSoloFilter.value ? true : false) ||
      (careinstitutionSoloFilter && careinstitutionSoloFilter.value
        ? true
        : false) ||
      (positive && positive.length ? true : false) ||
      (negative && negative.length ? true : false) ||
      (qualification && qualification.length ? true : false) ||
      (filterByAppointments && filterByAppointments.value)
      ? true
      : false ||
        month !==
        moment()
          .month(moment().month())
          .format(appointmentMonthFormat) ||
        userId
        ? true
        : false;

  const toggle = () => setOpen(!dropdownOpen);

  const handleSelect = (e: any, name: string) => {
    if (name === "dropdown") {
      setuser(e.target.value);
      setuserId("")
    } else {
      setuserId(e.target.value);
    }
  };

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

  const handleAllResetFilters = () => {
    if (isFilterSet) {
      handleResetFilters();
    }
  };

  let setMonthForDays: any = new Date(
    parseInt(year),
    parseInt(
      moment()
        .month(month)
        .format("M")
    )
  );

  let setNewDate: any = new Date(
    setMonthForDays.getFullYear(),
    setMonthForDays.getMonth() - 1,
    1
  );

  const formatDate = () => {
    return month ? `${month} ${year}` : ""
  }

 const handleLoadMoreCanstitutionData = (input:any) => {
  handleLoadMoreCanstitution(input)
 }
  return (
    <>
      <div className="sticky-common-header">
        <div className="common-topheader d-flex  align-items-center px-2 mb-1 appointment-commonheader">
          <div
            className="common-label px-1 cursor-pointer"
            onClick={handleToday}
          >
            {languageTranslation("Today")}
          </div>
          <div className="header-nav-item" onClick={handlePrevious}>
            <span className="header-nav-icon pr-0">
              <img src={left_arrow} alt="" />
            </span>
          </div>
          <div className="common-header-input pr-1">
            <DayPickerInput
              onDayChange={handleDayClick}
              formatDate={formatDate}
              value={month ? `${month} ${year}` : ""}
              dayPickerProps={{
                month: setNewDate,
                canChangeMonth: false,
                // disabledDays: {
                //   daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
                // }
              }}
              inputProps={{ readOnly: true }}
            />
          </div>
          <div className="header-nav-item" onClick={handleNext}>
            <span className="header-nav-icon pr-0">
              <img src={right_arrow} alt="" />
            </span>
          </div>
          <div className="user-select mx-1">
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={"custom-reactselect "}
              placeholder={languageTranslation("SELECT_APPOINTMENT_LABEL")}
              options={Without_Appointments}
              value={filterByAppointments ? filterByAppointments : null}
              onChange={(value: any) => handleSelectAppointment(value)}
            />
          </div>

          <div className="user-select mx-1">
            <div className="custom-select-checkbox">
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel={languageTranslation(
                  "CAREGIVER_QUALIFICATION_PLACEHOLDER"
                )}
                options={qualificationList}
                placeholder={languageTranslation(
                  "CAREGIVER_QUALIFICATION_PLACEHOLDER"
                )}
                value={qualification ? qualification : undefined}
                className={
                  "custom-reactselect custom-reactselect-menu-width-appointment"
                }
                classNamePrefix="custom-inner-reactselect"
                onChange={handleQualification}
              />
            </div>
          </div>

          <div className="header-nav-item">
            <span className="header-nav-icon  pr-0">
              <img src={caregiver} alt="" />
            </span>
          </div>
          <div
            className="header-nav-item"
            onClick={() => {
              setShowAttribute(true);
              setAttributeFilter("caregiver");
              // applyFilter('caregiver', [], []);
            }}
          >
            <span className="header-nav-icon">
              <img src={filter} alt="" />
            </span>
            <span className="header-nav-text">
              {languageTranslation("ATTRIBUTES")}
            </span>
          </div>
          <div className="user-select mx-1">
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={
                "custom-reactselect custom-reactselect-menu-width-appointment"
              }
              placeholder={languageTranslation("SELECT_CAREGIVER")}
              options={careGiversList}
              value={
                caregiverSoloFilter && caregiverSoloFilter.value !== ""
                  ? caregiverSoloFilter
                  : null
              }
              components={{ Option: CustomOption }}
              onChange={(value: any) => handleUserList(value, "caregiver")}
              isClearable={true}
            />
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon  pr-0">
              <img src={careinstitution} alt="" />
            </span>
          </div>
          <div
            className="header-nav-item"
            onClick={() => {
              setShowAttribute(true);
              setAttributeFilter("careInstitution");
              // applyFilter('careInstitution', [], []);
            }}
          >
            <span className="header-nav-icon">
              <img src={filter} alt="" />
            </span>
            <span className="header-nav-text">
              {languageTranslation("ATTRIBUTES")}
            </span>
          </div>
          <div className="user-select mx-1">
          
         {/* <CareInstitutionDropdownList
          careInstitutionList={careInstitutionList}
          handleLoadMoreCanstitution={handleLoadMoreCanstitution}
          placeholderLabel = {languageTranslation("SELECT_CARE_INSTITUTION")}
         /> */}

          {/* <AsyncSelect 
          cacheOptions 
          defaultOptions = {careInstitutionList}
          loadOptions={promiseOptions} 
          // options={careInstitutionList}
          placeholder={languageTranslation("SELECT_CARE_INSTITUTION")}
          classNamePrefix="custom-inner-reactselect"
              className={
                "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
              }
              components={{ Option: CareInstCustomOption }}
              /> */}



            <Select
              classNamePrefix="custom-inner-reactselect"
              className={
                "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
              }
              placeholder={languageTranslation("SELECT_CARE_INSTITUTION")}
              value={
                careinstitutionSoloFilter &&
                  careinstitutionSoloFilter.value !== ""
                  ? careinstitutionSoloFilter
                  : null
              }
              options={careInstitutionList}
              components={{ Option: CareInstCustomOption }}
              onChange={(value: any) =>
                handleUserList(value, "careinstitution")
              }
              isClearable={true}
            />
          </div>
          <div
            className={`header-nav-item pt-1 ${!isFilterSet ? "disable" : ""}`}
            onClick={handleAllResetFilters}
          >
            <span className="header-nav-icon">
              <i className="fa fa-refresh "></i>
            </span>
            <span className="header-nav-text">
              {languageTranslation("RESET_LABEL")}
            </span>
          </div>
          <div className="common-header-input  mx-1 header-dropdown-wrap">
            {/* <Select
                classNamePrefix='custom-inner-reactselect'
                className={'custom-reactselect '}
                placeholder='Select User'
                isClearable={true}
                // value={user ? user : ''}
                onChange={(value: any) => handleSelect(value, 'user')}
              /> */}

            <ButtonDropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              className="button-group-dropdown custom-dropdown text-capitalize"
            >
              <Input
                placeholder={
                  user
                    ? user === "avability"
                      ? languageTranslation("CAREGIVER_AVABILITY")
                      : languageTranslation("CAREINST_REQUIREMENT")
                    : languageTranslation("CAREGIVER_AVABILITY")
                }
                type="text"
                name="id"
                value={userId}
                onChange={(e: any) => handleSelect(e, "text")}
                onKeyPress={(e: any) => handleKeyPress(e)}
              />
              <UncontrolledTooltip placement={"top"} target={"dropdown-1"}>
                {languageTranslation("SELECT_USER")}
              </UncontrolledTooltip>
              <DropdownToggle caret color="primary" id={"dropdown-1"} />
              <DropdownMenu onClick={(e: any) => handleSelect(e, "dropdown")}>
                <DropdownItem value="avability">
                  {languageTranslation("CAREGIVER_AVABILITY")}
                </DropdownItem>
                <DropdownItem value="requirement">
                  {languageTranslation("CAREINST_REQUIREMENT")}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          {/* <Input placeholder={''} type='input' name='text' /> */}
        </div>
      </div>
      <AttributeFilter
        show={attributeSearch ? true : false}
        handleClose={() => {
          setShowAttribute(false);
          setAttributeFilter(null);
        }}
        setAttributeFilter={setAttributeFilter}
        attributeFilter={attributeFilter}
        applyFilter={applyFilter}
        positive={positive}
        negative={negative}
        isPositive={isPositive}
        setIsPositive={setIsPositive}
        isNegative={isNegative}
        setIsNegative={setIsNegative}
      />
    </>
  );
};

export default AppointmentNav;
