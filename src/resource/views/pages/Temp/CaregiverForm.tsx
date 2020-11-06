import React, { useEffect, useState } from "react";
import moment from "moment";
import classnames from "classnames";
import {
  dateDiffernceValidator,
  dateValidatorNorm,
  errorFormatter,
  germanNumberFormat,
  languageTranslation,
} from "../../../../helpers";
import {
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";
import Select from "react-select";
import { FormikProps, Field, FormikHelpers, Formik, Form } from "formik";
import {
  AppConfig,
  appointmentDayFormat,
  DateMask,
  dbAcceptableFormat,
  defaultDateFormat,
  defaultDateTimeFormatForDashboard,
  NightAllowancePerHour,
  TimeMask,
} from "../../../../config";
import MaskedInput from "react-text-mask";
import {
  IAddCargiverAppointmentRes,
  ICaregiverFormValue,
  IReactSelectInterface,
} from "../../../../interfaces";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  AppointmentsQueries,
  DocumentQueries,
  InvoiceQueries,
  LeasingContractQueries,
} from "../../../../graphql/queries";

import { toast } from "react-toastify";
import { AppointmentMutations } from "../../../../graphql/Mutations";
import { ConfirmBox } from "../../components/ConfirmBox";
const [
  ADD_CAREGIVER_AVABILITY,
  ,
  UPDATE_CAREGIVER_AVABILITY,
  ,
  ,
  DELETE_CAREGIVER_AVABILITY,
] = AppointmentMutations;
const [, , , , GET_WORKPROOF_PDF] = DocumentQueries;
const [GET_LEASING_CONTRACT] = LeasingContractQueries;
const [, , GET_INVOICE_BY_APPOINTMENT_ID] = InvoiceQueries;
const [
  ,
  GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID,
  ,
  ,
  ,
  ,
  ,
  GET_CONTRACT_BY_APPOINTMENT_ID,
] = AppointmentsQueries;

let toastId: any = null;
const validateWorkingHours = (
  type: string,
  startDateTime: any,
  endDateTime: any
) => {
  const current = moment().format(defaultDateFormat);
  startDateTime = moment(startDateTime).format(defaultDateFormat);
  endDateTime = moment(endDateTime).format(defaultDateFormat);
  let validate: boolean;
  let validDateData: any;
  validate = dateDiffernceValidator(startDateTime, current, endDateTime, name);
  validDateData = dateValidatorNorm(endDateTime);

  switch (type) {
    case "workingHoursFromDate":
      if (!validate) {
        return languageTranslation("DATE_VALIDATION_MESSAGE");
      }

      if (!validDateData.isValid) {
        return validDateData.message;
      }
      return null;
    case "workingHoursToDate":
      if (!validate) {
        return languageTranslation("DATE_VALIDATION_MESSAGE");
      }
      if (!validDateData.isValid) {
        return validDateData.message;
      }
      return null;
    case "breakFromDate":
      if (!validate) {
        return languageTranslation("DATE_VALIDATION_MESSAGE");
      }
      if (!validDateData.isValid) {
        return validDateData.message;
      }
      return null;
    case "breakToDate":
      if (!validate) {
        return languageTranslation("DATE_VALIDATION_MESSAGE");
      }
      if (!validDateData.isValid) {
        return validDateData.message;
      }
      return null;
    default:
      return null;
  }
};

export const CaregiverForm = ({
  selected,
  setSelectedCaregiver,
  handleupdateData,
  savingBoth,
  setsavingBoth,
  multipleAvailability,
  caregiverStarData,
  filterUpdated,
  filters,
  setcaregiverStarData
}: any) => {
  const [tempState, setTempState] = useState(false);
  const [timeSlotError, setTimeSlotError] = useState<string>("");
  // store the previous entered value in state
  const [caregiverLastTimeValues, setcaregiverLastTimeValues] = useState<any>();

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
      handleupdateData(addCareGiverAvability, "caregiver");
      updateItemData(addCareGiverAvability);
      toast.dismiss();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation("CARE_GIVER_REQUIREMENT_ADD_SUCCESS_MSG")
        );
      }
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
      handleupdateData([updateCareGiverAvability], "caregiver");
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
      setSelectedCaregiver([]);
      handleupdateData(deleteCareGiverAvability, "caregiver");
    },
  });

  // To fetch caregivers last time data by id getCareGiverAvabilityLastTimeById
  const [
    fetchCaregiverLastTimeData,
    { data: caregiverLastTimeData },
  ] = useLazyQuery<any, any>(GET_CAREGIVER_AVABILITY_LASTTIME_BY_ID, {
    fetchPolicy: "no-cache",
  });

  // push last time data into the caregiver field
  useEffect(() => {
    const {
      distanceInKM = "",
      f = "",
      feePerKM = "",
      n = "",
      otherExpenses = "",
      s = "",
      travelAllowance = "",
      workingProofRecieved = false,
      remarksCareGiver = "",
      remarksInternal = "",
      nightAllowance = undefined,
    } = caregiverLastTimeValues ? caregiverLastTimeValues : {};

    if (
      selected &&
      selected.length &&
      caregiverLastTimeData &&
      caregiverLastTimeData.getCareGiverAvabilityLastTimeById
    ) {
      const { getCareGiverAvabilityLastTimeById } = caregiverLastTimeData;
      let careGiverAvabilityInput: any[] = [];

      selected.forEach(async (element: any) => {
        const {
          isWeekend = "",
          isSelected = "",
          caregiver = undefined,
          item = undefined,
        } = element ? element : {};
        const {
          fee = "",
          nightFee = "",
          weekendAllowance = "",
          holidayAllowance = "",
        } = getCareGiverAvabilityLastTimeById
          ? getCareGiverAvabilityLastTimeById
          : {};
        let data: any = {
          isSelected,
          isWeekend,
          caregiver: {
            ...caregiver,
          },
          item: {
            ...item,
            fee,
            nightFee,
            weekendAllowance,
            holidayAllowance,
            workingProofRecieved,
            remarksCareGiver,
            remarksInternal,
            nightAllowance:
              nightAllowance && nightAllowance.value
                ? nightAllowance.value
                : undefined,
            distanceInKM,
            feePerKM,
            travelAllowance,
            otherExpenses,
            f: f ? "available" : "default",
            s: s ? "available" : "default",
            n: n ? "available" : "default",
          },
        };
        careGiverAvabilityInput = [...careGiverAvabilityInput, data];
      });
      setSelectedCaregiver(careGiverAvabilityInput);
    }
  }, [caregiverLastTimeData]);

  // Query to get uploaded pdf
  const [getLeasingContractPDF, { data: pdfData, loading }] = useLazyQuery<any>(
    GET_LEASING_CONTRACT
  );
  // query to get contract pdf
  const [getContractPDF, { data: contractData }] = useLazyQuery<any>(
    GET_CONTRACT_BY_APPOINTMENT_ID
  );
  // Query to get Invoice pdf
  const [getInvoiceByAppointmentId, { data: invoicePDF }] = useLazyQuery<any>(
    GET_INVOICE_BY_APPOINTMENT_ID
  );
  // Query to get Work Proof pdf
  const [getWorkProofPDF, { data: workProofData }] = useLazyQuery<any>(
    GET_WORKPROOF_PDF
  );

  let isLeasingAppointment = false,
    isAppointment = false;

  // To check appointment with leasing careInst or not
  if (selected && selected.length) {
    isLeasingAppointment = selected.filter(
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
    isAppointment = selected.filter(
      (cell: any) =>
        cell && cell.item && cell.item.appointments && cell.item.appointments
    ).length
      ? true
      : false;
  }

  const updateItemData = (itemData: any) => {
    let temp: any = [];
    selected.forEach(async (element: any, index: number) => {
      const { isWeekend = "", item = undefined, caregiver = {} } = element
        ? element
        : {};
      let data: any = {
        isWeekend,
        caregiver: {
          ...caregiver,
        },
        item: itemData[index],
      };

      temp.push(data);
    });

    setSelectedCaregiver(temp);
  };

  useEffect(() => {
    if (selected && selected.length) {
      if (isLeasingAppointment) {
        const { caregiver = "", item = {} } = selected[0] ? selected[0] : {};
        const { appointments = [] } = item ? item : {};
        const { id = "" } = caregiver ? caregiver : {};

        const { avabilityId = "", id: appointmentId = "", workProofId = "" } =
          appointments && appointments.length && appointments[0]
            ? appointments[0]
            : {};
            console.log('appointments work proof',appointments);
            
        getLeasingContractPDF({
          variables: {
            userId: parseInt(id) /* 48734 */,
            // availabilityId: [parseInt(avabilityId)],
            appointmentId: [parseInt(appointmentId)] /* 3935822 */,
            // documentUploadType: "leasingContract",
          },
        });

        getInvoiceByAppointmentId({
          variables: {
            appointmentId: [parseInt(appointmentId)],
          },
        });

        getWorkProofPDF({
          variables: {
            id: parseInt(workProofId),
            documentUploadType: "workingProof",
          },
        });
        return;
      }
      if (isAppointment) {
        // To get signed contract in case of booked appointment
        const { item = {} } = selected[0] ? selected[0] : {};
        const { appointments = [] } = item ? item : {};
        const { id: appointmentId = "", workProofId = "" } =
          appointments && appointments.length && appointments[0]
            ? appointments[0]
            : {};
        getContractPDF({
          variables: {
            appointmentId: appointmentId,
            // appointments && appointments[0] ? appointments[0].id : null,
          },
        });

        getInvoiceByAppointmentId({
          variables: {
            appointmentId: [parseInt(appointmentId)],
          },
        });

        getWorkProofPDF({
          variables: {
            id: parseInt(workProofId),
            documentUploadType: "workingProof",
          },
        });
      }
    }
    return;
  }, [selected]);

  // Get Invoice PDFs
  const { getInvoiceByAppointmentId: invoiceDetails = [] } = invoicePDF
    ? invoicePDF
    : {};

  let invoiceData = invoiceDetails ? invoiceDetails.invoiceData : {};
  let finalInvoicePDF = invoiceData ? invoiceData.plycocoPdf : "";

  const { getWorkProofPDF: workProof = {} } = workProofData || {};
  const { document: finalWorkProofPDF = "" } = workProof;
  const workingProofSubmitted = !!finalWorkProofPDF;

  let isBeforedate = false,
    item: any = {},
    caregiverDetails: any = {},
    appointmentId = "";
  // set item object
  if (selected && selected.length && selected[0] && selected[0].item) {
    item = selected[0].item;
    caregiverDetails = selected[0].caregiver;
    isBeforedate = moment(item.date).isBefore();
    appointmentId = item.id || "";
  }

  const workingHoursFromDateData = item.workingHoursFrom
    ? item.workingHoursFrom.split(",")
    : null;
  const workingHoursToDateData = item.workingHoursTo
    ? item.workingHoursTo.split(",")
    : null;
  const breakFromDateData = item.breakFrom ? item.breakFrom.split(",") : null;
  const breakToDateData = item.breakTo ? item.breakTo.split(",") : null;
  const {
    firstName,
    lastName,
    id: selectedCaregiverId = "",
  } = caregiverDetails;

 const handleStar= (caregiverId:number)=>{
   if(caregiverStarData.isStar){
    filterUpdated({
      ...filters,
      caregiverId: null,
      soloCaregiver:undefined,
      effects: 'caregiver',
    })
    setcaregiverStarData({
     isStar: false,
     id: "",
     isSecondStar:false,
    })
   }
   else{
     filterUpdated({
       ...filters,
       caregiverId: caregiverId,
       soloCaregiver: `${lastName}${" "}${firstName}`,
       effects: 'caregiver',
     })
     setcaregiverStarData({
      isStar: true,
      id: caregiverId,
      isSecondStar:true,
     })

   }
 }
  
  const {
    name,
    nightFee,
    holidayAllowance,
    weekendAllowance,
    workingProofRecieved,
    distanceInKM,
    feePerKM,
    travelAllowance,
    otherExpenses,
    remarksCareGiver,
    remarksInternal,
    fee,
    night,
    holiday,
    f,
    s,
    n,
    status,
    date: dateString,
    createdBy,
    createdAt,
    updatedAt,
  } = item;
  /**
   *
   */
  const initialFormValues: ICaregiverFormValue = {
    appointmentId,
    name: name ? name : firstName ? `${lastName} ${firstName}` : "",
    fee:
      item && (item.f === "block" || item.s === "block" || item.n === "block")
        ? "0"
        : fee
        ? germanNumberFormat(fee)
        : "",
    nightFee:
      item && (item.f === "block" || item.s === "block" || item.n === "block")
        ? "0"
        : night
        ? germanNumberFormat(night)
        : nightFee
        ? germanNumberFormat(nightFee)
        : "",
    nightAllowance:
      item && item.nightAllowance
        ? NightAllowancePerHour.filter(
            (list: any) => list.value === item.nightAllowance
          )[0]
        : NightAllowancePerHour[0],
    holidayAllowance:
      item && (item.f === "block" || item.s === "block" || item.n === "block")
        ? "0"
        : holidayAllowance
        ? germanNumberFormat(holidayAllowance)
        : holiday
        ? germanNumberFormat(holiday)
        : "",
    weekendAllowance:
      item && (item.f === "block" || item.s === "block" || item.n === "block")
        ? "0"
        : weekendAllowance
        ? germanNumberFormat(weekendAllowance)
        : "",
    workingProofRecieved: workingProofRecieved ? true : false,
    distanceInKM: distanceInKM ? distanceInKM : "",
    feePerKM: feePerKM ? feePerKM : "",
    travelAllowance: travelAllowance ? travelAllowance : "",
    otherExpenses: otherExpenses ? otherExpenses : "",
    workingHoursFromDate:
      workingHoursFromDateData && workingHoursFromDateData.length
        ? moment(workingHoursFromDateData[0]).format(defaultDateFormat)
        : "",
    workingHoursFromTime:
      workingHoursFromDateData && workingHoursFromDateData.length
        ? workingHoursFromDateData[1]
        : "",
    workingHoursToDate:
      workingHoursToDateData && workingHoursToDateData.length
        ? moment(workingHoursToDateData[0]).format(defaultDateFormat)
        : "",
    workingHoursToTime:
      workingHoursToDateData && workingHoursToDateData.length
        ? workingHoursToDateData[1]
        : "",
    breakFromDate:
      breakFromDateData && breakFromDateData.length
        ? moment(breakFromDateData[0]).format(defaultDateFormat)
        : "",
    breakFromTime:
      breakFromDateData && breakFromDateData.length ? breakFromDateData[1] : "",
    breakToDate:
      breakToDateData && breakToDateData.length
        ? moment(breakToDateData[0]).format(defaultDateFormat)
        : "",
    breakToTime:
      breakToDateData && breakToDateData.length ? breakToDateData[1] : "",
    remarksCareGiver:
      caregiverDetails && remarksCareGiver ? remarksCareGiver : "",
    remarksInternal: caregiverDetails && remarksInternal ? remarksInternal : "",
    f: f === "available" ? true : false,
    s: s === "available" ? true : false,
    n: n === "available" ? true : false,
    status: status ? status : "",
    dateString,
    createdBy,
    createdAt,
    updatedAt,
  };

  // Signed contract link
  const { getLeasingContractPDF: pdfDetails = [] } = pdfData ? pdfData : {};
  const { attachment='' } =
    pdfDetails && pdfDetails ? pdfDetails : {};
  // signed self employmentt contract
  const { getContractByAppointmentID = [] } = contractData ? contractData : {};
  const { user_document = {}, appointmentId: contractApptmentIds = [] } =
    getContractByAppointmentID && getContractByAppointmentID.length
      ? getContractByAppointmentID[0]
      : [];
  const { document: selfEmploymentcontract = "" } = user_document
    ? user_document
    : {};



  let activeDateCaregiver =
  !multipleAvailability ? [item.date] :
    selected && selected.length
      ? selected.map((cell: any) => cell.item.date)
      : [];

  // submit caregiver form
  /**
   *
   * @param values
   */
  const handleSubmitCaregiverForm = async (
    values: ICaregiverFormValue,
    { setSubmitting }: FormikHelpers<ICaregiverFormValue>
  ) => {
    const {
      name,
      appointmentId,
      fee,
      nightFee,
      nightAllowance,
      holidayAllowance,
      weekendAllowance,
      workingProofRecieved,
      distanceInKM,
      feePerKM,
      travelAllowance,
      otherExpenses,
      remarksCareGiver,
      remarksInternal,
      f,
      s,
      n,
      status,
      workingHoursFromDate,
      workingHoursFromTime,
      workingHoursToDate,
      workingHoursToTime,
      breakFromDate,
      breakFromTime,
      breakToDate,
      breakToTime,
      createdBy,
      createdAt,
    } = values;
    let workingHoursFromErrMsg = "",
      workingHoursToErrMsg = "",
      breakHoursFromErrMsg = "",
      breakHoursToErrMsg = "";
    if (
      item.status === "confirmed" ||
      item.status === "timeSheetPending" ||
      item.status === "timeSheetUpdated"
    ) {
      workingHoursFromErrMsg = validateWorkingHours(
        "workingHoursFromDate",
        item.date,
        workingHoursFromDate
      );
      workingHoursToErrMsg = validateWorkingHours(
        "workingHoursToDate",
        workingHoursFromDate,
        workingHoursToDate
      );
      breakHoursFromErrMsg = validateWorkingHours(
        "breakFromDate",
        item.date,
        breakFromDate
      );
      breakHoursToErrMsg = validateWorkingHours(
        "breakToDate",
        breakFromDate,
        breakToDate
      );
    }

    let isBlockeddate =
      selected && selected.length && selected[0] && selected[0].item
        ? selected[0].item.f === "block" ||
          selected[0].item.s === "block" ||
          selected[0].item.n === "block"
        : false;
    let isWorkProofStatus: boolean =
      workingHoursFromDate || workingHoursToDate || breakFromDate || breakToDate
        ? true
        : false;
    try {
      // To ignore availabilities in case of block appointment
      if (
        workingHoursFromErrMsg === "" &&
        workingHoursToErrMsg === "" &&
        breakHoursFromErrMsg === "" &&
        breakHoursToErrMsg === ""
      ) {
        if (f || s || n || isBlockeddate) {
          setTimeSlotError("");
          if (selected && selected.length) {
            let careGiverAvabilityInput: any[] = [];
            // To add mulitple availabilty
            selected.forEach(async (element: any) => {
              const { caregiver = "", item = "" } = element ? element : {};
              let temp: any = {
                userId: caregiver && caregiver.id ? parseInt(caregiver.id) : "",
                date: item && item.date ? item.date : "",
                name,
                fee: fee ? parseFloat(fee.replace(/,/g, ".")) : null,
                weekendAllowance: weekendAllowance
                  ? parseFloat(weekendAllowance.replace(/,/g, "."))
                  : null,
                holidayAllowance: holidayAllowance
                  ? parseFloat(holidayAllowance.replace(/,/g, "."))
                  : null,
                nightFee: nightFee
                  ? parseFloat(nightFee.replace(/,/g, "."))
                  : null,
                nightAllowance:
                  nightAllowance && nightAllowance.value
                    ? nightAllowance.value
                    : null,
                workingProofRecieved: workingProofRecieved ? true : false,
                distanceInKM: distanceInKM ? parseFloat(distanceInKM) : null,
                feePerKM: feePerKM ? parseFloat(feePerKM) : null,
                travelAllowance: travelAllowance
                  ? parseFloat(travelAllowance)
                  : null,
                otherExpenses: otherExpenses ? parseFloat(otherExpenses) : null,
                remarksCareGiver: remarksCareGiver ? remarksCareGiver : null,
                remarksInternal: remarksInternal ? remarksInternal : null,
                f: f ? "available" : isBlockeddate ? "block" : "default",
                s: s ? "available" : isBlockeddate ? "block" : "default",
                n: n ? "available" : isBlockeddate ? "block" : "default",
                status: isWorkProofStatus
                  ? "timeSheetUpdated"
                  : status
                  ? status
                  : "default",
                workingHoursFrom: workingHoursFromDate
                  ? `${moment(workingHoursFromDate, defaultDateFormat).format(
                      dbAcceptableFormat
                    )},${workingHoursFromTime}`
                  : null,
                workingHoursTo: workingHoursToDate
                  ? `${moment(workingHoursToDate, defaultDateFormat).format(
                      dbAcceptableFormat
                    )},${workingHoursToTime}`
                  : null,
                breakFrom: breakFromDate
                  ? `${moment(breakFromDate, defaultDateFormat).format(
                      dbAcceptableFormat
                    )},${breakFromTime}`
                  : null,
                breakTo: breakToDate
                  ? `${moment(breakToDate, defaultDateFormat).format(
                      dbAcceptableFormat
                    )},${breakToTime}`
                  : null,
                createdBy,
                createdAt: createdAt ? createdAt : "",
              };
              careGiverAvabilityInput = [...careGiverAvabilityInput, temp];
              if (appointmentId) {
                await updateCaregiver({
                  variables: {
                    id: parseInt(appointmentId),
                    careGiverAvabilityInput: temp,
                  },
                });
                if (!toast.isActive(toastId)) {
                  toastId = toast.success(
                    languageTranslation(
                      "CARE_GIVER_REQUIREMENT_UPDATE_SUCCESS_MSG"
                    )
                  );
                }
                setsavingBoth(false);
              } else {
                toast.dismiss();
              }
            });
            if (!appointmentId) {
              await addCaregiverAvailability({
                variables: {
                  careGiverAvabilityInput,
                },
              });
              // this.setState({
              //   multipleAvailability: false,
              // });
            }
          }
        } else {
          setTimeSlotError(languageTranslation("WORKING_SHIFT_ERROR"));
          return;
        }
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
    setSubmitting(false);
  };

  /**
   *
   * @param id
   *
   */
  // Delete caregiver or careinstitution data
  const onhandleDelete = async (id: string | null) => {
    if (id) {
      const { value } = await ConfirmBox({
        title: languageTranslation("CONFIRM_LABEL"),
        text: languageTranslation("CONFIRM_DELETE_CAREGIVER_AVABILITY"),
      });
      if (!value) {
        return;
      } else {
        await deleteCaregiverAvailability({
          variables: {
            id: [parseInt(id)],
          },
        });
      }
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          name === "careinstitution"
            ? languageTranslation("DELETE_CAREINSTITUTION_REQUIREMENT_SUCCESS")
            : languageTranslation("DELETE_CAREGIVER_AVABILITY_SUCCESS")
        );
      }
    }
  };

  /**
   *
   * @param id
   * @param values
   *
   */
  // fetch last time data for caregiver
  const handleLastTimeData = (id: string, values: any) => {
    if (id) {
      fetchCaregiverLastTimeData({
        variables: {
          userId: id ? parseInt(id) : null,
        },
      });
      setcaregiverLastTimeValues(values);
    }
  };

  /**
   *
   */
  return (
    <>
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleSubmitCaregiverForm}
        enableReinitialize={true}
        children={(props: FormikProps<ICaregiverFormValue>) => {
          const {
            touched,
            errors,
            values,
            values: {
              appointmentId,
              fee,
              nightFee,
              nightAllowance,
              holidayAllowance,
              weekendAllowance,
              distanceInKM,
              feePerKM,
              travelAllowance,
              otherExpenses,
              workingHoursFromDate,
              workingHoursFromTime,
              workingHoursToDate,
              workingHoursToTime,
              breakFromDate,
              breakFromTime,
              breakToDate,
              breakToTime,
              remarksCareGiver,
              remarksInternal,
              f,
              s,
              n,
              createdBy,
              createdAt,
              updatedAt,
            },
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = props;

          useEffect(() => {
            if (savingBoth && !timeSlotError) {
              handleSubmit();
            }
          }, [savingBoth]);

          //For Seting false for saving both on error handling
          useEffect(() => {
            if (props.errors) {
              setsavingBoth(false);
            }
          }, [props.errors]);

          // Custom function to handle react select fields
          const handleSelect = (
            selectOption: IReactSelectInterface,
            name: string
          ) => {
            setFieldValue(name, selectOption);
          };
          const handleTravelAllowance = () => {
            let total: any =
              distanceInKM && feePerKM
                ? parseInt(distanceInKM) * parseInt(feePerKM)
                : null;
            setFieldValue("travelAllowance", total);
          };

          const workingHoursFromErrMsg = validateWorkingHours(
            "workingHoursFromDate",
            item.date,
            workingHoursFromDate
          );
          const workingHoursToErrMsg = validateWorkingHours(
            "workingHoursToDate",
            workingHoursFromDate,
            workingHoursToDate
          );
          const breakHoursFromErrMsg = validateWorkingHours(
            "breakFromDate",
            item.date,
            breakFromDate
          );
          const breakHoursToErrMsg = validateWorkingHours(
            "breakToDate",
            breakFromDate,
            breakToDate
          );
          return (
            <Form>
              <div className="form-section">
                <div
                  className={classnames({
                    "form-card custom-height custom-scrollbar": true,
                    "availability-dark-bg":
                      item.status === "default" &&
                      !isBeforedate &&
                      [item.f, item.s, item.n].indexOf("block") === -1,
                    "matching-bg": item.status === "linked",
                    "contract-bg": item.status === "confirmed",
                    "cancel-contract-bg": item.status === "contractCancelled",
                    "accepted-bg": item.status === "accepted",
                    "contact-initiate-bg": item.status === "contractInitiated",
                    "invoice-bg": item.status === "invoiceInitiated",
                    "confirmation-bg":
                      item.status === "timeSheetPending" ||
                      item.status === "timeSheetUpdated",
                    "availability-bg":
                      item.status === undefined
                        ? false
                        : isBeforedate &&
                          [item.f, item.s, item.n].indexOf("block") === -1,
                  })}
                >
                  <h5 className="content-title">
                    {languageTranslation("MENU_CAREGIVER")}
                  </h5>
                  <Row>
                    {appointmentId ? (
                      <Col lg={"12"}>
                        <FormGroup>
                          <Row>
                            <Col sm="4">
                              <Label className="form-label col-form-label">
                                {languageTranslation("APPOINTMENT_ID")}
                              </Label>
                            </Col>
                            <Col sm="8">
                              <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <div className="required-input appointment-id-width">
                                  <Input
                                    type="text"
                                    disabled={true}
                                    name={"appointmentId"}
                                    value={appointmentId}
                                    placeholder={languageTranslation(
                                      "APPOINTMENT_ID"
                                    )}
                                    className="width-common"
                                  />
                                </div>
                                {isLeasingAppointment ? (
                                  <div className="d-flex align-items-center uber-solona whitespace-nowrap mb-1">
                                    TIMyoCY
                                  </div>
                                ) : (
                                  <div className="d-flex align-items-center uber-solona whitespace-nowrap mb-1">
                                    Plycoco
                                  </div>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    ) : null}
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation("NAME")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div className="required-input">
                              <InputGroup>
                                <Input
                                  type="text"
                                  disabled={true}
                                  placeholder={languageTranslation("NAME")}
                                  value={
                                    caregiverDetails.id
                                      ? [
                                          caregiverDetails.lastName,
                                          caregiverDetails.firstName,
                                        ]
                                          .filter(Boolean)
                                          .join(" ")
                                          .trim()
                                      : ""
                                  }
                                />
                                <InputGroupAddon
                                  addonType="append"
                                  className="cursor-pointer"
                                  onClick={() =>
                                    appointmentId ? handleStar(caregiverDetails.id):null
                                     /*  ? onhandleCaregiverStar(
                                          selectedCareGiver ? selectedCareGiver.id : '',
                                          false,
                                          careGiversListArr &&
                                            careGiversListArr.result &&
                                            careGiversListArr.result.length
                                            ? careGiversListArr.result.findIndex(
                                                (cg: any) =>
                                                  selectedCareGiver &&
                                                  cg.id === selectedCareGiver.id
                                              ) < 0
                                              ? true
                                              : false
                                            : false
                                        )
                                      : '' */
                                  }
                                >
                                  <InputGroupText>
                                    <i
                                    //caregiverStarData
                                      className={
                                        appointmentId&&  caregiverStarData && caregiverStarData.isStar
                                  ? "fa fa-star theme-text"
                                  : "fa fa-star"
                                      }
                                      aria-hidden="true"
                                    ></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation("DATE")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div className="text-value one-line-text">
                              {/* {item.date
                                ? moment(item.date).format(
                                    `${appointmentDayFormat} ${defaultDateFormat}`
                                  )
                                : null} */}
                              {activeDateCaregiver
                                ? activeDateCaregiver
                                    .map(
                                      (
                                        dateString: string | undefined,
                                        index: number
                                      ) =>
                                        dateString
                                          ? moment(dateString).format(
                                              index !==
                                                activeDateCaregiver.length - 1
                                                ? "dd DD"
                                                : `${appointmentDayFormat} ${defaultDateFormat}`
                                            )
                                          : null
                                    )
                                    .join(", ")
                                : null}
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    {item &&
                    (item.f === "block" ||
                      item.s === "block" ||
                      item.n === "block") ? (
                      <div className="blocked-minheight"></div>
                    ) : (
                      <>
                        <Col lg={"12"}>
                          <FormGroup className="mb-2">
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("SHIFT")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div>
                                  <FormGroup check inline>
                                    <div className=" checkbox-custom mb-2">
                                      <input
                                        type="checkbox"
                                        id="early"
                                        className=""
                                        name={"f"}
                                        checked={f}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          const {
                                            target: { checked },
                                          } = e;
                                          setFieldValue("f", checked);
                                        }}
                                      />
                                      <Label for="early">
                                        {languageTranslation("EARLY")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <div className=" checkbox-custom mb-2">
                                      <input
                                        type="checkbox"
                                        id="late"
                                        className=""
                                        name={"s"}
                                        checked={s}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          const {
                                            target: { checked },
                                          } = e;
                                          setFieldValue("s", checked);
                                        }}
                                      />
                                      <Label for="late">
                                        {languageTranslation("LATE")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <div className=" checkbox-custom mb-3">
                                      <input
                                        type="checkbox"
                                        id="night"
                                        className=""
                                        name={"n"}
                                        checked={n}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          const {
                                            target: { checked },
                                          } = e;
                                          setFieldValue("n", checked);
                                        }}
                                      />
                                      <Label for="night">
                                        {languageTranslation("NIGHT")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  {timeSlotError && (
                                    <div className="required-checkbox-error night-allawance-error">
                                      {timeSlotError}
                                    </div>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("FEE")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div className="required-input nightfee-input mb-1">
                                    <InputGroup className="flex-nowrap">
                                      <Input
                                        type="text"
                                        name={"fee"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={fee ? fee : ""}
                                        className={
                                          errors.fee && touched.fee
                                            ? "fee-width error"
                                            : "fee-width"
                                        }
                                      />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                          <i
                                            className="fa fa-euro"
                                            aria-hidden="true"
                                          ></i>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      {errors.fee && touched.fee && (
                                        <div className="required-tooltip bottom-tooltip">
                                          {errors.fee}
                                        </div>
                                      )}
                                    </InputGroup>
                                  </div>
                                  <span
                                    className="d-flex align-items-center edit-remark whitespace-nowrap mb-1"
                                    onClick={() =>
                                      handleLastTimeData(
                                        selectedCaregiverId
                                          ? selectedCaregiverId
                                          : "",
                                        values
                                      )
                                    }
                                  >
                                    {languageTranslation("LAST_TIME")}
                                  </span>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("NIGHT_FEE")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="d-flex align-items-center flex-wrap justify-content-between">
                                  <div className="required-input nightfee-input mb-1">
                                    <InputGroup className="flex-nowrap">
                                      <Input
                                        type="text"
                                        name={"nightFee"}
                                        value={nightFee ? nightFee : ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                          errors.nightFee && touched.nightFee
                                            ? "fee-width error"
                                            : "fee-width"
                                        }
                                      />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>
                                          <i
                                            className="fa fa-euro"
                                            aria-hidden="true"
                                          ></i>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      {errors.nightFee && touched.nightFee && (
                                        <div className="required-tooltip bottom-tooltip">
                                          {errors.nightFee}
                                        </div>
                                      )}
                                    </InputGroup>
                                  </div>
                                  <div className="flex-grow-1 nightallowance-input mb-1">
                                    <Select
                                      placeholder={languageTranslation(
                                        "NIGHT_ALLOWANCE"
                                      )}
                                      options={NightAllowancePerHour}
                                      onChange={(value: any) =>
                                        handleSelect(value, "nightAllowance")
                                      }
                                      value={
                                        nightAllowance
                                          ? nightAllowance
                                          : NightAllowancePerHour[0]
                                      }
                                      classNamePrefix="custom-inner-reactselect"
                                      className={"custom-reactselect"}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("WEEKEND_FEE")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input nightfee-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      name={"weekendAllowance"}
                                      value={
                                        weekendAllowance ? weekendAllowance : ""
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={
                                        errors.weekendAllowance &&
                                        touched.weekendAllowance
                                          ? "fee-width error"
                                          : "fee-width"
                                      }
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
                                          aria-hidden="true"
                                        ></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    {errors.weekendAllowance &&
                                      touched.weekendAllowance && (
                                        <div className="required-tooltip bottom-tooltip">
                                          {errors.weekendAllowance}
                                        </div>
                                      )}
                                  </InputGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("HOLIDAY_FEE")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input nightfee-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      name={"holidayAllowance"}
                                      value={
                                        holidayAllowance ? holidayAllowance : ""
                                      }
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={
                                        errors.holidayAllowance &&
                                        touched.holidayAllowance
                                          ? "fee-width error"
                                          : "fee-width"
                                      }
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
                                          aria-hidden="true"
                                        ></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    {errors.holidayAllowance &&
                                      touched.holidayAllowance && (
                                        <div className="required-tooltip bottom-tooltip">
                                          {errors.holidayAllowance}
                                        </div>
                                      )}
                                  </InputGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <div className="d-flex align-items-center flex-wrap distance-section">
                            <FormGroup className="fee-input">
                              <Label className="form-label col-form-label">
                                {languageTranslation("FEE_PER_KM")}
                              </Label>

                              <div className="required-input">
                                <InputGroup>
                                  <Input
                                    type="text"
                                    name={"distanceInKM"}
                                    value={distanceInKM ? distanceInKM : ""}
                                    placeholder={languageTranslation(
                                      "FEE_PER_KM"
                                    )}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                      errors.distanceInKM &&
                                      touched.distanceInKM
                                        ? "fee-width error"
                                        : "fee-width"
                                    }
                                    disabled={
                                      item &&
                                      (item.f === "block" ||
                                        item.s === "block" ||
                                        item.n === "block")
                                    }
                                  />
                                  <InputGroupAddon addonType="append">
                                    <InputGroupText>km</InputGroupText>
                                  </InputGroupAddon>
                                  {errors.distanceInKM &&
                                    touched.distanceInKM && (
                                      <div className="required-tooltip bottom-tooltip">
                                        {errors.distanceInKM}
                                      </div>
                                    )}
                                </InputGroup>
                              </div>
                            </FormGroup>
                            <FormGroup className="a-input">
                              <Label className="form-label col-form-label">
                                {languageTranslation("a")}
                              </Label>

                              <div className="required-input">
                                <InputGroup>
                                  <Input
                                    type="text"
                                    name={"feePerKM"}
                                    value={feePerKM ? feePerKM : ""}
                                    placeholder={languageTranslation("a")}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                      errors.feePerKM && touched.feePerKM
                                        ? "fee-width error"
                                        : "fee-width"
                                    }
                                    disabled={
                                      item &&
                                      (item.f === "block" ||
                                        item.s === "block" ||
                                        item.n === "block")
                                    }
                                  />
                                  <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                      <i
                                        className="fa fa-euro"
                                        aria-hidden="true"
                                      ></i>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  {errors.feePerKM && touched.feePerKM && (
                                    <div className="required-tooltip bottom-tooltip">
                                      {errors.feePerKM}
                                    </div>
                                  )}
                                </InputGroup>
                              </div>
                            </FormGroup>
                            <FormGroup className="totalbtn-input">
                              <div className="label-height"></div>

                              <Button
                                className="add-new-btn"
                                color=""
                                onClick={handleTravelAllowance}
                              >
                                <i
                                  className="fa fa-arrow-right"
                                  aria-hidden="true"
                                />
                              </Button>
                            </FormGroup>
                            <FormGroup className="total-input flex-grow-1">
                              <Label className="form-label col-form-label">
                                {languageTranslation("TOTAL")}{" "}
                              </Label>
                              <div className="required-input">
                                <Input
                                  type="text"
                                  disabled={true}
                                  name={"travelAllowance"}
                                  className="width-common"
                                  value={travelAllowance ? travelAllowance : ""}
                                />
                              </div>
                            </FormGroup>
                          </div>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="4">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("EXPENSES")}
                                </Label>
                              </Col>
                              <Col sm="8">
                                <div className="required-input">
                                  <Input
                                    type="text"
                                    name={"otherExpenses"}
                                    value={otherExpenses ? otherExpenses : ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={languageTranslation(
                                      "EXPENSES"
                                    )}
                                    className={
                                      errors.otherExpenses &&
                                      touched.otherExpenses
                                        ? "width-common error"
                                        : "width-common"
                                    }
                                  />
                                  {errors.otherExpenses &&
                                    touched.otherExpenses && (
                                      <div className="required-tooltip bottom-tooltip">
                                        {errors.otherExpenses}
                                      </div>
                                    )}
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </>
                    )}
                    {item &&
                    (item.status === "confirmed" ||
                      item.status === "timeSheetPending" ||
                      item.status === "timeSheetUpdated") &&
                    new Date(item.date) <= new Date() ? (
                      <>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm={"4"}>
                                <Label className="form-label col-form-label">
                                  {languageTranslation("WORKING_HOURS")}
                                </Label>
                              </Col>
                              <Col sm={"8"}>
                                <div className="required-input">
                                  <div className="custom-col inner-no-padding-col row">
                                    <Col sm={"6"}>
                                      <InputGroup className="flex-nowrap position-relative">
                                        <Field name={"workingHoursFromDate"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={DateMask}
                                              className={
                                                workingHoursFromErrMsg &&
                                                workingHoursFromErrMsg !== ""
                                                  ? "text-input error form-control"
                                                  : "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              onBlur={() =>
                                                setTempState(!tempState)
                                              }
                                              placeholder={languageTranslation(
                                                "HOLIDAY_DATE_PLACEHOLDER"
                                              )}
                                              value={
                                                workingHoursFromDate
                                                  ? workingHoursFromDate
                                                  : ""
                                              }
                                            />
                                          )}
                                        </Field>

                                        {workingHoursFromErrMsg ? (
                                          <div className="required-tooltip">
                                            {workingHoursFromErrMsg}
                                          </div>
                                        ) : null}
                                      </InputGroup>
                                    </Col>
                                    <Col sm={"6"}>
                                      <InputGroup className="flex-nowrap">
                                        <Field name={"workingHoursFromTime"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={TimeMask}
                                              className={
                                                errors.workingHoursFromTime &&
                                                touched.workingHoursFromTime
                                                  ? "text-input error form-control"
                                                  : "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              placeholder={languageTranslation(
                                                "TIME_FORMAT"
                                              )}
                                              value={
                                                workingHoursFromTime
                                                  ? workingHoursFromTime
                                                  : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {errors.workingHoursFromTime &&
                                          touched.workingHoursFromTime && (
                                            <div className="required-tooltip">
                                              {errors.workingHoursFromTime}
                                            </div>
                                          )}
                                      </InputGroup>
                                    </Col>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm={"4"}></Col>
                              <Col sm={"8"}>
                                <div className="required-input">
                                  <div className="custom-col inner-no-padding-col row">
                                    <Col sm={"6"}>
                                      <InputGroup className="flex-nowrap">
                                        <Field name={"workingHoursToDate"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={DateMask}
                                              className={
                                                workingHoursToErrMsg &&
                                                workingHoursToErrMsg !== ""
                                                  ? "text-input error form-control"
                                                  : "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              placeholder={languageTranslation(
                                                "HOLIDAY_DATE_PLACEHOLDER"
                                              )}
                                              value={
                                                workingHoursToDate
                                                  ? workingHoursToDate
                                                  : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {workingHoursToErrMsg ? (
                                          <div className="required-tooltip">
                                            {workingHoursToErrMsg}
                                          </div>
                                        ) : null}
                                      </InputGroup>
                                    </Col>
                                    <Col sm={"6"}>
                                      <InputGroup className="flex-nowrap">
                                        <Field name={"workingHoursToTime"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={TimeMask}
                                              className={
                                                errors.workingHoursToTime &&
                                                touched.workingHoursToTime
                                                  ? "text-input error form-control"
                                                  : "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              placeholder={languageTranslation(
                                                "TIME_FORMAT"
                                              )}
                                              value={
                                                workingHoursToTime
                                                  ? workingHoursToTime
                                                  : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {errors.workingHoursToTime ? (
                                          errors.workingHoursToTime &&
                                          touched.workingHoursToTime && (
                                            <div className="required-tooltip">
                                              {errors.workingHoursToTime}
                                            </div>
                                          )
                                        ) : touched.workingHoursToTime &&
                                          0 <= 0 ? (
                                          <div className="required-tooltip">
                                            {languageTranslation(
                                              "VALID_TIME_RANGE"
                                            )}
                                          </div>
                                        ) : null}
                                      </InputGroup>
                                    </Col>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm={"4"}>
                                <Label className="form-label col-form-label">
                                  {languageTranslation("BREAK")}
                                </Label>
                              </Col>

                              <Col sm={"8"}>
                                <div className="required-input">
                                  <div className="custom-col inner-no-padding-col row">
                                    <Col sm={"6"}>
                                      <InputGroup className="flex-nowrap">
                                        <Field name={"breakFromDate"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={DateMask}
                                              className={
                                                breakHoursFromErrMsg &&
                                                breakHoursFromErrMsg !== ""
                                                  ? "text-input error form-control"
                                                  : "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              onBlur={() =>
                                                setTempState(!tempState)
                                              }
                                              placeholder={languageTranslation(
                                                "HOLIDAY_DATE_PLACEHOLDER"
                                              )}
                                              value={
                                                breakFromDate
                                                  ? breakFromDate
                                                  : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {breakHoursFromErrMsg &&
                                        breakHoursFromErrMsg !== "" ? (
                                          <div className="required-tooltip">
                                            {breakHoursFromErrMsg}
                                          </div>
                                        ) : null}
                                      </InputGroup>
                                    </Col>

                                    <Col sm={"6"}>
                                      <InputGroup className="flex-nowrap">
                                        <Field name={"breakFromTime"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={TimeMask}
                                              className={
                                                errors.breakFromTime &&
                                                touched.breakFromTime
                                                  ? "text-input error form-control"
                                                  : "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              placeholder={languageTranslation(
                                                "TIME_FORMAT"
                                              )}
                                              value={
                                                breakFromTime
                                                  ? breakFromTime
                                                  : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {errors.breakFromTime &&
                                          touched.breakFromTime && (
                                            <div className="required-tooltip">
                                              {errors.breakFromTime}
                                            </div>
                                          )}
                                      </InputGroup>
                                    </Col>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm={"4"}></Col>
                              <Col sm={"8"}>
                                <div className="required-input">
                                  <div className="custom-col inner-no-padding-col row">
                                    <Col sm={"6"}>
                                      <InputGroup className="flex-nowrap">
                                        <Field name={"breakToDate"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={DateMask}
                                              className={
                                                breakHoursToErrMsg &&
                                                breakHoursToErrMsg !== ""
                                                  ? "text-input error form-control"
                                                  : "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              onBlur={() =>
                                                setTempState(!tempState)
                                              }
                                              placeholder={languageTranslation(
                                                "HOLIDAY_DATE_PLACEHOLDER"
                                              )}
                                              value={
                                                breakToDate ? breakToDate : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {breakHoursToErrMsg &&
                                        breakHoursToErrMsg !== "" ? (
                                          <div className="required-tooltip">
                                            {breakHoursToErrMsg}
                                          </div>
                                        ) : null}
                                      </InputGroup>
                                    </Col>
                                    <Col sm={"6"}>
                                      <InputGroup className="flex-nowrap">
                                        <Field name={"breakToTime"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={TimeMask}
                                              className={
                                                errors.breakToTime &&
                                                touched.breakToTime
                                                  ? "text-input error form-control"
                                                  : "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              placeholder={languageTranslation(
                                                "TIME_FORMAT"
                                              )}
                                              value={
                                                breakToTime ? breakToTime : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {errors.breakToTime ? (
                                          errors.breakToTime &&
                                          touched.breakToTime && (
                                            <div className="required-tooltip">
                                              {errors.breakToTime}
                                            </div>
                                          )
                                        ) : touched.breakToTime && 0 <= 0 ? (
                                          <div className="required-tooltip">
                                            {languageTranslation(
                                              "VALID_TIME_RANGE"
                                            )}
                                          </div>
                                        ) : null}
                                      </InputGroup>
                                    </Col>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                      </>
                    ) : (
                      ""
                    )}

                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation("WORKING_PROOF_NECESSARY")}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div className="required-input mb-1">
                              <FormGroup check inline>
                                <div className=" checkbox-custom mb-0">
                                  <input
                                    type="checkbox"
                                    id="workingProofSubmitted"
                                    className=""
                                    name={"workingProofSubmitted"}
                                    // checked={workingProofSubmitted}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const {
                                        target: { checked },
                                      } = e;
                                      setFieldValue(
                                        "workingProofSubmitted",
                                        checked
                                      );
                                    }}
                                  />
                                  <Label for="workingProofSubmitted"></Label>
                                </div>
                              </FormGroup>
                            </div>

                            {getWorkProofPDF && finalWorkProofPDF ? (
                              <a
                                href={`${AppConfig.FILES_ENDPOINT}${finalWorkProofPDF}`}
                                target={"_blank"}
                                className="view-more-link text-underline"
                              >
                                <i className="fa fa-file-o mr-2" />
                                {languageTranslation("WORK_PROOF")}
                              </a>
                            ) : null}
                            <br />
{/* {console.log('attachment',attachment)}
{console.log('leasingContract',leasingContract)}
{console.log('getContractByAppointmentID',getContractByAppointmentID)}
{console.log('selfEmploymentcontract',selfEmploymentcontract)} */}

                            {attachment 
                            /* leasingContract &&
                            leasingContract.length &&
                            leasingContract[0] &&
                            leasingContract[0].avabilityId === appointmentId */ ? (
                              <a
                                href={`${AppConfig.FILES_ENDPOINT}${attachment}`}
                                target={"_blank"}
                                className="view-more-link text-underline"
                              >
                                <i className="fa fa-file-o mr-2" />
                                {languageTranslation("CONTRACT")}
                              </a>
                            ) : getContractByAppointmentID &&
                              getContractByAppointmentID.length &&
                              selfEmploymentcontract ? (
                              // && selectedCells && selectedCells.length && selectedCells[0].item && selectedCells[0].item.appointments && selectedCells[0].item.appointments.length && selectedCells[0].item.appointments[0] && contractApptmentIds.includes(selectedCells[0].item.appointments[0].id
                              // )
                              <a
                                href={`${AppConfig.FILES_ENDPOINT}${selfEmploymentcontract}`}
                                target={"_blank"}
                                className="view-more-link text-underline"
                              >
                                <i className="fa fa-file-o mr-2" />
                                {languageTranslation("CONTRACT")}
                              </a>
                            ) : null}
                            <br />

                            {getInvoiceByAppointmentId &&
                            getInvoiceByAppointmentId.length &&
                            finalInvoicePDF ? (
                              <a
                                href={`${AppConfig.FILES_ENDPOINT}/${finalInvoicePDF}`}
                                target={"_blank"}
                                className="view-more-link text-underline"
                              >
                                <i className="fa fa-file-o mr-2" />
                                {languageTranslation("INVOICE")}
                              </a>
                            ) : null}
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>

                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation(
                                "REMARKS_VISIBLE_FOR_CAREGIVER"
                              )}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div className="required-input">
                              <Input
                                className="textarea-custom form-control"
                                rows="3"
                                type="textarea"
                                name="remarksCareGiver"
                                value={remarksCareGiver ? remarksCareGiver : ""}
                                onChange={handleChange}
                                id="exampleText1"
                                maxLength={255}
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm="4">
                            <Label className="form-label col-form-label">
                              {languageTranslation(
                                "REMARKS_VISIBLE_INTERNALLY"
                              )}
                            </Label>
                          </Col>
                          <Col sm="8">
                            <div className="required-input">
                              <Input
                                className="textarea-custom form-control"
                                rows="3"
                                type="textarea"
                                name="remarksInternal"
                                value={remarksInternal ? remarksInternal : ""}
                                onChange={handleChange}
                                maxLength={255}
                                id="exampleText2"
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>

                    {createdBy ? (
                      <Col lg={"12"} className="mb-2 text-right text-muted">
                        <i>
                          {`${languageTranslation("CREATED_BY")} ${
                            createdBy ? createdBy : ""
                          }`}
                        </i>
                      </Col>
                    ) : null}
                    {createdAt ? (
                      <Col lg={"12"} className="mb-2 text-right text-muted">
                        <i>
                          {`${languageTranslation("CREATED_AT")} ${
                            createdAt
                              ? moment(createdAt).format(
                                  defaultDateTimeFormatForDashboard
                                )
                              : ""
                          }`}
                        </i>
                      </Col>
                    ) : null}
                    {updatedAt ? (
                      <Col lg={"12"} className="mb-2 text-right text-muted">
                        <i>
                          {`${languageTranslation("UPDATED_AT")} ${
                            updatedAt
                              ? moment(updatedAt).format(
                                  defaultDateTimeFormatForDashboard
                                )
                              : ""
                          }`}
                        </i>
                      </Col>
                    ) : null}
                    <Col lg={"12"}>
                      <div className="d-flex align-items-center justify-content-between">
                        <Button
                          className="btn-save"
                          color="danger"
                          onClick={() => onhandleDelete(appointmentId)}
                          disabled={!appointmentId}
                        >
                          {languageTranslation("DELETE")}
                        </Button>
                        <Button
                          className="btn-save"
                          color="primary"
                          onClick={handleSubmit}
                          disabled={
                            addCaregiverLoading || updateCaregiverLoading
                          }
                        >
                          {addCaregiverLoading || updateCaregiverLoading ? (
                            <i className="fa fa-spinner fa-spin mr-2" />
                          ) : (
                            ""
                          )}
                          {appointmentId
                            ? languageTranslation("UPDATE_BUTTON")
                            : languageTranslation("SAVE_BUTTON")}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Form>
          );
        }}
      />
    </>
  );
};
