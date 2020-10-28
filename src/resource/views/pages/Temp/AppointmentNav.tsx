import moment from "moment";
import React, { FunctionComponent } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Select from "react-select";
import { Input } from "reactstrap";
import { Without_Appointments } from "../../../../config";
import { languageTranslation } from "../../../../helpers";
import caregiver from "../../../assets/img/caregiver.svg";
import careinstitution from "../../../assets/img/careinstitution.svg";
import filter from "../../../assets/img/filter.svg";
import left_arrow from "../../../assets/img/leftarrow.svg";
import right_arrow from "../../../assets/img/rightarrow.svg";
import CaregiverCustomAsyncList from "../../components/DropdownList/CareGiverCustomAsyncSelect";
import CareinstitutionCustomAsyncList from "../../components/DropdownList/CareInstitutionCustomAsyncSelect";

const AppointmentNav: FunctionComponent<any> = (props: any) => {
  const formatDate = () => {
    return moment().format("mm YY");
  };
  return (
    <>
      <div className='sticky-common-header'>
        <div className='common-topheader d-flex  align-items-center px-2 mb-1 appointment-commonheader'>
          <div
            className='common-label px-1 cursor-pointer'
            // onClick={handleToday}
          >
            {languageTranslation("Today")}
          </div>
          <div
            className='header-nav-item'
            // onClick={handlePrevious}
          >
            <span className='header-nav-icon pr-0'>
              <img src={left_arrow} alt='' />
            </span>
          </div>
          <div className='common-header-input pr-1'>
            <DayPickerInput
              // onDayChange={handleDayClick}
              formatDate={formatDate}
              value={formatDate()}
              dayPickerProps={{
                // month: setNewDate,
                canChangeMonth: false,
                // disabledDays: {
                //   daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
                // }
              }}
              inputProps={{ readOnly: true }}
            />
          </div>
          <div
            className='header-nav-item' //onClick={handleNext}
          >
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
              // value={filterByAppointments ? filterByAppointments : null}
              // onChange={(value: any) => handleSelectAppointment(value)}
            />
          </div>

          <div className='user-select mx-1'>
            <div className='custom-select-checkbox'>
              <ReactMultiSelectCheckboxes
                placeholderButtonLabel={languageTranslation(
                  "CAREGIVER_QUALIFICATION_PLACEHOLDER"
                )}
                // options={qualificationList}
                placeholder={languageTranslation(
                  "CAREGIVER_QUALIFICATION_PLACEHOLDER"
                )}
                // value={qualification ? qualification : undefined}
                className={
                  "custom-reactselect custom-reactselect-menu-width-appointment"
                }
                classNamePrefix='custom-inner-reactselect'
                // onChange={handleQualification}
              />
            </div>
          </div>

          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={caregiver} alt='' />
            </span>
          </div>
          <div
            className='header-nav-item'
            // onClick={() => {
            //   setShowAttribute(true);
            //   setAttributeFilter("caregiver");
            //   // applyFilter('caregiver', [], []);
            // }}
          >
            <span className='header-nav-icon'>
              <img src={filter} alt='' />
            </span>
            <span className='header-nav-text'>
              {languageTranslation("ATTRIBUTES")}
            </span>
          </div>
          <div className='user-select mx-1'>
            {/* <Select
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
            /> */}
            <CaregiverCustomAsyncList
              placeholderLabel={languageTranslation("SELECT_CAREGIVER")}
              // onChange={(value: any) => handleUserList(value, "caregiver")}
              // value={
              //   caregiverSoloFilter && caregiverSoloFilter.value !== ""
              //     ? caregiverSoloFilter
              //     : null
              // }
            />
          </div>
          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={careinstitution} alt='' />
            </span>
          </div>
          <div
            className='header-nav-item'
            // onClick={() => {
            //   setShowAttribute(true);
            //   setAttributeFilter("careInstitution");
            //   // applyFilter('careInstitution', [], []);
            // }}
          >
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
              // onChange={(value: any) =>
              //   handleUserList(value, "careinstitution")
              // }
              // value={
              //   careinstitutionSoloFilter &&
              //   careinstitutionSoloFilter.value !== ""
              //     ? careinstitutionSoloFilter
              //     : null
              // }
            />
            {/* <Select
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
            /> */}
          </div>
          <div
            className={`header-nav-item pt-1`}
            // onClick={handleAllResetFilters}
          >
            <span className='header-nav-icon'>
              <i className='fa fa-refresh '></i>
            </span>
            <span className='header-nav-text'>
              {languageTranslation("RESET_LABEL")}
            </span>
          </div>
          <div className='common-header-input  mx-1 header-dropdown-wrap'>
            {/* <Select
                classNamePrefix='custom-inner-reactselect'
                className={'custom-reactselect '}
                placeholder='Select User'
                isClearable={true}
                // value={user ? user : ''}
                onChange={(value: any) => handleSelect(value, 'user')}
              /> */}

            {/* <ButtonDropdown
              isOpen={dropdownOpen}
              toggle={toggle}
              className='button-group-dropdown custom-dropdown text-capitalize'>
              <Input
                placeholder={
                  user
                    ? user === "avability"
                      ? languageTranslation("CAREGIVER_AVABILITY")
                      : languageTranslation("CAREINST_REQUIREMENT")
                    : languageTranslation("CAREGIVER_AVABILITY")
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
              <DropdownMenu onClick={(e: any) => handleSelect(e, "dropdown")}>
                <DropdownItem value='avability'>
                  {languageTranslation("CAREGIVER_AVABILITY")}
                </DropdownItem>
                <DropdownItem value='requirement'>
                  {languageTranslation("CAREINST_REQUIREMENT")}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown> */}
          </div>
          <Input placeholder={""} type='input' name='text' />
        </div>
      </div>
      {/* <AttributeFilter
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
      /> */}
    </>
  );
};

export default AppointmentNav;
