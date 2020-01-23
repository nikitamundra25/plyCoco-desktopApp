import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { ITooltipProps } from '../../interfaces';
import { Link } from 'react-router-dom';

const ButtonTooltip = (props: ITooltipProps) => {
  return (
    <Link to={props.redirectUrl}>
      <span id={props.id} className='btn-icon mr-2'>
        <UncontrolledTooltip
          placement={props.position ? props.position : 'top'}
          target={props.id}
        >
          {props.message}
        </UncontrolledTooltip>
        {props.children}
      </span>
    </Link>
  );
};

export default ButtonTooltip;
