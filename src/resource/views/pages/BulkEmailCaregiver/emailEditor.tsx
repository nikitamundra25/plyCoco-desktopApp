import React, { FunctionComponent } from "react";
import { Col, Row, FormGroup, Table, Label, Input } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import { IEmailFormComponentPorps } from "../../../../interfaces";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stripHtml, languageTranslation } from "../../../../helpers";
import { IEmailEditorComponentProps } from "../../../../interfaces/bulkEmailCaregiver";

export const EmailEditorComponent: FunctionComponent<IEmailEditorComponentProps> = (
  props: IEmailEditorComponentProps
) => {
  const {
    body,
    templateOptions,
    subject,
    onTemplateSelection,
    template
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
                    className="width-common"
                    value={subject}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Label className="form-label col-form-label mb-2">
                  {languageTranslation("TEXT_EMAIL")}
                </Label>

                <div>
                  <Editor
                    editorState={body}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder="Enter Email Content Here"
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
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </div>
        <Table bordered hover responsive className="mail-table">
          <thead className="thead-bg">
            <tr>
              <th className="file-name">{languageTranslation("FILE_NAME")}</th>
              <th className="size-col">{languageTranslation("SIZE")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="file-name ">Pan Card.PDF</td>
              <td className="size-col">1kb</td>
            </tr>
            <tr>
              <td className="file-name">VoterID.pdf</td>
              <td className="size-col">2kb</td>
            </tr>

            <tr>
              <td className="file-name">Pan Card.PDF</td>
              <td className="size-col">5kb</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Col>
  );
};
