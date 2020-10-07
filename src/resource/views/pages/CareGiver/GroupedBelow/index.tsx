import React, { FunctionComponent } from 'react';
import { Table, Col } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router';
import { languageTranslation } from '../../../../../helpers';
import Loader from '../../../containers/Loader/Loader';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { IBelongsToData } from '../../../../../interfaces';
import { AppRoutes } from '../../../../../config';

const [, , , , GET_BELONGS_TO] = CareGiverQueries;

const GroupedBelow: FunctionComponent = () => {
  const { id }:any = useParams();
  let history = useHistory();
  const { data, loading } = useQuery<
    { getBelongTo: IBelongsToData[] },
    {
      userId: number;
    }
  >(GET_BELONGS_TO, {
    variables: {
      userId: id ? parseInt(id) : 0,
    },
    fetchPolicy: 'cache-and-network',
  });
  return (
    <>
      <div className='form-section'>
        <h5 className='main-title mb-3'>
          {languageTranslation('SUBORDINATED_HEADING')}
        </h5>
      </div>
      <Table bordered hover responsive>
        <thead className='thead-bg'>
          <tr>
            <th className={'text-center sno-th-column'}>
              {languageTranslation('ID')}
            </th>
            <th>{languageTranslation('NAME')}</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className={'table-loader'} colSpan={6}>
                <Loader />
              </td>
            </tr>
          ) : data && data.getBelongTo && data.getBelongTo.length ? (
            data.getBelongTo.map(
              ({ id, firstName, lastName }: IBelongsToData, index: number) => {
                return (
                  <tr key={index}>
                    <td className={'text-center'}>{id}</td>
                    <td
                      className='text-capitalize cursor-pointer'
                      onClick={() =>
                        history.push(
                          AppRoutes.CARE_GIVER_VIEW.replace(
                            ':id',
                            id.toString(),
                          ),
                        )
                      }
                    >
                      {[lastName,firstName].join(' ')}
                    </td>
                  </tr>
                );
              },
            )
          ) : (
            <tr className={'text-center no-hover-row'}>
              <td colSpan={6} className={'pt-5 pb-5'}>
                <div className='no-data-section'>
                  <div className='no-data-icon'>
                    <i className='icon-ban' />
                  </div>
                  <h4 className='mb-1'>
                    {languageTranslation('NO_SUBORDINATED_MEG')}
                  </h4>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default GroupedBelow;
