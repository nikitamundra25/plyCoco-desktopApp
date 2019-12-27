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
  TabContent
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import PersonalInformation from "./PersonalInformation"
import QualificationAttribute from "./QualificationAttribute"
import BillingSettings from "./BillingSettings"
class AddCareGiver extends Component<RouteComponentProps, any> {
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
    console.log("active tab in render is", activeTab);

    return (
      <>
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card>
              <CardHeader>
                <h4>
                  <i className="fa fa-users" />
                  <span className="ml-1">Add Care Giver</span>
                </h4>
              </CardHeader>
              <CardBody>
                <div className="caregiver-form-section">
                  <Nav tabs className="custom-tabs">
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "1" }}
                        onClick={() => this.onToggle(1)}
                      >
                        Personal Information
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "2" }}
                        onClick={() => this.onToggle(2)}
                      >
                        Qualification Attributes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "3" }}
                        onClick={() => this.onToggle(3)}
                      >
                        Billing Settings
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={{ active: activeTab === "4" }}
                        onClick={() => this.onToggle(4)}
                      >
                        Leasing Personal Data
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <div>

                          <PersonalInformation {...this.props}/>
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                     <div>
                         <QualificationAttribute/>
                     </div>
                    </TabPane>
                    <TabPane tabId="3">
                     <div>
                         <BillingSettings/>
                     </div>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Col sm="12">
                          <h4>Tab 4 Contents</h4>
                        </Col>
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
export default AddCareGiver;
