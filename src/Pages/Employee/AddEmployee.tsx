import React, { Component } from "react";
import { Button, FormGroup, Label, Input, Col, Row } from "reactstrap";

class AddEmployee extends Component {
  render() {
    return (
      <>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Employee First Name<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"firstName"}
                placeholder="Please Enter First Name"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Employee Surname<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"lastName"}
                placeholder="Please Enter Last Name"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Email Address<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"email"}
                placeholder="Please Enter Email"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Employee Telephone number<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"telephoneNumber"}
                placeholder="Please Enter Telephone number"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                User Name<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"userName"}
                placeholder="Please Enter User Name"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Password<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"password"}
                placeholder="Please Enter Password"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Confirm Password<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"password"}
                placeholder="Please Confirm Password"
              />
            </Col>
          </Row>
        </FormGroup>
        <h5> Employee Bank account information</h5>
        <FormGroup>
          <Row>
            {" "}
            <Col sm="3">
              <Label>Bank Name</Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"bankName"}
                placeholder="Please Enter Bank Name"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>Bank Address</Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"bankAddress"}
                placeholder="Please Enter Bank Address"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            {" "}
            <Col sm="3">
              <Label>Bank account number</Label>
            </Col>{" "}
            <Col sm="9">
              <Input
                type="text"
                name={"accountNumber"}
                placeholder="Please Enter Bank account number"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>IFSC</Label>
            </Col>{" "}
            <Col sm="9">
              <Input
                type="text"
                name={"IFSC"}
                placeholder="Please Enter IFSC"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>Swift code</Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"swiftCode"}
                placeholder="Please Enter Swift code"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>Status</Label>
            </Col>
            <Col sm="9">
              <Input
                type="select"
                name="Status"
                placeholder="Please Select Status"
              >
                <option value={"true"}> Active</option>
                <option value={"false"}> Disable</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Department<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input type="select" name="department" id="department" multiple>
                <option>Sales</option>
                <option>Marketing</option>
                <option>HR</option>
                <option>Development</option>
                <option>Designing</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Region<span className="required">*</span>
              </Label>
            </Col>
            <Col sm="9">
              <Input type="select" name="region" id="region" multiple>
                <option>Western India</option>
                <option>East India</option>
                <option>South India</option>
                <option>Northeast India</option>
                <option>Central India</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Address 1
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"address1"}
                placeholder="Please Enter Address"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Address 2
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"address2"}
                placeholder="Please Enter Address"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                City
              </Label>
            </Col>
            <Col sm="9">
            <Input type="select" name="city" id="region" >
              <option>---Select City---</option>
                <option>Indore</option>
                <option>Bhopal</option>
                <option>Mumbai</option>
                <option>Pune</option>
                <option>Bangalore</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                State
              </Label>
            </Col>
            <Col sm="9">
            <Input type="select" name="state" id="region">
              <option>---Select State---</option>
                <option>Madhya Pradesh</option>
                <option>Uttar Pradesh</option>
                <option>Bihar</option>
                <option>Punjab</option>
                <option>Gujrat</option>
              </Input>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Zip
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"zip"}
                placeholder="Please Enter Zip Code"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
                Country
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="text"
                name={"country"}
                placeholder="Please Enter Country"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
            <Label>Employee rights</Label>
            </Col>
            <Col sm="9">
            <Col sm="3">
              <Label check>
                <Input type="checkbox" id="checkbox2" /> Check 1
              </Label>
            </Col>
            <Col sm="3">
              <Label check>
                <Input type="checkbox" id="checkbox2" /> Check 2
              </Label>
            </Col>
            <Col sm="3">
              <Label check>
                <Input type="checkbox" id="checkbox2" /> Check 3
              </Label>
            </Col>
            <Col sm="3">
              <Label check>
                <Input type="checkbox" id="checkbox2" /> Check 4
              </Label>
            </Col>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
              Joining Date
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="date"
                name={"joiningDate"}
                placeholder="Please Enter Joining Date"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
              Add Profile image
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="file"
                name={"image"}
                // placeholder="Please Enter Add Profile Image"
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm="3">
              <Label>
              Any other information
              </Label>
            </Col>
            <Col sm="9">
              <Input
                type="textarea"
                name={"country"}
                placeholder="Please Enter Any other information"
              />
            </Col>
          </Row>
        </FormGroup>
        <div className={"text-right"}>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </div>
      </>
    );
  }
}
export default AddEmployee;
