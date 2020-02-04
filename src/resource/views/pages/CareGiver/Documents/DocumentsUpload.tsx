import React, {
  Component,
  FunctionComponent,
  useCallback,
  useState
} from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import moment from 'moment';
import { languageTranslation } from '../../../../../helpers';
import Dropzone, { useDropzone } from 'react-dropzone';
import { IDocumentUrls } from '../../../../../interfaces';
import DocumentUploadModal from './DocumentModal';

const DocumentsUpload: FunctionComponent = () => {
  const [showToDo, setShowToDo] = useState<boolean>(false);

  const [documentUrls, setDocumentUrl] = useState<IDocumentUrls[] | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const temp: any = documentUrls ? documentUrls : [];
    acceptedFiles.forEach((file: File) => {
      console.log(file, 'file details');
      if (file) {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onloadend = () => {
          // console.log(reader.result, 'reader.resultreader.result');
          if (reader.result) {
            temp.push({
              path: reader.result,
              name: file.name,
              date: moment().format('DD.MM.YYYY')
            });
            setDocumentUrl(temp);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <div className='document-upload-section mb-3'>
        <h5 className='content-title'>
          {languageTranslation('CG_SUB_MENU_DOCUMENTS')}
        </h5>
        <Button onClick={() => setShowToDo(true)}>Upload</Button>

        <Row>
          <Col lg={'12'}>
            <div {...getRootProps()} className='dropzone-preview'>
              <input {...getInputProps()} className='dropzone-input-preview' />
              <span>
                Drag 'n' drop some files here, or click to select files
              </span>
            </div>
          </Col>
        </Row>

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
      {/* <CreateTodo
          show={showToDo}
          handleClose={() => setShowToDo(false)}
          name={selectUser ? selectUser.label : null}
          userRole={'careInstitution'}
        /> */}
      <DocumentUploadModal
        show={showToDo}
        handleClose={() => setShowToDo(false)}
      />
    </>
  );
};
export default DocumentsUpload;
