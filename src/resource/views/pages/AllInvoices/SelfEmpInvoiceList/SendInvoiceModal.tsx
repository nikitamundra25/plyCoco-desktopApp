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
      isSubmitting,
      handleSubmit,
      handleClose,
      selectedInvoice
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
                                //onChange={(e: any) => handleCheckedChange(e, invoiceData)}
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
                                //onChange={(e: any) => handleCheckedChange(e, invoiceData)}
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
              disabled={isSubmitting}
              color="primary"
              onClick={handleSubmit}
            >
              {isSubmitting ? <i className="fa fa-spinner fa-spin mr-2" /> : ""}
              Send Invoice
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