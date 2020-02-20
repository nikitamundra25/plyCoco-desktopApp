import React, { FunctionComponent } from 'react';
import { Col, Table } from 'reactstrap';
import { ICareGiverListComponentProps } from '../../../../interfaces/BulkEmailCaregiver';
import Loader from '../../containers/Loader/Loader';
import { languageTranslation } from '../../../../helpers';
import InfiniteScroll from 'react-infinite-scroll-component';

export const CareGiverListComponent: FunctionComponent<ICareGiverListComponentProps &
  any> = (props: ICareGiverListComponentProps & any) => {
  const {
    careGivers,
    handleSelectAll,
    called,
    loading,
    careGiverData,
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
  return (
    <Col lg={'5'}>
      <div id="scrollableDiv" className="caregiver-list custom-scroll">
        <InfiniteScroll
          dataLength={
            careGiverData && careGiverData.length ? careGiverData.length : 0
          } //This is important field to render the next data totalCount
          next={() => {
            handleInfiniteScroll();
          }}
          scrollableTarget="scrollableDiv"
          hasMore={
            careGivers &&
            careGivers.getCaregivers &&
            careGivers.getCaregivers.totalCount
              ? careGivers.getCaregivers.totalCount !== careGiverData.length
                ? true
                : false
              : false
          }
          loader={
            <div className="infinite-loader">
              <Loader />
            </div>
          }
        >
          <Table bordered hover responsive>
            <thead className="thead-bg">
              <tr>
                <th className="checkbox-th-column">
                  <span className=" checkbox-custom ">
                    <input
                      type="checkbox"
                      id="checkAll"
                      name="checkbox"
                      className=""
                      checked={
                        bulkcareGivers ? true : false
                        // careGivers &&
                        // careGivers.getCaregivers &&
                        // careGivers.getCaregivers.result.length ===
                        //   selectedCareGiver.length
                        //   ? true
                        //   : false
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleSelectAll(e);
                      }}
                    />
                    <label className=""></label>
                  </span>
                </th>
                <th>{languageTranslation('NAME')}</th>
                <th>{languageTranslation('EMAIL')}</th>
              </tr>
            </thead>
            <tbody>
              {page === 1 && (!called || loading) ? (
                <tr>
                  <td className={'table-loader'} colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              ) : careGiverData && careGiverData.length ? (
                careGiverData.map((careGivers: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      onClick={(e: any) => {
                        handleChecked(careGivers.id);
                      }}
                      className='cursor-pointer'
                    >
                      <td>
                        <span className=" checkbox-custom  ">
                          <input
                            type="checkbox"
                            id="check"
                            name="checkbox"
                            className=""
                            checked={
                              selectedCareGiver &&
                              selectedCareGiver.length &&
                              selectedCareGiver.indexOf(
                                parseInt(careGivers.id)
                              ) > -1
                                ? true
                                : false
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleCheckElement(e, careGivers.id);
                            }}
                          />
                          <label className=""></label>
                        </span>
                      </td>
                      <td>{`${careGivers.firstName} ${careGivers.lastName}`}</td>
                      <td>{careGivers.email}</td>
                    </tr>
                  );
                })
              ) : null}
            </tbody>
          </Table>
        </InfiniteScroll>
      </div>
    </Col>
  );
};
