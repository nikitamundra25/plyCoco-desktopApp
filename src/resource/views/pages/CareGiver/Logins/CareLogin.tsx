import React, { FunctionComponent, useEffect } from 'react';
import { Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import { LoginHistoryQuery } from '../../../../../graphql/queries/LoginHistory';
import { useLazyQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Loader from '../../../containers/Loader/Loader';
const [GET_LOGIN_HISTORY] = LoginHistoryQuery;
const LoginLogs: FunctionComponent = () => {
  const [fetchLoginList, { data, loading, called }] = useLazyQuery<any>(
    GET_LOGIN_HISTORY,
    {
      fetchPolicy: 'no-cache'
    }
  );
  const path = useLocation();

  useEffect(() => {
    const queryPath = path.pathname;
    const res = queryPath.split('/');
    const id = parseInt(res[3]);
    fetchLoginList({
      variables: {
        userId: id ? id : ''
      }
    });
  }, []);
  return (
    <>
      <div className='login-section'>
        <div>
          <h5 className='content-title'>
            {languageTranslation('LOGIN_HISTORY')}
          </h5>
          <Table bordered hover responsive>
            <thead className='thead-bg'>
              <tr>
                <th className='sno-th-column text-center'>
                  {languageTranslation('S_NO')}
                </th>
                <th className='date-th-column'>
                  {languageTranslation('LOGIN_DATE')}
                </th>
                <th>{languageTranslation('IP_ADDRESS')}</th>
                <th>{languageTranslation('BROWSER')}</th>
              </tr>
            </thead>
            <tbody>
              {!called || loading ? (
                <tr>
                  <td className={'table-loader'} colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              ) : data &&
                data.getLoginHistory &&
                data.getLoginHistory.length ? (
                data.getLoginHistory.map((loginDetails: any, index: number) => {
                  let splitIP = loginDetails.loggedInIP.split(':');
                  splitIP=splitIP[3]
                  return (
                    <tr
                      className={
                        loginDetails.loginAttempt === 'success'
                          ? 'table-success'
                          : 'table-danger'
                      }
                      key={index}
                    >
                      <td className='sno-th-column text-center'>{index + 1}</td>
                      <td className='date-th-column'>
                        {loginDetails.lastLogin
                          ? moment(loginDetails.lastLogin).format('lll')
                          : '-'}
                      </td>
                      <td>
                        {splitIP
                          ? splitIP
                          : '-'}
                      </td>
                      <td>
                        {loginDetails.userAgent ? loginDetails.userAgent : '-'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className={'text-center no-hover-row'}>
                  <td colSpan={4} className={'pt-5 pb-5'}>
                    <div className='no-data-section'>
                      <div className='no-data-icon'>
                        <i className='icon-ban' />
                      </div>
                      <h4 className='mb-1'>
                        Currently there are no logs available.{' '}
                      </h4>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default LoginLogs;
