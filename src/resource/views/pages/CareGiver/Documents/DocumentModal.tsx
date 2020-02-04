import React, { useState } from 'react';
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
  Form
} from 'reactstrap';
import Select from 'react-select';
import 'react-day-picker/lib/style.css';
import { languageTranslation } from '../../../../../helpers';
import { DocumentTypes } from '../../../../../config';
import { useDropzone } from 'react-dropzone';
const DocumentUploadModal = (props: any) => {
  // const [statusValue, setStatusValue] = useState<boolean>(true);
  // const [remarkValue, setRemarkValue] = useState<any>(null);
  // const [documentType, setDocumentType] = useState<any>(null);
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.name === 'check') {
  //     setStatusValue(e.target.checked);
  //   } /*  (e.target.name === 'remarks') */ else {
  //     setRemarkValue(e.target.value);
  //   }
  // };
  const { show, handleClose } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
    multiple: false
  });
  return (
    <div>
      <Modal isOpen={show} className='reminder-modal' size='lg' centered>
        <ModalHeader> Add Document </ModalHeader>
        <ModalBody>
          <div className=''>
            <div className='calender-wrapper mb-4'></div>
            <Form className='form-section forms-main-section'>
              <Row>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='8'>
                        <div>
                          <div {...getRootProps()}>
                            <input
                              {...getInputProps()}
                              className='dropzone-input-preview'
                            />
                            <span>
                              Drag 'n' drop some files here, or click to select
                              files
                            </span>
                          </div>
                        </div>
                        {props && props.documentUrls
                          ? props.documentUrls.name
                          : null}
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          Type
                        </Label>
                      </Col>
                      <Col sm='10'>
                        <Select
                          name='type'
                          options={DocumentTypes}
                          placeholder={'Select type'}
                          onChange={(type: any) => {
                            props.setDocumentType(type);
                          }}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          Remarks
                        </Label>
                      </Col>
                      <Col sm='10'>
                        <div>
                          <Input
                            type='text'
                            name={'remarks'}
                            placeholder='Remarks'
                            className='width-common'
                            value={props.remarkValue}
                            onChange={props.handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          Checked
                        </Label>
                      </Col>
                      <Col sm='10'>
                        <div>
                          <Input
                            type='checkbox'
                            name='check'
                            checked={props.statusValue}
                            onChange={props.handleChange}
                          />
                          <span>
                            (checked files cannot be punched by the user)
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                {/* <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          Optimize
                        </Label>
                      </Col>
                      <Col sm='10'>
                        <div>
                          <Input type='checkbox' />
                          <span>(Convert to PDF and resize)</span>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col> */}
              </Row>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={props.handleSaveDocument}>
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
