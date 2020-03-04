import { createSelectable } from 'react-selectable-fast';
import React from 'react';
import classnames from 'classnames';

const CellCareinstitution = ({
  selectableRef,
  isSelected,
  isSelecting,
  day,
  list,
  handleSelectedUser
}: any) => (
  <td
    className={classnames({
      'calender-col': true,
      'text-center': true,
      'custom-appointment-col': true,
      'cursor-pointer': true,
      'selected-cell': isSelected,
      'selecting-cell': isSelecting
    })}
    ref={selectableRef}
    // onClick={() => handleSelectedUser(list, day, 'caregiver')}
  ></td>
);

export default createSelectable(CellCareinstitution);
