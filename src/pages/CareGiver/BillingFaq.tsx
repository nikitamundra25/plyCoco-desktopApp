import React, { Component } from "react";
import { UncontrolledCollapse, Button, Card, CardBody } from "reactstrap";

class BillingFaq extends Component {
  render() {
    return (
      <div className="faq-section">
        <h4>Billing FAQ</h4>
        <div className="faq-item">
          <Button color="link" id="toggler" className="faq-header active">
            Why was my invoice not created automatically?
            <span className="faq-icon ">
              <i className="fa fa-chevron-down"></i>
            </span>
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            <div className="faq-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              magni, voluptas debitis similique porro a molestias consequuntur
              earum odio officiis natus, amet hic, iste sed dignissimos esse
              fuga! Minus, alias.
            </div>
          </UncontrolledCollapse>
        </div>
        <div className="faq-item ">
          <Button color="link" id="toggler" className="faq-header">
            Why was my invoice not created automatically?
            <span className="faq-icon ">
              <i className="fa fa-chevron-down"></i>
            </span>
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            <div className="faq-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              magni, voluptas debitis similique porro a molestias consequuntur
              earum odio officiis natus, amet hic, iste sed dignissimos esse
              fuga! Minus, alias.
            </div>
          </UncontrolledCollapse>
        </div>
      </div>
    );
  }
}
export default BillingFaq;
