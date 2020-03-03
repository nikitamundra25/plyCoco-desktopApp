import { createSelectable } from "react-selectable-fast";
import React from "react";
import classnames from "classnames";
const Cell = ({ selectableRef, isSelected, isSelecting, day }: any) => (
  <td
    className={classnames({
      "calender-col": true,
      "text-center": true,
      "custom-appointment-col": true,
      "cursor-pointer": true,
      "selected-cell": isSelected,
      "selecting-cell": isSelecting
    })}
    ref={selectableRef}
  ></td>
);

export default createSelectable(Cell);
