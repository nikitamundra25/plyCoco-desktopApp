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
        <h4 className="content-title">Billing FAQ</h4>
        <div>
          {cards.map((item: any, index: any) => {
            return (
              <div className="faq-item " key={index}>
                <div
                  className={collapse === index ? "faq-header active" : ""}
                  onClick={this.toggle}
                  data-event={index}
                >
                  Why was my invoice not created automatically?
                  <span className="faq-icon ">
                    <i className="fa fa-chevron-down"></i>
                  </span>
                </div>
                <Collapse isOpen={collapse === index}>
                  <div className="faq-body">
                    An invoice correction is still pending. You entered
                    incorrect working hours or the invoice had to be canceled
                    for other reasons. Before you have not corrected the times
                    and created the invoice again using the link in the email,
                    the invoice creation is suspended. Otherwise, an incorrect
                    invoice would be created again.
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default BillingFaq;
