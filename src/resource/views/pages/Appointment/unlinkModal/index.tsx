import React, { useState, useEffect, FunctionComponent } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Button,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from 'reactstrap';
import closehover from '../../../../assets/img/cancel-hover.svg';
import { IUnlinkInterface } from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';

const UnlinkAppointment: FunctionComponent<any> = (props: IUnlinkInterface) => {
  const { show, handleClose, handleUnlinkData } = props;
  const [checkMark, setcheckMark] = useState<boolean>(false);

  const externalCloseBtn = (
    <button
      className='close modal-close'
      onClick={() => {
        handleClose();
      }}
    >
      {/* <img src={close} alt='close' className='main-img' /> */}
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );

  const handleSelectUser = (name: string) => {
    handleUnlinkData(name, checkMark);
    setcheckMark(false);
    handleClose();
  };

  return (
    <div>
      <Modal
        isOpen={show}
        className='common-modal attribute-modal'
        centered
        size='l'
      >
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation('UNLINK_APPOINTMENT')}
        </ModalHeader>
        <ModalBody>
          <div className=' align-items-center mb-2'>
            {/* <div className='custom-header-nav-item mr-3'> */}
            {/* <span className='custom-header-nav-icon'>
                <img src={filter} alt='' />
              </span> */}
            <span>
              {languageTranslation('UNLINK_DELETE_APPOINTMENT_QUESTION')}
            </span>
            <div className='my-2'>
              <div className='required-input'>
                <FormGroup check inline>
                  <div className=' checkbox-custom mb-0'>
                    <input
                      type='checkbox'
                      id='checkMark'
                      name={'checkMark'}
                      className=''
                      checked={checkMark}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const {
                          target: { checked }
                        } = e;
                        setcheckMark(checked);
                      }}
                    />
                    <Label for='isWorkingProof'>
                      {languageTranslation('CHECK_APPOINTMENT')}
                    </Label>
                  </div>
                </FormGroup>
              </div>
            </div>
          
          </div>
          {/* </div> */}
        </ModalBody>
        <ModalFooter>
        <div className='d-flex align-items-center justify-content-between w-100'>
              <Button
                className={'btn-save'}
                color='primary'
                onClick={() => handleSelectUser('caregiver')}
              >
                {languageTranslation('CAREGIVER_USERROLE')}
              </Button>
              <Button
                className='btn-save'
                color='primary'
                onClick={() => handleSelectUser('canstitution')}
              >
                {languageTranslation('CAREINST_USERROLE')}
              </Button>
              <Button
                className={'btn-save'}
                color='primary'
                onClick={() => handleSelectUser('employee')}
              >
                {languageTranslation('EMPLOYEE_LABEL')}
              </Button>
              <Button
                className={'btn-save'}
                color='primary'
                onClick={handleClose}
              >
                {languageTranslation('CANCEL')}
              </Button>
            </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default UnlinkAppointment;
