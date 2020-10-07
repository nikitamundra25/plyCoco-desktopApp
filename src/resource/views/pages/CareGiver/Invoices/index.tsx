import React, { FunctionComponent, useState, useEffect } from "react";
import { Table, UncontrolledTooltip,
  FormGroup,
  Label,
  Input,
  Col,
  Row } from "reactstrap";
import { useParams } from "react-router-dom";
import * as qs from "query-string";
import { toast } from "react-toastify";
import moment from "moment";
import { useLocation, useHistory } from "react-router";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  AppRoutes,
  PAGE_LIMIT,
  defaultDateFormat,
  AppConfig,
} from "../../../../../config";
import { languageTranslation, logger } from "../../../../../helpers";
import { IPycButtonProps } from "../../../../../interfaces";
import Loader from "../../../containers/Loader/Loader";
import { CareGiverQueries } from "../../../../../graphql/queries";
import { CareGiverMutations, InvoiceMutations } from "../../../../../graphql/Mutations";
import { ConfirmBox } from "../../../components/ConfirmBox";
import PaginationComponent from "../../../components/Pagination";
import PycModal from "../../../components/PycModal";
import "../caregiver.scss";

const [, , , , , , , , , CANCEL_INVOICE] = CareGiverMutations
const [, , , , , , , , , GET_INVOICE_BY_USERID] = CareGiverQueries;
const [, , , UPDATE_INVOICE_COMMENT] = InvoiceMutations;
let toastId: any = "";

const Invoices: FunctionComponent = () => {
  let history = useHistory();
  const { search, pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [activeRow, setActiveRow] = useState<number>(-1);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [inputs, setInputs] = useState<{
    id:number|null,
    comment:string
  }>({
    id:null,
    comment:''
  })

  let { id }:any = useParams();

  // To get invoice list from db
  const [
    getInvoiceByUserId,
    { data,
      called,
      loading,
      refetch }] = useLazyQuery<any, any
      >(GET_INVOICE_BY_USERID
      //   , {
      //   fetchPolicy: "no-cache",
      // }
      );

  // Mutation to add/update comments on invoice
  const [updateRemarkToInvoice, {loading:isUpdating}] = useMutation<any, any>(UPDATE_INVOICE_COMMENT,{
    onCompleted: () => {
      setOpen(false);
      toast.success(languageTranslation("REMARK_ADDED_SUCCESSFULLY"))
    }
  })



  // Mutation to Cancel Invoice caregiver
  const [cancelInvoice] = useMutation<any, any>(CANCEL_INVOICE);

  useEffect(() => {
    // call query
    getInvoiceByUserId({
      variables: {
        userId: id
      },
    });
  }, [id]); // It will run when the search value gets changed

  const onPageChanged = (currentPage: number) => {
    const query = qs.parse(search);
    const path = [pathname, qs.stringify({ ...query, page: currentPage })].join(
      '?',
    );
    history.push(path);
  };
  
  const onCancelInvoice = async (id: string, invoiceType: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_INVOICE_CANCEL_MSG"),
    });
    if (!value) {
      return;
    } else {
      await cancelInvoice({
        variables: {
          invoiceInput: {
            invoiceId: parseInt(id),
            status: "cancellation",
            invoiceType: invoiceType
          }
        },
      });
      refetch();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("INVOICE_IS_CANCELLED"));
      }
    }
  };
  const updateRemark = () => {
    updateRemarkToInvoice({
      variables: { 
        invoiceInput: inputs
      }
    });
  }
  const handleInpuChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    const {target:{ value }} = event
    setInputs((inputs:any) => ({
      ...inputs,
      comment:value
    }))
  }
  const openCommentBox = (id:number, comment:string) => { 
    setOpen(true);
    setInputs({
      id,
      comment:comment
    })
  }
  const handleClose = () => {
    setOpen(false);
  }
  const expandedText = (index: number) => {
    setIsExpand(activeRow === index || activeRow === -1 ? !isExpand : isExpand);
    setActiveRow(activeRow === index ? -1 : index);
  };
  const footerButtons: IPycButtonProps[] = [{
      text: languageTranslation('SUBMIT'),
      color: 'primary',
      onClick: updateRemark,
      loading: isUpdating,
      type: 'submit'
    }
  ];
  let count = (currentPage - 1) * PAGE_LIMIT + 1;
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
                  <th className="invoiceid-col">
                    {languageTranslation("INVOICES_STATUS")}{" "}
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
                  data.getInvoiceByUserId.result &&
                  data.getInvoiceByUserId.result.length ? (
                      data.getInvoiceByUserId.result.map(
                        (invoiceData: any, index: number) => {
                          const replaceObj: any = {
                            ":id": invoiceData.id,
                            ":userName": invoiceData.userName,
                          };
                          return (
                            <tr key={count++}>
                              <td className="sno-col"> {index} </td>
                              <td className="invoiceid-col">{invoiceData.invoiceNumber}</td>
                              <td className="invoiceid-col">{invoiceData.status}</td>
                              <td className="cancellation-col"> {invoiceData.cancelledFor ? invoiceData.cancelledFor : "-"} </td>
                              <td className="cancel-col"> {invoiceData.cancelledBy ? invoiceData.cancelledBy : "-"}   </td>
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
                                    {[invoiceData.careinstitution.firstName, invoiceData.careinstitution.lastName].join(' ')}
                                  </div> : null}

                              </td>
                              <td className="date-col">{invoiceData.invoiceDate ? moment(invoiceData.invoiceDate).format(defaultDateFormat) : '-'}</td>
                              <td className="amount-col">{invoiceData.amount}</td>
                              <td className="vat-col">{invoiceData.tax}</td>
                              <td className="due-date-col">{invoiceData.dueDate ? moment(invoiceData.dueDate).format(defaultDateFormat) : '-'}</td>
                              <td className="factoring-col">
                                <span className="checkbox-custom ">
                                  <input type="checkbox" id="checkAll" className="" />
                                  <label className=""> </label>
                                </span>
                              </td>
                              <td className="sent-col"> - </td>
                              <td className='remark-col'>
                    {invoiceData.comment ? (
                      invoiceData.comment.length <= 100 ? (
                        invoiceData.comment
                      ) : (
                        <p className='mb-0'>
                          {isExpand && activeRow === index
                            ? invoiceData.comment
                            : invoiceData.comment.substr(0, 100)}
                          ...
                          <span
                            className='view-more-link'
                            onClick={() => expandedText(index)}
                          >
                            {isExpand && activeRow === index
                              ? 'Read less'
                              : 'Read more'}
                          </span>
                        </p>
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                             <td className="action-col">
                                <div className="action-btn">
                                  <span className="btn-icon mr-2" id={`open`} onClick={() =>
                          window.open(
                            `${AppConfig.FILES_ENDPOINT}/${invoiceData.plycocoPdf}`,
                            '_blank'
                          )
                        }>
                                    <UncontrolledTooltip placement="top" target={`open`}>
                                      {languageTranslation("OPEN_INVOICE")}
                        </UncontrolledTooltip>
                                    <i className="fa fa-eye"></i>
                                  </span>
                                  <span className="btn-icon mr-2" id={`new`}>
                                    <UncontrolledTooltip placement="top" target={`new`}>
                                      {languageTranslation("CREATE_NEW_INVOICE")}
                        </UncontrolledTooltip>
                                    <i className="fa fa-pencil"></i>
                                  </span>
                                  <span className="btn-icon mr-2" id={`comment${index}`} onClick={() => openCommentBox(parseInt(invoiceData.id), invoiceData.comment)}>
                                    <UncontrolledTooltip placement="top" target={`comment${index}`}>
                                      {languageTranslation("ADD_COMMENT_TO_INVOICE")}
                                    </UncontrolledTooltip>
                                    <i className="fa fa-comment" aria-hidden="true"></i>
                                  </span>
                                  <span
                                    id={`cancel${index}`}
                                    className="btn-icon mr-2"
                                    onClick={() => onCancelInvoice(invoiceData.id, invoiceData.invoiceType)}
                                  >
                                    <UncontrolledTooltip placement="top" target={`cancel${index}`}>
                                      {languageTranslation("CANCEL_INVOICE")}
                        </UncontrolledTooltip>
                                    <i className="fa fa-times"></i>
                                  </span>

                                  <span className="btn-icon mr-2" id={`replace`}>
                                    <UncontrolledTooltip placement="top" target={`replace`}>
                                      {languageTranslation("REPLACE_INVOICE")}
                        </UncontrolledTooltip>
                                    <i className="fa fa-refresh"></i>
                                  </span>
                                  <span className="btn-icon " id={`resend`}>
                                    <UncontrolledTooltip placement="top" target={`resend`}>
                                     {languageTranslation("SEND_INVOICE_TO_CAREINST")}
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
                        <td colSpan={14} className={"pt-5 pb-5"}>
                          <div className="no-data-section">
                            <div className="no-data-icon">
                              <i className="icon-ban" />
                            </div>
                            <h4 className="mb-1">
                              {languageTranslation("NO_INVOICE_FOUND")}{" "}
                            </h4>
                          </div>
                        </td>
                      </tr>
                    )}
              </tbody>
            </Table>
            <PycModal
            isOpen={isOpen}
            size={'sm'}
            handleClose={handleClose}
            headerText={
              languageTranslation('INVOICE_COMMENT_HEADING')
            }
            footerButtons={footerButtons}
          >
          <div className='form-section forms-main-section'>
                <Row>
                  <Col lg={'12'}>
                    <FormGroup>
                      <Label className='form-label col-form-label mb-1'>
                        {languageTranslation('REMARKS')}
                      </Label>
                      <Input
                        type='textarea'
                        name={'comment'}
                        className='textarea-custom'
                        rows={4}
                        value={inputs && inputs.comment ? inputs.comment : ''}
                        onChange={handleInpuChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
          </PycModal>
          </div>
        </div>
        {data && data.getInvoiceByUserId && data.getInvoiceByUserId.totalCount ? (
          <PaginationComponent
            totalRecords={data.getInvoiceByUserId.totalCount}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        ) : null}
      </div>
    </>
  );
};

export default Invoices;
