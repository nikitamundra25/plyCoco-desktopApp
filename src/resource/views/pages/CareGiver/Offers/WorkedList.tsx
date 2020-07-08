import React, { FunctionComponent } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
// import positive from "../../../../assets/img/positive.svg";
import negative from "../../../../assets/img/negative.svg";
import { IWorkedListInterface } from "../../../../../interfaces";

const WorkedList: FunctionComponent<IWorkedListInterface> = (
  props: IWorkedListInterface
) => {
  return (
    <div className="common-list-wrap">
      <div className="common-list-header d-flex align-items-center justify-content-between">
        <div className="common-list-title ">
          {languageTranslation("WORKED_AT")}
        </div>
        <div>
          <UncontrolledDropdown className="custom-dropdown">
            <DropdownToggle className={"text-capitalize btn-more"} size="sm">
              <i className="icon-options-vertical" />
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem>
                <img src={positive} className="mr-2" alt="" />
                <span className="align-middle">
                  {languageTranslation("ADD_ALL_POSITIVE_LIST")}
                </span>
              </DropdownItem> */}
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
      <div className="common-list-body custom-scrollbar worked-list">
        <ul className="common-list list-unstyled mb-0">
          {/* <li className={"cursor-pointer list-item text-capitalize "}>
            <div className="list-item-text">Dialysis</div>
            <div className="list-item-icon d-flex">
              <div className="list-item-img">
                <img src={negative} alt="" />{" "}
              </div>
            </div>
          </li>
          <li className={"cursor-pointer list-item text-capitalize"}>
            <div className="list-item-text">Nurse/carer</div>
            <div className="list-item-icon d-flex">
              <div className="list-item-img">
                <img src={negative} alt="" />{" "}
              </div>
            </div>
          </li>
          <li className={"cursor-pointer list-item text-capitalize"}>
            <div className="list-item-text">Home Management</div>
            <div className="list-item-icon d-flex">
              <div className="list-item-img">
                <img src={negative} alt="" />{" "}
              </div>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default WorkedList;
