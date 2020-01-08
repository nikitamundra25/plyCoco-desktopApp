import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import { ITooltipProps } from "../../interfaces";

const InputFieldTooltip = (props: ITooltipProps) => {  
  return (
    <span id={props.id}>
      <UncontrolledTooltip
        placement={props.position ? props.position : "top"}
        target={props.id}
      >
        {props.message}

      </UncontrolledTooltip>
      <i className="fa fa-info"></i>
    </span>
  );
};

export default InputFieldTooltip;
