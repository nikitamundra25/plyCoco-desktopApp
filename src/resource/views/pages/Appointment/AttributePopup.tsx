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
  CustomInput,
  Collapse
} from "reactstrap";
import Select from "react-select";
import logger from "redux-logger";
import { languageTranslation } from "../../../../helpers";
import { State } from "../../../../config";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import filter from "../../../assets/img/filter.svg";

const AttributeFilter = (props: any) => {
  const { show, handleClose } = props;
  const [collapse1, setCollapse1] = useState(true);
  const [collapse2, setCollapse2] = useState(true);

  const toggle1 = () => setCollapse1(!collapse1);
  const toggle2 = () => setCollapse2(!collapse2);

  const externalCloseBtn = (
    <button className="close modal-close" onClick={() => handleClose()}>
      <img src={close} alt="close" className="main-img" />
      <img src={closehover} alt="close" className="hover-img" />
    </button>
  );
  return (
    <div>
      <Modal
        isOpen={show}
        className="common-modal attribute-modal"
        centered
        size="xl"
      >
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation("ATTRIBUTES")}
        </ModalHeader>
        <ModalBody>
          <div className="d-flex align-items-center mb-2">
            <div className="custom-header-nav-item mr-3">
              <span className="custom-header-nav-icon">
                <img src={filter} alt="" />
              </span>
              <span className="custom-header-nav-text">Apply filters</span>
            </div>

            <div>
              <span className=" checkbox-custom ">
                <input
                  type="checkbox"
                  id="checkAll"
                  name="checkbox"
                  className=""
                />
                <label className="">Show All</label>
              </span>
            </div>
          </div>
          <div className="common-attribute-section">
            <Row className="common-attribute-row">
              <Col md={4}>
                <div className="common-list-wrap">
                  <div className="common-list-header d-flex align-items-cente justify-content-between">
                    <div className="common-list-title align-middle">
                      Presets
                    </div>
                    <div className=" align-middle toggle-icon">
                      <i className="fa fa-angle-down"></i>
                    </div>
                  </div>
                  <div className="common-list-body custom-scrollbar">
                    <ul className="common-list list-unstyled mb-0">
                      <li>Dialysis </li>
                      <li>Home Management</li>
                      <li>Nurse/carer</li>
                    </ul>
                  </div>
                </div>
              </Col>

              <Col md={4} className="px-md-0">
                <div className="common-list-wrap">
                  <div className="common-list-header d-flex align-items-cente justify-content-between">
                    <div className="common-list-title align-middle">
                      Positive Attribute(must have)
                    </div>
                  </div>
                  <div className="common-list-body custom-scrollbar">
                    <div>
                      <div
                        onClick={toggle1}
                        className="attribute-title cursor-pointer"
                      >
                        <span className="align-middle">
                          <i className="fa fa-minus mr-2" />
                        </span>
                        <span className="align-middle">General</span>
                      </div>
                      <Collapse isOpen={collapse1}>
                        <ul className="common-list list-unstyled mb-0  pl-3 attribute-list">
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Artz</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Inaktiv</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Login moglisch</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Loschen</label>
                            </span>
                          </li>
                        </ul>
                      </Collapse>
                    </div>
                    <div>
                      <div
                        onClick={toggle2}
                        className="attribute-title cursor-pointer"
                      >
                        <span className="align-middle">
                          <i className="fa fa-minus mr-2" />
                        </span>
                        <span className="align-middle">Caregivers</span>
                      </div>
                      <Collapse isOpen={collapse2}>
                        <ul className="common-list list-unstyled mb-0 pl-3 attribute-list">
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Artz</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Inaktiv</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Login moglisch</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Loschen</label>
                            </span>
                          </li>
                        </ul>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className="common-list-wrap">
                  <div className="common-list-header d-flex align-items-cente justify-content-between">
                    <div className="common-list-title align-middle">
                      Negative Attribute(must not have)
                    </div>
                  </div>
                  <div className="common-list-body custom-scrollbar">
                    <div>
                      <div
                        onClick={toggle1}
                        className="attribute-title cursor-pointer"
                      >
                        <span className="align-middle">
                          <i className="fa fa-minus mr-2" />
                        </span>
                        <span className="align-middle">General</span>
                      </div>
                      <Collapse isOpen={collapse1}>
                        <ul className="common-list list-unstyled mb-0  pl-3 attribute-list">
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Artz</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Inaktiv</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Login moglisch</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Loschen</label>
                            </span>
                          </li>
                        </ul>
                      </Collapse>
                    </div>
                    <div>
                      <div
                        onClick={toggle2}
                        className="attribute-title cursor-pointer"
                      >
                        <span className="align-middle">
                          <i className="fa fa-minus mr-2" />
                        </span>
                        <span className="align-middle">Caregivers</span>
                      </div>
                      <Collapse isOpen={collapse2}>
                        <ul className="common-list list-unstyled mb-0 pl-3 attribute-list">
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Artz</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Inaktiv</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Login moglisch</label>
                            </span>
                          </li>
                          <li>
                            <span className=" checkbox-custom ">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                              />
                              <label className="">Loschen</label>
                            </span>
                          </li>
                        </ul>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AttributeFilter;
