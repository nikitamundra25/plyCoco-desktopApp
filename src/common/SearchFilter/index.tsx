import React, { Component } from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import { Region } from "../../config";
import Select from "react-select";

import { languageTranslation } from "../../helpers";
class Search extends Component {
  render() {
    return (
      <div className="filter-form form-section">
        <Row>
          <Col lg={"2"}>
            <FormGroup>
              <Label for="search" className="col-form-label">
                {languageTranslation("SEARCH_LABEL")} :
              </Label>
              <Input
                type="text"
                name="search"
                id="search"
                placeholder={languageTranslation("SEARCH_PLACEHOLDER")}
              />
            </FormGroup>
          </Col>
          <Col lg={"2"}>
            <FormGroup>
              <Label className="col-form-label">
                {languageTranslation("EMPLOYEE_REGION_LABEL")} :
              </Label>
              <div>
                <Select
                  placeholder={languageTranslation(
                    "EMPLOYEE_REGION_PLACEHOLDER"
                  )}
                  options={Region}
                />
              </div>
            </FormGroup>
          </Col>

          <Col lg={"2"}>
            <FormGroup>
              <Label for="Selectregion" className="col-form-label">
                {languageTranslation("SORTBY_LABEL")} :
              </Label>
              <Input type="select" name="region" id="Selectregion">
                <option>{languageTranslation("SORTBY_OPTION1")}</option>
                <option>{languageTranslation("SORTBY_OPTION2")}</option>
                <option>{languageTranslation("SORTBY_OPTION3")}</option>
              </Input>
            </FormGroup>
          </Col>

          <Col lg={"2"}>
            <div className="label-height"></div>
            <div className="filter-btn-wrap">
              <span className="btn-filter mr-2" id="search1">
                <UncontrolledTooltip placement="top" target="search1">
                  {languageTranslation("SEARCH_LABEL")}
                </UncontrolledTooltip>
                <i className="fa fa-search"></i>
              </span>
              <span className="btn-filter mr-2" id="reset">
                <UncontrolledTooltip placement="top" target="reset">
                  {languageTranslation("RESET_LABEL")}
                </UncontrolledTooltip>
                <i className="fa fa-refresh "></i>
              </span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Search;
