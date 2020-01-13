import React, { Component } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { careGiverRoutes } from "../SidebarRoutes/ConstitutionRoutes";
import { languageTranslation } from "../../../../helpers";
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
                  <span className="nav-text">{route.name}</span>
                </NavLink>
              </NavItem>
            ) : null;
          })}
        </Nav>
        <Button color={"primary"} className={"btn-add"}>
          {languageTranslation("SAVE_BUTTON")}
        </Button>
      </div>
    );
  }
}

export default CareGiverSidebar;
