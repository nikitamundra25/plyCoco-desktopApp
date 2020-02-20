import React, { FunctionComponent } from "react";
import {
  FormGroup,
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Select from "react-select";
import { languageTranslation } from "../../../../../helpers";
import { State } from "../../../../../config";
import "../caregiver.scss";
const Offer: FunctionComponent = () => {
  return (
    <div className="common-offer-section">
      <h5 className="content-title">{languageTranslation("OFFERS")}</h5>
      <Row className="common-offer-row">
        <Col md={4}>
          <div className="common-list-wrap">
            <div className="common-list-header d-flex align-items-center justify-content-between">
              <div className="common-list-title align-middle">
                {languageTranslation("OFFER_FOR")}{" "}
                <span className="font-weight-bold">
                  ( {languageTranslation("POSITIVE")})
                </span>
              </div>
              <div>
                <UncontrolledDropdown className="custom-dropdown">
                  <DropdownToggle className={"text-capitalize"} size="sm">
                    <i className="icon-options-vertical" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <i className="fa fa-plus mr-2" />
                      Add all by keyword
                    </DropdownItem>

                    <DropdownItem>
                      <i className="fa fa-trash mr-2" />
                      Remove all
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
            <div className="common-list-body">
              <ul className="common-list list-unstyled">
                <li
                  className={"cursor-pointer list-item text-capitalize active"}
                >
                  <span className="list-item-text">Dialysis</span>
                  <span className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </span>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <span className="list-item-text">Nurse/carer</span>
                  <span className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </span>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <span className="list-item-text">Home Management</span>
                  <span className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </span>
                </li>
              </ul>
            </div>
            <div className="common-list-footer form-section ">
              <FormGroup className="mb-0">
                <Select
                  placeholder={languageTranslation("REGION", "STATE")}
                  options={State}
                  menuPlacement={"top"}
                  className="attribute-select"
                  classNamePrefix="attribute-inner-select"
                />
              </FormGroup>
            </div>
          </div>
        </Col>

        <Col md={4} className="px-md-0">
          <div className="common-list-wrap">
            <div className="common-list-header d-flex align-items-center justify-content-between">
              <div className="common-list-title ">
                {languageTranslation("NO_OFFER_FOR")}{" "}
                <span className="font-weight-bold">
                  ({languageTranslation("NEGATIVE")})
                </span>
              </div>
              <div>
                <UncontrolledDropdown className="custom-dropdown">
                  <DropdownToggle className={"text-capitalize"} size="sm">
                    <i className="icon-options-vertical" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <i className="fa fa-plus mr-2" />
                      Add all by keyword
                    </DropdownItem>
                    <DropdownItem>
                      <i className="fa fa-plus mr-2" />
                      Add all leasing facilities
                    </DropdownItem>
                    <DropdownItem>
                      <i className="fa fa-trash mr-2" />
                      Remove all
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
            <div className="common-list-body">
              <ul className="common-list list-unstyled">
                <li
                  className={"cursor-pointer list-item text-capitalize active"}
                >
                  <span className="list-item-text">Dialysis</span>
                  <span className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </span>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <span className="list-item-text">Nurse/carer</span>
                  <span className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </span>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <span className="list-item-text">Home Management</span>
                  <span className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </span>
                </li>
              </ul>
            </div>
            <div className="common-list-footer form-section ">
              <FormGroup className="mb-0">
                <Select
                  placeholder={languageTranslation("REGION", "STATE")}
                  options={State}
                  menuPlacement={"top"}
                  className="attribute-select"
                  classNamePrefix="attribute-inner-select"
                />
              </FormGroup>
            </div>
          </div>
        </Col>

        <Col md={4}>
          <div className="common-list-wrap">
            <div className="common-list-header d-flex align-items-center justify-content-between">
              <div className="common-list-title ">
                {languageTranslation("WORKED_AT")}{" "}
              </div>
              <div>
                <UncontrolledDropdown className="custom-dropdown">
                  <DropdownToggle className={"text-capitalize"} size="sm">
                    <i className="icon-options-vertical" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <i className="fa fa-user-plus mr-2" />
                      Add all to the positive list
                    </DropdownItem>
                    <DropdownItem>
                      <i className="fa fa-user-times mr-2" />
                      Add all to negative list
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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
                  menuPlacement={"top"}
                  className="attribute-select"
                  classNamePrefix="attribute-inner-select"
                />
              </FormGroup>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Offer;
