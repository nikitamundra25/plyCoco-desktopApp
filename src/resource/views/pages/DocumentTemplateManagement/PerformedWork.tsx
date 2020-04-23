import React, { FunctionComponent } from "react";
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import { IDocumentPerformedWorkInterface } from "../../../../interfaces";
import visit from "../../../assets/img/visit.svg";
import Select from "react-select";

import "./index.scss";
import CustomOption from "../../components/CustomOptions";
import Loader from "../../containers/Loader/Loader";
import moment from "moment";
import { defaultDateFormat } from "../../../../config";
import CaregiverCustomAsyncList from "../../components/DropdownList/CareGiverCustomAsyncSelect";

const PerformedWork: FunctionComponent<IDocumentPerformedWorkInterface> = (
  props: IDocumentPerformedWorkInterface
) => {
  const {
    careGiversOptions,
    handleChange,
    appointmentList,
    caregiverDataLoading,
    qualificationList,
    onFilterById,
    handleSelect,
    checkboxMark,
    caregiverFilter
  } = props;

  const handleKeyPress = (e: any) => {
    if (e.which === 13 || e.keyCode === 13) {
      onFilterById(e.target.value);
    } else {
      return;
    }
  };

  return (
    <div>
      <h5 className="content-title">
        {languageTranslation("PERFORMED_WORK_HEADING")}
      </h5>
      <div className="working-height">
        <div className="document-form py-2 px-3">
          <Row>
            <Col lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("ID")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      <Input
                        type="text"
                        name={"id"}
                        placeholder={languageTranslation("ID")}
                        className="width-common"
                        onChange={(e: any) => handleChange(e, "id")}
                        onKeyPress={(e: any) => handleKeyPress(e)}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <FormGroup>
                <Row className="align-items-center">
                  <Col sm="4">
                    <Label className="form-label col-form-label">
                      {languageTranslation("MENU_CAREGIVER")}
                    </Label>
                  </Col>
                  <Col sm="8">
                    <div>
                      {/* <Select
                        placeholder={languageTranslation("SELECT_CAREGIVER")}
                        options={careGiversOptions}
                        classNamePrefix="custom-inner-reactselect"
                        className={"custom-reactselect"}
                        components={{ Option: CustomOption }}
                        onChange={(value: any) =>
                          handleChange(value, "caregiver")
                        }
                      /> */}
                       <CaregiverCustomAsyncList 
            placeholderLabel = {languageTranslation("SELECT_CAREGIVER")}
            onChange={(value: any) =>
              handleChange(value, "caregiver")
            }
            value={
              caregiverFilter && caregiverFilter.value !== ""
                ? caregiverFilter
                : null
            }
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
              <th></th>
              <th>{languageTranslation("ID")} </th>
              <th>{languageTranslation("BEGIN")} </th>
              <th>{languageTranslation("MENU_INSTITUTION")} </th>
              <th>{languageTranslation("DEPARTMENT")} </th>
            </tr>
          </thead>
          <tbody>
            {caregiverDataLoading ? (
              <tr>
                <td className={"table-loader"} colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : appointmentList && appointmentList.length ? (
              appointmentList.map((list: any, index: number) => {
                let qualiName: string = "";
                if (
                  list.cr &&
                  list.cr.division &&
                  list.cr.division.qualifications &&
                  list.cr.division.qualifications.length
                ) {
                  let temp = qualificationList.filter((elem: any) =>
                    list.cr.division.qualifications.find(
                      (id: any) => elem.id === id
                    )
                  );
                  if (temp && temp.length) {
                    temp.map((key: any) => {
                      qualiName += `${key.name} `;
                    });
                  }
                }

                return (
                  <tr>
                    <td>
                      {" "}
                      <span className=" checkbox-custom">
                        <input
                          type="checkbox"
                          id="checkAll"
                          className=""
                          checked={
                            checkboxMark.includes(parseInt(list.id))
                              ? true
                              : false
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleSelect(e, list.id);
                          }}
                        />
                        <label className=""></label>
                      </span>
                    </td>
                    <td>{list.id} </td>
                    <td>
                      {/* <div className="d-flex align-items-center"> */}
                      <div>{moment(list.date).format(defaultDateFormat)} </div>
                      {/* </div> */}
                    </td>
                    <td>{qualiName ? qualiName : "-"}</td>
                    <td>
                      {list.cr && list.cr.division && list.cr.division.name
                        ? list.cr.division.name
                        : "-"}{" "}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className={"text-center no-hover-row"}>
                <td colSpan={12} className={"pt-5 pb-5"}>
                  <div className="no-data-section">
                    <div className="no-data-icon">
                      <i className="icon-ban" />
                    </div>
                    <h4 className="mb-1">
                      {languageTranslation(
                        "NO_APPOINTMENT_CREATED_ACC_TO_SEARCH"
                      )}{" "}
                    </h4>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PerformedWork;
