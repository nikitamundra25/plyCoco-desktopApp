import React, { Component } from "react";
import {
    Card,
    CardHeader,
    Label,
    CardBody,
    Col,
    Row,
    Button,
    CustomInput,
    BreadcrumbItem,
    Breadcrumb,
    InputGroup,
    InputGroupAddon,
    FormGroup
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { State, Region, Salutation, LegalForm, Country } from "../../../config";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
    FormikValues
} from "formik";
import { CareGiverValues } from "../../../interfaces";
import { FormikSelectField, FormikTextField } from "../../../common/forms/FormikFields";
import { languageTranslation } from "../../../helpers";
import FormikCheckbox from "../../../common/forms/FormikFields/FormikCheckbox";


const PersonalInfoFormComponent: any = (
    props: FormikProps<CareGiverValues>
) => {
    const { values } = props;
    console.log("errorrrrrssssssssss==========>", props.errors)
    return (
        <div className="form-card">
            <Row>
                <Col lg={"12"}>
                    <FormGroup>
                        <Row>
                            <Col sm="4">
                                <Label className="form-label col-form-label">
                                    {languageTranslation("USER_ID")}
                                    <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <Row className="custom-col inner-no-padding-col">
                                    <Col sm="4">
                                        <div>
                                            <Field
                                                component={FormikTextField}
                                                name={"personalInformation.lastName"}
                                                placeholder={languageTranslation("USER_ID")}
                                                className="width-common"
                                            />
                                        </div>
                                    </Col>
                                    <Col sm="8">
                                        <FormGroup>
                                            <Row className="custom-col inner-no-padding-col">
                                                <Col sm="6">
                                                    <Label className="form-label col-form-label inner-label">
                                                        {languageTranslation("REG_SINCE")}
                                                        <span className="required">*</span>
                                                    </Label>
                                                </Col>
                                                <Col sm="6">
                                                    <div>
                                                        <Field
                                                            component={FormikTextField}
                                                            name={"personalInformation.registartionSince"}
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
                                    {languageTranslation("CAREGIVER_STATE_LABEL")}
                                    <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                        name={"personalInformation.state"}
                                        component={FormikSelectField}
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
                                    {languageTranslation("GENDER")}
                                    <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <Row className="custom-col inner-no-padding-col">
                                    <Col sm="5">
                                        <div>
                                            <Field
                                                name={"personalInformation.gender"}
                                                placeholder={languageTranslation("GENDER")}
                                                options={State}
                                            />
                                        </div>
                                    </Col>
                                    <Col sm="7">
                                        <FormGroup>
                                            <Row className="custom-col inner-no-padding-col d-flex align-items-center">
                                                <Col sm="6">
                                                    <Label className="form-label col-form-label inner-label">
                                                        {languageTranslation("TITLE")}
                                                        <span className="required">*</span>
                                                    </Label>
                                                </Col>
                                                <Col sm="6">
                                                    <div>
                                                        <Field
                                                            component={FormikTextField}
                                                            name={"personalInformation.title"}
                                                            placeholder={languageTranslation(
                                                                "TITLE"
                                                            )}
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
                                    {languageTranslation("SALUTATION")}
                                    <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                        name={"personalInformation.salutation"}
                                        component={FormikSelectField}
                                        placeholder={languageTranslation("SALUTATION")}
                                        options={Salutation}
                                    />
                                </div>
                                {/* <Button  className="alfabate-btn btn">S</Button> */}
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
                <Col lg={"12"}>
                    <FormGroup>
                        <Row>
                            <Col sm="4">
                                <Label className="form-label col-form-label">
                                    {languageTranslation("FIRST_NAME")}
                                    <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.firstName"}
                                        placeholder={languageTranslation("FIRST_NAME")}
                                        className="width-common"
                                    />
                                </div>
                                {/* <Button  className="alfabate-btn btn">N</Button> */}
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
                <Col lg={"12"}>
                    <FormGroup>
                        <Row>
                            <Col sm="4">
                                <Label className="form-label col-form-label">
                                    {languageTranslation("SURNAME")}
                                    <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.lastName"}
                                        placeholder={languageTranslation("SURNAME")}
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
                                    Birthday Date
                <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <Row className="custom-col inner-no-padding-col">
                                    <Col sm="7">
                                        <div>
                                            <Field
                                                name={"personalInformation.dateOfBirth"}
                                                component={FormikTextField}
                                                type="date"
                                                placeholder="06/09/2020"
                                            />
                                        </div>
                                    </Col>
                                    <Col sm="5">
                                        <FormGroup>
                                            <Row className="custom-col inner-no-padding-col d-flex align-items-center">
                                                <Col sm="6">
                                                    <Label className="form-label col-form-label inner-label">
                                                        Age
                          <span className="required">*</span>
                                                    </Label>
                                                </Col>
                                                <Col sm="6">
                                                    <div>
                                                        <Field
                                                            component={FormikTextField}
                                                            name={"personalInformation.age"}
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.street"}
                                        placeholder="Street"
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.city"}
                                        placeholder="City"
                                        className=" width-common"
                                    />
                                </div>
                                {/* <Button  className="alfabate-btn btn">N</Button> */}
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.postCode"}
                                        placeholder="Post Code"
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
                                    Country
                <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                        component={FormikSelectField}
                                        name={"personalInformation.country"}
                                        placeholder="Germany"
                                        options={Country} />
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
                                    <Field
                                        component={FormikSelectField}
                                        name="personalInformation.stateId"
                                        placeholder="Bavaria"
                                        options={State} />
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.phone"}
                                        placeholder=" Phone Number"
                                        className="width-common"
                                    />
                                </div>
                                {/* <Button  className="alfabate-btn btn">M</Button> */}
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.fax"}
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.mobilePhone"}
                                        placeholder="Mobile Phone"
                                        className="width-common"
                                    />
                                </div>
                                {/* <Button  className="alfabate-btn btn">T</Button> */}
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.email"}
                                        placeholder=" Email"
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
                                    Tax Number
                <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                        component="text"
                                        name={"personalInformation.taxNumber"}
                                        placeholder="Tax Number"
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.bankName"}
                                        placeholder="Bank"
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.iban"}
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.username"}
                                        placeholder="Username"
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
                                    <Field
                                        component={FormikSelectField}
                                        name={"personalInformation.belongsTo"}
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
                                    Legal Form
                <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                    name="personalInformation.legalForm"
                                    component={FormikSelectField}
                                    placeholder="Legal Form" options={State} />
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.companyName"}
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
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.registerCourt"}
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
                                    Registeration Number
                <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                        type={FormikTextField}
                                        name={"personalInformation.registrationNumber"}
                                        placeholder="Registeration Number"
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
                                Executive Director
                <span className="required">*</span>
                                </Label>
                            </Col>
                            <Col sm="8">
                                <div>
                                    <Field
                                        component={FormikTextField}
                                        name={"personalInformation.executiveDirector"}
                                        placeholder="Executive Director"
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
                                       <Field 
                                         component={FormikCheckbox}
                                         name={"personalInformation.employed"}
                                       />
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
                                    <Field
                                        component={FormikTextField}
                                        type="textarea"
                                        name={"personalInformation.additionalText"}
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
    );
}

export default PersonalInfoFormComponent;
