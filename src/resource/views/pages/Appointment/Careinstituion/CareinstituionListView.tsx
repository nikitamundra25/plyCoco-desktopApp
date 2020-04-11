import React, {
  FunctionComponent,
  useState,
  Suspense,
  lazy,
  useEffect,
} from "react";
import { Table, Button, Nav, NavItem, NavLink } from "reactstrap";
import { SelectableGroup } from "react-selectable-fast";
import moment from "moment";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { InfiniteLoader, AutoSizer, List } from "react-virtualized";
import {
  IAppointmentCareInstitutionList,
  IDaysArray,
  IReactSelectInterface,
} from "../../../../../interfaces";
import Loader from "../../../containers/Loader/Loader";
import CellCareinstitution from "./Cell";
import {
  dbAcceptableFormat,
  AppRoutes,
  CareInstTIMyoCYAttrId,
  CareInstPlycocoAttrId,
  leasingListColor,
  selfEmployesListColor,
  deactivatedListColor,
  CareInstInActiveAttrId,
} from "../../../../../config";
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
import { languageTranslation } from "../../../../../helpers";
import { ConfirmBox } from "../../../components/ConfirmBox";
import "../index.scss";
import BulkEmailCareInstitutionModal from "../BulkEmailCareInstitution";
import UnlinkAppointment from "../unlinkModal";
import DetaillistCareinstitutionPopup from "../DetailedList/DetailListCareinstitution";
import BulkEmailCareGiverModal from "../BulkEmailCareGiver";

let toastId: any = null;

const CarinstituionListView: FunctionComponent<
  IAppointmentCareInstitutionList & any
> = (props: IAppointmentCareInstitutionList & any) => {
  const {
    daysData,
    careInstitutionList,
    loading,
    onAddingRow,
    qualificationList,
    fetchCareinstitutionList,
    handleFirstStarCanstitution,
    careInstituionDeptData,
    starCanstitution,
    deptLoading,
    onhandleSecondStarCanstitution,
    secondStarCanstitution,
    handleSelection,
    selectedCellsCareinstitution,
    selectedCells,
    onLinkAppointment,
    onDeleteEntries,
    handleSelectedAppoitment,
    onNewRequirement,
    showSelectedCaregiver,
    totalCareinstituion,
    getMoreCareInstituionList,
    updateCareInstitutionStatus,
    locationState,
    starMarkCareinstitution,
  } = props;
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);
  const [openToggleMenu, setopenToggleMenu] = useState<boolean>(false);
  //use state for toggel menu item
  const [toggleMenuButton, settoggleMenuButton] = useState<boolean>(false);
  const [confirmAppointment, setConfirmAppointment] = useState<boolean>(false);

  const handleRightMenuToggle = () => {
    settoggleMenuButton(!toggleMenuButton);
  };
  const { daysArr = [] } = daysData ? daysData : {};

  const [onEnterMenu, setonEnterMenu] = useState(false);
  const [selectedDays, setSelectedDays] = useState<any[]>([]);

  const onSelectFinish = (selectedCells: any[]) => {
    let selectedRows: any[] = [];
    if (selectedCells && selectedCells.length) {
      selectedRows = selectedCells.map((selectedCell: any) => {
        const { props: cellProps } = selectedCell;
        const { item, list: careInstData, day } = cellProps;
        const {
          userId = "",
          id = "",
          name = "", //department name on solo care institution
          firstName = "",
          lastName = "",
          caregiver = {},
          canstitution = {},
          qualificationId = [],
          deptId = "",
          divisions = [],
        } = careInstData ? careInstData : {};
        let qualification1: IReactSelectInterface[] = [];
        if (
          qualificationList &&
          qualificationList.length &&
          item &&
          item.qualificationId
        ) {
          qualification1 = qualificationList.filter(({ value }: any) =>
            item.qualificationId.includes(value)
          );
        } else if (qualificationId && qualificationId.length) {
          qualification1 = qualificationList.filter(({ value }: any) =>
            qualificationId.includes(value)
          );
        }
        let temp = {
          ...item,
          qualificationId: qualification1 ? qualification1 : [],
        };
        return {
          id: deptId ? userId : id,
          firstName,
          lastName,
          name:
            canstitution && canstitution.companyName
              ? canstitution.companyName
              : "",
          caregiver,
          canstitution,
          dept: { id: deptId, name },
          item:
            temp && temp.qualificationId && temp.qualificationId ? temp : item,
          qualificationIds: qualificationId,
          dateString: day ? day.dateString : "",
          divisions,
          // isLeasing:
          // canstitution && canstitution.attributes
          // ? canstitution.attributes.includes(CareInstTIMyoCYAttrId)
          // : false
        };
      });
      handleSelection(selectedRows, "careinstitution");
    }
  };

  const onSelectionClear = () => {
    setSelectedDays([]);
  };
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
              if (!toast.isActive(toastId)) {
                toastId = toast.warn(
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
                  languageTranslation("DATE_RANGE_MISMATCH")
                );
              }
              return false;
            } else if (key.item === undefined || element.item === undefined) {
              checkError = true;
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

  //unLinked by
  const [unlinkedBy, setunlinkedBy] = useState<string>("");

  // UnLink appointmnets
  const handleUnLinkAppointments = (name: string) => {
    setshowUnlinkModal(!showUnlinkModal);
  };

  const [isFromUnlink, setisFromUnlink] = useState(false);
  const handleUnlinkData = (likedBy: string, check: boolean) => {
    setunlinkedBy(likedBy);
    let appointmentId: any = [];
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.map((key: any, index: number) => {
        return appointmentId.push({
          appointmentId: parseInt(
            key.item.appointments ? key.item.appointments[0].id : ""
          ),
          unlinkedBy: likedBy,
          deleteAll: check,
        });
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

  const [showList, setShowList] = useState<boolean>(false);

  // state for care giver bulk email
  const [openCareGiverBulkEmail, setopenCareGiverBulkEmail] = useState<boolean>(
    false
  );

  // state for care institution bulk email
  const [
    openCareInstitutionBulkEmail,
    setopenCareInstitutionBulkEmail,
  ] = useState<boolean>(false);

  // lable for care institution
  const [sortBy, setSortBy] = useState<string>("");

  // show button for care institution
  const [showButton, setShowButton] = useState<boolean>(false);
  const [showCareGiverEmail, setshowCareGiverEmail] = useState<boolean>(false);

  // Open care giver bulk Email section after care instituion email popup
  const handleCareGiverBulkEmail = (sortBy: string, showButton: boolean) => {
    setSortBy(sortBy);
    setShowButton(showButton);
    if (!openCareGiverBulkEmail) {
      setshowCareGiverEmail(true);
    } else {
      setshowCareGiverEmail(false);
      setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
    }
    if (openCareGiverBulkEmail) {
      setunlinkedBy("");
    }
  };

  //Open Care giver Modal
  useEffect(() => {
    if (openCareInstitutionBulkEmail && showCareGiverEmail) {
      setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
    }
  }, [openCareInstitutionBulkEmail]);

  // open care institution bulk Email section
  const handleCareInstitutionBulkEmail = () => {
    if (openCareInstitutionBulkEmail) {
      setunlinkedBy("");
    }
    if (confirmAppointment) {
      setConfirmAppointment(false);
    }
    setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
  };

  const [StatusTo, setStatusTo] = useState("");

  const loadMoreRows = ({ startIndex, stopIndex }: any) => {
    getMoreCareInstituionList(careInstitutionList.length);
  };

  const renderTableRows = (list: any, index: any, style: any) => {
    // select careInstitution if no department is available
    // if (starCanstitution.isStar && !list ) {
    // list = careInstitutionList.filter(
    // (item: any) => item.id === starCanstitution.id
    // )[0];
    // }
    let item = list.new;
    let row = list.row;
    let uIndex: number = -1;
    // index of dept in case of solo careInst & dept
    if (
      starCanstitution &&
      secondStarCanstitution &&
      (starCanstitution.isStar || secondStarCanstitution.isStar) &&
      careInstituionDeptData &&
      careInstituionDeptData.length
    ) {
      uIndex = careInstituionDeptData.findIndex(
        (item: any) => item.id === list.id
      );
    } else {
      // Direct index of care inst
      uIndex = careInstitutionList.findIndex(
        (item: any) => item.id === list.id
      );
    }

    // let temp: any[] = [];
    // if (listData && listData.length) {
    // listData.forEach((list: any, index: number) => {
    // if (list && list.availabilityData && list.availabilityData.length) {
    // list.availabilityData.map((item: any, row: number) =>

    // temp.push(
    return (
      <div
        className="custom-appointment-row"
        key={`${list.id}-${index}-${row}`}
        style={style}
      >
        {/* <th className="thead-sticky name-col custom-appointment-col"> */}

        <div
          className="custom-appointment-col name-col appointment-color1 text-capitalize view-more-link one-line-text"
          style={{
            backgroundColor:
              list.canstitution && list.canstitution.attributes
                ? list.canstitution.attributes.includes(CareInstInActiveAttrId)
                  ? deactivatedListColor
                  : list.canstitution.attributes.includes(CareInstTIMyoCYAttrId)
                  ? leasingListColor
                  : list.canstitution.attributes.includes(CareInstPlycocoAttrId)
                  ? selfEmployesListColor
                  : ""
                : "",
          }}
          // onClick={() =>
          // history.push(
          // AppRoutes.CARE_INSTITUION_VIEW.replace(':id', list.id)
          // )
          // }
          title={list.name}
          // className="text-capitalize view-more-link one-line-text username-col name-text"
          id={`careinst-${list.id}`}
        >
          <Link
            to={AppRoutes.CARE_INSTITUION_VIEW.replace(":id", list.id)}
            target="_blank"
            className="text-body"
          >
            {row === 0 ? list.name : null}
          </Link>
        </div>
        <div className="h-col custom-appointment-col text-center"></div>
        <div
          className="s-col custom-appointment-col text-center cursor-pointer"
          onClick={() => handleFirstStarCanstitution(list, uIndex)}
        >
          {starCanstitution.setIndex === uIndex || starCanstitution.isStar ? (
            <i className="fa fa-star theme-text" />
          ) : (
            <i className="fa fa-star-o" />
          )}
        </div>
        <div
          className="u-col custom-appointment-col text-center cursor-pointer"
          onClick={() => onhandleSecondStarCanstitution(list)}
        >
          {secondStarCanstitution && secondStarCanstitution.isStar ? (
            <i className="fa fa-star theme-text" />
          ) : (
            <i className="fa fa-star-o" />
          )}
        </div>
        <div
          className="v-col custom-appointment-col text-center cursor-pointer"
          onClick={(e) => onAddingRow(e, "careinstitution", uIndex)}
        >
          <i className="fa fa-arrow-down" />
        </div>

        {/* </th> */}

        {/* map */}
        {daysArr.map((key: any, i: number) => {
          return (
            <CellCareinstitution
              key={`${key}-${i}`}
              day={key}
              list={list}
              daysArr={key.isWeekend}
              showSelectedCaregiver={showSelectedCaregiver}
              item={
                item
                  ? item.filter((avabilityData: any) => {
                      return (
                        moment(key.isoString).format("DD.MM.YYYY") ===
                        moment(avabilityData.date).format("DD.MM.YYYY")
                      );
                    })[0]
                  : ""
              }
              handleSelectedAvailability
              selectedCells={selectedCells}
            />
          );
        })}
      </div>
    );
    // )
    // );
    // }
    // });
    // } else {
    // temp.push(
    // <tr className={'text-center no-hover-row'}>
    // <td colSpan={40} className={'pt-5 pb-5'}>
    // <div className='no-data-section'>
    // <div className='no-data-icon'>
    // <i className='icon-ban' />
    // </div>
    // <h4 className='mb-1'>{'No Data found with related search'}</h4>
    // </div>
    // </td>
    // </tr>
    // );
    // }
    return temp /* firstStarData */;
  };
  // to apply condition on email options and delete
  let emailOptionCond: any;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    emailOptionCond = selectedCellsCareinstitution.filter((x: any) => {
      if (x.item && x.item.id) {
        return (
          x.item && x.item.status !== "default" && x.item.status !== "offered"
        );
      } else {
        return ["abc"];
      }
    });
  }
  console.log("Email+++++++++Option", emailOptionCond);

  //to apply conditions on set on offered
  let setOnOfferCond: any;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    setOnOfferCond = selectedCellsCareinstitution.filter((x: any) => {
      if (x.item && x.item.id) {
        return x.item && x.item.status !== "default";
      } else {
        return ["abc"];
      }
    });
  }
  // to apply condition on reset offered
  let resetOffCond: any;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    resetOffCond = selectedCellsCareinstitution.filter((x: any) => {
      if (x.item && x.item.id) {
        return x.item && x.item.status !== "offered";
      } else {
        return ["abc"];
      }
    });
  }
  //to apply condition on all offer options
  let offerAppCond: any;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    offerAppCond = selectedCellsCareinstitution.filter((x: any) => {
      if (x.item && x.item.id) {
        return x.item.status !== "linked" && x.item.status !== "confirmed";
      } else {
        return ["abc"];
      }
    });
  }
  //to apply condition on disconnect appointments
  let disconnectAppCond: any;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    disconnectAppCond = selectedCellsCareinstitution.filter((x: any) => {
      if (x.item && x.item.id) {
        return x.item && x.item.status !== "linked";
      } else {
        return ["abc"];
      }
    });
  }
  //to apply condition on connect appointments selectedCells
  let connectAppCondition: any;
  if (
    selectedCellsCareinstitution &&
    selectedCellsCareinstitution.length &&
    selectedCells &&
    selectedCells.length
  ) {
    selectedCells.filter((x: any) => {
      if (x.item && x.item.id) {
        if (
          x.item.f !== "block" ||
          x.item.s !== "block" ||
          x.item.n !== "block"
        ) {
          connectAppCondition = selectedCellsCareinstitution.filter(
            (x: any) => {
              if (x.item && x.item.id) {
                return (
                  x.item &&
                  x.item.status !== "default" &&
                  x.item.status !== "offered"
                );
              } else {
                return ["abc"];
              }
            }
          );
        } else {
          connectAppCondition = ["abc"];
        }
      }
    });
  }

  let sortedQualificationList: any = [];
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    selectedCellsCareinstitution.map((list: any, index: number) => {
      if (list && list.item && list.item.qualificationId) {
        let qualificationId = list.item.qualificationId;
        qualificationId.map((key: any, i: number) => {
          if (key && key.value) {
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
          }
        });
      }
    });
  }

  let getcheight: HTMLElement | null = document.getElementById("getcheight");
  let listcheight: number = 200;
  if (getcheight) {
    listcheight = getcheight.getBoundingClientRect().height;
  }

  let widthForMonth: number = 1538;
  if (daysArr && daysArr.length) {
    if (daysArr.length === 30) {
      widthForMonth = 1538;
    } else if (daysArr.length === 31) {
      widthForMonth = 1578;
    } else if (daysArr.length === 29) {
      widthForMonth = 1498;
    } else if (daysArr.length === 28) {
      widthForMonth = 1458;
    } else {
      widthForMonth = 1538;
    }
  }
  let listData = !starCanstitution.isStar
    ? careInstitutionList
    : secondStarCanstitution.isStar
    ? careInstituionDeptData && careInstituionDeptData.length
      ? careInstituionDeptData.filter(
          (dept: any) => dept.id === secondStarCanstitution.id
        )
      : []
    : careInstituionDeptData;
  // To manage case of solo careInst and department selection if no department is there
  if (starCanstitution.isStar && listData && !listData.length) {
    listData = careInstitutionList.filter(
      (item: any) => item.id === starCanstitution.id
    );
  }
  let temp: any[] = [];
  listData.forEach((element: any, index: number) => {
    element.availabilityData.forEach((item: any, row: number) => {
      temp.push({ ...element, new: item, row });
    });
  });

  const renderBulkCareGiverModal = () => {
    if (openCareGiverBulkEmail) {
      const BulkEmailCareGiverModal = React.lazy(() =>
        import("../BulkEmailCareGiver")
      );
      return (
        <Suspense fallback={null}>
          <BulkEmailCareGiverModal
            openModal={openCareGiverBulkEmail}
            qualification={
              sortedQualificationList && sortedQualificationList.length
                ? sortedQualificationList
                : props.qualification
            }
            offerCareGiver={true} // offer caregiver
            handleClose={() => handleCareGiverBulkEmail("", false)}
            selectedCells={selectedCells}
            selectedCellsCareinstitution={selectedCellsCareinstitution}
            gte={props.gte}
            lte={props.lte}
            sortBy={sortBy}
            showButton={showButton}
            unlinkedBy={unlinkedBy}
          />
        </Suspense>
      );
    }
  };
  const renderBulkCareInstModal = () => {
    if (openCareInstitutionBulkEmail) {
      const BulkEmailCareInstitutionModal = lazy(() =>
        import("../BulkEmailCareInstitution")
      );
      return (
        <Suspense fallback={null}>
          <BulkEmailCareInstitutionModal
            openModal={openCareInstitutionBulkEmail}
            handleClose={() => handleCareInstitutionBulkEmail()}
            qualification={
              sortedQualificationList && sortedQualificationList.length
                ? sortedQualificationList
                : props.qualification
            }
            selectedCellsCareinstitution={selectedCellsCareinstitution}
            gte={props.gte}
            lte={props.lte}
            statusTo={StatusTo}
            sortBy={sortBy}
            unlinkedBy={unlinkedBy}
            isFromUnlink={isFromUnlink}
            confirmAppointment={confirmAppointment}
          />
        </Suspense>
      );
    }
  };
  const renderDetailedList = () => {
    if (showList) {
      const DetaillistCareinstitutionPopup = lazy(() =>
        import("../DetailedList/DetailListCareinstitution")
      );
      return (
        <Suspense fallback={null}>
          <DetaillistCareinstitutionPopup
            show={showList ? true : false}
            handleClose={() => setShowList(false)}
            qualificationList={qualificationList}
            selectedCellsCareinstitution={selectedCellsCareinstitution}
            fetchCareinstitutionList={fetchCareinstitutionList}
          />
        </Suspense>
      );
    }
  };
  const renderUnlinkModal = () => {
    if (showUnlinkModal) {
      const UnlinkAppointment = lazy(() => import("../unlinkModal"));

      return (
        <Suspense fallback={null}>
          <UnlinkAppointment
            show={showUnlinkModal}
            handleClose={() => setshowUnlinkModal(false)}
            handleUnlinkData={handleUnlinkData}
          />
        </Suspense>
      );
    }
  };

  return (
    <>
      <div
        className={classnames({
          "right-manu-close": true,
          "d-none": !toggleMenuButton,
        })}
        onClick={() => handleRightMenuToggle()}
      ></div>
      <div
        className={classnames({
          "rightclick-menu": true,
          "custom-scrollbar": true,
          "d-none": !toggleMenuButton,
        })}
        id={"clickbox"}
      >
        <div
          onMouseOver={() => {
            setonEnterMenu(true);
          }}
        >
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
                              availability.item.status === "offered"))
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
                onClick={() => handleSelectedAppoitment()}
              >
                <img src={all_list} className="mr-2" alt="" />
                <span>
                  {languageTranslation("SELECT_ALL_APPOINTMENT_OF_CG")}
                </span>
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
                disabled={
                  emailOptionCond !== undefined
                    ? emailOptionCond && emailOptionCond.length !== 0
                      ? "disabled-class"
                      : ""
                    : "disabled-class"
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
                disabled={
                  emailOptionCond !== undefined
                    ? emailOptionCond && emailOptionCond.length !== 0
                      ? "disabled-class"
                      : ""
                    : "disabled-class"
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
                disabled={
                  emailOptionCond !== undefined
                    ? emailOptionCond && emailOptionCond.length !== 0
                      ? "disabled-class"
                      : ""
                    : "disabled-class"
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
                disabled={
                  emailOptionCond !== undefined
                    ? emailOptionCond && emailOptionCond.length !== 0
                      ? "disabled-class"
                      : ""
                    : "disabled-class"
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
                disabled={
                  setOnOfferCond !== undefined
                    ? setOnOfferCond && setOnOfferCond.length !== 0
                      ? "disabled-class"
                      : ""
                    : "disabled-class"
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
                disabled={
                  resetOffCond !== undefined
                    ? resetOffCond && resetOffCond.length !== 0
                      ? "disabled-class"
                      : ""
                    : "disabled-class"
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
                disabled={
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
                disabled={
                  disconnectAppCond !== undefined
                    ? disconnectAppCond && disconnectAppCond.length !== 0
                      ? "disabled-class"
                      : ""
                    : "disabled-class"
                }
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
                disabled={
                  offerAppCond !== undefined
                    ? offerAppCond && offerAppCond.length !== 0
                      ? "disabled-class"
                      : ""
                    : "disabled-class"
                }
                onClick={() => {
                  handleCareInstitutionBulkEmail();
                  setStatusTo("offered");
                  setopenToggleMenu(false);
                  setSortBy("day");
                }}
              >
                <img src={offer_sent} className="mr-2" alt="" />
                <span>{languageTranslation("OFFER_APPOINTMENT")}</span>
              </NavLink>{" "}
            </NavItem>
            <NavItem>
              <NavLink
                disabled={
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
                disabled={
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
                disabled={
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
                      selectedCellsCareinstitution[0].item.status !==
                        "linked") ||
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
                disabled={
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
                disabled={
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
      <div className="position-relative">
        <div
          className={`calender-section mt-3 careinstitution-appointment-list ${
            loading ? "loader-height" : ""
          }`}
          id={"getcheight"}
        >
          <div className="custom-appointment-calendar">
            <div className="custom-appointment-calendar-head">
              <div className="custom-appointment-row ">
                {/* <div className="all-star-wrap"> */}
                <div className="custom-appointment-col name-col">
                  <div className="position-relative username-col align-self-center">
                    {languageTranslation("MENU_INSTITUTION")}
                    <Button
                      onClick={() => handleRightMenuToggle()}
                      className="btn-more d-flex align-items-center justify-content-center"
                    >
                      <i className="icon-options-vertical" />
                    </Button>
                  </div>
                </div>

                <div className=" h-col custom-appointment-col text-center">
                  {languageTranslation("H")}
                </div>
                <div className=" s-col custom-appointment-col text-center">
                  {languageTranslation("S")}
                </div>
                <div className=" u-col custom-appointment-col text-center">
                  {languageTranslation("A")}
                </div>
                <div className=" v-col custom-appointment-col text-center">
                  {languageTranslation("V")}
                </div>

                {/* array for showing day */}
                {daysArr.map(
                  (
                    { date, day, isWeekend, dateString }: IDaysArray,
                    index: number
                  ) => {
                    const isTodayDate = moment(dateString).isSame(
                      moment(),
                      "day"
                    );
                    return (
                      <div
                        key={index}
                        className={`custom-appointment-col calender-col text-center ${
                          isTodayDate ? "today" : isWeekend ? "weekend" : ""
                        }`}
                      >
                        <div className="custom-appointment-calendar-date">
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
              {loading || (starCanstitution.isStar && deptLoading) ? (
                <div className={"appointment-loader"}>
                  <Loader />
                </div>
              ) : careInstitutionList && careInstitutionList.length ? (
                <SelectableGroup
                  allowClickWithoutSelected
                  className="custom-row-selector"
                  clickClassName="tick"
                  resetOnStart={true}
                  onSelectionFinish={onSelectFinish}
                  onSelectionClear={onSelectionClear}
                  ignoreList={[
                    ".name-col",
                    ".h-col",
                    ".s-col",
                    ".u-col",
                    ".v-col",
                  ]}
                >
                  <InfiniteLoader
                    loadMoreRows={({ startIndex, stopIndex }) =>
                      !starMarkCareinstitution
                        ? (loadMoreRows({ startIndex, stopIndex }) as any)
                        : ""
                    }
                    isRowLoaded={({ index }) => !!careInstitutionList[index]}
                    // isRowLoaded={() => false}
                    rowCount={totalCareinstituion}
                  >
                    {({ onRowsRendered, registerChild }) => (
                      <AutoSizer className="autosizer-div">
                        {({ width }) => (
                          <List
                            ref={registerChild}
                            height={listcheight}
                            onRowsRendered={onRowsRendered}
                            rowCount={temp.length}
                            rowHeight={30}
                            width={widthForMonth}
                            rowRenderer={({ index, key, style }) => {
                              // Condition to manage careinstitution list & department list
                              let list = temp[index];
                              return renderTableRows(list, index, style);
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
                    {languageTranslation("NO_CAREINSTITUTION_ADDED")}{" "}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {renderBulkCareInstModal()}
      {renderBulkCareGiverModal()}
{renderDetailedList()}
{renderUnlinkModal()} */}
      <BulkEmailCareGiverModal
        openModal={openCareGiverBulkEmail}
        qualification={
          sortedQualificationList && sortedQualificationList.length
            ? sortedQualificationList
            : props.qualification
        }
        offerCareGiver={true} // offer caregiver
        handleClose={() => handleCareGiverBulkEmail("", false)}
        selectedCells={selectedCells}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={props.gte}
        lte={props.lte}
        sortBy={sortBy}
        showButton={showButton}
        unlinkedBy={unlinkedBy}
      />
      <BulkEmailCareInstitutionModal
        openModal={openCareInstitutionBulkEmail}
        handleClose={() => handleCareInstitutionBulkEmail()}
        qualification={
          sortedQualificationList && sortedQualificationList.length
            ? sortedQualificationList
            : props.qualification
        }
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={props.gte}
        lte={props.lte}
        statusTo={StatusTo}
        sortBy={sortBy}
        unlinkedBy={unlinkedBy}
        isFromUnlink={isFromUnlink}
        confirmAppointment={confirmAppointment}
      />
      <DetaillistCareinstitutionPopup
        show={showList ? true : false}
        handleClose={() => setShowList(false)}
        qualificationList={qualificationList}
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        fetchCareinstitutionList={fetchCareinstitutionList}
      />
      <UnlinkAppointment
        show={showUnlinkModal}
        handleClose={() => setshowUnlinkModal(false)}
        handleUnlinkData={handleUnlinkData}
      />
    </>
  );
};

export default CarinstituionListView;
