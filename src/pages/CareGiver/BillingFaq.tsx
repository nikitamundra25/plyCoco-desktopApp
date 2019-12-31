import React, { Component } from "react";
import {
  UncontrolledCollapse,
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse
} from "reactstrap";

class BillingFaq extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { collapse: 0, cards: [1, 2, 3] };
  }
  toggle = (e: any) => {
    const { collapse } = this.state;
    let event = e.target.dataset.event;
    this.setState({
      collapse: collapse === Number(event) ? 0 : Number(event)
    });
  };
  render() {
    const { cards, collapse } = this.state;
    return (
      <div className="faq-section">
        <h4 className="faq-title">Billing FAQ</h4>
        <div className="container">
          {cards.map((index: any) => {
            return (
              <Card style={{ marginBottom: "1rem" }} key={index}>
                <CardHeader onClick={this.toggle} data-event={index}>
                  Why was my invoice not created automatically?
                </CardHeader>
                <Collapse isOpen={collapse === index}>
                  <CardBody>
                    An invoice correction is still pending. You entered
                    incorrect working hours or the invoice had to be canceled
                    for other reasons. Before you have not corrected the times
                    and created the invoice again using the link in the email,
                    the invoice creation is suspended. Otherwise, an incorrect
                    invoice would be created again.
                  </CardBody>
                </Collapse>
              </Card>
            );
          })}
        </div>
        {/* <div className="faq-item">
          <Button color="link" id="toggler1" className="faq-header active">
            Why was my invoice not created automatically?
            <span className="faq-icon ">
              <i className="fa fa-chevron-down"></i>
            </span>
          </Button>
          <UncontrolledCollapse toggler="#toggler1">
            <div className="faq-body">
              An invoice correction is still pending. You entered incorrect
              working hours or the invoice had to be canceled for other reasons.
              Before you have not corrected the times and created the invoice
              again using the link in the email, the invoice creation is
              suspended. Otherwise, an incorrect invoice would be created again.
            </div>
          </UncontrolledCollapse>
        </div>
        <div className="faq-item ">
          <Button color="link" id="toggler2" className="faq-header active">
            I would like to have my own invoice number
            <span className="faq-icon ">
              <i className="fa fa-chevron-down"></i>
            </span>
          </Button>
          <UncontrolledCollapse toggler="#toggler2">
            <div className="faq-body">
              Simply enter them appropriately in the settings . Only numbers are
              possible, no letters and special characters. The number is
              automatically increased by 1 after each invoice. Existing invoice
              numbers are skipped.
            </div>
          </UncontrolledCollapse>
        </div>
      */}
      </div>
    );
  }
}
export default BillingFaq;
