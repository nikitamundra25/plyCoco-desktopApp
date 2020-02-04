import React, {
  Component,
  FunctionComponent,
  useCallback,
  useState
} from "react";
import { Table, Row, Col, Button, UncontrolledTooltip } from "reactstrap";
import moment from "moment";
import { languageTranslation } from "../../../../../helpers";
import Dropzone, { useDropzone } from "react-dropzone";
import { IDocumentUrls } from "../../../../../interfaces";
import DocumentUploadModal from "./DocumentModal";

const DocumentsUpload: FunctionComponent = () => {
  const [showToDo, setShowToDo] = useState<boolean>(false);

  const [documentUrls, setDocumentUrl] = useState<IDocumentUrls[] | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const temp: any = documentUrls ? documentUrls : [];
    acceptedFiles.forEach((file: File) => {
      console.log(file, "file details");
      if (file) {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onloadend = () => {
          // console.log(reader.result, 'reader.resultreader.result');
          if (reader.result) {
            temp.push({
              path: reader.result,
              name: file.name,
              date: moment().format("DD.MM.YYYY")
            });
            setDocumentUrl(temp);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <div className="document-upload-section mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="content-title mb-3">
            {languageTranslation("CG_SUB_MENU_DOCUMENTS")}
          </h5>
          <Button
            onClick={() => setShowToDo(true)}
            className="btn-common mb-3"
            color="primary"
          >
            {languageTranslation("UPLOAD_DOCUMENT")}
          </Button>
        </div>

        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="sno-th-column">{languageTranslation("S_NO")}</th>
              <th className="date-th-column">{languageTranslation("DATE")}</th>
              <th className="file-th-column">
                {languageTranslation("FILE_NAME")}
              </th>
              <th className="filetype-th-column">
                {languageTranslation("TYPE")}
              </th>
              <th>{languageTranslation("REMARKS")}</th>
              <th className="checkbox-th-column ">
                {languageTranslation("STATUS")}
              </th>
              <th className="filesize-th-column">
                {languageTranslation("FILE_SIZE")}
              </th>
              <th className={"text-center action-th-column"}>
                {languageTranslation("TABEL_HEAD_CG_ACTION")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>20.08.2019 12:08:20</td>
              <td>
                <span className="one-line-text">License.pdf</span>
              </td>
              <td>
                <span className="one-line-text">Diploma/Exam</span>
              </td>
              <td></td>
              <td className="text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""></label>
                </span>
              </td>
              <td>162KB</td>
              <td>
                <div className="action-btn">
                  <span id={`edit`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`edit`}>
                      {languageTranslation("DOCUMENT_EDIT")}
                    </UncontrolledTooltip>
                    <i className="fa fa-pencil"></i>
                  </span>

                  <span id={`delete`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`delete`}>
                      {languageTranslation("DOCUMENT_DELETE")}
                    </UncontrolledTooltip>
                    <i className="fa fa-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>20.08.2019 12:08:20</td>
              <td>
                <span className="one-line-text">License.pdf</span>
              </td>
              <td>
                <span className="one-line-text">Diploma/Exam</span>
              </td>
              <td></td>
              <td className="text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""></label>
                </span>
              </td>
              <td>162KB</td>
              <td>
                <div className="action-btn">
                  <span id={`edit`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`edit`}>
                      {languageTranslation("DOCUMENT_EDIT")}
                    </UncontrolledTooltip>
                    <i className="fa fa-pencil"></i>
                  </span>

                  <span id={`delete`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`delete`}>
                      {languageTranslation("DOCUMENT_DELETE")}
                    </UncontrolledTooltip>
                    <i className="fa fa-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>20.08.2019 12:08:20</td>
              <td>
                <span className="one-line-text">License.pdf</span>
              </td>
              <td>
                <span className="one-line-text">Diploma/Exam</span>
              </td>
              <td></td>
              <td className="text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""></label>
                </span>
              </td>
              <td>162KB</td>
              <td>
                <div className="action-btn">
                  <span id={`edit`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`edit`}>
                      {languageTranslation("DOCUMENT_EDIT")}
                    </UncontrolledTooltip>
                    <i className="fa fa-pencil"></i>
                  </span>

                  <span id={`delete`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`delete`}>
                      {languageTranslation("DOCUMENT_DELETE")}
                    </UncontrolledTooltip>
                    <i className="fa fa-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>20.08.2019 12:08:20</td>
              <td>
                <span className="one-line-text">License.pdf</span>
              </td>
              <td>
                <span className="one-line-text">Diploma/Exam</span>
              </td>
              <td></td>
              <td className="text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""></label>
                </span>
              </td>
              <td>162KB</td>
              <td>
                <div className="action-btn">
                  <span id={`edit`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`edit`}>
                      {languageTranslation("DOCUMENT_EDIT")}
                    </UncontrolledTooltip>
                    <i className="fa fa-pencil"></i>
                  </span>

                  <span id={`delete`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`delete`}>
                      {languageTranslation("DOCUMENT_DELETE")}
                    </UncontrolledTooltip>
                    <i className="fa fa-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>20.08.2019 12:08:20</td>
              <td>
                <span className="one-line-text">License.pdf</span>
              </td>
              <td>
                <span className="one-line-text">Diploma/Exam</span>
              </td>
              <td></td>
              <td className="text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""></label>
                </span>
              </td>
              <td>162KB</td>
              <td>
                <div className="action-btn">
                  <span id={`edit`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`edit`}>
                      {languageTranslation("DOCUMENT_EDIT")}
                    </UncontrolledTooltip>
                    <i className="fa fa-pencil"></i>
                  </span>

                  <span id={`delete`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`delete`}>
                      {languageTranslation("DOCUMENT_DELETE")}
                    </UncontrolledTooltip>
                    <i className="fa fa-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>20.08.2019 12:08:20</td>
              <td>
                <span className="one-line-text">License.pdf</span>
              </td>
              <td>
                <span className="one-line-text">Diploma/Exam</span>
              </td>
              <td></td>
              <td className="text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""></label>
                </span>
              </td>
              <td>162KB</td>
              <td>
                <div className="action-btn">
                  <span id={`edit`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`edit`}>
                      {languageTranslation("DOCUMENT_EDIT")}
                    </UncontrolledTooltip>
                    <i className="fa fa-pencil"></i>
                  </span>

                  <span id={`delete`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`delete`}>
                      {languageTranslation("DOCUMENT_DELETE")}
                    </UncontrolledTooltip>
                    <i className="fa fa-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>20.08.2019 12:08:20</td>
              <td>
                <span className="one-line-text">License.pdf</span>
              </td>
              <td>
                <span className="one-line-text">Diploma/Exam</span>
              </td>
              <td></td>
              <td className="text-center">
                <span className="checkboxli checkbox-custom checkbox-default">
                  <input type="checkbox" id="checkAll" className="" />
                  <label className=""></label>
                </span>
              </td>
              <td>162KB</td>
              <td>
                <div className="action-btn">
                  <span id={`edit`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`edit`}>
                      {languageTranslation("DOCUMENT_EDIT")}
                    </UncontrolledTooltip>
                    <i className="fa fa-pencil"></i>
                  </span>

                  <span id={`delete`} className="btn-icon mr-2">
                    <UncontrolledTooltip placement={"top"} target={`delete`}>
                      {languageTranslation("DOCUMENT_DELETE")}
                    </UncontrolledTooltip>
                    <i className="fa fa-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* <CreateTodo
          show={showToDo}
          handleClose={() => setShowToDo(false)}
          name={selectUser ? selectUser.label : null}
          userRole={'careInstitution'}
        /> */}
      <DocumentUploadModal
        show={showToDo}
        handleClose={() => setShowToDo(false)}
      />
    </>
  );
};
export default DocumentsUpload;
