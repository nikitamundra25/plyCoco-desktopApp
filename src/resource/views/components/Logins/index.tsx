import React, { FunctionComponent, useEffect } from 'react';
import { Table } from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import { LoginHistoryQuery } from '../../../../graphql/queries/LoginHistory';
import { useLazyQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Loader from '../../containers/Loader/Loader';
import { defaultDateTimeFormat } from '../../../../config';
const [GET_LOGIN_HISTORY] = LoginHistoryQuery;

const LoginLogs: FunctionComponent<any> = (props: any) => {
  const { id } = useParams();
  const [fetchLoginList, { data, loading, called }] = useLazyQuery<any>(
    GET_LOGIN_HISTORY,
    {
      fetchPolicy: 'no-cache'
    }
  );

  useEffect(() => {
    fetchLoginList({
      variables: {
        userId: id ? parseInt(id) : ''
      }
    });
  }, [id]);
  const { label } = props;
  return (
    <>
      <div className='login-section'>
        <div className={label ? 'employee-details' : ''}>
          <h5 className={`content-title ${label ? 'employee-title' : null}`}>
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
                          ? moment(loginDetails.lastLogin).format(
                              defaultDateTimeFormat
                            )
                          : '-'}
                      </td>
                      <td>
                        {loginDetails.loggedInIP
                          ? loginDetails.loggedInIP.replace('::ffff:', '')
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
                      {languageTranslation("NO_LOGS_AVAILABLE")} {' '}
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
