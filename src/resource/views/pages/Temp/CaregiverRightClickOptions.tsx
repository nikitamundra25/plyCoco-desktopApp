import React from "react";
import classnames from "classnames";
import { languageTranslation } from "../../../../helpers";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import reserve from "../../../assets/img/dropdown/block.svg";
import new_appointment from "../../../assets/img/dropdown/new_appointment.svg";
import delete_appointment from "../../../assets/img/dropdown/delete.svg";
import detail_list from "../../../assets/img/dropdown/detail_list.svg";
import filter from "../../../assets/img/filter.svg";
import offer_sent from "../../../assets/img/dropdown/offer_sent.svg";
import connect from "../../../assets/img/dropdown/connect.svg";
import disconnect from "../../../assets/img/dropdown/disconnect.svg";
import confirm_appointment from "../../../assets/img/dropdown/confirm_appointment.svg";
import set_confirm from "../../../assets/img/dropdown/confirm.svg";
import unset_confirm from "../../../assets/img/dropdown/not_confirm.svg";
import leasing_contact from "../../../assets/img/dropdown/leasing.svg";
import termination from "../../../assets/img/dropdown/aggrement.svg";

export const CaregiverRightClickOptions = ({
  isOpen,
  hide,
  selectedCells,
}: any) => {
  return (
    <>
      <div
        className={classnames({
          "rightclick-menu top-open": true,
          "d-none": !isOpen,
        })}>
        <Nav vertical>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
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
                // onReserve ? onReserve() : undefined;
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
                // onDeleteEntries ? onDeleteEntries('caregiver') : undefined;
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
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                hide();
                // setShowList(true);
              }}>
              <img src={detail_list} className='mr-2' alt='' />
              <span className='align-middle'>
                {languageTranslation("DETAILED_LIST")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem
            disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              hide();
              // onCaregiverQualificationFilter
              //   ? onCaregiverQualificationFilter()
              //   : undefined;
            }}>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}>
              <img src={filter} className='mr-2' alt='' />
              <span className='align-middle'>
                {languageTranslation("FILTER_BY_QUALI")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              /* disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (offferAll && offferAll.length !== 0) ||
                    (checkQuali && checkQuali.length === 0)
                  : true
              } */
              onClick={() => {
                hide();
                // setOfferRequirements(true);
                // setopenCareGiverBulkEmail(true);
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
            <NavLink>
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
            <NavLink onClick={() => {}}>
              <img src={termination} className='mr-2' alt='' />
              <span className='align-middle'>
                {languageTranslation("CREATE_TERMINATION_AGREEMENT")}
              </span>
            </NavLink>{" "}
          </NavItem>
        </Nav>
      </div>
    </>
  );
};
