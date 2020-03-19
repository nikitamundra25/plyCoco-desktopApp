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
import BulkEmailCareInstitution from '../../BulkEmailCareinstitution';

const BulkEmailCareInstitutionModal: FunctionComponent<any> = (props: any) => {
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
  return (
    <>
      <Modal
        isOpen={openModal}
        className='common-modal attribute-modal'
        centered
        size='xl'
      >
        <ModalHeader close={externalCloseBtn}>
          Bulk Email Care Institution
        </ModalHeader>
        <ModalBody>
          <BulkEmailCareInstitution
            label={'appointment'}
            qualification={props.qualification}
            selectedCellsCareinstitution={props.selectedCellsCareinstitution}
            gte={props.gte}
            lte={props.lte}
            statusTo={props.statusTo}
            sortBy={props.sortBy}
            handleClose={() => handleClose()}
            unlinkedBy={props.unlinkedBy}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default BulkEmailCareInstitutionModal;
