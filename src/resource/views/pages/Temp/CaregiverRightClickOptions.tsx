import React, { Suspense, useState } from 'react';
import classnames from 'classnames';
import { languageTranslation } from '../../../../helpers';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import reserve from '../../../assets/img/dropdown/block.svg';
import new_appointment from '../../../assets/img/dropdown/new_appointment.svg';
import delete_appointment from '../../../assets/img/dropdown/delete.svg';
import detail_list from '../../../assets/img/dropdown/detail_list.svg';
import filter from '../../../assets/img/filter.svg';
import offer_sent from '../../../assets/img/dropdown/offer_sent.svg';
import confirm_appointment from '../../../assets/img/dropdown/confirm_appointment.svg';
import set_confirm from '../../../assets/img/dropdown/confirm.svg';
import unset_confirm from '../../../assets/img/dropdown/not_confirm.svg';
import leasing_contact from '../../../assets/img/dropdown/leasing.svg';
import termination from '../../../assets/img/dropdown/aggrement.svg';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
  IAddCargiverAppointmentRes,
  IReactSelectInterface,
} from '../../../../interfaces';
import { AppointmentMutations } from '../../../../graphql/Mutations';
import { useMutation } from '@apollo/react-hooks';
import { dbAcceptableFormat } from '../../../../config';
import { ConfirmBox } from '../../components/ConfirmBox';
import ConnectAppointment from './ConnectAppointment';
import BulkEmailCareGiverModal from '../Appointment/BulkEmailCareGiver';
import BulkEmailCareInstitutionModal from '../Appointment/BulkEmailCareInstitution';
import _ from 'lodash';
const [
  ADD_CAREGIVER_AVABILITY,
  ,
  UPDATE_CAREGIVER_AVABILITY,
  ,
  ,
  DELETE_CAREGIVER_AVABILITY,
] = AppointmentMutations;

let toastId: any = null;
export const CaregiverRightClickOptions = ({
  isOpen,
  hide,
  selectedCells,
  onNewAvailability,
  onUpdateStatus,
  handleupdateData,
  multipleAvailability,
  caregiversList,
  formatCaregivers,
  qualificationList,
  handleQualificationFilter,
  selectedCareinstitutionData,
  setSelectedCareinstitution,
  filters,
}: any) => {
  // Mutation to add careGiver data
  const [
    addCaregiverAvailability,
    { error, data: addCaregiverRes, loading: addCaregiverLoading },
  ] = useMutation<
    {
      addCareGiverAvability: [IAddCargiverAppointmentRes];
    },
    {
      careGiverAvabilityInput: any;
    }
  >(ADD_CAREGIVER_AVABILITY, {
    onCompleted({ addCareGiverAvability }) {
      handleupdateData(addCareGiverAvability, 'caregiver');
      updateItemData(addCareGiverAvability);
      toast.dismiss();
    },
  });

  // Mutation to update careGiver data
  const [
    updateCaregiver,
    { data: updateCaregiverRes, loading: updateCaregiverLoading },
  ] = useMutation<
    {
      updateCareGiverAvability: IAddCargiverAppointmentRes;
    },
    {
      id: number;
      careGiverAvabilityInput: any;
    }
  >(UPDATE_CAREGIVER_AVABILITY, {
    onCompleted({ updateCareGiverAvability }) {
      handleupdateData([updateCareGiverAvability], 'caregiver');
      updateItemData([updateCareGiverAvability]);
    },
  });

  // Mutation to delete caregiver
  const [deleteCaregiverAvailability, {}] = useMutation<
    {
      deleteCaregiverAvailability: any;
    },
    { id: number[] }
  >(DELETE_CAREGIVER_AVABILITY, {
    onCompleted({ deleteCareGiverAvability }: any) {
      onUpdateStatus([]);
      handleupdateData(deleteCareGiverAvability, 'caregiver');
    },
  });

  const [showList, setShowList] = useState<boolean>(false);
  const [offerRequirements, setOfferRequirements] = useState<boolean>(false);
  //State for care giver bulk email
  const [openCareGiverBulkEmail, setopenCareGiverBulkEmail] = useState<boolean>(
    false
  );

  // state for care institution bulk email
  const [
    openCareInstitutionBulkEmail,
    setopenCareInstitutionBulkEmail,
  ] = useState<boolean>(false);
  const [terminateAggrement, setTerminateAggrement] = useState(false);
  const [leasingContract, setleasingContract] = useState<boolean>(false);
  const [confirmApp, setconfirmApp] = useState<boolean>(false);

  /**
   *@param itemData
   *
   */
  const updateItemData = (itemData: any) => {
    let temp: any = [];
    selectedCells.forEach(async (element: any, index: number) => {
      const { isWeekend = '', item = undefined, caregiver = {} } = element
        ? element
        : {};
      let stem = itemData[index]
      let data: any = {
        isWeekend,
        caregiver: {
          ...caregiver,
        },
        item:{ 
          ...item,
          stem
        },
      };

      temp.push(data);
    });
    onUpdateStatus(temp);
  };
  /**
   *
   *
   */
  const onReserve = async () => {
    if (selectedCells && selectedCells.length) {
      let temp = [...selectedCells];
      let careGiverAvabilityInput: any = [];
      temp.forEach(async (element: any) => {
        const { isWeekend = '', item = {}, caregiver = {} } = element
          ? element
          : {};
        if (item && item.id) {
          let availabilityId: number = item.id ? parseInt(item.id) : 0;
          // _.omit(item,['id','__typename','appointments','updatedAt' ]);
          // delete item.id;
          // delete item.__typename;
          // delete item.appointments;
          // delete item.updatedAt;
          // item["id"] = undefined
          // item["__typename"] = undefined
          // item["appointments"] = undefined
          // item["updatedAt"] = undefined

          await updateCaregiver({
            variables: {
              id: availabilityId,
              careGiverAvabilityInput: {
                f: 'block',
                s: 'block',
                n: 'block',
                userId: caregiver.id,
                name:
                  caregiver && caregiver.firstName
                    ? `${caregiver.lastName} ${caregiver.firstName}`
                    : '',
                breakFrom: null,
                breakTo: item.breakTo,
                createdAt: item.createdAt,
                createdBy: item.createdBy,
                date: item.date,
                distanceInKM: item.distanceInKM,
                fee: item.fee,
                feePerKM: item.feePerKM,
                holidayAllowance: item.holidayAllowance,
                nightAllowance: item.nightAllowance,
                nightFee: item.nightFee,
                otherExpenses: item.otherExpenses,
                remarksCareGiver: item.remarksCareGiver,
                remarksInternal: item.remarksInternal,
                status: item.status,
                travelAllowance: item.travelAllowance,
                weekendAllowance: item.weekendAllowance,
                workingHoursFrom: item.workingHoursFrom,
                workingHoursTo: item.workingHoursTo,
                workingProofRecieved: item.workingProofRecieved,
              },
            },
          });
          toast.dismiss();
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation('CARE_GIVER_REQUIREMENT_UPDATE_SUCCESS_MSG')
            );
          }
        } else {
          careGiverAvabilityInput.push({
            userId: caregiver && caregiver.id ? parseInt(caregiver.id) : '',
            name:
              caregiver && caregiver.firstName
                ? `${caregiver.lastName} ${caregiver.firstName}`
                : '',
            date: item.date ? moment(item.date).format(dbAcceptableFormat) : '',
            fee: null,
            weekendAllowance: null,
            holidayAllowance: null,
            nightFee: null,
            nightAllowance: null,
            workingProofRecieved: false,
            distanceInKM: null,
            feePerKM: null,
            travelAllowance: null,
            otherExpenses: null,
            remarksCareGiver: null,
            remarksInternal: null,
            f: 'block',
            s: 'block',
            n: 'block',
            status: 'default',
          });
        }
      });

      if (careGiverAvabilityInput && careGiverAvabilityInput.length) {
        await addCaregiverAvailability({
          variables: {
            careGiverAvabilityInput: careGiverAvabilityInput,
          },
        });
      }
    }
  };

  /**
   *
   *
   */
  let { item = undefined } =
    selectedCells &&
    // to check multiple cells are free or reserve or you've clicked on new appointment to reflect the form
    (selectedCells.length === 1 ||
      multipleAvailability ||
      (selectedCells[0] && selectedCells[0].item)) &&
    selectedCells[0]
      ? selectedCells[0]
      : {};

  /**
   * Delete entries
   *
   */
  const onDeleteEntries = async () => {
    let temp: any = selectedCells ? [...selectedCells] : [];
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
          (element: any) => element.item && element.item.status === 'default'
        );

        freeEntries.forEach(async (element: any) => {
          const { caregiver } = element;
          let index: number = -1;

          if (!item) {
            index = caregiversList.findIndex(
              (caregiv: any) => caregiv.id === caregiver.userId
            );

            if (index > -1) {
              formatCaregivers(caregiversList);
            }
          }
        });
        if (reservedEntries && reservedEntries.length) {
          const { value } = await ConfirmBox({
            title: languageTranslation('CONFIRM_LABEL'),
            text: languageTranslation('CONFIRM_DELETE_CAREGIVER_AVABILITY'),
          });
          if (value) {
            await deleteCaregiverAvailability({
              variables: {
                id: reservedEntries.map((element: any) =>
                  parseInt(element.item.id)
                ),
                // parseInt(item.id),
              },
            });

            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation('DELETE_CAREGIVER_AVABILITY_SUCCESS')
              );
            }
          } else {
            return;
          }
        }
      }
    }
  };

  /**
   * filter by qualifications of caregiver
   *
   */
  const onCaregiverQualificationFilter = () => {
    if (selectedCells && selectedCells.length) {
      let temp: string[] = [];
      selectedCells.map((element: any) => {
        if (element.caregiver.qualificationId) {
          temp.push(...element.caregiver.qualificationId);
        }
      });
      let qual = qualificationList.filter((qual: IReactSelectInterface) =>
        temp.includes(qual.value)
      );
      handleQualificationFilter(qual);
    }
  };

  /**
   * @param name
   *
   */
  // to update caregiver status as set on confirmed or reset confirmed
  const updateCaregiverStatus = async (name: string) => {
    if (selectedCells && selectedCells.length) {
      selectedCells.forEach(async (element: any) => {
        const { item, caregiver } = element;
        const Item  = Object.assign({}, item)
        if (Item && Item.id) {
          if (
            name === 'confirmed'
              ? Item.status === 'linked'
              : Item.status === 'confirmed'
          ) {
            let availabilityId: number = Item.id ? parseInt(Item.id) : 0;
            delete Item.id;
            delete Item.__typename;
            delete Item.appointments;
            delete Item.division;
            delete Item.qualificationId;
            delete Item.lastName;
            delete Item.updatedAt;
            await updateCaregiver({
              variables: {
                id: availabilityId,
                careGiverAvabilityInput: {
                  ...Item,
                  userId: caregiver.id,
                  status: name === 'confirmed' ? 'confirmed' : 'linked',
                },
              },
            });
            if (!toast.isActive(toastId)) {
              if (name === 'confirmed') {
                toastId = toast.success(
                  languageTranslation('CARE_GIVER_SET_CONFIRMED_SUCCESS_MSG')
                );
              } else {
                toastId = toast.success(
                  languageTranslation(
                    'CARE_GIVER_SET_NOT_CONFIRMED_SUCCESS_MSG'
                  )
                );
              }
            }
          } else if (name === 'terminate') {
            if (item && item.id && item.status === 'contractInitiated') {
              let availabilityId: number = item.id ? parseInt(item.id) : 0;
              delete item.id;
              delete item.__typename;
              delete item.appointments;
              delete item.division;
              delete item.updatedAt;
              await updateCaregiver({
                variables: {
                  id: availabilityId,
                  careGiverAvabilityInput: {
                    ...item,
                    status: 'contractCancelled',
                  },
                },
              });
            }
          }
        }
      });
    }
  };

  // Open care giver bulk Email section
  const handleCareGiverBulkEmail = () => {
    setopenCareGiverBulkEmail(true);
  };

  // open care institution bulk Email section
  const handleCareInstitutionBulkEmail = () => {
    setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
  };

  // To close the email pop-up
  const handleClose = () => {
    if (leasingContract || terminateAggrement) {
      updateLeasingContractStatus(
        leasingContract ? 'contractInitiated' : 'contractCancelled'
      );
    }
    setopenCareGiverBulkEmail(false);
    setconfirmApp(false);
    setOfferRequirements(false);
    setleasingContract(false);
    setTerminateAggrement(false);
  };

  // TO update the status of the cell & data because it's api is different
  const updateLeasingContractStatus = (status: string) => {
    const updateCareGiverAvability = {
      ...item,
      status,
    };
    handleupdateData([updateCareGiverAvability], 'caregiver');
    updateItemData([updateCareGiverAvability]);
  };

  let sortedQualificationList: any = [];
  if (selectedCells && selectedCells.length) {
    selectedCells.map((list: any, index: number) => {
      if (list && list.item && list.item.qualificationId) {
        let qualificationId = list.item.qualificationId;
        qualificationId.map((key: any, i: number) => {
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
        });
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
  let checkQuali: any = [];
  if (selectedCells && selectedCells.length) {
    checkQuali = selectedCells.filter((x: any) => {
      if (x.caregiver) {
        return x.caregiver.qualificationId;
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

  let isAppointment = false;
  if (selectedCells && selectedCells.length) {
    isAppointment = selectedCells.filter((element: any) => {
        (element.item && element.item.status === 'default') ||
        element.item.status === 'linked' ||
        element.item.status === 'confirmed' ||
        element.item.status === 'timeSheetPending' ||
        element.item.status === 'timeSheetUpdated'      
    }).length
      ? true
      : false;
  }
  const renderDetailedList = () => {
    if (showList) {
      const DetaillistCaregiverPopup = React.lazy(
        () => import('./DetailListCaregiver')
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
              disabled={selectedCells ? selectedCells.length === 0 || isAppointment : true}
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
                selectedCells.some(
                  (list: any) => list.item.status === 'default'
                )
                  ? false
                  : true
              }
              onClick={() => {
                hide();
                onReserve();
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
                onDeleteEntries();
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
              disabled={
                selectedCells &&
                selectedCells.length&&
                selectedCells[0] &&
                selectedCells[0].item &&
                selectedCells[0].item.id
                  ? false
                  : true
              }
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
           disabled={
                selectedCells &&
                selectedCells.length&&
                selectedCells[0] &&
                selectedCells[0].item &&
                selectedCells[0].item.id
                  ? false
                  : true
              }
            onClick={() => {
              hide();
              onCaregiverQualificationFilter
                ? onCaregiverQualificationFilter()
                : undefined;
            }}
          >
            <NavLink
             disabled={
                selectedCells &&
                selectedCells.length&&
                selectedCells[0] &&
                selectedCells[0].item &&
                selectedCells[0].item.id
                  ? false
                  : true
              }
            >
              <img src={filter} className='mr-2' alt='' />
              <span className='align-middle'>
                {languageTranslation('FILTER_BY_QUALI')}
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells &&
                selectedCells.length&&
                selectedCells[0] &&
                selectedCells[0].item &&
                selectedCells[0].item.id
                  ? false
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
            <ConnectAppointment
              selectedCaregiverData={selectedCells}
              selectedCareinstitutionData={selectedCareinstitutionData}
              qualifications={qualificationList}
              setSelectedCaregiver={onUpdateStatus}
              setSelectedCareinstitution={setSelectedCareinstitution}
              handleupdateData={handleupdateData}
              label='link'
              hide={hide}
            />
          </NavItem>
          <NavItem>
            <ConnectAppointment
              selectedCaregiverData={selectedCells}
              selectedCareinstitutionData={selectedCareinstitutionData}
              qualifications={qualificationList}
              setSelectedCaregiver={onUpdateStatus}
              setSelectedCareinstitution={setSelectedCareinstitution}
              handleupdateData={handleupdateData}
              label='unlink'
              hide={hide}
            />
          </NavItem>
          <NavItem className='bordernav' />
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? 
                  selectedCells.length&&
                  selectedCells[0] &&
                  selectedCells[0].item &&
                  selectedCells[0].item.id ||
                    (disconnectAppCond && disconnectAppCond.length !== 0) ||
                    isLeasingAppointment
                  : true
              }
              onClick={() => {
                hide();
                updateCaregiverStatus('confirmed');
                setconfirmApp(true);
                handleCareGiverBulkEmail();
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
                  updateCaregiverStatus('confirmed');
                }}
              >
                {languageTranslation('SET_ON_CONF')}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (selectedCells[0].item &&
                      selectedCells[0].item.status !== 'confirmed') ||
                    isLeasingAppointment
                  : true
              }
            >
              <img src={unset_confirm} className='mr-2' alt='' />
              <span
                className='align-middle'
                onClick={() => {
                  hide();
                  updateCaregiverStatus('notconfirmed');
                }}
              >
                {languageTranslation('SET_ON_NOT_CONF')}
              </span>
            </NavLink>{' '}
          </NavItem>
          <NavItem>
            <NavLink
              disabled={
                selectedCells && selectedCells.length
                  ? selectedCells.filter(
                      (availability: any) =>
                        (availability && !availability.item) ||
                        !isLeasingAppointment ||
                        (availability.item &&
                          availability.item.appointments &&
                          availability.item.appointments.length &&
                          availability.item.appointments[0] &&
                          availability.item.appointments[0].cr &&
                          availability.item.appointments[0].cr.status !==
                            'confirmed')
                    ).length
                    ? true
                    : false
                  : true
              }
              onClick={() => {
                hide();
                setleasingContract(true);
                handleCareGiverBulkEmail();
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
              disabled={
                selectedCells
                  ? selectedCells.length === 0 || !isLeasingAppointment
                  : true
              }
              onClick={() => {
                hide();
                setTerminateAggrement(true);
                handleCareGiverBulkEmail();
              }}
            >
              <img src={termination} className='mr-2' alt='' />
              <span className='align-middle'>
                {languageTranslation('CREATE_TERMINATION_AGREEMENT')}
              </span>
            </NavLink>{' '}
          </NavItem>
        </Nav>
      </div>
      {renderDetailedList()}
      {openCareGiverBulkEmail ? (
        <BulkEmailCareGiverModal
          openModal={openCareGiverBulkEmail}
          qualification={
            sortedQualificationList && sortedQualificationList
              ? sortedQualificationList
              : []
          }
          handleClose={handleClose}
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
          selectedCells={selectedCells}
          confirmApp={confirmApp}
          selectedCellsCareinstitution={selectedCareinstitutionData}
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
            : []
        }
        selectedCellsCareinstitution={selectedCareinstitutionData}
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
      />
    </>
  );
};
