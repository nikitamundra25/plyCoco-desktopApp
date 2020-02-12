import React, { FunctionComponent, useEffect, useState } from "react";
import { FormGroup, Label, Input, Col, Row, Table } from "reactstrap";
import Select from "react-select";
import { languageTranslation } from "../../../../helpers";
import { CareGiverQueries } from "../../../../graphql/queries";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { State } from "../../../../config";
import filter from "../../../assets/img/filter.svg";
import refresh from "../../../assets/img/refresh.svg";
import send from "../../../assets/img/send.svg";
import "./index.scss";
import { useLazyQuery } from "@apollo/react-hooks";
import Loader from "../../containers/Loader/Loader";

const [, , , , , , GET_CAREGIVERS_FOR_BULK_EMAIL] = CareGiverQueries;

const BulkEmailCaregiver: FunctionComponent = () => {
  let [selectedCareGiver, setselectedCareGiver] = useState<any>([]);
  // To get caregiver list from db
  const [
    fetchCareGiverList,
    { data: careGivers, called, loading, refetch }
  ] = useLazyQuery<any, any>(GET_CAREGIVERS_FOR_BULK_EMAIL, {
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    // Fetch list of caregivers
    fetchCareGiverList({
      variables: {
        searchBy: "",
        sortBy: 3,
        limit: 200,
        page: 1,
        isActive: ""
      }
    });
  }, []);

  const [careGiverData, setcareGiverData] = useState<Object[]>([]);
  useEffect(() => {
    if (careGivers) {
      const { getCaregivers } = careGivers;
      const { result } = getCaregivers;
      setcareGiverData(result);
    }
  }, [careGivers]);

  const handleSelectAll = async () => {
    if (
      careGivers &&
      careGivers.getCaregivers &&
      careGivers.getCaregivers.result.length
    ) {
      let list: any = [];
      if (selectedCareGiver && selectedCareGiver.length <= 0) {
        careGivers.getCaregivers.result.map((key: any) => {
          return (list = [...list, parseInt(key.id)]);
        });
        setselectedCareGiver(list);
      } else {
        setselectedCareGiver([]);
      }
    }
  };

  const handleCheckElement = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { target } = e;
    const { checked } = target;

    if (checked) {
      setselectedCareGiver((selectedCareGiver: any) => [
        ...selectedCareGiver,
        parseInt(id)
      ]);
      return;
    } else {
      if (selectedCareGiver.indexOf(parseInt(id)) > -1) {
        selectedCareGiver.splice(selectedCareGiver.indexOf(parseInt(id)), 1);
        setselectedCareGiver([...selectedCareGiver]);
      }
    }
  };

  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center px-2 mb-1">
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={refresh} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("REFRESH")}
                </span>
              </div>
              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={filter} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("ATTRIBUTES")}
                </span>
              </div>

              <div className="header-nav-item">
                <span className="header-nav-icon">
                  <img src={send} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("SEND")}
                </span>
              </div>
            </div>
          </div>

          <div className="common-content flex-grow-1">
            <div className="bulk-email-section">
              <Row>
                <Col lg={"5"}>
                  <div className="caregiver-list custom-scroll">
                    <Table bordered hover responsive>
                      <thead className="thead-bg">
                        <tr>
                          <th className="checkbox-th-column">
                            <span className="checkboxli checkbox-custom checkbox-default mr-2">
                              <input
                                type="checkbox"
                                id="checkAll"
                                name="checkbox"
                                className=""
                                checked={
                                  careGivers &&
                                  careGivers.getCaregivers &&
                                  careGivers.getCaregivers.result.length ===
                                    selectedCareGiver.length
                                    ? true
                                    : false
                                }
                                onChange={(e: any) => {
                                  handleSelectAll();
                                }}
                              />
                              <label className=""></label>
                            </span>
                          </th>
                          <th>{languageTranslation("NAME")}</th>
                          <th>{languageTranslation("EMAIL")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!called || loading ? (
                          <tr>
                            <td className={"table-loader"} colSpan={8}>
                              <Loader />
                            </td>
                          </tr>
                        ) : careGiverData && careGiverData.length ? (
                          careGiverData.map(
                            (careGivers: any, index: number) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <span className="checkboxli checkbox-custom checkbox-default mr-2">
                                      <input
                                        type="checkbox"
                                        id="check"
                                        name="checkbox"
                                        className=""
                                        checked={
                                          selectedCareGiver &&
                                          selectedCareGiver.length &&
                                          selectedCareGiver.indexOf(
                                            parseInt(careGivers.id)
                                          ) > -1
                                            ? true
                                            : false
                                        }
                                        onChange={(e: any) => {
                                          handleCheckElement(e, careGivers.id);
                                        }}
                                      />
                                      <label className=""></label>
                                    </span>
                                  </td>
                                  <td>{`${careGivers.firstName} ${careGivers.lastName}`}</td>
                                  <td>{careGivers.email}</td>
                                </tr>
                              );
                            }
                          )
                        ) : null}
                      </tbody>
                    </Table>
                  </div>
                </Col>

                <Col lg={"7"}>
                  <div className="">
                    <div className="form-section py-2 px-3 bulk-email-form">
                      <div className="d-flex align-items-end justify-content-between bulk-email-header">
                        <Label className="bulk-email-label">
                          {languageTranslation("SUBJECT")}{" "}
                          {languageTranslation("EMAIL")}
                        </Label>
                        <div className="select-box mb-2">
                          <Select
                            placeholder={languageTranslation("SELECT_TEMPLATE")}
                            options={State}
                            classNamePrefix="custom-inner-reactselect"
                            className="custom-reactselect"
                          />
                        </div>
                      </div>
                      <Row>
                        <Col lg={"12"}>
                          <FormGroup>
                            <div>
                              <Input
                                type="text"
                                placeholder={languageTranslation("SUBJECT")}
                                name={"lastName"}
                                className="width-common"
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col lg={"12"}>
                          <FormGroup>
                            <Label className="form-label col-form-label mb-2">
                              {languageTranslation("TEXT_EMAIL")}
                            </Label>

                            <div>
                              <Editor
                                // editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                placeholder="Enter Email Content Here"
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    "fontSize",
                                    "list",
                                    "textAlign",
                                    "link"
                                  ],
                                  inline: {
                                    options: ["bold", "italic", "underline"]
                                  },
                                  fontSize: {
                                    className: "bordered-option-classname"
                                  },
                                  fontFamily: {
                                    className: "bordered-option-classname"
                                  },
                                  list: {
                                    inDropdown: false,
                                    options: ["unordered"]
                                  },
                                  link: {
                                    options: ["link"]
                                  }
                                }}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <Table bordered hover responsive className="mail-table">
                      <thead className="thead-bg">
                        <tr>
                          <th className="file-name">
                            {languageTranslation("FILE_NAME")}
                          </th>
                          <th className="size-col">
                            {languageTranslation("SIZE")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="file-name ">Pan Card.PDF</td>
                          <td className="size-col">1kb</td>
                        </tr>
                        <tr>
                          <td className="file-name">VoterID.pdf</td>
                          <td className="size-col">2kb</td>
                        </tr>

                        <tr>
                          <td className="file-name">Pan Card.PDF</td>
                          <td className="size-col">5kb</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkEmailCaregiver;
