import React, { Component } from "react";
import {
  Col,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { AppRoutes } from "../../config";
class ViewCareGiver extends Component<any, any> {
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
    const { activeTab } = this.state;
    return (
      <div className="caregiver-sidnav">
        <h4 className="sidenav-title">John Doe</h4>
        <Nav vertical className="caregiver-ul">
          <NavItem>
            <NavLink
              className={{ active: activeTab === "1" }}
              onClick={() =>
                this.props.history.push(AppRoutes.PERSONAL_INFORMATION)
              }
            >
              <span className="nav-icon">
                <i className="fa fa-id-card"></i>
              </span>
              <span className="nav-text">Personal Information</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "2" }}
              onClick={() =>
                this.props.history.push(AppRoutes.QUALIFICATION_ATTRIBUTE)
              }
            >
              <span className="nav-icon">
                <i className="fa fa-graduation-cap"></i>
              </span>
              <span className="nav-text">Qualification Attributes</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "3" }}
              onClick={() => this.props.history.push(AppRoutes.BILLING)}
            >
              <span className="nav-icon">
                {" "}
                <i className="fa fa-credit-card"></i>
              </span>
              <span className="nav-text">Billing Settings</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "4" }}
              onClick={() =>
                this.props.history.push(AppRoutes.LEASING_PERSONALDATA)
              }
            >
              <span className="nav-icon">
                <i className="fa fa-id-card"></i>
              </span>
              <span className="nav-text">Leasing Personal Information</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "5" }}
              onClick={() => this.props.history.push(AppRoutes.SIGNATURE)}
            >
              <span className="nav-icon">
                {" "}
                <i className="fa fa-id-card"></i>
              </span>
              <span className="nav-text">Signature</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "6" }}
              onClick={() =>
                this.props.history.push(AppRoutes.DOCUMENTS_UPLOAD)
              }
            >
              <span className="nav-icon">
                {" "}
                <i className="fa fa-upload"></i>
              </span>
              <span className="nav-text">Documents Uploads</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "7" }}
              onClick={() => this.props.history.push(AppRoutes.CHANGE_PASSWORD)}
            >
              <span className="nav-icon">
                {" "}
                <i className="fa fa-lock"></i>
              </span>
              <span className="nav-text">Password</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "8" }}
              onClick={() => this.props.history.push(AppRoutes.EMAIL)}
            >
              <span className="nav-icon">
                {" "}
                <i className="fa fa-envelope"></i>
              </span>
              <span className="nav-text">Emails</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "9" }}
              onClick={() => this.props.history.push(AppRoutes.EVENT)}
            >
              <span className="nav-icon">
                {" "}
                <i className="fa fa-calendar"></i>
              </span>
              <span className="nav-text">Events</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "10" }}
              onClick={() => this.onToggle(10)}
            >
              <span className="nav-icon">
                {" "}
                <i className="fa fa-gift"></i>
              </span>
              <span className="nav-text">Offers</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "11" }}
              onClick={() => this.onToggle(11)}
            >
              <span className="nav-icon">
                {" "}
                <i className="fa fa-file-text-o"></i>
              </span>
              <span className="nav-text">Invoices</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === "12" }}
              onClick={() => this.onToggle(12)}
            >
              <span className="nav-icon">
                <i className="fa fa-list-alt"></i>
              </span>
              <span className="nav-text">To Do</span>
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default ViewCareGiver;
