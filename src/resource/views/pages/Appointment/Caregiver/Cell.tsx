import React from 'react';
import { createSelectable } from 'react-selectable-fast';
import classnames from 'classnames';

const Cell = ({
  selectableRef,
  isSelected,
  isSelecting,
  item,
  key,
  daysArr
}: any) => {
  // // Filter current date data
  // const temp = item.filter((avabilityData: any) => {
  //   return (
  //     moment(day.isoString).format('DD.MM.YYYY') ===
  //     moment(avabilityData.date).format('DD.MM.YYYY')
  //   );
  // })[0];
  console.log('daysArr', daysArr);
  // let isWeekend: any;
  // if (daysArr) {
  //   isWeekend = daysArr.map((key: any) => {
  //     isWeekend = key.isWeekend;
  //   });
  // }
  // console.log('isWeekend in cell', isWeekend);

  let isBlocked: boolean = false;
  if (item) {
    isBlocked = item.f === 'block' || item.s === 'block' || item.n === 'block';
  }

  let isRequirment: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false,
    isConfirm: boolean = false;
  if (item) {
    if (item.status === 'default') {
      isRequirment = true;
    } else if (item.status === 'linked') {
      isMatching = true;
    } else if (item.status === 'contract') {
      isContract = true;
    } else if (item.status === 'confirmed') {
      isConfirm = true;
    }
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
          'weekend': daysArr,
          'cell-block': item ? (isBlocked ? true : false) : false,
          'matching-bg': isMatching && !isSelected ? isMatching : false,
          'confirmation-bg': isConfirm && !isSelected ? isConfirm : false,
          'cell-available': !isSelected
            ? item
              ? item.f === 'available' ||
                item.s === 'available' ||
                item.n === 'available'
                ? true
                : false
              : false
            : false
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
          item.status === 'confirmed' ? (
            'o'
          ) : isBlocked ? (
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
