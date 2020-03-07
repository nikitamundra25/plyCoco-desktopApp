import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import Select from "react-select";
import logger from "redux-logger";
import { languageTranslation } from "../../../../helpers";
import { State } from "../../../../config";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import refresh from "../../../assets/img/refresh.svg";

const DetailListCaregiver = (props: any) => {
  const { show, handleClose } = props;

  const externalCloseBtn = (
    <button className="close modal-close" onClick={() => handleClose()}>
      <img src={close} alt="close" className="main-img" />
      <img src={closehover} alt="close" className="hover-img" />
    </button>
  );
  return (
    <div>
      <Modal
        isOpen={show}
        className="common-modal attribute-modal"
        centered
        size="xl"
      >
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation("DETAIL_LIST_CAREGIVER")}{" "}
        </ModalHeader>
        <ModalBody>
          <div className="common-detail-page">
            <div className="common-detail-section">
              <div className="common-topheader d-flex align-items-center ">
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
                    <img src={refresh} alt="" />
                  </span>
                  <span className="header-nav-text">
                    {languageTranslation("ALWAYS_IN_BACKGROUND")}
                  </span>
                </div>
              </div>
              <div className="common-sidnav">
                <ul className="common-ul nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link active">
                      <span className="nav-text text-capitalize">
                        Booking details
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link ">
                      <span className="nav-text text-capitalize">
                        Price & working hours
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="common-content flex-grow-1 px-0 bg-white">
                <div className="table-minheight ">
                  <Table bordered hover responsive>
                    <thead className="thead-bg">
                      <tr>
                        <th className="whitespace-nowrap">
                          {" "}
                          {languageTranslation("ID")}
                        </th>
                        <th className="whitespace-nowrap">
                          {" "}
                          {languageTranslation("MENU_CAREGIVER")}
                        </th>
                        <th className="whitespace-nowrap">
                          {" "}
                          {languageTranslation("MENU_INSTITUTION")}
                        </th>
                        <th className="whitespace-nowrap">
                          {" "}
                          {languageTranslation("QUALIFICATION")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("DATE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("BEGIN")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("END")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("DEPARTMENT")}
                        </th>

                        <th className="whitespace-nowrap">
                          {languageTranslation("DLN_REQUIRED")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("DLN_AVAILABLE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("REMARKS")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> 3143156</td>
                        <td> Joh Doe</td>
                        <td> Testwerk</td>

                        <td> Altenpfleger, Hauskrankenpflege</td>
                        <td> 03.03.2020</td>
                        <td>06:00</td>
                        <td>14:00</td>
                        <td>Station2</td>
                        <td>
                          <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span>
                        </td>
                        <td>
                          <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span>
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="table-minheight ">
                  <Table bordered hover responsive>
                    <thead className="thead-bg">
                      <tr>
                        <th className="whitespace-nowrap">
                          {" "}
                          {languageTranslation("ID")}
                        </th>
                        <th className="whitespace-nowrap">
                          {" "}
                          {languageTranslation("MENU_CAREGIVER")}
                        </th>
                        <th className="whitespace-nowrap">
                          {" "}
                          {languageTranslation("MENU_INSTITUTION")}
                        </th>
                        <th className="whitespace-nowrap">
                          {" "}
                          {languageTranslation("DATE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("FEE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("NIGHT_FEE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("WEEKEND_FEE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("HOLIDAY_FEE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("WORKING_HOURS")}{" "}
                          {languageTranslation("BEGIN")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("WORKING_HOURS")}{" "}
                          {languageTranslation("END")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("BREAK")}{" "}
                          {languageTranslation("BEGIN")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("BREAK")}{" "}
                          {languageTranslation("END")}
                        </th>

                        <th className="whitespace-nowrap">
                          {languageTranslation("KILOMETER")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("FEE_PER_KM")}
                        </th>

                        <th className="whitespace-nowrap">
                          {languageTranslation("DLN_REQUIRED")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("DLN_AVAILABLE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("NIGHT_ALLOWANCE")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("FACTORING_CONTRACTS")}
                        </th>
                        <th className="whitespace-nowrap">
                          {languageTranslation("FACTORING")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> 3143156</td>
                        <td> Joh Doe</td>
                        <td> Testwerk</td>
                        <td>Tue 03.03.2020</td>
                        <td> 12 </td>
                        <td> 12 </td>
                        <td> 12 </td>
                        <td> 12 </td>
                        <td>Tue, 03.03.2020 06:00</td>
                        <td>Tue, 03.03.2020 14:00</td>
                        <td>Tue, 03.03.2020 06:00</td>
                        <td>Tue, 03.03.2020 14:00</td>
                        <td>120</td>
                        <td>30</td>
                        <td>
                          <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span>
                        </td>
                        <td>
                          <span className="checkbox-custom ">
                            <input type="checkbox" id="checkAll" className="" />
                            <label className=""> </label>
                          </span>
                        </td>
                        <td>From 22 o'clock</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DetailListCaregiver;
