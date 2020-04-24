import React, { FunctionComponent, useState, Suspense, useEffect } from 'react';
import { RouteComponentProps, useLocation, useParams } from 'react-router';
import { AppRoutes } from '../../../../config';
import qs from 'query-string';
import {
  ICareInstitutionFormValues,
  IHandleSubmitInterface,
  IReactSelectInterface
} from '../../../../interfaces';
import { FormikProps } from 'formik';
import {
  CareInstitutionQueries,
  GET_QUALIFICATION_ATTRIBUTE
} from '../../../../graphql/queries';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import { IQualifications } from '../../../../interfaces/qualification';
import Loader from '../../containers/Loader/Loader';
import clear from '../../../assets/img/clear.svg';
import { CareInstitutionMutation } from '../../../../graphql/Mutations';
import CreateTodo from '../../components/CreateTodo/CreateTodoForm';
import { languageTranslation } from '../../../../helpers';
import inbox from '../../../assets/img/inbox.svg';
import send from '../../../assets/img/send.svg';
import employee from '../../../assets/img/employee.svg';
import mail from '../../../assets/img/mail.svg';
import InboxEmail from './InboxEmail';
import SentEmail from './SentEmail';
import OutboxEmail from './OutboxEmail';
import MailQueue from './MailQueueEmail';
import { Helmet } from "react-helmet";

const EmailsTabs: any[] = [
  {
    name: 'inbox'
  },
  {
    name: 'Sent inbox'
  },
  {
    name: 'Outbox'
  },
  {
    name: 'Mail Queue'
  }
];

const ViewEmails: FunctionComponent<FormikProps<ICareInstitutionFormValues> &
  RouteComponentProps &
  IHandleSubmitInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & RouteComponentProps
) => {
  let [selectUser, setselectUser] = useState<IReactSelectInterface>({
    label: '',
    value: ''
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const buttonDiv: HTMLElement | null = document.getElementById(
      'caregiver-add-btn'
    );
    if (buttonDiv) {
      if (scrollPositionY >= 12) {
        buttonDiv.classList.add('sticky-save-btn');
      } else {
        buttonDiv.classList.remove('sticky-save-btn');
      }
    }
  };

  let CareInstitutionList: Object[] = [];

  const [activeTab, setactiveTab] = useState(0);
  const { search, pathname } = useLocation();

  useEffect(() => {
    const query: any = qs.parse(search);
    setactiveTab(
      query.tab
        ? EmailsTabs.findIndex(d => d.name === decodeURIComponent(query.tab))
        : 0
    );
  }, [search]);

  const onTabChange = (activeTab: number) => {
    props.history.push(
      `${AppRoutes.ALL_EMAILS}?tab=${encodeURIComponent(
        EmailsTabs[activeTab].name
      )}`
    );
  };
  return (
    <>
    <Helmet>
    <title>{languageTranslation("EMAIL_LABEL")} </title>
  </Helmet>
    <div>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <Suspense fallback={<Loader />}>
            <div className='sticky-common-header'>
              <div className='common-topheader d-flex align-items-center px-2 mb-1'>
                <div onClick={() => onTabChange(0)} className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={inbox} alt='' />
                  </span>
                  <span className='header-nav-text'>
                    {' '}
                    {languageTranslation('INBOX')}
                  </span>
                </div>
                <div onClick={() => onTabChange(1)} className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={send} alt='' />
                  </span>
                  <span className='header-nav-text'>
                    {languageTranslation('SENT')}
                  </span>
                </div>
                <div onClick={() => onTabChange(2)} className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={mail} alt='' />
                  </span>
                  <span className='header-nav-text'>
                    {languageTranslation('OUTBOX')}
                  </span>
                </div>

                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={clear} alt='' />
                  </span>
                  <span className='header-nav-text'>
                    {languageTranslation('CLEAR')}
                  </span>
                </div>
                <div onClick={() => onTabChange(3)} className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={employee} alt='' />
                  </span>
                  <span className='header-nav-text'>
                    {languageTranslation('MAIL_QUEUE')}
                  </span>
                </div>
              </div>
            </div>
          </Suspense>
          <Suspense fallback={''}>
            {activeTab === 0 ? <InboxEmail /> : null}
            {activeTab === 1 ? <SentEmail /> : null}
            {activeTab === 2 ? <OutboxEmail /> : null}
            {activeTab === 3 ? <MailQueue /> : null}
          </Suspense>
        </div>
      </div>
    </div>
    </>
  );
};
export default ViewEmails;
