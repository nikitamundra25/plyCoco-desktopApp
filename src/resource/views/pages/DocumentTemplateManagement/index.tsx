import React, {
  Component,
  FunctionComponent,
  useCallback,
  useState
} from "react";
import { FormGroup, Label, Input, Col, Row, Form, Table } from "reactstrap";
import moment from "moment";
import Dropzone, { useDropzone } from "react-dropzone";
import Select from "react-select";
import { languageTranslation } from "../../../../helpers";
import { State } from "../../../../config";
import { IDocumentUrls } from "../../../../interfaces";
import { ConfirmBox } from "../../components/ConfirmBox";
import displaydoc from "../../../assets/img/display-doc.svg";
import upload from "../../../assets/img/upload.svg";
import visit from "../../../assets/img/visit.svg";
import "./index.scss";

const WorkingProof: FunctionComponent = () => {
  const [documentUrls, setDocumentUrl] = useState<IDocumentUrls[] | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const temp: any = documentUrls ? documentUrls : [];
    acceptedFiles.forEach((file: File) => {
      console.log(file, "fvgfgfgfgfgfg");

      if (file) {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onloadend = () => {
          console.log(reader.result, "reader.resultreader.result");
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
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center px-2 mb-1">
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={upload} alt="" />
                </span>
                <span className="header-nav-text">
                  Retrieve new work proofs
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={displaydoc} alt="" />
                </span>
                <span className="header-nav-text">Display different</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-text">Hide mapped</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-text">Hide Locked caregiver</span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-text">Hide old files</span>
              </div>
            </div>
          </div>

          <div className="common-content flex-grow-1">
            <div>
              <Form className="form-section ">
                <Row>
                  <Col lg={"4"}>
                    <div>
                      <h5 className="content-title">New Work Proofs</h5>
                      <div className="working-height">
                        <div className="form-section pt-2 px-3">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                              Drag 'n' drop some files here, or click to select
                              files
                            </p>
                          </div>
                        </div>
                        <div className="document-list">
                          <Table responsive className="documentlist-table">
                            <thead className="thead-bg">
                              <tr>
                                <th className="date-col">Date</th>
                                <th className="file-col">File Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {documentUrls && documentUrls.length
                                ? documentUrls.map(
                                    (
                                      { name, date }: IDocumentUrls,
                                      index: number
                                    ) => {
                                      return (
                                        <tr key={index}>
                                          <td className="date-col">{date} </td>
                                          <td className="file-col">{name}</td>
                                        </tr>
                                      );
                                    }
                                  )
                                : null}
                              {/* <tr>
                                <td colSpan={2}>
                                  <div className="date-title">
                                    <span className="align-middle mr-2">
                                      <i className="icon-arrow-down" />
                                    </span>
                                    <span className="align-middle ">
                                      Type: file Type1
                                    </span>
                                  </div>
                                  <div>
                                    <Table
                                      bordered
                                      hover
                                      responsive
                                      className="inner-documentlist-table"
                                    >
                                      <tbody>
                                        <tr>
                                          <td className="date-col">
                                            29.04.2019{" "}
                                          </td>
                                          <td className="file-col">
                                            license document.pdf
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="date-col">
                                            29.04.2019{" "}
                                          </td>
                                          <td className="file-col">
                                            invoice document.pdf
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={2}>
                                  <div className="date-title">
                                    <span className="align-middle mr-2">
                                      <i className="icon-arrow-down" />
                                    </span>
                                    <span className="align-middle ">
                                      Type: file Type2
                                    </span>
                                  </div>
                                  <div>
                                    <Table
                                      bordered
                                      hover
                                      responsive
                                      className="inner-documentlist-table"
                                    >
                                      <tbody>
                                        <tr>
                                          <td className="date-col">
                                            29.04.2019{" "}
                                          </td>
                                          <td className="file-col">
                                            license document.pdf
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="date-col">
                                            29.04.2019{" "}
                                          </td>
                                          <td className="file-col">
                                            invoice document.pdf
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </td>
                              </tr>
                             */}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={"4"}>
                    <h5 className="content-title">Preview</h5>

                    <div className="document-preview d-flex justify-content-center working-height">
                      <div className="align-self-center">
                        <span className="d-block text-center block-page">
                          <img className="img-responsive" src={visit} alt="" />
                        </span>
                        The Document Does Not Contain Any Pages
                      </div>
                    </div>
                  </Col>
                  <Col lg={"4"}>
                    <div>
                      <h5 className="content-title">Performed Work</h5>
                      <div className="working-height">
                        <div className="document-form py-2 px-3">
                          <Row>
                            <Col lg={"12"}>
                              <FormGroup>
                                <Row>
                                  <Col sm="4">
                                    <Label className="form-label col-form-label">
                                      {languageTranslation("ID")}
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder={languageTranslation("ID")}
                                        className="width-common"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                            <Col lg={"12"}>
                              <FormGroup>
                                <Row>
                                  <Col sm="4">
                                    <Label className="form-label col-form-label">
                                      Caregiver
                                    </Label>
                                  </Col>
                                  <Col sm="8">
                                    <div>
                                      <Select
                                        placeholder="Select Caregiver"
                                        options={State}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </div>
                        <Table bordered hover responsive>
                          <thead className="thead-bg">
                            <tr>
                              <td>Begin</td>
                              <td>Facility</td>
                              <td>Department</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                  <div>20.08.2019</div>
                                </div>
                              </td>
                              <td>Nursing</td>
                              <td>central department</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                  <div>20.08.2019</div>
                                </div>
                              </td>
                              <td>Nursing</td>
                              <td>central department</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                  <div>20.08.2019</div>
                                </div>
                              </td>
                              <td>Nursing</td>
                              <td>central department</td>
                            </tr>
                            <tr>
                              <td>
                                <div className="d-flex align-items-center">
                                  <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                    <input
                                      type="checkbox"
                                      id="checkAll"
                                      className=""
                                    />
                                    <label className=""></label>
                                  </span>
                                  <div>20.08.2019</div>
                                </div>
                              </td>
                              <td>Nursing</td>
                              <td>central department</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingProof;
