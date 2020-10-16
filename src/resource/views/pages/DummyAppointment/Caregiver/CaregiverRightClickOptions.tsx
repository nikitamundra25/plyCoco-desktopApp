import React, { useState } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import new_appointment from "../../../../assets/img/dropdown/new_appointment.svg";
import reserve from "../../../../assets/img/dropdown/block.svg";
import delete_appointment from "../../../../assets/img/dropdown/delete.svg";
import detail_list from "../../../../assets/img/dropdown/detail_list.svg";
import filter from "../../../../assets/img/filter.svg";
import offer_sent from "../../../../assets/img/dropdown/offer_sent.svg";
import connect from "../../../../assets/img/dropdown/connect.svg";
import disconnect from "../../../../assets/img/dropdown/disconnect.svg";
import confirm_appointment from "../../../../assets/img/dropdown/confirm_appointment.svg";
import set_confirm from "../../../../assets/img/dropdown/confirm.svg";
import unset_confirm from "../../../../assets/img/dropdown/not_confirm.svg";
import leasing_contact from "../../../../assets/img/dropdown/leasing.svg";
import termination from "../../../../assets/img/dropdown/aggrement.svg";
import classnames from "classnames";

export const CaregiverRightClickOptions = ({ isOpen, hide }: any) => {
  return (
    <div
      className={classnames({
        "rightclick-menu top-open": true,
        "d-none": !isOpen,
      })}>
      <Nav vertical>
        <NavItem>
          <NavLink
            // disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              hide();
              // onNewAvailability ? onNewAvailability() : undefined;
            }}>
            <img src={new_appointment} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("NEW_APPOINTMENT")}
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              hide();
            }}>
            <img src={reserve} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("RESERVE")}
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              hide();
            }}>
            <img src={delete_appointment} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("DELETE_FREE_CALENDER")}
            </span>
          </NavLink>{" "}
        </NavItem>
        <NavItem className='bordernav' />
        <NavItem>
          <NavLink
            // disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              hide();
            }}>
            <img src={detail_list} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("DETAILED_LIST")}
            </span>
          </NavLink>{" "}
        </NavItem>
        <NavItem className='bordernav' />
        <NavItem
          // disabled={selectedCells ? selectedCells.length === 0 : true}
          onClick={() => {
            hide();
            // onCaregiverQualificationFilter
            //   ? onCaregiverQualificationFilter()
            //   : undefined;
          }}>
          <NavLink
          // disabled={selectedCells ? selectedCells.length === 0 : true}
          >
            <img src={filter} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("FILTER_BY_QUALI")}
            </span>
          </NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink
            // disabled={
            //   selectedCells
            //     ? selectedCells.length === 0 ||
            //       (offferAll && offferAll.length !== 0) ||
            //       (checkQuali && checkQuali.length === 0)
            //     : true
            // }
            onClick={() => {
              hide();
              // setOfferRequirements(true);
              // handleCareGiverBulkEmail();
            }}>
            <img src={offer_sent} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("OFFER_ALL_CALENDER")}
            </span>
          </NavLink>{" "}
        </NavItem>
        <NavItem className='bordernav' />
        <NavItem>
          <NavLink
            // disabled={
            //   selectedCells
            //     ? selectedCells.length === 0 ||
            //       (connectAppCondition && connectAppCondition.length !== 0)
            //     : true
            // }
            onClick={() => {
              hide();
              // handleLinkAppointments("link");
            }}>
            <img src={connect} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("CONNECT_APPOINTMENT")}
            </span>
          </NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink
            // disabled={
            //   selectedCells
            //     ? selectedCells.length === 0 ||
            //     (disconnectAppCond && disconnectAppCond.length !== 0)
            //     : true
            // }
            // disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              hide();
              // handleUnLinkAppointments();
            }}>
            <img src={disconnect} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("DISCONNECT_APPOINTMENT")}
            </span>
          </NavLink>
        </NavItem>
        <NavItem className='bordernav' />
        <NavItem>
          <NavLink
            // disabled={
            //   selectedCells
            //     ? selectedCells.length === 0 ||
            //       (disconnectAppCond && disconnectAppCond.length !== 0) ||
            //       isLeasingAppointment
            //     : true
            // }
            onClick={() => {
              hide();
              // updateCaregiverStatus("confirmed");
              // setconfirmApp(true);
              // handleCareGiverBulkEmail();
            }}>
            <img src={confirm_appointment} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("CONFIRM_APPOINTMENT")}
            </span>
          </NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink
          // disabled={
          //   selectedCells
          //     ? selectedCells.length === 0 ||
          //       (selectedCells[0].item &&
          //         selectedCells[0].item.status !== "linked") ||
          //       isLeasingAppointment
          //     : true
          // }
          >
            <img src={set_confirm} className='mr-2' alt='' />
            <span
              className='align-middle'
              onClick={() => {
                hide();
                // updateCaregiverStatus("confirmed");
              }}>
              {languageTranslation("SET_ON_CONF")}
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
          // disabled={
          //   selectedCells
          //     ? selectedCells.length === 0 ||
          //       (selectedCells[0].item &&
          //         selectedCells[0].item.status !== "confirmed") ||
          //       isLeasingAppointment
          //     : true
          // }
          >
            <img src={unset_confirm} className='mr-2' alt='' />
            <span
              className='align-middle'
              onClick={() => {
                hide();
                // updateCaregiverStatus("notconfirmed");
              }}>
              {languageTranslation("SET_ON_NOT_CONF")}
            </span>
          </NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink
            // disabled={
            //   selectedCells && selectedCells.length
            //     ? selectedCells.filter(
            //         (availability: any) =>
            //           (availability && !availability.item) ||
            //           !isLeasingAppointment ||
            //           (availability.item &&
            //             availability.item.appointments &&
            //             availability.item.appointments.length &&
            //             availability.item.appointments[0] &&
            //             availability.item.appointments[0].cr &&
            //             availability.item.appointments[0].cr.status !==
            //               "confirmed")
            //       ).length
            //       ? true
            //       : false
            //     : true
            // }
            onClick={() => {
              hide();
              // setleasingContract(true);
              // handleCareGiverBulkEmail();
            }}>
            <img src={leasing_contact} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("REQUEST_TEMP_LEASING")}
            </span>
          </NavLink>{" "}
        </NavItem>
        <NavItem>
          <NavLink
            // disabled={
            //   selectedCells
            //     ? selectedCells.length === 0 || !isLeasingAppointment
            //     : true
            // }
            onClick={() => {}}>
            <img src={termination} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation("CREATE_TERMINATION_AGREEMENT")}
            </span>
          </NavLink>{" "}
        </NavItem>
      </Nav>
    </div>
  );
};
