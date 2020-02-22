import React, { FunctionComponent } from "react";
import { Col, Table, Button, UncontrolledTooltip } from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import { IEmailTemplateList } from "../../../../interfaces";
import Loader from "../../containers/Loader/Loader";
import nodata from "../../../assets/img/nodata.png";
import archive from "../../../assets/img/restore.svg";
import ButtonTooltip from "../../components/Tooltip/ButtonTooltip";
export const EmailTemplateList: FunctionComponent<IEmailTemplateList> = ({
  onTemplateSelection,
  data,
  loading,
  activeTemplate,
  showArchive,
  archiveList,
  archiveListLoading,
  onArchiveTemplateSelection,
  onRestoreEmailTemplate,
  onPermanentlyDeleteEmployee
}: IEmailTemplateList) => {
  return (
    <Col lg={"5"} className="pr-lg-0">
      <h5 className="content-title">{languageTranslation("MENU_ENTRY")}</h5>
      <div className="email-template-list custom-scrollbar">
        <div className="archieve-table-minheight ">
          <Table bordered hover responsive className="mb-0">
            <thead className="thead-bg">
              <tr>
                <th className="sno-th-column text-center">
                  {languageTranslation("S_NO")}
                </th>
                <th>{languageTranslation("MENU_ENTRY")}</th>
                {showArchive ? (
                  <th className="text-center status-column">
                    {languageTranslation("TABLE_HEAD_ACTION")}
                  </th>
                ) : null}
              </tr>
            </thead>

            <tbody>
              {loading || archiveListLoading ? (
                <tr>
                  <td className={"table-loader"} colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              ) : showArchive ? (
                archiveList &&
                archiveList.trashEmailTemplateList &&
                archiveList.trashEmailTemplateList.length ? (
                  archiveList.trashEmailTemplateList.map(
                    (trashMenu: any, index: number) => {
                      return (
                        <tr
                          key={index}
                          className={`cursor-pointer ${
                            activeTemplate === trashMenu.id ? "active" : ""
                          }`}
                        >
                          <td className="sno-th-column text-center">
                            {index + 1}
                          </td>
                          <td
                            onClick={() =>
                              onArchiveTemplateSelection(trashMenu.id)
                            }
                          >
                            <span
                              className={`cursor-pointer text-capitalize word-wrap`}
                            >
                              {trashMenu.menuEntry}
                            </span>
                          </td>
                          <td>
                            <div className="action-btn">
                              <span
                                className="btn-icon mr-2"
                                id={`restore${index}`}
                                onClick={() =>
                                  onRestoreEmailTemplate(trashMenu.id)
                                }
                              >
                                <UncontrolledTooltip
                                  placement="top"
                                  target={`restore${index}`}
                                >
                                  {languageTranslation("RESTORE_TOOLTIP")}
                                </UncontrolledTooltip>
                                <i className="fa fa-undo"></i>
                              </span>
                              <span
                                className="btn-icon "
                                id={`delete${index}`}
                                onClick={() =>
                                  onPermanentlyDeleteEmployee(trashMenu.id)
                                }
                              >
                                <UncontrolledTooltip
                                  placement="top"
                                  target={`delete${index}`}
                                >
                                  {languageTranslation(
                                    "DELETE_PERMANENTALY_TOOLTIP"
                                  )}
                                </UncontrolledTooltip>
                                <i className="fa fa-trash"></i>
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : null
              ) : data &&
                data.getEmailtemplate &&
                data.getEmailtemplate.email_templates &&
                data.getEmailtemplate.email_templates.length ? (
                data.getEmailtemplate.email_templates.map(
                  (menu: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className={`cursor-pointer ${
                          activeTemplate === menu.id ? "active" : ""
                        }`}
                        onClick={() => onTemplateSelection(menu.id)}
                      >
                        <td className="sno-th-column text-center">
                          {index + 1}
                        </td>
                        <td>
                          <span
                            className={`cursor-pointer text-capitalize word-wrap`}
                          >
                            {menu.menuEntry}
                          </span>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr className={"text-center no-hover-row"}>
                  <td colSpan={2} className={"pt-5 pb-5"}>
                    <div className="no-list-section d-flex align-items-center justify-content-center flex-column py-5 my-3">
                      <img src={nodata} alt="" className="no-img" />
                      <span className="no-text">No Menu Entry Added.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
            {/* )} */}
          </Table>
        </div>
      </div>
    </Col>
  );
};
