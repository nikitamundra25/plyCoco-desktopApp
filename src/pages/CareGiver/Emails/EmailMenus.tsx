import React, { FunctionComponent } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { EmailMenusTab } from '../../../config';
import { IEMailMenuProps } from '../../../interfaces';

export const EmailMenus: FunctionComponent<IEMailMenuProps> = (
  props: IEMailMenuProps,
) => {
  return (
    <Nav className='custom-tabs' tabs>
      {EmailMenusTab
        ? EmailMenusTab.map((tab: any, index: number) => {
            return (
              <NavItem key={index}>
                <NavLink
                  // className={pathname === route.path ? "active" : null}
                  active={index === props.activeTab}
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (props.onTabChange) props.onTabChange(index);
                  }}
                >
                  <span className='icon'>
                    <i className={tab.icon}></i>
                  </span>
                  <span className='nav-text text-capitalize'>{tab.name}</span>
                </NavLink>
              </NavItem>
            );
          })
        : null}
    </Nav>
  );
};
