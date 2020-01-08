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
  InputGroup,
  InputGroupAddon,Card
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import InputMask from "react-input-mask";

import { State, Region, Salutation, LegalForm, Country } from "../../../config";

class PersonalInformation extends Component<RouteComponentProps, any> {
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
  render() {
    return (
      <div>
        <Form className="form-section forms-main-section">
        <h5 className="main-title ">Personal Data</h5>
          <Row className="custom-col">
            <Col lg={"4"}>
           
              <div className="form-card">
                <Row className="w-100">
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            User id
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="4">
                              <div>
                                <Input
                                  type="text"
                                  name={"lastName"}
                                  placeholder="User id"
                                  className="width-common"
                                />
                              </div>
                            </Col>
                            <Col sm="8">
                              <FormGroup>
                                <Row className="custom-col inner-no-padding-col">
                                  <Col sm="6">
                                    <Label className="form-label col-form-label inner-label">
                                      Reg Since
                            <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="6">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder="Reg Since"
                                        className="width-common"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Region/State
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
                              placeholder="Region/State"
                              options={State}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row className="">
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            gender
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="5">
                              <div>
                                <Select
                                  placeholder="Gender"
                                  options={State}
                                />
                              </div>
                            </Col>
                            <Col sm="7">
                              <FormGroup>
                                <Row className="custom-col inner-no-padding-col d-flex align-items-center">
                                  <Col sm="6">
                                    <Label className="form-label col-form-label inner-label">
                                      titel
                            <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="6">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder="titel"
                                        className="width-common"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            salutation
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                          <Select
                                  placeholder="Germany"
                                  options={State}
                                />
                          </div> 
                          <Button  className="alfabate-btn btn">S</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            First Name
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"firstName"}
                              placeholder="First Name"
                              className="width-common"
                            />
                          </div>
                          <Button  className="alfabate-btn btn">N</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Surname
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"lastName"}
                              placeholder="Surname"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row className="">
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                           Birthday date
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="7">
                              <div>
                                <Select
                                  placeholder="06/09/2020"
                                  options={State}
                                />
                              </div>
                            </Col>
                            <Col sm="5">
                              <FormGroup>
                                <Row className="custom-col inner-no-padding-col d-flex align-items-center">
                                  <Col sm="6">
                                    <Label className="form-label col-form-label inner-label">
                                     Alter
                            <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="6">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder="123"
                                        className="width-common"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                 
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                          Street<span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"address"}
                              placeholder="Address Line 1"
                              className=" width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                           City
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"address"}
                              placeholder="Address Line 2"
                              className=" width-common"
                            />
                          </div>
                          <Button  className="alfabate-btn btn">N</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                         ZIP
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"street"}
                              placeholder=" Street"
                              className=" width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                         Contry
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                          <Select
                                  placeholder="Germany"
                                  options={State}
                                />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label ">
                           State
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                          <Select
                                  placeholder="Bavaria"
                                  options={State}
                                />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>

                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Phone
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"phone"}
                              placeholder=" Phone Number"
                              className="width-common"
                            />
                          </div>
                          <Button  className="alfabate-btn btn">M</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Fax
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"fax"}
                              placeholder=" Fax"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Mobile
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"mobilePhone"}
                              placeholder="Mobile Phone"
                              className="width-common"
                            />
                          </div>
                          <Button  className="alfabate-btn btn">T</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Email
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder=" Email address"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Tax number
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Tax number"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Bank
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="  Bank"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                           IBAN
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="IBAN"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                            Username
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="  Username"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                           Belongs to
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                          <Select
                              placeholder="Belongs to"
                              options={State}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                           legal form
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                          <Select
                              placeholder="legal form"
                              options={State}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                         Company Name
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Company Name"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                           Register Court
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Register Court"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                        Register Name
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Register Name"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                        Manag Director
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Input
                              type="text"
                              name={"email"}
                              placeholder="Manag Director"
                              className="width-common"
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                 <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                       Employed
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                          <div className=" checkbox-custom mb-0">
                          <input type="checkbox" id="check" className="" />
                          <Label for="check"></Label>
                        </div>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                          Comments (Internally)
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                          <Input
                            type="textarea"
                            name={"additionalText "}
                            placeholder="Comments (Internally)"
                            className="textarea-custom"
                            rows="4"
                          />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
               </Row>
              </div>
            </Col>

            <Col lg={"4"}>
             
              <div className="form-card minheight-auto">
                <Row className="w-100">
                <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                         Fee
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="4">
                              <div>
                                <Input
                                  type="text"
                                  name={"lastName"}
                                  placeholder="Fee"
                                  className="width-common"
                                />
                              </div>
                            </Col>
                            <Col sm="8">
                              <FormGroup>
                                <Row className="custom-col inner-no-padding-col">
                                  <Col sm="6">
                                    <Label className="form-label col-form-label inner-label">
                                    Night
                            <span className="required">*</span>
                                    </Label>
                                  </Col>
                                  <Col sm="6">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder="Night"
                                        className="width-common"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                          Weekend allowance
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="4">
                              <div>
                                <Input
                                  type="text"
                                  name={"lastName"}
                                  placeholder="Weekend allawance"
                                  className="width-common"
                                />
                              </div>
                            </Col>
                            <Col sm="8">
                              <FormGroup>
                                <Row className="custom-col inner-no-padding-col">
                                  <Col sm="6">
                                    <Label className="form-label col-form-label inner-label">
                                     Holiday
                            {/* <span className="required">*</span> */}
                                    </Label>
                                  </Col>
                                  <Col sm="6">
                                    <div>
                                      <Input
                                        type="text"
                                        name={"lastName"}
                                        placeholder="Hollyday"
                                        className="width-common"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                         Night allowance 
                            <span className="required">*</span>
                          </Label>
                        </Col>
                        <Col sm="8">
                          <Row className="custom-col inner-no-padding-col">
                            <Col sm="8">
                              <div>
                                <Input
                                  type="text"
                                  name={"lastName"}
                                  placeholder="Night allawance"
                                  className="width-common"
                                />
                              </div>
                            </Col>
                            </Row>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                           Invoice interval
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
                              placeholder="Invoice interval"
                              isMulti
                              options={Region}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col lg={"12"}>
                    <FormGroup>
                      <Row>
                        <Col sm="4">
                          <Label className="form-label col-form-label">
                         Lessing Price List
                          </Label>
                        </Col>
                        <Col sm="8">
                          <div>
                            <Select
                              placeholder="Lessing Price List"
                              isMulti
                              options={Region}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
               </Row>
              </div>
              <div className="offer-section fix-height-section">
        <h5 className="content-title">Qualifications</h5>
        <Row className="custom-col">
          <Col sm={12}>
            <Card>
              <div className="offer-wrap">
                <h5 className="heading toggle-filter  ">
                Qualification
                
                </h5>
                <div className="offer-content-wrap">
                  <ul>
                    <li className="ative">Aaron, Hank </li>
                    <li >Abbey, Edward</li>
                    <li>Abel, Reuben</li>
                    <li > Abelson, Hal</li>
                    <li >Abourezk, James </li>
               

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
          </Row>
          </div>
              
              <div className="offer-section fix-height-section">
        <h5 className="content-title">Attributes</h5>
        <Row className="custom-col">
          <Col sm={12}>
            <Card>
              <div className="offer-wrap">
                <h5 className="heading toggle-filter  ">
                Attribut
                
                </h5>
                <div className="offer-content-wrap">
                  <ul>
                    <li className="ative">Aaron, Hank </li>
                    <li >Abbey, Edward</li>
                    <li>Abel, Reuben</li>
                    <li> Abelson, Hal</li>
                    <li>Abourezk, James </li>
                    <li>Abrams, Creighton </li>
                 
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
          </Row>
          </div>
              
            </Col>
<Col lg={4}>
<div className="mail-details">
               
               <div className="mail-body">
              

                 <p>
                 <p className="mb-0">15.09.2017</p>
                 <p>rief schon einige Tage vor der Registrierung an (haben sie wiederholt darum gebeten, sich zu registrieren), ist KS und möchte nebenbei etwas dazuverdienen, am beste in Kliniken, hat 2 Kinder und zur Zeit kein PC da die Kinder den kaputt gemacht haben, kommt am 18.09. um 11 uhr zum Infogespräch, Mail Büroanschrift +Stegemann geschickt, Jenny</p>
                 <p className="mb-0">18.09.2017</p>
                 <p>Sie kam zum Infogespräch mit ihrem kleinen Sohn (ca 3 Jahre). Lief aber alle ruhig ab. Sie hatte sehr viele Fragen, generell Freiberuflichkeit. Sie ist exam. AP. Der kleine bekommt erst im Oktober seinen Kita Platz ud somit will sie gern ab November bei uns loslegen. Im Januar will sie gucken, ob sie sich bei einem KH teilzeit anstellen lassen möchte.
Sie ist sehr freundlich und aufgeweckt, neues Passwort geschickt.
WV Doks, auf Oktober gesetzt, weil sie ja erst im Novemner starten will. Norma</p>
                 <p className="mb-0">21.09.2017</p>
                 <p>sie rief an (gestern bereits nochmal mit Norma telefoniertund wieder alles gefragt, hatte beim Gespräch anscheind nicht zugehört), nun stellte sie wieder Fragen und erklärte mir sie könne sich ja nicht alles merken, daher scrheibt sie jetzt mit,
dann wollte sie nochmal einen Termin nur um über die NV zu sprechen, habe ihr angeboten mi rihre Fragen zu stellen oder die per mAil zus enden, daraufhin war sie der Ansicht ich klänge genervt und sie möchte nur noch mit Norma sprechen, habe ihr gesgat, dass sie ihre Fragen gern ja stellen kann aber dazu war sie dann nicht mehr bereit, Jenny</p>
                 <p className="mb-0">09.10.2017</p>
                 <p>Sie will zwar noch Freiberuflich werden aber ihr Kind muss sich jetzt erstmal im Kindergarten eingewöhnen und dies dauert 1 bis 2 Monate. Sie weiss welche Doks wir benötigen und wird sie und dann schicken, aber erst sobald sich ihr kleiner eingewöhnt hat und sie ein bisschen zur Ruhe gekommen ist., Carolin</p>
                 </p>
               
               </div>
             </div>
          
</Col>
           </Row>

          {/* <Row>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      First Name
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Select
                            placeholder="Salutation"
                            options={Salutation}
                            className="custom-select-width"
                          />
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name={"firstGivenName"}
                          placeholder="First Given Name"
                          className="width-common"
                        />
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Surname
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"lastName"}
                        placeholder="Surname"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Street
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"street"}
                        placeholder=" Street"
                        className=" width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      City
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"city"}
                        placeholder=" City"
                        className=" width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label ">
                      Post code
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"postCode"}
                        placeholder="Post Code"
                        className=" width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Region/State
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select placeholder="Region/State" options={State} />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Country
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select
                        // value={this.state.selectedOption}
                        placeholder="Select Country"
                        options={Country}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Date of Birth
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <DatePicker
                        placeholderText="Select Date"
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Phone
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"phone"}
                        placeholder=" Phone Number"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Fax
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"fax"}
                        placeholder=" Fax"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Mobile Phone
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"mobilePhone"}
                        placeholder="Mobile Phone"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Email address
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name={"email"}
                        placeholder=" Email address"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Driver's license
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes"
                            name="driversLicense"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no"
                            name="driversLicense"
                            label="No"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Own vehicle available
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes_v"
                            name="vehicleavailable"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no_v"
                            name="vehicleavailable"
                            label="No"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Driver's License Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="driverLicenseNumber"
                        placeholder="Driver's License Number"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}></Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Legal Form
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select placeholder="Legal Form" options={LegalForm} />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}></Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Company Name <small>(Including GMBH, UG)</small>
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Registration Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="registrationNumber"
                        placeholder="Registration number"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Register Court
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="registerCourt"
                        placeholder="Register Court"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Executive Director
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="executiveDirector"
                        placeholder="Executive Director"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="7">
                    <Label className="form-label col-form-label">
                      Employee subject to social security contribution
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="5">
                    <div className="custom-radio-block">
                      <Row>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="yes_s"
                            name="socialSecurityContribution"
                            label="Yes"
                          />
                        </Col>
                        <Col>
                          <CustomInput
                            type="radio"
                            id="no_s"
                            name="socialSecurityContribution"
                            label="No"
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Tax Number
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="text"
                        name="taxNumber"
                        placeholder="Tax Number"
                        className="width-common"
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Working zones
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Select
                        placeholder=" Working zones"
                        isMulti
                        options={Region}
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>

            <Col lg={"6"}>
              <FormGroup>
                <Row>
                  <Col sm="3">
                    <Label className="form-label col-form-label">
                      Remarks
                      <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col sm="9">
                    <div>
                      <Input
                        type="textarea"
                        name={"Remarks"}
                        placeholder="Remarks"
                        className="height-auto "
                      />
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col lg={"12"}>
              <div className={"text-right"}>
                <Button color="primary" type="submit" className="btn-sumbit">
                  Next Step
                </Button>
              </div>
            </Col>
          </Row> */}
        </Form>
      </div>
    );
  }
}
export default PersonalInformation;
