import React, { Component } from "react";
import {Card, CardBody } from "reactstrap";
import { RouteComponentProps } from "react-router";

class Reminders extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: ""
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
  render() {
    return (
      <div>
        <Card>
          <CardBody>Reminders</CardBody>
        </Card>
      </div>
    );
  }
}
export default Reminders;
