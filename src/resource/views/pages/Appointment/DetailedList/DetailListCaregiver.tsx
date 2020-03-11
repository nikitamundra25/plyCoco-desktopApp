import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import Select from 'react-select';
import logger from 'redux-logger';
import { languageTranslation } from '../../../../../helpers';
import { State } from '../../../../../config';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import refresh from '../../../../assets/img/refresh.svg';

const DetailListCaregiver = (props: any) => {
  const {
    show,
    handleClose,
    selectedCell,
    allAvailabilities,
    activeDateCaregiver
  } = props;
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
                        {allAvailabilities &&
                        allAvailabilities.length &&
                        selectedCell ? (
                          selectedCell.map((item: any) => {
                            console.log('item in cg', item);
                            const details: any =
                              item && item.props && item.props.list
                                ? item.props.list
                                : '';
                            const date =
                              item && item.props && item.props.day
                                ? item.props.day
                                : '';
                            return (
                              <tr
                                className={
                                  item &&
                                  item.props &&
                                  item.props.item &&
                                  item.props.item.length
                                    ? item.props.item.map((item: any) => {
                                        item.status === 'default'
                                          ? 'approve-bg'
                                          : 'table-danger';
                                      })
                                    : null
                                }
                              >
                                <td> {details.id}</td>
                                <td>
                                  {details.lastName + ' ' + details.firstName}
                                </td>
                                <td> -</td>
                                <td> -</td>
                                <td>
                                  {date.day + ',' + ' ' + date.dateString}
                                </td>
                                <td>
                                  {item &&
                                  item.props &&
                                  item.props.item &&
                                  item.props.item.length
                                    ? item.props.item.map((item: any) => {
                                        console.log('item in caregiver', item);

                                        return (
                                          <>
                                            {item.f === 'available'
                                              ? 'f'
                                              : null}
                                            {item.s === 'available'
                                              ? 's'
                                              : null}
                                            {item.n === 'available'
                                              ? 'n'
                                              : null}
                                          </>
                                        );
                                      })
                                    : null}
                                </td>
                                <td>-</td>
                                <td>-</td>
                                {item &&
                                item.props &&
                                item.props.item &&
                                item.props.item.length
                                  ? item.props.item.map((item: any) => {
                                      return (
                                        <td>
                                          <span className='checkbox-custom '>
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
                                          </span>
                                        </td>
                                      );
                                    })
                                  : null}
                                <td>
                                  {item &&
                                  item.props &&
                                  item.props.item &&
                                  item.props.item.length
                                    ? item.props.item.map((item: any) => {
                                        return item.remarksCareGiver;
                                      })
                                    : null}
                                </td>
                              </tr>
                            );
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
                      {selectedCell
                        ? selectedCell.map((item: any) => {
                            const details: any =
                              item && item.props && item.props.list
                                ? item.props.list
                                : '';
                            const date =
                              item && item.props && item.props.day
                                ? item.props.day
                                : '';
                            return (
                              <tr>
                                <td>{details.id}</td>
                                <td>
                                  {details.lastName + ' ' + details.firstName}
                                </td>
                                <td> -</td>
                                <td>
                                  {date.day + ',' + ' ' + date.dateString}
                                </td>
                                <td>
                                  {item &&
                                  item.props &&
                                  item.props.item &&
                                  item.props.item.length
                                    ? item.props.item.map((item: any) => {
                                        return item.fee;
                                      })
                                    : null}
                                </td>
                                <td>
                                  {item &&
                                  item.props &&
                                  item.props.item &&
                                  item.props.item.length
                                    ? item.props.item.map((item: any) => {
                                        return item.nightFee;
                                      })
                                    : null}
                                </td>
                                <td>
                                  {item &&
                                  item.props &&
                                  item.props.item &&
                                  item.props.item.length
                                    ? item.props.item.map((item: any) => {
                                        return item.weekendAllowance;
                                      })
                                    : null}
                                </td>
                                <td>
                                  {item &&
                                  item.props &&
                                  item.props.item &&
                                  item.props.item.length
                                    ? item.props.item.map((item: any) => {
                                        return item.holidayAllowance;
                                      })
                                    : null}
                                </td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>
                                  {item &&
                                  item.props &&
                                  item.props.item &&
                                  item.props.item.length
                                    ? item.props.item.map((item: any) => {
                                        return item.distanceInKM;
                                      })
                                    : null}
                                </td>
                                <td>
                                  <span className='checkbox-custom '>
                                    {item &&
                                    item.props &&
                                    item.props.item &&
                                    item.props.item.length
                                      ? item.props.item.map(
                                          (item: any, index: number) => {
                                            console.log(
                                              'item.workingProofRecieved',
                                              item.workingProofRecieved
                                            );
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
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                              </tr>
                            );
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
