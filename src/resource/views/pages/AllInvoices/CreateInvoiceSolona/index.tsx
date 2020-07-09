import React, { useState, FunctionComponent, useEffect } from 'react';
import { Card, Nav } from 'reactstrap';
import Select from 'react-select';
import { languageTranslation } from '../../../../../helpers';
import refresh from '../../../../assets/img/refresh.svg';
import PlyCocoreceipt from '../../../../assets/img/header-icons/plyCoco-receipt.svg';
import SpecialistInvoice from '../../../../assets/img/header-icons/specialist-invoice.svg';
import professaionalProfile from '../../../../assets/img/header-icons/professaional-profile.svg';
import paid from '../../../../assets/img/header-icons/paid.svg';
import interierDesign from '../../../../assets/img/header-icons/interier-design-professional.svg';
import Again from '../../../../assets/img/header-icons/again.svg';
import attachReminder from '../../../../assets/img/header-icons/tab-icons/attach-reminder.svg';
import clear from '../../../../assets/img/header-icons/tab-icons/clear.svg';
import edit from '../../../../assets/img/header-icons/tab-icons/edit.svg';
import sendLawyer from '../../../../assets/img/header-icons/tab-icons/send-lawyer.svg';
import sendReminder from '../../../../assets/img/header-icons/tab-icons/send-reminder.svg';
import showReminder from '../../../../assets/img/header-icons/tab-icons/show-reminder.svg';
import taxConsultant from '../../../../assets/img/header-icons/tab-icons/tax-consultant.svg';
import uploadReminder from '../../../../assets/img/header-icons/tab-icons/upload-reminder.svg';
import vicantPosition from '../../../../assets/img/header-icons/tab-icons/vicant-position.svg';
import createReminder from '../../../../assets/img/header-icons/tab-icons/create-reminder.svg';
import { RouteComponentProps } from 'react-router';
import showAppointment from '../../../../assets/img/header-icons/show-appointment.svg';
import sent from '../../../../assets/img/header-icons/sent.svg';
import unsent from '../../../../assets/img/header-icons/unsent.svg';
import '.././index.scss';
import SolonaList from './SolonaList';
import { InvoiceQueries } from '../../../../../graphql/queries';
import { PAGE_LIMIT } from '../../../../../config';
import { useLazyQuery } from '@apollo/react-hooks';
const [, GET_ALL_INVOICE_LIST] = InvoiceQueries;

const InvoiceSolona: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any
) => {
  // To fetch All invoice list
  const [
    fetchAllInvoiceList,
    { data: invoiceList, loading: invoiceListLoading, refetch },
  ] = useLazyQuery<any, any>(GET_ALL_INVOICE_LIST, {
    fetchPolicy: 'no-cache',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  // console.log('++++++++++++++++++++', invoiceList);
  const getAllInvoiceListData = () => {
    console.log('currentPage', currentPage);

    fetchAllInvoiceList({
      variables: {
        status: '',
        invoiceType: 'leasing',
        sortBy: null,
        limit: PAGE_LIMIT,
        page: 1,
      },
    });
  };
  useEffect(() => {
    // call query
    getAllInvoiceListData();
  }, []);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [tabChange, setTabChange] = useState(1);
  const tabChangehandler = (currentTab: any) => {
    setTabChange(currentTab);
  };

  return (
    <>
      <Card>
        <div className='common-detail-page'>
          <div className='common-detail-section'>
            <div className='common-sidnav'>
              <Nav className='common-ul' tabs>
                <li className='nav-item'>
                  <a
                    className={`nav-link ${tabChange == 1 ? 'active' : ''}`}
                    onClick={() => tabChangehandler(1)}
                  >
                    <span className='nav-text text-capitalize'>{languageTranslation("GENERAL")} </span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className={`nav-link ${tabChange == 2 ? 'active' : ''}`}
                    onClick={() => tabChangehandler(2)}
                  >
                    <span className='nav-text text-capitalize'>
                      {languageTranslation("DUNNING_EXPORT")}
                    </span>
                  </a>
                </li>
              </Nav>
            </div>
            {tabChange == 1 ? (
              <div className='common-topheader d-flex  px-2 mb-1'>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>{languageTranslation("FILTER_LABEL")} </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={refresh} alt='' />
                    </span>
                    <span className='header-nav-text'>
                      {languageTranslation('REFRESH')}
                    </span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-text'>Offer</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-text'>Not sent</span>
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'></div>

                  <div className='user-select mx-1 '>
                    <Select
                      classNamePrefix='custom-inner-reactselect'
                      className={'custom-reactselect '}
                      placeholder='Facilities'
                      options={options}
                      isClearable={true}
                    />
                  </div>
                  <div className='user-select mx-1 '>
                    <Select
                      classNamePrefix='custom-inner-reactselect'
                      className={'custom-reactselect '}
                      placeholder='Broadcast date'
                      options={options}
                      isClearable={true}
                    />
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>
                    View Invoice PDFs
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={PlyCocoreceipt} alt='' />
                    </span>
                    <span className='header-nav-text'>show receipt</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={SpecialistInvoice} alt='' />
                    </span>
                    <span className='header-nav-text'>Save invoice</span>
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>
                    Sent &amp; Unsent
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={Again} alt='' />
                    </span>

                    <span className='header-nav-text'>again</span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={sent} alt='' />
                    </span>
                    <span className='header-nav-text'>Sent today</span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={unsent} alt='' />
                    </span>
                    <span className='header-nav-text'>Unsent</span>
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>
                    Paid &amp; Unpaid
                  </div>

                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={paid} alt='' />
                    </span>
                    <span className='header-nav-text'>Paid on</span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={'unPaid'} alt='' />
                    </span>
                    <span className='header-nav-text'>Unpaid</span>
                  </div>
                  <div className='user-select mx-1 '>
                    <Select
                      classNamePrefix='custom-inner-reactselect'
                      className={'custom-reactselect '}
                      placeholder='professional'
                      options={options}
                      isClearable={true}
                    />
                  </div>
                </div>
                <div className='header-nav-colmn-items profile-section'>
                  <div className='header-nav-heading mx-1'>User Profile</div>

                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={professaionalProfile} alt='' />
                    </span>
                    <span className='header-nav-text'>Furnishing profile</span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={interierDesign} alt='' />
                    </span>
                    <span className='header-nav-text'>
                      interior design professional
                    </span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={showAppointment} alt='' />
                    </span>
                    <span className='header-nav-text'>Show appointments</span>
                  </div>
                </div>
                <div className='header-nav-colmn-items profile-section'>
                  <div className='header-nav-heading mx-1'></div>

                  <div className='header-nav-item'>
                    <span className='header-nav-text'>Solo setup</span>
                  </div>
                  <div className='header-nav-item'>
                    <span className='header-nav-text'>Release</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className='common-topheader d-flex  px-2 mb-1'>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>Reminders</div>
                  <div className='header-nav-item'>
                    <span className='header-nav-icon'>
                      <img src={sendReminder} alt='' />
                    </span>
                    <span className='header-nav-text'>Send reminder</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={createReminder} alt='' />
                    </span>
                    <span className='header-nav-text'>Create a reminder</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={showReminder} alt='' />
                    </span>
                    <span className='header-nav-text'>Show reminder</span>
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>Warning</div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={uploadReminder} alt='' />
                    </span>
                    <span className='header-nav-text'>Upload reminder</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={attachReminder} alt='' />
                    </span>
                    <span className='header-nav-text'>attach reminder</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={sendLawyer} alt='' />
                    </span>
                    <span className='header-nav-text'>Send to lawyer</span>
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>Export</div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={taxConsultant} alt='' />
                    </span>
                    <span className='header-nav-text'>Tax consultant</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={vicantPosition} alt='' />
                    </span>
                    <span className='header-nav-text'>Vacant positions</span>
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>Invoices</div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={SpecialistInvoice} alt='' />
                    </span>
                    <span className='header-nav-text'>Create new invoice</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={SpecialistInvoice} alt='' />
                    </span>
                    <span className='header-nav-text'>
                      Create cancellation invoice
                    </span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={Again} alt='' />
                    </span>
                    <span className='header-nav-text'>Bill again</span>
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'></div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={Again} alt='' />
                    </span>
                    <span className='header-nav-text'>
                      Append order number Plycoco
                    </span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={Again} alt='' />
                    </span>
                    <span className='header-nav-text'>
                      Append order number specialist
                    </span>
                  </div>
                </div>
                <div className='header-nav-colmn-items'>
                  <div className='header-nav-heading mx-1'>Other tool</div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={edit} alt='' />
                    </span>
                    <span className='header-nav-text'>To edit</span>
                  </div>
                  <div className='header-nav-item '>
                    <span className='header-nav-icon'>
                      <img src={clear} alt='' />
                    </span>
                    <span className='header-nav-text'>Clear</span>
                  </div>
                </div>
              </div>
            )}
            <SolonaList 
            invoiceList={
              invoiceList &&
              invoiceList.getInvoices &&
              invoiceList.getInvoices.result.length
                ? invoiceList.getInvoices.result
                : []
            }/>
          </div>
        </div>
      </Card>
    </>
  );
};
export default InvoiceSolona;
