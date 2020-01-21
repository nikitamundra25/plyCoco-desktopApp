import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { ITooltipProps } from '../../interfaces';

const ButtonTooltip = (props: ITooltipProps) => {
  return (
    <span id={props.id} className='btn-icon mr-2' onClick={props.onBtnClick}>
      <UncontrolledTooltip
        placement={props.position ? props.position : 'top'}
        target={props.id}
      >
        {props.message}
      </UncontrolledTooltip>
      {props.children}
    </span>
  );
};

export default ButtonTooltip;
