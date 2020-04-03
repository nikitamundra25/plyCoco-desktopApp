import React, { FunctionComponent, useState, useEffect } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import classnames from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-virtualized/styles.css"; // only needs to be imported once

import { toast } from "react-toastify";
import { SelectableGroup } from "react-selectable-fast";
import {
  IAppointmentCareGiverList,
  IDaysArray
} from "../../../../../interfaces";
import {
  appointmentDateFormat,
  AppRoutes,
  selfEmployesListColor,
  leasingListColor,
  CaregiverTIMyoCYAttrId,
  deactivatedListColor
} from "../../../../../config";
import { dbAcceptableFormat } from "../../../../../config";
import { languageTranslation } from "../../../../../helpers";
import Loader from "../../../containers/Loader/Loader";
import Cell from "./Cell";
import DetaillistCaregiverPopup from "../DetailedList/DetailListCaregiver";
import BulkEmailCareGiverModal from "../BulkEmailCareGiver";
import UnlinkAppointment from "../unlinkModal";
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
import refresh from "../../../../assets/img/refresh.svg";
import "../index.scss";
import BulkEmailCareInstitutionModal from "../BulkEmailCareInstitution";
import {
  InfiniteLoader,
  Table,
  ScrollSync,
  AutoSizer,
  List
} from "react-virtualized";
// import styles from "react-virtualized/dist/";
// const { Table, Column, AutoSizer, InfiniteLoader } = ReactVirtualized

let toastId: any = null;
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

const CaregiverListView: FunctionComponent<IAppointmentCareGiverList> = (
  props: IAppointmentCareGiverList
) => {
  const {
    daysData,
    careGiversList,
    loading,
    onAddingRow,
    selectedCells,
    handleSelection,
    handleSecondStar,
    handleReset,
    onReserve,
    onDeleteEntries,
    onCaregiverQualificationFilter,
    selectedCellsCareinstitution,
    onLinkAppointment,
    // setOnConfirmedCaregiver,
    // setOnNotConfirmedCaregiver,
    onNewAvailability,
    totalCaregiver,
    getNext,
    qualificationList,
    locationState,
    onTerminateAggrement,
    updateLinkedStatus,
    updateCaregiverStatus
  } = props;

  const [starMark, setstarMark] = useState<boolean>(false);
  const [offerRequirements, setOfferRequirements] = useState<boolean>(false);
  const [openToggleMenu, setopenToggleMenu] = useState<boolean>(false);
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);
  const [leasingContract, setleasingContract] = useState<boolean>(false);

  const onhandleSecondStar = (list: object, index: number, name: string) => {
    if (!starMark) {
      setstarMark(!starMark);
      handleSecondStar(list, index, name);
    } else {
      setstarMark(!starMark);
      handleReset(name);
    }
  };

  const handleToggleMenuItem = () => {
    setopenToggleMenu(!openToggleMenu);
  };

  //State for care giver bulk email
  const [openCareGiverBulkEmail, setopenCareGiverBulkEmail] = useState<boolean>(
    false
  );

  // state for care institution bulk email
  const [
    openCareInstitutionBulkEmail,
    setopenCareInstitutionBulkEmail
  ] = useState<boolean>(false);
  const [terminateAggrement, setTerminateAggrement] = useState(false);

  // Open care giver bulk Email section
  const handleCareGiverBulkEmail = () => {
    // if (terminateAggrement) {
    //   setTerminateAggrement(false);
    // }
    setopenCareGiverBulkEmail(true);
  };

  // To close the email pop-up
  const handleClose = () => {
    setopenCareGiverBulkEmail(false);
    setconfirmApp(false);
    setunlinkedBy('');
    setOfferRequirements(false);
    setleasingContract(false);
    setTerminateAggrement(false);
  };

  const { daysArr = [] } = daysData ? daysData : {};
  // select multiple
  // const [selectedDays, setSelectedDays] = useState<any[]>([]);

  const onSelectFinish = (selectedCellsData: any[]) => {
    let selectedRows: any[] = [];
    if (selectedCellsData && selectedCellsData.length) {
      selectedRows = selectedCellsData.map((selectedCell: any) => {
        const { props: cellProps } = selectedCell;
        const { item, list: caregiverData, day } = cellProps;
        const {
          id = '',
          firstName = "",
          lastName = "",
          email = "",
          caregiver = {},
          qualificationId = []
        } = caregiverData ? caregiverData : {};
        return {
          id,
          firstName,
          lastName,
          email,
          caregiver,
          item,
          qualificationIds: qualificationId,
          dateString: day ? day.dateString : ""
        };
      });
      // setSelect({id:12})
      // setSelect([12]);
      // setSelect1([12])

      handleSelection ? handleSelection(selectedRows, "caregiver") : undefined;
      // for (let index = 0; index < selected.length; index++) {
      //   const { item, list, dateString } = selected[index];
      //   selctedAvailability = item;
      //   selectedRows.push({
      //     id: list.id,
      //     qualificationIds: list.qualificationId,
      //     item,
      //     dateString,
      //   });
      // }
    }
  };
  // const onSelectionClear = () => {
  //   setSelectedDays([]);
  // };

  // Link appointments
  const handleLinkAppointments = (name: string) => {
    let selectedData: any = [],
      checkError: boolean = false;
    if (
      selectedCellsCareinstitution &&
      selectedCellsCareinstitution.length &&
      selectedCells &&
      selectedCells.length
    ) {
      console.log('selectedCellsCareinstitution', selectedCellsCareinstitution);
      console.log('selectedCells', selectedCells);

      if (selectedCellsCareinstitution.length !== selectedCells.length) {
        if (!toast.isActive(toastId)) {
          toastId = toast.error("Please select same length cells");
        }
      } else {
        let qualiCheck: any[] = [];
        selectedCells.map((key: any, index: number) => {
          const element = selectedCellsCareinstitution[index];
          if (
            key.qualificationIds &&
            key.qualificationIds.length &&
            element.item.qualificationId &&
            element.item.qualificationId.length
          ) {
            qualiCheck = element.item.qualificationId.filter((e: any) =>
              key.qualificationIds.includes(e.value)
            );
          }
          if (qualiCheck && qualiCheck.length <= 0) {
            if (!toast.isActive(toastId)) {
              toastId = toast.error(
                languageTranslation("QUALIFICATION_UNMATCH")
              );
            }
            checkError = true;
            return true;
          }
          if (
            moment(key.dateString).format(dbAcceptableFormat) !==
            moment(element.dateString).format(dbAcceptableFormat)
          ) {
            checkError = true;
            if (!toast.isActive(toastId)) {
              toastId = toast.error(
                "Date range between appointments & requirement mismatch."
              );
            }
            return false;
          } else if (key.item === undefined || element.item === undefined) {
            checkError = true;
            if (!toast.isActive(toastId)) {
              toastId = toast.error(
                "Create requirement or appointment first for all selected cells."
              );
            }
            return false;
          } else {
            if (!checkError) {
              selectedData.push({
                avabilityId: parseInt(key.item.id),
                requirementId: parseInt(element.item.id),
                date: moment(element.dateString).format(dbAcceptableFormat),
                status: "appointment"
              });
            }
          }
        });
        if (!checkError) {
          onLinkAppointment(selectedData, name);
        }
      }
    }
  };

  const [confirmApp, setconfirmApp] = useState<boolean>(false);
  //unLinked by
  const [unlinkedBy, setunlinkedBy] = useState("");
  //  UnLink appointmnets
  const handleUnLinkAppointments = () => {
    setshowUnlinkModal(!showUnlinkModal);
  };
  const [isFromUnlink, setisFromUnlink] = useState(false);
  const handleUnlinkData = (likedBy: string, check: boolean) => {
    setunlinkedBy(likedBy);
    let appointmentId: any = [];
    if (selectedCells && selectedCells.length) {
      selectedCells.map((key: any, index: number) => {
        if (key.item && key.item.appointments && key.item.appointments.length) {
          // let appointId: any = key.item.appointments.filter(
          //   (appointment: any) => {
          //     return (
          //       moment(key.dateString).format('DD.MM.YYYY') ===
          //       moment(appointment.date).format('DD.MM.YYYY')
          //     );
          //   }
          // );
          return appointmentId.push({
            appointmentId: parseInt(
              key.item.appointments ? key.item.appointments[0].id : ""
            ),
            unlinkedBy: likedBy,
            deleteAll: check
          });
        }
      });
      onLinkAppointment(appointmentId, "unlink");
      if (likedBy !== "employee") {
        setisFromUnlink(true);
        setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
        setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
      }
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error("Please select appointment/s.");
      }
    }
  };

  // open care institution bulk Email section
  const handleCareInstitutionBulkEmail = () => {
    setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
    if (openCareInstitutionBulkEmail) {
      setunlinkedBy("");
    }
  };

  const [showList, setShowList] = useState<boolean>(false);
  //to apply condition on disconnect appointments
  let disconnectAppCond: any;
  if (selectedCells && selectedCells.length) {
    disconnectAppCond = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.item && x.item.status !== "linked";
      } else {
        return ["abc"];
      }
    });
  }
  //to apply condition on connect appointments
  let connectAppCondition: any;
  if (selectedCells && selectedCells.length) {
    connectAppCondition = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.item && x.item.status !== "default";
      } else {
        return ["abc"];
      }
    });
  }
  let offferAll: any = [];
  if (selectedCells && selectedCells.length) {
    offferAll = selectedCells.filter((x: any) => {
      if (x.item) {
        return (
          x.item &&
          x.item.f === "block" &&
          x.item.s === "block" &&
          x.item.n === "block"
        );
      } else {
        return ["abc"];
      }
    });
  }
  let checkQuali: any = [];
  if (selectedCells && selectedCells.length) {
    checkQuali = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.qualificationIds && x.qualificationIds.length;
      } else {
        return ["abc"];
      }
    });
  }
  let checkAttribute: any = [];
  if (selectedCells && selectedCells.length) {
    checkAttribute = selectedCells.filter((x: any) => {
      if (x && x.caregiver && x.caregiver.attributes) {
        return x.caregiver.attributes && x.caregiver.attributes.length
          ? x.caregiver.attributes.includes("101")
          : "";
      } else {
        return ["abc"];
      }
    });
  }
  let sortedQualificationList: any = [];
  if (selectedCells && selectedCells.length) {
    selectedCells.map((list: any, index: number) => {
      if (list && list.item && list.item.qualificationId) {
        let qualificationId = list.item.qualificationId;
        qualificationId.map((key: any, i: number) => {
          if (
            sortedQualificationList.findIndex(
              (item: any) => item && item === key.value
            ) < 0
          ) {
            return (sortedQualificationList = [
              ...sortedQualificationList,
              key.value
            ]);
          }
        });
      }
    });
  }
  // to check if the careinst is leasing
  let checkLeasing: any = 1;
  if (selectedCells && selectedCells.length) {
    selectedCells.filter((x: any) => {
      if (x.item && x.item.appointments) {
        x.item.appointments.map((st: any) => {
          return (checkLeasing =
            st && st.cr && st.cr.status ? st.cr.status : '');
        });
      }
    });
  }

  // To check appointment with leasing careInst or not
  let isLeasingAppointment = false;
  if (selectedCells && selectedCells.length) {
    isLeasingAppointment = selectedCells.filter(
      (cell: any) =>
        cell &&
        cell.item &&
        cell.item.appointments &&
        cell.item.appointments.length &&
        cell.item.appointments[0].cr &&
        cell.item.appointments[0].cr.isLeasing
    ).length
      ? true
      : false;
  }
  console.log(isLeasingAppointment, 'isLeasingAppointment');

  return (
    <div>
      <div
        className={classnames({
          "right-manu-close": true,
          "d-none": !openToggleMenu
        })}
        onClick={handleToggleMenuItem}
      ></div>
      <div
        className={classnames({
          "rightclick-menu top-open": true,
          // "custom-scrollbar": true,
          "d-none": !openToggleMenu
        })}
      >
        <Nav vertical>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                onNewAvailability ? onNewAvailability() : undefined;
              }}
            >
              <img src={new_appointment} className="mr-2" alt="" />
              <span className="align-middle">New appointment</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                onReserve ? onReserve() : undefined;
              }}
            >
              <img src={reserve} className="mr-2" alt="" />
              <span className="align-middle">Reserve</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells && selectedCells.length
                  ? selectedCells.filter(
                      (availability: any) =>
                        (availability && !availability.item) ||
                        (availability.item &&
                          availability.item.status === "default")
                    ).length
                    ? false
                    : true
                  : true
              }
              // disabled={
              //   selectedCells
              //     ? selectedCells.length === 0 ||
              //       (connectAppCondition && connectAppCondition.length !== 0)
              //     : true
              // }
              onClick={() => {
                setopenToggleMenu(false);
                onDeleteEntries ? onDeleteEntries("caregiver") : undefined;
              }}
            >
              <img src={delete_appointment} className="mr-2" alt="" />
              <span className="align-middle">
                Delete free and reserved calender entries
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                setShowList(true);
              }}
            >
              <img src={detail_list} className="mr-2" alt="" />
              <span className="align-middle">Detailed List</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem
            disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              setopenToggleMenu(false);
              onCaregiverQualificationFilter
                ? onCaregiverQualificationFilter()
                : undefined;
            }}
          >
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
            >
              <img src={filter} className="mr-2" alt="" />
              <span className="align-middle">
                Filter by qualifications of caregiver
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
                setopenToggleMenu(false);
                setOfferRequirements(true);
                handleCareGiverBulkEmail();
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span className="align-middle">
                Offer all available calendar entries
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (connectAppCondition && connectAppCondition.length !== 0)
                  : true
              }
              onClick={() => {
                setopenToggleMenu(false);
                handleLinkAppointments("link");
              }}
            >
              <img src={connect} className="mr-2" alt="" />
              <span className="align-middle">Connect appointments</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (disconnectAppCond && disconnectAppCond.length !== 0)
                  : true
              }
              onClick={() => {
                setopenToggleMenu(false);
                handleUnLinkAppointments();
              }}
            >
              <img src={disconnect} className="mr-2" alt="" />
              <span className="align-middle">Disconnect appointments</span>
            </NavLink>
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (disconnectAppCond && disconnectAppCond.length !== 0) ||
                    isLeasingAppointment
                  : true
              }
              onClick={() => {
                // setOnConfirmedCaregiver();
                setconfirmApp(true);
                setopenToggleMenu(false);
                handleCareGiverBulkEmail();
                // setOnConfirmedCaregiver();
              }}
            >
              <img src={confirm_appointment} className="mr-2" alt="" />
              <span className="align-middle">Confirmed appointments</span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (selectedCells[0].item &&
                      selectedCells[0].item.status !== 'linked') ||
                    isLeasingAppointment
                  : true
              }
            >
              <img src={set_confirm} className="mr-2" alt="" />
              <span
                className="align-middle"
                onClick={() => {
                  setopenToggleMenu(false);
                  // setOnConfirmedCaregiver();
                }}
              >
                Set on confirmed
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (selectedCells[0].item &&
                      selectedCells[0].item.status !== 'confirmed') ||
                    isLeasingAppointment
                  : true
              }
            >
              <img src={unset_confirm} className="mr-2" alt="" />
              <span
                className="align-middle"
                onClick={() => {
                  setopenToggleMenu(false);
                  // setOnNotConfirmedCaregiver();
                }}
              >
                Set on not confirmed
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells && selectedCells.length
                  ? selectedCells.filter(
                      (availability: any) =>
                        (availability && !availability.item) ||
                        !isLeasingAppointment ||
                        (availability.item &&
                          availability.item.appointments &&
                          availability.item.appointments.length &&
                          availability.item.appointments[0] &&
                          availability.item.appointments[0].cr &&
                          availability.item.appointments[0].cr.status !==
                            'confirmed')
                    ).length
                    ? true
                    : false
                  : true
              }
              // disabled={
              //   selectedCells
              //     ? selectedCells.length === 0 || checkLeasing === 1
              //     : true
              // }
              onClick={() => {
                setopenToggleMenu(false);
                setleasingContract(true);
                handleCareGiverBulkEmail();
              }}
            >
              <img src={leasing_contact} className="mr-2" alt="" />
              <span className="align-middle">
                Request temporary leasing contract
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 || !isLeasingAppointment
                  : true
              }
              onClick={() => {
                // onTerminateAggrement();
                setopenToggleMenu(false);
                setTerminateAggrement(true);
                handleCareGiverBulkEmail();
              }}
            >
              <img src={termination} className="mr-2" alt="" />
              <span className="align-middle">Create termination agreement</span>
            </NavLink>{" "}
          </NavItem>
          {/*<NavItem className='bordernav' />
          <NavItem>
            <NavLink>
              <img src={refresh} className='mr-2' alt='' />
              <span className='align-middle'>Refresh</span>
            </NavLink>
          </NavItem> */}
        </Nav>
      </div>
      <div className="position-relative">
        <div className="calender-section">
          <div className="custom-appointment-calendar">
            <div className="custom-appointment-calendar-head">
              <div className="custom-appointment-row ">
                {/* <div className="custom-appointment-col name-col">Caregiver</div> */}
                <div className="custom-appointment-col name-col">
                  <div className="position-relative  username-col align-self-center">
                    {languageTranslation("MENU_CAREGIVER")}
                    <Button
                      onClick={() => handleToggleMenuItem()}
                      className="btn-more d-flex align-items-center justify-content-center"
                    >
                      <i className="icon-options-vertical" />
                    </Button>
                  </div>
                </div>
                <div className="custom-appointment-col h-col">H</div>
                <div className="custom-appointment-col s-col text-center">
                  S
                </div>
                <div className="custom-appointment-col u-col text-center">
                  U
                </div>
                <div className="custom-appointment-col v-col text-center">
                  V
                </div>
                {/* array for showing day */}
                {daysArr.map(
                  (
                    { date, day, isoString, isWeekend }: IDaysArray,
                    index: number
                  ) => {
                    return (
                      <div
                        className="custom-appointment-col calender-col text-center"
                        key={index}
                      >
                        <div className="custom-appointment-calendar-date">
                          {" "}
                          {date}
                        </div>
                        <div className="custom-appointment-calendar-day">
                          {day}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="custom-appointment-calendar-body">
            {careGiversList && careGiversList.length ? (
                <SelectableGroup
                  allowClickWithoutSelected
                  className="custom-row-selector"
                  clickClassName="tick"
                  resetOnStart={true}
                  onSelectionFinish={onSelectFinish}
                  ignoreList={[
                    ".name-col",
                    ".h-col",
                    ".s-col",
                    ".u-col",
                    ".v-col"
                  ]}
                > 
              <InfiniteLoader
                isRowLoaded={({ index }) => !!careGiversList[index]}
                // loadMoreRows={loadMore}
                rowCount={totalCaregiver}
                loadMoreRows={({ startIndex, stopIndex }) => 
                  getNext(careGiversList.lrngth) as any
                }
              >
                {({ onRowsRendered, registerChild }) => (
                  <AutoSizer className="autosizer-div">
                    {({ width }) => (
                  <List
                    ref={registerChild}
                    height={200}
                    onRowsRendered={onRowsRendered}
                    rowCount={careGiversList.length}
                    rowHeight={30}
                    width={1538}
                    // rowGetter={({ index }:any) => careGiversList[index]}
                    rowRenderer={({ index, isScrolling, key, style }) => {
                      const list = careGiversList[index] || {};
                      return (
                        // <div key={key} style={style}>
                        list.availabilityData &&
                          list.availabilityData.length
                          ? list.availabilityData.map(
                              (item: any, row: number) => (
                                <div
                                  className="custom-appointment-row"
                                  key={`${list.id}-${index}-${row}-${key}`}
                                  style={style}
                                >
                                  <div
                                    className="custom-appointment-col name-col appointment-color1 text-capitalize view-more-link one-line-text"
                                    style={{
                                      backgroundColor: !list.isActive
                                        ? deactivatedListColor
                                        : list.caregiver &&
                                          list.caregiver.attributes
                                        ? list.caregiver.attributes.includes(
                                            CaregiverTIMyoCYAttrId
                                          )
                                          ? leasingListColor
                                          : list.caregiver.attributes.includes(
                                              "Plycoco"
                                            )
                                          ? selfEmployesListColor
                                          : ""
                                        : ""
                                    }}
                                    title={[
                                      list.lastName,
                                      list.firstName
                                    ].join(" ")}
                                    id={`caregiver-${list.id}`}
                                  >
                                    <Link
                                      to={AppRoutes.CARE_GIVER_VIEW.replace(
                                        ":id",
                                        list.id
                                      )}
                                      target="_blank"
                                      className="text-body"
                                    >
                                      {row === 0
                                        ? [
                                            list.lastName,
                                            list.firstName
                                          ].join(" ")
                                        : ""}
                                    </Link>
                                  </div>
                                  <div className="custom-appointment-col h-col appointment-color2"></div>
                                  <div
                                    className="custom-appointment-col s-col text-center"
                                    onClick={() =>
                                      onhandleSecondStar(
                                        list,
                                        index,
                                        "caregiver"
                                      )
                                    }
                                  >
                                    {starMark ? (
                                      <i className="fa fa-star theme-text" />
                                    ) : (
                                      <i className="fa fa-star-o" />
                                    )}
                                  </div>
                                  <div
                                    className="custom-appointment-col u-col text-center"
                                    onClick={() =>
                                      onhandleSecondStar(
                                        list,
                                        index,
                                        "caregiver"
                                      )
                                    }
                                  >
                                    {starMark ? (
                                      <i className="fa fa-star theme-text" />
                                    ) : (
                                      <i className="fa fa-star-o" />
                                    )}
                                  </div>
                                  <div
                                    className="custom-appointment-col v-col text-center"
                                    onClick={e =>
                                      onAddingRow(e, "caregiver", index)
                                    }
                                  >
                                    <i className="fa fa-arrow-down" />
                                  </div>
                                  {daysArr.map((key: any, i: number) => {
                                    return (
                                      <Cell
                                        key={`${key}-${i}`}
                                        daysArr={key.isWeekend}
                                        day={key}
                                        list={list}
                                        fetchDataValues={
                                          props.fetchDataValues
                                        }
                                        item={
                                          item.filter(
                                            (avabilityData: any) => {
                                              return (
                                                moment(
                                                  key.isoString
                                                ).format("DD.MM.YYYY") ===
                                                moment(
                                                  avabilityData.date
                                                ).format("DD.MM.YYYY")
                                              );
                                            }
                                          )[0]
                                        }
                                        handleSelection={handleSelection}
                                        selectedCells={selectedCells}
                                        selectedCellsCareinstitution={
                                          selectedCellsCareinstitution
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              )
                            )
                          : ""
                        // </div>
                      );
                    }}
                  />
                  )}
                  </AutoSizer>
                )}
              </InfiniteLoader>
              </SelectableGroup>
              ) : (
                <div className="no-data-section pt-5 pb-5 bg-white text-center">
                  <div className="no-data-icon">
                    <i className="icon-ban" />
                  </div>
                  <h4 className="mb-1">
                    Currently there are no CareGiver added.{" "}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openCareGiverBulkEmail ?
      <BulkEmailCareGiverModal
        updateLinkedStatus={props.fetchingCareGiverData}
        openModal={openCareGiverBulkEmail}
        qualification={
          sortedQualificationList && sortedQualificationList
            ? sortedQualificationList
            : props.qualification
        }
        handleClose={handleClose}
        gte={props.gte}
        lte={props.lte}
        selectedCells={selectedCells}
        confirmApp={confirmApp}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        unlinkedBy={unlinkedBy}
        isFromUnlink={isFromUnlink}
        qualificationList={qualificationList}
        offerRequirements={offerRequirements}
        terminateAggrement={terminateAggrement}
        leasingContract={leasingContract}
      /> : null}
      <BulkEmailCareInstitutionModal
        openModal={openCareInstitutionBulkEmail}
        handleClose={() => handleCareInstitutionBulkEmail()}
        qualification={
          sortedQualificationList && sortedQualificationList
            ? sortedQualificationList
            : props.qualification
        }
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={props.gte}
        lte={props.lte}
        unlinkedBy={unlinkedBy}
        isFromUnlink={isFromUnlink}
      />
      <DetaillistCaregiverPopup
        show={showList ? true : false}
        handleClose={() => setShowList(false)}
        selectedCells={selectedCells}
        qualificationList={qualificationList}
      />
      <UnlinkAppointment
        show={showUnlinkModal}
        handleClose={() => setshowUnlinkModal(false)}
        handleUnlinkData={handleUnlinkData}
      />
    </div>
  );
};

export default CaregiverListView;
