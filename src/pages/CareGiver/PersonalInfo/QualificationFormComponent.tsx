import React, { Component, useState } from "react";
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
import { CareGiverValues, IReactSelectInterface } from "../../../interfaces";
import { FormikSelectField, FormikTextField } from "../../../common/forms/FormikFields";
import { languageTranslation } from "../../../helpers";
import FormikCheckbox from "../../../common/forms/FormikFields/FormikCheckbox";
import { IQualifications } from "../../../interfaces/qualification";
import { GET_QUALIFICATION_ATTRIBUTES } from "../../../queries";
import { useQuery } from "@apollo/react-hooks";


const QualificationFormComponent: any = (
    props: FormikProps<CareGiverValues>
) => {
    const { values, initialValues } = props;



    const { data, loading, error, refetch } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTES);
    const qualificationList: IReactSelectInterface[] | undefined = [];
    if (data && data.getQualificationAttributes) {
        data.getQualificationAttributes.forEach((quali: any) => {
            qualificationList.push({
                label: quali.attributeName,
                value: quali.id
            })
        });
    }
        // props.setFieldValue("qualifications", []);
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
                                        {initialValues.qualifications &&
                                            initialValues.qualifications.map(quali => {
                                                return <li>{quali}</li>
                                            })}
                                    </ul>
                                </div>
                            </div>

                            <div className="custom-select-wrap">
                                <Field
                                    component={FormikSelectField}
                                    name={"selected_qualifications"}
                                    placeholder={"Add Qualification"}
                                    options={qualificationList}
                                    className="w-100"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>);
    }

    export default QualificationFormComponent;
