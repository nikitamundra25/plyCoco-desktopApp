import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { EmailMenus } from './EmailMenus';
import InboxEmail from './InboxEmail';
import SentEmail from './SentEmail';
import NewEmail from './NewEmail';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { IEmailQueryVar } from '../../../../../interfaces';

const [, , , GET_EMAILS] = CareGiverQueries;
const Email = () => {
  let { id } = useParams();
  const [activeTab, setactiveTab] = useState<number>(0);
  const [fetchEmails, { data: emailList }] = useLazyQuery<
    { fetchEmails: any },
    IEmailQueryVar
  >(GET_EMAILS);

  useEffect(() => {
    let variables: IEmailQueryVar = {
      userId: id ? parseInt(id) : 0,
      from: 'caregiver',
    };
    if (activeTab === 1) {
      variables = { ...variables, from: 'plycoco' };
    }
    fetchEmails({
      variables,
    });
  }, [activeTab]);

  const onTabChange = (activeTab: number) => {
    setactiveTab(activeTab);
  };

  // render component according to selected tab
  const renderComponent = () => {
    switch (activeTab) {
      case 0:
        return <InboxEmail emailList={emailList} />;
      case 1:
        return <SentEmail emailList={emailList} />;
      case 2:
        return <NewEmail />;

      default:
        break;
    }
  };

  return (
    <div className='email-section'>
      <EmailMenus activeTab={activeTab} onTabChange={onTabChange} />
      {renderComponent()}
    </div>
  );
};

export default Email;
