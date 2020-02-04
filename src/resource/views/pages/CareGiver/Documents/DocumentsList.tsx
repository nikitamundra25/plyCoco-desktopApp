import React, { FunctionComponent, useState } from 'react';
import { Table, Button, Input } from 'reactstrap';
import moment from 'moment';
import { languageTranslation } from '../../../../../helpers';
const DocumentsList: FunctionComponent<any> = (props: any) => {
  // const [status, setStatus] = useState<boolean>(true);
  // const onStatusUpdate=()=>
  // {
  //   setStatus(false)
  // }
  return (
    <>
      <div className='document-upload-section mb-3'>
        <h5 className='content-title'>
          {languageTranslation('CG_SUB_MENU_DOCUMENTS')}
        </h5>
        <Button onClick={() => props.setShowDocumentPopup(true)}>Upload</Button>
        <Table bordered hover responsive>
          <thead className='thead-bg'>
            <tr>
              <th>{languageTranslation('S_NO')}</th>
              <th>{languageTranslation('DATE')}</th>
              <th>{languageTranslation('FILE_NAME')}</th>
              <th>{languageTranslation('TYPE')}</th>
              <th>{languageTranslation('REMARKS')}</th>
              <th>{languageTranslation('STATUS')}</th>
              <th>{languageTranslation('FILE_SIZE')}</th>
            </tr>
          </thead>
          {props && props.documentListing && props.documentListing.getDocuments
            ? props.documentListing.getDocuments.map(
                (list: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className={
                        list.status === 'approve'
                          ? 'approve-bg'
                          : 'table-danger'
                      }
                    >
                      <td>{index + 1}</td>
                      <td>
                        {list && list.createdAt
                          ? moment(list.createdAt).format('lll')
                          : '-'}
                      </td>
                      <td>{list && list.fileName ? list.fileName : '-'}</td>
                      <td>
                        {list && list.documentType ? list.documentType : '-'}
                      </td>
                      <td>{list && list.remarks ? list.remarks : '-'}</td>
                      <td>
                        {/* dfjhfdfdf */}
                        <Input
                          type='checkbox'
                          checked={list.status === 'approve' ? true : false}
                        />
                      </td>

                      <td>{list && list.fileSize ? list.fileSize : '-'}</td>
                    </tr>
                  );
                }
              )
            : null}
        </Table>
      </div>
    </>
  );
};
export default DocumentsList;
