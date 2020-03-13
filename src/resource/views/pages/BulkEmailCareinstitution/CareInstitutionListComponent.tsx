import React, { FunctionComponent } from 'react';
import { Col, Table } from 'reactstrap';
import { ICareGiverListComponentProps } from '../../../../interfaces/BulkEmailCaregiver';
import Loader from '../../containers/Loader/Loader';
import { languageTranslation } from '../../../../helpers';
import InfiniteScroll from 'react-infinite-scroll-component';

export const CareInstitutionListComponent: FunctionComponent<ICareGiverListComponentProps &
  any> = (props: ICareGiverListComponentProps & any) => {
  const {
    careInstitutions,
    handleSelectAll,
    called,
    loading,
    selectedCareGiver,
    handleCheckElement,
    handleInfiniteScroll,
    page,
    bulkcareGivers
  } = props;

  const handleChecked = (id: string) => {
    if (selectedCareGiver && selectedCareGiver.length) {
      const found = selectedCareGiver.some(
        (el: any) => parseInt(el) === parseInt(id)
      );
      const e = {
        target: {
          checked: !found
        }
      };
      handleCheckElement(e, id);
    } else {
      const e = {
        target: {
          checked: true
        }
      };
      handleCheckElement(e, id);
    }
  };
  console.log('called', called);
  console.log('loading', loading);

  return (
    <Col lg={'5'} className='pr-lg-0'>
      <div id='scrollableDiv' className='caregiver-list custom-scroll'>
        <InfiniteScroll
          dataLength={
            careInstitutions &&
            careInstitutions.careInstitutionData &&
            careInstitutions.careInstitutionData.length
              ? careInstitutions.careInstitutionData.length
              : 0
          } //This is important field to render the next data totalCount
          next={() => {
            // handleInfiniteScroll();
          }}
          scrollableTarget='scrollableDiv'
          hasMore={
            careInstitutions && careInstitutions.totalCount
              ? careInstitutions.totalCount !==
                careInstitutions.careInstitutionData.length
                ? true
                : false
              : false
          }
          loader={''}
        >
          <Table bordered hover responsive className='mb-0'>
            <thead className='thead-bg'>
              <tr>
                <th className='checkbox-th-column'>
                  <span className=' checkbox-custom '>
                    <input
                      type='checkbox'
                      id='checkAll'
                      name='checkbox'
                      className=''
                      checked={
                        bulkcareGivers ? true : false
                        // careInstitutions &&
                        // careInstitutions.careInstitutionData &&
                        // careInstitutions.careInstitutionData.result.length ===
                        //   selectedCareGiver.length
                        //   ? true
                        //   : false
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleSelectAll(e);
                      }}
                    />
                    <label className=''></label>
                  </span>
                </th>
                <th className=''>{languageTranslation('MENU_INSTITUTION')}</th>
                <th className=''>{languageTranslation('CONTACT')}</th>
                <th>{languageTranslation('NAME')}</th>
                <th className=''>{languageTranslation('EMAIL')}</th>
                <th>{languageTranslation('SALUTATION')}</th>
              </tr>
            </thead>
            <tbody>
              {page === 1 && (!called || loading) ? (
                <tr>
                  <td className={'table-loader'} colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              ) : careInstitutions &&
                careInstitutions.careInstitutionData &&
                careInstitutions.careInstitutionData.length ? (
                careInstitutions.careInstitutionData.map(
                  (item: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        onClick={(e: any) => {
                          handleChecked(item.id);
                        }}
                        className='cursor-pointer'
                      >
                        <td>
                          <span className=' checkbox-custom  '>
                            <input
                              type='checkbox'
                              id='check'
                              name='checkbox'
                              className=''
                              checked={
                                selectedCareGiver &&
                                selectedCareGiver.length &&
                                selectedCareGiver.indexOf(parseInt(item.id)) >
                                  -1
                                  ? true
                                  : false
                              }
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                handleCheckElement(e, item.id);
                              }}
                            />
                            <label className=''></label>
                          </span>
                        </td>
                        <td>{`${item.firstName} ${item.lastName}`}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{`${item.firstName} ${item.lastName}`}</td>
                        <td>{item.email}</td>
                        <td>{item.salutation}</td>
                      </tr>
                    );
                  }
                )
              ) : null}
            </tbody>
          </Table>
        </InfiniteScroll>
      </div>
    </Col>
  );
};
