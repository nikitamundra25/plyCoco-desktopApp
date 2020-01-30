import React, { FunctionComponent } from 'react';
import { Col } from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import { IEmailTemplateList } from '../../../../interfaces';
import Loader from '../../containers/Loader/Loader';

export const EmailTemplateList: FunctionComponent<IEmailTemplateList> = ({
  onTemplateSelection,
  data,
}: IEmailTemplateList) => {
  return (
    <Col lg={'7'}>
      {console.log('data', data)}
      <h5 className='content-title'>{languageTranslation('MENU_ENTRY')}</h5>
      <div className='common-list-wrap border-0'>
        <div className='common-list-body h-auto'>
          <ul className='common-list list-unstyled'>
            {data && data.getEmailtemplate ? (
              data.getEmailtemplate.map((menu: any) => {
                return (
                  <li onClick={() => onTemplateSelection(menu.id)}>
                    <span>{menu.menuEntry}</span>
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
