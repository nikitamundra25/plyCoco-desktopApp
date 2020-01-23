import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { ITooltipProps } from '../../interfaces';
import { Link } from 'react-router-dom';

const ButtonTooltip = (props: ITooltipProps) => {
  return (
    <Link to={props.redirectUrl} className='btn-icon mr-2'>
      <span id={props.id}>
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
