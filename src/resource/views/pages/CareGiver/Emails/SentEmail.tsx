import React, { FunctionComponent, useState } from "react";
import {
  Col,
  Row,
  Collapse,
  FormGroup,
  Input,
  UncontrolledTooltip
} from "reactstrap";
import moment from "moment";
import { languageTranslation } from "../../../../../helpers";
import { IEmailListProps } from "../../../../../interfaces";
import noemail from "../../../../assets/img/no-email.svg";

const SentEmail: FunctionComponent<IEmailListProps> = ({
  emailList
}: IEmailListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [opened, setIsOpened] = useState<boolean>(true);

  const [emailData, setEmailData] = useState<any>("");

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const onEmailSelection = (email: any) => {
    setEmailData(email);
  };
  const onEntered = () => {
    setIsOpened(!opened);
  };
  return (
    <div className="email-section">
      {/* <EmailMenus {...this.props} /> */}
      <div className="email-content">
        <Row className="custom-col">
          <Col lg={"5"}>
            <div className="email-inbox-section">
              <div className="filter-form form-section">
                <Row>
                  <Col lg={"9"}>
                    <FormGroup className="mb-2">
                      <Input
                        type="text"
                        name="search"
                        id="search"
                        placeholder={languageTranslation("SEARCH_PLACEHOLDER")}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={"3"}>
                    <div className="filter-btn-wrap mb-2">
                      <span className="btn-filter mr-2" id="search1">
                        <UncontrolledTooltip placement="top" target="search1">
                          {languageTranslation("SEARCH_LABEL")}
                        </UncontrolledTooltip>
                        {languageTranslation("SEARCH_LABEL")}
                      </span>
                      <span className="btn-filter mr-2" id="reset">
                        <UncontrolledTooltip placement="top" target="reset">
                          {languageTranslation("RESET_LABEL")}
                        </UncontrolledTooltip>
                        {languageTranslation("RESET_LABEL")}
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="email-row-wrap align-items-center email-attributes-wrap">
                <div className="email-attributes-content d-flex align-items-center">
                  <i className="fa fa-refresh mr-1"></i>
                  <span> {languageTranslation("REFRESH")}</span>
                </div>
                <span className="email-attributes-seprator">|</span>
                <div className="email-attributes-content">
                  <i className="fa fa-hourglass-end mr-1"></i>
                  <span> {languageTranslation("EXPIRED")}</span>
                </div>
              </div>
              <div className="email-row-wrap email-heading-wrap ">
                <div className="email-date-time-block toggle-filter hover-short-select-section">
                  Date
                  {/* <Select
                      placeholder='Select Region'
                      options={this.options}
                      classNamePrefix='react-select'
                      className='hover-short-select'
                    /> */}
                </div>
                <div className="email-subject-block toggle-filter`   hover-short-select-section">
                  <span>{languageTranslation("OF")}</span>
                  {/* <Select
                      placeholder="Select Region"
                      options={this.options}
                      classNamePrefix="react-select"
                      className="hover-short-select"
                    /> */}
                </div>
                <div className="email-text-wrap">
                  <span>{languageTranslation("SUBJECT")}</span>
                </div>
              </div>
              {emailList &&
              emailList.getEmails &&
              emailList.getEmails.length ? (
                <ul className="m-0 p-0 list-group">
                  {emailList.getEmails.map((email: any, index: number) => {
                    return (
                      <li className={`email-wrap `}>
                        {/* <div
                          className={`email-date-block ${
                            opened ? 'opened' : 'closed'
                          }`}
                          onClick={toggle}
                        >
                          {' '}
                          {languageTranslation('DATE')}: january 2020
                        </div> */}
                        {/* <Collapse
                          isOpen={isOpen}
                          onEntered={onEntered}
                          onExiting={onEntered}
                        > */}
                        <div
                          className="email-row-wrap inner-content-wrap"
                          onClick={() => onEmailSelection(email)}
                        >
                          <div className="email-date-time-block">
                            {moment(email.createdAt).format(
                              "DD.MM.YYYY HH:MM:SS"
                            )}
                          </div>
                          <div className="email-subject-block">Super admin</div>
                          <div className="email-text-wrap">{email.subject}</div>
                        </div>
                        {/* </Collapse> */}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="no-data-section pt-5 pb-5 bg-white text-center">
                  <div className="no-data-icon">
                    <img src={noemail} width="35px" />
                  </div>
                  <h4 className="mb-1">
                    {languageTranslation("NO_EMAIL_MESSAGE")}
                  </h4>
                </div>
              )}
            </div>
          </Col>
          <Col lg={"7"}>
            <div className="mail-details">
              <div className="mail-body">
                {emailData ? (
                  <div>
                    <h5 className="mb-3"> {emailData.subject}</h5>
                    <div>
                      <span className="gray-color">Posted:</span>{" "}
                      <span>
                        {moment(emailData.createdAt).format(
                          "DD.MM.YYYY HH:MM:SS"
                        )}
                      </span>
                    </div>
                    <div className="mb-3">
                      <span className="gray-color">To:</span>{" "}
                      <span>Justina Achatoh</span>
                    </div>
                    <p className="mb-1">
                      {" "}
                      -------------------------------------------------
                    </p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: emailData.body
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SentEmail;
