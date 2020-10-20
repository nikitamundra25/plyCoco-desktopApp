import React, {Suspense} from "react";
import {
  ButtonDropdown,
  Input,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import DayPickerInput from "react-day-picker/DayPickerInput";
// import AttributeFilter from './AttributeFilter';
import right_arrow from "../../../../assets/img/rightarrow.svg";
import left_arrow from "../../../../assets/img/leftarrow.svg";
import filter from "../../../../assets/img/filter.svg";
import caregiver from "../../../../assets/img/caregiver.svg";
import careinstitution from "../../../../assets/img/careinstitution.svg";
import "react-day-picker/lib/style.css";
import "../index.scss";
import moment from "moment";
import {
  appointmentMonthFormat,
  Without_Appointments,
} from "../../../../../config";
import {
  getDaysArrayByMonth,
  languageTranslation,
} from "../../../../../helpers";
import {
  IAppointmentNav,
  IGetDaysArrayByMonthRes,
} from "../../../../../interfaces";
import CaregiverCustomAsyncList from "../../../components/DropdownList/CareGiverCustomAsyncSelect";
import CareinstitutionCustomAsyncList from "../../../components/DropdownList/CareInstitutionCustomAsyncSelect";

class AppointmentNav extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
        attributeSearch: false,
        attributeFilter: null,
        user:'',
        userId: '',
        dropdownOpen:false
    };
  }

  

   toggle = () => this.setState({dropdownOpen:!this.state.dropdownOpen});

  formatDate = () => {
    const { daysData } = this.props;
    const { month = "", year = "" } = daysData ? daysData : {};
    return month ? `${month} ${year}` : "";
  };

  //   handle previous and next arrow
  handlePrevNextArrow = (str: string) => {
    const { month: actMonth, year: activeYear } = this.props.daysData;
    let activeMonth: number = moment(`1/${actMonth}/${activeYear}`).month();
    let month: number = moment().month();
    let year: number = moment().year();
    if (str === "previous") {
      month = activeMonth - 1;
      year = activeYear;

      // To check if active month is january than set month to december & year to previous year
      if (activeMonth === 0) {
        month = 11;
        year = activeYear - 1;
      }
    } else if (str === "next") {
      month = activeMonth + 1;
      year = activeYear;
      // To check if active month is december than set month to january & year to next year
      if (activeMonth === 11) {
        month = 0;
        year = activeYear + 1;
      }
    }
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    this.props.setDaysData(res);
  };

  //     handle date selection from day picker
  handleDayClick = (selectedDay: any) => {
    let year: number = selectedDay.getFullYear();
    let month: number = selectedDay.getMonth();
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    this.props.setDaysData(res);
  };

   handleSelect = (e: any, name: string) => {
    if (name === 'dropdown') {
      this.setState({
        user: e.target.value,
        userId: ''
      })
    } else {
      this.setState({
        userId: e.target.value,
      })
    }
  };

   handleKeyPress = (e: any) => {
    if (e.which === 13 || e.keyCode === 13) {
      this.handleBlur();
    } else {
      return;
    }
  };

   handleBlur = () => {
       const {userId,user} = this.state;
    if (userId) {
      let userRole = user ? user : 'avability';
    //   onFilterByUserId(userId, userRole);
    }
  };

   renderAttributeModal = () => {
       const {attributeSearch,attributeFilter} = this.state;
       const {  positive,
        negative,
        isPositive,
        isNegative,applyFilter } = this.props;
    if (attributeSearch) {
      const AttributeFilter = React.lazy(() => import('../AttributeFilter'));
      return (
        <Suspense fallback={null}>
          <AttributeFilter
            show={attributeSearch ? true : false}
            handleClose={() => {
              this.setState({
                attributeSearch: false,
                attributeFilter: null
              })
            }}
            attributeFilter={attributeFilter}
            applyFilter={applyFilter}
            positive={positive}
            negative={negative}
            isPositive={isPositive}
            setIsPositive={(value:any) => this.props.setfilterState({
              ...this.props.filterState,
              isPositive: value
            })}
            isNegative={isNegative}
            setIsNegative={(value:any) => this.props.setfilterState({
              ...this.props.filterState,
              isNegative: value
            })}
          />
        </Suspense>
      );
    }
  };

  handleAllResetFilters = () => {
    // if (isFilterSet) {
        this.props.handleResetFilters();
      // }
      }

  render() {
    const { daysData, qualificationList, filterState,handleManageFilter } = this.props;
    const {userId,user,dropdownOpen} = this.state;
    const { month, year } = daysData;
    const {
      filterByAppointments,
      caregiverSoloFilter,
      careinstitutionSoloFilter,
      qualification,
      positive,
      negative
    } = filterState;
    let setMonthForDays: any = new Date(
      parseInt(year),
      parseInt(moment().month(month).format("M"))
    );

    let setNewDate: any = new Date(
      setMonthForDays.getFullYear(),
      setMonthForDays.getMonth() - 1,
      1
    );

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
    
    return (
      <>
        <div className="sticky-common-header">
          <div className="common-topheader d-flex  align-items-center px-2 mb-1 appointment-commonheader">
            <div
              className="common-label px-1 cursor-pointer"
              onClick={() => this.handlePrevNextArrow("today")}
            >
              {languageTranslation("Today")}
            </div>
            <div
              className="header-nav-item"
              onClick={() => this.handlePrevNextArrow("previous")}
            >
              <span className="header-nav-icon pr-0">
                <img src={left_arrow} alt="" />
              </span>
            </div>
            <div className="common-header-input pr-1">
              <DayPickerInput
                onDayChange={this.handleDayClick}
                formatDate={this.formatDate}
                value={month ? `${month} ${year}` : ""}
                dayPickerProps={{
                  month: setNewDate,
                  canChangeMonth: false,
                }}
                inputProps={{ readOnly: true }}
              />
            </div>
            <div
              className="header-nav-item"
              onClick={() => this.handlePrevNextArrow("next")}
            >
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
                onChange={(value: any) => handleManageFilter(value,"filterByAppointments")}
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
                onChange={(value: any) => handleManageFilter(value,"qualification")}
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
                  this.setState({
                    attributeFilter: "caregiver",
                    attributeSearch: true
                  })
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
              <CaregiverCustomAsyncList
                placeholderLabel={languageTranslation("SELECT_CAREGIVER")}
                onChange={(value: any) => handleManageFilter(value, "caregiverSoloFilter")}
                value={
                  caregiverSoloFilter && caregiverSoloFilter.value !== ""
                    ? caregiverSoloFilter
                    : null
                }
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
                  this.setState({
                    attributeFilter: "careInstitution",
                    attributeSearch: true
                  })
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
              <CareinstitutionCustomAsyncList
                placeholderLabel={languageTranslation(
                  "SELECT_CARE_INSTITUTION"
                )}
                onChange={(value: any) =>
                    handleManageFilter(value, "careinstitutionSoloFilter")
                }
                value={
                  careinstitutionSoloFilter &&
                  careinstitutionSoloFilter.value !== ""
                    ? careinstitutionSoloFilter
                    : null
                }
              />
            </div>
            <div
              className={`header-nav-item pt-1 ${
                !isFilterSet ? "disable" : ""
              }`}
              onClick={this.handleAllResetFilters}
            >
              <span className="header-nav-icon">
                <i className="fa fa-refresh "></i>
              </span>
              <span className="header-nav-text">
                {languageTranslation("RESET_LABEL")}
              </span>
            </div>
            <div className="common-header-input  mx-1 header-dropdown-wrap">
              <ButtonDropdown
                isOpen={dropdownOpen}
                toggle={this.toggle}
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
                  onChange={(e: any) => this.handleSelect(e, "text")}
                  onKeyPress={(e: any) => this.handleKeyPress(e)}
                />
                <UncontrolledTooltip placement={"top"} target={"dropdown-1"}>
                  {languageTranslation("SELECT_USER")}
                </UncontrolledTooltip>
                <DropdownToggle caret color="primary" id={"dropdown-1"} />
                <DropdownMenu onClick={(e: any) => this.handleSelect(e, "dropdown")}>
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
        {this.renderAttributeModal()}
      </>
    );
  }
}

export default React.memo(AppointmentNav);
