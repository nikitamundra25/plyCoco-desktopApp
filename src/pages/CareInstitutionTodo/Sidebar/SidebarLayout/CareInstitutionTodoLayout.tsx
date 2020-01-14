import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { CareInstitutionTodoRoutes } from "../SidebarRoutes/CareInstitutionTodoRoutes";

class CareInstitutionTodoLayout extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: "1",
      error: false
    };
  }
  onToggle = (tab: any) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab.toString()
      });
    }
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
    return (
      <div className="common-sidnav">
        <Nav className="common-ul" tabs>
          {CareInstitutionTodoRoutes.map(route => {
            return route.path ? (
              <NavItem>
                <NavLink
                  className={pathname === route.path ? "active" : null}
                  onClick={() => this.props.history.push(route.path)}
                >
                  <span className="nav-text">{route.name}</span>
                </NavLink>
              </NavItem>
            ) : null;
          })}
        </Nav>
      </div>
    );
  }
}

export default CareInstitutionTodoLayout;
