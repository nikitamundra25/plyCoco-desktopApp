import React, { FunctionComponent } from "react";
import { Col } from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import { IEmailTemplateList } from "../../../../interfaces";
import Loader from "../../containers/Loader/Loader";

export const EmailTemplateList: FunctionComponent<IEmailTemplateList> = ({
  onTemplateSelection,
  data
}: IEmailTemplateList) => {
  const id =
    data && data.getEmailtemplate && data.getEmailtemplate.id
      ? data.getEmailtemplate.id
      : "";
  return (
    <Col lg={"7"}>
      <h5 className="content-title">{languageTranslation("MENU_ENTRY")}</h5>
      <div className="common-list-wrap border-0 email-template-list">
        <div className="common-list-body">
          <ul className="common-list list-unstyled mb-0">
            {data &&
            data.getEmailtemplate &&
            data.getEmailtemplate.email_templates ? (
              data.getEmailtemplate.email_templates.map((menu: any) => {
                return (
                  <li onClick={() => onTemplateSelection(menu.id)}>
                    {menu.menuEntry}
                  </li>
                );
              })
            ) : (
              <Loader />
            )}
          </ul>
        </div>
      </div>
    </Col>
  );
};
