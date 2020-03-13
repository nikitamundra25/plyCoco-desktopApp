import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import { defaultDateFormat } from '../../../../../config';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import refresh from '../../../../assets/img/refresh.svg';
import moment from 'moment';

const DetailListCaregiver = (props: any) => {
  const { show, handleClose, selectedCells, qualificationList } = props;
  const [workingHourTab, setWorkingHourTab] = useState<boolean>(false);
  const externalCloseBtn = (
    <button
      className='close modal-close'
      onClick={() => {
        setWorkingHourTab(false);
        handleClose();
      }}
    >
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
          {languageTranslation('DETAIL_LIST_CAREGIVER')}{' '}
        </ModalHeader>
        <ModalBody>
          <div className='common-detail-page'>
            <div className='common-detail-section'>
              <div className='common-topheader d-flex align-items-center '>
                <div className='header-nav-item'>
                  <span className='header-nav-icon'>
                    <img src={refresh} alt='' />
                  </span>
                  {/* window.location.reload(); */}
                  <span className='header-nav-text'>
                    {languageTranslation('REFRESH')}
                  </span>
                </div>
              </div>
              <div className='common-sidnav'>
                <ul className='common-ul nav nav-tabs'>
                  <li className='nav-item'>
                    <a
                      className={`nav-link ${!workingHourTab ? 'active' : ''}`}
                    >
                      <span
                        className='nav-text text-capitalize'
                        onClick={() => setWorkingHourTab(false)}
                      >
                        {languageTranslation('BOOKING_DETAILS')}
                      </span>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className={`nav-link ${workingHourTab ? 'active' : ''}`}>
                      <span
                        className='nav-text text-capitalize'
                        onClick={() => setWorkingHourTab(true)}
                      >
                        {languageTranslation('PRICE_AND_WORKING')}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className='common-content flex-grow-1 px-0 bg-white'>
                {!workingHourTab ? (
                  <div className='table-minheight '>
                    <Table bordered hover responsive>
                      <thead className='thead-bg'>
                        <tr>
                          <th> {languageTranslation('ID')}</th>
                          <th> {languageTranslation('MENU_CAREGIVER')}</th>
                          <th> {languageTranslation('MENU_INSTITUTION')}</th>
                          <th> {languageTranslation('QUALIFICATION')}</th>
                          <th>{languageTranslation('DATE')}</th>
                          <th>{languageTranslation('BEGIN')}</th>
                          <th>{languageTranslation('END')}</th>
                          <th>{languageTranslation('DEPARTMENT')}</th>

                          <th>{languageTranslation('DLN_REQUIRED')}</th>
                          <th>{languageTranslation('DLN_AVAILABLE')}</th>
                          <th>{languageTranslation('REMARKS')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCells ? (
                          selectedCells.map((elem: any, index: number) => {
                            console.log('elem.item', elem.item);
                            return elem && elem.item ? (
                              <tr
                                key={index}
                                className={
                                  elem.item.status === 'linked'
                                    ? 'matching-bg'
                                    : elem.item.status === 'confirmed'
                                    ? 'contract-bg'
                                    : 'cell-green-caregiver'
                                }
                              >
                                <td> {elem.item.id ? elem.item.id : null}</td>
                                <td>
                                  {elem.lastName && elem.firstName
                                    ? [elem.lastName, elem.firstName].join(' ')
                                    : '-'}
                                </td>
                                <td> -</td>

                                <td>
                                  {elem.caregiver &&
                                  elem.caregiver.attributes &&
                                  qualificationList
                                    ? qualificationList
                                        .filter((qualification: any) => {
                                          elem.caregiver.attributes.includes(
                                            qualification.value
                                          );
                                        })
                                        .map((q: any) => {
                                          <span>{q.label + ' '}</span>;
                                        })
                                    : null}
                                </td>
                                <td>
                                  {elem.item.date
                                    ? moment(elem.item.date).format(
                                        defaultDateFormat
                                      )
                                    : null}
                                </td>
                                <td>
                                  {elem.item.f === 'available' ? 'f' : null}
                                  {elem.item.s === 'available' ? 's' : null}
                                  {elem.item.n === 'available' ? 'n' : null}
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
                                        elem.item.workingProofRecieved
                                          ? true
                                          : false
                                      }
                                    />
                                    <label className=''> </label>
                                  </span>
                                </td>
                                <td>
                                  <span className='checkbox-custom '>
                                    <input
                                      type='checkbox'
                                      id='checkAll'
                                      className=''
                                    />
                                    <label className=''> </label>
                                  </span>
                                </td>
                                <td>
                                  {elem.item.remarksCareGiver
                                    ? elem.item.remarksCareGiver
                                    : null}
                                </td>
                              </tr>
                            ) : null;
                          })
                        ) : (
                          <p>No data found</p>
                        )}
                      </tbody>
                    </Table>
                  </div>
                ) : null}
                {workingHourTab ? (
                  <div className='table-minheight '>
                    <Table bordered hover responsive>
                      <thead className='thead-bg'>
                        <tr>
                          <th> {languageTranslation('ID')}</th>
                          <th> {languageTranslation('MENU_CAREGIVER')}</th>
                          <th> {languageTranslation('MENU_INSTITUTION')}</th>
                          <th> {languageTranslation('DATE')}</th>
                          <th>{languageTranslation('FEE')}</th>
                          <th>{languageTranslation('NIGHT_FEE')}</th>
                          <th>{languageTranslation('WEEKEND_FEE')}</th>
                          <th>{languageTranslation('HOLIDAY_FEE')}</th>
                          <th>
                            {languageTranslation('WORKING_HOURS')}{' '}
                            {languageTranslation('BEGIN')}
                          </th>
                          <th>
                            {languageTranslation('WORKING_HOURS')}{' '}
                            {languageTranslation('END')}
                          </th>
                          <th>
                            {languageTranslation('BREAK')}{' '}
                            {languageTranslation('BEGIN')}
                          </th>
                          <th>
                            {languageTranslation('BREAK')}{' '}
                            {languageTranslation('END')}
                          </th>

                          <th>{languageTranslation('KILOMETER')}</th>
                          <th>{languageTranslation('FEE_PER_KM')}</th>

                          <th>{languageTranslation('DLN_REQUIRED')}</th>
                          <th>{languageTranslation('DLN_AVAILABLE')}</th>
                          <th>{languageTranslation('NIGHT_ALLOWANCE')}</th>
                          <th>Factoring Contracts</th>
                          <th>{languageTranslation('FACTORING')}</th>
                        </tr>
                      </thead>
                      {selectedCells
                        ? selectedCells.map((elem: any) => {
                            return elem && elem.item ? (
                              <tr>
                                <td> {elem.id ? elem.id : null}</td>
                                <td>
                                  {elem.lastName
                                    ? elem.lastName
                                    : null + ' ' + elem && elem.lastName
                                    ? elem.firstName
                                    : null}
                                </td>
                                <td> -</td>
                                <td>
                                  {elem.item.date
                                    ? moment(elem.item.date).format(
                                        defaultDateFormat
                                      )
                                    : null}
                                </td>
                                <td>{elem.item.fee ? elem.item.fee : null}</td>
                                <td>
                                  {elem.item.nightFee
                                    ? elem.item.nightFee
                                    : null}
                                </td>
                                <td>
                                  {elem.item.weekendAllowance
                                    ? elem.item.weekendAllowance
                                    : null}
                                </td>
                                <td>
                                  {elem.item.holidayAllowance
                                    ? elem.item.holidayAllowance
                                    : null}
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                  {elem.item.distanceInKM
                                    ? elem.item.distanceInKM
                                    : '-'}
                                </td>
                                <td>
                                  {elem.item.feePerKM
                                    ? elem.item.feePerKM
                                    : null}
                                </td>
                                <td>
                                  <span className='checkbox-custom '>
                                    <input
                                      type='checkbox'
                                      id='checkAll'
                                      className=''
                                      checked={
                                        elem.item.workingProofRecieved
                                          ? true
                                          : false
                                      }
                                    />
                                    <label className=''> </label>
                                  </span>
                                </td>
                                <td>
                                  <span className='checkbox-custom '>
                                    <input
                                      type='checkbox'
                                      id='checkAll'
                                      className=''
                                    />
                                    <label className=''> </label>
                                  </span>
                                </td>
                                <td>
                                  {elem.item.nightAllowance
                                    ? elem.item.nightAllowance
                                    : null}
                                </td>
                                <td>-</td>
                                <td>-</td>{' '}
                              </tr>
                            ) : null;
                          })
                        : null}
                      <tbody></tbody>
                    </Table>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DetailListCaregiver;
