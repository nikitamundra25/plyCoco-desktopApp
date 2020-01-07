import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  Input,
  Col,
  Row,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  CustomInput,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import PersonalInformation from "./PersonalInformation";
import QualificationAttribute from "./QualificationAttribute";
import BillingSettings from "./BillingSettings";
import LeasingPersonalData from "./LeasingPersonalData";

class EditCareGiver extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: "1",
      error: false
    };
  }

  handleChange = (date: any) => {
    this.setState({
      startDate: date
    });
  };
  onFocus = () => {
    this.setState({
      error: true
    });
  };
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
    console.log("active tab in render is", activeTab);
    return (
      <>
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card className="full-height">
              <CardHeader className="detail-card">
                {/* <h4>
                  <i className="fa fa-users" />
                  <span className="ml-1">Add Care Giver</span>
                </h4> */}
                <Breadcrumb className="w-100">
                  <BreadcrumbItem>
                    <a href="#">Home</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#">Caregiver</a>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>Edit Caregiver</BreadcrumbItem>
                </Breadcrumb>
              </CardHeader>
              <CardBody>
                <div className="caregiver-form-section">
                  <Nav tabs className="custom-tabs">
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "1" }}
                        onClick={() => this.onToggle(1)}
                      >
                        <span className="icon">
                          <i className="fa fa-id-card"></i>
                        </span>
                        <span>Personal Information</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "2" }}
                        onClick={() => this.onToggle(2)}
                      >
                        <span className="icon">
                          <i className="fa fa-graduation-cap"></i>
                        </span>
                        <span>Qualification Attributes</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "3" }}
                        onClick={() => this.onToggle(3)}
                      >
                        <span className="icon">
                          <i className="fa fa-credit-card"></i>
                        </span>
                        <span>Billing Settings</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "4" }}
                        onClick={() => this.onToggle(4)}
                      >
                        <span className="icon">
                          <i className="fa fa-id-card"></i>
                        </span>
                        <span>Leasing Personal Data</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <div>
                        <PersonalInformation {...this.props} />
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div>
                        <QualificationAttribute />
                      </div>
                    </TabPane>
                    <TabPane tabId="3">
                      <div>
                        <BillingSettings />
                      </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <div>
                          <LeasingPersonalData />
                        </div>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default EditCareGiver;
