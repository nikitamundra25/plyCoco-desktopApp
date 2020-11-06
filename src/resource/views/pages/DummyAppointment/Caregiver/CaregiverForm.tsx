import React from "react";
import Select from "react-select";
import { FormikProps, Field, FormikHelpers, Formik, Form } from "formik";
import moment from "moment";
import classnames from "classnames";
import { toast } from "react-toastify";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import {
  IAppointmentCareGiverForm,
  ICaregiverFormValue,
  IReactSelectInterface,
} from "../../../../../interfaces";
import {
  languageTranslation,
  dateDiffernceValidator,
  dateValidatorNorm,
  germanNumberFormat,
  errorFormatter,
} from "../../../../../helpers";
import {
  NightAllowancePerHour,
  defaultDateFormat,
  appointmentDayFormat,
  dbAcceptableFormat,
  AppConfig,
  DateMask,
  TimeMask,
  defaultDateTimeFormatForDashboard,
} from "../../../../../config";
import "../index.scss";
import {
  LeasingContractQueries,
  AppointmentsQueries,
  InvoiceQueries,
  DocumentQueries,
} from "../../../../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import MaskedInput from "react-text-mask";
import Loader from "../../../containers/Loader/Loader";
import { CareGiverValidationSchema } from "../../../../validations/AppointmentsFormValidationSchema";
let toastId: any = null;
class CaregiverFormView extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      workingHoursFromErrMsg: "",
      workingHoursToErrMsg: "",
      breakHoursFromErrMsg: "",
      breakHoursToErrMsg: "",
      timeSlotError: "",
      caregiverLastTimeValues: "",
    };
  }

  // submit caregiver form
  handleSubmitCaregiverForm = async (
    values: ICaregiverFormValue,
    { setSubmitting }: FormikHelpers<ICaregiverFormValue>
  ) => {
    const {
      updateCaregiver,
      addCaregiverAvailability,
      selectedCells,
      setsavingBoth,
    } = this.props;
    console.log("values in handleSubmitCaregiverForm", values);
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
    const {
      // selectedCells,
      workingHoursFromErrMsg,
      workingHoursToErrMsg,
      breakHoursFromErrMsg,
      breakHoursToErrMsg,
    } = this.state;
    let isBlockeddate =
      selectedCells &&
      selectedCells.length &&
      selectedCells[0] &&
      selectedCells[0].item
        ? selectedCells[0].item.f === "block" ||
          selectedCells[0].item.s === "block" ||
          selectedCells[0].item.n === "block"
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
          this.setState({ timeSlotError: "" });
          // setTimeSlotError('');
          if (selectedCells && selectedCells.length) {
            const {
              id: ID = "",
              firstName = "",
              lastName = "",
              email = "",
              caregiver: caregiverData = {},
              dateString: dateData = "",
              item: Item = "",
              qualificationIds = "",
            } =
              selectedCells && selectedCells.length && selectedCells[0]
                ? selectedCells[0]
                : {};
            let caregiverdata: any = [
              {
                id: ID,
                firstName,
                email,
                lastName,
                qualificationIds,
                caregiver: {
                  ...caregiverData,
                },
                dateString: dateData,
                item: {
                  appointmentId,
                  name,
                  date: dateData,
                  fee: fee ? parseFloat(fee.replace(/,/g, ".")) : null,
                  nightFee: nightFee
                    ? parseFloat(nightFee.replace(/,/g, "."))
                    : null,
                  weekendAllowance: weekendAllowance
                    ? parseFloat(weekendAllowance.replace(/,/g, "."))
                    : null,
                  holidayAllowance: holidayAllowance
                    ? parseFloat(holidayAllowance.replace(/,/g, "."))
                    : null,
                  distanceInKM,
                  feePerKM,
                  lastName,
                  f: f ? "available" : isBlockeddate ? "block" : "default",
                  n: n ? "available" : isBlockeddate ? "block" : "default",
                  s: s ? "available" : isBlockeddate ? "block" : "default",
                  nightAllowance:
                    nightAllowance && nightAllowance.value
                      ? nightAllowance.value
                      : null,
                  otherExpenses,
                  remarksCareGiver,
                  remarksInternal,
                  travelAllowance,
                  workingProofRecieved,
                  status,
                  createdBy,
                  createdAt,
                },
              },
            ];
            let careGiverAvabilityInput: any[] = [];
            // To add mulitple availabilty
            selectedCells.forEach(async (element: any) => {
              const { id = "", dateString = "" } = element ? element : {};
              let temp: any = {
                userId: id ? parseInt(id) : "",
                date: dateString,
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
              this.setState({
                multipleAvailability: false,
              });
            }
          }
        } else {
          this.setState({
            timeSlotError: languageTranslation("WORKING_SHIFT_ERROR"),
          });
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
  // fetch last time data for caregiver
  handleLastTimeData = (id: string, values: any) => {
    const {
      fetchCaregiverLastTimeData,
      setcaregiverLastTimeValues,
    } = this.props;
    if (id) {
      fetchCaregiverLastTimeData({
        variables: {
          userId: id ? parseInt(id) : null,
        },
      });
      setcaregiverLastTimeValues(values);
      // setcaregiverLastTimeValues(values);
    }
  };

  render() {
    const {
      departmentList,
      qualificationList,
      selectedCells,
      selectedCellsCareinstitution,
      multipleAvailability,
      timeSlotError,
      addCaregiverLoading,
      onhandleDelete,
    } = this.props;

    // Options to show department data
    let careInstitutionDepartment: IReactSelectInterface[] = [];
    if (departmentList && departmentList.getDivision.length) {
      const { getDivision } = departmentList;
      careInstitutionDepartment = getDivision.map((dept: any) => ({
        label: dept.name,
        value: dept && dept.id ? dept.id.toString() : "",
      }));
    }

    // Fetch values in case of edit caregiver with condition predefined data or availability data by default it will be null or undefined
    let {
      firstName = "",
      lastName = "",
      email = "",
      id: selectedCaregiverId = "",
      dateString = "",
      caregiver = undefined,
      item = undefined,
    } =
      selectedCells &&
      // to check multiple cells are free or reserve or you've clicked on new appointment to reflect the form
      (selectedCells.length === 1 ||
        multipleAvailability ||
        (selectedCells[0] && selectedCells[0].item)) &&
      selectedCells[0]
        ? selectedCells[0]
        : {};

    const {
      id: Id = "",
      firstName: FirstName = "",
      lastName: LastName = "",
      name: careInstName = "",
      canstitution = {},
      item: Item = {},
      qualificationIds = {},
      dateString: careInstitutiondateString = "",
    } =
      selectedCellsCareinstitution && selectedCellsCareinstitution.length
        ? selectedCellsCareinstitution[0]
        : {};

    let street: string = canstitution && canstitution.street;
    let departmentData: any = Item ? Item.department : undefined;

    if (
      careInstitutionDepartment &&
      careInstitutionDepartment.length &&
      selectedCellsCareinstitution &&
      Item &&
      Item.divisionId
    ) {
      departmentData = careInstitutionDepartment.filter(
        (dept: any) => dept.value === Item.divisionId
      );
    }
    let qualificationfor: any;
    if (
      Item &&
      Item.qualificationForCharge &&
      !Item.qualificationForCharge.value
    ) {
      qualificationfor = qualificationList.filter((value: any) => {
        return Item && Item.qualificationForCharge
          ? Item.qualificationForCharge === value.value
          : // Item.qualificationForCharge.includes(value.value)
            null;
      });
    } else {
      qualificationfor = [Item.qualificationForCharge];
    }
    const {
      name = "",
      id = "",
      fee = "",
      night = "",
      nightFee = "",
      nightAllowance = undefined,
      holiday = "",
      holidayAllowance = "",
      weekendAllowance = "",
      distanceInKM = "",
      feePerKM = "",
      travelAllowance = "",
      otherExpenses = "",
      workingProofRecieved = false,
      remarksCareGiver = "",
      remarksInternal = "",
      f = "",
      s = "",
      n = "",
      status = "",
      workingHoursFrom = "",
      workingHoursTo = "",
      breakFrom = "",
      breakTo = "",
      createdBy = "",
      createdAt = "",
      updatedAt = "",
      appointments = [],
    } = item ? item : caregiver ? caregiver : {};

    const workingHoursFromDateData = workingHoursFrom
      ? workingHoursFrom.split(",")
      : null;
    const workingHoursToDateData = workingHoursTo
      ? workingHoursTo.split(",")
      : null;
    const breakFromDateData = breakFrom ? breakFrom.split(",") : null;
    const breakToDateData = breakTo ? breakTo.split(",") : null;
    // const createdBy = appointments && appointments.length && appointments[0] ? appointments[0].createdBy : ""

    const valuesForCaregiver: ICaregiverFormValue = {
      appointmentId: id !== null ? id : null,
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
        caregiver && nightAllowance
          ? NightAllowancePerHour.filter(
              (list: any) => list.value === nightAllowance
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
        breakFromDateData && breakFromDateData.length
          ? breakFromDateData[1]
          : "",
      breakToDate:
        breakToDateData && breakToDateData.length
          ? moment(breakToDateData[0]).format(defaultDateFormat)
          : "",
      breakToTime:
        breakToDateData && breakToDateData.length ? breakToDateData[1] : "",
      remarksCareGiver: caregiver && remarksCareGiver ? remarksCareGiver : "",
      remarksInternal: caregiver && remarksInternal ? remarksInternal : "",
      f: f === "available" ? true : false,
      s: s === "available" ? true : false,
      n: n === "available" ? true : false,
      status: status ? status : "",
      dateString,
      createdBy,
      createdAt,
      updatedAt,
    };

    let isLeasingAppointment = false;
    let isAppointment = false;

    // To check appointment with leasing careInst or not
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
      isAppointment = selectedCells.filter(
        (cell: any) =>
          cell && cell.item && cell.item.appointments && cell.item.appointments
      ).length
        ? true
        : false;
    }
    let activeDateCaregiver = !multipleAvailability
      ? [dateString]
      : selectedCells
      ? selectedCells.map((cell: any) => cell.dateString)
      : [];
    console.log("multipleAvailability", multipleAvailability);

    console.log("dateString", dateString);
    console.log("selectedCells", selectedCells);

    let dateCondition: any;
    if (
      activeDateCaregiver &&
      activeDateCaregiver.length &&
      activeDateCaregiver[0]
    ) {
      let now = moment().format(dbAcceptableFormat);
      let input = moment(activeDateCaregiver[0]).format(dbAcceptableFormat);
      dateCondition = now <= input;
    }

    // Date condition to not display fsn if date is before today
    let isBeforedate = false;
    if (
      selectedCells &&
      selectedCells.length &&
      selectedCells[0] &&
      selectedCells[0].item &&
      selectedCells[0].item.date
    ) {
      isBeforedate = moment(selectedCells[0].item.date).isBefore();
    }
    let isAvailability: boolean = false,
      isMatching: boolean = false,
      isContract: boolean = false,
      isConfirm: boolean = false,
      isContractInitiated: boolean = false,
      isInvoiceInitiated: boolean = false,
      isSingleButtonAccepted: boolean = false,
      isContractCancel: boolean = false,
      isTimeSheetPending: boolean = false,
      isBeforeDate: boolean = false;

    if (item || status) {
      if (
        (item &&
          item.status === "default" &&
          (item.f !== "block" || item.s !== "block" || item.n !== "block")) ||
        (status === "default" &&
          item &&
          (item.f !== "block" || item.s !== "block" || item.n !== "block"))
      ) {
        if (
          (item && item.status === "default" && isBeforedate) ||
          (status === "default" && isBeforedate)
        ) {
          isAvailability = false;
          isBeforeDate = true;
        } else {
          isAvailability = true;
          isBeforeDate = false;
        }
      } else if ((item && item.status === "linked") || status === "linked") {
        isMatching = true;
      } else if (
        (item && item.status === "contract") ||
        status === "contract"
      ) {
        isContract = true;
      } else if (
        (item && item.status === "confirmed") ||
        status === "confirmed"
      ) {
        isConfirm = true;
      } else if (
        (item && item.status === "contractCancelled") ||
        status === "contractCancelled"
      ) {
        isContractCancel = true;
      } else if (
        (item && item.status === "accepted") ||
        status === "accepted"
      ) {
        isSingleButtonAccepted = true;
      } else if (
        (item && item.status === "contractInitiated") ||
        status === "contractInitiated"
      ) {
        isContractInitiated = true;
      } else if (
        (item && item.status === "invoiceInitiated") ||
        status === "invoiceInitiated"
      ) {
        isInvoiceInitiated = true;
      } else if (
        (item &&
          (item.status === "timeSheetPending" ||
            item.status === "timeSheetUpdated")) ||
        status === "timeSheetPending" ||
        status === "timeSheetUpdated"
      ) {
        isTimeSheetPending = true;
      }
    }
    return (
      <Formik
        initialValues={valuesForCaregiver}
        onSubmit={this.handleSubmitCaregiverForm}
        enableReinitialize={true}
        validationSchema={CareGiverValidationSchema}
        children={(props: FormikProps<ICaregiverFormValue>) => {
          const {
            touched,
            errors,
            values,
            values: {
              name,
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
              status,
              createdBy,
              createdAt,
              updatedAt,
            },
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = props;
          // Custom function to handle react select fields
          const handleSelect = (
            selectOption: IReactSelectInterface,
            name: string
          ) => {
            console.log("selectOption", selectOption);
            setFieldValue(name, selectOption);
          };
          const handleTravelAllowance = () => {
            let total: any =
              distanceInKM && feePerKM
                ? parseInt(distanceInKM) * parseInt(feePerKM)
                : null;
            setFieldValue("travelAllowance", total);
          };
          console.log("activeDateCaregiver", activeDateCaregiver);
          return (
            <Form>
              <div className='form-section'>
                <div
                  className={classnames({
                    "form-card custom-height custom-scrollbar": true,
                    "availability-dark-bg": isAvailability,
                    "matching-bg": isMatching,
                    "contract-bg": isConfirm,
                    "cancel-contract-bg": isContractCancel,
                    "accepted-bg": isSingleButtonAccepted,
                    "contact-initiate-bg": isContractInitiated,
                    "invoice-bg": isInvoiceInitiated,
                    "confirmation-bg": isTimeSheetPending,
                    "availability-bg": isBeforeDate,
                  })}>
                  <h5 className='content-title'>
                    {languageTranslation("MENU_CAREGIVER")}
                  </h5>
                  {console.log("activeDateCaregiver", activeDateCaregiver)}

                  {/* {idSearchAppointmentLoading && !isCorrespondingAppointment ? (
            <div className='appointment-form-loader'>
              <Loader />
            </div>
          ) : null} */}
                  <Row>
                    {appointmentId ? (
                      <Col lg={"12"}>
                        <FormGroup>
                          <Row>
                            <Col sm='4'>
                              <Label className='form-label col-form-label'>
                                {languageTranslation("APPOINTMENT_ID")}
                              </Label>
                            </Col>
                            <Col sm='8'>
                              <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                <div className='required-input appointment-id-width'>
                                  <Input
                                    type='text'
                                    disabled={true}
                                    name={"appointmentId"}
                                    value={appointmentId ? appointmentId : null}
                                    placeholder={languageTranslation(
                                      "APPOINTMENT_ID"
                                    )}
                                    className='width-common'
                                  />
                                </div>
                                {isLeasingAppointment ? (
                                  <div className='d-flex align-items-center uber-solona whitespace-nowrap mb-1'>
                                    TIMyoCY
                                  </div>
                                ) : (
                                  <div className='d-flex align-items-center uber-solona whitespace-nowrap mb-1'>
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation("NAME")}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <InputGroup>
                                <Input
                                  type='text'
                                  disabled={true}
                                  placeholder={languageTranslation("NAME")}
                                  value={name ? name : ""}
                                />
                                <InputGroupAddon
                                  addonType='append'
                                  className='cursor-pointer'
                                  // onClick={() =>
                                  //   name
                                  //     ? onhandleCaregiverStar(
                                  //         selectedCareGiver ? selectedCareGiver.id : '',
                                  //         false,
                                  //         careGiversListArr &&
                                  //           careGiversListArr.result &&
                                  //           careGiversListArr.result.length
                                  //           ? careGiversListArr.result.findIndex(
                                  //               (cg: any) =>
                                  //                 selectedCareGiver &&
                                  //                 cg.id === selectedCareGiver.id
                                  //             ) < 0
                                  //             ? true
                                  //             : false
                                  //           : false
                                  //       )
                                  //     : ''
                                  // }
                                >
                                  <InputGroupText>
                                    <i
                                      // className={
                                      //   name && starCaregiver && starCaregiver.isStar
                                      //     ? 'fa fa-star theme-text'
                                      //     : 'fa fa-star'
                                      // }
                                      aria-hidden='true'></i>
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation("DATE")}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='text-value one-line-text'>
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
                      <div className='blocked-minheight'></div>
                    ) : (
                      <>
                        <Col lg={"12"}>
                          <FormGroup className='mb-2'>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation("SHIFT")}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div>
                                  <FormGroup check inline>
                                    <div className=' checkbox-custom mb-2'>
                                      <input
                                        type='checkbox'
                                        id='early'
                                        className=''
                                        name={"f"}
                                        checked={f ? true : false}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                          const {
                                            target: { checked },
                                          } = e;
                                          setFieldValue("f", checked);
                                        }}
                                      />
                                      <Label for='early'>
                                        {languageTranslation("EARLY")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <div className=' checkbox-custom mb-2'>
                                      <input
                                        type='checkbox'
                                        id='late'
                                        className=''
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
                                      <Label for='late'>
                                        {languageTranslation("LATE")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <div className=' checkbox-custom mb-3'>
                                      <input
                                        type='checkbox'
                                        id='night'
                                        className=''
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
                                      <Label for='night'>
                                        {languageTranslation("NIGHT")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  {timeSlotError && (
                                    <div className='required-checkbox-error night-allawance-error'>
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
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation("FEE")}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                  <div className='required-input nightfee-input mb-1'>
                                    <InputGroup className='flex-nowrap'>
                                      <Input
                                        type='text'
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
                                      <InputGroupAddon addonType='append'>
                                        <InputGroupText>
                                          <i
                                            className='fa fa-euro'
                                            aria-hidden='true'></i>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      {errors.fee && touched.fee && (
                                        <div className='required-tooltip bottom-tooltip'>
                                          {errors.fee}
                                        </div>
                                      )}
                                    </InputGroup>
                                  </div>
                                  <span
                                    className='d-flex align-items-center edit-remark whitespace-nowrap mb-1'
                                    onClick={() =>
                                      this.handleLastTimeData(
                                        selectedCaregiverId
                                          ? selectedCaregiverId
                                          : "",
                                        values
                                      )
                                    }>
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
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation("NIGHT_FEE")}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='d-flex align-items-center flex-wrap justify-content-between'>
                                  <div className='required-input nightfee-input mb-1'>
                                    <InputGroup className='flex-nowrap'>
                                      <Input
                                        type='text'
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
                                      <InputGroupAddon addonType='append'>
                                        <InputGroupText>
                                          <i
                                            className='fa fa-euro'
                                            aria-hidden='true'></i>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      {errors.nightFee && touched.nightFee && (
                                        <div className='required-tooltip bottom-tooltip'>
                                          {errors.nightFee}
                                        </div>
                                      )}
                                    </InputGroup>
                                  </div>
                                  <div className='flex-grow-1 nightallowance-input mb-1'>
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
                                      classNamePrefix='custom-inner-reactselect'
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
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation("WEEKEND_FEE")}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input nightfee-input'>
                                  <InputGroup>
                                    <Input
                                      type='text'
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
                                    <InputGroupAddon addonType='append'>
                                      <InputGroupText>
                                        <i
                                          className='fa fa-euro'
                                          aria-hidden='true'></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    {errors.weekendAllowance &&
                                      touched.weekendAllowance && (
                                        <div className='required-tooltip bottom-tooltip'>
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
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation("HOLIDAY_FEE")}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input nightfee-input'>
                                  <InputGroup>
                                    <Input
                                      type='text'
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
                                    <InputGroupAddon addonType='append'>
                                      <InputGroupText>
                                        <i
                                          className='fa fa-euro'
                                          aria-hidden='true'></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    {errors.holidayAllowance &&
                                      touched.holidayAllowance && (
                                        <div className='required-tooltip bottom-tooltip'>
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
                          <div className='d-flex align-items-center flex-wrap distance-section'>
                            <FormGroup className='fee-input'>
                              <Label className='form-label col-form-label'>
                                {languageTranslation("FEE_PER_KM")}
                              </Label>

                              <div className='required-input'>
                                <InputGroup>
                                  <Input
                                    type='text'
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
                                    // disabled={
                                    //   item &&
                                    //   (item.f === 'block' ||
                                    //     item.s === 'block' ||
                                    //     item.n === 'block')
                                    // }
                                  />
                                  <InputGroupAddon addonType='append'>
                                    <InputGroupText>km</InputGroupText>
                                  </InputGroupAddon>
                                  {errors.distanceInKM &&
                                    touched.distanceInKM && (
                                      <div className='required-tooltip bottom-tooltip'>
                                        {errors.distanceInKM}
                                      </div>
                                    )}
                                </InputGroup>
                              </div>
                            </FormGroup>
                            <FormGroup className='a-input'>
                              <Label className='form-label col-form-label'>
                                {languageTranslation("a")}
                              </Label>

                              <div className='required-input'>
                                <InputGroup>
                                  <Input
                                    type='text'
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
                                    // disabled={
                                    //   item &&
                                    //   (item.f === 'block' ||
                                    //     item.s === 'block' ||
                                    //     item.n === 'block')
                                    // }
                                  />
                                  <InputGroupAddon addonType='append'>
                                    <InputGroupText>
                                      <i
                                        className='fa fa-euro'
                                        aria-hidden='true'></i>
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  {errors.feePerKM && touched.feePerKM && (
                                    <div className='required-tooltip bottom-tooltip'>
                                      {errors.feePerKM}
                                    </div>
                                  )}
                                </InputGroup>
                              </div>
                            </FormGroup>
                            <FormGroup className='totalbtn-input'>
                              <div className='label-height'></div>

                              <Button
                                className='add-new-btn'
                                color=''
                                onClick={handleTravelAllowance}>
                                <i
                                  className='fa fa-arrow-right'
                                  aria-hidden='true'
                                />
                              </Button>
                            </FormGroup>
                            <FormGroup className='total-input flex-grow-1'>
                              <Label className='form-label col-form-label'>
                                {languageTranslation("TOTAL")}{" "}
                              </Label>
                              <div className='required-input'>
                                <Input
                                  type='text'
                                  disabled={true}
                                  name={"travelAllowance"}
                                  className='width-common'
                                  value={travelAllowance ? travelAllowance : ""}
                                />
                              </div>
                            </FormGroup>
                          </div>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm='4'>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation("EXPENSES")}
                                </Label>
                              </Col>
                              <Col sm='8'>
                                <div className='required-input'>
                                  <Input
                                    type='text'
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
                                      <div className='required-tooltip bottom-tooltip'>
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
                    new Date(activeDateCaregiver[0]) <= new Date() ? (
                      <>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm={"4"}>
                                <Label className='form-label col-form-label'>
                                  {languageTranslation("WORKING_HOURS")}
                                </Label>
                              </Col>
                              <Col sm={"8"}>
                                <div className='required-input'>
                                  <div className='custom-col inner-no-padding-col row'>
                                    <Col sm={"6"}>
                                      <InputGroup className='flex-nowrap position-relative'>
                                        <Field name={"workingHoursFromDate"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={DateMask}
                                              className={
                                                /* workingHoursFromErrMsg &&
                                              workingHoursFromErrMsg !== ''
                                                ? 'text-input error form-control'
                                                : */ "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              // onBlur={() =>
                                              //   workingHourDateValidator(
                                              //     'workingHoursFromDate'
                                              //   )
                                              // }
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

                                        {/* {workingHoursFromErrMsg &&
                                workingHoursFromErrMsg !== '' ? (
                                  <div className='required-tooltip'>
                                    {workingHoursFromErrMsg}
                                  </div>
                                ) : null} */}
                                      </InputGroup>
                                    </Col>
                                    <Col sm={"6"}>
                                      <InputGroup className='flex-nowrap'>
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
                                            <div className='required-tooltip'>
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
                                <div className='required-input'>
                                  <div className='custom-col inner-no-padding-col row'>
                                    <Col sm={"6"}>
                                      <InputGroup className='flex-nowrap'>
                                        <Field name={"workingHoursToDate"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={DateMask}
                                              className={
                                                /*  workingHoursToErrMsg &&
                                              workingHoursToErrMsg !== ''
                                                ? 'text-input error form-control'
                                                :  */ "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              // onBlur={() =>
                                              //   workingHourDateValidator(
                                              //     'workingHoursToDate'
                                              //   )
                                              // }
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
                                        {/* {workingHoursToErrMsg &&
                                workingHoursToErrMsg !== '' ? (
                                  <div className='required-tooltip'>
                                    {workingHoursToErrMsg}
                                  </div>
                                ) : null} */}
                                      </InputGroup>
                                    </Col>
                                    <Col sm={"6"}>
                                      <InputGroup className='flex-nowrap'>
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
                                        {/* {errors.workingHoursToTime ? (
                                  errors.workingHoursToTime &&
                                  touched.workingHoursToTime && (
                                    <div className='required-tooltip'>
                                      {errors.workingHoursToTime}
                                    </div>
                                  )
                                ) : touched.workingHoursToTime &&
                                  workingHoursdifference <= 0 ? (
                                  <div className='required-tooltip'>
                                    {languageTranslation('VALID_TIME_RANGE')}
                                  </div>
                                ) : null} */}
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
                                <Label className='form-label col-form-label'>
                                  {languageTranslation("BREAK")}
                                </Label>
                              </Col>

                              <Col sm={"8"}>
                                <div className='required-input'>
                                  <div className='custom-col inner-no-padding-col row'>
                                    <Col sm={"6"}>
                                      <InputGroup className='flex-nowrap'>
                                        <Field name={"breakFromDate"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={DateMask}
                                              className={
                                                /* breakHoursFromErrMsg &&
                                              breakHoursFromErrMsg !== ''
                                                ? 'text-input error form-control'
                                                :  */ "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              // onBlur={() =>
                                              //   workingHourDateValidator(
                                              //     'breakFromDate'
                                              //   )
                                              // }
                                              placeholder={languageTranslation(
                                                "HOLIDAY_DATE_PLACEHOLDER"
                                              )}
                                              // value={breakFromDate ? breakFromDate : ''}
                                            />
                                          )}
                                        </Field>
                                        {/* {breakHoursFromErrMsg &&
                                breakHoursFromErrMsg !== '' ? (
                                  <div className='required-tooltip'>
                                    {breakHoursFromErrMsg}
                                  </div>
                                ) : null} */}
                                      </InputGroup>
                                    </Col>

                                    <Col sm={"6"}>
                                      <InputGroup className='flex-nowrap'>
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
                                              // onBlur={handleBlur}
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
                                        {/* {errors.breakFromTime &&
                                  touched.breakFromTime && (
                                    <div className='required-tooltip'>
                                      {errors.breakFromTime}
                                    </div>
                                  )} */}
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
                                <div className='required-input'>
                                  <div className='custom-col inner-no-padding-col row'>
                                    <Col sm={"6"}>
                                      <InputGroup className='flex-nowrap'>
                                        <Field name={"breakToDate"}>
                                          {({ field }: any) => (
                                            <MaskedInput
                                              {...field}
                                              mask={DateMask}
                                              className={
                                                /*  breakHoursToErrMsg &&
                                              breakHoursToErrMsg !== ''
                                                ? 'text-input error form-control'
                                                :  */ "text-input form-control"
                                              }
                                              onChange={handleChange}
                                              // onBlur={() =>
                                              //   workingHourDateValidator('breakToDate')
                                              // }
                                              placeholder={languageTranslation(
                                                "HOLIDAY_DATE_PLACEHOLDER"
                                              )}
                                              value={
                                                breakToDate ? breakToDate : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {/* {breakHoursToErrMsg &&
                                breakHoursToErrMsg !== '' ? (
                                  <div className='required-tooltip'>
                                    {breakHoursToErrMsg}
                                  </div>
                                ) : null} */}
                                      </InputGroup>
                                    </Col>
                                    <Col sm={"6"}>
                                      <InputGroup className='flex-nowrap'>
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
                                              // onBlur={handleBlur}
                                              placeholder={languageTranslation(
                                                "TIME_FORMAT"
                                              )}
                                              value={
                                                breakToTime ? breakToTime : ""
                                              }
                                            />
                                          )}
                                        </Field>
                                        {/* {errors.breakToTime ? (
                                  errors.breakToTime &&
                                  touched.breakToTime && (
                                    <div className='required-tooltip'>
                                      {errors.breakToTime}
                                    </div>
                                  )
                                ) : touched.breakToTime &&
                                  breakdifference <= 0 ? (
                                  <div className='required-tooltip'>
                                    {languageTranslation('VALID_TIME_RANGE')}
                                  </div>
                                ) : null} */}
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation("WORKING_PROOF_NECESSARY")}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input mb-1'>
                              <FormGroup check inline>
                                <div className=' checkbox-custom mb-0'>
                                  <input
                                    type='checkbox'
                                    id='workingProofSubmitted'
                                    className=''
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
                                  <Label for='workingProofSubmitted'></Label>
                                </div>
                              </FormGroup>
                            </div>

                            {/* { getWorkProofPDF &&
                      finalWorkProofPDF ? (
                      <a
                        href={`${AppConfig.FILES_ENDPOINT}${finalWorkProofPDF}`}
                        target={'_blank'}
                        className='view-more-link text-underline'
                      >
                        <i className='fa fa-file-o mr-2' />
                        {languageTranslation('WORK_PROOF')}
                      </a>
                    ) : null} */}
                            <br />

                            {/* {document &&
                    leasingContract &&
                    leasingContract.length &&
                    leasingContract[0] &&
                    leasingContract[0].avabilityId === appointmentId ? (
                      <a
                        href={`${AppConfig.FILES_ENDPOINT}${document}`}
                        target={'_blank'}
                        className='view-more-link text-underline'
                      >
                        <i className='fa fa-file-o mr-2' />
                        {languageTranslation('CONTRACT')}
                      </a>
                    ) : getContractByAppointmentID &&
                      getContractByAppointmentID.length &&
                      selfEmploymentcontract ? (
                      // && selectedCells && selectedCells.length && selectedCells[0].item && selectedCells[0].item.appointments && selectedCells[0].item.appointments.length && selectedCells[0].item.appointments[0] && contractApptmentIds.includes(selectedCells[0].item.appointments[0].id
                      // )
                      <a
                        href={`${AppConfig.FILES_ENDPOINT}${selfEmploymentcontract}`}
                        target={'_blank'}
                        className='view-more-link text-underline'
                      >
                        <i className='fa fa-file-o mr-2' />
                        {languageTranslation('CONTRACT')}
                      </a>
                    ) : null} */}
                            <br />

                            {/* { getInvoiceByAppointmentId &&
                      getInvoiceByAppointmentId.length &&
                      finalInvoicePDF ? (
                      <a
                        href={`${AppConfig.FILES_ENDPOINT}/${finalInvoicePDF}`}
                        target={'_blank'}
                        className='view-more-link text-underline'
                      >
                        <i className='fa fa-file-o mr-2' />
                        {languageTranslation('INVOICE')}
                      </a>
                    ) : null} */}
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>

                    <Col lg={"12"}>
                      <FormGroup>
                        <Row>
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation(
                                "REMARKS_VISIBLE_FOR_CAREGIVER"
                              )}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <Input
                                className='textarea-custom form-control'
                                rows='3'
                                type='textarea'
                                name='remarksCareGiver'
                                value={remarksCareGiver ? remarksCareGiver : ""}
                                onChange={handleChange}
                                id='exampleText1'
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
                          <Col sm='4'>
                            <Label className='form-label col-form-label'>
                              {languageTranslation(
                                "REMARKS_VISIBLE_INTERNALLY"
                              )}
                            </Label>
                          </Col>
                          <Col sm='8'>
                            <div className='required-input'>
                              <Input
                                className='textarea-custom form-control'
                                rows='3'
                                type='textarea'
                                name='remarksInternal'
                                value={remarksInternal ? remarksInternal : ""}
                                onChange={handleChange}
                                maxLength={255}
                                id='exampleText2'
                              />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>

                    {createdBy ? (
                      <Col lg={"12"} className='mb-2 text-right text-muted'>
                        <i>
                          {`${languageTranslation("CREATED_BY")} ${
                            createdBy ? createdBy : ""
                          }`}
                        </i>
                      </Col>
                    ) : null}
                    {createdAt ? (
                      <Col lg={"12"} className='mb-2 text-right text-muted'>
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
                      <Col lg={"12"} className='mb-2 text-right text-muted'>
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
                      <div className='d-flex align-items-center justify-content-between'>
                        <Button
                          className='btn-save'
                          color='danger'
                          onClick={() =>
                            onhandleDelete("caregiver", appointmentId)
                          }
                          disabled={!appointmentId}>
                          {languageTranslation("DELETE")}
                        </Button>
                        <Button
                          className='btn-save'
                          color='primary'
                          onClick={handleSubmit}
                          disabled={
                            addCaregiverLoading
                            // ? true : appointmentId ? false : !dateCondition ? true : false
                          }>
                          {addCaregiverLoading ? (
                            <i className='fa fa-spinner fa-spin mr-2' />
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
                {/* )} */}
              </div>
            </Form>
          );
        }}
      />
    );
  }
}
export default React.memo(CaregiverFormView);
