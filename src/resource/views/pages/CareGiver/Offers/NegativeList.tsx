import React, { FunctionComponent } from "react";
import {
  FormGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
import { languageTranslation } from "../../../../../helpers";
import CareInstCustomOption from "../../../components/CustomOptions/CustomCareInstOptions";

import { INegativeListInterface } from "../../../../../interfaces";
import { AppRoutes } from "../../../../../config";
import { useHistory } from "react-router-dom";

const NegativeList: FunctionComponent<INegativeListInterface> = (
  props: INegativeListInterface
) => {
  let history = useHistory();
  let {
    negativeUser,
    handleRemoveAll,
    careInstOptions,
    setShowSearch,
    onDeleteNegativeUser,
    handleSelect,
    selectedOption,
    setSelectedOption,
  } = props;

  if (
    negativeUser &&
    negativeUser.getNegativeList &&
    negativeUser.getNegativeList.negativeList
  ) {
    careInstOptions = careInstOptions.filter((g: any) => {
      return !negativeUser.getNegativeList.negativeList.find((d: any) => {
        if (d.id === g.value) {
          return g;
        }
      });
    });
  }

  return (
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
            <DropdownToggle className={"text-capitalize btn-more"} size="sm">
              <i className="icon-options-vertical" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => setShowSearch(true)}>
                <i className="fa fa-plus mr-2" />
                {languageTranslation("ADD_ALL_KEYWORD")}
              </DropdownItem>
              {/* <DropdownItem>
                <i className="fa fa-plus mr-2" />
                {languageTranslation("ADD_ALL_LEASING_FACILITY")}
              </DropdownItem> */}
              <DropdownItem
                disabled={
                  negativeUser &&
                  negativeUser.getNegativeList &&
                  negativeUser.getNegativeList.negativeList.length === 0
                }
              >
                <span onClick={handleRemoveAll}>
                  <i className="fa fa-trash mr-2" />
                  {languageTranslation("REMOVE_ALL")}
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className="common-list-body custom-scrollbar">
        <ul className="common-list list-unstyled mb-0">
          {negativeUser &&
          negativeUser.getNegativeList &&
          negativeUser.getNegativeList.negativeList
            ? negativeUser.getNegativeList.negativeList.map(
                (item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className={"cursor-pointer list-item text-capitalize"}
                    >
                      <div
                        className="list-item-text view-more-link one-line-text"
                        onClick={() =>
                          history.push(
                            AppRoutes.CARE_INSTITUION_VIEW.replace(
                              /:id/gi,
                              item.id
                            )
                          )
                        }
                      >
                        {item && item.lastName + " " + item.firstName}
                      </div>
                      <div className="list-item-icon">
                        <span
                          id={`delete${index}`}
                          className={`btn-icon mr-2`}
                          onClick={() => onDeleteNegativeUser(item.id)}
                        >
                          <UncontrolledTooltip
                            placement={"top"}
                            target={`delete${index}`}
                          >
                            {languageTranslation("DELETE")}
                          </UncontrolledTooltip>
                          <i className="fa fa-trash"></i>
                        </span>
                      </div>
                    </li>
                  );
                }
              )
            : null}
        </ul>
      </div>
      <div className="common-list-footer form-section ">
        <FormGroup className="mb-0">
          <Select
            placeholder={languageTranslation("SELECT_CARE_INSTITUTION")}
            options={
              careInstOptions && careInstOptions.length > 1
                ? careInstOptions
                : []
            }
            menuPlacement={"top"}
            className="attribute-select"
            classNamePrefix="attribute-inner-select"
            onChange={(value) => {
              handleSelect(value);
              setSelectedOption(null);
            }}
            noOptionsMessage={() => {
              return careInstOptions && careInstOptions.length > 1
                ? "No Care Institution"
                : "No Care Institution";
            }}
            value={selectedOption}
            components={{ Option: CareInstCustomOption }}
            isOptionDisabled={(option) =>
              option.value === languageTranslation("ID")
            }
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default NegativeList;
