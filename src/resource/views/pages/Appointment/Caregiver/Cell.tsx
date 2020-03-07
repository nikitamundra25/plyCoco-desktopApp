import React from 'react';
import { createSelectable } from 'react-selectable-fast';
import classnames from 'classnames';
import moment from 'moment';
const Cell = ({
  selectableRef,
  isSelected,
  isSelecting,
  day,
  list,
  item,
  key,
  handleSelectedAvailability,
}: any) => {
  // Filter current date data
  const temp = item.filter((avabilityData: any, index: number) => {
    return (
      moment(day.isoString).format('DD.MM.YYYY') ===
      moment(avabilityData.date).format('DD.MM.YYYY')
    );
  })[0];
  let isBlocked: boolean = false;
  if (temp) {
    isBlocked = temp.f === 'block' || temp.s === 'block' || temp.n === 'block';
  }
  return (
    <>
      <td
        key={key}
        className={classnames({
          'calender-col': true,
          'text-center': true,
          'custom-appointment-col': true,
          'cursor-pointer': true,
          'selected-cell': isSelected,
          'selecting-cell': isSelecting,
          'cell-block': temp ? (isBlocked ? true : false) : false,
          'cell-available': !isSelected
            ? temp
              ? temp.f === 'available' ||
                temp.s === 'available' ||
                temp.n === 'available'
                ? true
                : false
              : false
            : false,
        })}
        ref={selectableRef}
      >
        {/* {list && list.caregiver_avabilities && list.caregiver_avabilities.length
        ? list.caregiver_avabilities.map(
            (avabilityData: any, index: number) => {
              return moment(day.isoString).format('DD.MM.YYYY') ===
                moment(avabilityData.date).format('DD.MM.YYYY') ? (
                <>
                  {avabilityData.f === 'available' ? 'f' : null}
                  {avabilityData.s === 'available' ? 's' : null}
                  {avabilityData.n === 'available' ? 'n' : null}
                </>
              ) : null;
            },
          )
        : null} */}
        {temp ? (
          isBlocked ? (
            <i className='fa fa-ban'></i>
          ) : (
            <>
              {temp.f === 'available' ? 'f' : null}
              {temp.s === 'available' ? 's' : null}
              {temp.n === 'available' ? 'n' : null}
            </>
          )
        ) : null}
      </td>
    </>
  );
};

export default createSelectable(Cell);
