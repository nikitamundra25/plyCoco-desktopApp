import React, { FunctionComponent, useState } from "react";
import {
  ButtonDropdown,
  Input,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import Select from "react-select";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { languageTranslation } from "../../../../helpers";
import { Without_Appointments } from "../../../../config";
import { IAppointmentNav, IReactSelectInterface } from "../../../../interfaces";
import AttributeFilter from "./AttributeFilter";
import right_arrow from "../../../assets/img/rightarrow.svg";
import left_arrow from "../../../assets/img/leftarrow.svg";
import filter from "../../../assets/img/filter.svg";
import caregiver from "../../../assets/img/caregiver.svg";
import careinstitution from "../../../assets/img/careinstitution.svg";
import "react-day-picker/lib/style.css";
import "./index.scss";
import CustomOption from "../../components/CustomOptions";

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
    handleSelectUserList,
    careGiversListArr,
    careInstitutionListArr,
    applyFilter,
    handleSelectAppointment,
    onFilterByUserId,
    handleResetFilters,
    filterByAppointments
  } = props;

  const { month = "", year = "" } = daysData ? daysData : {};

  const [attributeSearch, setShowAttribute] = useState<boolean>(false);
  const [attributeFilter, setAttributeFilter] = useState<string | null>(null);
  const [caregiverUser, setcaregiverUser] = useState<
    IReactSelectInterface | undefined
  >(undefined);
  const [careinstitutionUser, setcareinstitutionUser] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  const [user, setuser] = useState<string>("");
  const [userId, setuserId] = useState<string>("");
  const [dropdownOpen, setOpen] = useState<boolean>(false);

  const toggle = () => setOpen(!dropdownOpen);

  const handleUserList = (
    selectedOption: IReactSelectInterface,
    name: string
  ) => {
    const { result: caregiverArr } = careGiversListArr;
    const { result: careinstitutionArr } = careInstitutionListArr;
    let data: any = name === "caregiver" ? caregiverArr : careinstitutionArr;
    if (selectedOption && selectedOption.value) {
      if (name === "caregiver") {
        data = caregiverArr.filter((x: any) => x.id === selectedOption.value);
        setcaregiverUser(selectedOption);
      } else {
        data = careinstitutionArr.filter(
          (x: any) => x.id === selectedOption.value
        );
        setcareinstitutionUser(selectedOption);
      }
    } else {
      if (name === "caregiver") {
        setcaregiverUser(selectedOption);
      } else {
        setcareinstitutionUser(selectedOption);
      }
    }
    handleSelectUserList(data, name);
  };

  const handleSelect = (e: any, name: string) => {
    if (name === "dropdown") {
      setuser(e.target.value);
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
    setcaregiverUser(undefined);
    setcareinstitutionUser(undefined);
    handleResetFilters();
  };
  return (
    <>
      <div className="sticky-common-header">
        <div className="common-topheader d-flex  align-items-center px-2 mb-1 appointment-commonheader">
          <div
            className="common-label px-1 cursor-pointer"
            onClick={handleToday}
          >
            Today
          </div>
          <div className="header-nav-item" onClick={handlePrevious}>
            <span className="header-nav-icon pr-0">
              <img src={left_arrow} alt="" />
            </span>
          </div>
          <div className="common-header-input pr-1">
            {/* <Input
              className='form-control'
              placeholder={'February 2020'}
              type='input'
              value={`${month} ${year}`}
              name='text'
            /> */}
            <DayPickerInput
              onDayChange={handleDayClick}
              value={`${month} ${year}`}
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
              placeholder="Select appointment"
              options={Without_Appointments}
              value={filterByAppointments ? filterByAppointments : null}
              onChange={(value: any) =>
                handleSelectAppointment(value, "appointments")
              }
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
              placeholder="Select Caregiver"
              options={careGiversList}
              value={
                caregiverUser && caregiverUser.value !== ""
                  ? caregiverUser
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
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={
                "custom-reactselect custom-reactselect-menu-width-appointment"
              }
              placeholder="Select Care Institution"
              value={
                careinstitutionUser && careinstitutionUser.value !== ""
                  ? careinstitutionUser
                  : null
              }
              options={careInstitutionList}
              components={{ Option: CustomOption }}
              onChange={(value: any) =>
                handleUserList(value, "careinstitution")
              }
              isClearable={true}
            />
          </div>
          <div className="header-nav-item pt-1" onClick={handleAllResetFilters}>
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
                      ? "Availability"
                      : "Requirement"
                    : languageTranslation("SELECT_USER")
                }
                type="text"
                name="id"
                value={userId}
                onChange={(e: any) => handleSelect(e, "text")}
                // onBlur={(e: any) => handleBlur()}
                onKeyPress={(e: any) => handleKeyPress(e)}
              />

              <DropdownToggle caret color="primary" />
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
      />
    </>
  );
};

export default AppointmentNav;
