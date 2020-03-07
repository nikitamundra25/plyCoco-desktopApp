import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import Select from 'react-select';
import logger from 'redux-logger';
import { languageTranslation } from '../../../../../helpers';
import { State } from '../../../../../config';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg'
import refresh from '../../../../assets/img/refresh.svg';

const DetailListCareinstitution = (props: any) => {
  const { show, handleClose } = props;

  const externalCloseBtn = (
    <button className='close modal-close' onClick={() => handleClose()}>
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );
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
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={refresh} alt='' />
                  </span>
                  <span className='header-nav-text'>
                    {languageTranslation('ALWAYS_IN_BACKGROUND')}
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
                      <tr>
                        <td> 3143156</td>
                        <td> Joh Doe</td>
                        <td> Testwerk</td>
                        <td>Station2</td>
                        <td> Altenpfleger, Hauskrankenpflege</td>
                        <td>Tue, 03.03.2020 06:00</td>
                        <td>Tue, 03.03.2020 14:00</td>
                        <td>
                          <span className='checkbox-custom '>
                            <input type='checkbox' id='checkAll' className='' />
                            <label className=''> </label>
                          </span>
                        </td>
                        <td></td>
                      </tr>
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
