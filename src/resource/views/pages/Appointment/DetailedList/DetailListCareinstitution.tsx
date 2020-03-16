import React from 'react';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { languageTranslation, logger } from '../../../../../helpers';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import refresh from '../../../../assets/img/refresh.svg';
import moment from 'moment';
import { defaultDateFormat } from './../../../../../config/constant';

const DetailListCareinstitution = (props: any) => {
  const {
    show,
    handleClose,
    selectedCellsCareinstitution,
    fetchCareinstitutionList
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
                  <span
                    className='header-nav-text'
                    onClick={() => fetchCareinstitutionList()}
                  >
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
                            logger('elem in careinst dfdf', elem);
                            return elem && elem.item ? (
                              <tr
                                key={index}
                                className={
                                  elem.item.status === 'offered'
                                    ? 'cell-green-caregiver'
                                    : elem.item.status === 'linked'
                                    ? 'matching-bg'
                                    : elem.item.status === 'confirmed'
                                    ? 'contract-bg'
                                    : 'cell-pink-careinstitution'
                                }
                              >
                                <td>{elem.item.id ? elem.item.id : '-'}</td>
                                <td>-</td>
                                <td>{elem.item.name ? elem.item.name : '-'}</td>
                                <td>
                                  {elem.item && elem.item.divisions
                                    ? elem.item.divisions.map((dept: any) => {
                                        return <span>{dept}</span>;
                                      })
                                    : null}
                                </td>
                                <td>
                                  {elem.item && elem.item.qualificationId
                                    ? elem.item.qualificationId.map(
                                        (quali: any) => {
                                          return (
                                            <span>{quali.label + ' '}</span>
                                          );
                                        }
                                      )
                                    : '-'}
                                </td>
                                <td>
                                  {elem.item &&
                                  elem.item.startTime &&
                                  elem.item.date
                                    ? moment(elem.item.date).format(
                                        defaultDateFormat
                                      ) +
                                      ' ' +
                                      elem.item.startTime
                                    : '-'}
                                </td>
                                <td>
                                  {elem.item &&
                                  elem.item.startTime &&
                                  elem.item.date
                                    ? moment(elem.item.date).format(
                                        defaultDateFormat
                                      ) +
                                      ' ' +
                                      elem.item.endTime
                                    : '-'}
                                </td>
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
                                  {elem.item.offerRemarks
                                    ? elem.item.offerRemarks
                                    : '-'}
                                </td>
                              </tr>
                            ) : null;
                          }
                        )
                      ) : (
                        <p>{languageTranslation('NO_DATA_FOUND')}</p>
                      )}
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
