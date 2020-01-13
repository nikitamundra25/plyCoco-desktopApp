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
import { State, Region, Salutation, LegalForm, Country, NightAllowancePerHour } from "../../../config";
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


const QualificationFormComponent: any = (
    props: FormikProps<CareGiverValues>
) => {
    const { values } = props;
    console.log("errorrrrrssssssssss==========>", props.errors)
    return (
        <div className="form-inner-list-section fix-height-section">
            <h5 className="content-title">Qualifications</h5>
            <Row className="custom-col">
                <Col sm={12}>
                    <Card>
                        <div className="form-inner-list-wrap">
                            <h5 className="heading toggle-filter  ">
                                Qualification
                        </h5>
                            <div className="form-inner-list-content-wrap">
                                <ul>
                                    <li className="ative">Dialysis </li>
                                    <li>Home Management</li>
                                    <li>Nurse/carer</li>
                                    <li> Neonatology</li>
                                    <li>Paramedic </li>
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
        </div>);
}

export default QualificationFormComponent;
