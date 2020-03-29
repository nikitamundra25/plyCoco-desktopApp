import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import '../index.scss';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import BulkEmailCareInstitution from '../../BulkEmailCareinstitution';
import { useMutation } from '@apollo/react-hooks';
import { DocumentMutations } from '../../../../../graphql/Mutations';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ConfirmAppointmentPdf from '../../BulkEmailCareinstitution/PDF/ConfirmAppointmentPdf';

const [ADD_DOCUMENT] = DocumentMutations;

const BulkEmailCareInstitutionModal: FunctionComponent<any> = (props: any) => {

  const { openModal, handleClose, selectedCellsCareinstitution, selectedCells, confirmAppointment } = props;

  // Mutation to leasing document
  const [addUserDocuments] = useMutation<
    { addUserDocuments: any },
    { documentInput: any }
  >(ADD_DOCUMENT);

  const [pdfConfirmAppointment, setPdfConfirmAppointment] = useState<any>();
  const [confirmAppointmentPdfData, setConfirmAppointmentPdfData] = useState<any>();

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
            setPdfConfirmAppointment(appointments);
          }
        }
      }

      if (confirmAppointmentPdfData) {
        // let documentInput: any = {
        //   appointmentId: parseInt(appointmentId),
        //   userId: parseInt(userId),
        //   isDocumentTemplate: false,
        //   documentUploadType: 'confirmAppointment',
        //   document: confirmAppointmentPdfData
        // };

        // addUserDocuments({
        //   variables: {
        //     documentInput
        //   }
        // });

        console.log('pdfConfirmAppointment ', pdfConfirmAppointment);


      }

    }

  }, [confirmAppointmentPdfData]);

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
          {/* {confirmAppointment && pdfConfirmAppointment ? (
            <PDFDownloadLink
              document={
                <ConfirmAppointmentPdf />
              }
            >
              {({ blob, url, loading, error }: any) =>
                !loading ? setConfirmAppointmentPdfData(blob) : null
              }
            </PDFDownloadLink>
          ) : null} */}
          <BulkEmailCareInstitution
            label={'appointment'}
            qualification={props.qualification}
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
