import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import { RouteComponentProps } from "react-router";

class CommisionAgreement extends Component<RouteComponentProps, any> {
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
        <Row>
          <Col xs={"12"} lg={"12"}>
            <Card>
              <CardBody>
                Commision Agreement
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    );
  }
}
export default CommisionAgreement;