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
import { RouteComponentProps } from "react-router";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";

class ViewEmployee extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: "1",
      error: false
    };
  }

  render() {
    return (
      <Row>
        <Col lg={"12"}>
          <div className="care-detail-page">
            <Breadcrumb className="w-100">
              <BreadcrumbItem>
                <a href="#">Home</a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="#">Caregiver</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Caregiver Details</BreadcrumbItem>
            </Breadcrumb>

            <div className="caregiver-detail-section">
              <div className="caregiver-sidnav">
                <h4 className="sidenav-title">John Doe</h4>
                <Nav vertical className="caregiver-ul">
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        <i className="fa fa-id-card"></i>
                      </span>
                      <span className="nav-text">Personal Information</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        <i className="fa fa-graduation-cap"></i>
                      </span>
                      <span className="nav-text">Qualification Attributes</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-credit-card"></i>
                      </span>
                      <span className="nav-text">Billing Settings</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-id-card"></i>
                      </span>
                      <span className="nav-text">
                        Leasing Personal Information
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-id-card"></i>
                      </span>
                      <span className="nav-text">Signature</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-upload"></i>
                      </span>
                      <span className="nav-text">Documents Uploads</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-lock"></i>
                      </span>
                      <span className="nav-text">Password</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-envelope"></i>
                      </span>
                      <span className="nav-text">Emails</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-calendar"></i>
                      </span>
                      <span className="nav-text">Events</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-gift"></i>
                      </span>
                      <span className="nav-text">Offers</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        {" "}
                        <i className="fa fa-file-text-o"></i>
                      </span>
                      <span className="nav-text">Invoices</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <span className="nav-icon">
                        <i className="fa fa-list-alt"></i>
                      </span>
                      <span className="nav-text">To Do</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <div className="caregiver-content flex-grow-1">
                {/* <PersonalInformation {...this.props} /> */}
                <ChangePassword {...this.props} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ViewEmployee;
