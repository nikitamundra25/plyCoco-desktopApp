import { createSelectable } from 'react-selectable-fast';
import React from 'react';
import classnames from 'classnames';
const Cell = ({
  selectableRef,
  isSelected,
  isSelecting,
  day,
  list,
  handleSelectedUser
}: any) => (
  <>
    {/* {console.log(list.firstName === 'Aayushi' ? list : null, 'list')} */}
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
  </>
);

export default createSelectable(Cell);
