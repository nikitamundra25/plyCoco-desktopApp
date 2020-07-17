import React from 'react';
import { createSelectable } from 'react-selectable-fast';
import classnames from 'classnames';

const Cell = ({
  selectableRef,
  isSelected,
  isSelecting,
  item,
  key,
  cellIndex,
  daysArr,
  selectedcareInstApptId,
  selectedcareGiverApptId,
  selectedcareGiverIndexes
}: any) => {
  
  let isBlocked: boolean = false;
  if (item) {
    isBlocked = item.f === 'block' || item.s === 'block' || item.n === 'block';
  }

  // let canstitutionCell: any =
  //   selectedCellsCareinstitution &&
  //     selectedCellsCareinstitution.length &&
  //     selectedCellsCareinstitution[0] &&
  //     selectedCellsCareinstitution[0].item &&
  //     selectedCellsCareinstitution[0].item.appointments &&
  //     selectedCellsCareinstitution[0].item.appointments[0]
  //     ? selectedCellsCareinstitution[0].item.appointments[0].id
  //     : '';

  let caregiverCell: any =
    item && item.appointments && item.appointments[0]
      ? item.appointments[0].id
      : '';

  // let showAppointedCareGiver: boolean = false;
  // if (canstitutionCell && caregiverCell) {
  //   if (canstitutionCell === caregiverCell) {
  //     showAppointedCareGiver = true;
  //   }
  // }

  let isMatching: boolean = false,
    isConfirm: boolean = false,
    isContractCancel: boolean = false,
    isContractInitiated: boolean = false,
    isSingleButtonAccepted: boolean = false
  if (item) {
    if (item.status === 'linked') {
      isMatching = true;
    } else if (item.status === 'confirmed' || item.status === 'timeSheetUpdated' || item.status ==='timeSheetPending') {
      isConfirm = true;
    } else if (item.status === 'contractCancelled') {
      isContractCancel = true;
    } else if (item.status === 'contractInitiated') {
      isContractInitiated = true;
    } else if (item.status === 'accepted') {
      isSingleButtonAccepted = true;
    }
  }
  
  return (
    <>
      <div
        key={key}
        className={classnames({
          'calender-col': true,
          'text-center': true,
          'custom-appointment-col': true,
          'cursor-pointer': true,
          'selecting-cell-bg': !isSelected
          ? 
          isSelecting 
          || selectedcareGiverIndexes.includes(cellIndex) 
          ||
            (selectedcareGiverApptId.length && selectedcareInstApptId.length && JSON.stringify(selectedcareGiverApptId) === JSON.stringify(selectedcareInstApptId) && selectedcareGiverApptId.includes(caregiverCell))
            // (showAppointedCareGiver && canstitutionCell === caregiverCell) ||
            : true,
          // 'selecting-cell': isSelecting,
          weekend: daysArr,
          'contact-initiate-bg': isContractInitiated && !isSelected ? isContractInitiated : false,
          'cancel-contract-bg':
            isContractCancel && !isSelected ? isContractCancel : false,
          'block-bg': item ? (isBlocked ? true : false) : false,
          'matching-bg': isMatching && !isSelected ? isMatching : false,
          'confirmation-bg': isConfirm && !isSelected ? isConfirm : false,
          'accepted-bg': isSingleButtonAccepted && !isSelected ? isSingleButtonAccepted : false,
          'availability-dark-bg': !isSelected
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
        {item ? (
          item.status === 'confirmed' ? (
            <i className='fa fa-circle-o'></i>
          ) : item.status === 'timeSheetPending' ? (
            <i className='fa fa-clock-o'></i>
          ) :  item.status === 'timeSheetUpdated' ? (
            <i  className="fa fa-check"></i>
          ) :
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
      </div>
    </>
  );
};

export default createSelectable(Cell);
