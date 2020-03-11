import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import Select from 'react-select';
import logger from 'redux-logger';
import { languageTranslation } from '../../../../../helpers';
import { State } from '../../../../../config';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import refresh from '../../../../assets/img/refresh.svg';

const DetailListCareinstitution = (props: any) => {
  const {
    show,
    handleClose,
    selectedCell,
    qualificationList,
    activeDateCaregiver
  } = props;

  const externalCloseBtn = (
    <button className='close modal-close' onClick={() => handleClose()}>
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );
  console.log('activeDateCaregiver', activeDateCaregiver);

  return (
    <div>
      <Modal
        isOpen={show}
        className='common-modal attribute-modal'
        centered
        size='xl'
      >
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation('DETAIL_LIST_CAREINSTITUTION')}{' '}
        </ModalHeader>
        <ModalBody>
          <div className='common-detail-page'>
            <div className='common-detail-section'>
              <div className='common-topheader d-flex align-items-center '>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={refresh} alt='' />
                  </span>
                  <span className='header-nav-text'>
                    {languageTranslation('REFRESH')}
                  </span>
                </div>
              </div>
              <div className='common-content flex-grow-1 px-0 bg-white'>
                <div className='table-minheight '>
                  <Table bordered hover responsive>
                    <thead className='thead-bg'>
                      <tr>
                        <th> {languageTranslation('ID')}</th>
                        <th> {languageTranslation('MENU_CAREGIVER')}</th>
                        <th> {languageTranslation('MENU_INSTITUTION')}</th>
                        <th>{languageTranslation('DEPARTMENT')}</th>
                        <th> {languageTranslation('QUALIFICATION')}</th>
                        <th>{languageTranslation('BEGIN')}</th>
                        <th>{languageTranslation('END')}</th>
                        <th>{languageTranslation('DLN')}</th>
                        <th>{languageTranslation('COMMENTS')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCell
                        ? selectedCell.map((item: any, index: number) => {
                            console.log('item!!!!!', item.props.list);
                            const details: any =
                              item && item.props && item.props.list
                                ? item.props.list
                                : '';
                            const date =
                              item && item.props && item.props.day
                                ? item.props.day
                                : '';
                            return (
                              <tr key={index}>
                                <td> {details.id}</td>
                                <td>
                                  {details.lastName + ' ' + details.firstName}
                                </td>
                                <td> -</td>
                                <td>Station2</td>
                                <td>
                                  {item &&
                                  item.props &&
                                  item.props.list &&
                                  item.props.list
                                    .careinstitution_requirements &&
                                  item.props.list.careinstitution_requirements
                                    .length
                                    ? item.props.list.careinstitution_requirements.map(
                                        (elem: any) => {
                                          let positiveNamesArr: any = [];
                                          qualificationList.filter(
                                            (item: any) => {
                                              const temp = elem.qualificationId.includes(
                                                item.value
                                              );
                                              if (temp) {
                                                positiveNamesArr.push(
                                                  item.label
                                                );
                                              }
                                            }
                                          );
                                          return positiveNamesArr.map(
                                            (item: any) => {
                                              return item + ',' + ' ';
                                            }
                                          );
                                        }
                                      )
                                    : null}
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                  <span
                                    key={index}
                                    className='checkbox-custom '
                                  >
                                    {item &&
                                    item.props &&
                                    item.props.list &&
                                    item.props.list
                                      .careinstitution_requirements &&
                                    item.props.list.careinstitution_requirements
                                      .length
                                      ? item.props.list.careinstitution_requirements.map(
                                          (item: any, index: number) => {
                                            console.log('working proof', item);

                                            return (
                                              <>
                                                <input
                                                  type='checkbox'
                                                  id='checkAll'
                                                  className=''
                                                  checked={
                                                    item.workingProofRecieved
                                                      ? true
                                                      : false
                                                  }
                                                />
                                                <label className=''> </label>
                                              </>
                                            );
                                          }
                                        )
                                      : null}
                                  </span>
                                </td>
                                <td></td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DetailListCareinstitution;
