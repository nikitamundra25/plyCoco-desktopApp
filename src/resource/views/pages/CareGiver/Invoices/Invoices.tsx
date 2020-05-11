import React, { FunctionComponent, useState, useEffect } from "react";
import { Table, UncontrolledTooltip } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import * as qs from "query-string";
import { toast } from "react-toastify";
import moment from "moment";
import { useLocation, useHistory } from "react-router";
import { AppBreadcrumb } from "@coreui/react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { FormikHelpers, Formik, FormikProps } from "formik";
import {
  AppRoutes,
  PAGE_LIMIT,
  sortFilter,
  defaultDateTimeFormat,
} from "../../../../../config";
import routes from "../../../../../routes/routes";
import Search from "../../../components/SearchFilter";
import ButtonTooltip from "../../../components/Tooltip/ButtonTooltip";
import { languageTranslation, errorFormatter } from "../../../../../helpers";
import { ISearchValues, IReactSelectInterface } from "../../../../../interfaces";
import { ConfirmBox } from "../../../components/ConfirmBox";
import PaginationComponent from "../../../components/Pagination";
import Loader from "../../../containers/Loader/Loader";
import { NoSearchFound } from "../../../components/SearchFilter/NoSearchFound";
import { CareGiverQueries } from "../../../../../graphql/queries";
import { CareGiverMutations } from "../../../../../graphql/Mutations";
import "../caregiver.scss";

const [, , , , , , , , , , CANCEL_INVOICE] = CareGiverMutations
const [, , , , , , , , , GET_INVOICE_BY_USERID] = CareGiverQueries;
let toastId: any = "";

const Invoices: FunctionComponent = () => {

  let history = useHistory();
  const { search, pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [readMore, setreadMore] = useState<boolean>(false);
  // const [readMoreIndex, setreadMoreIndex] = useState<number>(-1);

  // Mutation to delete caregiver
  const [cancelInvoice] = useMutation<any, any>(CANCEL_INVOICE);
  
  let { id } = useParams();
  const Id: any | undefined = id;
  console.log('ididid', id)

  // To get invoice list from db
  const [
    getInvoiceByUserId,
    { data,
      called,
      loading,
      refetch }] = useLazyQuery<any, any
      >(GET_INVOICE_BY_USERID, {
        fetchPolicy: "no-cache",
      });

  console.log('datadata', data)
  console.log('loadingloading', loading)

  useEffect(() => {
    // call query
    getInvoiceByUserId({
      variables: {
        userId: id
      },
    });
  }, []); // It will run when the search value gets changed

  // const onCancelInvoice = async (id: string) => {
  //   const { value } = await ConfirmBox({
  //     title: languageTranslation("CONFIRM_LABEL"),
  //     text: languageTranslation("CONFIRM_CAREGIVER_DELETE_MSG"),
  //   });
  //   if (!value) {
  //     return;
  //   } else {
  //     await cancelInvoice({
  //       variables: {
  //         invoiceId:parseInt(id),
  //         status: "cancellation",
  // 	      invoiceType:"selfEmployee"
  //       },
  //     });
  //     refetch();
  //     if (!toast.isActive(toastId)) {
  //       toastId = toast.success(languageTranslation("CAREGIVER_MOVE_TO_TRASH"));
  //     }
  //   }
  // };

  return (
    <>
      <div className="invoice-section">
        <div>
          <h5 className="content-title">{languageTranslation("INVOICES")}</h5>
          <div className="table-minheight ">
            <Table responsive bordered hover className="invoice-table">
              <thead className="thead-bg">
                <tr>
                  <th className="sno-col">{languageTranslation("S_NO")} </th>
                  <th className="invoiceid-col">
                    {languageTranslation("INVOICES_NUMBER")}{" "}
                  </th>
                  <th className="cancellation-col">
                    {" "}
                    {languageTranslation("CANCELLATION_FOR")}
                  </th>
                  <th className="cancel-col">
                    {" "}
                    {languageTranslation("CANCELLED_BY")}
                  </th>
                  <th className="careinstitution-col">
                    {" "}
                    {languageTranslation("MENU_INSTITUTION")}
                  </th>
                  <th className="date-col">{languageTranslation("DATE")} </th>
                  <th className="amount-col">
                    {languageTranslation("AMOUNT")}
                  </th>
                  <th className="vat-col">{languageTranslation("VAT")}</th>
                  <th className="due-date-col">
                    {" "}
                    {languageTranslation("DUE_DATE")}{" "}
                  </th>
                  <th className="factoring-col">
                    {languageTranslation("FACTORING")}
                  </th>
                  <th className="sent-col">{languageTranslation("SENT_BF")}</th>
                  <th className="remarks-col">
                    {" "}
                    {languageTranslation("REMARKS")}{" "}
                  </th>

                  <th className="action-col text-center">
                    {" "}
                    {languageTranslation("TABEL_HEAD_CG_ACTION")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {!called || loading ? (
                  <tr>
                    <td className={"table-loader"} colSpan={8}>
                      <Loader />
                    </td>
                  </tr>
                ) : data &&
                  data.getInvoiceByUserId &&
                  data.getInvoiceByUserId &&
                  data.getInvoiceByUserId.length ? (
                      data.getInvoiceByUserId.map(
                        (invoiceData: any, index: number) => {
                          const replaceObj: any = {
                            ":id": invoiceData.id,
                            ":userName": invoiceData.userName,
                          };
                          return (
                            <tr key={index}>
                              <td className="sno-col"> {index} </td>
                              <td className="invoiceid-col">{invoiceData.invoiceNumber}</td>
                              <td className="cancellation-col"> - </td>
                              <td className="cancel-col"> - </td>
                              <td className="careinstitution-col">

                                {invoiceData.careinstitution ?
                                  <div
                                    className="text-capitalize view-more-link  one-line-text"
                                    onClick={() =>
                                      history.push(
                                        AppRoutes.CARE_INSTITUION_VIEW.replace(
                                          /:id/gi,
                                          invoiceData.careinstitution.id
                                        )
                                      )
                                    }
                                  >
                                    {invoiceData.careinstitution.userName}
                                  </div> : null}

                              </td>
                              <td className="date-col">{invoiceData.createdAt}</td>
                              <td className="amount-col">{invoiceData.amount}</td>
                              <td className="vat-col">{invoiceData.tax}</td>
                              <td className="due-date-col">{invoiceData.dueDate}</td>
                              <td className="factoring-col">
                                <span className="checkbox-custom ">
                                  <input type="checkbox" id="checkAll" className="" />
                                  <label className=""> </label>
                                </span>
                              </td>
                              <td className="sent-col"> - </td>
                              <td className="remarks-col word-wrap"> {invoiceData.remarks}</td>
                              <td className="action-col">
                                <div className="action-btn">
                                  <span className="btn-icon mr-2" id={`open`}>
                                    <UncontrolledTooltip placement="top" target={`open`}>
                                      Open Invoice
                        </UncontrolledTooltip>
                                    <i className="fa fa-eye"></i>
                                  </span>
                                  <span className="btn-icon mr-2" id={`new`}>
                                    <UncontrolledTooltip placement="top" target={`new`}>
                                      Create New Invoice
                        </UncontrolledTooltip>
                                    <i className="fa fa-pencil"></i>
                                  </span>

                                  <span className="btn-icon mr-2" id={`cancel`}>
                                    <UncontrolledTooltip placement="top" target={`cancel`}>
                                      Cancel Invoice
                        </UncontrolledTooltip>
                                    <i className="fa fa-times"></i>
                                  </span>

                                  <span className="btn-icon mr-2" id={`replace`}>
                                    <UncontrolledTooltip placement="top" target={`replace`}>
                                      Replace Invoice
                        </UncontrolledTooltip>
                                    <i className="fa fa-refresh"></i>
                                  </span>
                                  <span className="btn-icon " id={`resend`}>
                                    <UncontrolledTooltip placement="top" target={`resend`}>
                                      Send the invoice to the care institution again
                        </UncontrolledTooltip>
                                    <i className="fa fa-reply"></i>
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr className={"text-center no-hover-row"}>
                        <td colSpan={8} className={"pt-5 pb-5"}>
                          <div className="no-data-section">
                            <div className="no-data-icon">
                              <i className="icon-ban" />
                            </div>
                            <h4 className="mb-1">
                              {languageTranslation("NO_CAREGIVER_ADDED")}{" "}
                            </h4>
                            <p>
                              {languageTranslation("CLICK_ABOVE_TO_ADD_NEW")}{" "}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
              </tbody>

            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoices;
