import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { ITooltipProps } from '../../../../interfaces';
import { Link } from 'react-router-dom';

const ButtonTooltip = (props: ITooltipProps) => {
  const { id, message, position, children, redirectUrl, currentPage } = props;
  return (
    <Link
      to={{
        pathname: redirectUrl,
        state: {
          currentPage,
        },
      }}
      className='btn-icon mr-2'
      id={id}
    >
      <span>
        <UncontrolledTooltip
          placement={position ? position : 'top'}
          target={id}
        >
          {message}
        </UncontrolledTooltip>
        {children}
      </span>
    </Link>
  );
};

export default ButtonTooltip;
