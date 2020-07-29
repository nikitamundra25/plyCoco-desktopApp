import React, { useState, FunctionComponent, useEffect } from "react";
import { Card, Nav } from "reactstrap";
import { RouteComponentProps } from "react-router";
import ".././index.scss";
import SolonaList from "./SolonaList";
import { InvoiceQueries } from "../../../../../graphql/queries";
import { PAGE_LIMIT, AppConfig } from "../../../../../config";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import SolonaNavBar from "./SolonaNavBar";
import SendInvoiceModal from "../SelfEmpInvoiceList/SendInvoiceModal";
import { InvoiceMutations } from "../../../../../graphql/Mutations";
import { toast } from "react-toastify";
import { languageTranslation, errorFormatter } from "../../../../../helpers";

const [, GET_ALL_INVOICE_LIST] = InvoiceQueries;
const [, , SEND_INVOICE_DATA] = InvoiceMutations;
let toastId: any = null;

const InvoiceSolona: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  // To fetch All invoice list
  const [
    fetchAllInvoiceList,
    { data: invoiceList, loading: invoiceListLoading, refetch },
  ] = useLazyQuery<any, any>(GET_ALL_INVOICE_LIST, {
    fetchPolicy: "no-cache",
  });

  const [selectedAppointment, setselectedAppointment] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openSendInvoice, setopenSendInvoice] = useState(false);
  const [selectedInvoice, setselectedInvoice] = useState<Object[]>([]);

  const [sendselectedInvoice, setsendselectedInvoice] = useState<any>({
    careinstitution: [],
    careGiver: [],
  });

  //Send Invoice data
  const [SendInvoice, { loading: sendInvoiceLoading }] = useMutation<{
    sendInvoiceInput: any;
  }>(SEND_INVOICE_DATA, {
    onCompleted() {
      setopenSendInvoice(false);
      setsendselectedInvoice({ careinstitution: [], careGiver: [] });
      toast.dismiss();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("SEND_INVOICE_SUCCESS"));
      }
    },
  });

  // console.log('++++++++++++++++++++', invoiceList);
  const getAllInvoiceListData = () => {
    console.log("currentPage", currentPage);

    fetchAllInvoiceList({
      variables: {
        status: "",
        invoiceType: "leasing",
        sortBy: null,
        limit: PAGE_LIMIT,
        page: 1,
      },
    });
  };
  useEffect(() => {
    // call query
    getAllInvoiceListData();
  }, []);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [tabChange, setTabChange] = useState(1);
  const tabChangehandler = (currentTab: any) => {
    setTabChange(currentTab);
  };

  const handleCheckedChange = (e: any, invoiceData: any) => {
    const { checked } = e.target;
    if (checked === true) {
      selectedInvoice.push(invoiceData);
      setselectedInvoice(selectedInvoice);
    } else {
      const arrayIndex: number = selectedInvoice.findIndex(
        (data: any) => data.id === invoiceData.id
      );
      selectedInvoice.splice(arrayIndex, 1);
      setselectedInvoice(selectedInvoice);
    }
  };

  const handleSendInvoiceModal = () => {
    console.log("This this function", openSendInvoice);
    if (openSendInvoice) {
      setsendselectedInvoice({ careinstitution: [], careGiver: [] });
    }
    setopenSendInvoice(!openSendInvoice);
  };

  const handleSelectInvoice = (
    e: any,
    invoiceData: any,
    selectedType: string
  ) => {
    const { checked } = e.target;
    if (checked === true) {
      const careInstData: object[] = [];
      const careGiverData: object[] = [];
      if (selectedType === "careInst") {
        sendselectedInvoice.careinstitution.push({
          email: invoiceData.careinstitution.email,
          invoicePdf: invoiceData.plycocoPdf,
          name: invoiceData.careInstitutionName,
          id: invoiceData.careinstitution.id,
        });
      } else {
        sendselectedInvoice.careGiver.push({
          email: invoiceData.caregiver.email,
          invoicePdf: invoiceData.careGiverPdf,
          name: invoiceData.careGiverName,
          id: invoiceData.caregiver.id,
        });
      }
      setsendselectedInvoice(sendselectedInvoice);
    } else {
      let arrayIndex: number;
      if (selectedType === "careInst") {
        arrayIndex = sendselectedInvoice.careinstitution.findIndex(
          (data: any) => data.email === invoiceData.email
        );
        sendselectedInvoice.careinstitution.splice(arrayIndex, 1);
        setsendselectedInvoice(sendselectedInvoice);
      } else {
        arrayIndex = sendselectedInvoice.careGiver.findIndex(
          (data: any) => data.email === invoiceData.email
        );
        sendselectedInvoice.careinstitution.splice(arrayIndex, 1);
        setsendselectedInvoice(sendselectedInvoice);
      }
    }
  };

  const handleSendInvoiceSubmmit = async () => {
    try {
      if (
        sendselectedInvoice &&
        ((sendselectedInvoice.careGiver &&
          sendselectedInvoice.careGiver.length) ||
          (sendselectedInvoice.careinstitution &&
            sendselectedInvoice.careinstitution.length))
      ) {
        await SendInvoice({
          variables: {
            sendInvoiceInput: sendselectedInvoice,
          },
        });
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  };

  const handleShowInvoice = () => {
    if (selectedInvoice && selectedInvoice.length) {
      selectedInvoice.forEach((invoiceData: any) => {
        console.log(">>>>>>>>>>>>", invoiceData);
        window.open(
          `${AppConfig.FILES_ENDPOINT}${invoiceData.plycocoPdf}`,
          "_blank"
        );
      });
    }
  };

  return (
    <>
      <Card>
        <div className="common-detail-page">
          <div className="common-detail-section">
            <SolonaNavBar
              tabChange={tabChange}
              tabChangehandler={tabChangehandler}
              options={options}
              handleSendInvoiceModal={handleSendInvoiceModal}
              handleShowInvoice={handleShowInvoice}
            />
            <SolonaList
              handleCheckedChange={(e: any, list: any) =>
                handleCheckedChange(e, list)
              }
              currentPage={currentPage}
              invoiceList={
                invoiceList &&
                invoiceList.getInvoices &&
                invoiceList.getInvoices.result.length
                  ? invoiceList.getInvoices.result
                  : []
              }
            />
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
export default InvoiceSolona;
