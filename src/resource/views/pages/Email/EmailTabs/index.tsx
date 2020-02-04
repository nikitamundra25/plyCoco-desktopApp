import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const EmailTabs = (props: any) => {
  return (
    <div className='common-sidnav'>
      <Nav className='common-ul' tabs>
        {props.tabs
          ? props.tabs.map((tab: any, index: number) => {
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
                    <span className='nav-text text-capitalize'>{tab.name}</span>
                  </NavLink>
                </NavItem>
              );
            })
          : null}
      </Nav>
    </div>
  );
};

export default EmailTabs;
