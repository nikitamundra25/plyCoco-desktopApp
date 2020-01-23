import React, { FunctionComponent } from "react";
import Select from "react-select";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  UncontrolledTooltip,
  Button
} from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import { SortOptions, StatusOptions } from "../../config";
import { languageTranslation, logger } from "../../helpers";
import { FormikProps, Form } from "formik";
import {
  ISearchValues,
  IReactSelectInterface,
  ISearchProps
} from "../../interfaces";

const Search: FunctionComponent<FormikProps<ISearchValues> & ISearchProps> = (
  props: FormikProps<ISearchValues> & ISearchProps
) => {
  let history = useHistory();
  let { pathname } = useLocation();
  const {
    values: { searchValue, sortBy, isActive },
    label,
    handleSubmit,
    handleChange,
    setFieldValue,
    searchPlacholderText
  } = props;

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, "value");
    setFieldValue(name, selectOption);
  };
  return (
    <div className="filter-form form-section">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={"3"}>
            <FormGroup>
              <Label for="search" className="col-form-label">
                {languageTranslation("SEARCH_LABEL")} :
              </Label>
              <Input
                type="text"
                name="searchValue"
                id="search"
                value={searchValue}
                onChange={handleChange}
                placeholder={
                  searchPlacholderText
                    ? searchPlacholderText
                    : label === "employee"
                    ? languageTranslation("SEARCH_EMPLOYEE_PLACEHOLDER")
                    : label === "care institution"
                    ? languageTranslation("SEARCH_CARE_INSTI_PLACEHOLDER")
                    : languageTranslation("SEARCH_REGION_PLACEHOLDER")
                }
              />
            </FormGroup>
          </Col>
          <Col lg={"2"}>
            <FormGroup>
              <Label for="Selectregion" className="col-form-label">
                {languageTranslation("SORTBY_LABEL")} :
              </Label>
              <Select
                placeholder={languageTranslation("SORTBY_PLACEHOLDER")}
                options={SortOptions}
                isClearable={true}
                value={sortBy && sortBy.value !== "" ? sortBy : null}
                onChange={(value: any) => handleSelect(value, "sortBy")}
              />
            </FormGroup>
          </Col>
          {label !== "region" ? (
            <Col lg={"2"}>
              <FormGroup>
                <Label for="Selectregion" className="col-form-label">
                  {languageTranslation("STATUS_LABEL")} :
                </Label>
                <Select
                  placeholder={languageTranslation("STATUS_PLACEHOLDER")}
                  options={StatusOptions}
                  isClearable={true}
                  value={isActive && isActive.value !== "" ? isActive : null}
                  onChange={(value: any) => handleSelect(value, "isActive")}
                />
              </FormGroup>
            </Col>
          ) : null}
          <Col lg={"2"}>
            <div className="label-height"></div>
            <div className="filter-btn-wrap">
              <Button
                className="btn-filter mr-2"
                type="submit"
                id="search1"
                onClick={() => {
                  handleSubmit();
                }}
              >
                <UncontrolledTooltip placement="top" target="search1">
                  {languageTranslation("SEARCH_LABEL")}
                </UncontrolledTooltip>
                <i className="fa fa-search"></i>
              </Button>
              <Button
                className="btn-filter mr-2"
                id="reset"
                onClick={() => {
                  history.push(pathname);
                }}
              >
                <UncontrolledTooltip placement="top" target="reset">
                  {languageTranslation("RESET_LABEL")}
                </UncontrolledTooltip>
                <i className="fa fa-refresh "></i>
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Search;
