import React, { FunctionComponent, useState } from "react";
import Select from "react-select";
import { languageTranslation } from "../../../../../helpers";
import { IInvoiceList, IInvoiceNavBar } from "../../../../../interfaces";
import CustomOption from "../../../components/CustomOptions";
import pen from "../../../../assets/img/header-icons/pen.svg";
import CompleteTime from "../../../../assets/img/header-icons/tab-icons/complete-time.svg";
import idea from "../../../../assets/img/header-icons/tab-icons/idea.svg";
import massege from "../../../../assets/img/header-icons/tab-icons/massege.svg";
import { InvoiceSummaryFilter } from "../../../../../config";
import "../index.scss";
import right_arrow from "../../../../assets/img/rightarrow.svg";
import left_arrow from "../../../../assets/img/leftarrow.svg";
import DayPickerInput from "react-day-picker/DayPickerInput";
import CareInstCustomOption from "../../../components/CustomOptions/CustomCareInstOptions";
import CaregiverCustomAsyncList from "../../../components/DropdownList/CareGiverCustomAsyncSelect";
import CareinstitutionCustomAsyncList from "../../../components/DropdownList/CareInstitutionCustomAsyncSelect";

const InvoiceNavbar: FunctionComponent<IInvoiceNavBar & any> = (
  props: IInvoiceNavBar & any
) => {
  const {
    onhandleSelection,
    careGiversOptions,
    careInstitutionOptions,
    careinstitutionFilter,
    careInstitutionDepartmentOption,
    departmentFilter,
    caregiverFilter,
    handleDayClick,
    handleArrowDayChange,
    dateFilter,
    handleCreateInvoice,
    createInvoiceLoading
  } = props;

  return (
    <div className="common-topheader d-flex  px-2 pb-1 invoice-header">
      <div className="header-nav-item">
        <span className="header-nav-icon">
          <i className="fa fa-refresh "></i>
        </span>
        <span className="header-nav-text">
          {languageTranslation("RESET_LABEL")}
        </span>
      </div>

      <div className="user-select mx-1 ">
        {/* <Select
        classNamePrefix="custom-inner-reactselect"
        className={
            "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
          }
        placeholder={languageTranslation("SELECT_CAREGIVER")}
        components={{ Option: CustomOption }}
         options={careGiversOptions}
         onChange={(value: any) =>
            onhandleSelection(value, "caregiver")
          }
        isClearable={true}
        value={
          caregiverFilter && caregiverFilter.value !== ""
            ? caregiverFilter
            : null
        }
      /> */}

        <CaregiverCustomAsyncList
          placeholderLabel={languageTranslation("SELECT_CAREGIVER")}
          onChange={(value: any) => onhandleSelection(value, "caregiver")}
          value={
            caregiverFilter && caregiverFilter.value !== ""
              ? caregiverFilter
              : null
          }
        />
      </div>
      <div className="user-select mx-1 ">
        {/* <Select
        classNamePrefix="custom-inner-reactselect"
        className={
          "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
        }
        placeholder={languageTranslation("SELECT_CARE_INSTITUTION")}
        options={careInstitutionOptions}
        value={
          careinstitutionFilter && careinstitutionFilter.value !== ""
            ? careinstitutionFilter
            : null
        }
        components={{ Option: CareInstCustomOption }}
        onChange={(value: any) =>
          onhandleSelection(value, "careinstitution")
        }
        isClearable={true}
      /> */}
        <CareinstitutionCustomAsyncList
          placeholderLabel={languageTranslation("SELECT_CARE_INSTITUTION")}
          onChange={(value: any) => onhandleSelection(value, "careinstitution")}
          value={
            careinstitutionFilter && careinstitutionFilter.value !== ""
              ? careinstitutionFilter
              : null
          }
        />
      </div>
      <div className="user-select mx-1 ">
        <Select
          classNamePrefix="custom-inner-reactselect"
          className={"custom-reactselect "}
          placeholder={languageTranslation("SELECT_DEPARTMENT")}
          options={careInstitutionDepartmentOption}
          noOptionsMessage={() => {
            return careinstitutionFilter && careinstitutionFilter.value !== ""
              ? languageTranslation("NO_OPTIONS")
              : languageTranslation("SELECT_CAREINSTITUTION_FIRST");
          }}
          value={
            departmentFilter && departmentFilter.value !== ""
              ? departmentFilter
              : null
          }
          onChange={(value: any) => onhandleSelection(value, "department")}
          isClearable={true}
        />
      </div>
      <div className="header-nav-item">
        <span className="header-nav-icon">
          <img src={pen} alt="" />
        </span>
        <span onClick={handleCreateInvoice} className="header-nav-text">
          {languageTranslation("CREATE")}
        </span>
      </div>
      <div className="header-nav-item">
        <span className="header-nav-icon">
          <img src={CompleteTime} alt="" />
        </span>
        <span className="header-nav-text">
          {languageTranslation("TIMELY_COMPLETELY")}
        </span>
      </div>
      <div className="header-nav-item">
        <span className="header-nav-icon">
          <img src={idea} alt="" />
        </span>
        <span className="header-nav-text">
          {languageTranslation("CREATE_ALL_CAREGIVER")}
        </span>
      </div>
      <div className="header-nav-item">
        <span className="header-nav-icon pr-0">
          <img src={massege} alt="" />
        </span>
      </div>
      <div className="user-select mx-1 ">
        <Select
          classNamePrefix="custom-inner-reactselect"
          className={"custom-reactselect "}
          placeholder="Select Month Summary"
          options={InvoiceSummaryFilter}
          isClearable={true}
          onChange={(value: any) => onhandleSelection(value, "monthSummary")}
        />
      </div>

      {/* <div className="user-select mx-1 ">
      <Select
        classNamePrefix="custom-inner-reactselect"
        className={"custom-reactselect "}
        placeholder="Nursing service at Treptower Park"
        // options={options}
        isClearable={true}
      />
    </div> */}
      <div
        className="header-nav-item"
        onClick={() => handleArrowDayChange("previous")}
      >
        <span className="header-nav-icon pr-0">
          <img src={left_arrow} alt="" />
        </span>
      </div>
      <div className="common-header-input pr-1">
        <DayPickerInput
          onDayChange={handleDayClick}
          //  formatDate={formatDate}
          value={dateFilter ? `${dateFilter}` : ""}
          dayPickerProps={{
            //  month: setNewDate,
            canChangeMonth: false,
          }}
          inputProps={{ readOnly: true }}
        />
      </div>
      <div
        className="header-nav-item"
        onClick={() => handleArrowDayChange("next")}
      >
        <span className="header-nav-icon pr-0">
          <img src={right_arrow} alt="" />
        </span>
      </div>
    </div>
  );
};

export default InvoiceNavbar;
