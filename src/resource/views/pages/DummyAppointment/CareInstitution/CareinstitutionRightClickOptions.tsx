import React, { useState } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import new_appointment from "../../../../assets/img/dropdown/new_appointment.svg";
import all_list from "../../../../assets/img/dropdown/all_list.svg";
import delete_appointment from "../../../../assets/img/dropdown/delete.svg";
import detail_list from "../../../../assets/img/dropdown/detail_list.svg";
import offer_sent from "../../../../assets/img/dropdown/offer_sent.svg";
import connect from "../../../../assets/img/dropdown/connect.svg";
import disconnect from "../../../../assets/img/dropdown/disconnect.svg";
import confirm_appointment from "../../../../assets/img/dropdown/confirm_appointment.svg";
import set_confirm from "../../../../assets/img/dropdown/confirm.svg";
import unset_confirm from "../../../../assets/img/dropdown/not_confirm.svg";
import invoice from "../../../../assets/img/dropdown/invoice.svg";

import classnames from "classnames";

export const CareinstitutionRightClickOptions = (props: any) => {
  const {
    hide,
    toggleMenuButton,
    selectedCellsCareinstitution,
    handleRightMenuToggle,
    onNewRequirement,
    offerAppCond,
    handleSelectedAppoitment,
    setShowList,
    handleCareInstitutionBulkEmail,
    updateCareInstitutionStatus,
    handleCareGiverBulkEmail,
    connectAppCondition,
    handleLinkAppointments,
    handleUnLinkAppointments,
    setStatusTo,
    setSortBy,
    setConfirmAppointment,
    onDeleteEntries,isOpen
  } = props;
  return (
    <div
      className={classnames({
        "rightclick-menu": true,
        "custom-scrollbar": true,
        "d-none": !isOpen,
      })}
      id={"clickbox"}
    >
      <div>
        <Nav vertical>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
                // ? "disabled-class"
                // : ""
              }
              onClick={() => {
                handleRightMenuToggle();
                onNewRequirement();
                hide()
              }}
            >
              <img src={new_appointment} className="mr-2" alt="" />
              <span>{languageTranslation("NEW_APPOINTMENT")}</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length
                  ? selectedCellsCareinstitution.filter(
                      (availability: any) =>
                        (availability && !availability.item) ||
                        (availability.item && !availability.item.status) ||
                        (availability.item &&
                          (availability.item.status === "default" ||
                            availability.item.status === "offered" ||
                            availability.item.status === "linked"))
                    ).length
                    ? false
                    : true
                  : true
              }
              // disabled={
              // (selectedCellsCareinstitution &&
              // selectedCellsCareinstitution.length &&
              // selectedCellsCareinstitution[0].id === '') ||
              // (emailOptionCond && emailOptionCond.length !== 0)
              // ? 'disabled-class'
              // : ''
              // }
              onClick={() => {
                handleRightMenuToggle();
                onDeleteEntries("careInstitution");
              }}
              // onClick={() => onDeleteEntries()}
            >
              <img src={delete_appointment} className="mr-2" alt="" />
              <span>{languageTranslation("DELETE_FREE_APPOINTMENT")}</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                offerAppCond && offerAppCond.length !== 0 ? true : false
              }
              onClick={() => {
                handleRightMenuToggle();
                handleSelectedAppoitment();
              }}
            >
              <img src={all_list} className="mr-2" alt="" />
              <span>{languageTranslation("SELECT_ALL_APPOINTMENT_OF_CG")}</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
              }
              onClick={() => {
                handleRightMenuToggle();
                setShowList(true);
              }}
            >
              <img src={detail_list} className="mr-2" alt="" />
              <span>{languageTranslation("DETAILED_LIST")}</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              // disabled={
              //   emailOptionCond !== undefined
              //     ? emailOptionCond && emailOptionCond.length !== 0
              //       ? "disabled-class"
              //       : ""
              //     : "disabled-class"
              // }
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                handleRightMenuToggle();
                updateCareInstitutionStatus("offered");
                handleCareGiverBulkEmail("division", true);
                // setOnOfferedCareInst();
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span>{languageTranslation("SORT_BY_DIVISION")}</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              // disabled={
              //   emailOptionCond !== undefined
              //     ? emailOptionCond && emailOptionCond.length !== 0
              //       ? "disabled-class"
              //       : ""
              //     : "disabled-class"
              // }
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
              }
              onClick={() => {
                handleCareGiverBulkEmail("day", true);
                handleCareInstitutionBulkEmail();
                updateCareInstitutionStatus("offered");
                // setOnOfferedCareInst();
                handleRightMenuToggle();
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span>{languageTranslation("SORT_BY_DAY")} </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              // disabled={
              //   emailOptionCond !== undefined
              //     ? emailOptionCond && emailOptionCond.length !== 0
              //       ? "disabled-class"
              //       : ""
              //     : "disabled-class"
              // }
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
              }
              onClick={() => {
                handleCareGiverBulkEmail("division", false);
                handleCareInstitutionBulkEmail();
                updateCareInstitutionStatus("offered");
                // setOnOfferedCareInst();
                handleRightMenuToggle();
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span>{languageTranslation("NO_DIREACT_BOOKING")}</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              // disabled={
              //   emailOptionCond !== undefined
              //     ? emailOptionCond && emailOptionCond.length !== 0
              //       ? "disabled-class"
              //       : ""
              //     : "disabled-class"
              // }
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
              }
              onClick={() => {
                handleCareGiverBulkEmail("day", false);
                handleCareInstitutionBulkEmail();
                updateCareInstitutionStatus("offered");
                // setOnOfferedCareInst();
                handleRightMenuToggle();
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span>{languageTranslation("NO_DIRECT_BOOKING_DAY")}</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              // disabled={
              //   setOnOfferCond !== undefined
              //     ? setOnOfferCond && setOnOfferCond.length !== 0
              //       ? "disabled-class"
              //       : ""
              //     : "disabled-class"
              // }
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
              }
            >
              <img src={set_confirm} className="mr-2" alt="" />
              <span
                onClick={() => {
                  handleRightMenuToggle();
                  updateCareInstitutionStatus("offered");
                }}
              >
                {languageTranslation("SET_ON_OFF")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              // disabled={
              //   resetOffCond !== undefined
              //     ? resetOffCond && resetOffCond.length !== 0
              //       ? "disabled-class"
              //       : ""
              //     : "disabled-class"
              // }
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
              }
            >
              <img src={unset_confirm} className="mr-2" alt="" />
              <span
                onClick={() => {
                  handleRightMenuToggle();
                  updateCareInstitutionStatus("notoffered");
                }}
              >
                {languageTranslation("RESET_OFF")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              className={
                connectAppCondition !== undefined
                  ? connectAppCondition && connectAppCondition.length !== 0
                    ? "disabled-class"
                    : ""
                  : "disabled-class"
              }
              onClick={() => {
                handleRightMenuToggle();
                handleLinkAppointments("link");
              }}
            >
              <img src={connect} className="mr-2" alt="" />
              <span>{languageTranslation("CONNECT_APPOINTMENT")}</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              // disabled={
              //   disconnectAppCond !== undefined
              //     ? disconnectAppCond && disconnectAppCond.length !== 0
              //       ? "disabled-class"
              //       : ""
              //     : "disabled-class"
              // }
              // disabled={
              //   selectedCellsCareinstitution
              //     ? selectedCellsCareinstitution.length === 0
              //     : true
              // }
              onClick={() => {
                handleRightMenuToggle();
                handleUnLinkAppointments("unlink");
              }}
            >
              <img src={disconnect} className="mr-2" alt="" />
              <span>{languageTranslation("DISCONNECT_APPOINTMENT")}</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              className={
                offerAppCond !== undefined
                  ? offerAppCond && offerAppCond.length !== 0
                    ? "disabled-class"
                    : ""
                  : "disabled-class"
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                setStatusTo("offered");
                setSortBy("day");
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span>{languageTranslation("OFFER_APPOINTMENT")}</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              className={
                offerAppCond !== undefined
                  ? offerAppCond && offerAppCond.length !== 0
                    ? "disabled-class"
                    : ""
                  : "disabled-class"
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                setStatusTo("offered");
                handleRightMenuToggle();
                setSortBy("division");
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span>{languageTranslation("OFFER_APPOINTMENT_DEPT")}</span>
            </NavLink>
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              className={
                offerAppCond !== undefined
                  ? offerAppCond && offerAppCond.length !== 0
                    ? "disabled-class"
                    : ""
                  : "disabled-class"
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                setStatusTo("confirmed");
                handleRightMenuToggle();
                updateCareInstitutionStatus("confirmed");
                // updateCareInstitutionStatus('confirmed');
                setSortBy("day");
                setConfirmAppointment(true);
              }}
            >
              <img src={confirm_appointment} className="mr-2" alt="" />
              <span>{languageTranslation("CONFIRM_APPOINTMENT_ORDER")} </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                offerAppCond !== undefined
                  ? offerAppCond && offerAppCond.length !== 0
                    ? "disabled-class"
                    : ""
                  : "disabled-class"
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                setStatusTo("confirmed");
                handleRightMenuToggle();
                updateCareInstitutionStatus("confirmed");
                setSortBy("division");
                setConfirmAppointment(true);
              }}
            >
              <img src={confirm_appointment} className="mr-2" alt="" />
              <span>{languageTranslation("CONFIRM_APP_DEPT")}</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                ((selectedCellsCareinstitution.length === 0 &&
                  selectedCellsCareinstitution[0] &&
                  selectedCellsCareinstitution[0].id === "") ||
                  (selectedCellsCareinstitution[0] &&
                    selectedCellsCareinstitution[0].item &&
                    selectedCellsCareinstitution[0].item.status !== "linked") ||
                  selectedCellsCareinstitution.filter(
                    (cell: any) => cell.item && cell.item.isLeasing
                  ).length > 0)
                  ? true
                  : false
              }
            >
              <img src={set_confirm} className="mr-2" alt="" />
              <span
                onClick={() => {
                  handleRightMenuToggle();
                  updateCareInstitutionStatus("confirmed");
                }}
              >
                {languageTranslation("SET_ON_CONF")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                ((selectedCellsCareinstitution.length &&
                  selectedCellsCareinstitution[0].id === "") ||
                  (selectedCellsCareinstitution[0] &&
                    selectedCellsCareinstitution[0].item &&
                    selectedCellsCareinstitution[0].item.status !==
                      "confirmed") ||
                  selectedCellsCareinstitution.filter(
                    (cell: any) => cell.item && cell.item.isLeasing
                  ).length > 0)
                  ? "disabled-class"
                  : ""
              }
            >
              <img src={unset_confirm} className="mr-2" alt="" />
              <span
                onClick={() => {
                  handleRightMenuToggle();
                  updateCareInstitutionStatus("notconfirm");
                }}
              >
                {languageTranslation("RESET_CONF")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              className={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                selectedCellsCareinstitution[0] &&
                selectedCellsCareinstitution[0].id === ""
                  ? "disabled-class"
                  : ""
              }
            >
              <img src={invoice} className="mr-2" alt="" />
              <span>{languageTranslation("CREATE_PAYMENT")}</span>
            </NavLink>
          </NavItem>
          {/* <NavItem className='bordernav' />
<NavItem>
<NavLink>
<img src={refresh} className='mr-2' alt='' />
<span>Refresh </span>
</NavLink>
</NavItem> */}
        </Nav>
      </div>
    </div>
  );
};
