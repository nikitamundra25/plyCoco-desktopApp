import React, { FunctionComponent } from "react";
import { Col, Row, FormGroup, Table, Label, Input } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stripHtml, languageTranslation } from "../../../../helpers";
import { IEmailEditorComponentProps } from "../../../../interfaces/BulkEmailCaregiver";
import { AttachmentList } from "../../components/Attachments";
import { AttachmentFormComponent } from "../EmailTemplateManagement/AddTemplate/AttachmentFormComponent";

export const EmailEditorComponent: FunctionComponent<IEmailEditorComponentProps> = (
  props: IEmailEditorComponentProps
) => {
  const {
    body,
    templateOptions,
    subject,
    onTemplateSelection,
    onEditorStateChange,
    handleChangeSubject,
    onDelteDocument,
    template,
    attachments,
    isSubmit,
    uploadDocument
  } = props;
  let content = body ? draftToHtml(convertToRaw(body.getCurrentContent())) : "";
  const result = stripHtml(content);

  return (
    <Col lg={"7"}>
      <div className="">
        <div className="form-section py-2 px-3 bulk-email-form">
          <div className="d-flex align-items-end justify-content-between bulk-email-header">
            <Label className="bulk-email-label">
              {languageTranslation("SUBJECT")} {languageTranslation("EMAIL")}
              <span className="required">*</span>
            </Label>
            <div className="select-box mb-2">
              <Select
                placeholder={languageTranslation("SELECT_TEMPLATE")}
                options={templateOptions}
                value={template}
                onChange={onTemplateSelection}
                classNamePrefix="custom-inner-reactselect"
                className="custom-reactselect"
              />
            </div>
          </div>
          <Row>
            <Col lg={"12"}>
              <FormGroup>
                <div>
                  <Input
                    type="text"
                    placeholder={languageTranslation("SUBJECT")}
                    name={"lastName"}
                    className={`width-common ${
                      isSubmit && !subject ? "error" : ""
                    }`}
                    value={subject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeSubject(e)
                    }
                    maxLength={255}
                  />
                  {isSubmit && !subject ? (
                    <div className="required-tooltip">
                      {languageTranslation("REQUIRED_SUBJECT")}
                    </div>
                  ) : null}
                </div>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Label className="form-label col-form-label mb-2">
                  {languageTranslation("TEXT_EMAIL")}
                  <span className="required">*</span>
                </Label>

                <div>
                  <Editor
                    editorState={body}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder={languageTranslation("EMAIL_BODY_PLACEHOLDER")}
                    toolbar={{
                      options: [
                        "inline",
                        "blockType",
                        "fontSize",
                        "list",
                        "textAlign",
                        "link"
                      ],
                      inline: {
                        options: ["bold", "italic", "underline"]
                      },
                      fontSize: {
                        className: "bordered-option-classname"
                      },
                      fontFamily: {
                        className: "bordered-option-classname"
                      },
                      list: {
                        inDropdown: false,
                        options: ["unordered"]
                      },
                      link: {
                        options: ["link"]
                      }
                    }}
                    onEditorStateChange={onEditorStateChange}
                  />
                </div>
              </FormGroup>
              {isSubmit && (!body || (result && result.length < 2)) ? (
                <div className="required">
                  {languageTranslation("REQUIRED_BODY")}
                </div>
              ) : (
                ""
              )}
            </Col>
            <AttachmentFormComponent
              uploadDocument={uploadDocument}
              attachment={attachments}
            />
          </Row>
        </div>
        {attachments && attachments.length ? (
          <AttachmentList
            attachment={attachments}
            onDelteDocument={onDelteDocument}
          />
        ) : null}
      </div>
    </Col>
  );
};
