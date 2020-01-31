import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useLazyQuery } from '@apollo/react-hooks';
import { NoSearchFound } from '../../components/SearchFilter/NoSearchFound';
import { languageTranslation } from '../../../../helpers';
import { AttributeQueries } from '../../../../graphql/queries';
import Loader from '../../containers/Loader/Loader';

const [GET_ATTRIBUTES_TYPE] = AttributeQueries;

const AttributeManageMent = () => {
  // To get attributes types
  const [getAtrributeHeading, { data, loading, refetch }] = useLazyQuery<any>(
    GET_ATTRIBUTES_TYPE,
    {
      fetchPolicy: 'no-cache',
    },
  );
  useEffect(() => {
    getAtrributeHeading();
  }, []);
  console.log(data, 'dataaaaa');

  return (
    <Table bordered hover responsive>
      <thead className='thead-bg'>
        <tr>
          <th className={'text-center'}>{languageTranslation('S_NO')}</th>
          <th className='region-th-column'>
            {languageTranslation('REGION_NAME')}
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td className={'table-loader'} colSpan={6}>
              <Loader />
            </td>
          </tr>
        ) : data &&
          data.getRegions &&
          data.getRegions.regionData &&
          data.getRegions.regionData.length ? (
          data.getRegions.regionData.map((region: any, index: number) => {
            return (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className='text-capitalize'>{region.regionName}</td>
              </tr>
            );
          })
        ) : (
          <tr className={'text-center no-hover-row'}>
            <td colSpan={6} className={'pt-5 pb-5'}>
              {false ? (
                <NoSearchFound />
              ) : (
                <div className='no-data-section'>
                  <div className='no-data-icon'>
                    <i className='icon-ban' />
                  </div>
                  <h4 className='mb-1'>
                    Currently there are no attribute added.{' '}
                  </h4>
                  <p>Please click above button to add new.</p>
                </div>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AttributeManageMent;
