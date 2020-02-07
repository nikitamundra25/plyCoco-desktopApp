import React, { FunctionComponent, useState, useEffect } from 'react';
import { Col, Row, Collapse } from 'reactstrap';
import moment from 'moment';
import { languageTranslation } from '../../../../../helpers';
import { IEmailListProps } from '../../../../../interfaces';
import { EmailPreview } from './EmailPreview';
import noemail from '../../../../assets/img/no-email.svg';
import Loader from '../../../containers/Loader/Loader';
import { EmailSearchFilter } from './EmailSearchFilter';

const SentEmail: FunctionComponent<IEmailListProps> = ({
  emailList,
  selectedUserName,
  loading,
  onRefresh,
  searchBy,
  handleChange,
  handleSubmit,
  onReset,
}: IEmailListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [opened, setIsOpened] = useState<boolean>(true);

  const [emailData, setEmailData] = useState<any>('');
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (emailList && emailList.getEmails && emailList.getEmails.length) {
      setEmailData(emailList.getEmails[0]);
    }
  }, [emailList]);
  const onEmailSelection = (email: any) => {
    setEmailData(email);
  };
  const onEntered = () => {
    setIsOpened(!opened);
  };
  return (
    <div className='email-section'>
      {/* <EmailMenus {...this.props} /> */}
      <div className='email-content'>
        {loading ? (
          <Loader />
        ) : emailList && emailList.getEmails && emailList.getEmails.length ? (
          <Row className='custom-col'>
            <Col lg={'5'}>
              <div className='email-inbox-section'>
                <EmailSearchFilter
                  searchBy={searchBy}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  onReset={onReset}
                />
                <div className='email-row-wrap align-items-center email-attributes-wrap'>
                  <div
                    className='email-attributes-content d-flex align-items-center'
                    onClick={() => onRefresh('plycoco')}
                  >
                    <i className='fa fa-refresh mr-1'></i>
                    <span> {languageTranslation('REFRESH')}</span>
                  </div>
                  <span className='email-attributes-seprator'>|</span>
                  <div className='email-attributes-content'>
                    <i className='fa fa-hourglass-end mr-1'></i>
                    <span> {languageTranslation('EXPIRED')}</span>
                  </div>
                </div>
                <div className='email-row-wrap email-heading-wrap '>
                  <div className='email-date-time-block'>
                    Date
                    {/* <Select
                      placeholder='Select Region'
                      options={this.options}
                      classNamePrefix='react-select'
                      className='hover-short-select'
                    /> */}
                  </div>
                  <div className='email-subject-block'>
                    <span>{languageTranslation('OF')}</span>
                    {/* <Select
                      placeholder="Select Region"
                      options={this.options}
                      classNamePrefix="react-select"
                      className="hover-short-select"
                    /> */}
                  </div>
                  <div className='email-text-wrap'>
                    <span>{languageTranslation('SUBJECT')}</span>
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
                          {/* <Collapse
                          isOpen={isOpen}
                          onEntered={onEntered}
                          onExiting={onEntered}
                        > */}
                          <div
                            className='email-row-wrap inner-content-wrap'
                            onClick={() => onEmailSelection(email)}
                          >
                            <div className='email-date-time-block'>
                              {moment(email.createdAt).format(
                                'DD.MM.YYYY HH:MM:SS',
                              )}
                            </div>
                            <div className='email-subject-block'>
                              Super Admin
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
              sendBy={'Super Admin'}
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

export default SentEmail;
