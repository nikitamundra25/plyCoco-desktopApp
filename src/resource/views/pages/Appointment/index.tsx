import React, {
  Component,
  FunctionComponent,
  useEffect,
  useState
} from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import MaskedInput from "react-text-mask";

import Select from "react-select";
import { languageTranslation, getDaysArrayByMonth } from "../../../../helpers";
import {
  State,
  NightAllowancePerHour,
  Without_Appointments,
  ShiftTime
} from "../../../../config";

import "./index.scss";
import AppointmentNav from "./AppointmentNav";
import CaregiverListView from "./Caregiver/CaregiverListView";
import CarinstituionListView from "./Careinstituion/CareinstituionListView";
import {
  IGetDaysArrayByMonthRes,
  IQualifications,
  IReactSelectInterface
} from "../../../../interfaces";
import moment from "moment";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  GET_QUALIFICATION_ATTRIBUTE,
  AppointmentsQueries
} from "../../../../graphql/queries";
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const Appointment: FunctionComponent = () => {
  const [daysData, setDaysData] = useState<IGetDaysArrayByMonthRes | null>(
    null
  );
  const [activeMonth, setActiveMonth] = useState<number>(moment().month());
  const [activeYear, setActiveYear] = useState<number>(moment().year());
  const [qualification, setqualification] = useState<any>([]);
  // const [activeDate, setActiveDate] = useState<string>('');

  // To fetch caregivers by qualification id
  const [
    fetchCaregiverList,
    { data: careGiversList, loading: caregiverLoading }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: "no-cache"
  });

  // To fetch careinstitution by qualification id
  const [
    fetchCareinstitutionList,
    { data: careInstitutionList, loading: careinstitutionLoading }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: "no-cache"
  });

  // To fetch qualification attributes list
  const { data } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTE);
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (data && data.getQualifications) {
    data.getQualifications.forEach((quali: any) => {
      qualificationList.push({
        label: quali.name,
        value: quali.id
      });
    });
  }

  // Select qualification attribute
  const handleQualification = (selectedOption: IReactSelectInterface[]) => {
    setqualification(selectedOption);
  };

  // To fetch users according to qualification selected
  useEffect(() => {
    let temp: any = [];
    qualification.map((key: any, index: number) => {
      temp.push(parseInt(key.value));
    });
    // get careGivers list
    fetchCaregiverList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: "caregiver"
      }
    });
    // get careInstitution list
    fetchCareinstitutionList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: "canstitution"
      }
    });
  }, [qualification]);

  // set careGivers list options
  const careGiversOptions: IReactSelectInterface[] | undefined = [];
  if (careGiversList && careGiversList.getUserByQualifications) {
    const { getUserByQualifications } = careGiversList;
    if (getUserByQualifications && getUserByQualifications.length) {
      getUserByQualifications.map((list: any) => {
        return careGiversOptions.push({
          label: `${list.firstName} ${list.lastName} `,
          value: list.id ? list.id : ""
        });
      });
    }
  }

  // set careInstitution list options
  const careInstitutionOptions: IReactSelectInterface[] | undefined = [];
  if (careInstitutionList && careInstitutionList.getUserByQualifications) {
    const { getUserByQualifications } = careInstitutionList;
    if (getUserByQualifications && getUserByQualifications.length) {
      getUserByQualifications.map((list: any) => {
        return careInstitutionOptions.push({
          label: `${list.firstName} ${list.lastName} `,
          value: list.id ? list.id : ""
        });
      });
    }
  }
  // To set initial month and year
  useEffect(() => {
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(
      moment().month(),
      moment().year()
    );
    setDaysData(res);
  }, []);

  // On previous month click
  const handlePrevious = () => {
    let month: number = activeMonth - 1;
    let year: number = activeYear;

    // To check if active month is january than set month to december & year to previous year
    if (activeMonth === 0) {
      month = 11;
      year = activeYear - 1;
    }
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    setActiveMonth(month);
    setActiveYear(year);
    setDaysData(res);
  };

  // On next month click
  const handleNext = () => {
    let month: number = activeMonth + 1;
    let year: number = activeYear;
    // To check if active month is december than set month to january & year to next year
    if (activeMonth === 11) {
      month = 0;
      year = activeYear + 1;
    }
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    setActiveMonth(month);
    setActiveYear(year);
    setDaysData(res);
  };

  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <AppointmentNav
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            daysData={daysData}
            qualificationList={qualificationList}
            handleQualification={handleQualification}
            careInstitutionList={careInstitutionOptions}
            careGiversList={careGiversOptions}
          />

          <div className="common-content flex-grow-1">
            <div>
              <Row>
                <Col lg={"6"}>
                  <CaregiverListView
                    daysData={daysData}
                    loading={caregiverLoading}
                    careGiversList={
                      careGiversList
                        ? careGiversList &&
                          careGiversList.getUserByQualifications
                        : []
                    }
                  />
                  <CarinstituionListView
                    daysData={daysData}
                    loading={careinstitutionLoading}
                    careInstitutionList={
                      careInstitutionList
                        ? careInstitutionList &&
                          careInstitutionList.getUserByQualifications
                        : []
                    }
                  />
                </Col>
                <Col lg={"3"} className="px-lg-0">
                  <div>
                    <h5 className="content-title">
                      {languageTranslation("MENU_CAREGIVER")}
                    </h5>
                  </div>
                  <div className="form-section">
                    <div className="form-card custom-height custom-scrollbar">
                      <Row>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("APPOINTMENT_ID")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    type="text"
                                    placeholder={languageTranslation(
                                      "APPOINTMENT_ID"
                                    )}
                                    className="width-common"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("NAME")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation("NAME")}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-star"
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("DATE")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <MaskedInput
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                                    )}
                                    className={"form-control mb-2"}
                                  />
                                </div>

                                <div>
                                  <FormGroup check inline>
                                    <div className=" checkbox-custom mb-1">
                                      <input
                                        type="checkbox"
                                        id="check"
                                        className=""
                                        name={"early"}
                                        checked
                                      />
                                      <Label for="check">
                                        {languageTranslation("EARLY")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <div className=" checkbox-custom mb-1">
                                      <input
                                        type="checkbox"
                                        id="check1"
                                        className=""
                                        name={"late"}
                                      />
                                      <Label for="check1">
                                        {languageTranslation("LATE")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <div className=" checkbox-custom mb-1">
                                      <input
                                        type="checkbox"
                                        id="check2"
                                        className=""
                                        name={"night"}
                                      />
                                      <Label for="check2">
                                        {languageTranslation("NIGHT")}
                                      </Label>
                                    </div>
                                  </FormGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("FEE")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation("FEE")}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("NIGHT_FEE")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation(
                                        "NIGHT_FEE"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("WEEKEND_FEE")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation(
                                        "WEEKEND_FEE"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("HOLIDAY_FEE")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation(
                                        "HOLIDAY_FEE"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
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
                        <Col sm={"12"} lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm={"5"}>
                                <Label className="form-label col-form-label">
                                  {languageTranslation("NIGHT_ALLOWANCE")}
                                </Label>
                              </Col>
                              <Col sm={"7"}>
                                <div>
                                  <Select
                                    placeholder={languageTranslation(
                                      "NIGHT_ALLOWANCE"
                                    )}
                                    options={NightAllowancePerHour}
                                    classNamePrefix="custom-inner-reactselect"
                                    className={"custom-reactselect"}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("FEE_PER_KM")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation(
                                        "FEE_PER_KM"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>km</InputGroupText>
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("a")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      placeholder={languageTranslation("a")}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-euro"
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("EXPENSES")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    type="text"
                                    placeholder={languageTranslation(
                                      "EXPENSES"
                                    )}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm={"5"}>
                                <Label className="form-label col-form-label">
                                  {languageTranslation("WORKING_HOURS")}
                                </Label>
                              </Col>

                              <Col sm={"7"}>
                                <div className="required-input">
                                  <div className="custom-col inner-no-padding-col row">
                                    <Col sm={"6"}>
                                      <div>
                                        <Select
                                          classNamePrefix="custom-inner-reactselect"
                                          className={
                                            "custom-reactselect custom-reactselect-menu-width"
                                          }
                                          placeholder=""
                                          options={State}
                                        />
                                      </div>
                                    </Col>
                                    <Col sm={"6"}>
                                      <div>
                                        <Select
                                          classNamePrefix="custom-inner-reactselect"
                                          className={
                                            "custom-reactselect custom-reactselect-menu-width"
                                          }
                                          placeholder=""
                                          options={State}
                                        />
                                      </div>
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
                              <Col sm={"5"}>
                                <Label className="form-label col-form-label">
                                  {languageTranslation("BREAK")}
                                </Label>
                              </Col>

                              <Col sm={"7"}>
                                <div className="required-input">
                                  <div className="custom-col inner-no-padding-col row">
                                    <Col sm={"6"}>
                                      <div>
                                        <Select
                                          classNamePrefix="custom-inner-reactselect"
                                          className={
                                            "custom-reactselect custom-reactselect-menu-width"
                                          }
                                          placeholder=""
                                          options={State}
                                        />
                                      </div>
                                    </Col>
                                    <Col sm={"6"}>
                                      <div>
                                        <Select
                                          classNamePrefix="custom-inner-reactselect"
                                          className={
                                            "custom-reactselect custom-reactselect-menu-width"
                                          }
                                          placeholder=""
                                          options={State}
                                        />
                                      </div>
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "WORKING_PROOF_NECESSARY"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <FormGroup check inline>
                                    <div className=" checkbox-custom mb-0">
                                      <input
                                        type="checkbox"
                                        id="check1"
                                        className=""
                                        name={""}
                                      />
                                      <Label for="check1"></Label>
                                    </div>
                                  </FormGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "REMARKS_VISIBLE_FOR_CAREGIVER"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    className="textarea-custom form-control"
                                    rows="3"
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "REMARKS_VISIBLE_INTERNALLY"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    className="textarea-custom form-control"
                                    rows="3"
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <div className="d-flex align-items-center justify-content-between">
                            <Button className="btn-save" color="danger">
                              {languageTranslation("DELETE")}
                            </Button>
                            <Button className="btn-save" color="primary">
                              {languageTranslation("SAVE_BUTTON")}
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col lg={"3"}>
                  <div>
                    <h5 className="content-title">
                      {languageTranslation("MENU_INSTITUTION")}
                    </h5>
                  </div>
                  <div className="form-section ">
                    <div className="form-card custom-height custom-scrollbar">
                      <Row>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("APPOINTMENT_ID")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    type="text"
                                    name={"id"}
                                    placeholder={languageTranslation(
                                      "APPOINTMENT_ID"
                                    )}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("NAME")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      name={"id"}
                                      placeholder={languageTranslation("NAME")}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>
                                        <i
                                          className="fa fa-star"
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("DATE")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <MaskedInput
                                    placeholder={languageTranslation(
                                      "EMPLOYEE_JOINING_DATE_PLACEHOLDER"
                                    )}
                                    className={"form-control "}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col sm={"12"} lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm={"5"}>
                                <Label className="form-label col-form-label">
                                  {languageTranslation("SHIFT")}
                                </Label>
                              </Col>
                              <Col sm={"7"}>
                                <div>
                                  <Select
                                    placeholder="Select"
                                    options={ShiftTime}
                                    classNamePrefix="custom-inner-reactselect"
                                    className={"custom-reactselect"}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("START_WORKING")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      name={"id"}
                                      placeholder={languageTranslation(
                                        "START_WORKING"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>Uhr</InputGroupText>
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("END_WORKING")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      name={"id"}
                                      placeholder={languageTranslation(
                                        "END_WORKING"
                                      )}
                                    />
                                    <InputGroupAddon addonType="append">
                                      <InputGroupText>Uhr</InputGroupText>
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("QUALIFICATION")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Select
                                    placeholder="Select Qualifications"
                                    options={State}
                                    classNamePrefix="custom-inner-reactselect"
                                    className={"custom-reactselect"}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "QUALIFICATION_FOR_BILLING"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <div className="required-input">
                                    <Select
                                      placeholder="Select Qualifications"
                                      options={State}
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
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("DEPARTMENT")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Select
                                    placeholder="Select Qualifications"
                                    options={State}
                                    classNamePrefix="custom-inner-reactselect"
                                    className={"custom-reactselect"}
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>

                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("ADDRESS")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    type="text"
                                    name={"id"}
                                    placeholder={languageTranslation("ADDRESS")}
                                    className="width-common"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("CONTACT_PERSON")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    type="text"
                                    name={"id"}
                                    placeholder={languageTranslation(
                                      "CONTACT_PERSON"
                                    )}
                                    className="width-common"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "REMARKS_OFFER_DEPARTMENT"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    className="textarea-custom form-control"
                                    rows="3"
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "REMARKS_BOOKING_DEPARTEMENT"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    className="textarea-custom form-control"
                                    rows="3"
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "REMARK_DEPARTMENT_VISIBLE_INTERNALLY"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    className="textarea-custom form-control"
                                    rows="3"
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "WORKING_PROOF_NECESSARY"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <FormGroup check inline>
                                    <div className=" checkbox-custom mb-0">
                                      <input
                                        type="checkbox"
                                        id="check1"
                                        className=""
                                        name={""}
                                      />
                                      <Label for="check1"></Label>
                                    </div>
                                  </FormGroup>
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("REMARK_OFFER")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    className="textarea-custom form-control"
                                    rows="3"
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation("REMARK_BOOKING")}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    className="textarea-custom form-control"
                                    rows="3"
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Row>
                              <Col sm="5">
                                <Label className="form-label col-form-label">
                                  {languageTranslation(
                                    "COMMENT_ONLY_VISIBLE_INTERNALLY"
                                  )}
                                </Label>
                              </Col>
                              <Col sm="7">
                                <div className="required-input">
                                  <Input
                                    className="textarea-custom form-control"
                                    rows="3"
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <div className="d-flex align-items-center justify-content-between">
                            <Button className="btn-save" color="danger">
                              {languageTranslation("CLEAR")}
                            </Button>
                            <Button className="btn-save" color="primary">
                              {languageTranslation("SAVE_BUTTON")}
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
