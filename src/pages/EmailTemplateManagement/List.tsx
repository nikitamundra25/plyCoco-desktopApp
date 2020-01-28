import React, { FunctionComponent } from 'react';
import { Col } from 'reactstrap';
import { languageTranslation } from '../../helpers';
import { IEmailTemplateList } from '../../interfaces';

export const EmailTemplateList: FunctionComponent<IEmailTemplateList> = ({
  onTemplateSelection,
}: IEmailTemplateList) => {
  return (
    <Col lg={'7'}>
      <h5 className='content-title'>{languageTranslation('MENU_ENTRY')}</h5>
      <div className='common-list-wrap border-0'>
        <div className='common-list-body h-auto'>
          <ul className='common-list list-unstyled'>
            <li onClick={() => onTemplateSelection('')}>Dialysis </li>
            <li>Home Management</li>
            <li>Nurse/carer</li>
            <li>Dialysis </li>
            <li>-----------------------------------------</li>
            <li>Nurse/carer</li>
            <li>Dialysis </li>
            <li>Home Management</li>
            <li>Nurse/carer</li>
            <li>Dialysis </li>
            <li>----------------------------------------</li>
            <li>Nurse/carer</li>
            <li>Dialysis </li>
            <li>Home Management</li>
            <li>Nurse/carer</li>
            <li>Dialysis </li>
            <li>Home Management</li>
            <li>-----------------------------------------</li>
            <li>Dialysis </li>
            <li>Home Management</li>
            <li>Nurse/carer</li>
            <li>Dialysis </li>
            <li>Dialysis </li>
            <li>Home Management</li>
            <li>Nurse/carer</li>
            <li>Dialysis </li>
          </ul>
        </div>
      </div>
    </Col>
  );
};
