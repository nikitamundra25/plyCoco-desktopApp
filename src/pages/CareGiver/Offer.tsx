import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Form,
  CustomInput,
  Card,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
class Offer extends Component {
  render() {
    return (
      <div className="offer-section">
        <h5 className="content-title">Offers</h5>
        <Row className="custom-col">
          <Col md={4}>
            <Card>
              <div className="offer-wrap">
                <h5 className="heading toggle-filter">
                  Offer for <span className="font-weight-bold">(Positive)</span>
                </h5>
                <div className="offer-content-wrap">
                  <ul>
                    <li className="ative">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="pending">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="pending">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="ative">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="dective">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="active">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="active">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="active">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="dective">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <div className="offer-wrap">
                <h5 className="heading toggle-filter">
                  No offer for{" "}
                  <span className="font-weight-bold">(Positive)</span>
                </h5>
                <div className="offer-content-wrap">
                  <ul>
                    <li className="ative">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="pending">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="pending">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="ative">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="dective">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <div className="offer-wrap">
                <h5 className="heading toggle-filter">
                  Worked at <span className="font-weight-bold">(Positive)</span>
                </h5>
                <div className="offer-content-wrap">
                  <ul>
                    <li className="ative">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="pending">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="pending">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="ative">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="dective">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="active">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="active">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="active">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                    <li className="dective">
                      Lorem Ipsum is simply dummy text of the printing{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Offer;
