import React, { FunctionComponent, useState } from "react";
import {
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "../index.scss";
import {
  IAppointmentCareInstitutionList,
  IDaysArray
} from "../../../../../interfaces";
import Loader from "../../../containers/Loader/Loader";
import { SelectableGroup, SelectAll, DeselectAll } from "react-selectable-fast";
import CellCareinstitution from "./Cell";
import moment from "moment";
import DetaillistCareinstitutionPopup from "../DetailListCareinstitution";
const CarinstituionListView: FunctionComponent<IAppointmentCareInstitutionList &
  any> = (props: IAppointmentCareInstitutionList & any) => {
  const {
    daysData,
    careInstitutionList,
    loading,
    onAddingRow,
    handleSelectedUser,
    handleSecondStar,
    handleReset,
    handleFirstStarCanstitution,
    careInstituionDeptData,
    starCanstitution,
    deptLoading,
    onhandleSecondStarCanstitution
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
      if (starMarkIndex === index) {
        setstarMark(!starMark);
        handleSecondStar(list, index, name);
      }
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
      "careinstitution",
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
        // resetOnStart
        onSelectionFinish={onSelectFinish}
        onSelectionClear={onSelectionClear}
        ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}
      >
        <div className="calender-section custom-scrollbar  mt-3">
          <Table hover bordered className="mb-0 appointment-table">
            <thead className="thead-bg">
              <tr>
                <th className="thead-sticky name-col custom-appointment-col ">
                  <div className="position-relative">
                    CareInstitution
                    <UncontrolledDropdown className="custom-dropdown options-dropdown">
                      <DropdownToggle
                        className={"text-capitalize btn-more"}
                        size="sm"
                      >
                        <i className="icon-options-vertical" />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <span>New appointment</span>
                        </DropdownItem>
                        <DropdownItem>
                          <span>Delete free appointments</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Select all appointments of the caregiver</span>
                        </DropdownItem>{" "}
                        <DropdownItem onClick={() => setShowList(true)}>
                          <span>Detailed List</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>
                            Select available caregivers, offer them appointments
                            and set them on offered (sorted by division)
                          </span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>
                            Select available caregivers, offer them appointments
                            and set them on offered (sorted by day)
                          </span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>
                            Select available caregivers, offer them appointments
                            and set them on offered (no direct booking; sorted
                            by division)
                          </span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>
                            Select available caregivers, offer them appointments
                            and set them on offered (no direct booking; sorted
                            by day)
                          </span>
                        </DropdownItem>
                        <DropdownItem>
                          <span>Set on offered</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Link appointments</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Unlink appointments</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Offer caregivers (ordered by day)</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>
                            Offer appointments (ordered by department)
                          </span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Confirm appointments (ordered by day) </span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>
                            Confirm appointments (ordered by department){" "}
                          </span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Set on confirmed </span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Reset confirmed</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Create prepayment invoice</span>
                        </DropdownItem>{" "}
                        <DropdownItem>
                          <span>Refresh </span>
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
                  A
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
              {loading ? (
                <tr>
                  <td className={"table-loader"} colSpan={40}>
                    <Loader />
                  </td>
                </tr>
              ) : careInstituionDeptData &&
                !careInstituionDeptData.length &&
                !starCanstitution ? (
                careInstitutionList && careInstitutionList.length ? (
                  careInstitutionList.map((list: any, index: number) => {
                    return (
                      <tr key={index}>
                        <th className="thead-sticky name-col custom-appointment-col">
                          <div
                            className="text-capitalize view-more-link one-line-text"
                            onClick={() =>
                              handleSelectedUser(list, null, "careinstitution")
                            }
                          >
                            {!list.newRow
                              ? `${list.lastName ? list.lastName : ""} ${
                                  list.firstName ? list.firstName : ""
                                }`
                              : ""}
                          </div>
                        </th>
                        <td className="h-col custom-appointment-col text-center"></td>
                        <td
                          className="s-col custom-appointment-col text-center"
                          onClick={() => handleFirstStarCanstitution(list)}
                        >
                          {starMarkIndex === index || starCanstitution ? (
                            <i className="fa fa-star-o icon-d" />
                          ) : (
                            <i className="fa fa-star-o" />
                          )}
                        </td>
                        <td
                          className="u-col custom-appointment-col text-center"
                          onClick={() =>
                            onhandleSecondStar(list, index, "careinstitution")
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
                          onClick={e =>
                            onAddingRow(e, "careinstitution", index)
                          }
                        >
                          <i className="fa fa-arrow-down" />
                        </td>
                        {/* map */}
                        {daysArr.map((key: any, i: number) => {
                          return (
                            <CellCareinstitution
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
                ) : (
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
                )
              ) : deptLoading ? (
                <tr>
                  <td className={"table-loader"} colSpan={40}>
                    <Loader />
                  </td>
                </tr>
              ) : careInstituionDeptData && careInstituionDeptData.length ? (
                careInstituionDeptData.map((dept: any, index: number) => {
                  if (!dept.locked) {
                    return (
                      <tr key={`${dept.id}-${index}`}>
                        <th className="name-col custom-appointment-col thead-sticky">
                          <div
                            className="text-capitalize view-more-link one-line-text"
                            // onClick={() =>
                            //   handleSelectedUser(list, null, 'caregiver')
                            // }
                          >
                            {!dept.newRow ? (dept.name ? dept.name : "") : ""}
                          </div>
                        </th>
                        <td className="h-col custom-appointment-col text-center"></td>
                        <td
                          className="s-col custom-appointment-col text-center"
                          onClick={() => handleFirstStarCanstitution(null)}
                        >
                          {starMark ? (
                            <i className="fa fa-star-o icon-d" />
                          ) : (
                            <i className="fa fa-star-o" />
                          )}
                        </td>
                        <td
                          className="u-col custom-appointment-col text-center"
                          onClick={() => onhandleSecondStarCanstitution(dept)}
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
                            <CellCareinstitution
                              key={`${key}-${i}`}
                              day={key}
                              list={dept}
                              handleSelectedAvailability
                            />
                          );
                        })}
                      </tr>
                    );
                  }
                })
              ) : (
                <tr className={"text-center no-hover-row"}>
                  <td colSpan={40} className={"pt-5 pb-5"}>
                    <div className="no-data-section">
                      <div className="no-data-icon">
                        <i className="icon-ban" />
                      </div>
                      <h4 className="mb-1">
                        Currently there are no Department added for this care
                        institution.{" "}
                      </h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </SelectableGroup>

      <DetaillistCareinstitutionPopup
        show={showList ? true : false}
        handleClose={() => setShowList(false)}
      />
    </>
  );
};

export default CarinstituionListView;
