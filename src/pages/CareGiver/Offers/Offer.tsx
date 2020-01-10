import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput,
  Card,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import Select from "react-select";
const options = [
  { label: "one", value: 1 },
  { label: "two", value: 2 }
];
import { languageTranslation } from "../../../helpers/langauageTranslation";

import { State, Region } from "../../../config";
class Offer extends Component {
  render() {
    return (
      <div className="common-offer-section">
        <h5 className="content-title">{languageTranslation("OFFERS")}</h5>
        <Row>
          <Col md={4}>
            <div className="common-list-wrap">
              <div className="common-list-header d-flex align-items-cente justify-content-between">
                <div className="common-list-title align-middle">
                  {languageTranslation("OFFER_FOR")}{" "}
                  <span className="font-weight-bold">
                    ( {languageTranslation("POSITIVE")})
                  </span>
                </div>
                <div className=" align-middle toggle-icon">
                  <i className="fa fa-angle-down"></i>
                </div>
              </div>
              <div className="common-list-body">
                <ul className="common-list list-unstyled">
                  <li>Dialysis </li>
                  <li>Home Management</li>
                  <li>Nurse/carer</li>
                </ul>
              </div>
              <div className="common-list-footer form-section ">
                <FormGroup className="mb-0">
                  <Select
                    placeholder={languageTranslation("REGION", "STATE")}
                    options={State}
                  />
                </FormGroup>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className="common-list-wrap">
              <div className="common-list-header d-flex align-items-cente justify-content-between">
                <div className="common-list-title align-middle">
                  {languageTranslation("NO_OFFER_FOR")}{" "}
                  <span className="font-weight-bold">
                    ({languageTranslation("NEGATIVE")})
                  </span>
                </div>
                <div className=" align-middle toggle-icon">
                  <i className="fa fa-angle-down"></i>
                </div>
              </div>
              <div className="common-list-body">
                <ul className="common-list list-unstyled">
                  <li>Dialysis </li>
                  <li>Home Management</li>
                  <li>Nurse/carer</li>
                </ul>
              </div>
              <div className="common-list-footer form-section ">
                <FormGroup className="mb-0">
                  <Select
                    placeholder={languageTranslation("REGION", "STATE")}
                    options={State}
                  />
                </FormGroup>
              </div>
            </div>
          </Col>

          <Col md={4}>
            <div className="common-list-wrap">
              <div className="common-list-header d-flex align-items-cente justify-content-between">
                <div className="common-list-title align-middle">
                  {languageTranslation("WORKED_AT")}{" "}
                </div>
                <div className=" align-middle toggle-icon">
                  <i className="fa fa-angle-down"></i>
                </div>
              </div>
              <div className="common-list-body">
                <ul className="common-list list-unstyled">
                  <li>Dialysis </li>
                  <li>Home Management</li>
                  <li>Nurse/carer</li>
                </ul>
              </div>
              <div className="common-list-footer form-section ">
                <FormGroup className="mb-0">
                  <Select
                    placeholder={languageTranslation("REGION", "STATE")}
                    options={State}
                  />
                </FormGroup>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Offer;
