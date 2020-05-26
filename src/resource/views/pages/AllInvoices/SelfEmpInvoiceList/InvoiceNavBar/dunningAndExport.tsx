import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import SpecialistInvoice from "../../../../../assets/img/header-icons/specialist-invoice.svg";
import Again from "../../../../../assets/img/header-icons/again.svg";
import appendToPlycoco from "../../../../../assets/img/header-icons/tab-icons/append-to-plycoco.svg";
import attachReminder from "../../../../../assets/img/header-icons/tab-icons/attach-reminder.svg";
import AttachSpeacilistInvoice from "../../../../../assets/img/header-icons/tab-icons/attach-speacilist-invoice.svg";
import sendLawyer from "../../../../../assets/img/header-icons/tab-icons/send-lawyer.svg";
import sendReminder from "../../../../../assets/img/header-icons/tab-icons/send-reminder.svg";
import showReminder from "../../../../../assets/img/header-icons/tab-icons/show-reminder.svg";
import taxConsultant from "../../../../../assets/img/header-icons/tab-icons/tax-consultant.svg";
import uploadReminder from "../../../../../assets/img/header-icons/tab-icons/upload-reminder.svg";
import vicantPosition from "../../../../../assets/img/header-icons/tab-icons/vicant-position.svg";
import createReminder from "../../../../../assets/img/header-icons/tab-icons/create-reminder.svg";
import clear from "../../../../../assets/img/header-icons/tab-icons/clear.svg";
import edit from "../../../../../assets/img/header-icons/tab-icons/edit.svg";
import "../../index.scss";

const DunningAndExport: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <div className="common-topheader d-flex  px-2 mb-1">
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Reminders
                  </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={sendReminder} alt="" />
            </span>
            <span className="header-nav-text">Send reminder</span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={createReminder} alt="" />
            </span>
            <span className="header-nav-text">Create a reminder</span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={showReminder} alt="" />
            </span>
            <span className="header-nav-text">Show reminder</span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Warning
                  </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={uploadReminder} alt="" />
            </span>
            <span className="header-nav-text">Upload reminder</span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={attachReminder} alt="" />
            </span>
            <span className="header-nav-text">attach reminder</span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={sendLawyer} alt="" />
            </span>
            <span className="header-nav-text">Send to lawyer</span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Export
                  </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={taxConsultant} alt="" />
            </span>
            <span className="header-nav-text">Tax consultant</span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={vicantPosition} alt="" />
            </span>
            <span className="header-nav-text">Vacant positions</span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Invoices
                  </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={SpecialistInvoice} alt="" />
            </span>
            <span className="header-nav-text">Create new invoice</span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={SpecialistInvoice} alt="" />
            </span>
            <span className="header-nav-text">
              Create cancellation invoice
                    </span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            attachment
                  </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={appendToPlycoco} alt="" />
            </span>
            <span className="header-nav-text">
              Append to plyco bill
                    </span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={AttachSpeacilistInvoice} alt="" />
            </span>
            <span className="header-nav-text">
              Attach to specialist invoice
                    </span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center"></div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={Again} alt="" />
            </span>
            <span className="header-nav-text">
              Append order number Plycoco
                    </span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={Again} alt="" />
            </span>
            <span className="header-nav-text">
              Append order number specialist
                    </span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Other tool
                  </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={edit} alt="" />
            </span>
            <span className="header-nav-text">To edit</span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={clear} alt="" />
            </span>
            <span className="header-nav-text">Clear</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default DunningAndExport;