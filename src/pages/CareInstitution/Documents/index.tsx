import React, { Component } from "react";
import { Card, Table, Row, Col, FormGroup } from "reactstrap";
import { RouteComponentProps } from "react-router";
import { languageTranslation } from "../../../helpers";
import Select from "react-select";
import { State, Region } from "../../../config";

class Documents extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: ""
    };
  }
  handleChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };
  onFocus = () => {
    this.setState({
      error: true
    });
  };
  render() {
    return (
      <div className="document-upload-section mb-3">
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th>{languageTranslation("S_NO")}</th>
              <th>{languageTranslation("DATE")}</th>
              <th>{languageTranslation("FILE_NAME")}</th>
              <th>{languageTranslation("TYPE")}</th>
              <th>{languageTranslation("REMARKS")}</th>
              <th>{languageTranslation("STATUS")}</th>
              <th>{languageTranslation("FILE_SIZE")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
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
              <td>2</td>
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
              <td>3</td>
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
              <td>4</td>
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
              <td>5</td>
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
              <td>6</td>
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
              <td>7</td>
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
        <div>
          <Row className="common-offer-row">
            <Col md={4}>
              <div className="common-list-wrap">
                <div className="common-list-header d-flex align-items-cente justify-content-between">
                  <div className="common-list-title align-middle">
                    {languageTranslation("TYPE")}{" "}
                  </div>
                  <div className=" align-middle toggle-icon">
                    <i className="fa fa-angle-down"></i>
                  </div>
                </div>
                <div className="common-list-body">
                  <ul className="common-list list-unstyled">
                    <li>File Type 1 </li>
                    <li>File Type 2</li>
                    <li>File Type 3</li>
                  </ul>
                </div>
                <div className="common-list-footer form-section ">
                  <FormGroup className="mb-0">
                    <Select
                      placeholder={languageTranslation("TYPE")}
                      options={State}
                      menuPlacement={"top"}
                    />
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Documents;
