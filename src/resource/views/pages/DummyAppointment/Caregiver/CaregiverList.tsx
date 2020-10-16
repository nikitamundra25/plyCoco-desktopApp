import React, { FunctionComponent, useState } from "react";
import { getDaysArrayByMonth } from "../../../../../helpers";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import classname from "classnames";
import moment from "moment";
import { CaregiverRightClickOptions } from "./CaregiverRightClickOptions";

const staticHeader = ["caregiver", "H", "S", "U", "V"];

export const SelectableCell = createSelectable(
  ({ selectableRef, isSelecting, isSelected, isWeekend, item }: any) => {
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

    return (
      <>
        <span
          className={classname({
            "selecting-cell-bg": isSelecting || isSelected,
            weekend: isWeekend,
          })}
          ref={selectableRef}>
          {item.status === "timeSheetPending" ? (
            <i className='fa fa-circle-o'></i>
          ) : item.status === "timeSheetUpdated" ? (
            <i className='fa fa-check'></i>
          ) : item.status === "invoiceInitiated" ? (
            <i className='fa fa-euro'></i>
          ) : item.f === "block" || item.s === "block" || item.n === "block" ? (
            <i className='fa fa-ban'></i>
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
);

class CaregiverList extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      days: getDaysArrayByMonth().daysArr,
      selectedCells: [],
      openToggleMenu: false,
    };
  }
  handleToggleMenuItem = () => {
    this.setState({
      openToggleMenu: !this.state.openToggleMenu,
    });
  };
  onSelectFinish = (selectedCellsData: any[]) => {
    const { handleSelection } = this.props;
    if (handleSelection) {
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
    }
  };
  render() {
    const {
      caregiverData: { result, totalCount },
    } = this.props;
    const { days, openToggleMenu } = this.state;
    const columns = [...staticHeader, ...days];

    return (
      <>
        <div
          className={classname({
            "right-manu-close": true,
            "d-none": !openToggleMenu,
          })}
          onClick={this.handleToggleMenuItem}></div>
        <CaregiverRightClickOptions
          isOpen={openToggleMenu}
          hide={() => this.setState({ openToggleMenu: false })}
        />

        <SelectableGroup
          allowClickWithoutSelected
          className='custom-row-selector new-base-table'
          clickClassName='tick'
          resetOnStart={true}
          allowCtrlClick={false}
          onSelectionFinish={this.onSelectFinish}
          ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}>
          <BaseTable
            data={result}
            width={600}
            height={400}
            fixed
            headerClassName='custom-appointment-row'
            headerRenderer={() =>
              columns.map((d: any) =>
                staticHeader.indexOf(d) > -1 ? (
                  <React.Fragment key={d}>
                    <span
                      className={`custom-appointment-col  ${
                        d === "caregiver" ? "name-col" : ""
                      }`}>
                      {d}
                      {d === "caregiver" ? (
                        <>
                          <span onClick={this.handleToggleMenuItem}>
                            <i className='icon-options-vertical' />
                          </span>
                        </>
                      ) : null}
                    </span>
                  </React.Fragment>
                ) : (
                  <span key={d.date} className='custom-appointment-col  '>
                    {d.day}
                    <br />
                    {d.date}
                  </span>
                )
              )
            }
            rowClassName='custom-appointment-row'
            rowRenderer={({ cells, rowData }: any) => (
              <div
                className='d-flex frozen-row'
                title={[rowData.lastName, rowData.firstName].join(" ")}>
                {cells}
              </div>
            )}>
            {columns.map((d: any, index: number) => (
              <Column
                key={`col0-${typeof d === "string" ? d : d.dateString}`}
                width={index === 0 ? 140 : 28}
                className={`custom-appointment-col   ${
                  d === "caregiver" ? "name-col" : ""
                }`}
                frozen={typeof d === "string"}
                cellRenderer={({ rowData }: any) => {
                  switch (d) {
                    case "caregiver":
                      return (
                        <span className='view-more-link one-line-text name-col'>
                          {[rowData.lastName, rowData.firstName]
                            .join(" ")
                            .trim() || "-"}
                        </span>
                      );
                    case "H":
                      return <span>H</span>;
                    case "S":
                      return <span className=''>S</span>;
                    case "V":
                      return <span className=''> V</span>;
                    case "U":
                      return <span className=''>U</span>;
                    default:
                      const currentAvail = rowData.caregiver_avabilities.filter(
                        (av: any) => av.date === d.dateString
                      );
                      return (
                        <SelectableCell
                          item={currentAvail[0] || {}}
                          isWeekend={d.isWeekend}
                          list={rowData}
                        />
                      );
                  }
                }}
              />
            ))}
          </BaseTable>
        </SelectableGroup>
      </>
    );
  }
}

export default React.memo(CaregiverList);
