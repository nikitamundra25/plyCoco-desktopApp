import React, { useState, FunctionComponent, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
} from "reactstrap";
import Select from "react-select";
import { languageTranslation } from "../../../../../helpers";
import { RouteComponentProps } from "react-router";
import { StatusOptions, SortOptions, PAGE_LIMIT } from "../../../../../config";
import "../index.scss";
import { InvoiceQueries } from "../../../../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import GeneralTab from "./InvoiceNavBar/general";
import DunningAndExport from "./InvoiceNavBar/dunningAndExport";
import InvoiceListView from "./invoiceList";

const [, GET_ALL_INVOICE_LIST] = InvoiceQueries;

const AllInvoices: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {

  const [tabChange, setTabChange] = useState(1);
  const tabChangehandler = (currentTab: any) => {
    setTabChange(currentTab);
  };

  // To fetch All invoice list
  const [
    fetchAllInvoiceList,
    { data: invoiceList, 
      loading: invoiceListLoading,
       refetch },
  ] = useLazyQuery<any, any>(GET_ALL_INVOICE_LIST, {
    fetchPolicy: "no-cache",
    // notifyOnNetworkStatusChange: true
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedInvoice, setselectedInvoice] = useState<Object[]>([]);

  const getAllInvoiceListData = () => {
    console.log("currentPage", currentPage);

    fetchAllInvoiceList({
      variables: {
        status: "",
        invoiceType: 'selfEmployee',
        sortBy: null,
        limit: PAGE_LIMIT,
        page: 1,
      },
    });
  };

  useEffect(() => {
    // call query
    getAllInvoiceListData()
  }, []); // It will run when the search value gets changed

  const handleCheckedChange = (e: any, invoiceData: any) => {
    const { checked } = e.target
    if (checked === true) {
      selectedInvoice.push(invoiceData)
      setselectedInvoice(selectedInvoice)
    } else {
      const arrayIndex: number = selectedInvoice.findIndex((data: any) => data.id === invoiceData.id)
      selectedInvoice.splice(arrayIndex, 1)
      setselectedInvoice(selectedInvoice)
    }
  }

  const handleShowInvoice = (invoiceType: any) => {
    if (invoiceType === "Plycoco") {
      if (selectedInvoice && selectedInvoice.length) {
        selectedInvoice.forEach((invoiceData: any) => {
          console.log(">>>>>>>>>>>>", invoiceData);
          window.open(`http://78.47.143.190:8000/${invoiceData.plycocoPdf}`, '_blank')
        })
      }
    } else {

    }
  }
  return (
    <>
      <Card>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <div className="common-sidnav">
              <Nav className="common-ul" tabs>
                <li className="nav-item">
                  <a
                    className={`nav-link ${tabChange == 1 ? "active" : ""}`}
                    onClick={() => tabChangehandler(1)}
                  >
                    <span className="nav-text text-capitalize">General</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${tabChange == 2 ? "active" : ""}`}
                    onClick={() => tabChangehandler(2)}
                  >
                    <span className="nav-text text-capitalize">
                      Dunning and export
                    </span>
                  </a>
                </li>
              </Nav>
            </div>
            {tabChange == 1 ? (
              <GeneralTab
                handleShowInvoice={handleShowInvoice}
              />
            ) : (
                <DunningAndExport />
              )}

            <CardBody>
              <div className="filter-form form-section mb-2">
                <Form>
                  <Row>
                    {/* <Col lg={"3"} md={"3"}>
                      <FormGroup>
                        <Label for="search" className="col-form-label">
                          {languageTranslation("SEARCH_LABEL")} :
                        </Label>
                        <Input
                          type="text"
                          name="searchValue"
                          id="search"
                          value={""}
                        />
                      </FormGroup>
                    </Col> */}
                    <Col lg={"2"} md={"3"}>
                      <FormGroup>
                        <Label for="Selectregion" className="col-form-label">
                          {languageTranslation("SORTBY_LABEL")} :
                        </Label>
                        <Select
                          placeholder={languageTranslation(
                            "SORTBY_PLACEHOLDER"
                          )}
                          options={SortOptions}
                          isClearable={true}
                          isSearchable={false}
                          classNamePrefix="custom-inner-reactselect"
                          className={"custom-reactselect"}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={"2"} md={"3"}>
                      <FormGroup>
                        <Label for="Selectregion" className="col-form-label">
                          {languageTranslation("STATUS_LABEL")} :
                        </Label>
                        <Select
                          placeholder={languageTranslation(
                            "STATUS_PLACEHOLDER"
                          )}
                          options={StatusOptions}
                          isClearable={true}
                          isSearchable={false}
                          classNamePrefix="custom-inner-reactselect"
                          className={"custom-reactselect"}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg={"2"} md={"3"}>
                      <div className="label-height"></div>
                      <div className="filter-btn-wrap">
                        <Button
                          className="btn-filter mr-2"
                          type="submit"
                          id="search1"
                        >
                          <i className="fa fa-search"></i>
                          <span className="search-text">
                            {languageTranslation("SEARCH_LABEL")}
                          </span>
                        </Button>
                        <Button className="btn-filter mr-2" id="reset">
                          <i className="fa fa-refresh "></i>
                          <span className="search-text">
                            {languageTranslation("RESET_LABEL")}
                          </span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="common-content flex-grow-1  p-0 all-invoice">
                <InvoiceListView
                  invoiceList={invoiceList}
                  currentPage={currentPage}
                  handleCheckedChange={handleCheckedChange}
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
            </CardBody>
          </div>
        </div>
      </Card>
    </>
  );
};
export default AllInvoices;
