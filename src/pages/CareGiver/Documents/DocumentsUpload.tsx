import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Col, Row, UncontrolledCollapse, Table } from "reactstrap";
class DocumentsUpload extends Component {
  render() {
    return (
      <>
        <div className="document-upload-section mb-3">
          <Table bordered hover responsive>
            <thead className="thead-bg">
              <tr>
                <th>Date</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Remarks</th>
                <th>Action</th>
                <th>File Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
              <tr>
                <td>20.08.2019 12:08:20</td>
                <td>License.pdf</td>
                <td>Diploama/Exam</td>
                <td></td>
                <td>
                  <span className="checkboxli checkbox-custom checkbox-default">
                    <input type="checkbox" id="checkAll" className="" />
                    <label className=""></label>
                  </span>
                </td>
                <td>162KB</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
export default DocumentsUpload;
