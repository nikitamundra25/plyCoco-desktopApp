import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { careGiverRoutes } from "../SidebarRoutes/ConstitutionRoutes";
class CareGiverSidebar extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: "1",
      error: false
    };
  }
  onToggle = (tab: any) => {
    const { activeTab } = this.state;
    console.log("activeTab value", activeTab);
    console.log("tab value is", tab);
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
    console.log("path", this.props.location.pathname);
    // const path = pathname
    console.log("proppppss", this.props);

    return (
      <div className="common-sidnav">
        <Nav className="common-ul" tabs>
          {careGiverRoutes.map(route => {
            return route.path ? (
              <NavItem>
                <NavLink
                  className={pathname === route.path ? "active" : null}
                  onClick={() => this.props.history.push(route.path)}
                >
                  {/* <span className="nav-icon">
                    <i className={route.icon}></i>
                  </span> */}
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

export default CareGiverSidebar;
