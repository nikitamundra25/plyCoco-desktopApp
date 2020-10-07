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
import { languageTranslation, errorFormatter } from "../../../../../helpers";
import { RouteComponentProps,useLocation } from "react-router";
import { StatusOptions, SortOptions, ARCHIVE_PAGE_LIMIT, AppConfig } from "../../../../../config";
import "../index.scss";
import { InvoiceQueries } from "../../../../../graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import GeneralTab from "./InvoiceNavBar/general";
import DunningAndExport from "./InvoiceNavBar/dunningAndExport";
import InvoiceListView from "./invoiceList";
import SendInvoiceModal from "./SendInvoiceModal"
import { InvoiceMutations } from "../../../../../graphql/Mutations";
import { toast } from "react-toastify";
import * as qs from 'query-string';

const [, GET_ALL_INVOICE_LIST] = InvoiceQueries;
const [, , SEND_INVOICE_DATA] = InvoiceMutations;
let toastId: any = null;


const AllInvoices: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  const { search } = useLocation();
  const query = qs.parse(search);
  const [tabChange, setTabChange] = useState(1); 
  // state for handling send invoice modal
  const [openSendInvoice, setopenSendInvoice] = useState(false);

  const tabChangehandler = (currentTab: any) => {
    setTabChange(currentTab);
  };

  //Send Invoice data
  const [SendInvoice, { loading: sendInvoiceLoading }] = useMutation<
    {
      sendInvoiceInput: any;
    }
  >(SEND_INVOICE_DATA, {
    onCompleted() {
      setopenSendInvoice(false)
      setsendselectedInvoice({ careinstitution: [], careGiver: [] })
      toast.dismiss();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('SEND_INVOICE_SUCCESS')
        );
      }
    }
  });

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
  const [sendselectedInvoice, setsendselectedInvoice] = useState<any>({ careinstitution: [], careGiver: [] });

  const getAllInvoiceListData = () => {

    fetchAllInvoiceList({
      variables: {
        status: "",
        invoiceType: 'selfEmployee',
        sortBy: null,
        limit: ARCHIVE_PAGE_LIMIT,
        page: 1,
      },
    });
  };

  useEffect(() => {
    // call query
    getAllInvoiceListData()
  }, []); // It will run when the search value gets changed

  useEffect(() => {
    if (query) {
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    getAllInvoiceListData();
  }, [search]); // It will run when the search value gets changed

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
          window.open(`${AppConfig.FILES_ENDPOINT}${invoiceData.plycocoPdf}`, '_blank')
        })
      }
    } else {
      if (selectedInvoice && selectedInvoice.length) {
        selectedInvoice.forEach((invoiceData: any) => {
          window.open(`${AppConfig.FILES_ENDPOINT}${invoiceData.careGiverPdf}`, '_blank')
        })
      }
    }
  }
  const handleSendInvoiceModal = () => {
    if (openSendInvoice) {
      setsendselectedInvoice({ careinstitution: [], careGiver: [] })
    }
    setopenSendInvoice(!openSendInvoice)
  }
  const handleSelectInvoice = (e: any, invoiceData: any, selectedType: string) => {
    const { checked } = e.target
    if (checked === true) {
      if (selectedType === 'careInst') {
        sendselectedInvoice.careinstitution.push({
          email: invoiceData.careinstitution.email,
          invoicePdf: invoiceData.plycocoPdf,
          name: invoiceData.careInstitutionName,
          id: invoiceData.careinstitution.id
        })
      } else {
        sendselectedInvoice.careGiver.push({
          email: invoiceData.caregiver.email,
          invoicePdf: invoiceData.careGiverPdf,
          name: invoiceData.careGiverName,
          id: invoiceData.caregiver.id
        })
      }
      setsendselectedInvoice(sendselectedInvoice)
    } else {
      let arrayIndex: number
      if (selectedType === 'careInst') {
        arrayIndex = sendselectedInvoice.careinstitution.findIndex((data: any) => data.email === invoiceData.email)
        sendselectedInvoice.careinstitution.splice(arrayIndex, 1)
        setsendselectedInvoice(sendselectedInvoice)
      } else {
        arrayIndex = sendselectedInvoice.careGiver.findIndex((data: any) => data.email === invoiceData.email)
        sendselectedInvoice.careinstitution.splice(arrayIndex, 1)
        setsendselectedInvoice(sendselectedInvoice)
      }
    }
  }

  // Handle Subbmit Invoice Data
  const handleSendInvoiceSubmmit = async () => {
    try {
      if (sendselectedInvoice && ((sendselectedInvoice.careGiver && sendselectedInvoice.careGiver.length) || (sendselectedInvoice.careinstitution && sendselectedInvoice.careinstitution.length))) {
        await SendInvoice({
          variables: {
            sendInvoiceInput: sendselectedInvoice
          },
        });
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
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
                    <span className="nav-text text-capitalize">{languageTranslation("GENERAL")}</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${tabChange == 2 ? "active" : ""}`}
                    onClick={() => tabChangehandler(2)}
                  >
                    <span className="nav-text text-capitalize">
                      {languageTranslation("DUNNING_EXPORT")}
                    </span>
                  </a>
                </li>
              </Nav>
            </div>
            {tabChange == 1 ? (
              <GeneralTab
                handleShowInvoice={handleShowInvoice}
                handleSendInvoiceModal={handleSendInvoiceModal}
              />
            ) : (
                <DunningAndExport />
              )}

            <CardBody>
              <div className="filter-form form-section mb-2">
                <Form>
                  <Row>
                    
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
                  invoiceListLoading={invoiceListLoading}
                  currentPage={currentPage}
                  totalCount={
                    invoiceList && invoiceList.getInvoices
                      ? invoiceList.getInvoices.totalCount
                      : 0
                  }
                  handleCheckedChange={handleCheckedChange}
                />
                <Form className="form-section total-form-section bg-white">
                  <div className="d-flex flex-wrap total-form-block">
                    <Col xs={"12"} sm={"6"} md={"6"} lg={"6"}>
                      <FormGroup>
                        <Row className="align-items-center">
                          <Col xs={"12"} sm={"4"} md={"4"} lg={"4"}>
                            <Label className="form-label col-form-label">
                              {languageTranslation("TOTAL")}
                            </Label>
                          </Col>
                          <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                            <div className="required-input">
                              <Input
                                type="text"
                                name={"firstName"}
                                placeholder={languageTranslation("ENTER_TOTAL")}
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
                              {languageTranslation("TOTAL_SELECTION")}
                            </Label>
                          </Col>
                          <Col xs={"12"} sm={"8"} md={"8"} lg={"8"}>
                            <div className="required-input">
                              <Input
                                type="text"
                                name={"firstName"}
                                placeholder={languageTranslation("ENTER_TOTAL_SELECTION")}
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
      <SendInvoiceModal
        show={openSendInvoice}
        selectedInvoice={selectedInvoice}
        handleClose={handleSendInvoiceModal}
        handleSelectInvoice={handleSelectInvoice}
        handleSendInvoiceSubmmit={handleSendInvoiceSubmmit}
        iSubbmitting={sendInvoiceLoading}
      />
    </>
  );
};
export default AllInvoices;
