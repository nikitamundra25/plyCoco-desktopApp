import React, { useState, useEffect, FunctionComponent } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router';
import { EmailMenus } from './EmailMenus';
import InboxEmail from './InboxEmail';
import SentEmail from './SentEmail';
import NewEmail from './NewEmail';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { IEmailQueryVar } from '../../../../../interfaces';

const [, , , GET_EMAILS] = CareGiverQueries;
const Email: FunctionComponent<{
  selectedUserName: string;
}> = ({ selectedUserName }: { selectedUserName: string }) => {
  let { id } = useParams();
  const [activeTab, setactiveTab] = useState<number>(0);
  const [emailData, setEmailData] = useState<any>('');
  let [fetchEmails, { data: emailList, loading, refetch }] = useLazyQuery<
    { fetchEmails: any },
    IEmailQueryVar
  >(GET_EMAILS);

  useEffect(() => {
    fetchEmails({
      variables: {
        userId: id ? parseInt(id) : 0,
        from: 'caregiver',
      },
    });
  }, []);

  useEffect(() => {
    let variables: IEmailQueryVar = {
      userId: id ? parseInt(id) : 0,
      from: 'caregiver',
    };
    if (activeTab === 1) {
      variables = { ...variables, from: 'plycoco' };
    }
    if (refetch) {
      refetch(variables);
    }
  }, [activeTab]);

  const onTabChange = (activeTab: number, data?: any) => {
    setactiveTab(activeTab);
    setEmailData(data);
  };

  const onRefresh = (from: string) => {
    let variables: IEmailQueryVar = {
      userId: id ? parseInt(id) : 0,
      from,
    };
    refetch(variables);
  };

  // render component according to selected tab
  const renderComponent = () => {
    switch (activeTab) {
      case 0:
        return (
          <InboxEmail
            emailList={emailList}
            onTabChange={onTabChange}
            selectedUserName={selectedUserName}
            loading={loading}
            onRefresh={() => onRefresh('caregiver')}
          />
        );
      case 1:
        return (
          <SentEmail
            emailList={emailList}
            selectedUserName={selectedUserName}
            loading={loading}
            onRefresh={() => onRefresh('plycoco')}
          />
        );
      case 2:
        return <NewEmail emailData={emailData} />;

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
