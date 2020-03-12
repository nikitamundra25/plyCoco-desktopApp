import React, { FunctionComponent } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import { languageTranslation } from "../../../../helpers";
import { IPycModalProps, IPycCloseBtnProps } from "../../../../interfaces";

const PycCloseBtn: FunctionComponent<IPycCloseBtnProps> = ({
  handleClose
}): JSX.Element => (
  <button className="close modal-close" onClick={handleClose}>
    <img src={close} alt="close" className="main-img" />
    <img src={closehover} alt="close" className="hover-img" />
  </button>
);

const PycModal: FunctionComponent<IPycModalProps> = ({
  isOpen: show,
  headerText,
  body,
  footerButtons,
  handleClose,
  children
}): JSX.Element => {
  return (
    <Modal isOpen={show} className="common-modal" size="lg" centered>
      <ModalHeader close={<PycCloseBtn handleClose={handleClose} />}>
        {headerText || "Modal Header"}
      </ModalHeader>
      <ModalBody className="holiday-body-wrap">{body || children}</ModalBody>
      <ModalFooter>
        {footerButtons
          ? footerButtons.map(
              ({ onClick, loading, text, color, type }, index) => (
                <Button
                  disabled={loading}
                  color={color || "primary"}
                  onClick={onClick}
                  key={index}
                  type={type}
                >
                  {loading ? <i className="fa fa-spinner fa-spin mr-2" /> : ""}
                  {text}
                </Button>
              )
            )
          : null}
      </ModalFooter>
    </Modal>
  );
};

export default PycModal;
