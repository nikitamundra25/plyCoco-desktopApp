import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput
} from "reactstrap";
import Select from "react-select";
import logger from "redux-logger";
import DayPicker from "react-day-picker";
import { languageTranslation } from "../../../helpers";
import { Priority } from "../../../config";
import "react-day-picker/lib/style.css";

const CreateTodo = (props: any) => {
  const { show, handleClose } = props;
  const modifiers = {
    sundays: { daysOfWeek: [0] },
    saturdays: { daysOfWeek: [6] },
    birthday: new Date(2018, 9, 30)
  };
  const modifiersStyles = {
    birthday: {
      color: "white",
      backgroundColor: "#ffc107"
    },
    sundays: {
      color: "#ffc107",
      backgroundColor: "#fffdee"
    },
    saturdays: {
      color: "#ffc107",
      backgroundColor: "#fffdee"
    }
  };

  return (
    <div>
      <Modal isOpen={show} className="reminder-modal" size="lg" centered>
        <ModalHeader>Create Todo/Reminder for John Doe </ModalHeader>
        <ModalBody>
          <div className="">
            <div className="calender-wrapper">
              <Row>
                <Col lg={"4"}>
                  <div>
                    <DayPicker
                      selectedDays={new Date()}
                      modifiers={modifiers}
                      modifiersStyles={modifiersStyles}
                    />
                  </div>
                </Col>
              </Row>
            </div>
            <Form className="form-section forms-main-section">
              <Row>
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("TIME_OF_DAY")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="text"
                            name={"firstName"}
                            placeholder={languageTranslation("TIME_OF_DAY")}
                            className="width-common"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("JURIDICTION")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div className="custom-radio-block">
                          <FormGroup check inline>
                            <CustomInput
                              type="radio"
                              id="yes"
                              name="driversLicense"
                              label={languageTranslation("INTERNALLY")}
                            />
                          </FormGroup>
                          <FormGroup check inline>
                            <CustomInput
                              type="radio"
                              id="no"
                              name="driversLicense"
                              label={languageTranslation("EXTERNALLY")}
                            />
                          </FormGroup>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("PRIORITY")}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Select
                            placeholder={languageTranslation("PRIORITY")}
                            options={Priority}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={"6"}>
                  <FormGroup>
                    <Row>
                      <Col sm="4">
                        <Label className="form-label col-form-label">
                          {languageTranslation("COMMENT")}{" "}
                          <span className="required">*</span>
                        </Label>
                      </Col>
                      <Col sm="8">
                        <div>
                          <Input
                            type="textarea"
                            name={"additionalText"}
                            className="textarea-custom"
                            placeholder={languageTranslation("COMMENT")}
                            rows="4"
                            maxLength={250}

                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">{languageTranslation("ADD_REMINDER")}</Button>
          <Button color="secondary" onClick={handleClose}>
            {languageTranslation("CANCEL")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateTodo;
