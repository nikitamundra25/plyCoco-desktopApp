import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <h4 className={"text-center"}>Coming Soon</h4>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Dashboard;
