import React, { FunctionComponent, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import '../index.scss';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import BulkEmailCareInstitution from '../../BulkEmailCareinstitution';
// import { useMutation } from '@apollo/react-hooks';
// import { DocumentMutations } from '../../../../../graphql/Mutations';
import { languageTranslation } from '../../../../../helpers';

// const [ADD_DOCUMENT] = DocumentMutations;

const BulkEmailCareInstitutionModal: FunctionComponent<any> = (props: any) => {
  const { openModal, handleClose, selectedCellsCareinstitution, selectedCells, confirmAppointment } = props;

  // Mutation to leasing document
  // const [addUserDocuments] = useMutation<
  //   { addUserDocuments: any },
  //   { documentInput: any }
  // >(ADD_DOCUMENT);


  useEffect(() => {
    if (confirmAppointment) {
      let userId = '';
      let appointmentId = '';
      if (selectedCells && selectedCells.length > 0) {
        userId = selectedCells[0].id;
      }
      if (
        selectedCellsCareinstitution &&
        selectedCellsCareinstitution.length > 0
      ) {
        if (
          selectedCellsCareinstitution[0].item &&
          selectedCellsCareinstitution[0].item.appointments
        ) {
          let appointments =
            selectedCellsCareinstitution[0].item.appointments;
          if (appointments.length > 0) {
            appointmentId = appointments[0].id;
            // setPdfConfirmAppointment(appointments);
          }
        }
      }
    }
  }, []);

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
         {languageTranslation("BILK_EMAIL_CAREINSTITUTION")}
        </ModalHeader>
        <ModalBody>
          <BulkEmailCareInstitution
            label={'appointment'}
            qualification={props.qualification}
            qualificationList={props.qualificationList}
            selectedCellsCareinstitution={selectedCellsCareinstitution}
            gte={props.gte}
            lte={props.lte}
            statusTo={props.statusTo}
            sortBy={props.sortBy}
            handleClose={() => handleClose()}
            unlinkedBy={props.unlinkedBy}
            confirmAppointment={confirmAppointment}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default BulkEmailCareInstitutionModal;
