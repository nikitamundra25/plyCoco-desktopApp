import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from 'reactstrap';
import closehover from '../../../../assets/img/cancel-hover.svg';
import { IUnlinkInterface } from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';

const UnlinkAppointment = (props: IUnlinkInterface) => {
  const { show, handleClose } = props;
  const [checkMark, setcheckMark] = useState<boolean>(false);
  console.log(':checkMark', checkMark);

  return (
    <div>
      <Modal
        isOpen={show}
        className='common-modal attribute-modal'
        centered
        size='l'
      >
        <ModalHeader close={handleClose}>
          {languageTranslation('UNLINK_APPOINTMENT')}
        </ModalHeader>
        <ModalBody>
          <div className='d-flex align-items-center mb-2'>
            {/* <div className='custom-header-nav-item mr-3'> */}
            {/* <span className='custom-header-nav-icon'>
                <img src={filter} alt='' />
              </span> */}
            <span>
              {languageTranslation('UNLINK_DELETE_APPOINTMENT_QUESTION')}
            </span>
            <div>
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
            <div className='d-flex align-items-center justify-content-between'>
              <Button className={'btn-save'} color='primary'>
                {languageTranslation('CAREGIVER_USERROLE')}
              </Button>
              <Button className='btn-save' color='primary'>
                {languageTranslation('CAREINST_USERROLE')}
              </Button>
              <Button className={'btn-save'} color='primary'>
                {languageTranslation('EMPLOYEE_LABEL')}
              </Button>
              <Button className={'btn-save'} color='primary'>
                {languageTranslation('CANCEL')}
              </Button>
            </div>
          </div>
          {/* </div> */}
        </ModalBody>
      </Modal>
    </div>
  );
};
export default UnlinkAppointment;
