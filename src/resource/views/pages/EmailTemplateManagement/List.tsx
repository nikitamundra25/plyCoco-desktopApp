import React, { FunctionComponent } from 'react';
import { Col, Table, Button } from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import { IEmailTemplateList } from '../../../../interfaces';
import Loader from '../../containers/Loader/Loader';
import nodata from '../../../assets/img/nodata.png';
import archive from '../../../assets/img/restore.svg';
export const EmailTemplateList: FunctionComponent<IEmailTemplateList> = ({
  onTemplateSelection,
  data,
  loading,
  activeTemplate,
  showArchive,
  archiveList,
  archiveListLoading,
  onArchiveTemplateSelection,
  onRestoreEmailTemplate,
  onPermanentlyDeleteEmployee
}: IEmailTemplateList) => {
  return (
    <Col lg={'5'} className='pr-lg-0'>
      <h5 className='content-title'>{languageTranslation('MENU_ENTRY')}</h5>
      <div className='email-template-list custom-scrollbar'>
        <Table bordered hover responsive className='mb-0'>
          <thead className='thead-bg'>
            <tr>
              <th className='sno-th-column text-center'>
                {languageTranslation('S_NO')}
              </th>
              <th>{languageTranslation('MENU_ENTRY')}</th>
            </tr>
          </thead>

          <tbody>
            {loading || archiveListLoading ? (
              <tr>
                <td className={'table-loader'} colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : showArchive ? (
              archiveList &&
              archiveList.trashEmailTemplateList &&
              archiveList.trashEmailTemplateList.length ? (
                archiveList.trashEmailTemplateList.map(
                  (trashMenu: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className={`cursor-pointer ${
                          activeTemplate === trashMenu.id ? 'active' : ''
                        }`}
                        onClick={() => onArchiveTemplateSelection(trashMenu.id)}
                      >
                        <td className='sno-th-column text-center'>
                          {index + 1}
                        </td>
                        <td>
                          <span
                            className={`cursor-pointer text-capitalize word-wrap`}
                          >
                            {trashMenu.menuEntry}
                          </span>
                        </td>
                        <td>
                          <div className='text-center'>
                            <Button
                              onClick={() =>
                                onRestoreEmailTemplate(trashMenu.id)
                              }
                              className='archive-btn'
                            >
                              <span className='archive-icon'>
                                <img src={archive} />
                              </span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : null
            ) : data &&
              data.getEmailtemplate &&
              data.getEmailtemplate.email_templates &&
              data.getEmailtemplate.email_templates.length ? (
              data.getEmailtemplate.email_templates.map(
                (menu: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className={`cursor-pointer ${
                        activeTemplate === menu.id ? 'active' : ''
                      }`}
                      onClick={() => onTemplateSelection(menu.id)}
                    >
                      <td className='sno-th-column text-center'>{index + 1}</td>
                      <td>
                        <span
                          className={`cursor-pointer text-capitalize word-wrap`}
                        >
                          {menu.menuEntry}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr className={'text-center no-hover-row'}>
                <td colSpan={2} className={'pt-5 pb-5'}>
                  <div className='no-list-section d-flex align-items-center justify-content-center flex-column py-5 my-3'>
                    <img src={nodata} alt='' className='no-img' />
                    <span className='no-text'>No Menu Entry Added.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {/* )} */}
        </Table>
      </div>
    </Col>
  );
};
