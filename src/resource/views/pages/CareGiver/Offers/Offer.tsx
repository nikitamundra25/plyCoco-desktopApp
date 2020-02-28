import React, { FunctionComponent, useState } from "react";
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
import positive from "../../../../assets/img/positive.svg";
import negative from "../../../../assets/img/negative.svg";
import SearchPopup from "./SearchPopup";

const Offer: FunctionComponent = any => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

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
                  <DropdownToggle
                    className={"text-capitalize btn-more"}
                    size="sm"
                  >
                    <i className="icon-options-vertical" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <i className="fa fa-plus mr-2" />
                      {languageTranslation("ADD_ALL_KEYWORD")}
                    </DropdownItem>

                    <DropdownItem>
                      <i className="fa fa-trash mr-2" />
                      {languageTranslation("REMOVE_ALL")}
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
                  <div className="list-item-text">Dialysis</div>
                  <div className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </div>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <div className="list-item-text">Nurse/carer</div>
                  <div className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </div>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <div className="list-item-text">Home Management</div>
                  <div className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </div>
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
                  <DropdownToggle
                    className={"text-capitalize btn-more"}
                    size="sm"
                  >
                    <i className="icon-options-vertical" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => setShowSearch(true)}>
                      <i className="fa fa-plus mr-2" />
                      {languageTranslation("ADD_ALL_KEYWORD")}
                    </DropdownItem>
                    <DropdownItem>
                      <i className="fa fa-plus mr-2" />
                      {languageTranslation("ADD_ALL_LEASING_FACILITY")}
                    </DropdownItem>
                    <DropdownItem>
                      <i className="fa fa-trash mr-2" />
                      {languageTranslation("REMOVE_ALL")}
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
                  <div className="list-item-text">Dialysis</div>
                  <div className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </div>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <div className="list-item-text">Nurse/carer</div>
                  <div className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </div>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <div className="list-item-text">Home Management</div>
                  <div className="list-item-icon">
                    <i className="fa fa-trash"></i>
                  </div>
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
                  <DropdownToggle
                    className={"text-capitalize btn-more"}
                    size="sm"
                  >
                    <i className="icon-options-vertical" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <img src={positive} className="mr-2" alt="" />
                      <span className="align-middle">
                        {languageTranslation("ADD_ALL_POSITIVE_LIST")}
                      </span>
                    </DropdownItem>
                    <DropdownItem>
                      <img src={negative} className="mr-2" alt="" />
                      <span className="align-middle">
                        {languageTranslation("ADD_ALL_NEGATIVE_LIST")}
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
            <div className="common-list-body">
              <ul className="common-list list-unstyled">
                <li className={"cursor-pointer list-item text-capitalize "}>
                  <div className="list-item-text">Dialysis</div>
                  <div className="list-item-icon d-flex">
                    <div className="list-item-img mr-2">
                      <img src={positive} alt="" />
                    </div>
                    <div className="list-item-img">
                      <img src={negative} alt="" />{" "}
                    </div>
                  </div>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <div className="list-item-text">Nurse/carer</div>
                  <div className="list-item-icon d-flex">
                    <div className="list-item-img mr-2">
                      <img src={positive} alt="" />
                    </div>
                    <div className="list-item-img">
                      <img src={negative} alt="" />{" "}
                    </div>
                  </div>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <div className="list-item-text">Home Management</div>
                  <div className="list-item-icon d-flex">
                    <div className="list-item-img mr-2">
                      <img src={positive} alt="" />
                    </div>
                    <div className="list-item-img">
                      <img src={negative} alt="" />{" "}
                    </div>
                  </div>
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
      </Row>
      <SearchPopup
        show={showSearch ? true : false}
        handleClose={() => setShowSearch(false)}
      />
    </div>
  );
};

export default Offer;
