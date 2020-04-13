import React, { useState, FunctionComponent, useEffect } from "react";
import {
  Button,
  Table,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { languageTranslation } from "../../../../../helpers";
import refresh from "../../../assets/img/refresh.svg";

import pen from "../../../../assets/img/header-icons/pen.svg";
import CompleteTime from "../../../../assets/img/header-icons/tab-icons/complete-time.svg";
import idea from "../../../../assets/img/header-icons/tab-icons/idea.svg";
import massege from "../../../../assets/img/header-icons/tab-icons/massege.svg";

import { RouteComponentProps } from "react-router";
import "../index.scss";
import right_arrow from "../../../../assets/img/rightarrow.svg";
import left_arrow from "../../../../assets/img/leftarrow.svg";
import "react-day-picker/lib/style.css";
import {
  InvoiceSummaryFilter,
  StatusOptions,
  SortOptions,
  CareInstInActiveAttrId,
  deactivatedListColor,
  CareInstTIMyoCYAttrId,
  leasingListColor,
  CareInstPlycocoAttrId,
  selfEmployesListColor,
  PAGE_LIMIT,
  CaregiverTIMyoCYAttrId,
  dbAcceptableFormat,
} from "../../../../../config";
import CareInstCustomOption from "../../../components/CustomOptions/CustomCareInstOptions";
import { IReactSelectInterface } from "../../../../../interfaces";
import { CareInstitutionQueries, InvoiceQueries, CareGiverQueries } from "../../../../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import moment from "moment";
import InvoiceList from "./InvoiceList";
const [
  GET_CARE_INSTITUTION_LIST,
  ,
  GET_DEPARTMENT_LIST,
  ,
  ,
  ,
] = CareInstitutionQueries;
const [
    GET_INVOICE_LIST
] = InvoiceQueries;
const [, , , , , , , , GET_CAREGIVER_BY_NAME] = CareGiverQueries;

const CreateInvoice: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
    // select Careinstitution
  const [careinstitutionFilter, setcareinstitutionFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

//   Store selectedDepartment
const [departmentFilter, setdepartmentFilter] = useState<
IReactSelectInterface | undefined
>(undefined);

  // State for department options
  const [careInstitutionDepartmentOption, setcareInstitutionDepartmentOption] = useState<
  IReactSelectInterface[] | undefined
>([]);

  // Default value is start & end of month
  let gte: string = moment().startOf("month").format(dbAcceptableFormat);
  let lte: string = moment().endOf("month").format(dbAcceptableFormat);
  // To get caregiver list from db
  const [
    getDepartmentList,
    { data: departmentList, loading: deptLoading },
  ] = useLazyQuery<any>(GET_DEPARTMENT_LIST);

  // To fetch invoice list 
  const [
    fetchInvoiceList,
    {
      data: invoiceList,
      loading: invoiceListLoading,
      refetch
    },
  ] = useLazyQuery<any, any>(GET_INVOICE_LIST, {
    fetchPolicy: "no-cache",
    // notifyOnNetworkStatusChange: true
  });

  // To fetch all careinstitution list
  const [fetchCareInstitutionList, { data: careInstituition }] = useLazyQuery<
    any
  >(GET_CARE_INSTITUTION_LIST, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    fetchCareInstitutionList({
      variables: {
        searchBy: null,
        sortBy: 3,
        limit: 500,
        page: 1,
        isActive: "",
      },
    });
  }, []);

 // To fetch the list of all caregiver
 const [
    fetchCareGivers,
    { data: careGivers},
  ] = useLazyQuery<any>(GET_CAREGIVER_BY_NAME, {
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    // Fetch list of caregivers
    fetchCareGivers({
      variables: {
        searchBy: "",
        limit: 500,
        page: 1,
      },
    });
  }, []);

 // to get list of all invoices
 const getInvoiceListData = (
  ) => {
    // get careGivers list
    fetchInvoiceList({
      variables: {
        searchBy: null,
        caregiverId: null,
        careInstitutionId: careinstitutionFilter && careinstitutionFilter.value? parseInt(careinstitutionFilter.value) : null,
        divisionId: null,
        startDate: gte? gte:  null,
        endDate: lte ? lte:  null,
        limit: PAGE_LIMIT,
        page: 1
      },
    });
  };

  
  // Fetch single data of particular caregiver
  useEffect(() => {
    getInvoiceListData();
  }, [careinstitutionFilter,departmentFilter ]);

  // set careInstitution list options
  const careInstitutionOptions: IReactSelectInterface[] | undefined = [];
  if (careInstituition && careInstituition.getCareInstitutions) {
    const { getCareInstitutions } = careInstituition;
    const { careInstitutionData, canstitution } = getCareInstitutions;
    careInstitutionOptions.push({
      label: languageTranslation("NAME"),
      value: languageTranslation("ID"),
      companyName: languageTranslation("COMPANY_NAME"),
    });

    careInstitutionData.map((data: any, index: any) => {
      const { canstitution } = data;
      let { attributes = [], companyName = "" } = canstitution
        ? canstitution
        : {};
      attributes = attributes ? attributes : [];
      careInstitutionOptions.push({
        label: `${data.lastName}${" "}${data.firstName}`,
        value: data.id,
        color: attributes.includes(CareInstInActiveAttrId)
          ? deactivatedListColor
          : attributes.includes(CareInstTIMyoCYAttrId)
          ? leasingListColor
          : attributes.includes(CareInstPlycocoAttrId)
          ? selfEmployesListColor
          : "",
        companyName,
      });
      return true;
    });
  }

   // set careGivers list options
   const careGiversOptions: IReactSelectInterface[] | undefined = [];
   if (
     careGivers &&
     careGivers.getCaregiverByName &&
     careGivers.getCaregiverByName.result
   ) {
     careGiversOptions.push({
       label: languageTranslation("NAME"),
       value: languageTranslation("ID"),
       color: "",
     });
     careGivers.getCaregiverByName.result.forEach(
       ({ id, firstName, lastName, isActive, caregiver }: any) => {
         let { attributes = [] } = caregiver ? caregiver : {};
         // To check null values
         attributes = attributes ? attributes : [];
         careGiversOptions.push({
           label: `${lastName}${" "}${firstName}`,
           value: id,
           color: !isActive
             ? deactivatedListColor
             : attributes.includes(CaregiverTIMyoCYAttrId)
               ? leasingListColor
               : attributes.includes("Plycoco")
                 ? selfEmployesListColor
                 : "",
         });
       }
     );
   }

   
  // Options to show department data
  useEffect(() => { 
    let careInstitutionDepartment: IReactSelectInterface[] = [];
    if (departmentList && departmentList.getDivision.length) {
      const { getDivision } = departmentList;
      careInstitutionDepartment = getDivision.map((dept: any) => ({
        label: dept.name,
        value: dept && dept.id ? dept.id.toString() : "",
      }));
      if(careInstitutionDepartment && careInstitutionDepartment.length){
        setcareInstitutionDepartmentOption(careInstitutionDepartment)
      }
    }
  }, [departmentList]);

  // Select careinstitution or caregiver from navbar
  const onhandleSelection = (value: IReactSelectInterface, name: string) => {
    if (name === "careinstitution") {
      setcareinstitutionFilter(value);
    }
    else if(name==="department"){
        setdepartmentFilter(value)
    }
  };

  //  call department list query with every selection of care institution
  useEffect(() => {
    let userId: string =
      careinstitutionFilter && careinstitutionFilter.value
        ? careinstitutionFilter.value
        : "";
    if (userId) {
      getDepartmentList({
        variables: {
          userId: parseInt(userId),
          locked: false,
        },
      });
    }else{
      setcareInstitutionDepartmentOption([])
    }
  }, [careinstitutionFilter]);
  
  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="common-topheader d-flex  px-2 pb-1 invoice-header">
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <i className="fa fa-refresh "></i>
              </span>
              <span className="header-nav-text">
                {languageTranslation("RESET_LABEL")}
              </span>
            </div>

            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={
                    "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
                  }
                placeholder="Maiwald Jacqueline"
                 options={careGiversOptions}
                isClearable={true}
              />
            </div>
            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={
                  "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
                }
                placeholder={languageTranslation("SELECT_CARE_INSTITUTION")}
                options={careInstitutionOptions}
                value={
                  careinstitutionFilter && careinstitutionFilter.value !== ""
                    ? careinstitutionFilter
                    : null
                }
                components={{ Option: CareInstCustomOption }}
                onChange={(value: any) =>
                  onhandleSelection(value, "careinstitution")
                }
                isClearable={true}
              />
            </div>
            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder={
                    languageTranslation("SELECT_DEPARTMENT")
                }
                options={careInstitutionDepartmentOption}
                noOptionsMessage={() => {
                  return careinstitutionFilter && careinstitutionFilter.value !== ""
                    ? languageTranslation("NO_OPTIONS")
                    : languageTranslation(
                        "SELECT_CAREINSTITUTION_FIRST"
                      );
                }}
                value={departmentFilter && departmentFilter.value !== ""
                ? departmentFilter
                : null }
                onChange={(value: any) =>
                    onhandleSelection(value, "department")
                  }
                isClearable={true}
              />
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={pen} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CREATE")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={CompleteTime} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("TIMELY_COMPLETELY")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon">
                <img src={idea} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CREATE_ALL_CAREGIVER")}
              </span>
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon pr-0">
                <img src={massege} alt="" />
              </span>
            </div>
            <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Select Month Summary"
                options={InvoiceSummaryFilter}
                isClearable={true}
              />
            </div>

            {/* <div className="user-select mx-1 ">
              <Select
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect "}
                placeholder="Nursing service at Treptower Park"
                // options={options}
                isClearable={true}
              />
            </div> */}
            <div className="header-nav-item">
              <span className="header-nav-icon pr-0">
                <img src={left_arrow} alt="" />
              </span>
            </div>
            <div className="common-header-input pr-1">
              <DayPickerInput />
            </div>
            <div className="header-nav-item">
              <span className="header-nav-icon pr-0">
                <img src={right_arrow} alt="" />
              </span>
            </div>
          </div>
          <div className="common-content flex-grow-1">
            <div className="common-content flex-grow-1  p-0 all-invoice">
             <InvoiceList 
             invoiceListLoading ={invoiceListLoading}
             invoiceList={invoiceList && invoiceList.data && invoiceList.data.getAllAppointment && invoiceList.data.getAllAppointment.length ? invoiceList.data.getAllAppointment : [] }
              />
              <Form className="form-section total-form-section bg-white">
                <div className="d-flex flex-wrap total-form-block">
                  <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                    <FormGroup>
                      <Row className="align-items-center">
                        <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                          <Label className="form-label col-form-label">
                            Total
                          </Label>
                        </Col>
                        <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                          <div className="required-input">
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={"Enter Total"}
                              className="text-input text-capitalize"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                    <FormGroup>
                      <Row className="align-items-center">
                        <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                          <Label className="form-label col-form-label">
                            Total selection
                          </Label>
                        </Col>
                        <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                          <div className="required-input">
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder={"Enter total selection"}
                              className="text-input text-capitalize"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateInvoice;
