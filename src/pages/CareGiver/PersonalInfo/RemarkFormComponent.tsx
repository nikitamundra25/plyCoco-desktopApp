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


const RemarkFormComponent: any = (
    props: FormikProps<CareGiverValues>
) => {
    const { values } = props;
    console.log("errorrrrrssssssssss==========>", props.errors)
    return (
        <div className="remark-details">
            <div className="remark-header d-flex align-items-center justify-content-between">
                <h5 className="my-2 text-left activity-title">Remarks</h5>
                <div
                    // onClick={props.handleOnClick}
                    className="edit-remark my-2"
                >
                    <i className="icon-note" />
                </div>
            </div>
            <div className="remark-body">
                <div className="activity-logs ">
                    {props ? (
                        <div className="activity-block py-2 px-3">
                            <div className="pr-3 text-left">
                                <div className="remark-section">
                                    <Field
                                        component={FormikTextField}
                                        type="textarea"
                                        name={"remarks.description"}
                                        placeholder="Remarks"
                                        className="height-textarea "
                                    />
                                    <div className="add-remark-btn">Add Remarks</div>
                                </div>
                            </div>
                            <div className="text-left activity-date">
                                <span>
                                    <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                                    2:54 PM
                          </span>
                                <span>
                                    <i className="fa fa-user mr-2"></i>Mark Smith
                          </span>
                            </div>
                            <span className="activity-icon activity-set"></span>
                        </div>
                    ) : null}
                    <div className="activity-block py-2 px-3">
                        <div className="pr-3 text-left">
                            <span className="text-capitalize">
                                Called a few days before the registration (they
                                repeatedly asked to register), is KS and wants to make
                                some extra money, preferably in clinics, has 2
                                children and currently no PC because the children
                                broke it, is coming on 09/18 at 11 a.m. for the info
                                call, email office address + Stegemann sent, Jenny
                        </span>
                        </div>
                        <div className="text-left activity-date">
                            <span>
                                <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                                2:54 PM
                        </span>
                            <span>
                                <i className="fa fa-user mr-2"></i>Mark Smith
                        </span>
                        </div>
                        <span className="activity-icon activity-set"></span>
                    </div>
                    <div className="activity-block  py-2 px-3">
                        <div className="pr-3 text-left">
                            <span className="text-capitalize">
                                She came to the info talk with her little son (about 3
                                years). But everyone ran quietly. She had a lot of
                                questions, generally freelance. She is exam. AP. The
                                little one gets his daycare place in October and so
                                she wants to get started with us in November. In
                                January she wants to see if she wants to work
                                part-time at a hospital. She is very friendly and
                                bright, new password sent. WV Doks, set to October
                                because it only wants to start in November. Norma
                        </span>
                        </div>
                        <div className="text-left activity-date">
                            <span>
                                <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                                2:54 PM
                        </span>
                            <span>
                                <i className="fa fa-user mr-2"></i>Mark Smith
                        </span>
                        </div>
                        <span className="activity-icon activity-set"></span>
                    </div>
                    <div className="activity-block  py-2 px-3">
                        <div className="pr-3 text-left">
                            <span className="text-capitalize">
                                she called (yesterday on the phone again with Norma
                                and asked everything again, apparently hadn't listened
                                to the conversation), now she asked questions again
                                and explained to me that she couldn't remember
                                everything, so she is now writing, Then she wanted to
                                make another appointment just to talk about the NV,
                                offered to ask her questions or end it by email, and
                                then she thought I sounded annoyed and she just wanted
                                to speak to Norma, that she would like to ask her
                                questions, but then she was no longer willing to do
                                so, Jenny
                        </span>
                        </div>
                        <div className="text-left activity-date">
                            <span>
                                <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                                2:54 PM
                        </span>
                            <span>
                                <i className="fa fa-user mr-2"></i>Mark Smith
                        </span>
                        </div>
                        <span className="activity-icon activity-set"></span>
                    </div>
                    <div className="activity-block  py-2 px-3">
                        <div className="pr-3 text-left">
                            <span className="text-capitalize">
                                Although she still wants to become a freelancer, her
                                child has to get used to kindergarten and this takes 1
                                to 2 months. She knows which docs we need and will
                                send them and then, but only as soon as her little one
                                has settled in and she has come to a rest., Carolin
                        </span>
                        </div>
                        <div className="text-left activity-date">
                            <span>
                                <i className="fa fa-clock-o mr-2"></i>Dec 28th 2019,
                                2:54 PM
                        </span>
                            <span>
                                <i className="fa fa-user mr-2"></i>Mark Smith
                        </span>
                        </div>
                        <span className="activity-icon activity-set"></span>
                    </div>
                </div>
            </div>
        </div>);
}

export default RemarkFormComponent;
