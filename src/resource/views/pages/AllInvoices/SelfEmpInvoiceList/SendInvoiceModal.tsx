import React, { FunctionComponent } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import "react-day-picker/lib/style.css";
import { FormikProps, Field } from "formik";

const SendInvoiceModal: FunctionComponent<FormikProps<any> &
  any> = (props: any) => {
    const {
      show,
      externalCloseBtn,
      iSubbmitting,
      handleSubmit,
      handleClose,
      selectedInvoice,
      handleSelectInvoice,
      handleSendInvoiceSubmmit
    } = props;
    return (
      <div>
        <Modal isOpen={show} className="common-modal" size="lg" centered>
          <ModalHeader close={externalCloseBtn}>
            Send Invoice To
          </ModalHeader>
          <ModalBody>
            <div className="table-minheight invoices-table">
              <Table bordered hover responsive>
                <thead className="thead-bg">
                  <tr>
                    <th className="careinstitution-col">
                      {languageTranslation("MENU_INSTITUTION")}
                    </th>
                    <th className="invoiceid-col">
                      {" "}
                      {"Select"}{" "}
                    </th>
                    <th className="caregiver-col">
                      {" "}
                      {languageTranslation("MENU_CAREGIVER")}
                    </th>
                    <th className="invoiceid-col">
                      {" "}
                      {"Select"}{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    selectedInvoice && selectedInvoice.length ?
                      selectedInvoice.map((invoiceData: any, index: number) => {
                        console.log("++++++++++++++++++", invoiceData);

                        return (
                          <tr key={index}>
                            <td className="careinstitution-col">
                              {" "}
                              {invoiceData.careInstitutionName}
                            </td>
                            <td className="invoiceid-col">
                              <span className=" checkbox-custom pl-4">
                                <input
                                  type="checkbox"
                                  id="check"
                                  className=""
                                  name={"status"}
                                  onChange={(e: any) => handleSelectInvoice(e, invoiceData, "careInst")}
                                // checked={"true"}
                                />
                                <label />
                              </span>
                            </td>
                            <td className="caregiver-col">
                              {" "}
                              {invoiceData.careGiverName}
                            </td>
                            <td className="invoiceid-col">
                              <span className=" checkbox-custom pl-4">
                                <input
                                  type="checkbox"
                                  id="check"
                                  className=""
                                  name={"status"}
                                  onChange={(e: any) => handleSelectInvoice(e, invoiceData, "careGiver")}
                                // checked={"true"}
                                />
                                <label />
                              </span>
                            </td>
                          </tr>
                        )
                      }) : null
                  }
                </tbody>
              </Table>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={iSubbmitting}
              color="primary"
              onClick={handleSendInvoiceSubmmit}
            >
              {iSubbmitting ? <i className="fa fa-spinner fa-spin mr-2" /> : ""}
              {languageTranslation("SEND_INVOICE")}
            </Button>
            <Button color="secondary" onClick={handleClose}>
              {languageTranslation("CANCEL")}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

export default SendInvoiceModal;