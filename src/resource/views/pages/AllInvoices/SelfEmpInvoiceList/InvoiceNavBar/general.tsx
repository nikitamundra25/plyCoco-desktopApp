import React, { FunctionComponent } from "react";
import Select from "react-select";
import { languageTranslation } from "../../../../../../helpers";

import refresh from "../../../../../assets/img/refresh.svg";
import PlyCocoreceipt from "../../../../../assets/img/header-icons/plyCoco-receipt.svg";
import SpecialistInvoice from "../../../../../assets/img/header-icons/specialist-invoice.svg";
import professaionalProfile from "../../../../../assets/img/header-icons/professaional-profile.svg";
import paid from "../../../../../assets/img/header-icons/paid.svg";
import unPaid from "../../../../../assets/img/header-icons/unpaid.svg";
import sent from "../../../../../assets/img/header-icons/sent.svg";
import unsent from "../../../../../assets/img/header-icons/unsent.svg";
import interierDesign from "../../../../../assets/img/header-icons/interier-design-professional.svg";
import Again from "../../../../../assets/img/header-icons/again.svg";
import save from "../../../../../assets/img/save.svg";
import saveinvoice from "../../../../../assets/img/saveinvoice.svg";
import openIc from "../../../../../assets/img/header-icons/tab-icons/open.svg";
import notSeen from "../../../../../assets/img/header-icons/tab-icons/not-seen.svg";
import professional from "../../../../../assets/img/header-icons/tab-icons/portfolio.svg";
import funiturIc from "../../../../../assets/img/header-icons/tab-icons/funitur-ic.svg";
import { RouteComponentProps } from "react-router";
import showAppointment from "../../../../../assets/img/header-icons/show-appointment.svg";
import "../../index.scss";

const GeneralTab: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const { handleShowInvoice } = mainProps
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <div className="common-topheader d-flex  px-2 mb-1">
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center"></div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={refresh} alt="" />
            </span>
            <span className="header-nav-text">
              {languageTranslation("REFRESH")}
            </span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={openIc} alt="" />
            </span>
            <span className="header-nav-text">Open</span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={notSeen} alt="" />
            </span>
            <span className="header-nav-text">Not Sent</span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Filter
                  </div>
          <div className="user-select mx-1 ">
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={"custom-reactselect "}
              placeholder={languageTranslation("MENU_CAREGIVER")}
              options={options}
              isClearable={true}
            />
          </div>
          <div className="user-select mx-1 ">
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={"custom-reactselect "}
              placeholder={languageTranslation("MENU_INSTITUTION")}
              options={options}
              isClearable={true}
            />
          </div>
          <div className="user-select mx-1 ">
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={"custom-reactselect "}
              placeholder="Send date"
              options={options}
              isClearable={true}
            />
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            View Invoice PDFs
                  </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={PlyCocoreceipt} alt="" />
            </span>
            <span onClick={() => handleShowInvoice("Plycoco")} className="header-nav-text">
              Show PlyCoco Invoice
            </span>
          </div>
          <div className="header-nav-item ">
            <span className="header-nav-icon">
              <img src={SpecialistInvoice} alt="" />
            </span>
            <span className="header-nav-text">
              Show Caregiver Invoice
                    </span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Save
                  </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={saveinvoice} alt="" />
            </span>

            <span className="header-nav-text">
              Save Plycoco Invoice
                    </span>
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={saveinvoice} alt="" />
            </span>
            <span className="header-nav-text">
              Save Caregiver Invoice
                    </span>
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={save} alt="" />
            </span>
            <span className="header-nav-text">Save Both</span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Send
                  </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={Again} alt="" />
            </span>

            <span className="header-nav-text">Send again</span>
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={sent} alt="" />
            </span>
            <span className="header-nav-text">Sent today</span>
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={unsent} alt="" />
            </span>
            <span className="header-nav-text">Unsent</span>
          </div>
        </div>
        <div className="header-nav-colmn-items">
          <div className="header-nav-heading mx-1 text-center">
            Paid &amp; Unpaid
                  </div>

          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={paid} alt="" />
            </span>
            <span className="header-nav-text">Paid</span>
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={unPaid} alt="" />
            </span>
            <span className="header-nav-text">Unpaid</span>
          </div>
          <div className="user-select mx-1 ">
            <Select
              classNamePrefix="custom-inner-reactselect"
              className={"custom-reactselect "}
              placeholder="11-01-2020"
              options={options}
              isClearable={true}
            />
          </div>
        </div>
        <div className="header-nav-colmn-items profile-section">
          <div className="header-nav-heading mx-1 text-center">
            User Profile
                  </div>

          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={professaionalProfile} alt="" />
            </span>
            <span className="header-nav-text">Caregiver Profile</span>
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={interierDesign} alt="" />
            </span>
            <span className="header-nav-text">
              Care Institution Profile
                    </span>
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={showAppointment} alt="" />
            </span>

            <span className="header-nav-text">Show appointments</span>
          </div>
        </div>
        <div className="header-nav-colmn-items profile-section">
          <div className="header-nav-heading mx-1"></div>

          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={professional} alt="" />
            </span>

            <span className="header-nav-text">Caregiver Solo</span>
          </div>
          <div className="header-nav-item">
            <span className="header-nav-icon">
              <img src={funiturIc} alt="" />
            </span>
            <span className="header-nav-text">
              Care Institution Solo
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default GeneralTab;