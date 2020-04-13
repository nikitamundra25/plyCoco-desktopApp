import React from 'react';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { languageTranslation, logger } from '../../../../../helpers';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import moment from 'moment';
import { defaultDateFormat } from './../../../../../config/constant';

const DetailListCareinstitution = (props: any) => {
  const {
    show,
    handleClose,
    selectedCellsCareinstitution,
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
              <div className='common-content flex-grow-1 p-0 pb-1 mb-2 bg-white'>
                <div className='table-detail-list-careinstitution '>
                  <Table
                    bordered
                    hover
                    responsive
                    className='detail-table mb-0'
                  >
                    <thead className='thead-bg'>
                      <tr>
                        <th className='text-center id-col'>
                          {' '}
                          {languageTranslation('ID')}
                        </th>
                        <th className='caregiver-col'>
                          {' '}
                          {languageTranslation('MENU_CAREGIVER')}
                        </th>
                        <th className='careinstitution-col'>
                          {' '}
                          {languageTranslation('MENU_INSTITUTION')}
                        </th>
                        <th className='department-col'>
                          {languageTranslation('DEPARTMENT')}
                        </th>
                        <th className='qualification-col'>
                          {' '}
                          {languageTranslation('QUALIFICATION')}
                        </th>
                        <th className='datetime-col'>
                          {languageTranslation('BEGIN')}
                        </th>
                        <th className='datetime-col'>
                          {languageTranslation('END')}
                        </th>
                        <th className='dln-col'>
                          {languageTranslation('DLN')}
                        </th>
                        <th className='comment-col'>
                          {languageTranslation('COMMENTS')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCellsCareinstitution ? (
                        selectedCellsCareinstitution.map(
                          (elem: any, index: number) => {
                            return elem && elem.item && elem.item.id ? (
                              <tr
                                key={index}
                                className={
                                  elem.item.status === 'offered'
                                    ? 'availability-bg'
                                    : elem.item.status === 'linked'
                                    ? 'matching-bg'
                                    : elem.item.status === 'confirmed'
                                    ? 'contract-bg'
                                    : 'requirement-bg'
                                }
                              >
                                <td className='text-center id-col'>
                                  {elem.item.id ? elem.item.id : '-'}
                                </td>
                                <td className='caregiver-col word-wrap text-capitalize'>
                                  {elem.item.status === 'offered' ||
                                  elem.item.status === 'default'
                                    ? '-'
                                    : elem.item && elem.item.appointments
                                    ? elem.item.appointments[0] &&
                                      elem.item.appointments[0].ca &&
                                      elem.item.appointments[0].ca.name
                                      ? elem.item.appointments[0].ca.name
                                      : null
                                    : null}
                                </td>
                                <td className='careinstitution-col  word-wrap text-capitalize'>
                                  {elem.item.name ? elem.item.name : '-'}
                                </td>
                                <td className='text-capitalize'>
                                  {elem.item &&
                                  elem.item.division &&
                                  elem.item.division.name
                                    ? elem.item.division.name
                                    : '-'}
                                </td>
                                <td className='qualification-col word-wrap text-capitalize'>
                                  {elem.item && elem.item.qualificationId
                                    ? elem.item.qualificationId.map((q: any,i:number) => (q && q.label ? q.label : "")).join(', ')
                                    : '-'}
                                </td>
                                <td className='datetime-col'>
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
                                <td className='datetime-col'>
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
                                <td className='dln-col'>
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
                                <td className='comment-col word-wrap'>
                                  {elem.item.offerRemarks
                                    ? elem.item.offerRemarks
                                    : '-'}
                                </td>
                              </tr>
                            ) : null;
                          }
                        )
                      ) : (
                        <tr className={'text-center no-hover-row'}>
                          <td colSpan={10} className={'pt-5 pb-5'}>
                            <div className='no-data-section'>
                              <div className='no-data-icon'>
                                <i className='icon-ban' />
                              </div>
                              <h4 className='mb-1'>
                              {languageTranslation('NO_DATA_FOUND')}{' '}
                              </h4>
                            </div>
                          </td>
                        </tr>
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
