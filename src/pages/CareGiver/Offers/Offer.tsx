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
import Select from "react-select";
const options = [
  { label: "one", value: 1 },
  { label: "two", value: 2 }
];
import { languageTranslation } from "../../../helpers/langauageTranslation";
class Offer extends Component {
  render() {
    return (
      <div className="offer-section">
        <h5 className="content-title">{languageTranslation("OFFERS")}</h5>
        <Row>
          <Col sm={4}>
            <Card>
              <div className="offer-wrap">
                <h5 className="heading toggle-filter  ">
                  {languageTranslation("OFFER_FOR")}{" "}
                  <span className="font-weight-bold">
                    ( {languageTranslation("POSITIVE")})
                  </span>
                </h5>
                <div className="offer-content-wrap">
                  <ul>
                    <li className="ative">Aaron, Hank </li>
                    <li className="pending">Abbey, Edward</li>
                    <li className="pending">Abel, Reuben</li>
                    <li className="ative"> Abelson, Hal</li>
                    <li className="dective">Abourezk, James </li>
                    <li className="active">Abrams, Creighton </li>
                    <li className="active">Adams, Abigail </li>
                    <li className="active">Beck, Glenn </li>
                    <li className="dective">Ben-Gurion, David </li>
                  </ul>
                </div>
              </div>

              <div className="custom-select-wrap">
                <select className="w-100">
                  <option>Bernhard, Sandra</option>
                  <option>Berlin, Irving</option>
                  <option>Berne, Eric</option>
                  <option>Berry, Halle</option>
                </select>
              </div>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <div className="offer-wrap">
                <h5 className="heading toggle-filter">
                  {languageTranslation("NO_OFFER_FOR")}{" "}
                  <span className="font-weight-bold">
                    ({languageTranslation("NEGATIVE")})
                  </span>
                </h5>
                <div className="offer-content-wrap">
                  <ul>
                    <li className="ative">Bergman, George E.</li>
                    <li className="pending">Bergman, Ingmar </li>
                    <li className="pending">Berio, Luciano</li>
                    <li className="ative">Bergerac, Cyrano de</li>
                    <li className="dective">Berle, Milton</li>
                  </ul>
                </div>
              </div>
              <div className="custom-select-wrap">
                <select className="w-100">
                  <option>Berlin, Irving</option>
                  <option>Berne, Eric</option>
                  <option>Bernhard, Sandra</option>
                  <option>Berry, Halle</option>
                </select>
              </div>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <div className="offer-wrap">
                <h5 className="heading toggle-filter">
                  {languageTranslation("WORKED_AT")}{" "}
                  <span className="font-weight-bold">
                    ({languageTranslation("POSITIVE")})
                  </span>
                </h5>
                <div className="offer-content-wrap">
                  <ul>
                    <li className="ative">Bibesco, Princess Elizabeth</li>
                    <li className="pending">Bierce, Ambrose</li>
                    <li className="pending">Biko, Steve</li>
                    <li className="ative">Biondo, Frank</li>
                    <li className="dective">Biondo, Frank</li>
                    <li className="active">Birrell, Augustine</li>
                    <li className="active">Black Elk</li>
                    <li className="active">Blair, Robert</li>
                    <li className="dective">Blalock, Jolene</li>
                  </ul>
                </div>
              </div>
              <div className="custom-select-wrap">
                <select className="w-100 ">
                  <option>Berry, Halle</option>
                  <option>Bernhard, Sandra</option>
                  <option>Berlin, Irving</option>
                  <option>Berne, Eric</option>
                </select>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Offer;
