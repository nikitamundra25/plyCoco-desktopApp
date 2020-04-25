import React, { FunctionComponent, useEffect } from "react";
import { Col, Row, Button } from "reactstrap";
import { FormikProps, Form } from "formik";
import {
  IReactSelectInterface,
  ICountry,
  ICountries,
  IStates,
  IState,
  ICareGiverValues,
  IAttributeOptions,
} from "../../../../../interfaces";
import {
  CountryQueries,
  GET_QUALIFICATION_ATTRIBUTE,
  CareGiverQueries,
} from "../../../../../graphql/queries";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { languageTranslation, logger } from "../../../../../helpers";
import PersonalInfoFormComponent from "../PersonalInfo/PersonalInfoFormComponent";
import BillingSettingsFormComponent from "../PersonalInfo/BillingSettingsFormComponent";
import QualificationFormComponent from "../PersonalInfo/QualificationFormComponent";
import AttributeFormComponent from "../PersonalInfo/AttributesFromComponent";
import RemarkFormComponent from "../PersonalInfo/RemarkFormComponent";
import { IQualifications } from "../../../../../interfaces/qualification";
import "../caregiver.scss";

const [GET_COUNTRIES, GET_STATES_BY_COUNTRY] = CountryQueries;
const [GET_CAREGIVERS] = CareGiverQueries;

const CareGiverFormComponent: FunctionComponent<
  FormikProps<ICareGiverValues> & {
    setRemarksDetail: any;
    remarksDetail: any;
    caregiverAttributeOptions: IAttributeOptions[] | undefined;
    attributeLoading?: boolean;
  }
> = (
  props: FormikProps<ICareGiverValues> & {
    setRemarksDetail: any;
    remarksDetail: any;
    caregiverAttributeOptions: IAttributeOptions[] | undefined;
    attributeLoading?: boolean;
  }
) => {
  const {
    values,
    setRemarksDetail,
    remarksDetail,
    caregiverAttributeOptions,
    attributeLoading,
  } = props;
  const handleField = (e: any) => {
    const value = {
      createdBy: `${values.lastName} ${values.firstName}`,
      description: e.target.value,
    };
    props.setFieldValue("remarks", [value]);
  };
  // To fetch the list of all caregiver
  const [fetchCareGivers, { data: careGivers }] = useLazyQuery<any>(
    GET_CAREGIVERS
  );

  // To fetch the list of countries
  const { data, loading, error, refetch } = useQuery<ICountries>(GET_COUNTRIES);
  // To fetch the states of selected contry & don't want to query on initial load
  const [getStatesByCountry, { data: statesData }] = useLazyQuery<IStates>(
    GET_STATES_BY_COUNTRY
  );
  const countriesOpt: IReactSelectInterface[] | undefined = [];
  const statesOpt: IReactSelectInterface[] | undefined = [];
  if (data && data.countries) {
    data.countries.forEach(({ id, name }: ICountry) =>
      countriesOpt.push({
        label: name,
        value: id,
      })
    );
  }
  if (statesData && statesData.states) {
    statesData.states.forEach(({ id, name }: IState) =>
      statesOpt.push({
        label: name,
        value: id,
      })
    );
  }
  // To fecth qualification attributes list
  const { data: qualificationData } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTE
  );
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (qualificationData && qualificationData.getQualifications) {
    qualificationData.getQualifications.forEach((quali: any) => {
      qualificationList.push({
        label: quali.name,
        value: quali.id,
      });
    });
  }
  useEffect(() => {
    // Fetch list of caregivers
    fetchCareGivers({
      variables: {
        searchBy: "",
        sortBy: 3,
        limit: 200,
        page: 1,
        isActive: "",
      },
    });
  }, []);
  //Fetch careInstitutionList
  const careGiverOpt: IReactSelectInterface[] | undefined = [];
  if (
    careGivers &&
    careGivers.getCaregivers &&
    careGivers.getCaregivers.result
  ) {
    careGiverOpt.push({
      label: languageTranslation("NAME"),
      value: languageTranslation("ID"),
    });
    careGivers.getCaregivers.result.forEach(
      ({ id, firstName, lastName }: any) =>
        careGiverOpt.push({
          label: `${lastName}${" "}${firstName}`,
          value: id,
        })
    );
  }
  return (
    <Form className="form-section forms-main-section">
      <div className="d-none d-md-block" id={"caregiver-add-btn "}>
        <Button
          disabled={props.isSubmitting}
          // id={'caregiver-add-btn'}
          onClick={props.handleSubmit}
          color={"primary"}
          className={"save-button"}
        >
          {props.isSubmitting ? (
            <i className="fa fa-spinner fa-spin mr-2" />
          ) : (
            ""
          )}

          {languageTranslation("SAVE_BUTTON")}
        </Button>
      </div>
      <Row>
        <Col lg={"4"}>
          <PersonalInfoFormComponent
            {...props}
            CareInstitutionList={careGiverOpt}
            countriesOpt={countriesOpt}
            statesOpt={statesOpt}
            getStatesByCountry={getStatesByCountry}
            attributeLoading={attributeLoading}
          />
        </Col>
        <Col lg={"4"} className="px-lg-0">
          <div className="common-col custom-caregiver-height custom-scrollbar">
            <BillingSettingsFormComponent {...props} />
            <div className="quality-attribute-section d-flex flex-column">
              <QualificationFormComponent
                {...props}
                qualificationList={qualificationList}
              />
              <AttributeFormComponent
                {...props}
                caregiverAttributeOptions={caregiverAttributeOptions}
              />
            </div>
          </div>
        </Col>
        <RemarkFormComponent
          {...props}
          setRemarksDetail={setRemarksDetail}
          remarksDetail={remarksDetail}
        />
        <Col lg={"12"} md={"12"} sm={"12"}>
          <div className="d-block d-md-none text-right">
            <Button
              disabled={props.isSubmitting}
              onClick={props.handleSubmit}
              color={"primary"}
              className={"submit-common-btn mb-3"}
            >
              {props.isSubmitting ? (
                <i className="fa fa-spinner fa-spin mr-2" />
              ) : (
                ""
              )}

              {languageTranslation("SAVE_BUTTON")}
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default CareGiverFormComponent;
