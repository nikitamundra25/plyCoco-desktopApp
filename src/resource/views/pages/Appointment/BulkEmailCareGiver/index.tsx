import React, { FunctionComponent, useEffect } from 'react';
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
import '../index.scss';
import BulkEmailCaregiver from '../../BulkEmailCaregiver';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';

const BulkEmailCareGiverModal: FunctionComponent<any> = (props: any) => {
  const { openModal, handleClose } = props;
  const externalCloseBtn = (
    <button
      className='close modal-close'
      onClick={() => {
        handleClose();
      }}
    >
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );
  console.log("props.gte", props.gte);
  
  return (
    <>
      <Modal
        isOpen={openModal}
        className='common-modal attribute-modal'
        centered
        size='xl'
      >
        <ModalHeader close={externalCloseBtn}>
          Bulk Email Care giver
        </ModalHeader>
        <ModalBody>
          <BulkEmailCaregiver
            label={'appointment'}
            qualification={props.qualification}
            gte={props.gte}
            lte={props.lte}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default BulkEmailCareGiverModal;
