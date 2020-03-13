import { createSelectable } from 'react-selectable-fast';
import React from 'react';
import classnames from 'classnames';
const CellCareinstitution = ({
  selectableRef,
  isSelected,
  isSelecting,
  item,
  daysArr,
  key
}: any) => {
  let isRequirment: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false,
    isConfirm: boolean = false,
    isOffered: boolean = false;

  if (item) {
    if (item.status === 'default') {
      isRequirment = true;
    } else if (item.status === 'linked') {
      isMatching = true;
    } else if (item.status === 'contract') {
      isContract = true;
    } else if (item.status === 'confirmed') {
      isConfirm = true;
    } else if (item.status === 'offered') {
      isOffered = true;
    }
  }
  return (
    <td
      key={key}
      className={classnames({
        'calender-col': true,
        'text-center': true,
        weekend: daysArr,
        'cell-green-caregiver': isOffered && !isSelected ? isOffered : false,
        'custom-appointment-col': true,
        'cursor-pointer': true,
        'selected-cell': isSelected,
        'selecting-cell': isSelecting,
        'requirement-bg': isRequirment && !isSelected ? isRequirment : false,
        'matching-bg': isMatching && !isSelected ? isMatching : false,
        'contract-bg': isConfirm && !isSelected ? isConfirm : false,
        'cell-available-careinstitution':
          isRequirment && !isSelected ? isRequirment : false
       
      })}
      ref={selectableRef}
      // onClick={() => handleSelectedUser(list, day, 'caregiver')}
    >
      {item ? (
        <>
          {item.f ? item.f : null}
          {item.s ? item.s : null}
          {item.n ? item.n : null}
        </>
      ) : null}
      {/* {list &&
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
        : null} */}
    </td>
  );
};

export default createSelectable(CellCareinstitution);
