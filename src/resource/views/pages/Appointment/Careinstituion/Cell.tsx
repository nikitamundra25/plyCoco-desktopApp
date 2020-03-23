import { createSelectable } from 'react-selectable-fast';
import React from 'react';
import classnames from 'classnames';
const CellCareinstitution = ({
  selectableRef,
  isSelected,
  isSelecting,
  item,
  daysArr,
  key,
  showSelectedCaregiver
}: any) => {
  let isRequirment: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false,
    isConfirm: boolean = false,
    isOffered: boolean = false,
    showAppointedCareGiver: boolean = false;

  let caregiverId: string = '';
  if (item) {
    const { appointments = [] } = item;
    const { ca = {} } =
      appointments && appointments.length ? appointments[0] : {};
    caregiverId = ca ? ca.userId : '';
  }
  if (caregiverId) {
    if (caregiverId === showSelectedCaregiver.id) {
      showAppointedCareGiver = true;
    }
  }

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
        'availability-bg': isOffered && !isSelected ? isOffered : false,
        'custom-appointment-col': true,
        'cursor-pointer': true,
        'selecting-cell-bg':
          isSelected ||
          (showAppointedCareGiver &&
            caregiverId === showSelectedCaregiver.id) ||
          isSelecting,
        // 'selecting-cell': isSelecting,
        'requirement-bg': isRequirment && !isSelected ? isRequirment : false,
        'matching-bg':
          isMatching &&
          !isSelected &&
          !showAppointedCareGiver &&
          caregiverId !== showSelectedCaregiver.id
            ? isMatching
            : false,
        'contract-bg':
          isConfirm &&
          !isSelected &&
          !showAppointedCareGiver &&
          caregiverId !== showSelectedCaregiver.id
            ? isConfirm
            : false
        // 'cell-available-careinstitution':
        //   isRequirment && !isSelected ? isRequirment : false
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
