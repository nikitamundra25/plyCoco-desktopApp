import React from 'react';
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
import { languageTranslation } from '../../../../../helpers';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
const OfferSearch = (props: any) => {
  const { show, handleClose, handleChange, onSearch, searchValue } = props;

  const externalCloseBtn = (
    <button className='close modal-close' onClick={() => handleClose()}>
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );
  return (
    <div>
      <Modal isOpen={show} className='common-modal' centered>
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation('SEARCH_POPUP_TITLE')}{' '}
        </ModalHeader>
        <Form onSubmit={(e: any) => {
          e.preventDefault();
          onSearch();
        }}>
          <ModalBody>
            <div className=''>
              <div className='form-section forms-main-section'>
                <Row>
                  <Col lg={'12'}>
                    <FormGroup>
                      <Label className='form-label col-form-label mb-1'>
                        {languageTranslation(
                          'SEARCH_POPUP_LABEL_CAREINSTITUTION'
                        )}
                      </Label>
                      <div>
                        <Input
                          type='text'
                          name={'firstName'}
                          value={searchValue}
                          placeholder={languageTranslation('SEARCH_LABEL')}
                          onChange={handleChange}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit' disabled={!searchValue}>
              {languageTranslation('ADD')}
            </Button>
            <Button color='secondary' onClick={handleClose}>
              {languageTranslation('CANCEL')}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default OfferSearch;
