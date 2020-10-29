import { debounce, map } from "lodash";
import moment from "moment";
import React, { FunctionComponent, useState } from "react";
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
import { languageTranslation } from "../../../../helpers";
import caregiver from "../../../assets/img/caregiver.svg";
import careinstitution from "../../../assets/img/careinstitution.svg";
import filter from "../../../assets/img/filter.svg";
import left_arrow from "../../../assets/img/leftarrow.svg";
import right_arrow from "../../../assets/img/rightarrow.svg";
import CaregiverCustomAsyncList from "../../components/DropdownList/CareGiverCustomAsyncSelect";
import CareinstitutionCustomAsyncList from "../../components/DropdownList/CareInstitutionCustomAsyncSelect";
import { AttributeFilterModal } from "./AttributeFilterModal";

const AppointmentNav: FunctionComponent<any> = ({
  filterUpdated = () => {},
  filters = {},
  qualifications = [],
}: any) => {
  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const [showCaregiveAttributeModal, setShowCaregivettributeModal] = useState(
    false
  );
  const [showAttributeModal, setShowAttributeModal] = useState(false);
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
              /* onDayChange={(date: any) =>
                onMonthChange(
                  moment(date).startOf("month").format(dbAcceptableFormat),
                  moment(date).endOf("month").format(dbAcceptableFormat)
                )
              } */
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
                    value: "showWithAppointments",
                    label: languageTranslation("SHOW_APPOINTMENT"),
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
                // value={qualification ? qualification : undefined}
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
                  effects: "caregiver",
                })
              }
            />
          </div>
          <div className='header-nav-item'>
            <span className='header-nav-icon  pr-0'>
              <img src={careinstitution} alt='' />
            </span>
          </div>
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
              onChange={(careinstitution: any) =>
                filterUpdated({
                  ...filters,
                  careInstitutionId: careinstitution ? parseInt(careinstitution.value) : null,
                  effects: "careinstitution",
                })
              }
            />
          </div>
          <div
            className={`header-nav-item pt-1`}
            onClick={() =>
              filterUpdated({
                effects: "both",
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
                  // user
                  //   ? user === "avability"
                  //     ? languageTranslation("CAREGIVER_AVABILITY")
                  //     : languageTranslation("CAREINST_REQUIREMENT")
                  //   :
                  languageTranslation("CAREGIVER_AVABILITY")
                }
                type='text'
                name='id'
                // value={userId}
                // onChange={(e: any) => handleSelect(e, "text")}
                // onKeyPress={(e: any) => handleKeyPress(e)}
              />
              <UncontrolledTooltip placement={"top"} target={"dropdown-1"}>
                {languageTranslation("SELECT_USER")}
              </UncontrolledTooltip>
              <DropdownToggle caret color='primary' id={"dropdown-1"} />
              <DropdownMenu
              // onClick={(e: any) => handleSelect(e, "dropdown")}
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
          <div className='common-header-input  mx-1 '>
            <Input placeholder={""} type='input' name='text' />
          </div>
          
        </div>
      </div>
      <AttributeFilterModal
        key={"caregiver"}
        isOpen={showCaregiveAttributeModal}
        onClose={() => setShowCaregivettributeModal(false)}
        onFilterUpdated={(attrFilter: any) => {
          filterUpdated({
            ...filters,
            ...attrFilter,
            effects: "caregiver",
          });
        }}
      />
      <AttributeFilterModal
        key={"careinstitution"}
        isOpen={showAttributeModal}
        onClose={() => setShowAttributeModal(false)}
        onFilterUpdated={(attrFilter: any) => {
          filterUpdated({
            ...filters,
            ...attrFilter,
            effects: "careinstitution",
          });
        }}
      />
    </>
  );
};

export default AppointmentNav;
