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
import { languageTranslation } from "../../../../../helpers";

import { RouteComponentProps, useLocation } from "react-router";
import "../index.scss";
import "react-day-picker/lib/style.css";
import {
  CareInstInActiveAttrId,
  deactivatedListColor,
  CareInstTIMyoCYAttrId,
  leasingListColor,
  CareInstPlycocoAttrId,
  selfEmployesListColor,
  PAGE_LIMIT,
  CaregiverTIMyoCYAttrId,
  dbAcceptableFormat,
  defaultDateFormat,
} from "../../../../../config";
import CareInstCustomOption from "../../../components/CustomOptions/CustomCareInstOptions";
import { IReactSelectInterface } from "../../../../../interfaces";
import {
  CareInstitutionQueries,
  InvoiceQueries,
  CareGiverQueries,
} from "../../../../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import moment from "moment";
import InvoiceList from "./InvoiceList";
import CustomOption from "../../../components/CustomOptions";
import InvoiceNavbar from "./InvoiceNavbar";
import * as qs from "query-string";

const [
  GET_CARE_INSTITUTION_LIST,
  ,
  GET_DEPARTMENT_LIST,
  ,
  ,
  ,
] = CareInstitutionQueries;
const [GET_INVOICE_LIST] = InvoiceQueries;
const [, , , , , , , , GET_CAREGIVER_BY_NAME] = CareGiverQueries;

const CreateInvoice: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const { search } = useLocation();
  const query = qs.parse(search);
  // select Careinstitution
  const [careinstitutionFilter, setcareinstitutionFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  // select Careinstitution
  const [caregiverFilter, setcaregiverFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  // select Careinstitution
  const [monthFilter, setmonthFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  const [currentPage, setCurrentPage] = useState<number>(1);

  //   Store selectedDepartment
  const [departmentFilter, setdepartmentFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  //  State for handling date filter
  const [dateFilter, setDateFilter] = useState<string>("");

  // State for department options
  const [
    careInstitutionDepartmentOption,
    setcareInstitutionDepartmentOption,
  ] = useState<IReactSelectInterface[] | undefined>([]);

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
    { data: invoiceList, loading: invoiceListLoading, refetch },
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

  useEffect(() => {
    let activeDate = moment().format(dbAcceptableFormat);
    setDateFilter(activeDate);
  }, []);

  // To fetch the list of all caregiver
  const [fetchCareGivers, { data: careGivers }] = useLazyQuery<any>(
    GET_CAREGIVER_BY_NAME,
    {
      fetchPolicy: "no-cache",
    }
  );
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
  const getInvoiceListData = () => {
    console.log("currentPage",currentPage);
    
    fetchInvoiceList({
      variables: {
        searchBy: null,
        caregiverId:
          caregiverFilter && caregiverFilter.value
            ? parseInt(caregiverFilter.value)
            : null,
        careInstitutionId:
          careinstitutionFilter && careinstitutionFilter.value
            ? parseInt(careinstitutionFilter.value)
            : null,
        divisionId:
          departmentFilter && departmentFilter.value
            ? parseInt(departmentFilter.value)
            : null,
        startDate: gte ? gte : null,
        endDate: lte ? lte : null,
        limit: PAGE_LIMIT,
        page: query.page ? parseInt(query.page as string) : 1,
      },
    });
  };

  useEffect(() => {
    if (query) {
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    getInvoiceListData()
  }, [search]); // It will run when the search value gets changed

  // Call function to fetch invoice list
  useEffect(() => {
    if(monthFilter && monthFilter.value){
      const{ value} = monthFilter
    if(value==="weekly"){
      gte = moment().startOf('week').format(dbAcceptableFormat);
      lte = moment().endOf('week').format(dbAcceptableFormat);
    }else if(value==="everySixMonths"){
      gte = moment().startOf("month").format(dbAcceptableFormat);
      lte= moment(gte).add(6, 'M').endOf('month').format(dbAcceptableFormat);
  }else if(value==="perMonth"){
     gte= moment().startOf("month").format(dbAcceptableFormat);
     lte= moment().endOf("month").format(dbAcceptableFormat);
  }else if(value==="all"){
     gte = "";
     lte = ""
  }
}
    getInvoiceListData();
  }, [careinstitutionFilter, departmentFilter, caregiverFilter,monthFilter]);

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
      if (careInstitutionDepartment && careInstitutionDepartment.length) {
        setcareInstitutionDepartmentOption(careInstitutionDepartment);
      }
    }
  }, [departmentList]);

  // Select careinstitution or caregiver from navbar
  const onhandleSelection = (value: IReactSelectInterface, name: string) => {
    if (name === "careinstitution") {
      setcareinstitutionFilter(value);
    } else if (name === "department") {
      setdepartmentFilter(value);
    } else if (name === "caregiver") {
      setcaregiverFilter(value);
    } else if(name==="monthSummary"){
      setmonthFilter(value)
      
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
    } else {
      setcareInstitutionDepartmentOption([]);
    }
  }, [careinstitutionFilter]);

  const handleDayClick = (selectedDay: any) => {
    let date = moment(selectedDay).format(dbAcceptableFormat);
    setDateFilter(date);
  };

  const handleArrowDayChange = (name: string) => {
    let date: any = "";
    if (name === "previous") {
      date = moment(dateFilter)
        .subtract(1, "months")
        .format(dbAcceptableFormat);
    } else {
      date = moment(dateFilter).add(1, "months").format(dbAcceptableFormat);
    }
    setDateFilter(date);
  };

  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <InvoiceNavbar
            onhandleSelection={onhandleSelection}
            careGiversOptions={careGiversOptions}
            careInstitutionOptions={careInstitutionOptions}
            careinstitutionFilter={careinstitutionFilter}
            careInstitutionDepartmentOption={careInstitutionDepartmentOption}
            departmentFilter={departmentFilter}
            caregiverFilter={caregiverFilter}
            handleDayClick={handleDayClick}
            handleArrowDayChange={handleArrowDayChange}
            dateFilter={dateFilter}
          />

          <div className="common-content flex-grow-1">
            <div className="common-content flex-grow-1  p-0 all-invoice">
              <InvoiceList
                invoiceListLoading={invoiceListLoading}
                currentPage={currentPage}
                invoiceList={
                  invoiceList &&
                    invoiceList.getAllAppointment &&
                    invoiceList.getAllAppointment.result.length
                    ? invoiceList.getAllAppointment.result
                    : []
                }
                totalCount={invoiceList &&
                  invoiceList.getAllAppointment ? invoiceList.getAllAppointment.totalCount : 0}
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
