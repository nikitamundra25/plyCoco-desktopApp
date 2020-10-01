import React, { FunctionComponent } from "react";
import Select from "react-select";
import { Button } from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import save from "../../../assets/img/save.svg";
import clear from "../../../assets/img/clear.svg";
import newEmail from "../../../assets/img/new-email.svg";
import { IEmailTemplateMenu } from "../../../../interfaces";
import delete_icon from "../../../assets/img/delete.svg";

export const EmailTemplateMenu: FunctionComponent<IEmailTemplateMenu> = (
  props: IEmailTemplateMenu
) => {
  const {
    typeListOptions,
    templateType,
    activeTemplate,
    handleSubmit,
    onAddNewTemplate,
    onTypeChange,
    onDeleteEmailTemplate,
    addEmailLoading,
    id,
    updateLoading,
    showArchive,
    onViewTrash,
    onBackToList
  } = props;
  return (
    <>
      <div className="sticky-common-header">
        {showArchive ? (
          <div className="common-topheader d-flex align-items-center justify-content-end py-2 border-bottom">
            <Button
              onClick={onBackToList}
              color={"primary"}
              className={"btn-email-save mr-2"}
            >
              <i className={"fa fa-arrow-left"} />
              &nbsp; {languageTranslation("BACK_TO_LIST")}
            </Button>
          </div>
        ) : (
          <div className="common-topheader d-flex align-items-center py-2 border-bottom">
            <div className="template-lable">
              {languageTranslation("TEMPLATE_TYPE")}
            </div>
            <div className="user-select">
              <Select
                placeholder={languageTranslation("SELECT_TEMPLATE")}
                options={typeListOptions}
                value={templateType}
                onChange={onTypeChange}
                classNamePrefix="custom-inner-reactselect"
                className={"custom-reactselect"}
              />
            </div>
            <div
              className={`header-nav-item ${!id ? "active" : ""}`}
              onClick={onAddNewTemplate}
            >
              <span className="header-nav-icon">
                <img src={newEmail} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("NEW_EMAIL_TEMPLATE")}
              </span>
            </div>
            <div
              className={`header-nav-item ${!activeTemplate ? "disable" : ""}`}
              onClick={onDeleteEmailTemplate}
            >
              <span className="header-nav-icon">
                <img src={clear} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("CLEAR")}
              </span>
            </div>

            <div className={`header-nav-item`} onClick={onViewTrash}>
              <span className="header-nav-icon">
                <img src={delete_icon} alt="" />
              </span>
              <span className="header-nav-text">
                {languageTranslation("VIEW_ARCHIVE")}
              </span>
            </div>
            <Button
              onClick={handleSubmit}
              color={"primary"}
              className={"btn-email-save ml-auto mr-2"}
            >
              {addEmailLoading || updateLoading ? (
                <i className="fa fa-spinner fa-spin " />
              ) : (
                ""
              )}
              &nbsp;{languageTranslation("SAVE_BUTTON")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
