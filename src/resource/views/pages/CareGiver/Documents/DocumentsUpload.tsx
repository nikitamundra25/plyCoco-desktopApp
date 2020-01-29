import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
class DocumentsUpload extends Component {
  render() {
    return (
      <>
        <div className='document-upload-section mb-3'>
          <h5 className='content-title'>
            {languageTranslation('CG_SUB_MENU_DOCUMENTS')}
          </h5>

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
            <tbody>
              <tr>
                <td>1</td>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploma/Exam</td>
                <td></td>
                <td>
                  <span className='checkboxli checkbox-custom checkbox-default'>
                    <input type='checkbox' id='checkAll' className='' />
                    <label className=''></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>2</td>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploma/Exam</td>
                <td></td>
                <td>
                  <span className='checkboxli checkbox-custom checkbox-default'>
                    <input type='checkbox' id='checkAll' className='' />
                    <label className=''></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>3</td>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploma/Exam</td>
                <td></td>
                <td>
                  <span className='checkboxli checkbox-custom checkbox-default'>
                    <input type='checkbox' id='checkAll' className='' />
                    <label className=''></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>4</td>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploma/Exam</td>
                <td></td>
                <td>
                  <span className='checkboxli checkbox-custom checkbox-default'>
                    <input type='checkbox' id='checkAll' className='' />
                    <label className=''></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>5</td>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploma/Exam</td>
                <td></td>
                <td>
                  <span className='checkboxli checkbox-custom checkbox-default'>
                    <input type='checkbox' id='checkAll' className='' />
                    <label className=''></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>6</td>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploma/Exam</td>
                <td></td>
                <td>
                  <span className='checkboxli checkbox-custom checkbox-default'>
                    <input type='checkbox' id='checkAll' className='' />
                    <label className=''></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>7</td>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploma/Exam</td>
                <td></td>
                <td>
                  <span className='checkboxli checkbox-custom checkbox-default'>
                    <input type='checkbox' id='checkAll' className='' />
                    <label className=''></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
export default DocumentsUpload;
