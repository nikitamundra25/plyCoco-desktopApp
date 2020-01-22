import React, {
  Component,
  useEffect,
  Suspense,
  useState,
  FunctionComponent,
} from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { CareInstituionValidationSchema } from '../../../validations';
import {
  ICareInstitutionFormValues,
  IHandleSubmitInterface,
  IReactSelectInterface,
} from '../../../interfaces';
import AddCareInstitution from './AddCareInstitution';
import {
  CareInstitutionQueries,
  GET_QUALIFICATION_ATTRIBUTES,
} from '../../../queries';
import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks';
import { logger, languageTranslation } from '../../../helpers';
import { toast } from 'react-toastify';
import { useHistory, RouteComponentProps } from 'react-router';
import { AppRoutes } from '../../../config';
import { careInstitutionRoutes } from '../Sidebar/SidebarRoutes/ConstitutionRoutes';
import add from '../../../assets/img/add.svg';
import reminder from '../../../assets/img/reminder.svg';
import password from '../../../assets/img/password.svg';
import appointment from '../../../assets/img/appointment.svg';
import clear from '../../../assets/img/clear.svg';
import { IQualifications } from '../../../interfaces/qualification';

const CareInstitutionSidebar = React.lazy(() =>
  import('../Sidebar/SidebarLayout/CareInstitutionLayout'),
);

const CareInstitutionTabs = careInstitutionRoutes;

const [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION,
] = CareInstitutionQueries;

export const CareInstitutionForm: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  RouteComponentProps &
  IHandleSubmitInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & RouteComponentProps,
) => {
  const [addCareInstitution, { error, data }] = useMutation<{
    addCareInstitution: ICareInstitutionFormValues;
  }>(ADD_CARE_INSTITUTION);

  // To fecth qualification attributes list
  const { data: qualificationData } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTES,
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

  let history = useHistory();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPositionY = window.scrollY;
    const buttonDiv: HTMLElement | null = document.getElementById(
      'caregiver-add-btn',
    );
    if (buttonDiv) {
      if (scrollPositionY >= 35) {
        buttonDiv.classList.add('sticky-save-btn');
      } else {
        buttonDiv.classList.remove('sticky-save-btn');
      }
    }
  };

  useEffect(() => {
    if (data) {
      console.log('In use Effect');
      const Data: any = data;
      history.push(
        AppRoutes.CARE_INSTITUION_VIEW.replace(
          ':id',
          Data.addCareInstitution ? Data.addCareInstitution.id : 'null',
        ),
      );
    }
  }, [data]);
  const handleSubmit = async (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>,
  ) => {
    //to set submit state to false after successful signup
    try {
      const dataSubmit: any = {
        gender: values && values.gender ? values.gender.value : '',
        salutation: values && values.salutation ? values.salutation.value : '',
        firstName: values.firstName,
        lastName: values.lastName,
        shortName: values.shortName,
        companyName: values.companyName,
        anonymousName: values.anonymousName,
        anonymousName2: values.anonymousName2,
        street: values.street,
        zipCode: values.zipCode,
        countryId: values && values.country ? values.country.value : null,
        stateId: values && values.state ? values.state.value : null,
        remarks: values.remarks,
        website: values.website,
        email: values.email,
        userName: values.userName,
        careGiverCommission: values.careGiverCommission,
        doctorCommission: values.doctorCommission,
        invoiceType:
          values && values.invoiceType ? values.invoiceType.value : '',
        interval: values && values.interval ? values.interval.value : '',
        emailInvoice: values.emailInvoice,
        addressInvoice: values.addressInvoice,
        regionId:
          values && values.regionId ? `{${values.regionId.value}}` : null,
        city: values && values.city,
        fax: values && values.fax,
        linkedTo: values && values.linkedTo,
        phoneNumber: values && values.phoneNumber,
        mobileNumber: values.mobileNumber,
        qualificationId:
          values.qualificationId && values.qualificationId.length
            ? `{${values.qualificationId
                .map(
                  (qualification: IReactSelectInterface) => qualification.value,
                )
                .join(', ')}}`
            : null,
      };
      console.log('dataSubmit', values);

      await addCareInstitution({
        variables: {
          careInstitutionInput: dataSubmit,
        },
      });
      toast.success(languageTranslation('CARE_INSTITUTION_ADD_SUCCESS_MSG'));
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

  const [activeTab, setactiveTab] = useState(0);

  // const { data, loading, error, refetch } = useQuery(GET_USERS);
  // console.log(data, 'dataaaaa');
  const values: ICareInstitutionFormValues = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    fax: '',
    shortName: '',
    companyName: '',
    street: '',
    city: '',
    isArchive: false,
  };
  return (
    <div className='common-detail-page'>
      <div className='common-detail-section'>
        <Suspense fallback={'Loading..'}>
          <div className='sticky-common-header'>
            <div className='common-topheader d-flex align-items-center '>
              <div className='common-title'>Add Care Institution</div>
              <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={reminder} alt='' />
                </span>
                <span
                  className='header-nav-text'
                  // onClick={() => {
                  //   this.setState({ show: true });
                  // }}
                >
                  Create Todo/Reminder
                </span>
              </div>
              <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={password} alt='' />
                </span>
                <span className='header-nav-text'>New Password</span>
              </div>
              <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={appointment} alt='' />
                </span>
                <span className='header-nav-text'>Display Appointments</span>
              </div>
              <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={clear} alt='' />
                </span>
                <span className='header-nav-text'>Clear</span>
              </div>
            </div>
            <CareInstitutionSidebar
              tabs={CareInstitutionTabs}
              activeTab={activeTab}
              onTabChange={''}
            />
          </div>
        </Suspense>
        <Suspense fallback={''}>
          <div className='common-content flex-grow-1'>
            {activeTab === 0 ? (
              <div className={'form-section forms-main-section'}>
                <Formik
                  initialValues={values}
                  onSubmit={handleSubmit}
                  children={(
                    props: FormikProps<ICareInstitutionFormValues>,
                  ) => (
                    <AddCareInstitution
                      {...props}
                      qualificationList={qualificationList}
                    />
                  )}
                  validationSchema={CareInstituionValidationSchema}
                />
              </div>
            ) : null}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CareInstitutionForm;
