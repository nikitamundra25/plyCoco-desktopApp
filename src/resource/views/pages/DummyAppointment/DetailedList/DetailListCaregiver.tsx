import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import { defaultDateFormat } from '../../../../../config';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import refresh from '../../../../assets/img/refresh.svg';
import moment from 'moment';
class DetailListCaregiver extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      workingHourTab: false,
      isExpand: false,
      activeRow: -1,
    };
  }
  externalCloseBtn = (
    <button
      className='close modal-close'
      onClick={() => {
        this.setState({
          workingHourTab: false,
        });
        this.props.handleClose();
      }}
    >
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );
  expandedText = (index: number) => {
    const { activeRow, isExpand } = this.state;
    this.setState({
      isExpand: activeRow === index || activeRow === -1 ? !isExpand : isExpand,
      activeRow: activeRow === index ? -1 : index,
    });
  };
  render() {
    let name: any;
    let quali: any;
    let dept: any;
    let startTime: any;
    let endTime: any;
    const { show, handleClose, selectedCells, qualificationList } = this.props;
    const { workingHourTab, activeRow, isExpand } = this.state;
    return (
      <div>
        <Modal
          isOpen={show}
          className='common-modal attribute-modal'
          centered
          size='xl'
        >
          <ModalHeader close={this.externalCloseBtn}>
            {languageTranslation('DETAIL_LIST_CAREGIVER')}{' '}
          </ModalHeader>
          <ModalBody>
            <div className='common-detail-page'>
              <div className='common-detail-section'>
                <Nav tabs className='contact-tabs mb-1'>
                  <NavItem className='text-capitalize'>
                    <NavLink
                      className={`mb-2 ${!workingHourTab ? 'active' : ''}`}
                      onClick={() =>
                        this.setState({
                          workingHourTab: false,
                        })
                      }
                    >
                      {languageTranslation('BOOKING_DETAILS')}
                    </NavLink>
                  </NavItem>
                  <NavItem className='text-capitalize'>
                    <NavLink
                      className={`mb-2 ${workingHourTab ? 'active' : ''}`}
                      onClick={() =>
                        this.setState({
                          workingHourTab: true,
                        })
                      }
                    >
                      {languageTranslation('PRICE_AND_WORKING')}
                    </NavLink>
                  </NavItem>
                </Nav>
                <div className='common-content flex-grow-1 p-0 pb-1 mb-2 bg-white'>
                  {!workingHourTab ? (
                    <div className='table-detail-list-caregiver'>
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
                            <th className='whitespace-nowrap caregiver-col'>
                              {' '}
                              {languageTranslation('MENU_CAREGIVER')}
                            </th>
                            <th className='whitespace-nowrap careinstitution-col'>
                              {' '}
                              {languageTranslation('MENU_INSTITUTION')}
                            </th>
                            <th className='qualification-col'>
                              {languageTranslation('QUALIFICATION')}
                            </th>
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
                              elem.item && elem.item.appointments
                                ? elem.item.appointments.map((a: any) => {
                                    name =
                                      a && a.cr && a.cr.name ? a.cr.name : null;
                                    startTime =
                                      a && a.cr && a.cr.startTime
                                        ? a.cr.startTime
                                        : null;
                                    endTime =
                                      a && a.cr && a.cr.endTime
                                        ? a.cr.endTime
                                        : null;
                                    quali =
                                      a && a.cr && a.cr.qualificationId
                                        ? a.cr.qualificationId
                                        : null;
                                    dept =
                                      a &&
                                      a.cr &&
                                      a.cr.division &&
                                      a.cr.division.name
                                        ? a.cr.division.name
                                        : null;
                                  })
                                : null;
                              return elem &&
                                elem.item &&
                                (elem.item.f === 'available' ||
                                  elem.item.s === 'available' ||
                                  elem.item.n === 'available') ? (
                                <tr
                                  key={index}
                                  className={
                                    elem.item.status === 'linked'
                                      ? 'matching-bg'
                                      : elem.item.status === 'confirmed' ||
                                        elem.item.status === 'timeSheetPending'
                                      ? 'contract-bg'
                                      : elem.item.status === 'contractCancelled'
                                      ? 'cancel-contract-bg'
                                      : elem.item.status === 'contractInitiated'
                                      ? 'contact-initiate-bg'
                                      : elem.item.status === 'accepted'
                                      ? 'accepted-bg'
                                      : 'availability-bg'
                                  }
                                >
                                  <td className='text-center id-col'>
                                    {' '}
                                    {elem.item.id ? elem.item.id : null}
                                  </td>
                                  <td className='caregiver-col word-wrap text-capitalize'>
                                    {elem.lastName && elem.firstName
                                      ? [elem.lastName, elem.firstName].join(
                                          ' '
                                        )
                                      : '-'}
                                  </td>
                                  <td className='careinstitution-col word-wrap text-capitalize'>
                                    {elem.item.status === 'default'
                                      ? '-'
                                      : name}
                                  </td>
                                  <td className='qualification-col word-wrap text-capitalize'>
                                    {elem.item.status === 'default'
                                      ? '-'
                                      : quali && qualificationList
                                      ? qualificationList
                                          .filter((qualification: any) => {
                                            return quali.includes(
                                              qualification.value
                                            );
                                          })
                                          .map((q: any, i: number) => q.label)
                                          .join(', ')
                                      : null}
                                  </td>
                                  <td>
                                    {elem.item.date
                                      ? moment(elem.item.date).format(
                                          defaultDateFormat
                                        )
                                      : '-'}
                                  </td>
                                  <td>
                                    {elem.item.status === 'default' ? (
                                      <>
                                        {elem.item.f === 'available'
                                          ? 'f'
                                          : null}
                                        {elem.item.s === 'available'
                                          ? 's'
                                          : null}
                                        {elem.item.n === 'available'
                                          ? 'n'
                                          : null}
                                      </>
                                    ) : (
                                      <span>{startTime}</span>
                                    )}
                                  </td>
                                  <td>
                                    {elem.item.status === 'default'
                                      ? '-'
                                      : endTime}
                                  </td>
                                  <td className='text-capitalize'>
                                    {elem.item.status === 'default'
                                      ? '-'
                                      : dept}
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
                                  <td className='comment-col word-wrap'>
                                    {elem.item.remarksCareGiver ? (
                                      elem.item.remarksCareGiver.length <=
                                      100 ? (
                                        elem.item.remarksCareGiver
                                      ) : (
                                        <p className='mb-0'>
                                          {isExpand && activeRow === index
                                            ? elem.item.remarksCareGiver
                                            : elem.item.remarksCareGiver.substr(
                                                0,
                                                100
                                              )}
                                          ...
                                          <span
                                            className='view-more-link'
                                            onClick={() =>
                                              this.expandedText(index)
                                            }
                                          >
                                            {isExpand && activeRow === index
                                              ? 'Read less'
                                              : 'Read more'}
                                          </span>
                                        </p>
                                      )
                                    ) : (
                                      '-'
                                    )}
                                  </td>
                                </tr>
                              ) : null;
                            })
                          ) : (
                            <tr className={'text-center no-hover-row'}>
                              <td colSpan={11} className={'pt-5 pb-5'}>
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
                  ) : null}
                  {workingHourTab ? (
                    <div className='table-detail-list-caregiver'>
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
                            <th className='whitespace-nowrap caregiver-col'>
                              {' '}
                              {languageTranslation('MENU_CAREGIVER')}
                            </th>
                            <th className='whitespace-nowrap careinstitution-col'>
                              {' '}
                              {languageTranslation('MENU_INSTITUTION')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {' '}
                              {languageTranslation('DATE')}
                            </th>
                            <th className='whitespace-nowrap text-center'>
                              {languageTranslation('FEE')}
                            </th>
                            <th className='whitespace-nowrap text-center'>
                              {languageTranslation('NIGHT_FEE')}
                            </th>
                            <th className='whitespace-nowrap text-center'>
                              {languageTranslation('WEEKEND_FEE')}
                            </th>
                            <th className='whitespace-nowrap text-center'>
                              {languageTranslation('HOLIDAY_FEE')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {languageTranslation('WORKING_HOURS')}{' '}
                              {languageTranslation('BEGIN')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {languageTranslation('WORKING_HOURS')}{' '}
                              {languageTranslation('END')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {languageTranslation('BREAK')}{' '}
                              {languageTranslation('BEGIN')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {languageTranslation('BREAK')}{' '}
                              {languageTranslation('END')}
                            </th>

                            <th className='whitespace-nowrap text-center'>
                              {languageTranslation('KILOMETER')}
                            </th>
                            <th className='whitespace-nowrap text-center'>
                              {languageTranslation('FEE_PER_KM')} 3
                            </th>

                            <th className='whitespace-nowrap '>
                              {languageTranslation('DLN_REQUIRED')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {languageTranslation('DLN_AVAILABLE')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {languageTranslation('NIGHT_ALLOWANCE')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {languageTranslation('FACTORING_CONTRACT')}
                            </th>
                            <th className='whitespace-nowrap '>
                              {languageTranslation('FACTORING')}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCells ? (
                            selectedCells.map((elem: any, index: number) => {
                              elem.item && elem.item.appointments
                                ? elem.item.appointments.map((a: any) => {
                                    name =
                                      a && a.cr && a.cr.name ? a.cr.name : null;
                                    startTime =
                                      a && a.cr && a.cr.startTime
                                        ? a.cr.startTime
                                        : null;
                                    endTime =
                                      a && a.cr && a.cr.endTime
                                        ? a.cr.endTime
                                        : null;
                                  })
                                : null;
                              return elem &&
                                elem.item &&
                                (elem.item.f === 'available' ||
                                  elem.item.s === 'available' ||
                                  elem.item.n === 'available') ? (
                                <tr
                                  key={index}
                                  className={
                                    elem.item.status === 'linked'
                                      ? 'matching-bg'
                                      : elem.item.status === 'confirmed'
                                      ? 'contract-bg'
                                      : elem.item.status === 'contractCancelled'
                                      ? 'cancel-contract-bg'
                                      : elem.item.status === 'contractInitiated'
                                      ? 'contact-initiate-bg'
                                      : elem.item.status === 'accepted'
                                      ? 'accepted-bg'
                                      : 'availability-bg'
                                  }
                                >
                                  <td className='text-center id-col'>
                                    {' '}
                                    {elem.item.id ? elem.item.id : null}
                                  </td>
                                  <td className='caregiver-col word-wrap text-capitalize'>
                                    {elem.lastName && elem.firstName
                                      ? [elem.lastName, elem.firstName].join(
                                          ' '
                                        )
                                      : '-'}
                                  </td>
                                  <td className='careinstitution-col word-wrap text-capitalize'>
                                    {elem.item.status === 'default'
                                      ? '-'
                                      : name}
                                  </td>
                                  <td>
                                    {elem.item.date
                                      ? moment(elem.item.date).format(
                                          defaultDateFormat
                                        )
                                      : '-'}
                                  </td>
                                  <td className='text-center'>
                                    {elem.item.fee ? elem.item.fee : '-'}
                                  </td>
                                  <td className='text-center'>
                                    {elem.item.nightFee
                                      ? elem.item.nightFee
                                      : '-'}
                                  </td>
                                  <td className='text-center'>
                                    {elem.item.weekendAllowance
                                      ? elem.item.weekendAllowance
                                      : '-'}
                                  </td>
                                  <td className='text-center'>
                                    {elem.item.holidayAllowance
                                      ? elem.item.holidayAllowance
                                      : '-'}
                                  </td>
                                  <td>
                                    {elem.item.status === 'default'
                                      ? '-'
                                      : startTime}
                                  </td>
                                  <td>
                                    {elem.item.status === 'default'
                                      ? '-'
                                      : endTime}
                                  </td>
                                  <td>-</td>
                                  <td>-</td>
                                  <td className='text-center'>
                                    {elem.item.distanceInKM
                                      ? elem.item.distanceInKM
                                      : '-'}
                                  </td>
                                  <td className='text-center'>
                                    {elem.item.feePerKM
                                      ? elem.item.feePerKM
                                      : '-'}
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
                                      : 'From 10 p.m.'}
                                  </td>
                                  <td>-</td>
                                  <td>-</td>
                                </tr>
                              ) : null;
                            })
                          ) : (
                            <tr className={'text-center no-hover-row'}>
                              <td colSpan={20} className={'pt-5 pb-5'}>
                                <div className='no-data-section'>
                                  <div className='no-data-icon'>
                                    <i className='icon-ban' />
                                  </div>
                                  <h4 className='mb-1'>
                                    {languageTranslation('NO_DATA_FOUND')}
                                  </h4>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
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
  }
}

export default DetailListCaregiver;
