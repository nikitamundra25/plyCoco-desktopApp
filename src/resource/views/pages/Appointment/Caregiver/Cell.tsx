import React from 'react';
import { createSelectable } from 'react-selectable-fast';
import classnames from 'classnames';

const Cell = ({ selectableRef, isSelected, isSelecting, item, key }: any) => {
  // // Filter current date data
  // const temp = item.filter((avabilityData: any) => {
  //   return (
  //     moment(day.isoString).format('DD.MM.YYYY') ===
  //     moment(avabilityData.date).format('DD.MM.YYYY')
  //   );
  // })[0];
  let isBlocked: boolean = false;
  if (item) {
    isBlocked = item.f === 'block' || item.s === 'block' || item.n === 'block';
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
          'cell-block': item ? (isBlocked ? true : false) : false,
          'cell-available': !isSelected
            ? item
              ? item.f === 'available' ||
                item.s === 'available' ||
                item.n === 'available'
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
        {item ? (
          isBlocked ? (
            <i className='fa fa-ban'></i>
          ) : (
            <>
              {item.f === 'available' ? 'f' : null}
              {item.s === 'available' ? 's' : null}
              {item.n === 'available' ? 'n' : null}
            </>
          )
        ) : null}
      </td>
    </>
  );
};

export default createSelectable(Cell);
