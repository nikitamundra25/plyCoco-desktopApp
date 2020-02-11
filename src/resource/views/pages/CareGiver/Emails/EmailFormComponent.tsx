import React, { FunctionComponent } from "react";
import { Col, Row, FormGroup } from "reactstrap";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { IEmailFormComponentPorps } from "../../../../../interfaces";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stripHtml, languageTranslation } from "../../../../../helpers";

export const EmailFormComponent: FunctionComponent<IEmailFormComponentPorps> = (
  props: IEmailFormComponentPorps
) => {
  const { body, onEditorStateChange, isSubmit } = props;
  let content = body ? draftToHtml(convertToRaw(body.getCurrentContent())) : "";
  const result = stripHtml(content);
  return (
    <div>
      <Row>
        <Col lg={"12"}>
          <FormGroup className="mb-3">
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
              {isSubmit && (!body || (result && result.length < 2)) ? (
                <div className="required-error">
                  {languageTranslation("REQUIRED_BODY")}
                </div>
              ) : null}
            </div>
          </FormGroup>
        </Col>
        {/* <Col lg={'12'}>
          <div className='d-flex align-items-center justify-content-end'>
            <div>
              <Button
                color='primary'
                type='submit'
                className='btn-submit'
                onClick={sendEmail}
              >
                {languageTranslation('SEND')}
              </Button>
            </div>
          </div>
        </Col> */}
      </Row>
    </div>
  );
};
