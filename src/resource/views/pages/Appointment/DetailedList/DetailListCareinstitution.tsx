import React from 'react';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import refresh from '../../../../assets/img/refresh.svg';

const DetailListCareinstitution = (props: any) => {
  const {
    show,
    handleClose,
    qualificationList,
    selectedCellsCareinstitution
  } = props;

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
              <div className='common-topheader d-flex align-items-center'>
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
                      {selectedCellsCareinstitution ? (
                        selectedCellsCareinstitution.map(
                          (elem: any, index: number) => {
                            return elem && elem.item ? (
                              <tr key={index}>
                                <td> {elem.id ? elem.id : null}</td>
                                <td>
                                  {elem.item.name ? elem.item.name : null}
                                </td>
                                <td>Station</td>
                                <td>
                                  {elem.item.qualificationId &&
                                  qualificationList
                                    ? qualificationList
                                        .filter((qualification: any) =>
                                          elem.item.qualificationId.includes(
                                            qualification.value
                                          )
                                        )
                                        .map((q: any) => (
                                          <span>{q.label + ' '}</span>
                                        ))
                                    : null}
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                  <span className='checkbox-custom '>
                                    <input
                                      type='checkbox'
                                      id='checkAll'
                                      className=''
                                      checked={
                                        elem.item.isWorkingProof ? true : false
                                      }
                                    />
                                    <label className=''> </label>
                                  </span>
                                </td>
                                <td>
                                  {elem.item.departmentOfferRemarks
                                    ? elem.item.departmentOfferRemarks
                                    : null}
                                </td>
                              </tr>
                            ) : null;
                          }
                        )
                      ) : (
                        <p>No data found</p>
                      )}
                      }
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
