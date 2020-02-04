import React, { useCallback, useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput
} from 'reactstrap';
import Select from 'react-select';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { languageTranslation } from '../../../../../helpers';
import { DocumentTypes } from '../../../../../config';
import { useDropzone } from 'react-dropzone';
import {
  IDocumentUrls,
  IDocumentSubmitValues
} from '../../../../../interfaces';
import moment from 'moment';
import { DocumentMutations } from '../../../../../graphql/Mutations';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
const [ADD_DOCUMENT] = DocumentMutations;
let toastId: any = '';

const DocumentUploadModal = (props: any) => {
  const path = useLocation();
  useEffect(() => {
    const queryPath = path.pathname;
    const res = queryPath.split('/');
    const id = parseInt(res[3]);
  }, []);
  const [addDocument] = useMutation<any>(ADD_DOCUMENT, {
    onCompleted({ addDocument }) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success('DOCUMENT_ADDED_SUCCESS');
      }
    }
  });
  const [documentUrls, setDocumentUrl] = useState<IDocumentUrls | null>(null);
  const { show, handleClose } = props;
  const onDrop = useCallback((acceptedFiles: File[]) => {
    let temp: any = documentUrls ? documentUrls : {};
    acceptedFiles.forEach((file: File) => {
      console.log(file, 'file details');
      if (file) {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onloadend = () => {
          if (reader.result) {
            temp = {
              path: reader.result,
              name: file.name,
              date: moment().format('DD.MM.YYYY')
            };
            setDocumentUrl(temp);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false
  });
  console.log('documentUrls', documentUrls);
  const handleSaveDocument = () => {
    const queryPath = path.pathname;
    const res = queryPath.split('/');
    const id = parseInt(res[3]);
    console.log(id, 'id');

    if (id) {
      addDocument({
        variables: {
          documentInput: {
            userId: id ? id : '',
            document: documentUrls ? documentUrls : null
          }
        }
      });
    }
  };
  return (
    <div>
      <Modal isOpen={show} className='reminder-modal' size='lg' centered>
        <ModalHeader> Add Document </ModalHeader>
        <ModalBody>
          <div className=''>
            <div className='calender-wrapper mb-4'></div>
            <Form className='form-section forms-main-section'>
              <Row>
                <Col lg={'6'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          File
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Input
                            type='text'
                            name={'file'}
                            placeholder='File'
                            className='width-common'
                            value={documentUrls ? documentUrls.name : null}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'6'}>
                  <FormGroup>
                    <Row>
                      <Col sm='8'>
                        <div>
                          <div {...getRootProps()}>
                            <input
                              {...getInputProps()}
                              className='dropzone-input-preview'
                            />
                            <span className='btn btn-primary'>Select File</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          Type
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <Select
                          options={DocumentTypes}
                          placeholder={'Select type'}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'6'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          Remarks
                          <span className='required'>*</span>
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Input
                            type='text'
                            name={'remarks'}
                            placeholder='Remarks'
                            className='width-common'
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'6'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          Checked
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Input type='checkbox' />
                          <span>
                            ( Checked files cannot be punched by the user)
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='4'>
                        <Label className='form-label col-form-label'>
                          Optimize
                        </Label>
                      </Col>
                      <Col sm='8'>
                        <div>
                          <Input type='checkbox' />
                          <span>( convert to PDF and resize)</span>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSaveDocument}>
            Save
          </Button>
          <Button color='secondary' onClick={handleClose}>
            {languageTranslation('CANCEL')}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DocumentUploadModal;
