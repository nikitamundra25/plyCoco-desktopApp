import React, { lazy, Suspense, useState } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import new_appointment from '../../../../assets/img/dropdown/new_appointment.svg';
import reserve from '../../../../assets/img/dropdown/block.svg';
import delete_appointment from '../../../../assets/img/dropdown/delete.svg';
import detail_list from '../../../../assets/img/dropdown/detail_list.svg';
import filter from '../../../../assets/img/filter.svg';
import offer_sent from '../../../../assets/img/dropdown/offer_sent.svg';
import connect from '../../../../assets/img/dropdown/connect.svg';
import disconnect from '../../../../assets/img/dropdown/disconnect.svg';
import confirm_appointment from '../../../../assets/img/dropdown/confirm_appointment.svg';
import set_confirm from '../../../../assets/img/dropdown/confirm.svg';
import unset_confirm from '../../../../assets/img/dropdown/not_confirm.svg';
import leasing_contact from '../../../../assets/img/dropdown/leasing.svg';
import termination from '../../../../assets/img/dropdown/aggrement.svg';
import classnames from 'classnames';
import { ConfirmBox } from '../../../components/ConfirmBox';
import { toast } from 'react-toastify';
import {
  dbAcceptableFormat,
  Negative_Entry_In_Good_Conduct,
} from '../../../../../config';
import moment from 'moment';
let toastId: any = null;
export const CaregiverRightClickOptions = (props: any) => {
  const [showList, setShowList] = useState<boolean>(false);
  const [offerRequirements, setOfferRequirements] = useState<boolean>(false);
  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);
  //State for care giver bulk email
  const [openCareGiverBulkEmail, setopenCareGiverBulkEmail] = useState<boolean>(
    false
  );
  const {
    selectedCells,
    isOpen,
    hide,
    onNewAvailability,
    onReserve,
    onDeleteEntries,
    qualificationList,
    onCaregiverQualificationFilter,
    selectedCellsCareinstitution,
    onLinkAppointment,
  } = props;
  //reserved condition
  let reserveCondition: any;
  if (selectedCells && selectedCells.length) {
    reserveCondition = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.item && x.item.status === 'default';
      } else {
        return ['abc'];
      }
    });
  }
  //to apply condition on disconnect appointments
  let disconnectAppCond: any;
  if (selectedCells && selectedCells.length) {
    disconnectAppCond = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.item && x.item.status !== 'linked';
      } else {
        return ['abc'];
      }
    });
  }
  let offferAll: any = [];
  if (selectedCells && selectedCells.length) {
    offferAll = selectedCells.filter((x: any) => {
      if (x.item) {
        return (
          x.item &&
          x.item.f === 'block' &&
          x.item.s === 'block' &&
          x.item.n === 'block'
        );
      } else {
        return ['abc'];
      }
    });
  }
  //to apply condition on connect appointments
  let connectAppCondition: any;
  if (selectedCells && selectedCells.length) {
    connectAppCondition = selectedCells.filter((x: any) => {
      if (x.item) {
        if (
          x.item.f !== 'block' ||
          x.item.s !== 'block' ||
          x.item.n !== 'block'
        ) {
          return x.item && x.item.status !== 'default';
        } else {
          return ['abc'];
        }
      } else {
        return ['abc'];
      }
    });
  }
  // To check appointment with leasing careInst or not
  let isLeasingAppointment = false;
  if (selectedCells && selectedCells.length) {
    isLeasingAppointment = selectedCells.filter(
      (cell: any) =>
        cell &&
        cell.item &&
        cell.item.appointments &&
        cell.item.appointments.length &&
        cell.item.appointments[0].cr &&
        cell.item.appointments[0].cr.isLeasing
    ).length
      ? true
      : false;
  }
  let checkQuali: any = [];
  if (selectedCells && selectedCells.length) {
    checkQuali = selectedCells.filter((x: any) => {
      if (x.item) {
        return x.qualificationIds && x.qualificationIds.length;
      } else {
        return ['abc'];
      }
    });
  }
  const renderDetailedList = () => {
    if (showList) {
      const DetaillistCaregiverPopup = lazy(
        () => import('../DetailedList/DetailListCaregiver')
      );
      return (
        <Suspense fallback={null}>
          <DetaillistCaregiverPopup
            show={showList ? true : false}
            handleClose={() => setShowList(false)}
            selectedCells={selectedCells}
            qualificationList={qualificationList}
          />
        </Suspense>
      );
    }
  };
  //unLinked by
  const [unlinkedBy, setunlinkedBy] = useState('');
  //  UnLink appointmnets
  const handleUnLinkAppointments = () => {
    setshowUnlinkModal(!showUnlinkModal);
  };
  const [isFromUnlink, setisFromUnlink] = useState(false);
  // state for care institution bulk email
  const [
    openCareInstitutionBulkEmail,
    setopenCareInstitutionBulkEmail,
  ] = useState<boolean>(false);
  const handleUnlinkData = (likedBy: string, check: boolean) => {
    setunlinkedBy(likedBy);
    let appointmentId: any = [];
    if (selectedCells && selectedCells.length) {
      selectedCells.map((key: any, index: number) => {
        if (key.item && key.item.appointments && key.item.appointments.length) {
          return appointmentId.push({
            appointmentId: parseInt(
              key.item.appointments ? key.item.appointments[0].id : ''
            ),
            unlinkedBy: likedBy,
            deleteAll: check,
          });
        }
      });
      onLinkAppointment(appointmentId, 'unlink');
      if (likedBy !== 'employee') {
        setisFromUnlink(true);
        setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
        setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
      }
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(languageTranslation('SELECT_APPOINTMENT'));
      }
    }
  };
  const renderUnlinkModal = () => {
    if (showUnlinkModal) {
      const UnlinkAppointment = lazy(() => import('../unlinkModal'));
      return (
        <Suspense fallback={null}>
          <UnlinkAppointment
            show={showUnlinkModal}
            handleClose={() => setshowUnlinkModal(false)}
            handleUnlinkData={handleUnlinkData}
          />
        </Suspense>
      );
    }
  };
  // To close the email pop-up
  const handleClose = () => {
    // if (
    //   (leasingContract || terminateAggrement) &&
    //   updateLeasingContractStatus
    // ) {
    //   updateLeasingContractStatus(
    //     leasingContract ? 'contractInitiated' : 'contractCancelled',
    //   );
    // }
    // setopenCareGiverBulkEmail(false);
    // setconfirmApp(false);
    // setunlinkedBy('');
    // setisFromUnlink(false);
    setOfferRequirements(false);
    // setleasingContract(false);
    // setTerminateAggrement(false);
  };
  // Link appointments
  const handleLinkAppointments = async (name: string) => {
    let selectedData: any = [],
      checkError: boolean = false;
    if (
      selectedCellsCareinstitution &&
      selectedCellsCareinstitution.length &&
      selectedCells &&
      selectedCells.length
    ) {
      if (selectedCellsCareinstitution.length !== selectedCells.length) {
        toast.dismiss();
        if (!toast.isActive(toastId)) {
          toastId = toast.error(languageTranslation('LINK_SAME_LENGTH'));
        }
      } else {
        if (
          selectedCells[0].caregiver &&
          selectedCells[0].caregiver.attributes &&
          selectedCells[0].caregiver.attributes.length
        ) {
          let checkAttribute = selectedCells[0].caregiver.attributes.includes(
            Negative_Entry_In_Good_Conduct
          );
          if (checkAttribute) {
            const { value } = await ConfirmBox({
              title: languageTranslation('ATTRIBUTE_WARNING'),
              text: languageTranslation('LINKED_ATTRIBUTE_WARNING'),
            });
            if (!value) {
              checkError = true;
              return;
            }
          }
        }

        let qualiCheck: any[] = [];
        selectedCells.map(async (key: any, index: number) => {
          const element = selectedCellsCareinstitution[index];
          if (
            key.item.fee &&
            key.item.weekendAllowance &&
            key.item.holidayAllowance &&
            key.item.nightFee
          ) {
            if (
              key.qualificationIds &&
              key.qualificationIds.length &&
              element.item.qualificationId &&
              element.item.qualificationId.length
            ) {
              qualiCheck = element.item.qualificationId.filter((e: any) =>
                key.qualificationIds.includes(e.value)
              );
            }
            if (qualiCheck && qualiCheck.length <= 0) {
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.error(
                  languageTranslation('QUALIFICATION_UNMATCH')
                );
              }
              checkError = true;
              return true;
            }
            if (
              moment(key.dateString).format(dbAcceptableFormat) !==
              moment(element.dateString).format(dbAcceptableFormat)
            ) {
              checkError = true;
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.error(
                  languageTranslation('DATE_RANGE_MISMATCH')
                );
              }
              return false;
            } else if (key.item === undefined || element.item === undefined) {
              checkError = true;
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.error(languageTranslation('LINK_ERROR'));
              }
              return false;
            } else {
              if (!checkError) {
                selectedData.push({
                  avabilityId: parseInt(key.item.id),
                  requirementId: parseInt(element.item.id),
                  date: moment(element.dateString).format(dbAcceptableFormat),
                  status: 'appointment',
                });
              }
            }
          } else {
            checkError = true;
            const { value } = await ConfirmBox({
              title: languageTranslation('FEES_ERROR_MESSAGE'),
              text: languageTranslation('LINKED_FEES_MESSAGE'),
              type: 'error',
              showCancelButton: false,
              confirmButtonText: 'Ok',
            });
            return;
          }
        });
        if (!checkError) {
          onLinkAppointment(selectedData, name);
        }
      }
    }
  };
  return (
    <div
      className={classnames({
        'rightclick-menu top-open': true,
        'd-none': !isOpen,
      })}
    >
      <Nav vertical>
        <NavItem>
          <NavLink
            disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              hide();
              onNewAvailability ? onNewAvailability() : undefined;
            }}
          >
            <img src={new_appointment} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('NEW_APPOINTMENT')}
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            disabled={
              reserveCondition && reserveCondition.length === 0 ? true : false
            }
            onClick={() => {
              hide();
              onReserve ? onReserve() : undefined;
            }}
          >
            <img src={reserve} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('RESERVE')}
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            disabled={
              selectedCells && selectedCells.length
                ? selectedCells.filter(
                    (availability: any) =>
                      (availability && !availability.item) ||
                      (availability.item &&
                        availability.item.status === 'default') ||
                      availability.item.status === 'linked'
                  ).length
                  ? false
                  : true
                : true
            }
            onClick={() => {
              hide();
              onDeleteEntries ? onDeleteEntries('caregiver') : undefined;
            }}
          >
            <img src={delete_appointment} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('DELETE_FREE_CALENDER')}
            </span>
          </NavLink>{' '}
        </NavItem>
        <NavItem className='bordernav' />
        <NavItem>
          <NavLink
            disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              hide();
              setShowList(true);
            }}
          >
            <img src={detail_list} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('DETAILED_LIST')}
            </span>
          </NavLink>{' '}
        </NavItem>
        <NavItem className='bordernav' />
        <NavItem
          disabled={selectedCells ? selectedCells.length === 0 : true}
          onClick={() => {
            hide();
            onCaregiverQualificationFilter
              ? onCaregiverQualificationFilter()
              : undefined;
          }}
        >
          <NavLink disabled={selectedCells ? selectedCells.length === 0 : true}>
            <img src={filter} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('FILTER_BY_QUALI')}
            </span>
          </NavLink>{' '}
        </NavItem>
        <NavItem>
          <NavLink
            disabled={
              selectedCells
                ? selectedCells.length === 0 ||
                  (offferAll && offferAll.length !== 0) ||
                  (checkQuali && checkQuali.length === 0)
                : true
            }
            onClick={() => {
              hide();
              setOfferRequirements(true);
              setopenCareGiverBulkEmail(true);
            }}
          >
            <img src={offer_sent} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('OFFER_ALL_CALENDER')}
            </span>
          </NavLink>{' '}
        </NavItem>
        <NavItem className='bordernav' />
        <NavItem>
          <NavLink
            disabled={
              selectedCells
                ? selectedCells.length === 0 ||
                  (connectAppCondition && connectAppCondition.length !== 0)
                : true
            }
            onClick={() => {
              hide();
              handleLinkAppointments('link');
            }}
          >
            <img src={connect} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('CONNECT_APPOINTMENT')}
            </span>
          </NavLink>{' '}
        </NavItem>
        <NavItem>
          <NavLink
            disabled={
              selectedCells
                ? selectedCells.length === 0 ||
                  (disconnectAppCond && disconnectAppCond.length !== 0)
                : true
            }
            // disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              hide();
              handleUnLinkAppointments();
            }}
          >
            <img src={disconnect} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('DISCONNECT_APPOINTMENT')}
            </span>
          </NavLink>
        </NavItem>
        <NavItem className='bordernav' />
        <NavItem>
          <NavLink
            disabled={
              selectedCells
                ? selectedCells.length === 0 ||
                  (disconnectAppCond && disconnectAppCond.length !== 0) ||
                  isLeasingAppointment
                : true
            }
            onClick={() => {
              hide();
              // updateCaregiverStatus("confirmed");
              // setconfirmApp(true);
              // handleCareGiverBulkEmail();
            }}
          >
            <img src={confirm_appointment} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('CONFIRM_APPOINTMENT')}
            </span>
          </NavLink>{' '}
        </NavItem>
        <NavItem>
          <NavLink
            disabled={
              selectedCells
                ? selectedCells.length === 0 ||
                  (selectedCells[0].item &&
                    selectedCells[0].item.status !== 'linked') ||
                  isLeasingAppointment
                : true
            }
          >
            <img src={set_confirm} className='mr-2' alt='' />
            <span
              className='align-middle'
              onClick={() => {
                hide();
                // updateCaregiverStatus("confirmed");
              }}
            >
              {languageTranslation('SET_ON_CONF')}
            </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
          // disabled={
          //   selectedCells
          //     ? selectedCells.length === 0 ||
          //       (selectedCells[0].item &&
          //         selectedCells[0].item.status !== "confirmed") ||
          //       isLeasingAppointment
          //     : true
          // }
          >
            <img src={unset_confirm} className='mr-2' alt='' />
            <span
              className='align-middle'
              onClick={() => {
                hide();
                // updateCaregiverStatus("notconfirmed");
              }}
            >
              {languageTranslation('SET_ON_NOT_CONF')}
            </span>
          </NavLink>{' '}
        </NavItem>
        <NavItem>
          <NavLink
            // disabled={
            //   selectedCells && selectedCells.length
            //     ? selectedCells.filter(
            //         (availability: any) =>
            //           (availability && !availability.item) ||
            //           !isLeasingAppointment ||
            //           (availability.item &&
            //             availability.item.appointments &&
            //             availability.item.appointments.length &&
            //             availability.item.appointments[0] &&
            //             availability.item.appointments[0].cr &&
            //             availability.item.appointments[0].cr.status !==
            //               "confirmed")
            //       ).length
            //       ? true
            //       : false
            //     : true
            // }
            onClick={() => {
              hide();
              // setleasingContract(true);
              // handleCareGiverBulkEmail();
            }}
          >
            <img src={leasing_contact} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('REQUEST_TEMP_LEASING')}
            </span>
          </NavLink>{' '}
        </NavItem>
        <NavItem>
          <NavLink
            // disabled={
            //   selectedCells
            //     ? selectedCells.length === 0 || !isLeasingAppointment
            //     : true
            // }
            onClick={() => {}}
          >
            <img src={termination} className='mr-2' alt='' />
            <span className='align-middle'>
              {languageTranslation('CREATE_TERMINATION_AGREEMENT')}
            </span>
          </NavLink>{' '}
        </NavItem>
      </Nav>
      {/* {openCareGiverBulkEmail ? (
        <BulkEmailCareGiverModal
          // updateLinkedStatus={props.fetchingCareGiverData}
          openModal={openCareGiverBulkEmail}
          qualification={
            sortedQualificationList && sortedQualificationList
              ? sortedQualificationList
              : props.qualification
          }
          handleClose={handleClose}
          gte={props.gte}
          lte={props.lte}
          selectedCells={selectedCells}
          confirmApp={confirmApp}
          selectedCellsCareinstitution={selectedCellsCareinstitution}
          unlinkedBy={unlinkedBy}
          isFromUnlink={isFromUnlink}
          qualificationList={qualificationList}
          offerRequirements={offerRequirements}
          terminateAggrement={terminateAggrement}
          leasingContract={leasingContract}
        />
      ) : null}
      <BulkEmailCareInstitutionModal
        openModal={openCareInstitutionBulkEmail}
        handleClose={() => handleCareInstitutionBulkEmail()}
        qualification={
          sortedQualificationList && sortedQualificationList
            ? sortedQualificationList
            : props.qualification
        }
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={props.gte}
        lte={props.lte}
        unlinkedBy={unlinkedBy}
        isFromUnlink={isFromUnlink}
      /> */}
      {renderDetailedList()}
      {renderUnlinkModal()}
    </div>
  );
};
