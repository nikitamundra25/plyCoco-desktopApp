import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  Card
} from "reactstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RouteComponentProps } from "react-router";
import InputMask from "react-input-mask";

import {
  State,
  Region,
  Salutation,
  LegalForm,
  Country,
  NightAllowancePerHour
} from "../../../config";
import { languageTranslation } from "../../../helpers";
import PersonalInfoFormComponent from "./PersonalInfoFormComponent";
import BillingSettingsFormComponent from "./BillingSettingsFormComponent";
import QualificationFormComponent from "./QualificationFormComponent";
import AttributeFormComponent from "./AttributesFromComponent";
import RemarkFormComponent from "./RemarkFormComponent";
import { Formik, FormikHelpers, Form } from "formik";
import { Mutation } from "@apollo/react-components";
import { UPDATE_CAREGIVER } from "../../../queries/CareGiver";
import { ICareGiverValues } from "../../../interfaces";

class PersonalInformation extends Component<
  RouteComponentProps,
  ICareGiverValues
> {
  handleSubmit = (
    values: ICareGiverValues,
    { setSubmitting }: FormikHelpers<ICareGiverValues>,
    updateCareGiver: any
  ) => {
    // todo call
    // updateCareGiver()
    setSubmitting(false);
  };

  render() {
    const initialStates: ICareGiverValues = {
      personalInformation: {
        userId: "",
        state: "",
        registartionSince: "",
        gender: "",
        title: "",
        salutation: "",
        firstName: "",
        lastName: "",
        dob: "",
        age: "",
        street: "",
        city: "",
        postCode: "",
        country: "",
        phone: "",
        fax: "",
        mobilePhone: "",
        email: "",
        taxNumber: "",
        bankName: "",
        iban: "",
        username: "",
        password: "",
        belongTo: "",
        legalForm: "",
        companyName: "",
        registerCourt: "",
        registrationNumber: "",
        executiveDirector: "",
        employed: false,
        additionalText: ""
      },
      billingSettings: {
        fee: "",
        night: "",
        weekendAllowancePerHour: "",
        holidayAllowancePerHourFee: "",
        nightAllowancePerHour: "",
        leasingPrice: "",
        invoiceInterval: ""
      }
    };
    return (
      <Mutation mutation={UPDATE_CAREGIVER}>
        {(updateCareGiver: any) => (
          <Formik
            initialValues={initialStates}
            onSubmit={(
              values: ICareGiverValues,
              actions: FormikHelpers<ICareGiverValues>
            ): Promise<any> | void =>
              this.handleSubmit(values, actions, updateCareGiver)
            }
            render={props => {
              return (
                <Form className="form-section forms-main-section">
                  <Row>
                    <Col lg={"4"}>
                      <PersonalInfoFormComponent {...props} />
                    </Col>

                    <Col lg={"4"}>
                      <BillingSettingsFormComponent {...props} />
                      <QualificationFormComponent {...props} />

                      <AttributeFormComponent {...props} />
                    </Col>
                    <Col lg={4}>
                      <RemarkFormComponent {...props} />
                    </Col>
                  </Row>
                  <Button onSubmit={props.handleSubmit}>Save</Button>
                </Form>
              );
            }}
          />
        )}
      </Mutation>
    );
  }
}
export default PersonalInformation;
