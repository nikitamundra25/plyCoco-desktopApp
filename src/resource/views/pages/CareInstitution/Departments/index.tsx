import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Col, Row, Form, Button, UncontrolledTooltip } from 'reactstrap';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { languageTranslation, logger } from '../../../../../helpers';
import AddDepartmentForm from './AddDepartmentForm';
import QuallificationAttribute from './QuallificationAttribute';
import TimesForm from './TimesForm';
import { useParams } from 'react-router-dom';
import {
  IAddDepartmentFormValues,
  IReactSelectInterface,
  IAddTimeFormValues,
  IAttributeOptions,
  IAttributeValues,
} from '../../../../../interfaces';
import { toast } from 'react-toastify';
import {
  AddDepartmentValidationSchema,
  AddTimeValidationSchema,
} from '../../../../validations';
import { CareInstitutionQueries } from '../../../../../graphql/queries';
import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks';
import { IQualifications } from '../../../../../interfaces/qualification';

import { GET_QUALIFICATION_ATTRIBUTE } from '../../../../../graphql/queries';
import { ConfirmBox } from '../../../components/ConfirmBox';
import { CareInstitutionMutation } from '../../../../../graphql/Mutations';
import Loader from '../../../containers/Loader/Loader';

const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
  GET_DEPARTMENT_LIST,
  GET_CAREINSTITUTION_ATTRIBUTES,
] = CareInstitutionQueries;

const [
  UPDATE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION_STATUS,
  UPDATE_DEPARTMENT_CARE_INSTITUTION,
  UPDATE_NEW_CONTACT_CARE_INSTITUTION,
  DELETE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
  ADD_NEW_CONTACT_CARE_INSTITUTION,
  ADD_NEW_CARE_INTITUTION,
  ADD_DEPARTMENT_CARE_INSTITUTION,
  DELETE_DEPARTMENT,
] = CareInstitutionMutation;

let toastId: any = '';

const Departments: FunctionComponent<RouteComponentProps> = (props: any) => {
  let [timesData, setTimesData] = useState<any>([]);
  let [isLoading, setIsLoading] = useState<any>(false);
  let [qualifications, setQualifications] = useState<any>([]);
  let [attributes, setAttributes] = useState<any>([]);
  let [userId, setUserId] = useState<string>('');
  let [refreshList, setRefreshList] = useState<boolean>(false);

  let { id } = useParams();
  const Id: any | undefined = id;

  const [addDivision] = useMutation<{
    addDivision: IAddDepartmentFormValues;
  }>(ADD_DEPARTMENT_CARE_INSTITUTION);

  const [updateDivision] = useMutation<{
    updateDivision: IAddDepartmentFormValues;
  }>(UPDATE_DEPARTMENT_CARE_INSTITUTION);

  // Mutation to delete caregiver
  const [deleteDivision] = useMutation<{ deleteDivision: any }, { id: number }>(
    DELETE_DEPARTMENT,
  );

  // To get caregiver list from db
  const [getDepartmentList, { data: departmentList, refetch }] = useLazyQuery<
    any
  >(GET_DEPARTMENT_LIST);

  const [departmentDetails, setDepartmentDetails] = useState<any>();
  const [isActive, setIsActive] = useState<any>();

  // To fecth qualification attributes list
  const { data: qualificationData } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTE,
  );

  // Fetch attribute list from db
  const { data: attributeData } = useQuery<{
    getCareInstitutionAtrribute: IAttributeValues[];
  }>(GET_CAREINSTITUTION_ATTRIBUTES);

  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (qualificationData && qualificationData.getQualifications) {
    qualificationData.getQualifications.forEach((quali: any) => {
      qualificationList.push({
        label: quali.name,
        value: quali.id,
      });
    });
  }

  const careInstitutionAttrOpt: IAttributeOptions[] | undefined = [];
  if (attributeData && attributeData.getCareInstitutionAtrribute) {
    attributeData.getCareInstitutionAtrribute.forEach(
      ({ id, name, color }: IAttributeValues) =>
        careInstitutionAttrOpt.push({
          label: name,
          value: id.toString(),
          color,
        }),
    );
  }

  useEffect(() => {
    // call query
    getDepartmentList({
      variables: {
        userId: parseInt(Id),
      },
    });
    setUserId(Id);
  }, [departmentList]);

  if (userId && userId !== Id) {
    setRefreshList(true);
    setUserId(Id);
    getDepartmentList({
      variables: {
        userId: parseInt(Id),
      },
    });
    setRefreshList(false);
  }

  const handleSubmit = async (
    values: IAddDepartmentFormValues,
    { setSubmitting, resetForm }: FormikHelpers<IAddDepartmentFormValues>,
  ) => {
    try {
      const departmentInput: any = {
        id: values.id,
        userId: values.userId,
        name: values.name,
        phoneNumber: values.phoneNumber,
        anonymousName: values.anonymousName,
        anonymousName2: values.anonymousName2,
        faxNumber: values.faxNumber,
        email: values.email,
        address: values.address,
        contactPerson: values.contactPerson,
        commentsOffer: values.commentsOffer,
        commentsCareGiver: values.commentsCareGiver,
        commentsVisibleInternally: values.commentsVisibleInternally,
        locked: values.locked,
        times: timesData,
        qualifications: qualifications,
        attributes: attributes,
      };

      if (isActive > -1) {
        await updateDivision({
          variables: {
            id: parseInt(departmentDetails.id),
            divisionInput: departmentInput,
          },
        });
        toast.success(
          languageTranslation('UPDATE_DEPARTMENT_CARE_INSTITUTION'),
        );
      } else {
        await addDivision({
          variables: {
            id: parseInt(Id),
            divisionInput: departmentInput,
          },
        });
        resetForm();
        setTimesData([]);
        setQualifications([]);
        setAttributes([]);
        toast.success(
          languageTranslation('ADD_NEW_DEPARTMENT_CARE_INSTITUTION'),
        );
      }
      setSubmitting(false);
      refetch();
      // resetForm();
      // setTimesData([]);
      // setQualifications([]);
      // setAttributes([]);
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
      logger(error);
    }
    setSubmitting(false);
  };

  let values: IAddDepartmentFormValues;

  if (departmentDetails) {
    values = {
      id: departmentDetails.id,
      userId: departmentDetails.userId,
      name: departmentDetails.name,
      anonymousName: departmentDetails.anonymousName,
      anonymousName2: departmentDetails.anonymousName2,
      address: departmentDetails.address,
      contactPerson: departmentDetails.contactPerson,
      phoneNumber: departmentDetails.phoneNumber,
      faxNumber: departmentDetails.faxNumber,
      email: departmentDetails.email,
      commentsOffer: departmentDetails.commentsOffer,
      commentsCareGiver: departmentDetails.commentsCareGiver,
      commentsVisibleInternally: departmentDetails.commentsVisibleInternally,
      locked: departmentDetails.locked,
      times: departmentDetails.times,
      qualifications: departmentDetails.qualifications,
      attributes: departmentDetails.attributes,
    };
  } else {
    values = {
      id: '',
      userId: parseInt(Id),
      name: '',
      anonymousName: '',
      anonymousName2: '',
      address: '',
      contactPerson: '',
      phoneNumber: '',
      faxNumber: '',
      email: '',
      commentsOffer: '',
      commentsCareGiver: '',
      commentsVisibleInternally: '',
      locked: false,
      times: [],
      qualifications: [],
      attributes: [],
    };
  }

  const handleAddTime = async (
    TimeValues: IAddTimeFormValues,
    { setSubmitting, resetForm }: FormikHelpers<IAddTimeFormValues>,
  ) => {
    try {
      if (new Date(TimeValues.end) >= new Date(TimeValues.begin)) {
        let timesInput: any = {
          userId: values.userId,
          begin: TimeValues.begin,
          end: TimeValues.end,
          comment: TimeValues.comment,
        };
        let temp: any = [];
        temp = [...timesData];
        temp.push(timesInput);
        setTimesData(temp);
        resetForm();
      } else {
        return;
      }
    } catch (error) {
      logger(error);
    }
    setSubmitting(false);
  };

  let TimeValues: IAddTimeFormValues;

  TimeValues = {
    userId: parseInt(Id),
    begin: '',
    end: '',
    comment: '',
  };

  const addNewDepartment = async () => {
    setIsLoading(true);
    setDepartmentDetails({
      id: '',
      userId: parseInt(Id),
      name: '',
      anonymousName: '',
      anonymousName2: '',
      address: '',
      contactPerson: '',
      phoneNumber: '',
      faxNumber: '',
      email: '',
      commentsOffer: '',
      commentsCareGiver: '',
      commentsVisibleInternally: '',
      locked: false,
      times: [],
    });
    setTimesData([]);
    setQualifications([]);
    setAttributes([]);
    setIsActive(-1);
    setInterval(function() {
      setIsLoading(false);
    }, 1000);
  };

  const onDelete = async (id: string) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_DEPARTMENT_DELETE_MSG'),
    });
    if (!value) {
      return;
    } else {
      await deleteDivision({
        variables: {
          id: parseInt(id),
        },
      });
      refetch();
      setDepartmentDetails({
        id: '',
        userId: parseInt(Id),
        name: '',
        anonymousName: '',
        anonymousName2: '',
        address: '',
        contactPerson: '',
        phoneNumber: '',
        faxNumber: '',
        email: '',
        commentsOffer: '',
        commentsCareGiver: '',
        commentsVisibleInternally: '',
        locked: false,
        times: [],
      });
      setTimesData([]);
      setQualifications([]);
      setAttributes([]);
      setIsActive(-1);
      if (!toast.isActive(toastId)) {
        toastId = toast.success(
          languageTranslation('DEPARTMENT_DELETE_SUCCESS_MSG'),
        );
      }
    }
  };

  return (
    <>
      <Form className='form-section forms-main-section'>
        <Row className=''>
          <Col lg={'4'}>
            {refreshList ? (
              <div>
                <Loader />
              </div>
            ) : null}
            <div>
              <h5 className='content-title'>
                {languageTranslation('DEPARTMENT')}
              </h5>
            </div>

            <div className='form-card p-0 department-card-height minheight-auto'>
              <div className='d-flex align-items-center justify-content-end department-list-header pt-2 px-2'>
                <Button
                  color={'primary'}
                  className={'btn-department mb-2 '}
                  id={'add-new-pm-tooltip'}
                  onClick={addNewDepartment}
                >
                  <i className={"fa fa-plus"} />
                  &nbsp;
                  {languageTranslation("ADD_NEW_DEPARTMENT_BTN")}
                </Button>
              </div>

              <div className='common-list-card border-0'>
                <div className='common-list-wrap mb-0'>
                  <div className='common-list-header d-flex align-items-cente justify-content-between'>
                    <div className='common-list-title align-middle'>
                      {languageTranslation('NAME')}
                    </div>
                    <div className=' align-middle toggle-icon'>
                      <i className='fa fa-angle-down'></i>
                    </div>
                  </div>
                  <div className='common-list-body border-0 department-list'>
                    <ul className='common-list list-unstyled mb-0'>
                      {departmentList && departmentList.getDivision.length
                        ? departmentList.getDivision.map(
                            (item: any, index: number) => {
                              return (
                                <li
                                  key={index}
                                  className={
                                    'cursor-pointer list-item text-capitalize' +
                                    (isActive === index ? ' active' : '')
                                  }
                                >
                                  <span
                                    onClick={() => {
                                      setDepartmentDetails(item);
                                      setTimesData(item.times);
                                      setQualifications(item.qualifications);
                                      setAttributes(item.attributes);
                                      setIsActive(index);
                                    }}
                                    className='list-item-text'
                                  >
                                    {item.name}
                                  </span>{' '}
                                  <span
                                    id={`delete${index}`}
                                    className='list-item-icon'
                                    onClick={() => onDelete(item.id)}
                                  >
                                    <UncontrolledTooltip
                                      placement={'top'}
                                      target={`delete${index}`}
                                    >
                                      {languageTranslation('DEPARTMENT_DELETE')}
                                    </UncontrolledTooltip>
                                    <i className='fa fa-trash'></i>
                                  </span>
                                </li>
                              );
                            },
                          )
                        : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={'4'} className='px-lg-0'>
            <Formik
              initialValues={values}
              enableReinitialize={true}
              onSubmit={handleSubmit}
              children={(props: FormikProps<IAddDepartmentFormValues>) => (
                <AddDepartmentForm {...props} isLoading={isLoading} />
              )}
              validationSchema={AddDepartmentValidationSchema}
            />
          </Col>
          <Col lg={4}>
            <Formik
              initialValues={TimeValues}
              onSubmit={handleAddTime}
              children={(props: FormikProps<IAddTimeFormValues>) => (
                <TimesForm
                  {...props}
                  timesData={timesData}
                  setTimesData={setTimesData}
                />
              )}
              validationSchema={AddTimeValidationSchema}
            />

            <QuallificationAttribute
              {...props}
              qualificationList={qualificationList}
              qualifications={qualifications}
              setQualifications={setQualifications}
              careInstitutionAttrOpt={careInstitutionAttrOpt}
              attributes={attributes}
              setAttributes={setAttributes}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default Departments;
