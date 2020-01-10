import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import BillingMothlyOverview from "./BillingMothlyOverview";
import BillingYearlySummary from "./BillingYearlySummary";
import BillingInfo from "./BillingInfo";
import BillingFaq from "./BillingFaq";
import BillingSettings from "./BillingSettings";

class Billing extends Component<RouteComponentProps, any> {
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
      <div>
        <div className="caregiver-form-section">
          <Nav tabs className="custom-tabs">
            <NavItem>
              <NavLink
                className={{ active: activeTab === "1" }}
                onClick={() => this.onToggle(1)}
              >
                <span className="icon">
                  <i className="fa fa-calendar"></i>
                </span>
                <span>Monthly Overview</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={{ active: activeTab === "2" }}
                onClick={() => this.onToggle(2)}
              >
                <span className="icon">
                  <i className="fa fa-calendar-o"></i>
                </span>
                <span>Yearly Summary</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={{ active: activeTab === "3" }}
                onClick={() => this.onToggle(3)}
              >
                <span className="icon">
                  <i className="fa fa-info-circle"></i>
                </span>
                <span>Info</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={{ active: activeTab === "4" }}
                onClick={() => this.onToggle(4)}
              >
                <span className="icon">
                  <i className="fa fa-question-circle"></i>
                </span>
                <span>FAQ</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={{ active: activeTab === "5" }}
                onClick={() => this.onToggle(5)}
              >
                <span className="icon">
                  <i className="fa fa-cogs"></i>
                </span>
                <span>Billing Settings</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div>
                <BillingMothlyOverview />
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div>
                <BillingYearlySummary />
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div>
                <BillingInfo />
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div>
                <BillingFaq />
              </div>
            </TabPane>
            <TabPane tabId="5">
              <div>
                <BillingSettings />
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}
export default Billing;
