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
            //"custom-appointment-col": true,
            //"calender-col": true,
          })}
          ref={selectableRef}>
          sel
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
    //columns[0].width = 300

    return (
      <>
        <SelectableGroup
          allowClickWithoutSelected
          className='custom-row-selector new-base-table'
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
           // columns={fixedColumns}
           headerClassName='custom-appointment-row'
            headerRenderer={() =>
              columns.map((d: any) =>
                staticHeader.indexOf(d) > -1 ? (
                  
                <span key={d}  className={`custom-appointment-col  ${ d === "caregiver" ? "name-col" : ""}`} >
                  {d}
                </span>
                  
                  
                ) : (
                  <span key={d.date} className="custom-appointment-col  ">
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
              
                width={index ===0 ? 140 : 28}
                className={`custom-appointment-col   ${ d === "caregiver" ? "name-col" : ""}`}
                
                
                frozen={typeof d === "string"}
                cellRenderer={({ column, columnIndex, rowData }: any) => {
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
                      return (
                        <span >
                          H
                        </span>
                      );
                    case "S":
                      return (
                        <span className=''>
                         S
                        </span>
                      );
                    case "V":
                      return (
                        <span className=''>
                          {" "}
                          V
                        </span>
                      );
                    case "U":
                      return <span className=''>U</span>;
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
