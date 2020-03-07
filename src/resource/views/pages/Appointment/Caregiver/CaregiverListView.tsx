import React, { FunctionComponent, useState } from "react";
import {
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";
import "../index.scss";
import {
  IAppointmentCareGiverList,
  IDaysArray
} from "../../../../../interfaces";
import Loader from "../../../containers/Loader/Loader";
import "../index.scss";
import { SelectableGroup, SelectAll, DeselectAll } from "react-selectable-fast";
import Cell from "./Cell";
import moment from "moment";
import DetaillistCaregiverPopup from "../DetailListCaregiver";
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
const CaregiverListView: FunctionComponent<IAppointmentCareGiverList> = (
  props: IAppointmentCareGiverList & any
) => {
  const {
    daysData,
    careGiversList,
    loading,
    onAddingRow,
    handleSelectedUser,
    handleSecondStar,
    handleReset
  } = props;

  const [starMark, setstarMark] = useState<boolean>(false);
  const [starMarkIndex, setstarMarkIndex] = useState<number>(-1);

  const handleFirstStar = (list: object, index: number, name: string) => {
    if (starMarkIndex !== index) {
      setstarMarkIndex(index);
      handleSelectedUser(list, null, name);
    } else {
      setstarMarkIndex(-1);
    }
  };
  const onhandleSecondStar = (list: object, index: number, name: string) => {
    if (!starMark) {
      setstarMark(!starMark);
      handleSecondStar(list, index, name);
    } else {
      setstarMark(!starMark);
      handleReset(name);
    }
  };
  const { daysArr = [] } = daysData ? daysData : {};
  // select multiple
  const [selectedDays, setSelectedDays] = useState<any[]>([]);
  const onSelectFinish = (selectedCells: any[]) => {
    const selected: any = [];
    let list: any = [];
    for (let i = 0; i < selectedCells.length; i++) {
      const { props: cellProps } = selectedCells[i];
      selected.push(cellProps.day);
      if (selectedCells[0].props.list) {
        list = selectedCells[0].props.list;
      }
      setSelectedDays(selected);
    }
    let selctedAvailability: any;
    if (
      list &&
      list.caregiver_avabilities &&
      list.caregiver_avabilities.length
    ) {
      selctedAvailability = list.caregiver_avabilities.filter(
        (avabilityData: any, index: number) => {
          return (
            moment(selected[0].isoString).format("DD.MM.YYYY") ===
              moment(avabilityData.date).format("DD.MM.YYYY") &&
            (avabilityData.f === "available" ||
              avabilityData.s === "available" ||
              avabilityData.n === "available")
          );
        }
      );
    }
    handleSelectedUser(
      list,
      selected,
      "caregiver",
      selctedAvailability && selctedAvailability.length
        ? selctedAvailability[0]
        : {}
    );
  };
  const onSelectionClear = () => {
    setSelectedDays([]);
  };
  const [showList, setShowList] = useState<boolean>(false);
  return (
    <>
      <SelectableGroup
        allowClickWithoutSelected
        className="custom-row-selector"
        clickClassName="tick"
        resetOnStart={true}
        onSelectionFinish={onSelectFinish}
        onSelectionClear={onSelectionClear}
        ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}
      >
        <div className="calender-section custom-scrollbar">
          {loading ? <Loader /> : null}
          <div className="transform-0">
            <Table hover bordered className="mb-0 appointment-table">
              <thead className="thead-bg">
                <tr>
                  <th className="thead-sticky name-col custom-appointment-col  ">
                    <div className="position-relative">
                      Caregiver
                      <UncontrolledDropdown className="custom-dropdown options-dropdown">
                        <DropdownToggle
                          className={"text-capitalize btn-more"}
                          size="sm"
                        >
                          <i className="icon-options-vertical" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>
                            <img
                              src={new_appointment}
                              className="mr-2"
                              alt=""
                            />
                            <span className="align-middle">
                              New appointment
                            </span>
                          </DropdownItem>
                          <DropdownItem>
                            <img src={reserve} className="mr-2" alt="" />
                            <span className="align-middle">Reserve</span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img
                              src={delete_appointment}
                              className="mr-2"
                              alt=""
                            />
                            <span className="align-middle">
                              Delete free and reserved calender entries
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem onClick={() => setShowList(true)}>
                            <img src={detail_list} className="mr-2" alt="" />
                            <span className="align-middle">Detailed List</span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img src={filter} className="mr-2" alt="" />
                            <span className="align-middle">
                              Filter by qualifications of caregiver
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img src={offer_sent} className="mr-2" alt="" />
                            <span className="align-middle">
                              Offer all available calendar entries
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img src={connect} className="mr-2" alt="" />
                            <span className="align-middle">
                              Connect availabilities
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img src={disconnect} className="mr-2" alt="" />
                            <span className="align-middle">
                              Disconnect availabilities
                            </span>
                          </DropdownItem>
                          <DropdownItem>
                            <img
                              src={confirm_appointment}
                              className="mr-2"
                              alt=""
                            />
                            <span className="align-middle">
                              Confirmed appointments
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img src={set_confirm} className="mr-2" alt="" />
                            <span className="align-middle">
                              Set on confirmed
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img src={unset_confirm} className="mr-2" alt="" />
                            <span className="align-middle">
                              Set on not confirmed
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img
                              src={leasing_contact}
                              className="mr-2"
                              alt=""
                            />
                            <span className="align-middle">
                              Request temporary leasing contract
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img src={termination} className="mr-2" alt="" />
                            <span className="align-middle">
                              Create termination agreement
                            </span>
                          </DropdownItem>{" "}
                          <DropdownItem>
                            <img src={refresh} className="mr-2" alt="" />
                            <span className="align-middle">Refresh</span>
                          </DropdownItem>{" "}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </th>
                  <th className="thead-sticky h-col custom-appointment-col text-center">
                    H
                  </th>
                  <th className="thead-sticky s-col custom-appointment-col text-center">
                    S
                  </th>
                  <th className="thead-sticky u-col custom-appointment-col text-center">
                    U
                  </th>
                  <th className="thead-sticky v-col custom-appointment-col text-center">
                    V
                  </th>
                  {/* array for showing day */}
                  {daysArr.map(
                    (
                      { date, day, isoString, isWeekend }: IDaysArray,
                      index: number
                    ) => {
                      return (
                        <th
                          className="thead-sticky calender-col custom-appointment-col text-center"
                          key={index}
                        >
                          <div className="custom-appointment-calendar-date">
                            {" "}
                            {date}
                          </div>
                          <div className="custom-appointment-calendar-day">
                            {day}
                          </div>
                        </th>
                      );
                    }
                  )}
                </tr>
              </thead>
              <tbody>
                {careGiversList && careGiversList.length ? (
                  careGiversList.map((list: any, index: number) => {
                    return (
                      <tr key={`${list.id}-${index}`}>
                        <th className="name-col custom-appointment-col thead-sticky">
                          <div
                            className="text-capitalize view-more-link one-line-text"
                            onClick={() =>
                              handleSelectedUser(list, null, "caregiver")
                            }
                          >
                            {!list.newRow
                              ? `${list.firstName ? list.firstName : ""} ${
                                  list.lastName ? list.lastName : ""
                                }`
                              : ""}
                          </div>
                        </th>
                        <td className="h-col custom-appointment-col text-center"></td>
                        <td
                          className="s-col custom-appointment-col text-center"
                          onClick={() =>
                            onhandleSecondStar(list, index, "caregiver")
                          }
                        >
                          {starMark ? (
                            <i className="fa fa-star-o icon-d" />
                          ) : (
                            <i className="fa fa-star-o" />
                          )}
                        </td>
                        <td
                          className="u-col custom-appointment-col text-center"
                          onClick={() =>
                            onhandleSecondStar(list, index, "caregiver")
                          }
                        >
                          {starMark ? (
                            <i className="fa fa-star-o icon-d" />
                          ) : (
                            <i className="fa fa-star-o" />
                          )}
                        </td>
                        <td
                          className="v-col custom-appointment-col text-center"
                          onClick={e => onAddingRow(e, "caregiver", index)}
                        >
                          <i className="fa fa-arrow-down" />
                        </td>
                        {daysArr.map((key: any, i: number) => {
                          return (
                            <Cell
                              key={`${key}-${i}`}
                              day={key}
                              list={list}
                              handleSelectedAvailability
                            />
                          );
                        })}
                      </tr>
                    );
                  })
                ) : !loading && careGiversList && !careGiversList.length ? (
                  <tr className={"text-center no-hover-row"}>
                    <td colSpan={40} className={"pt-5 pb-5"}>
                      <div className="no-data-section">
                        <div className="no-data-icon">
                          <i className="icon-ban" />
                        </div>
                        <h4 className="mb-1">
                          Currently there are no CareGiver added.{" "}
                        </h4>
                      </div>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
          </div>
        </div>
      </SelectableGroup>
      <DetaillistCaregiverPopup
        show={showList ? true : false}
        handleClose={() => setShowList(false)}
      />
    </>
  );
};

export default CaregiverListView;
