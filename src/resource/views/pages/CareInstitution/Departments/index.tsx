import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  FormGroup,
  Col,
  Row,
  Form,
  Button,
  UncontrolledTooltip,
} from 'reactstrap';
import Select from 'react-select';
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

const [
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ADD_DEPARTMENT_CARE_INSTITUTION,
  UPDATE_DEPARTMENT_CARE_INSTITUTION,
  GET_DEPARTMENT_LIST,
  DELETE_DEPARTMENT,
] = CareInstitutionQueries;

let toastId: any = '';

const Departments: FunctionComponent<RouteComponentProps> = (props: any) => {
  let [timesData, setTimesData] = useState<any>([]);
  let [qualifications, setQualifications] = useState<any>([]);
  let [attributes, setAttributes] = useState<any>([]);

  let { id } = useParams();
  const Id: any | undefined = id;

  const [addDivision] = useMutation<{
    addDivision: IAddDepartmentFormValues;
  }>(ADD_DEPARTMENT_CARE_INSTITUTION);

  const [updateDivision, { error, data }] = useMutation<{
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
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (qualificationData && qualificationData.getQualificationAttributes) {
    qualificationData.getQualificationAttributes.forEach((quali: any) => {
      qualificationList.push({
        label: quali.attributeName,
        value: quali.id,
      });
    });
  }

  useEffect(() => {
    // call query
    getDepartmentList({
      variables: {
        userId: parseInt(Id),
      },
    });
  }, [departmentList]);

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

      setSubmitting(false);
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
        toast.success(
          languageTranslation('ADD_NEW_DEPARTMENT_CARE_INSTITUTION'),
        );
      }
      refetch();
      resetForm();
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
      id: parseInt(departmentDetails.id),
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
            <div>
              <h5 className='content-title'>
                {languageTranslation('DEPARTMENT')}
              </h5>
            </div>

            <div className='form-card p-0'>
              <FormGroup>
                <Row>
                  <Col lg={'6'}>
                    {' '}
                    <div className='p-2'>
                      <Select placeholder={languageTranslation('LOCKED')} />
                    </div>
                  </Col>
                  <Col lg={'6'}>
                    <Button
                      color={'primary'}
                      className={'btn-department mb-2 pull-right mt-2 mr-2'}
                      id={'add-new-pm-tooltip'}
                      onClick={addNewDepartment}
                    >
                      <i className={'fa fa-plus'} />
                      &nbsp; Add New Departments
                    </Button>
                  </Col>

                  <Col sm='12'>
                    <div className='common-list-card border-0'>
                      <div className='d-flex align-items-center justify-content-between px-2'>
                        <h6 className='common-list-title  '>
                          {languageTranslation('NAME')}
                        </h6>{' '}
                      </div>

                      <div className='common-list-wrap'>
                        <div className='common-list-header d-flex align-items-cente justify-content-between'>
                          <div className='common-list-title align-middle'>
                            {' '}
                            {languageTranslation('LOCKED')}
                          </div>
                          <div className=' align-middle toggle-icon'>
                            <i className='fa fa-angle-down'></i>
                          </div>
                        </div>
                        <div className='common-list-body border-0'>
                          <ul className='common-list list-unstyled'>
                            {departmentList && departmentList.getDivision.length
                              ? departmentList.getDivision.map(
                                  (item: any, index: number) => {
                                    return (
                                      <li
                                        key={index}
                                        className={
                                          'cursor-pointer ' +
                                          (isActive === index ? 'active' : null)
                                        }
                                        onClick={() => {
                                          setDepartmentDetails(item);
                                          setTimesData(item.times);
                                          setQualifications(
                                            item.qualifications,
                                          );
                                          setAttributes(item.attributes);
                                          setIsActive(index);
                                        }}
                                      >
                                        <span>{item.name}</span>{' '}
                                        <span
                                          id={`delete${index}`}
                                          className='btn-icon mr-2'
                                          onClick={() => onDelete(item.id)}
                                        >
                                          <UncontrolledTooltip
                                            placement={'top'}
                                            target={`delete${index}`}
                                          >
                                            {languageTranslation(
                                              'DEPARTMENT_DELETE',
                                            )}
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
                  </Col>
                </Row>
              </FormGroup>
            </div>
          </Col>
          <Col lg={'4'}>
            <Formik
              initialValues={values}
              enableReinitialize={true}
              onSubmit={handleSubmit}
              children={(props: FormikProps<IAddDepartmentFormValues>) => (
                <AddDepartmentForm {...props} />
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
