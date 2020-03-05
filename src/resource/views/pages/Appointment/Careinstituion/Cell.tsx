import { createSelectable } from 'react-selectable-fast';
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

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
      'selecting-cell': isSelecting,
      'cell-available': !isSelected
        ? list &&
          list.careinstitution_requirements &&
          list.careinstitution_requirements.length
          ? list.careinstitution_requirements.filter(
              (avabilityData: any, index: number) => {
                return moment(day.isoString).format('DD.MM.YYYY') ===
                  moment(avabilityData.date).format('DD.MM.YYYY') &&
                  (avabilityData.f === 'available' ||
                    avabilityData.s === 'available' ||
                    avabilityData.n === 'available')
                  ? true
                  : false;
              }
            ).length
            ? true
            : false
          : false
        : false
    })}
    ref={selectableRef}
    // onClick={() => handleSelectedUser(list, day, 'caregiver')}
  ></td>
);

export default createSelectable(CellCareinstitution);
