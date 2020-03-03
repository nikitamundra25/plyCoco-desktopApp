import { createSelectable } from "react-selectable-fast";
import React from "react";
import classnames from "classnames";
const Cell = ({ selectableRef, isSelected, isSelecting }: any) => (
  <div
    className={classnames({
      "calender-col": true,
      "text-center": true,
      "custom-appointment-col": true,
      "selected-cell": isSelected,
      "selecting-cell": isSelecting
    })}
    ref={selectableRef}
  />
);

export default createSelectable(Cell);
