import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  UncontrolledTooltip,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { DocumentMutations } from "../../../../../graphql/Mutations";

import moment from "moment";
import Select from "react-select";
import { languageTranslation, formatFileSize } from "../../../../../helpers";
import { AppConfig, defaultDateTimeFormat } from "../../../../../config";

import Loader from "../../../containers/Loader/Loader";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { DocumentQueries } from "../../../../../graphql/queries";
import { toast } from "react-toastify";
const [, , , , , , ADD_DOCUMENT_TYPE_CAREINST] = DocumentMutations;
let toastId: any = "";
const ExplicitDocument: FunctionComponent<any> = (props: any) => {
  const {
    documentTypeList,
    userId,
    onDeleteDocumentTypes,
    addedDocumentType,
    setaddedDocumentType,
    handleDocumentType,
  } = props;
  //Add document type
  const [addDocumentType] = useMutation<any>(ADD_DOCUMENT_TYPE_CAREINST, {
    onCompleted({ addDocument }) {
      // refetch();
      toast.dismiss();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation("DOCUMENT_TYPE_ADDED_SUCCESS")
        );
      }
    },
  });

  //on selecting document type
  //   const handleDocumentType = (selectedType: any) => {
  //     let temp: any = addedDocumentType ? addedDocumentType : [];
  //     temp.push({
  //       label: selectedType.label,
  //       value: selectedType.value
  //     });
  //     if (addedDocumentType) {
  //       addDocumentType({
  //         variables: {
  //           id: userId ? userId : '',
  //           requiredDocuments:
  //             selectedType && selectedType.value
  //               ? temp.map((document: any) => parseInt(document.value))
  //               : null
  //         }
  //       });
  //     }
  //     setaddedDocumentType(temp);
  //   };
  return (
    <Row>
      <Col lg={4} md={5} sm={12}>
        <h5 className="content-title ">
          {languageTranslation("EXPLICITLY_DOCUMENT")}
        </h5>
        <div className="common-list-wrap">
          <div className="common-list-header d-flex align-items-cente justify-content-between">
            <div className="common-list-title align-middle">
              {languageTranslation("TYPE")}{" "}
            </div>
            <div className=" align-middle toggle-icon">
              <i className="fa fa-angle-down"></i>
            </div>
          </div>
          <div className="common-list-body custom-scrollbar filetypelist">
            <ul className="common-list list-unstyled mb-0">
              {addedDocumentType
                ? addedDocumentType.map((type: any, index: number) => {
                    return (
                      <li
                        className={"cursor-pointer list-item text-capitalize"}
                        key={index}
                      >
                        <span className="list-item-text one-line-text">
                          {type.label}{" "}
                        </span>
                        <span
                          id={`delete${index}`}
                          onClick={() => {
                            onDeleteDocumentTypes(type.value);
                          }}
                          className="list-item-icon"
                        >
                          <i className="fa fa-trash"></i>
                        </span>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <div className="common-list-footer form-section ">
            <FormGroup className="mb-0">
              <Select
                menuPlacement={"top"}
                placeholder={languageTranslation("TYPE")}
                value={addedDocumentType}
                options={documentTypeList ? documentTypeList : ""}
                className="attribute-select"
                classNamePrefix="attribute-inner-select"
                onChange={handleDocumentType}
              />
            </FormGroup>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default ExplicitDocument;
