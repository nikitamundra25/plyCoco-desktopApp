import React, { FunctionComponent, useState, Suspense, lazy } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import classnames from "classnames";
import { toast } from "react-toastify";
import { SelectableGroup } from "react-selectable-fast";
import {
  InfiniteLoader,
  Table,
  ScrollSync,
  AutoSizer,
  List,
} from "react-virtualized";
import {
  IAppointmentCareGiverList,
  IDaysArray,
} from "../../../../../interfaces";
import {
  AppRoutes,
  selfEmployesListColor,
  leasingListColor,
  CaregiverTIMyoCYAttrId,
  deactivatedListColor,
} from "../../../../../config";
import { dbAcceptableFormat } from "../../../../../config";
import { languageTranslation } from "../../../../../helpers";
import Loader from "../../../containers/Loader/Loader";
import Cell from "./Cell";
// import DetaillistCaregiverPopup from '../DetailedList/DetailListCaregiver';
// const BulkEmailCareGiverModal = React.lazy(() => import('../BulkEmailCareGiver'));
// import UnlinkAppointment from '../unlinkModal';
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
// import BulkEmailCareInstitutionModal from '../BulkEmailCareInstitution';
import { ConfirmBox } from "../../../components/ConfirmBox";
import "../index.scss";
import "react-virtualized/styles.css"; // only needs to be imported once
import BulkEmailCareGiverModal from "../BulkEmailCareGiver";
import UnlinkAppointment from "../unlinkModal";
import DetaillistCaregiverPopup from "../DetailedList/DetailListCaregiver";
import BulkEmailCareInstitutionModal from "../BulkEmailCareInstitution";
let toastId: any = null;

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
    updateCaregiverStatus,
    onhandleCaregiverStar,
    starMarkCaregiver,
    starCaregiver,
  } = props;

  const [offerRequirements, setOfferRequirements] = useState<boolean>(false);
  const [openToggleMenu, setopenToggleMenu] = useState<boolean>(false);
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);
  const [leasingContract, setleasingContract] = useState<boolean>(false);

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
    setopenCareInstitutionBulkEmail,
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
    console.log("in handleClose");
    if (
      (leasingContract || terminateAggrement) &&
      props.fetchingCareGiverData
    ) {
      console.log("in if");
      props.fetchingCareGiverData();
    }
    setopenCareGiverBulkEmail(false);
    setconfirmApp(false);
    setunlinkedBy("");
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
          id = "",
          firstName = "",
          lastName = "",
          email = "",
          caregiver = {},
          qualificationId = [],
        } = caregiverData ? caregiverData : {};
        return {
          id,
          firstName,
          lastName,
          email,
          caregiver,
          item,
          qualificationIds: qualificationId,
          dateString: day ? day.dateString : "",
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
  const handleLinkAppointments = async (name: string) => {
    let selectedData: any = [],
      checkError: boolean = false;
    if (
      selectedCellsCareinstitution &&
      selectedCellsCareinstitution.length &&
      selectedCells &&
      selectedCells.length
    ) {
      if (selectedCellsCareinstitution.length !== selectedCells.length) {
        toast.dismiss();
        if (!toast.isActive(toastId)) {
          toastId = toast.error(languageTranslation("LINK_SAME_LENGTH"));
        }
      } else {
        if (
          selectedCells[0].caregiver &&
          selectedCells[0].caregiver.attributes &&
          selectedCells[0].caregiver.attributes.length
        ) {
          let checkAttribute = selectedCells[0].caregiver.attributes.includes(
            8
          );
          if (checkAttribute) {
            const { value } = await ConfirmBox({
              title: languageTranslation("ATTRIBUTE_WARNING"),
              text: languageTranslation("LINKED_ATTRIBUTE_WARNING"),
            });
            if (!value) {
              checkError = true;
              return;
            }
          }
        }

        let qualiCheck: any[] = [];
        selectedCells.map(async (key: any, index: number) => {
          const element = selectedCellsCareinstitution[index];
          if (
            key.item.fee &&
            key.item.weekendAllowance &&
            key.item.holidayAllowance &&
            key.item.nightFee
          ) {
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
              toast.dismiss();
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
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.error(
                  languageTranslation("DATE_RANGE_MISMATCH")
                );
              }
              return false;
            } else if (key.item === undefined || element.item === undefined) {
              checkError = true;
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.error(languageTranslation("LINK_ERROR"));
              }
              return false;
            } else {
              if (!checkError) {
                selectedData.push({
                  avabilityId: parseInt(key.item.id),
                  requirementId: parseInt(element.item.id),
                  date: moment(element.dateString).format(dbAcceptableFormat),
                  status: "appointment",
                });
              }
            }
          } else {
            checkError = true;
            const { value } = await ConfirmBox({
              title: languageTranslation("FEES_ERROR_MESSAGE"),
              text: languageTranslation("LINKED_FEES_MESSAGE"),
              type: "error",
              showCancelButton: false,
              confirmButtonText: "Ok",
            });
            return;
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
            deleteAll: check,
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
        toastId = toast.error(languageTranslation("SELECT_APPOINTMENT"));
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
        if (
          x.item.f !== "block" ||
          x.item.s !== "block" ||
          x.item.n !== "block"
        ) {
          return x.item && x.item.status !== "default";
        } else {
          return ["abc"];
        }
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
              key.value,
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
            st && st.cr && st.cr.status ? st.cr.status : "");
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
  let getheight: HTMLElement | null = document.getElementById("getheight");
  let listheight: number = 200;
  if (getheight) {
    listheight = getheight.getBoundingClientRect().height;
  }

  let widthForMonth: number = 1110;
  if (daysArr && daysArr.length) {
    if (daysArr.length === 30) {
      widthForMonth = 1110;
    } else if (daysArr.length === 31) {
      widthForMonth = 1140;
    } else if (daysArr.length === 29) {
      widthForMonth = 1082;
    } else if (daysArr.length === 28) {
      widthForMonth = 1054;
    } else {
      widthForMonth = 1110;
    }
  }
  let listData =
    starCaregiver.isStar || starCaregiver.isSecondStar
      ? careGiversList.filter((cg: any) => cg.id === starCaregiver.id)
      : careGiversList;
  // ? careInstitutionList
  // : secondStarCanstitution.isStar
  // ? careInstituionDeptData && careInstituionDeptData.length
  //   ? careInstituionDeptData.filter(
  //       (dept: any) => dept.id === secondStarCanstitution.id
  //     )
  //   : []
  // : careInstituionDeptData;
  let temp: any[] = [];
  listData.forEach((element: any) => {
    element.availabilityData.forEach((item: any, row: number) => {
      temp.push({ ...element, new: item, row });
    });
  });

  //reserved condition
  let reserveCondition: any;
  if (selectedCells && selectedCells.length) {
    reserveCondition = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.item && x.item.status === "default";
      } else {
        return ["abc"];
      }
    });
  }
  // if (openCareGiverBulkEmail) {
  //   const BulkEmailCareGiverModal = lazy(() => import('../BulkEmailCareGiver'));
  //   return <Suspense fallback={null}>
  //   <BulkEmailCareGiverModal
  //     updateLinkedStatus={props.fetchingCareGiverData}
  //     openModal={openCareGiverBulkEmail}
  //     qualification={
  //       sortedQualificationList && sortedQualificationList
  //         ? sortedQualificationList
  //         : props.qualification
  //     }
  //     handleClose={handleClose}
  //     gte={props.gte}
  //     lte={props.lte}
  //     selectedCells={selectedCells}
  //     confirmApp={confirmApp}
  //     selectedCellsCareinstitution={selectedCellsCareinstitution}
  //     unlinkedBy={unlinkedBy}
  //     isFromUnlink={isFromUnlink}
  //     qualificationList={qualificationList}
  //     offerRequirements={offerRequirements}
  //     terminateAggrement={terminateAggrement}
  //     leasingContract={leasingContract}
  //   />
  //   </Suspense>
  // }
  // if (openCareInstitutionBulkEmail) {
  //   const BulkEmailCareInstitutionModal= lazy(() => import('../BulkEmailCareInstitution'));
  //   return <Suspense fallback={null}>
  //     <BulkEmailCareInstitutionModal
  //       openModal={openCareInstitutionBulkEmail}
  //       handleClose={() => handleCareInstitutionBulkEmail()}
  //       qualification={
  //         sortedQualificationList && sortedQualificationList
  //           ? sortedQualificationList
  //           : props.qualification
  //       }
  //       selectedCellsCareinstitution={selectedCellsCareinstitution}
  //       gte={props.gte}
  //       lte={props.lte}
  //       unlinkedBy={unlinkedBy}
  //       isFromUnlink={isFromUnlink}
  //     />
  //     </Suspense>
  // }
  // if (showList) {
  //   const DetaillistCaregiverPopup= lazy(() => import('../DetailedList/DetailListCaregiver'));
  //   return <Suspense fallback={null}>
  //     <DetaillistCaregiverPopup
  //       show={showList ? true : false}
  //       handleClose={() => setShowList(false)}
  //       selectedCells={selectedCells}
  //       qualificationList={qualificationList}
  //     />
  //   </Suspense>
  // }
  // if (showUnlinkModal) {
  //   const UnlinkAppointment= lazy(() => import('../unlinkModal'));
  //   return <Suspense fallback={null}>
  //     <UnlinkAppointment
  //       show={showUnlinkModal}
  //       handleClose={() => setshowUnlinkModal(false)}
  //       handleUnlinkData={handleUnlinkData}
  //     />
  //   </Suspense>
  // }

  return (
    <div>
      <div
        className={classnames({
          "right-manu-close": true,
          "d-none": !openToggleMenu,
        })}
        onClick={handleToggleMenuItem}
      ></div>
      <div
        className={classnames({
          "rightclick-menu top-open": true,
          // "custom-scrollbar": true,
          "d-none": !openToggleMenu,
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
              <span className="align-middle">
                {languageTranslation("NEW_APPOINTMENT")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                reserveCondition && reserveCondition.length === 0 ? true : false
              }
              onClick={() => {
                setopenToggleMenu(false);
                onReserve ? onReserve() : undefined;
              }}
            >
              <img src={reserve} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("RESERVE")}
              </span>
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
                {languageTranslation("DELETE_FREE_CALENDER")}
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
              <span className="align-middle">
                {languageTranslation("DETAILED_LIST")}
              </span>
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
                {languageTranslation("FILTER_BY_QUALI")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (offferAll && offferAll.length !== 0) ||
                    (checkQuali && checkQuali.length === 0)
                  : true
              }
              onClick={() => {
                setopenToggleMenu(false);
                setOfferRequirements(true);
                handleCareGiverBulkEmail();
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("OFFER_ALL_CALENDER")}
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
              <span className="align-middle">
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
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                setopenToggleMenu(false);
                handleUnLinkAppointments();
              }}
            >
              <img src={disconnect} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("DISCONNECT_APPOINTMENT")}
              </span>
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
                updateCaregiverStatus("confirmed");
                setconfirmApp(true);
                setopenToggleMenu(false);
                handleCareGiverBulkEmail();
              }}
            >
              <img src={confirm_appointment} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("CONFIRM_APPOINTMENT")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (selectedCells[0].item &&
                      selectedCells[0].item.status !== "linked") ||
                    isLeasingAppointment
                  : true
              }
            >
              <img src={set_confirm} className="mr-2" alt="" />
              <span
                className="align-middle"
                onClick={() => {
                  setopenToggleMenu(false);
                  updateCaregiverStatus("confirmed");
                }}
              >
                {languageTranslation("SET_ON_CONF")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (selectedCells[0].item &&
                      selectedCells[0].item.status !== "confirmed") ||
                    isLeasingAppointment
                  : true
              }
            >
              <img src={unset_confirm} className="mr-2" alt="" />
              <span
                className="align-middle"
                onClick={() => {
                  setopenToggleMenu(false);
                  updateCaregiverStatus("notconfirmed");
                }}
              >
                {languageTranslation("SET_ON_NOT_CONF")}
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
                            "confirmed")
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
                {languageTranslation("REQUEST_TEMP_LEASING")}
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
              <span className="align-middle">
                {languageTranslation("CREATE_TERMINATION_AGREEMENT")}
              </span>
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
        <div
          className={`calender-section ${loading ? "loader-height" : ""}`}
          id="getheight"
        >
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
                <div className="custom-appointment-col h-col">
                  {" "}
                  {languageTranslation("H")}
                </div>
                <div className="custom-appointment-col s-col text-center">
                  {languageTranslation("S")}
                </div>
                <div className="custom-appointment-col u-col text-center">
                  {languageTranslation("U")}
                </div>
                <div className="custom-appointment-col v-col text-center">
                  {languageTranslation("V")}
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
              {loading ? (
                <div className={"appointment-loader"}>
                  <Loader />
                </div>
              ) : careGiversList && careGiversList.length ? (
                <SelectableGroup
                  allowClickWithoutSelected
                  className="custom-row-selector"
                  clickClassName="tick"
                  resetOnStart={true}
                  allowCtrlClick={false}
                  onSelectionFinish={onSelectFinish}
                  ignoreList={[
                    ".name-col",
                    ".h-col",
                    ".s-col",
                    ".u-col",
                    ".v-col",
                  ]}
                >
                  <InfiniteLoader
                    isRowLoaded={({ index }) => !!careGiversList[index]}
                    // loadMoreRows={loadMore}
                    rowCount={totalCaregiver}
                    loadMoreRows={({ startIndex, stopIndex }) =>
                      !starMarkCaregiver ||
                      locationState ||
                      careGiversList.length > 1
                        ? (getNext(careGiversList.length) as any)
                        : null
                    }
                  >
                    {({ onRowsRendered, registerChild }) => (
                      <AutoSizer className="autosizer-div">
                        {({ width }) => (
                          <List
                            ref={registerChild}
                            height={listheight}
                            onRowsRendered={onRowsRendered}
                            rowCount={temp.length}
                            rowHeight={28}
                            width={widthForMonth}
                            // rowGetter={({ index }:any) => careGiversList[index]}
                            rowRenderer={({
                              index,
                              isScrolling,
                              key,
                              style,
                            }) => {
                              const list = temp[index] || {};
                              let item = list.new;
                              let row = list.row;
                              let uIndex: number = careGiversList.findIndex(
                                (item: any) => item.id === list.id
                              );
                              return (
                                // <div key={key} style={style}>
                                // list.availabilityData &&
                                //   list.availabilityData.length
                                //   ? list.availabilityData.map(
                                //       (item: any, row: number) => (
                                <div
                                  className="custom-appointment-row"
                                  key={`${list.id}-${index}-${row}-${key}`}
                                  style={
                                    style
                                    // {...style, top:index + (row *30)}
                                  }
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
                                        : "",
                                    }}
                                    title={[list.lastName, list.firstName].join(
                                      " "
                                    )}
                                    id={`caregiver-${list.id}-${index}-${row}`}
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
                                        ? [list.lastName, list.firstName].join(
                                            " "
                                          )
                                        : ""}
                                    </Link>
                                  </div>
                                  <div className="custom-appointment-col h-col appointment-color2"></div>
                                  <div
                                    className="custom-appointment-col s-col text-center"
                                    onClick={() =>
                                      onhandleCaregiverStar(list.id, false)
                                    }
                                  >
                                    {starCaregiver &&
                                    starCaregiver.isStar &&
                                    starCaregiver.id === list.id ? (
                                      <i className="fa fa-star theme-text" />
                                    ) : (
                                      <i className="fa fa-star-o" />
                                    )}
                                  </div>
                                  <div
                                    className="custom-appointment-col u-col text-center"
                                    onClick={() =>
                                      onhandleCaregiverStar(
                                        list.id,
                                        starCaregiver &&
                                          !starCaregiver.isSecondStar
                                      )
                                    }
                                  >
                                    {starCaregiver &&
                                    starCaregiver.isSecondStar &&
                                    starCaregiver.id === list.id ? (
                                      <i className="fa fa-star theme-text" />
                                    ) : (
                                      <i className="fa fa-star-o" />
                                    )}
                                  </div>
                                  <div
                                    className="custom-appointment-col v-col text-center"
                                    onClick={(e) =>
                                      onAddingRow(e, "caregiver", uIndex)
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
                                        fetchDataValues={props.fetchDataValues}
                                        item={
                                          item.filter((avabilityData: any) => {
                                            return (
                                              moment(key.isoString).format(
                                                "DD.MM.YYYY"
                                              ) ===
                                              moment(avabilityData.date).format(
                                                "DD.MM.YYYY"
                                              )
                                            );
                                          })[0]
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
                                // )
                              );
                              // </div>
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
                    {languageTranslation("NO_CAREGIVER_ADDED")}{" "}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openCareGiverBulkEmail ? (
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
        />
      ) : null}
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
