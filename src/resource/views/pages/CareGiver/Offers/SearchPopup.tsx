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
import { languageTranslation } from "../../../../../helpers";
import { State } from "../../../../../config";

const OfferSearch = (props: any) => {
  const { show, handleClose } = props;

  return (
    <div>
      <Modal isOpen={show} className="common-modal" size="lg" centered>
        <ModalHeader> Create Todo/Reminder for John Doe </ModalHeader>
        <ModalBody>
          <div className="">
            <Form className="form-section forms-main-section">
              <Row>
                <Col lg={"12"}>
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

export default OfferSearch;
