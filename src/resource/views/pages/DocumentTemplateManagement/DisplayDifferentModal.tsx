import React, { useState, FunctionComponent } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Button,
  ModalFooter,
} from "reactstrap";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import { languageTranslation, formatFileSize } from "../../../../helpers";

const DisplayDifferentModal: FunctionComponent<any> = (props: any) => {
  const {
    show,
    handleClose,
    documentUrls,
    imageUrls,
    documentSelectionId,
  } = props;
  console.log("documentSelectionId", documentSelectionId);

  const externalCloseBtn = (
    <button
      className="close modal-close"
      onClick={() => {
        handleClose();
      }}
    >
      <img src={close} alt="close" className="main-img" />
      <img src={closehover} alt="close" className="hover-img" />
    </button>
  );

  let fileType: any =
    documentSelectionId && documentSelectionId.fileName
      ? documentSelectionId.fileName.substr(
          documentSelectionId.fileName.lastIndexOf(".") + 1
        )
      : "";

  return (
    <div>
      <Modal
        isOpen={show}
        className="common-modal popup-modal"
        centered
        size="l"
      >
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation("FILE_DOWNLOAD")}
        </ModalHeader>
        <ModalBody>
          <div className="unlink-label mb-2">
            {languageTranslation("OPEN_SAVE_FILE")}
          </div>

          <div className="d-flex  justify-content-between filelist-name">
            <span className="text-label">Name:</span>
            <span className="text-value"> {documentSelectionId.fileName} </span>
          </div>
          <div className="d-flex  justify-content-between filelist-name">
            <span className="text-label">Type:</span>
            <span className="text-value">{`${fileType}, ${formatFileSize(
              documentSelectionId.fileSize
            )}`}</span>
          </div>
        </ModalBody>
        <ModalFooter className="unlink-btn-wrap">
          <div className="d-flex align-items-center justify-content-end w-100 ">
            <a
              href={imageUrls ? imageUrls : documentUrls}
              download
              // target="_blank"
              className={"btn btn-primary text-capitalize mr-2"}
            >
              {languageTranslation("SUBMIT")}
            </a>
            <Button
              className={" text-capitalize"}
              color="secondary"
              onClick={handleClose}
            >
              {languageTranslation("CANCEL")}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default DisplayDifferentModal;
