import React, { FunctionComponent, useState, useEffect } from 'react';
import { Col, Row, Collapse } from 'reactstrap';
import moment from 'moment';
import { languageTranslation } from '../../../../../helpers';
import { IEmailListProps } from '../../../../../interfaces';
import { EmailPreview } from './EmailPreview';
import noemail from '../../../../assets/img/no-email.svg';
import Loader from '../../../containers/Loader/Loader';
import { EmailSearchFilter } from './EmailSearchFilter';
import { NoSearchFound } from '../../../components/SearchFilter/NoSearchFound';
import { useLocation } from 'react-router-dom';
import * as qs from 'query-string';

const SentEmail: FunctionComponent<IEmailListProps> = ({
  emailList,
  selectedUserName,
  loading,
  onRefresh,
  searchBy,
  handleChange,
  handleSubmit,
  onReset,
  userRole,
}: IEmailListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [opened, setIsOpened] = useState<boolean>(true);
  const { search } = useLocation();
  const query = qs.parse(search);
  const [emailData, setEmailData] = useState<any>('');
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (emailList && emailList.getEmails && emailList.getEmails.length) {
      setEmailData(emailList.getEmails[0]);
    } else {
      setEmailData(null);
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
        {loading && !query.searchBy ? (
          <div className='overview-loader'>
            <Loader />
          </div>
        ) : !searchBy &&
          emailList &&
          emailList.getEmails &&
          !emailList.getEmails.length ? (
          <div className='no-data-section pt-5 pb-5 bg-white text-center'>
            <div className='no-data-icon mb-2'>
              <img src={noemail} width='35px' />
            </div>
            <h4 className='mb-1'>{languageTranslation('NO_EMAIL_MESSAGE')}</h4>
          </div>
        ) : (
          <Row>
            <Col lg={'5'}>
              <div className='email-inbox-section'>
                <EmailSearchFilter
                  searchBy={searchBy}
                  handleChange={handleChange}
                  handleSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    if (searchBy) {
                      setEmailData(null);
                    }
                    handleSubmit(e);
                  }}
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
                    {languageTranslation('DATE')}
                    {/* <Select
                      placeholder='Select Region'
                      options={this.options}
                      classNamePrefix='react-select'
                      className='hover-short-select'
                    /> */}
                  </div>
                  {userRole === 'canstitution' ? (
                    <div className='email-date-time-block'>
                      {languageTranslation('To')}
                      {/* <Select
                    placeholder='Select Region'
                    options={this.options}
                    classNamePrefix='react-select'
                    className='hover-short-select'
                  /> */}
                    </div>
                  ) : null}
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
                {loading ? (
                  <div className='overview-loader'>
                    <Loader />
                  </div>
                ) : emailList &&
                  emailList.getEmails &&
                  emailList.getEmails.length ? (
                  <ul className='mb-3 mb-lg-0 p-0 list-group custom-scrollbar'>
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
                                'DD.MM.YYYY HH:mm:ss',
                              )}
                            </div>
                            {userRole === 'canstitution' ? (
                              <div className='email-date-time-block'>to</div>
                            ) : null}
                            <div className='email-subject-block'>
                              {languageTranslation('SUPER_ADMIN')}
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
                    <NoSearchFound />
                  </div>
                )}
              </div>
            </Col>
            <EmailPreview
              emailData={emailData}
              selectedUserName={selectedUserName}
              sendBy={'Super Admin'}
              length={
                emailList && emailList.getEmails && emailList.getEmails.length
              }
            />
          </Row>
        )}
      </div>
    </div>
  );
};

export default SentEmail;
