import React, { FunctionComponent, useEffect } from 'react';
import { Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import { LoginHistoryQuery } from '../../../../../graphql/queries/LoginHistory';
import { useLazyQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
const [GET_LOGIN_HISTORY] = LoginHistoryQuery;
const LoginLogs: FunctionComponent = () => {
  const [fetchLoginList, { data, loading, refetch }] = useLazyQuery<any>(
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
                <th>{languageTranslation('S_NO')}</th>
                <th>{languageTranslation('DATE')}</th>
                <th>{languageTranslation('IP_ADDRESS')}</th>
                <th>{languageTranslation('BROWSER')}</th>
              </tr>
            </thead>
            {data && data.getLoginHistory
              ? data.getLoginHistory.map((loginDetails: any, index: number) => {
                  return (
                    <tbody>
                      <tr
                        className={
                          loginDetails.loginAttempt === 'success'
                            ? 'table-success'
                            : 'table-danger'
                        }
                      >
                        <td>{index + 1}</td>
                        <td>
                          {loginDetails.lastLogin
                            ? moment(loginDetails.lastLogin).format('lll')
                            : '-'}
                        </td>
                        <td>
                          {loginDetails.loggedInIP
                            ? loginDetails.loggedInIP
                            : '-'}
                        </td>
                        <td>
                          {loginDetails.userAgent
                            ? loginDetails.userAgent
                            : '-'}
                        </td>
                      </tr>
                      {/* <tr className='table-danger'>
                      <td>2</td>
                      <td>20.08.2019 12:08:20</td>
                      <td>94.138.88.227</td>
                      <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                    </tr> */}
                    </tbody>
                  );
                })
              : null}
          </Table>
        </div>
      </div>
    </>
  );
};

export default LoginLogs;
