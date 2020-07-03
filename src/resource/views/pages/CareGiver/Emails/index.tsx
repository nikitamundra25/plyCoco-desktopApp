import React, { useState, useEffect, FunctionComponent } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useParams, useLocation, useHistory } from 'react-router';
import * as qs from 'query-string';
import { EmailMenus } from './EmailMenus';
import InboxEmail from './InboxEmail';
import SentEmail from './SentEmail';
import NewEmail from './NewEmail';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { IEmailQueryVar } from '../../../../../interfaces';
import { EmailMenusTab } from '../../../../../config';

const [, , , GET_EMAILS] = CareGiverQueries;

const Email: FunctionComponent<{
  selectedUserName: string;
  userRole: string;
  userLastName: string
}> = ({
  selectedUserName,
  userRole,
  userLastName
}: {
  userLastName: string,
  selectedUserName: string;
  userRole: string;
}) => {
  let { id } = useParams();
  const { search, pathname } = useLocation();
  const query = qs.parse(search);
  const history = useHistory();
  const [activeTab, setactiveTab] = useState<number>(0);
  const [emailData, setEmailData] = useState<any>('');
  const [searchBy, setSearchBy] = useState<string>('');

  let [
    fetchEmails,
    { data: emailList, loading, called, refetch },
  ] = useLazyQuery<{ fetchEmails: any }, IEmailQueryVar>(GET_EMAILS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const query = qs.parse(search);
    // Initialize variables
    let variables: IEmailQueryVar = {
      senderUserId: id ? parseInt(id) : 0,
      receiverUserId: null,
      from: 'caregiver',
      searchBy,
    };
    if (query && (query.q || query.searchBy)) {
      const { q }: any = query;
      const index: number = EmailMenusTab.findIndex(
        ({ name }: { name: string; icon: string }) =>
          q && typeof q === 'string' && name.toUpperCase() === q.toUpperCase(),
      );
      setactiveTab(q ? index : 0);
      setSearchBy(query.searchBy ? query.searchBy.toString() : '');
      // update search by parameter in variables
      variables = {
        ...variables,
        searchBy: query.searchBy ? query.searchBy.toString() : '',
      };
      if (index === 1) {
        variables = {
          ...variables,
          from: 'plycoco',
          receiverUserId: id ? parseInt(id) : 0,
          senderUserId: null,
        };
      }
      if (refetch) {
        refetch(variables);
      } else {
        fetchEmails({ variables });
      }
    } else {
      setEmailData('');
      fetchEmails({ variables });
    }
  }, [search, id]);

  const onTabChange = (activeTab: number, data?: any) => {
    setEmailData(data);
    delete query.searchBy;
    const path = [
      pathname,
      qs.stringify({
        ...query,
        q: EmailMenusTab[activeTab].name.toLowerCase(),
      }),
    ].join('?');
    history.push(path);
  };

  const onRefresh = (from: string) => {
    let variables: IEmailQueryVar = {
      senderUserId: from === 'caregiver' ? (id ? parseInt(id) : 0) : null,
      receiverUserId: from === 'plycoco' ? (id ? parseInt(id) : 0) : null,
      from,
      searchBy,
    };
    refetch(variables);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setSearchBy(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let queryParam: any = query;
    delete queryParam.searchBy;
    if (searchBy) {
      queryParam = {
        ...queryParam,
        searchBy,
      };
    }
    const path = [pathname, qs.stringify(queryParam)].join('?');
    history.push(path);
  };

  const onReset = () => {
    setSearchBy('');
    delete query.searchBy;
    const path = [
      pathname,
      qs.stringify({
        ...query,
      }),
    ].join('?');
    history.push(path);
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
            loading={!called || loading}
            onRefresh={() => onRefresh('caregiver')}
            searchBy={searchBy}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onReset={onReset}
          />
        );
      case 1:
        return (
          <SentEmail
            emailList={emailList}
            selectedUserName={selectedUserName}
            loading={!called || loading}
            onRefresh={() => onRefresh('plycoco')}
            searchBy={searchBy}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onReset={onReset}
            userRole={userRole ? userRole : ''}
          />
        );
      case 2:
        return (
          <NewEmail
            emailData={emailData}
            selectedUserName={selectedUserName}
            userRole={userRole ? userRole : ''}
            userLastName= {userLastName}
          />
        );

      default:
        break;
    }
  };
  return (
    <div>
      <EmailMenus activeTab={activeTab} onTabChange={onTabChange} />
      {renderComponent()}
    </div>
  );
};

export default Email;
