import React, { FunctionComponent } from "react";
import { Row, Col, FormGroup, Label, Input, Table } from "reactstrap";
import { FormikProps } from "formik";
import CreatableSelect from "react-select/creatable";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { IEmailTemplateValues } from "../../../../../interfaces";
import { languageTranslation, stripHtml } from "../../../../../helpers";
import { ErroredFieldComponent } from "../../../components/ErroredFieldComponent";
import { AttachmentFormComponent } from "./AttachmentFormComponent";
import { AttachmentList } from "../../../components/Attachments";
import Loader from "../../../containers/Loader/Loader";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const TemplateFormComponent: FunctionComponent<FormikProps<
  IEmailTemplateValues
> & {
  typeListOptions?: any;
  setTypeId?: any;
  attachment: any;
  uploadDocument: any;
  emailTemplateLoading: boolean;
  onDelteDocument: (attachmentId: string, attachmentIndex?: number) => void;
  showArchive: boolean;
  archiveEmailTemplateLoading: boolean;
}> = (
  props: FormikProps<IEmailTemplateValues> & {
    typeListOptions?: any;
    setTypeId?: any;
    attachment: any;
    uploadDocument: any;
    emailTemplateLoading: boolean;
    onDelteDocument: (attachmentId: string, attachmentIndex?: number) => void;
    showArchive: boolean;
    archiveEmailTemplateLoading: boolean;
  }
) => {
  const {
    values: { type, menuEntry, subject, body, id },
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    typeListOptions,
    setTypeId,
    attachment,
    uploadDocument,
    onDelteDocument,
    emailTemplateLoading,
    showArchive,
    archiveEmailTemplateLoading
  } = props;
  const typeError: any = errors.type;

  const handleTypeSelect = (newValue: any, actionMeta: any) => {
    setFieldValue("type", newValue);
    if (actionMeta.action !== "create-option") {
      setTypeId(parseInt(newValue.value));
    }
  };

  let content = body ? draftToHtml(convertToRaw(body.getCurrentContent())) : "";
  const result = stripHtml(content);

  return (
    <Col lg={"7"}>
      <h5 className="content-title text-capitalize one-line-text">
        {id ? menuEntry : languageTranslation("NEW_TEMPLATE")}
      </h5>
      <div className="form-section">
        <div
          className={`form-card minheight-auto ${id ? "active-border" : ""}`}
        >
          {emailTemplateLoading || archiveEmailTemplateLoading ? (
            <div className="emailtemplate-loader">
              <Loader />
            </div>
          ) : (
            <Row>
              <Col lg={"12"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("ID")}
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"id"}
                          value={id ? id : ""}
                          disabled={true}
                          placeholder="ID"
                          className="width-common"
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>

              <Col lg={"12"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        <Label className="form-label col-form-label inner-label">
                          {languageTranslation("TYPE")}
                          <span className="required">*</span>
                        </Label>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <CreatableSelect
                          classNamePrefix="custom-inner-reactselect"
                          className={
                            typeError && typeError.value && touched.type
                              ? "error custom-reactselect"
                              : "custom-reactselect"
                          }
                          onChange={handleTypeSelect}
                          onBlur={handleBlur}
                          value={type && type.label !== "" ? type : null}
                          options={typeListOptions}
                          placeholder={"Create and select type"}
                          isDisabled={showArchive}
                        />
                        <ErroredFieldComponent
                          errors={typeError ? typeError.value : ""}
                          touched={touched.type}
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>

              <Col lg={"12"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("MENU_ENTRY")}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"menuEntry"}
                          value={menuEntry}
                          maxLength={255}
                          placeholder={languageTranslation("MENU_ENTRY")}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.menuEntry && touched.menuEntry
                              ? "text-input error text-capitalize"
                              : "text-input text-capitalize"
                          }
                          disabled={showArchive}
                        />
                        <ErroredFieldComponent
                          errors={errors.menuEntry}
                          touched={touched.menuEntry}
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col lg={"12"}>
                <FormGroup>
                  <Row className="align-items-center">
                    <Col sm="4">
                      <Label className="form-label col-form-label">
                        {languageTranslation("SUBJECT")}{" "}
                        <span className="required">*</span>
                      </Label>
                    </Col>
                    <Col sm="8">
                      <div>
                        <Input
                          type="text"
                          name={"subject"}
                          value={subject}
                          maxLength={255}
                          placeholder={languageTranslation("SUBJECT")}
                          className={`text-input text-capitalize
                            ${
                              errors.subject && touched.subject ? "error" : ""
                            }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={showArchive}
                        />
                        <ErroredFieldComponent
                          errors={errors.subject}
                          touched={touched.subject}
                        />
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
              <Col lg={"12"}>
                <FormGroup className="mb-3">
                  <div>
                    <Editor
                      editorState={body}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={editorState => {
                        setFieldValue("body", editorState);
                        setFieldTouched("body", true);
                      }}
                      onBlur={handleBlur}
                      placeholder={languageTranslation(
                        "EMAIL_BODY_PLACEHOLDER"
                      )}
                      readOnly={showArchive}
                      toolbar={{
                        options: [
                          "inline",
                          "blockType",
                          "fontSize",
                          "fontFamily",
                          "list",
                          "textAlign",
                          "link"
                        ],
                        inline: {
                          options: ["bold", "italic", "underline"]
                        },
                        blockType: {
                          className: "demo-option-custom-wide",
                          dropdownClassName: "demo-dropdown-custom"
                        },
                        fontSize: { className: "demo-option-custom-medium" },

                        fontFamily: {
                          className: "bordered-option-classname",
                          dropdownClassName: "demo-dropdown-custom"
                        },
                        list: {
                          inDropdown: false,
                          unordered: { className: "demo-option-custom" },
                          ordered: { className: "demo-option-custom" },

                          options: ["unordered"]
                        },
                        textAlign: {
                          left: { className: "demo-option-custom" },
                          center: { className: "demo-option-custom" },
                          right: { className: "demo-option-custom" },
                          justify: { className: "demo-option-custom" }
                        },
                        link: {
                          options: ["link"]
                        }
                      }}
                    />
                    {touched.body &&
                    (errors.body ||
                      !result ||
                      (result && result.length < 2)) ? (
                      <div className="required-error">
                        {errors.body || languageTranslation("REQUIRED_BODY")}
                      </div>
                    ) : null}
                  </div>
                </FormGroup>
              </Col>
              {!showArchive ? (
                <AttachmentFormComponent
                  uploadDocument={uploadDocument}
                  attachment={attachment}
                />
              ) : (
                ""
              )}
            </Row>
          )}
        </div>
      </div>
      {attachment && attachment.length ? (
        <div className="attach-document-list custom-scrollbar mb-2 mb-lg-1">
          <AttachmentList
            attachment={attachment}
            onDelteDocument={onDelteDocument}
          />
        </div>
      ) : null}
    </Col>
  );
};
