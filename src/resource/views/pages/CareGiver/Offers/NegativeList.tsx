import React, { FunctionComponent } from "react";
import {
  FormGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { languageTranslation } from "../../../../../helpers";
import CareinstitutionCustomAsyncList from "../../../components/DropdownList/CareInstitutionCustomAsyncSelect";
import { INegativeListInterface } from "../../../../../interfaces";
import { AppRoutes } from "../../../../../config";

const NegativeList: FunctionComponent<INegativeListInterface> = (
  props: INegativeListInterface
) => {
  let history = useHistory();
  let {
    negativeUser,
    handleRemoveAll,
    setShowSearch,
    onDeleteNegativeUser,
    handleSelect,
    selectedOption,
    setSelectedOption,
  } = props;

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
                        {item && item.canstitution && item.canstitution.shortName ? item.canstitution.shortName : '-'}
                        {/* {item && item.lastName + " " + item.firstName} */}
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
        <CareinstitutionCustomAsyncList
          placeholderLabel = {languageTranslation("SELECT_CARE_INSTITUTION")}
          onChange={(value:any) => {
            handleSelect(value);
            setSelectedOption(null);
          }}
          value={selectedOption}
          label="offers"
         />
        </FormGroup>
      </div>
    </div>
  );
};

export default NegativeList;
