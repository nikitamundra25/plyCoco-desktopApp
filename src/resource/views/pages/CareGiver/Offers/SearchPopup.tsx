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
import close from "../../../../assets/img/cancel.svg";
import closehover from "../../../../assets/img/cancel-hover.svg";

const OfferSearch = (props: any) => {
  const { show, handleClose } = props;

  const externalCloseBtn = (
    <button className="close modal-close" onClick={() => handleClose()}>
      <img src={close} alt="close" className="main-img" />
      <img src={closehover} alt="close" className="hover-img" />
    </button>
  );
  return (
    <div>
      <Modal isOpen={show} className="common-modal" centered>
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation("SEARCH_POPUP_TITLE")}{" "}
        </ModalHeader>
        <ModalBody>
          <div className="">
            <Form className="form-section forms-main-section">
              <Row>
                <Col lg={"12"}>
                  <FormGroup>
                    <Label className="form-label col-form-label mb-1">
                      {languageTranslation(
                        "SEARCH_POPUP_LABEL_CAREINSTITUTION"
                      )}
                    </Label>

                    <div>
                      <Input
                        type="text"
                        name={"firstName"}
                        placeholder={languageTranslation("SEARCH_LABEL")}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">{languageTranslation("ADD")}</Button>
          <Button color="secondary" onClick={handleClose}>
            {languageTranslation("CANCEL")}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default OfferSearch;
