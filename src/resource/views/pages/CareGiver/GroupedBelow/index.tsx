import React, { FunctionComponent } from 'react';
import { Table, Col } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import Loader from '../../../containers/Loader/Loader';

const data = [1, 'John Doe'];

const GroupedBelow: FunctionComponent = () => {
  return (
    <Col>
      <div className='form-section'>
        <h5 className='main-title mb-3'>Grouped Below</h5>
      </div>
      <Table bordered hover responsive>
        <thead className='thead-bg'>
          <tr>
            <th className={'text-center sno-th-column'}>
              {languageTranslation('S_NO')}
            </th>
            <th>{languageTranslation('NAME')}</th>
          </tr>
        </thead>
        <tbody>
          {false ? (
            <tr>
              <td className={'table-loader'} colSpan={6}>
                <Loader />
              </td>
            </tr>
          ) : data.length ? (
            data.map((attribute: any, index: number) => {
              return (
                <tr key={index}>
                  <td className={'text-center'}>{index + 1}</td>
                  <td className='text-capitalize'>{attribute.name}</td>
                </tr>
              );
            })
          ) : (
            <tr className={'text-center no-hover-row'}>
              <td colSpan={6} className={'pt-5 pb-5'}>
                <div className='no-data-section'>
                  <div className='no-data-icon'>
                    <i className='icon-ban' />
                  </div>
                  <h4 className='mb-1'>Currently there are no data Found. </h4>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Col>
  );
};

export default GroupedBelow;
