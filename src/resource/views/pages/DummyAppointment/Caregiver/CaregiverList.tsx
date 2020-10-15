import React, { FunctionComponent, useState } from "react";
import { getDaysArrayByMonth } from "../../../../../helpers";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
const staticHeader = ["caregiver", "H", "S", "U", "V"];

export const SelectableCell = createSelectable(({ selectableRef }: any) => {
  return (
    <>
      <span ref={selectableRef}>Selectable div</span>
    </>
  );
});

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
          onSelectionFinish={(cells: any) => {
            console.log(cells);
          }}>
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
            }>
            {columns.map((d: any) => (
              <Column
                key={`col0-${typeof d === "string" ? d : d.dateString}`}
                width={50}
                frozen={typeof d === "string"}
                cellRenderer={({ column, columnIndex, rowData }: any) => {
                  switch (d) {
                    case "caregiver":
                      return (
                        [rowData.lastName, rowData.firstName]
                          .join(" ")
                          .trim() || "-"
                      );
                    case "H":
                      return <span>Blank div</span>;
                    case "S":
                      return <span>Blank div</span>;
                    case "V":
                      return <span>Blank div</span>;
                    case "U":
                      return <span>Blank div</span>;
                    default:
                      return <SelectableCell />;
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
