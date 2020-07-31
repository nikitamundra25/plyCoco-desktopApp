import React, { FunctionComponent } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../index.scss';
import BulkEmailCaregiver from '../../BulkEmailCaregiver';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import { languageTranslation } from '../../../../../helpers';

const BulkEmailCareGiverModal: FunctionComponent<any> = (props: any) => {
  const {
    openModal,
    handleClose,
    selectedCells,
    offerRequirements,
    leasingContract,
    qualificationList,
    offerCareGiver,
    terminateAggrement,
    updateLinkedStatus
  } = props;
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
        <ModalHeader close={externalCloseBtn}>{languageTranslation("BULK_EMAIL_CAREGIVER")}</ModalHeader>
        <ModalBody>
          <BulkEmailCaregiver
          updateLinkedStatus={updateLinkedStatus}
            label={'appointment'}
            qualification={props.qualification}
            gte={props.gte}
            lte={props.lte}
            sortBy={props.sortBy}
            showButton={props.showButton}
            handleClose={handleClose}
            selectedCells={selectedCells}
            confirmApp={props.confirmApp}
            selectedCellsCareinstitution={props.selectedCellsCareinstitution}
            unlinkedBy={props.unlinkedBy}
            isFromUnlink={props.isFromUnlink}
            offerCareGiver={offerCareGiver}
            offerRequirements={offerRequirements}
            leasingContract={leasingContract}
            qualificationList={qualificationList}
            terminateAggrement={terminateAggrement}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default BulkEmailCareGiverModal;
