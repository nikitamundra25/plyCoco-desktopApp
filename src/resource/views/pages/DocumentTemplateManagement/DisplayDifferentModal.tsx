import React, { useState, FunctionComponent } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Button,
  ModalFooter
} from "reactstrap";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import { languageTranslation, formatFileSize } from "../../../../helpers";

const DisplayDifferentModal: FunctionComponent<any> = (props: any) => {
  const { show, handleClose, documentUrls,imageUrls ,documentSelectionId} = props;
    console.log("documentSelectionId",documentSelectionId);
    
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

  let fileType: any = documentSelectionId && documentSelectionId.fileName ? documentSelectionId.fileName.substr(documentSelectionId.fileName.lastIndexOf('.') + 1) : ""
  return (
    <div>
      <Modal
        isOpen={show}
        className="common-modal attribute-modal"
        centered
        size="l"
      >
        <ModalHeader close={externalCloseBtn}>
         {languageTranslation("FILE_DOWNLOAD")}
        </ModalHeader>
        <ModalBody>
          <div className=" align-items-center mb-2">
            {/* <div className='custom-header-nav-item mr-3'> */}
            {/* <span className='custom-header-nav-icon'>
                <img src={filter} alt='' />
              </span> */}
            <div className="unlink-label mb-2">
                {languageTranslation("OPEN_SAVE_FILE")}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <span>
               Name: {documentSelectionId.fileName}
               </span>
               <span>
               Type: {`${fileType}, ${formatFileSize(documentSelectionId.fileSize)}`}
               </span>
            </div>
          </div>
          {/* </div> */}
        </ModalBody>
        <ModalFooter className="unlink-btn-wrap">
          <div className="d-flex align-items-center  w-100 ">
            <Button
              className={"btn-save text-capitalize"}
              color="primary"
            >
                {/* <a href={documentUrls} download  target="_blank">  */}
             {languageTranslation("OPENFILE")}
                  {/* </a> */}
            </Button>

            <a href={imageUrls ? imageUrls : documentUrls} download>
            <Button
              className={"btn-save text-capitalize"}
              color="primary"
              type="submit"
            >    
           {languageTranslation("SUBMIT")}
            </Button>
</a>
            <Button
              className={"btn-save text-capitalize"}
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
