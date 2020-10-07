import React from "react";
import { createSelectable } from "react-selectable-fast";
import classnames from "classnames";
import moment from "moment";

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
  selectedcareGiverIndexes,
}: any) => {
  let isBlocked: boolean = false;
  if (item) {
    isBlocked = item.f === "block" || item.s === "block" || item.n === "block";
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
      : "";

  // let showAppointedCareGiver: boolean = false;
  // if (canstitutionCell && caregiverCell) {
  //   if (canstitutionCell === caregiverCell) {
  //     showAppointedCareGiver = true;
  //   }
  // }

  // Date condition to not display fsn if date is before today
  let isBeforedate = false;
  if (item && item.date) {
    isBeforedate = moment(item.date).isBefore(moment(), "day")
  }

  let isMatching: boolean = false,
    isConfirm: boolean = false,
    isContractCancel: boolean = false,
    isContractInitiated: boolean = false,
    isSingleButtonAccepted: boolean = false,
    isTimeSheetPending: boolean = false,
    isInvoiceInitiated: boolean = false;
  if (item) {
    if (item.status === "linked") {
      isMatching = true;
    } else if (
      item.status === "confirmed" 
    ) {
      isConfirm = true;
    } else if (item.status === "contractCancelled") {
      isContractCancel = true;
    } else if (item.status === "contractInitiated") {
      isContractInitiated = true;
    } else if (item.status === "invoiceInitiated") {
      isInvoiceInitiated = true;    
    } else if (item.status === "accepted") {
      isSingleButtonAccepted = true;
    } else if (item.status === "timeSheetPending" ||
    item.status === "timeSheetUpdated") {
      isTimeSheetPending = true;
    }
  }

  return (
    <>
      <div
        key={key}
        className={classnames({
          "calender-col": true,
          "text-center": true,
          "custom-appointment-col": true,
          "cursor-pointer": true,
          "selecting-cell-bg": !isSelected
            ? isSelecting ||
              selectedcareGiverIndexes.includes(cellIndex) ||
              (selectedcareGiverApptId.length &&
                selectedcareInstApptId.length &&
                JSON.stringify(selectedcareGiverApptId) ===
                  JSON.stringify(selectedcareInstApptId) &&
                selectedcareGiverApptId.includes(caregiverCell))
            : // (showAppointedCareGiver && canstitutionCell === caregiverCell) ||
              true,
          // 'selecting-cell': isSelecting,
          weekend: daysArr,
          "contact-initiate-bg":
            isContractInitiated && !isSelected ? isContractInitiated : false,
            
          "invoice-bg":
          isInvoiceInitiated && !isSelected ? isInvoiceInitiated : false,

          "cancel-contract-bg":
            isContractCancel && !isSelected ? isContractCancel : false,
          "block-bg": item ? (isBlocked ? true : false) : false,
          "matching-bg": isMatching && !isSelected ? isMatching : false,
          "confirmation-bg":
            isTimeSheetPending && !isSelected ? isTimeSheetPending : false,
          "contract-bg": isConfirm && !isSelected ? isConfirm : false,
          "accepted-bg":
            isSingleButtonAccepted && !isSelected
              ? isSingleButtonAccepted
              : false,
          "availability-dark-bg": !isSelected
            ? item
              ? item.f === "available" ||
                item.s === "available" ||
                item.n === "available"
                ? item && item.status === "default" && isBeforedate
                  ? false
                  : true
                : false
              : false
            : false,
          "availability-bg":
            !isSelected && item && item.status === "default" && isBeforedate
              ? true
              : false,
        })}
        ref={selectableRef}
      >
        {item ? (
          // item.status === 'confirmed' ? (
          //   <i className='fa fa-circle-o'></i>
          // ) :
          item.status === "timeSheetPending" ? (
            <i className="fa fa-circle-o"></i>
          ) : item.status === "timeSheetUpdated" ? (
            <i className="fa fa-check"></i>
          ) : item.status === "invoiceInitiated" ? (
            <i className="fa fa-euro"></i>
          ) : isBlocked ? (
            <i className="fa fa-ban"></i>
          ) : item.status === "default" && isBeforedate ? null : (
            <>
              {item.f === "available" ? "f" : null}
              {item.s === "available" ? "s" : null}
              {item.n === "available" ? "n" : null}
            </>
          )
        ) : null}
      </div>
    </>
  );
};

export default createSelectable(Cell);
