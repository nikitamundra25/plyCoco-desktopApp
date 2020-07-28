import React, { FunctionComponent, useState } from "react";
import Select from "react-select";
import { languageTranslation } from "../../../../../helpers";
import { IInvoiceNavBar } from "../../../../../interfaces";
import { Nav } from "reactstrap";
import refresh from "../../../../assets/img/refresh.svg";
import PlyCocoreceipt from "../../../../assets/img/header-icons/plyCoco-receipt.svg";
import SpecialistInvoice from "../../../../assets/img/header-icons/specialist-invoice.svg";
import professaionalProfile from "../../../../assets/img/header-icons/professaional-profile.svg";
import paid from "../../../../assets/img/header-icons/paid.svg";
import interierDesign from "../../../../assets/img/header-icons/interier-design-professional.svg";
import Again from "../../../../assets/img/header-icons/again.svg";
import attachReminder from "../../../../assets/img/header-icons/tab-icons/attach-reminder.svg";
import clear from "../../../../assets/img/header-icons/tab-icons/clear.svg";
import edit from "../../../../assets/img/header-icons/tab-icons/edit.svg";
import sendLawyer from "../../../../assets/img/header-icons/tab-icons/send-lawyer.svg";
import sendReminder from "../../../../assets/img/header-icons/tab-icons/send-reminder.svg";
import showReminder from "../../../../assets/img/header-icons/tab-icons/show-reminder.svg";
import taxConsultant from "../../../../assets/img/header-icons/tab-icons/tax-consultant.svg";
import uploadReminder from "../../../../assets/img/header-icons/tab-icons/upload-reminder.svg";
import vicantPosition from "../../../../assets/img/header-icons/tab-icons/vicant-position.svg";
import createReminder from "../../../../assets/img/header-icons/tab-icons/create-reminder.svg";
import showAppointment from "../../../../assets/img/header-icons/show-appointment.svg";
import sent from "../../../../assets/img/header-icons/sent.svg";
import unsent from "../../../../assets/img/header-icons/unsent.svg";
import "../index.scss";

const SolonaNavBar: FunctionComponent<IInvoiceNavBar & any> = (
  props: IInvoiceNavBar & any
) => {
  const {
    options,
    tabChangehandler,
    tabChange,
    handleSendInvoiceModal,
    handleShowInvoice
  } = props;

  return (
    <div>
      <div className="common-sidnav">
        <Nav className="common-ul" tabs>
          <li className="nav-item">
            <a
              className={`nav-link ${tabChange == 1 ? "active" : ""}`}
              onClick={() => tabChangehandler(1)}
            >
              <span className="nav-text text-capitalize">
                {languageTranslation("GENERAL")}{" "}
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${tabChange == 2 ? "active" : ""}`}
              onClick={() => tabChangehandler(2)}
            >
              <span className="nav-text text-capitalize">
                {languageTranslation("DUNNING_EXPORT")}
              </span>
            </a>
          </li>
        </Nav>
      </div>
      {tabChange == 1 ? (
        <div className="common-topheader d-flex  px-2 mb-1">
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("FILTER_LABEL")}{" "}
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={refresh} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("REFRESH")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-text">
                {languageTranslation("OFFERS")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-text">
                {languageTranslation("NOT_SEND")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1"></div>

            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Facilities"
                options={options}
                isClearable={true}
              />
            </div>
            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Broadcast date"
                options={options}
                isClearable={true}
              />
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("VIEW_INVOICE_PDF")}
            </div>
            <div
              onClick={() => handleShowInvoice()}
              className="header-nav-item "
            >
              <span className="header-nav-icon">
                <img src={PlyCocoreceipt} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("SHOW_RECEIPT")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={SpecialistInvoice} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("SAVE_INVOICE")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("SENT_IN")} &amp;{" "}
              {languageTranslation("UNSENT")}
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={Again} alt="" />
              </span>

              <span className="header-nav-text">
                {languageTranslation("AGAIN")}
              </span>
            </div>
            <div
              onClick={() => handleSendInvoiceModal()}
              className="header-nav-item"
            >
              <span className="header-nav-icon">
                <img src={sent} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("SEND")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={unsent} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("UNSENT")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("PAID")} &amp;{" "}
              {languageTranslation("UNPAID")}
            </div>

            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={paid} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("PAID_ON")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={"unPaid"} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("UNPAID")}
              </span>
            </div>
            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="professional"
                options={options}
                isClearable={true}
              />
            </div>
          </div>
          <div className="header-nav-colmn-items profile-section">
            <div className="header-nav-heading mx-1">
              {languageTranslation("USER_PROFILE")}
            </div>

            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={professaionalProfile} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("FUR_PROFILE")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={interierDesign} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("INT_DSN_PROF")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={showAppointment} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("SHOW_APPOINT")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items profile-section">
            <div className="header-nav-heading mx-1"></div>

            <div className="header-nav-item">
              <span className="header-nav-text">
                {languageTranslation("SOLO_SET")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-text">
                {languageTranslation("RELEASE")}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="common-topheader d-flex  px-2 mb-1">
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("REMINDERS")}
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={sendReminder} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("SEND_REMIND")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={createReminder} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CRT_REMID")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={showReminder} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("SHOW_REMIND")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("WARNING")}
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={uploadReminder} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("UPLD_REMID")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={attachReminder} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("ATTCH_REMID")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={sendLawyer} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("SEND_TO_LAWYER")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("EXPORT")}
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={taxConsultant} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("TX_CONSULT")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={vicantPosition} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("VACT_POSI")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("MENU_INVOICES")}
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={SpecialistInvoice} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CRT_NW_INVOI")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={SpecialistInvoice} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CRT_CANCEL_INVOI")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={Again} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("BILL_AGAIN")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1"></div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={Again} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("APPND_ORD_NUB_PYC")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={Again} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("APPND_ORD_NUB_SPC")}
              </span>
            </div>
          </div>
          <div className="header-nav-colmn-items">
            <div className="header-nav-heading mx-1">
              {languageTranslation("OTH_TOOL")}
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={edit} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("TO_EDIT")}
              </span>
            </div>
            <div className="header-nav-item ">
              <span className="header-nav-icon">
                <img src={clear} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CLEAR")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolonaNavBar;
