import React, { FunctionComponent, useState, useEffect } from "react";
import Select from "react-select";
import { FormikProps, Field } from "formik";
import moment from "moment";
import classnames from "classnames";
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
  dateValidator,
  dateValidatorNorm,
} from "../../../../../helpers";
import {
  NightAllowancePerHour,
  defaultDateFormat,
  appointmentDayFormat,
  dbAcceptableFormat,
  AppConfig,
  DateTimeMask,
  DateMask,
  TimeMask,
} from "../../../../../config";
import "../index.scss";
import {
  LeasingContractQueries,
  AppointmentsQueries,
} from "../../../../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import MaskedInput from "react-text-mask";
import Loader from "../../../containers/Loader/Loader";

const [GET_LEASING_CONTRACT] = LeasingContractQueries;
const [, , , , , , , GET_CONTRACT_BY_APPOINTMENT_ID] = AppointmentsQueries;
const CaregiverFormView: FunctionComponent<
  FormikProps<ICaregiverFormValue> & IAppointmentCareGiverForm & any
> = (
  props: FormikProps<ICaregiverFormValue> & IAppointmentCareGiverForm & any
) => {
  const { addCaregiverLoading } = props;
  // Query to get uploaded pdf
  const [getLeasingContractPDF, { data: pdfData, loading }] = useLazyQuery<any>(
    GET_LEASING_CONTRACT
  );
  // query to get contract pdf
  const [getContractPDF, { data: contractData }] = useLazyQuery<any>(
    GET_CONTRACT_BY_APPOINTMENT_ID
  );
  //For saving both
  useEffect(() => {
    if (props.savingBoth) {
      handleSubmit();
    }
  }, [props.savingBoth]);

  //For Seting false for saving both on error handling
  useEffect(() => {
    if (props.errors) {
      props.setsavingBoth();
    }
  }, [props.errors]);

  const {
    values: {
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
    },
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    selectedCareGiver,
    activeDateCaregiver,
    timeSlotError,
    selctedAvailability,
    onhandleDelete,
    careGiversListArr,
    handleSelectUserList,
    handleLastTimeData,
    selectedCells,
    onhandleCaregiverStar,
    starMarkCaregiver,
    dateString,
    setworkingHoursFromErrMsg,
    workingHoursFromErrMsg,
    setworkingHoursToErrMsg,
    workingHoursToErrMsg,
    setbreakHoursToErrMsg,
    breakHoursToErrMsg,
    setbreakHoursFromErrMsg,
    breakHoursFromErrMsg,
    starCaregiver,
    idSearchAppointmentLoading,
    selectedCellsCareinstitution,
  } = props;

  let dateData =
    activeDateCaregiver && activeDateCaregiver.length
      ? moment(activeDateCaregiver[0]).format(defaultDateFormat)
      : null;

  // Find difference in workingHours time
  let d = moment().format("L");
  let dtStart: any = new Date(d + " " + workingHoursFromTime);
  let dtEnd: any = new Date(d + " " + workingHoursToTime);
  let workingHoursdifference = dtEnd - dtStart;

  // Find difference in break time
  let dt = moment().format("L");
  let dtStart1: any = new Date(dt + " " + breakFromTime);
  let dtEnd1: any = new Date(dt + " " + breakToTime);
  let breakdifference = dtEnd1 - dtStart1;
  // console.log("workingHoursFromDate",sub);

  let current = moment().format(defaultDateFormat);

  // Find difference in workingHours date

  const workingHourDateValidator = (name: string) => {
    let validate: boolean = false;
    if (name === "workingHoursFromDate") {
      validate = dateDiffernceValidator(
        dateData,
        current,
        workingHoursFromDate,
        name
      );
      if (!validate) {
        setworkingHoursFromErrMsg(
          languageTranslation("DATE_VALIDATION_MESSAGE")
        );
      } else {
        let validDateData = dateValidatorNorm(workingHoursFromDate);
        if (!validDateData.isValid) {
          setworkingHoursFromErrMsg(validDateData.message);
        } else {
          setworkingHoursFromErrMsg("");
        }
      }
    } else if (name === "workingHoursToDate") {
      validate = dateDiffernceValidator(
        workingHoursFromDate,
        current,
        workingHoursToDate,
        name
      );
      if (!validate) {
        setworkingHoursToErrMsg(languageTranslation("DATE_VALIDATION_MESSAGE"));
      } else {
        let validDateData = dateValidatorNorm(workingHoursToDate);
        if (!validDateData.isValid) {
          setworkingHoursToErrMsg(validDateData.message);
        } else {
          setworkingHoursToErrMsg("");
        }
      }
    } else if (name === "breakFromDate") {
      validate = dateDiffernceValidator(dateData, current, breakFromDate, name);
      if (!validate) {
        setbreakHoursFromErrMsg(languageTranslation("DATE_VALIDATION_MESSAGE"));
      } else {
        let validDateData = dateValidatorNorm(breakFromDate);
        if (!validDateData.isValid) {
          setbreakHoursFromErrMsg(validDateData.message);
        } else {
          setbreakHoursFromErrMsg("");
        }
      }
    } else if (name === "breakToDate") {
      validate = dateDiffernceValidator(
        breakFromDate,
        current,
        breakToDate,
        name
      );
      if (!validate) {
        setbreakHoursToErrMsg(languageTranslation("DATE_VALIDATION_MESSAGE"));
      } else {
        let validDateData = dateValidatorNorm(breakToDate);
        if (!validDateData.isValid) {
          setbreakHoursToErrMsg(validDateData.message);
        } else {
          setbreakHoursToErrMsg("");
        }
      }
    }
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
    console.log("isAppointment", isAppointment);
  }
  useEffect(() => {
    if (isLeasingAppointment) {
      const { id = "", item = {} } = selectedCells[0] ? selectedCells[0] : {};
      const { appointments = [] } = item ? item : {};
      const { avabilityId = "", id: appointmentId = "" } =
        appointments && appointments.length && appointments[0]
          ? appointments[0]
          : {};
      getLeasingContractPDF({
        variables: {
          userId: parseInt(id),
          availabilityId: [parseInt(avabilityId)],
          appointmentId: [parseInt(appointmentId)],
          documentUploadType: "leasingContract",
        },
      });
      return
    }
    if (isAppointment) {
      console.log("inside pdf form");

      // To get signed contract in case of booked appointment
      const { item = {} } = selectedCells[0] ? selectedCells[0] : {};
      const { appointments = [] } = item ? item : {};
      const { id: appointmentId = "" } =
        appointments && appointments.length && appointments[0]
          ? appointments[0]
          : {};
      getContractPDF({
        variables: {
          appointmentId: appointmentId,
          // appointments && appointments[0] ? appointments[0].id : null,
        },
      });
      console.log("contractData@@@@@@@@@@@@@@@@@", contractData);
    }
  }, [selectedCells]);

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    setFieldValue(name, selectOption);
  };

  let isAvailability: boolean = false,
    isMatching: boolean = false,
    isContract: boolean = false,
    isConfirm: boolean = false,
    isContractInitiated: boolean = false,
    isSingleButtonAccepted: boolean = false,
    isContractCancel: boolean = false;

  if (selctedAvailability || status) {
    if (
      (selctedAvailability &&
        selctedAvailability.status === "default" &&
        (selctedAvailability.f !== "block" ||
          selctedAvailability.s !== "block" ||
          selctedAvailability.n !== "block")) ||
      (status === "default" &&
        selctedAvailability &&
        (selctedAvailability.f !== "block" ||
          selctedAvailability.s !== "block" ||
          selctedAvailability.n !== "block"))
    ) {
      isAvailability = true;
    } else if (
      (selctedAvailability && selctedAvailability.status === "linked") ||
      status === "linked"
    ) {
      isMatching = true;
    } else if (
      (selctedAvailability && selctedAvailability.status === "contract") ||
      status === "contract"
    ) {
      isContract = true;
    } else if (
      (selctedAvailability &&
        (selctedAvailability.status === "confirmed" ||
          selctedAvailability.status === "timeSheetUpdated")) ||
      status === "confirmed" ||
      status === "timeSheetUpdated"
    ) {
      isConfirm = true;
    } else if (
      (selctedAvailability &&
        selctedAvailability.status === "contractcancelled") ||
      status === "contractcancelled"
    ) {
      isContractCancel = true;
    } else if (
      (selctedAvailability && selctedAvailability.status === "accepted") ||
      status === "accepted"
    ) {
      isSingleButtonAccepted = true;
    } else if (
      (selctedAvailability &&
        selctedAvailability.status === "contractInitiated") ||
      status === "contractInitiated"
    ) {
      isContractInitiated = true;
    }
  }

  const handleTravelAllowance = () => {
    let total = distanceInKM * feePerKM;
    setFieldValue("travelAllowance", total);
  };

  const handleUserList = (id: string, name: string) => {
    let data: any =
      careGiversListArr && careGiversListArr.result
        ? careGiversListArr.result
        : {};
    if (id) {
      data = careGiversListArr.result.filter((x: any) => x.id === id)[0];
      onhandleCaregiverStar(data, name);
    }
    // else if(!starMark){
    //   onhandleCaregiverStar(data, name);
    // }
  };

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

  // Signed contract link
  const { getLeasingContractPDF: pdfDetails = [] } = pdfData ? pdfData : {};
  const { document = "", leasingContract = {} } =
    pdfDetails && pdfDetails.length ? pdfDetails[0] : {};

  // signed self employmentt contract
  const { getContractByAppointmentID = [] } = contractData ? contractData : {};
  const { user_document = {},appointmentId:contractApptmentIds=[] } =
    getContractByAppointmentID && getContractByAppointmentID.length
      ? getContractByAppointmentID[0]
      : [];
  const { document: selfEmploymentcontract = "" } = user_document
    ? user_document
    : {};
  console.log("selfEmploymentcontract", selfEmploymentcontract);

  let isCorrespondingAppointment: boolean = false;
  if (
    selectedCells &&
    selectedCells.length &&
    selectedCells[0] &&
    selectedCells[0].item &&
    selectedCells[0].item.appointments &&
    selectedCells[0].item.appointments.length
  ) {
    if (selectedCells[0].item.appointments[0].avabilityId === appointmentId) {
      isCorrespondingAppointment = true;
    }
  }

  console.log(selectedCells,'selectedCells in form');
  
  return (
    <>
      <div className="form-section">
        {/* {idSearchAppointmentLoading ? (
          <Loader />
        ) : ( */}
        <div
          className={classnames({
            "form-card custom-height custom-scrollbar": true,
            "availability-dark-bg": isAvailability,
            "matching-bg": isMatching,
            "confirmation-bg": isConfirm,
            "cancel-contract-bg": isContractCancel,
            "accepted-bg": isSingleButtonAccepted,
            "contact-initiate-bg": isContractInitiated,
          })}
        >
          <h5 className="content-title">
            {languageTranslation("MENU_CAREGIVER")}
          </h5>
          {idSearchAppointmentLoading && !isCorrespondingAppointment ? (
            <div className="appointment-form-loader">
              <Loader />
            </div>
          ) : null}
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
                            value={appointmentId ? appointmentId : null}
                            placeholder={languageTranslation("APPOINTMENT_ID")}
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
                          value={name ? name : ""}
                        />
                        <InputGroupAddon
                          addonType="append"
                          className="cursor-pointer"
                          onClick={() =>
                            name
                              ? onhandleCaregiverStar(
                                  selectedCareGiver ? selectedCareGiver.id : "",
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
                              : // handleUserList(
                                //   selectedCareGiver ? selectedCareGiver.id : '',
                                //   'caregiver'
                                // )
                                ""
                          }
                          // onClick={() =>
                          //   name
                          //     ? handleUserList(
                          //         selectedCareGiver ? selectedCareGiver.id : '',
                          //         'caregiver'
                          //       )
                          //     : ''
                          // }
                        >
                          <InputGroupText>
                            <i
                              className={
                                name && starCaregiver && starCaregiver.isStar
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
                      {activeDateCaregiver
                        ? activeDateCaregiver
                            .map(
                              (dateString: string | undefined, index: number) =>
                                dateString
                                  ? moment(dateString).format(
                                      index !== activeDateCaregiver.length - 1
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

            {selctedAvailability &&
            (selctedAvailability.f === "block" ||
              selctedAvailability.s === "block" ||
              selctedAvailability.n === "block") ? (
              <div className="blocked-minheight"></div>
            ) : (
              <>
                <Col lg={"12"}>
                  <FormGroup>
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
                            <div className=" checkbox-custom mb-2">
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
                                selectedCareGiver ? selectedCareGiver.id : "",
                                props.values
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
                              value={weekendAllowance ? weekendAllowance : ""}
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
                              value={holidayAllowance ? holidayAllowance : ""}
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
                            placeholder={languageTranslation("FEE_PER_KM")}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.distanceInKM && touched.distanceInKM
                                ? "fee-width error"
                                : "fee-width"
                            }
                            disabled={
                              selctedAvailability &&
                              (selctedAvailability.f === "block" ||
                                selctedAvailability.s === "block" ||
                                selctedAvailability.n === "block")
                            }
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>km</InputGroupText>
                          </InputGroupAddon>
                          {errors.distanceInKM && touched.distanceInKM && (
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
                              selctedAvailability &&
                              (selctedAvailability.f === "block" ||
                                selctedAvailability.s === "block" ||
                                selctedAvailability.n === "block")
                            }
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <i className="fa fa-euro" aria-hidden="true"></i>
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
                        <i className="fa fa-arrow-right" aria-hidden="true" />
                      </Button>
                    </FormGroup>
                    <FormGroup className="total-input flex-grow-1">
                      <Label className="form-label col-form-label">Total</Label>
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
                            placeholder={languageTranslation("EXPENSES")}
                            className={
                              errors.otherExpenses && touched.otherExpenses
                                ? "width-common error"
                                : "width-common"
                            }
                          />
                          {errors.otherExpenses && touched.otherExpenses && (
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
            {selctedAvailability &&
            (selctedAvailability.status === "confirmed" ||
              selctedAvailability.status === "timeSheetUpdated") &&
            new Date(activeDateCaregiver[0]) <= new Date() ? (
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
                                        workingHourDateValidator(
                                          "workingHoursFromDate"
                                        )
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
                                {workingHoursFromErrMsg &&
                                workingHoursFromErrMsg !== "" ? (
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
                                      onBlur={() =>
                                        workingHourDateValidator(
                                          "workingHoursToDate"
                                        )
                                      }
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
                                {workingHoursToErrMsg &&
                                workingHoursToErrMsg !== "" ? (
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
                                  workingHoursdifference <= 0 ? (
                                  <div className="required-tooltip">
                                    {languageTranslation("VALID_TIME_RANGE")}
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
                                        workingHourDateValidator(
                                          "breakFromDate"
                                        )
                                      }
                                      placeholder={languageTranslation(
                                        "HOLIDAY_DATE_PLACEHOLDER"
                                      )}
                                      value={breakFromDate ? breakFromDate : ""}
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
                                      value={breakFromTime ? breakFromTime : ""}
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
                                        workingHourDateValidator("breakToDate")
                                      }
                                      placeholder={languageTranslation(
                                        "HOLIDAY_DATE_PLACEHOLDER"
                                      )}
                                      value={breakToDate ? breakToDate : ""}
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
                                      value={breakToTime ? breakToTime : ""}
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
                                ) : touched.breakToTime &&
                                  breakdifference <= 0 ? (
                                  <div className="required-tooltip">
                                    {languageTranslation("VALID_TIME_RANGE")}
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
                            id="workingProofRecieved"
                            className=""
                            name={"workingProofRecieved"}
                            checked={workingProofRecieved}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const {
                                target: { checked },
                              } = e;
                              setFieldValue("workingProofRecieved", checked);
                            }}
                          />
                          <Label for="workingProofRecieved"></Label>
                        </div>
                      </FormGroup>
                    </div>
                    {console.log(
                      "${AppConfig.FILES_ENDPOINT}${selfEmploymentcontract}",
                      `${AppConfig.FILES_ENDPOINT}/${selfEmploymentcontract}`
                    )}
                    {document && leasingContract && leasingContract.length && leasingContract[0] && leasingContract[0].avabilityId === appointmentId ? (
                      <a
                        href={`${AppConfig.FILES_ENDPOINT}${document}`}
                        target={"_blank"}
                        className="view-more-link text-underline"
                      >
                        <i className="fa fa-file-o mr-2" />
                        {languageTranslation("CONTRACT")}
                      </a>
                    ) : getContractByAppointmentID &&
                      getContractByAppointmentID.length &&
                      selfEmploymentcontract 
                      // && selectedCells && selectedCells.length && selectedCells[0].item && selectedCells[0].item.appointments && selectedCells[0].item.appointments.length && selectedCells[0].item.appointments[0] && contractApptmentIds.includes(selectedCells[0].item.appointments[0].id
                        // ) 
                      ? (
                      <a
                        href={`${AppConfig.FILES_ENDPOINT}${selfEmploymentcontract}`}
                        target={"_blank"}
                        className="view-more-link text-underline"
                      >
                        <i className="fa fa-file-o mr-2" />
                        {languageTranslation("CONTRACT")}
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
                      {languageTranslation("REMARKS_VISIBLE_FOR_CAREGIVER")}
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
                      {languageTranslation("REMARKS_VISIBLE_INTERNALLY")}
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
            <Col lg={"12"}>
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  className="btn-save"
                  color="danger"
                  onClick={() => onhandleDelete("caregiver", appointmentId)}
                  disabled={!appointmentId}
                >
                  {languageTranslation("DELETE")}
                </Button>
                <Button
                  className="btn-save"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={
                    addCaregiverLoading
                    // ? true : appointmentId ? false : !dateCondition ? true : false
                  }
                >
                  {addCaregiverLoading ? (
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
        {/* )} */}
      </div>
    </>
  );
};

export default CaregiverFormView;
