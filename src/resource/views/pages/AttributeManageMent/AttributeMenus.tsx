import React, { FunctionComponent } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const AttributeMenus: FunctionComponent<{
  data: any;
  onAttributeChange: (id: number) => void;
  activeAttributeMenu: number | null;
}> = (props: {
  data: any;
  onAttributeChange: (id: number) => void;
  activeAttributeMenu: number | null;
}) => {
  const { data, onAttributeChange, activeAttributeMenu } = props;
  return (
    <Nav tabs className='contact-tabs'>
      {data
        ? data.map((attribute: any, index: number) => {
            return (
              <NavItem className='text-capitalize' key={index}>
                <NavLink
                  className={`${
                    activeAttributeMenu === attribute.id ? 'active' : ''
                  }`}
                  onClick={() => onAttributeChange(attribute.id)}
                >
                  {attribute.name}{' '}
                </NavLink>
              </NavItem>
            );
          })
        : null}
    </Nav>
  );
};

export default AttributeMenus;
