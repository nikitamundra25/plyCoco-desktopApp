import React from "react";
import { getDaysArrayByMonth } from "../../../../../helpers";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import classname from "classnames";
import moment from "moment";
import { CaregiverRightClickOptions } from "./CaregiverRightClickOptions";
import {
  AppRoutes,
  CaregiverTIMyoCYAttrId,
  deactivatedListColor,
  leasingListColor,
  PAGE_LIMIT,
  selfEmployesListColor,
} from "../../../../../config";
import Loader from "../../../containers/Loader/Loader";
import { Link } from "react-router-dom";

const staticHeader = ["caregiver", "H", "S", "U", "V"];

export const SelectableCell = React.memo(
  createSelectable(
    ({
      selectableRef,
      isSelecting,
      isSelected,
      isWeekend,
      item,
      cellIndex,
    }: any) => {
      let isMatching: boolean = false,
        isConfirm: boolean = false,
        isContractCancel: boolean = false,
        isContractInitiated: boolean = false,
        isSingleButtonAccepted: boolean = false,
        isTimeSheetPending: boolean = false,
        isInvoiceInitiated: boolean = false;
      if (item.status === "linked") {
        isMatching = true;
      } else if (item.status === "confirmed") {
        isConfirm = true;
      } else if (item.status === "contractCancelled") {
        isContractCancel = true;
      } else if (item.status === "contractInitiated") {
        isContractInitiated = true;
      } else if (item.status === "invoiceInitiated") {
        isInvoiceInitiated = true;
      } else if (item.status === "accepted") {
        isSingleButtonAccepted = true;
      } else if (
        item.status === "timeSheetPending" ||
        item.status === "timeSheetUpdated"
      ) {
        isTimeSheetPending = true;
      }

      let isBlocked: boolean = false;
      if (item) {
        isBlocked =
          item.f === "block" || item.s === "block" || item.n === "block";
      }

      let caregiverCell: any =
        item && item.appointments && item.appointments[0]
          ? item.appointments[0].id
          : "";
      // Date condition to not display fsn if date is before today
      let isBeforedate = false;
      if (item && item.date) {
        isBeforedate = moment(item.date).isBefore(moment(), "day");
      }
      return (
        <>
          <span
            className={classname({
              "calender-col": true,
              "text-center": true,
              "custom-appointment-col": true,
              "cursor-pointer": true,
              //   "selecting-cell-bg": !isSelected
              // ? isSelecting ||
              //   selectedcareGiverIndexes.includes(cellIndex) ||
              //   (selectedcareGiverApptId.length &&
              //     selectedcareInstApptId.length &&
              //     JSON.stringify(selectedcareGiverApptId) ===
              //       JSON.stringify(selectedcareInstApptId) &&
              //     selectedcareGiverApptId.includes(caregiverCell))
              // : // (showAppointedCareGiver && canstitutionCell === caregiverCell) ||
              //   true,
              "selecting-cell-bg": isSelecting || isSelected,
              weekend: isWeekend,
              "contact-initiate-bg":
                isContractInitiated && !isSelected
                  ? isContractInitiated
                  : false,

              "invoice-bg":
                isInvoiceInitiated && !isSelected ? isInvoiceInitiated : false,
              "cancel-contract-bg":
                isContractCancel && !isSelected ? isContractCancel : false,
              "block-bg": item ? (isBlocked ? true : false) : false,
              "matching-bg": isMatching && !isSelected ? isMatching : false,
              "confirmation-bg":
                isTimeSheetPending && !isSelected ? isTimeSheetPending : false,
              "contract-bg": isConfirm && !isSelected ? isConfirm : false,
              "accepted-bg":
                isSingleButtonAccepted && !isSelected
                  ? isSingleButtonAccepted
                  : false,
              "availability-dark-bg": !isSelected
                ? item
                  ? item.f === "available" ||
                    item.s === "available" ||
                    item.n === "available"
                    ? item && item.status === "default" && isBeforedate
                      ? false
                      : true
                    : false
                  : false
                : false,
              "availability-bg":
                !isSelected && item && item.status === "default" && isBeforedate
                  ? true
                  : false,
            })}
            ref={selectableRef}
          >
            {item.status === "timeSheetPending" ? (
              <i className="fa fa-circle-o"></i>
            ) : item.status === "timeSheetUpdated" ? (
              <i className="fa fa-check"></i>
            ) : item.status === "invoiceInitiated" ? (
              <i className="fa fa-euro"></i>
            ) : item.f === "block" ||
              item.s === "block" ||
              item.n === "block" ? (
              <i className="fa fa-ban"></i>
            ) : item.status === "default" &&
              new Date(item.date).toTimeString() <
                new Date().toTimeString() ? null : (
              <>
                {item.f === "available" ? "f" : null}
                {item.s === "available" ? "s" : null}
                {item.n === "available" ? "n" : null}
              </>
            )}
          </span>
        </>
      );
    }
  )
);

class CaregiverList extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      days: getDaysArrayByMonth().daysArr,
      selectedCells: [],
      openToggleMenu: false,
      totalCaregiver: this.props.totalCount,
      // loadedAll: this.props.result.length < 30,
    };
  }

  //Mange right click options menu
  handleToggleMenuItem = () => {
    const { openToggleMenu } = this.state;
    this.setState({
      openToggleMenu: !openToggleMenu,
    });
  };

  //Set data on select cell loaded
  onSelectFinish = (selectedCellsData: any[]) => {
    const { handleSelection } = this.props;
    let selectedRows: any[] = [];
    if (selectedCellsData && selectedCellsData.length) {
      selectedRows = selectedCellsData.map((selectedCell: any) => {
        const { props: cellProps } = selectedCell;

        const { item, list: caregiverData, cellIndex, day } = cellProps;
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
          cellIndex,
        };
      });
      handleSelection(selectedRows, "caregiver");
    }
  };


  

  /**
   *
   * @param arg
   */
   handleEndReached = (arg: any) => {
     const {hasMore,loadingCaregiver,page, setPage, isLoading,getMoreCaregivers} = this.props;
    if ((!loadingCaregiver && isLoading) || !hasMore) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
    getMoreCaregivers(nextPage);
  };



  render() {
    const {
      caregiverData: result,
      daysData,
      onhandleCaregiverStar,
      starCaregiver,
      loadingCaregiver,
      onAddNewRow,
      isLoading
    } = this.props;
    const { days, openToggleMenu } = this.state;
    const columns = [...staticHeader, ...daysData.daysArr];
    const appointmentListSection = document.getElementById(
      "appointment_list_section"
    );

    return (
      <>
        <div
          className={classname({
            "right-manu-close": true,
            "d-none": !openToggleMenu,
          })}
          onClick={this.handleToggleMenuItem}
        ></div>
        <CaregiverRightClickOptions
          isOpen={openToggleMenu}
          hide={() => this.setState({ openToggleMenu: false })}
        />

        {result && result.length ? (
          <SelectableGroup
            allowClickWithoutSelected
            className="custom-row-selector new-base-table"
            clickClassName="tick"
            resetOnStart={true}
            allowCtrlClick={false}
            onSelectionFinish={this.onSelectFinish}
            ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}
          >
            <BaseTable
              data={result}
              width={
                appointmentListSection
                  ? appointmentListSection.clientWidth - 40
                  : 1000
              }
              height={this.props.setHeight}
              fixed
              onEndReachedThreshold={300}
              onEndReached={this.handleEndReached}
              headerClassName="custom-appointment-row"
              overlayRenderer={() =>
                loadingCaregiver || isLoading ? (
                  <>
                   <div
                  style={{
                    pointerEvents: "none",
                    background: "rgba(32, 60, 94, 0.3)",
                    position: "absolute",
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "5px 15px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      marginRight: "5px",
                    }}
                  >
                    Loading...
                  </span>
                </div>
                  </>
                ) : null
              }
              headerRenderer={() =>
                columns.map((d: any, index: number) =>
                  staticHeader.indexOf(d) > -1 ? (
                    <React.Fragment key={`${d.id}-${index}`}>
                      <span
                        className={`custom-appointment-col  ${
                          d === "caregiver" ? "name-col" : ""
                        }`}
                      >
                        {d}
                        {d === "caregiver" ? (
                          <>
                            <span onClick={this.handleToggleMenuItem}>
                              <i className="icon-options-vertical" />
                            </span>
                          </>
                        ) : null}
                      </span>
                    </React.Fragment>
                  ) : (
                    <span key={d.date} className="custom-appointment-col  ">
                      {d.day}
                      <br />
                      {d.date}
                    </span>
                  )
                )
              }
              rowClassName="custom-appointment-row"
              rowRenderer={({ cells, rowData }: any) => (
                <div
                  className="d-flex frozen-row"
                  title={[rowData.lastName, rowData.firstName].join(" ")}
                >
                  {cells}
                </div>
              )}
            >
              {columns.map((d: any, index: number) => (
                <Column
                  key={`col0-${index}-${
                    typeof d === "string" ? d : d.dateString
                  }`}
                  width={index === 0 ? 140 : 28}
                  className={`custom-appointment-col   ${
                    d === "caregiver" ? "name-col" : ""
                  }`}
                  frozen={typeof d === "string"}
                  cellRenderer={({ rowData, rowIndex }: any) => {
                    switch (d) {
                      case "caregiver":
                        return (
                          <div
                            key={rowIndex}
                            className="custom-appointment-col name-col appointment-color1 text-capitalize view-more-link one-line-text"
                            style={{
                              backgroundColor: !rowData.isActive
                                ? deactivatedListColor
                                : rowData.caregiver &&
                                  rowData.caregiver.attributes
                                ? rowData.caregiver.attributes.includes(
                                    CaregiverTIMyoCYAttrId
                                  )
                                  ? leasingListColor
                                  : rowData.caregiver.attributes.includes(
                                      "Plycoco"
                                    )
                                  ? selfEmployesListColor
                                  : ""
                                : "",
                            }}
                            title={[rowData.lastName, rowData.firstName].join(
                              " "
                            )}
                            id={`caregiver-${rowData.id}-${index}-${rowData.row}`}
                          >
                            <Link
                              to={AppRoutes.CARE_GIVER_VIEW.replace(
                                ":id",
                                rowData.id
                              )}
                              target="_blank"
                              className="text-body"
                            >
                              {[rowData.lastName, rowData.firstName].join(" ")}
                            </Link>
                          </div>
                        );
                      case "H":
                        return <span key={rowIndex}>H</span>;
                      case "S":
                        return (
                          <span
                            key={rowIndex}
                            className="custom-appointment-col s-col text-center"
                            onClick={() =>
                              onhandleCaregiverStar(
                                rowData.id,
                                false,
                                `${rowData.firstName + rowData.lastName}`
                              )
                            }
                          >
                            {starCaregiver &&
                            starCaregiver.isStar &&
                            starCaregiver.id == rowData.id ? (
                              <i className="fa fa-star theme-text" />
                            ) : (
                              <i className="fa fa-star-o" />
                            )}
                          </span>
                        );
                      case "U":
                        return (
                          <span
                            key={rowIndex}
                            className="custom-appointment-col u-col text-center"
                            onClick={() =>
                              onhandleCaregiverStar(
                                rowData.id,
                                starCaregiver && !starCaregiver.isSecondStar
                              )
                            }
                          >
                            {starCaregiver &&
                            starCaregiver.isSecondStar &&
                            starCaregiver.id === rowData.id ? (
                              <i className="fa fa-star theme-text" />
                            ) : (
                              <i className="fa fa-star-o" />
                            )}
                          </span>
                        );
                      case "V":
                        return (
                          <span
                            key={rowIndex}
                            className="custom-appointment-col v-col text-center"
                            onClick={(
                              e: React.MouseEvent<HTMLDivElement, MouseEvent>
                            ) => onAddNewRow( "caregiver", rowIndex)}
                          >
                            <i className="fa fa-arrow-down" />
                          </span>
                        );
                      default:
                        let currentAvail = "";
                        if (rowData && rowData.availabilityData) {
                          currentAvail = rowData.availabilityData.filter(
                            (avabilityData: any) => {
                              return (
                                moment(d.isoString).format("DD.MM.YYYY") ===
                                moment(avabilityData.date).format("DD.MM.YYYY")
                              );
                            }
                          )[0];
                        }

                        return (
                          <React.Fragment key={rowIndex}>
                            <SelectableCell
                              item={currentAvail || {}}
                              isWeekend={d.isWeekend}
                              list={rowData}
                              day={d}
                              // cellIndex={`${cellIndex}-${index}`}
                            />
                          </React.Fragment>
                        );
                    }
                  }}
                />
              ))}
            </BaseTable>
          </SelectableGroup>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

export default React.memo(CaregiverList);
