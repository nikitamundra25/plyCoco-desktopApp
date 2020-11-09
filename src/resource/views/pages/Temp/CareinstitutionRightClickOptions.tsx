import React, { Suspense, useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import new_appointment from '../../../assets/img/dropdown/new_appointment.svg';
import all_list from '../../../assets/img/dropdown/all_list.svg';
import delete_appointment from '../../../assets/img/dropdown/delete.svg';
import detail_list from '../../../assets/img/dropdown/detail_list.svg';
import offer_sent from '../../../assets/img/dropdown/offer_sent.svg';
import connect from '../../../assets/img/dropdown/connect.svg';
import disconnect from '../../../assets/img/dropdown/disconnect.svg';
import confirm_appointment from '../../../assets/img/dropdown/confirm_appointment.svg';
import set_confirm from '../../../assets/img/dropdown/confirm.svg';
import unset_confirm from '../../../assets/img/dropdown/not_confirm.svg';
import invoice from '../../../assets/img/dropdown/invoice.svg';

import classnames from 'classnames';
import { ConfirmBox } from '../../components/ConfirmBox';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import { AppointmentMutations } from '../../../../graphql/Mutations';
import BulkEmailCareGiverModal from '../Appointment/BulkEmailCareGiver';
import BulkEmailCareInstitutionModal from '../Appointment/BulkEmailCareInstitution';
import moment from 'moment';
import { dbAcceptableFormat } from '../../../../config';
import ConnectAppointment from './ConnectAppointment';
const [
  ,
  ADD_INSTITUTION_REQUIREMENT,
  ,
  UPDATE_INSTITUTION_REQUIREMENT,
  DELETE_CAREINSTITUTION_REQUIREMENT,
  ,
  ,
  ,
] = AppointmentMutations;
let toastId: any = null;
const CareinstitutionRightClickOptions = (props: any) => {
  const {
    hide,
    selectedCellsCareinstitution,
    onNewRequirement,
    filters,
    isOpen,
    selectedCells,
    careinstitutionSelected,
    caregiverSelected,
    handleupdateData,
    qualificationList,
    setShowSelectedCaregiver,
    updateCaregiverDataLeasing,
  } = props;

  // update Careinstitution Requirment
  const [
    updateCareinstitutionRequirment,
    { data: updateCareinstitutionRes, loading: updateCareinstitutionLoading },
  ] = useMutation<
    {
      updateCareInstitutionRequirement: any;
      // IAddCargiverAppointmentRes;
    },
    {
      id: number;
      careInstitutionRequirementInput: any;
    }
  >(UPDATE_INSTITUTION_REQUIREMENT, {
    onCompleted({ updateCareInstitutionRequirement }) {
      updateItemData([updateCareInstitutionRequirement]);
      handleupdateData([updateCareInstitutionRequirement], 'careinstitution');

      // to get the appointment data from the care institution cell
      let appointmentData = selectedCellsCareinstitution.filter(
        (cell: any) =>
          cell.item && cell.item.id === updateCareInstitutionRequirement.id
      )[0];

      appointmentData =
        appointmentData &&
        appointmentData.item.appointments &&
        appointmentData.item.appointments.length &&
        appointmentData.item.appointments[0]
          ? appointmentData.item.appointments[0]
          : {};
      // If appointment is confirmed by care-institution need to update caregiver cell in case of leasing
      if (
        updateCareInstitutionRequirement.status === 'confirmed' &&
        updateCareInstitutionRequirement.isLeasing &&
        appointmentData
      ) {
        updateCaregiverDataLeasing(appointmentData);
      }
    },
  });

  // Mutation to delete careinstitution requirement
  const [deleteCareinstitutionRequirement] = useMutation<
    {
      deleteCareInstitutionRequirement: any;
    },
    { id: number[] }
  >(DELETE_CAREINSTITUTION_REQUIREMENT, {
    onCompleted({ deleteCareInstitutionRequirement }) {
      careinstitutionSelected([]);
      handleupdateData(deleteCareInstitutionRequirement, 'careinstitution');
    },
  });

  const [showList, setShowList] = useState<boolean>(false);
  const [confirmAppointment, setConfirmAppointment] = useState<boolean>(false);
  // state for care giver bulk email
  const [openCareGiverBulkEmail, setopenCareGiverBulkEmail] = useState<boolean>(
    false
  );

  // state for care institution bulk email
  const [
    openCareInstitutionBulkEmail,
    setopenCareInstitutionBulkEmail,
  ] = useState<boolean>(false);
  // lable for care institution
  const [sortBy, setSortBy] = useState<string>('');

  // show button for care institution
  const [showButton, setShowButton] = useState<boolean>(false);
  const [showCareGiverEmail, setshowCareGiverEmail] = useState<boolean>(false);
  const [StatusTo, setStatusTo] = useState('');

  /**
   *
   * @param itemData
   */
  const updateItemData = (itemData: any) => {
    let temp: any = [];
    
    selectedCellsCareinstitution.forEach(
      async (element: any, index: number) => {
        const {
          isWeekend = '',
          item = undefined,
          canstitution = {},
          isLeasing = '',
        } = element ? element : {};
        let stem = itemData[index];
        let data: any = {
          isWeekend,
          canstitution: {
            ...canstitution,
          },
          isLeasing,
          item: itemData[index],
        };
        temp.push(data);
      }
    );
    careinstitutionSelected(temp);
  };

  //Open Care giver Modal
  useEffect(() => {
    if (openCareInstitutionBulkEmail && showCareGiverEmail) {
      setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
    }
  }, [openCareInstitutionBulkEmail]);
  /*
   *
   *
   */
  const onDeleteEntries = async () => {
    let temp: any = selectedCellsCareinstitution
      ? [...selectedCellsCareinstitution]
      : [];
    let linkedEntries = temp.filter(
      (element: any) => element.item && element.item.status === 'linked'
    );

    if (linkedEntries && linkedEntries.length) {
      const { value } = await ConfirmBox({
        title: languageTranslation('APPOINTMENT_CANT_BE_DELETED'),
        text: languageTranslation('UNLINK_AND_DELETE'),
        showCancelButton: false,
        confirmButtonText: languageTranslation('OKAY_LABEL'),
      });
      if (!value) {
        return;
      }
    } else {
      if (temp && temp.length) {
        let freeEntries = temp.filter(
          (element: any) =>
            !element.item || (element.item && !element.item.status)
        );

        let reservedEntries = temp.filter(
          (element: any) =>
            element.item &&
            (element.item.status === 'default' ||
              element.item.status === 'offered')
        );

        freeEntries.forEach(async (element: any) => {
          const { item, canstitution } = element;
          let index: number = -1;
          //  delete row if no data is available
        });

        if (reservedEntries && reservedEntries.length) {
          const { value } = await ConfirmBox({
            title: languageTranslation('CONFIRM_LABEL'),
            text: languageTranslation(
              'CONFIRM_DELETE_CAREINSTITUTION_REQUIREMENT'
            ),
          });
          if (value) {
            await deleteCareinstitutionRequirement({
              variables: {
                id: reservedEntries.map((element: any) =>
                  parseInt(element.item.id)
                ),
              },
            });

            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation(
                  'DELETE_CAREINSTITUTION_REQUIREMENT_SUCCESS'
                )
              );
            }
          } else {
            return;
          }
        }
      }
    }
  };

  /*
   *  Select all appointment of caregiver
   */
  const handleSelectedAppoitment = () => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      const { item } = selectedCellsCareinstitution[0];
      const { appointments = [] } = item ? item : {};
      const { ca = {} } =
        appointments && appointments.length ? appointments[0] : [];
      setShowSelectedCaregiver({
        id: ca.userId,
        isShow: true,
      });
    }
  };

  //to apply condition on all offer options
  let offerAppCond: any;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    offerAppCond = selectedCellsCareinstitution.filter((x: any) => {
      if (x.item && x.item.id) {
        return x.item.status !== 'linked' && x.item.status !== 'confirmed';
      } else {
        return ['abc'];
      }
    });
  }

  // open care institution bulk Email section
  const handleCareInstitutionBulkEmail = () => {
    if (confirmAppointment) {
      setConfirmAppointment(false);
    }
    setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
  };

  /**
   *
   * @param name
   */
  const updateCareInstitutionStatus = async (name: string) => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      selectedCellsCareinstitution.forEach(async (element: any) => {
        const { item = {}, canstitution = {} } = element;
        const Item = Object.assign({}, item);
        if (Item && Item.id) {
          if (
            (name === 'confirmed' && Item.status === 'linked') ||
            (name === 'notconfirm' && Item.status === 'confirmed') ||
            (name === 'offered' &&
              (Item.status === 'default' || Item.status === 'offered')) ||
            (name === 'notoffered' && Item.status === 'offered')
          ) {
            let availabilityId: number = Item.id ? parseInt(Item.id) : 0;
            delete Item.id;
            delete Item.__typename;
            delete Item.appointments;
            delete Item.division;
            delete Item.updatedAt;
            delete Item.appointmentId;
            delete Item.department;
            delete Item.shift;
            delete Item.careInstitutionDepartment;

            await updateCareinstitutionRequirment({
              variables: {
                id: availabilityId,
                careInstitutionRequirementInput: {
                  ...Item,
                  userId:
                    canstitution && canstitution.id
                      ? parseInt(canstitution.id)
                      : 0,
                  status:
                    name === 'confirmed'
                      ? 'confirmed'
                      : name === 'notconfirm'
                      ? 'linked'
                      : name === 'offered'
                      ? 'offered'
                      : 'default',
                },
              },
            });
            if (!toast.isActive(toastId)) {
              if (name === 'confirmed') {
                toastId = toast.success(
                  languageTranslation('CARE_INST_SET_CONFIRMED_SUCCESS_MSG')
                );
              } else if (name === 'notconfirm') {
                toastId = toast.success(
                  languageTranslation('CARE_INST_SET_NOT_CONFIRMED_SUCCESS_MSG')
                );
              } else if (name === 'offered') {
                toastId = toast.success(
                  languageTranslation('CARE_INST_SET_ON_OFFERED_SUCCESS_MSG')
                );
              } else {
                toastId = toast.success(
                  languageTranslation(
                    'CARE_INST_SET_ON_NOT_OFFERED_SUCCESS_MSG'
                  )
                );
              }
            }
          }
        }
      });
    }
  };

  /**
   *
   * @param sortBy
   * @param showButton
   *
   */
  // Open care giver bulk Email section after care instituion email popup
  const handleCareGiverBulkEmail = (sortBy: string, showButton: boolean) => {
    setSortBy(sortBy);
    setShowButton(showButton);
    if (!openCareGiverBulkEmail) {
      setshowCareGiverEmail(true);
    } else {
      setshowCareGiverEmail(false);
      setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
    }
  };
  /*
   * Detail list modal
   */
  const renderDetailedList = () => {
    if (showList) {
      const DetaillistCareinstitutionPopup = React.lazy(
        () => import('./DetailListCareinstitution')
      );
      return (
        <Suspense fallback={null}>
          <DetaillistCareinstitutionPopup
            show={showList ? true : false}
            handleClose={() => setShowList(false)}
            selectedCellsCareinstitution={selectedCellsCareinstitution}
            qualificationList={qualificationList}
          />
        </Suspense>
      );
    }
  };

  let sortedQualificationList: any = [];
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    selectedCellsCareinstitution.map((list: any, index: number) => {
      if (list && list.item && list.item.qualificationId) {
        let qualificationId = list.item.qualificationId;
        qualificationId.map((key: any, i: number) => {
          if (key) {
            if (
              sortedQualificationList.findIndex(
                (item: any) => item && item === key
              ) < 0
            ) {
              return (sortedQualificationList = [
                ...sortedQualificationList,
                key,
              ]);
            }
          }
        });
      }
    });
  }
  let isAppointment = false;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    isAppointment = selectedCellsCareinstitution.filter((element: any) => {
      element.item &&
        element.item.status &&
        (element.item.status === 'default' ||
          element.item.status === 'linked' ||
          element.item.status === 'confirmed' ||
          element.item.status === 'timeSheetPending' ||
          element.item.status === 'timeSheetUpdated');
    }).length
      ? true
      : false;
  }

  return (
    <>
      <div
        className={classnames({
          'rightclick-menu top-open': true,
          'd-none': !isOpen,
        })}
      >
        <Nav vertical>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0 || isAppointment
                  : true
              }
              onClick={() => {
                onNewRequirement();
                hide();
              }}
            >
              <img src={new_appointment} className='mr-2' alt='' />
              <span>{languageTranslation('NEW_APPOINTMENT')}</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length
                  ? selectedCellsCareinstitution.filter(
                      (availability: any) =>
                        (availability && !availability.item) ||
                        (availability.item && !availability.item.status) ||
                        (availability.item &&
                          (availability.item.status === 'default' ||
                            availability.item.status === 'offered' ||
                            availability.item.status === 'linked'))
                    ).length
                    ? false
                    : true
                  : true
              }
              onClick={() => {
                hide();
                onDeleteEntries();
              }}
            >
              <img src={delete_appointment} className='mr-2' alt='' />
              <span>{languageTranslation('DELETE_FREE_APPOINTMENT')}</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                offerAppCond && offerAppCond.length !== 0 ? true : false
              }
              onClick={() => {
                hide();
                handleSelectedAppoitment();
              }}
            >
              <img src={all_list} className='mr-2' alt='' />
              <span>{languageTranslation('SELECT_ALL_APPOINTMENT_OF_CG')}</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution
                  ? selectedCellsCareinstitution.length === 0
                  : true
              }
              onClick={() => {
                hide();
                setShowList(true);
              }}
            >
              <img src={detail_list} className='mr-2' alt='' />
              <span>{languageTranslation('DETAILED_LIST')}</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                selectedCellsCareinstitution[0] &&
                selectedCellsCareinstitution[0].item &&
                selectedCellsCareinstitution[0].item.id
                  ? false
                  : true
              }
              onClick={() => {
                hide();
                handleCareInstitutionBulkEmail();
                updateCareInstitutionStatus('offered');
                handleCareGiverBulkEmail('division', true);
              }}
            >
              <img src={offer_sent} className='mr-2' alt='' />
              <span>{languageTranslation('SORT_BY_DIVISION')}</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                selectedCellsCareinstitution[0] &&
                selectedCellsCareinstitution[0].item &&
                selectedCellsCareinstitution[0].item.id
                  ? false
                  : true
              }
              onClick={() => {
                hide();
                handleCareGiverBulkEmail('day', true);
                handleCareInstitutionBulkEmail();
                updateCareInstitutionStatus('offered');
              }}
            >
              <img src={offer_sent} className='mr-2' alt='' />
              <span>{languageTranslation('SORT_BY_DAY')} </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                selectedCellsCareinstitution[0] &&
                selectedCellsCareinstitution[0].item &&
                selectedCellsCareinstitution[0].item.id
                  ? false
                  : true
              }
              onClick={() => {
                hide();
                handleCareGiverBulkEmail('division', false);
                handleCareInstitutionBulkEmail();
                updateCareInstitutionStatus('offered');
              }}
            >
              <img src={offer_sent} className='mr-2' alt='' />
              <span>{languageTranslation('NO_DIREACT_BOOKING')}</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                selectedCellsCareinstitution[0] &&
                selectedCellsCareinstitution[0].item &&
                selectedCellsCareinstitution[0].item.id
                  ? false
                  : true
              }
              onClick={() => {
                hide();
                handleCareGiverBulkEmail('day', false);
                handleCareInstitutionBulkEmail();
                updateCareInstitutionStatus('offered');
              }}
            >
              <img src={offer_sent} className='mr-2' alt='' />
              <span>{languageTranslation('NO_DIRECT_BOOKING_DAY')}</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                selectedCellsCareinstitution[0] &&
                selectedCellsCareinstitution[0].item &&
                selectedCellsCareinstitution[0].item.id
                  ? false
                  : true
              }
            >
              <img src={set_confirm} className='mr-2' alt='' />
              <span
                onClick={() => {
                  hide();
                  updateCareInstitutionStatus('offered');
                }}
              >
                {languageTranslation('SET_ON_OFF')}
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                selectedCellsCareinstitution[0] &&
                selectedCellsCareinstitution[0].item &&
                selectedCellsCareinstitution[0].item.id
                  ? false
                  : true
              }
            >
              <img src={unset_confirm} className='mr-2' alt='' />
              <span
                onClick={() => {
                  hide();
                  updateCareInstitutionStatus('notoffered');
                }}
              >
                {languageTranslation('RESET_OFF')}
              </span>
            </NavLink>
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <ConnectAppointment
              selectedCaregiverData={selectedCells}
              selectedCareinstitutionData={selectedCellsCareinstitution}
              qualifications={qualificationList}
              setSelectedCaregiver={caregiverSelected}
              setSelectedCareinstitution={careinstitutionSelected}
              handleupdateData={handleupdateData}
              label='link'
              hide={hide}
            />
          </NavItem>
          <NavItem>
            <ConnectAppointment
              selectedCaregiverData={selectedCells}
              selectedCareinstitutionData={selectedCellsCareinstitution}
              qualifications={qualificationList}
              setSelectedCaregiver={caregiverSelected}
              setSelectedCareinstitution={careinstitutionSelected}
              handleupdateData={handleupdateData}
              label='unlink'
              hide={hide}
            />
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink
              className={
                offerAppCond !== undefined
                  ? offerAppCond && offerAppCond.length !== 0
                    ? 'disabled-class'
                    : ''
                  : 'disabled-class'
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                setStatusTo('offered');
                setSortBy('day');
              }}
            >
              <img src={offer_sent} className='mr-2' alt='' />
              <span>{languageTranslation('OFFER_APPOINTMENT')}</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              className={
                offerAppCond !== undefined
                  ? offerAppCond && offerAppCond.length !== 0
                    ? 'disabled-class'
                    : ''
                  : 'disabled-class'
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                setStatusTo('offered');
                setSortBy('division');
              }}
            >
              <img src={offer_sent} className='mr-2' alt='' />
              <span>{languageTranslation('OFFER_APPOINTMENT_DEPT')}</span>
            </NavLink>
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink
              className={
                offerAppCond !== undefined
                  ? offerAppCond && offerAppCond.length !== 0
                    ? 'disabled-class'
                    : ''
                  : 'disabled-class'
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                setStatusTo('confirmed');
                updateCareInstitutionStatus('confirmed');
                setSortBy('day');
                setConfirmAppointment(true);
              }}
            >
              <img src={confirm_appointment} className='mr-2' alt='' />
              <span>{languageTranslation('CONFIRM_APPOINTMENT_ORDER')} </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                offerAppCond !== undefined
                  ? offerAppCond && offerAppCond.length !== 0
                    ? 'disabled-class'
                    : ''
                  : 'disabled-class'
              }
              onClick={() => {
                handleCareInstitutionBulkEmail();
                setStatusTo('confirmed');
                updateCareInstitutionStatus('confirmed');
                setSortBy('division');
                setConfirmAppointment(true);
              }}
            >
              <img src={confirm_appointment} className='mr-2' alt='' />
              <span>{languageTranslation('CONFIRM_APP_DEPT')}</span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                ((selectedCellsCareinstitution.length === 0 &&
                  selectedCellsCareinstitution[0] &&
                  selectedCellsCareinstitution[0].id === '') ||
                  (selectedCellsCareinstitution[0] &&
                    selectedCellsCareinstitution[0].item &&
                    selectedCellsCareinstitution[0].item.status !==
                      'linked')) /* ||
                  selectedCellsCareinstitution.filter(
                    (cell: any) => cell.item && cell.item.isLeasing
                  ).length > 0 */
                  ? true
                  : false
              }
            >
              <img src={set_confirm} className='mr-2' alt='' />
              <span
                onClick={() => {
                  updateCareInstitutionStatus('confirmed');
                }}
              >
                {languageTranslation('SET_ON_CONF')}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCellsCareinstitution &&
                selectedCellsCareinstitution.length &&
                selectedCellsCareinstitution[0].item &&
                selectedCellsCareinstitution[0].item.status === 'confirmed'
                  ? //     ||
                    // selectedCellsCareinstitution.filter(
                    //   (cell: any) => cell.item && cell.item.isLeasing
                    // ).length > 0
                    false
                  : true
              }
            >
              <img src={unset_confirm} className='mr-2' alt='' />
              <span
                onClick={() => {
                  updateCareInstitutionStatus('notconfirm');
                }}
              >
                {languageTranslation('RESET_CONF')}
              </span>
            </NavLink>
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink>
              <img src={invoice} className='mr-2' alt='' />
              <span>{languageTranslation('CREATE_PAYMENT')}</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      {renderDetailedList()}
      <BulkEmailCareGiverModal
        openModal={openCareGiverBulkEmail}
        qualification={
          sortedQualificationList && sortedQualificationList.length
            ? sortedQualificationList
            : filters &&
              filters.qualificationId &&
              filters.qualificationId.length
            ? filters.qualificationId
            : []
        }
        offerCareGiver={true} // offer caregiver
        handleClose={() => handleCareGiverBulkEmail('', false)}
        selectedCells={
          selectedCells && selectedCells.length ? selectedCells : []
        }
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={
          filters && filters.gte
            ? filters.gte
            : moment().startOf('month').format(dbAcceptableFormat)
        }
        lte={
          filters && filters.lte
            ? filters.lte
            : moment().endOf('month').format(dbAcceptableFormat)
        }
        sortBy={sortBy}
        showButton={showButton}
      />
      <BulkEmailCareInstitutionModal
        openModal={openCareInstitutionBulkEmail}
        handleClose={() => handleCareInstitutionBulkEmail()}
        qualification={
          sortedQualificationList && sortedQualificationList.length
            ? sortedQualificationList
            : filters &&
              filters.qualificationId &&
              filters.qualificationId.length
            ? filters.qualificationId
            : []
        }
        selectedCellsCareinstitution={selectedCellsCareinstitution}
        gte={
          filters && filters.gte
            ? filters.gte
            : moment().startOf('month').format(dbAcceptableFormat)
        }
        lte={
          filters && filters.lte
            ? filters.lte
            : moment().endOf('month').format(dbAcceptableFormat)
        }
        statusTo={StatusTo}
        sortBy={sortBy}
        confirmAppointment={confirmAppointment}
        qualificationList={props.qualificationList}
      />
    </>
  );
};

export default CareinstitutionRightClickOptions;
