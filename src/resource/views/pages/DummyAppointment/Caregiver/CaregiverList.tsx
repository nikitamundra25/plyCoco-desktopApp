import React, { FunctionComponent, useState } from "react";
import { getDaysArrayByMonth } from "../../../../../helpers";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import classname from "classnames";
import { ceil } from "lodash";
const staticHeader = ["caregiver", "H", "S", "U", "V"];

export const SelectableCell = createSelectable(
  ({ selectableRef, isSelecting, isSelected, isWeekend }: any) => {
    return (
      <>
        <span
          className={classname({
            "selecting-cell-bg": isSelecting || isSelected,
            weekend: isWeekend,
            "custom-appointment-col": true,
            "calender-col": true,
          })}
          ref={selectableRef}>
          Selectable div
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
    };
  }
  render() {
    const {
      caregiverData: { result, totalCount },
    } = this.props;
    const { days } = this.state;

    const columns = [...staticHeader, ...days];
    return (
      <>
        <SelectableGroup
          allowClickWithoutSelected
          className='custom-row-selector'
          clickClassName='tick'
          resetOnStart={true}
          allowCtrlClick={false}
          onSelectionFinish={(cells: any) => {
            console.log(cells);
          }}
          ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}>
          <BaseTable
            data={result}
            width={600}
            height={400}
            fixed
            headerRenderer={() =>
              columns.map((d: any) =>
                staticHeader.indexOf(d) > -1 ? (
                  <span style={{ margin: 10 }} key={d}>
                    {d}
                  </span>
                ) : (
                  <span style={{ margin: 10 }} key={d.date}>
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
                className='custom-appointment-col name-col appointment-color1 text-capitalize view-more-link one-line-text'
                title={[rowData.lastName, rowData.firstName].join(" ")}>
                {cells}
              </div>
            )}>
            {columns.map((d: any) => (
              <Column
                key={`col0-${typeof d === "string" ? d : d.dateString}`}
                width={50}
                frozen={typeof d === "string"}
                cellRenderer={({ column, columnIndex, rowData }: any) => {
                  switch (d) {
                    case "caregiver":
                      return (
                        <span className='custom-appointment-col name-col calender-col'>
                          {[rowData.lastName, rowData.firstName]
                            .join(" ")
                            .trim() || "-"}
                        </span>
                      );
                    case "H":
                      return (
                        <span className='custom-appointment-col h-col calender-col'>
                          Blank div
                        </span>
                      );
                    case "S":
                      return (
                        <span className='custom-appointment-col s-col calender-col'>
                          Blank div
                        </span>
                      );
                    case "V":
                      return (
                        <span className='custom-appointment-col v-col'>
                          {" "}
                          Blank div
                        </span>
                      );
                    case "U":
                      return <span className='u-col'>Blank div</span>;
                    default:
                      return <SelectableCell isWeekend={d.isWeekend} />;
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
