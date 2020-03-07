import { createSelectable } from 'react-selectable-fast';
import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { dbAcceptableFormat } from '../../../../../config';

const CellCareinstitution = ({
  selectableRef,
  isSelected,
  isSelecting,
  day,
  list,
  key,
  handleSelectedUser
}: any) => (
  <td
    key={key}
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
                return moment(day.isoString).format(dbAcceptableFormat) ===
                  moment(avabilityData.date).format(dbAcceptableFormat) &&
                  (avabilityData.f === avabilityData.f ||
                    avabilityData.s === avabilityData.s ||
                    avabilityData.n === avabilityData.n)
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
  >
    {list &&
    list.careinstitution_requirements &&
    list.careinstitution_requirements.length
      ? list.careinstitution_requirements.map(
          (avabilityData: any, index: number) => {
            return moment(day.isoString).format('DD.MM.YYYY') ===
              moment(avabilityData.date).format('DD.MM.YYYY') ? (
              <>
                {avabilityData.f ? avabilityData.f : null}
                {avabilityData.s ? avabilityData.s : null}
                {avabilityData.n ? avabilityData.n : null}
              </>
            ) : null;
          }
        )
      : null}
  </td>
);

export default createSelectable(CellCareinstitution);
