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
import Loader from "../../../containers/Loader/Loader";

const WorkedList: FunctionComponent<IWorkedListInterface> = (
  props: IWorkedListInterface
) => {
  const {workedAtList,workedAtListLoading,addToNegativeList} = props;
  const unique = workedAtList.reduce((unique:any, o:any) => {
    if (!unique.some((obj:any) => obj.ca.name)) {
      unique.push(o);
    }
    return unique;
  }, []);
  
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
      <div className="common-list-body worked-list custom-scrollbar">
        <ul className="common-list list-unstyled mb-0 h-100">
        {workedAtListLoading?
          <Loader/>
          :workedAtList && workedAtList.length ?  
           workedAtList.map((list:any,index:number)=>{
         return <li className={"cursor-pointer list-item text-capitalize "}>
            <div className="list-item-text">{list.ca && list.ca.name ? list.ca.name : ""} </div>
            <div className="list-item-icon d-flex" onClick={()=>addToNegativeList(list.ca._id)} >
            <div className="list-item-img">
                <img src={negative} alt="" />{" "}
              </div>
              </div>
          </li>
           })
       : 
       <div className="no-data-li">
       <li className={"text-center no-hover-row"}>
         <div className="no-data-section">
           <div className="no-data-icon">
             <i className="icon-ban" />
           </div>
           <h4 className="mb-1">
             {languageTranslation(
               "NO_WORKING_HISTORY_AVAILABLE"
             )}{" "}
           </h4>
         </div>
     </li>
     </div>
     }
        </ul>
      </div>
    </div>
  );
};

export default WorkedList;
