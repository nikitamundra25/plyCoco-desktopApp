import React, { FunctionComponent, useState } from "react";
import { Table, Button, Input, UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import { languageTranslation } from "../../../../../helpers";
const DocumentsList: FunctionComponent<any> = (props: any) => {
  return (
    <>
      <div className="document-upload-section mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="content-title mb-3">
            {languageTranslation("CG_SUB_MENU_DOCUMENTS")}
          </h5>
          <Button
            onClick={() => props.setShowDocumentPopup(true)}
            className="btn-common mb-3"
            color="primary"
          >
            {languageTranslation("UPLOAD_DOCUMENT")}
          </Button>
        </div>

        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="sno-th-column">{languageTranslation("S_NO")}</th>
              <th className="date-th-column">{languageTranslation("DATE")}</th>
              <th className="file-th-column">
                {languageTranslation("FILE_NAME")}
              </th>
              <th className="filetype-th-column">
                {languageTranslation("TYPE")}
              </th>
              <th>{languageTranslation("REMARKS")}</th>
              <th className="checkbox-th-column ">
                {languageTranslation("CHECKED")}
              </th>
              <th className="filesize-th-column">
                {languageTranslation("FILE_SIZE")}
              </th>
              <th className={"text-center action-th-column"}>
                {languageTranslation("TABEL_HEAD_CG_ACTION")}
              </th>
            </tr>
          </thead>
          {props && props.documentListing && props.documentListing.getDocuments
            ? props.documentListing.getDocuments.map(
                (list: any, index: number) => {
                  // props.setDocumentId(list.id)
                  return (
                    <tr
                      key={index}
                      className={
                        list.status === "approve"
                          ? "approve-bg"
                          : "table-danger"
                      }
                    >
                      <td>{index + 1}</td>
                      <td>
                        {list && list.createdAt
                          ? moment(list.createdAt).format("lll")
                          : "-"}
                      </td>
                      <td>
                        <a href="#">
                          {list && list.fileName ? list.fileName : "-"}
                        </a>
                      </td>
                      <td>
                        <span>
                          {list && list.documentType ? list.documentType : "-"}
                        </span>
                      </td>
                      <td>{list && list.remarks ? list.remarks : "-"}</td>
                      <td className="text-center">
                        <span className="checkboxli checkbox-custom checkbox-default">
                          <input
                            type="checkbox"
                            checked={
                              props.documentId &&
                              props.documentId.id === list.id
                                ? props.documentId.checked
                                : list.status === "approve"
                                ? true
                                : false
                            }
                            onChange={(e: any) => {
                              props.handleCheckElement(e, list.id, list.status);
                            }}
                            className=""
                          />
                          <label className=""></label>
                        </span>
                        {/* <Input
                          type='checkbox'
                          checked={
                            props.documentId && props.documentId.id === list.id
                              ? props.documentId.checked
                              : list.status === 'approve'
                              ? true
                              : false
                          }
                          onChange={(e: any) => {
                            props.handleCheckElement(e, list.id, list.status);
                          }}
                        /> */}
                      </td>

                      <td>{list && list.fileSize ? list.fileSize : "-"}</td>
                      <td>
                        <div className="action-btn">
                          <span id={`edit${index}`} className="btn-icon mr-2">
                            <UncontrolledTooltip
                              placement={"top"}
                              target={`edit${index}`}
                            >
                              {languageTranslation("DOCUMENT_EDIT")}
                            </UncontrolledTooltip>
                            <i className="fa fa-pencil"></i>
                          </span>

                          <span id={`delete${index}`} className="btn-icon mr-2">
                            <UncontrolledTooltip
                              placement={"top"}
                              target={`delete${index}`}
                            >
                              {languageTranslation("DOCUMENT_DELETE")}
                            </UncontrolledTooltip>
                            <i className="fa fa-trash"></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            : null}
        </Table>
      </div>
    </>
  );
};
export default DocumentsList;
