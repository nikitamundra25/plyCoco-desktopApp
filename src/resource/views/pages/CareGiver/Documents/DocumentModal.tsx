import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
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
// import png from "../../../../assets/img/png.svg";
// import jpg from "../../../../assets/img/jpg.svg";
// import pdf from "../../../../assets/img/pdf.svg";
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
const DocumentUploadModal = (props: any) => {
  const { show, handleClose } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
    multiple: false
  });
  const externalCloseBtn = (
    <button className='close modal-close' onClick={() => handleClose()}>
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );

  return (
    <div>
      <Modal isOpen={show} className='reminder-modal' size='lg' centered>
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation('ADD_DOCUMENT')}
        </ModalHeader>
        <ModalBody>
          <div className=''>
            <Form className='form-section forms-main-section'>
              <Row>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          {!props.documentIdUpdate
                            ? languageTranslation('FILE')
                            : languageTranslation('FILE_NAME')}
                        </Label>
                      </Col>
                      {!props.documentIdUpdate ? (
                        <Col sm='8'>
                          <div
                            {...getRootProps()}
                            className='dropzone-preview mb-0'
                          >
                            <input
                              {...getInputProps()}
                              className='dropzone-input-preview'
                            />

                            <div className='icon-upload'>
                              <i className='cui-cloud-upload'></i>
                              {/* <img src={png} alt='' className='mb-2' />
                            <img src={jpg} alt='' className='mb-2' />
                            <img src={pdf} alt='' className='mb-2' /> */}
                            </div>
                            <span>
                              {props && props.documentUrls
                                ? props.documentUrls.name
                                : "Drag 'n' drop files here, or click here to upload files"}
                            </span>
                          </div>
                        </Col>
                      ) : (
                        <Col sm='10'>
                          <div>
                            <Input
                              type='text'
                              name='filename'
                              value={
                                // props.documentUrls.name
                                //   ? props.documentUrls.name
                                //   :
                                props.fileName
                              }
                              onChange={props.handleChange}
                            />
                          </div>
                        </Col>
                      )}
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('TYPE')}
                        </Label>
                      </Col>
                      <Col sm='10'>
                        <Select
                          name='type'
                          value={props.documentType}
                          options={DocumentTypes}
                          // placeholder={'Select type'}
                          onChange={(type: any) => {
                            props.setDocumentType(type);
                          }}
                          classNamePrefix='custom-inner-reactselect'
                          // className={'custom-reactselect'}
                          className={
                            props.isSubmit && !props.documentType
                              ? 'text-input error my-2 my-sm-0'
                              : 'text-input my-2 my-sm-0'
                          }
                        />
                        {props.isSubmit && !props.documentType ? (
                          <div className='required-tooltip'>
                            {'Document type is required'}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation('REMARKS')}
                        </Label>
                      </Col>
                      <Col sm='10'>
                        <div>
                          <Input
                            type='textarea'
                            // placeholder={languageTranslation('REMARKS')}
                            className='textarea-custom'
                            rows='4'
                            name={'remarks'}
                            value={props.remarkValue}
                            onChange={props.handleChange}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                {!props.documentIdUpdate ? (
                  <Col lg={'12'}>
                    <FormGroup>
                      <Row>
                        <Col sm='2'>
                          <Label className='form-label col-form-label'>
                            {languageTranslation('CHECKED')}
                          </Label>
                        </Col>
                        <Col sm='10'>
                          <div className=' checkbox-custom mb-0'>
                            <input
                              id='check'
                              type='checkbox'
                              name='check'
                              checked={props.statusValue}
                              onChange={props.handleChange}
                            />
                            <Label for='check' className='pl-3'>
                              ( {languageTranslation('DOCUMENT_STATUS_LABEL')} )
                            </Label>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                ) : (
                  ''
                )}
                {/* <Col lg={'12'}>
                  <FormGroup>
                    <Row>
                      <Col sm='2'>
                        <Label className='form-label col-form-label'>
                          {languageTranslation("OPTIMIZE")}
                        </Label>
                      </Col>
                      <Col sm='10'>
                       
                          <div className=" checkbox-custom mb-0">
                          <input
                            type="checkbox"
                            id="check"
                            className=""
                            name={"employed"}
                          />
                          <Label for="check" className="pl-3">
                            ( {languageTranslation("DOCUMENT_OPTIMIZE_LABEL")} )
                          </Label>
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
            {languageTranslation('SAVE_BUTTON')}
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
