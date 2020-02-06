import React, { FunctionComponent, useState } from 'react';
import {
  Col,
  Row,
  Collapse,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from 'reactstrap';
import { useParams } from 'react-router';
import moment from 'moment';
import { languageTranslation } from '../../../../../helpers';
import { IEmailListProps, IEmailData } from '../../../../../interfaces';
import { EmailPreview } from './EmailPreview';
import noemail from '../../../../assets/img/no-email.svg';
import Loader from '../../../containers/Loader/Loader';

const InboxEmail: FunctionComponent<IEmailListProps & {
  onTabChange: (activeTab: number, data?: any) => void;
}> = ({
  emailList,
  selectedUserName,
  onTabChange,
  loading,
}: IEmailListProps & {
  onTabChange: (activeTab: number, data?: any) => void;
}) => {
  let { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [opened, setIsOpened] = useState<boolean>(true);
  const [emailData, setEmailData] = useState<IEmailData | null>(null);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const onEmailSelection = (email: any) => {
    setEmailData(email);
  };
  return (
    <div className='email-section'>
      {/* <EmailMenus
            location={this.props.location}
            history={this.props.history}
          /> */}
      <div className='email-content'>
        {loading ? (
          <Loader />
        ) : emailList && emailList.getEmails && emailList.getEmails.length ? (
          <Row>
            <Col lg={'5'}>
              <div className='email-inbox-section'>
                <div className='filter-form form-section'>
                  <Row>
                    <Col lg={'9'}>
                      <FormGroup className='mb-2'>
                        <Input
                          type='text'
                          name='search'
                          id='search'
                          placeholder={languageTranslation(
                            'SEARCH_PLACEHOLDER',
                          )}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={'3'}>
                      <div className='filter-btn-wrap mb-2'>
                        <span className='btn-filter mr-2' id='search1'>
                          <UncontrolledTooltip placement='top' target='search1'>
                            {languageTranslation('SEARCH_LABEL')}
                          </UncontrolledTooltip>
                          {languageTranslation('SEARCH_LABEL')}
                        </span>
                        <span className='btn-filter mr-2' id='reset'>
                          <UncontrolledTooltip placement='top' target='reset'>
                            {languageTranslation('RESET_LABEL')}
                          </UncontrolledTooltip>
                          {languageTranslation('RESET_LABEL')}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className='email-row-wrap align-items-center email-attributes-wrap'>
                  <div className='email-attributes-content d-flex align-items-center'>
                    <i className='fa fa-refresh mr-1'></i>
                    <span>{languageTranslation('REFRESH')}</span>
                  </div>
                  <span className='email-attributes-seprator'>|</span>
                  <div
                    className='email-attributes-content'
                    onClick={() => onTabChange(2, emailData)}
                  >
                    <i className='fa fa-hourglass-end mr-1'></i>
                    <span>{languageTranslation('REPLY')}</span>
                  </div>
                </div>
                <div className='email-row-wrap email-heading-wrap '>
                  <div className='email-date-time-block'>
                    {languageTranslation('DATE')}
                    {/* <Select
                        placeholder="Select Region"
                        options={this.options}
                        classNamePrefix="react-select"
                        className="hover-short-select"
                      /> */}
                  </div>
                  <div className='email-text-wrap'>
                    {languageTranslation('SUBJECT')}
                  </div>
                </div>
                {emailList &&
                emailList.getEmails &&
                emailList.getEmails.length ? (
                  <ul className='m-0 p-0 list-group'>
                    {emailList.getEmails.map((email: any, index: number) => {
                      return (
                        <li
                          className={`email-wrap ${
                            emailData && emailData.id === email.id
                              ? 'active'
                              : ''
                          }`}
                          key={index}
                          onClick={() => onEmailSelection(email)}
                        >
                          {/* <div
                          className={`email-date-block ${
                            opened ? 'opened' : 'closed'
                          }`}
                          onClick={toggle}
                        >
                          {' '}
                          {languageTranslation('DATE')}: january 2020
                        </div> */}
                          {/* <Collapse isOpen={isOpen}> */}
                          <div className='email-row-wrap inner-content-wrap'>
                            <div className='email-date-time-block'>
                              {moment(email.createdAt).format(
                                'DD.MM.YYYY HH:MM:SS',
                              )}
                            </div>
                            <div className='email-text-wrap'>
                              {email.subject}
                            </div>
                          </div>
                          {/* </Collapse> */}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  // <span >No email found</span>
                  <div className='no-data-section pt-5 pb-5 bg-white text-center'>
                    <div className='no-data-icon'>
                      <img src={noemail} width='35px' />
                    </div>
                    <h4 className='mb-1'>
                      {languageTranslation('NO_EMAIL_MESSAGE')}
                    </h4>
                  </div>
                )}
              </div>
            </Col>
            <EmailPreview
              emailData={emailData}
              selectedUserName={selectedUserName}
            />
          </Row>
        ) : (
          <div className='no-data-section pt-5 pb-5 bg-white text-center'>
            <div className='no-data-icon'>
              <img src={noemail} width='35px' />
            </div>
            <h4 className='mb-1'>{languageTranslation('NO_EMAIL_MESSAGE')}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxEmail;
