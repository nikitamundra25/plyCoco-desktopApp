import React, { FunctionComponent } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
// import positive from "../../../../assets/img/positive.svg";
import negative from "../../../../assets/img/negative.svg";
import { IWorkedListInterface } from "../../../../../interfaces";
import Loader from "../../../containers/Loader/Loader";

const WorkedList: FunctionComponent<IWorkedListInterface> = (
  props: IWorkedListInterface
) => {
  const { workedAtList, workedAtListLoading } = props;


  let listOfWorkedAt: any = [];
  const getUnique = (arr: any, comp: any) => {
    // store the comparison  values in array
    const unique = arr
      .map((e: any) => e.cr.userId)

      // store the indexes of the unique objects
      .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e: any) => arr[e])
      .map((e: any) => arr[e]);

    return unique;
  };

  listOfWorkedAt = getUnique(workedAtList, "cr.userId");
  
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
        <ul className="common-list list-unstyled mb-0 h-100">
          {workedAtListLoading ? (
            <Loader />
          ) : listOfWorkedAt && listOfWorkedAt.length ? (
            listOfWorkedAt.map((list: any, index: number) => {
              return (
                <li className={"cursor-pointer list-item text-capitalize "}>
                  <div className="list-item-text">
                    {list.cr &&
                    list.cr.user &&
                    list.cr.user.canstitution &&
                    list.cr.user.canstitution.shortName
                      ? list.cr.user.canstitution.shortName
                      : ""}{" "}
                  </div>
                  <div className="list-item-icon d-flex">
                    <div className="list-item-img">
                      <img src={negative} alt="" />{" "}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="no-data-li">
              <li className={"text-center no-hover-row"}>
                <div className="no-data-section">
                  <div className="no-data-icon">
                    <i className="icon-ban" />
                  </div>
                  <h4 className="mb-1">
                    {languageTranslation("NO_WORKING_HISTORY_AVAILABLE")}{" "}
                  </h4>
                </div>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WorkedList;
