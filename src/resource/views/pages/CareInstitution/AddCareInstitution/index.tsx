import React, { useEffect, Suspense, useState, FunctionComponent } from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { CareInstituionValidationSchema } from '../../../../validations';
import {
  ICareInstitutionFormValues,
  IHandleSubmitInterface,
  IReactSelectInterface,
  IAttributeValues,
  IAttributeOptions
} from '../../../../../interfaces';
import AddCareInstitution from './AddCareInstitution';
import {
  CareInstitutionQueries,
  GET_QUALIFICATION_ATTRIBUTE
} from '../../../../../graphql/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { logger, languageTranslation } from '../../../../../helpers';
import { toast } from 'react-toastify';
import { useHistory, RouteComponentProps, useParams } from 'react-router';
import { AppRoutes } from '../../../../../config';
import { careInstitutionRoutes } from '../Sidebar/SidebarRoutes/ConstitutionRoutes';
import reminder from '../../../../assets/img/reminder.svg';
import password from '../../../../assets/img/password.svg';
import appointment from '../../../../assets/img/appointment.svg';
import clear from '../../../../assets/img/clear.svg';
import { IQualifications } from '../../../../../interfaces/qualification';
import CareInstitutionContacts from '../PersonalInfo/CareInstitutionContacts';
import Loader from '../../../containers/Loader/Loader';
import { CareInstitutionMutation } from '../../../../../graphql/Mutations';

const CareInstitutionSidebar = React.lazy(() =>
  import('../Sidebar/SidebarLayout/CareInstitutionLayout')
);

const CareInstitutionTabs = careInstitutionRoutes;

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
  DELETE_DEPARTMENT
] = CareInstitutionMutation;

const [, , , GET_CAREINSTITUTION_ATTRIBUTES] = CareInstitutionQueries;

export const CareInstitutionForm: FunctionComponent<FormikProps<
  ICareInstitutionFormValues
> &
  RouteComponentProps &
  IHandleSubmitInterface> = (
  props: FormikProps<ICareInstitutionFormValues> & RouteComponentProps
) => {
  const [remarksDetail, setRemarksDetail] = useState<any>([]);
  //contact info
  let [contacts, setContacts] = useState<any>([]);
  // Fetch attribute list from db
  const { data: attributeData } = useQuery<{
    getCareInstitutionAtrribute: IAttributeValues[];
  }>(GET_CAREINSTITUTION_ATTRIBUTES);
  // Push into attribute options
  const careInstitutionAttrOpt: IAttributeOptions[] | undefined = [];
  if (attributeData && attributeData.getCareInstitutionAtrribute) {
    attributeData.getCareInstitutionAtrribute.forEach(
      ({ id, name, color }: IAttributeValues) =>
        careInstitutionAttrOpt.push({
          label: name,
          value: id ? id.toString() : '',
          color
        })
    );
  }

  const [newContactAdded, setnewContactAdded] = useState(false);

  const [updateCareInstitution, { error, data }] = useMutation<{
    updateCareInstitution: ICareInstitutionFormValues;
  }>(UPDATE_CARE_INSTITUTION);

  let { id } = useParams();
  const Id: any | undefined = id;

  // To fecth qualification attributes list
  const { data: qualificationData } = useQuery<IQualifications>(
    GET_QUALIFICATION_ATTRIBUTE
  );

  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (qualificationData && qualificationData.getQualifications) {
    qualificationData.getQualifications.forEach((quali: any) => {
      qualificationList.push({
        label: quali.name,
        value: quali.id
      });
    });
  }
  useEffect(() => {
    const contactsData: any[] = [];
    contactsData.push({
      email: '',
      firstName: '',
      lastName: '',
      userName: '',
      phoneNumber: '',
      mobileNumber: '',
      faxNumber: '',
      comments: '',
      groupAttributes: ''
    });
    setContacts(contactsData);
  }, []);

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
      'caregiver-add-btn'
    );
    if (buttonDiv) {
      if (scrollPositionY >= 12) {
        buttonDiv.classList.add('sticky-save-btn');
      } else {
        buttonDiv.classList.remove('sticky-save-btn');
      }
    }
  };

  useEffect(() => {
    if (data) {
      const { updateCareInstitution } = data;
      const Data: any = updateCareInstitution;
      history.push(
        AppRoutes.CARE_INSTITUION_VIEW.replace(':id', Data ? Data.id : 'null')
      );
    }
  }, [data]);

  const handleSubmit = async (
    values: ICareInstitutionFormValues,
    { setSubmitting }: FormikHelpers<ICareInstitutionFormValues>
  ) => {
    //to set submit state to false after successful signup
    let AttributeData: any = [];
    if (values.attributeId && values.attributeId.length) {
      values.attributeId.map((attribute: IReactSelectInterface) =>
        AttributeData.push(parseInt(attribute.value))
      );
    }
    try {
         // var temp to manage if shortName is not entered, store companyName.
let temp =  values.shortName ? values.shortName.trim() : values.companyName ? values.companyName.trim() : ""
      const dataSubmit: any = {
        gender: values && values.gender ? values.gender.value : '',
        salutation: values && values.salutation ? values.salutation.value : '',
        firstName: values.firstName ? values.firstName.trim() : '',
        lastName: values.lastName ? values.lastName.trim() : '',
        shortName: temp,
        companyName: values.companyName ? values.companyName.trim() : '',
        anonymousName: values.anonymousName,
        anonymousName2: values.anonymousName2,
        street: values.street,
        zipCode: values.zipCode,
        countryId:
          values && values.country ? parseInt(values.country.value) : null,
        stateId: values && values.state ? parseInt(values.state.value) : null,
        remarks: remarksDetail,
        // values.remarks,
        website: values.website,
        title: values.title,
        email: values.email ? values.email.trim() : '',
        userName: values.userName ? values.userName.trim() : '',
        careGiverCommission: values.careGiverCommission
          ? values.careGiverCommission.replace(/,/g, '.')
          : null,
        doctorCommission: values.doctorCommission
          ? values.doctorCommission.replace(/,/g, '.')
          : null,
        invoiceType:
          values && values.invoiceType ? values.invoiceType.value : '',
        interval: values && values.interval ? values.interval.value : '',
        emailInvoice: values.emailInvoice,
        addressInvoice: values.addressInvoice,
        regionId:
          values && values.regionId && values.regionId.value
            ? parseInt(values.regionId.value)
            : null,
        city: values && values.city,
        fax: values && values.fax,
        linkedTo: values && values.linkedTo ? values.linkedTo.value : '',
        phoneNumber: values && values.phoneNumber,
        mobileNumber: values.mobileNumber,
        qualificationId:
          values.qualificationId && values.qualificationId.length
            ? values.qualificationId.map(
                (qualification: IReactSelectInterface) =>
                  parseInt(qualification.value)
              )
            : null,
        attributes: AttributeData,
        leasingPriceListId:
          values.leasingPriceListId && values.leasingPriceListId.value
            ? values.leasingPriceListId.value
            : null,

            plycocoInvoiceTax:
            values.plycocoInvoiceTax && values.plycocoInvoiceTax.value
              ? Number(values.plycocoInvoiceTax.value)
              : null,

              leasingInvoiceTax:
              values.leasingInvoiceTax && values.leasingInvoiceTax.value
                ? Number(values.leasingInvoiceTax.value)
                : null,

        remarksViewable: values.remarksViewable
      };

      await updateCareInstitution({
        variables: {
          id: parseInt(Id),
          careInstitutionInput: dataSubmit
        }
      });
      toast.success(languageTranslation('CARE_INSTITUTION_ADD_SUCCESS_MSG'));
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
      if (
        message ===
        "Care Institution added successfully but due to some network issue email couldn't be sent out"
      ) {
        history.push(AppRoutes.CARE_INSTITUTION);
      }
      logger(error);
    }
    setSubmitting(false);
  };

  const [activeTab, setactiveTab] = useState(0);
  const values: ICareInstitutionFormValues = {
    email: '',
    firstName: '',
    countryId: '',
    lastName: '',
    userName: '',
    fax: '',
    shortName: '',
    companyName: '',
    street: '',
    city: '',
    isArchive: false
  };
  return (
    <div className='common-detail-page'>
      <div className='common-detail-section'>
        <Suspense fallback={<Loader />}>
          <div className='sticky-common-header'>
            <div className='common-topheader d-flex align-items-center '>
  <div className='common-title'> {languageTranslation("ADD_CARE_INSTITUTION")}</div>
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
                   {languageTranslation("CREATE_TODO")}
                </span>
              </div>
              <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={password} alt='' />
                </span>
                <span className='header-nav-text'>{languageTranslation("NEW_PASSWORD")}</span>
              </div>
              <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={appointment} alt='' />
                </span>
                <span className='header-nav-text'>{languageTranslation("DISPLAY_APPOINTMENT")}
</span>
              </div>
              <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={clear} alt='' />
                </span>
                <span className='header-nav-text'>{languageTranslation("CLEAR")}</span>
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
                    props: FormikProps<ICareInstitutionFormValues>
                  ) => (
                    <AddCareInstitution
                      {...props}
                      qualificationList={qualificationList}
                      setRemarksDetail={setRemarksDetail}
                      remarksDetail={remarksDetail}
                      careInstitutionAttrOpt={careInstitutionAttrOpt}
                    />
                  )}
                  validationSchema={CareInstituionValidationSchema}
                />
                <div className='position-relative'>
                  <CareInstitutionContacts
                    contacts={contacts}
                    careInstId={Id}
                    ContactFromAdd={true}
                    careInstitutionAttrOpt={careInstitutionAttrOpt}
                    setContacts={(contacts: any) => {
                      setContacts((contacts = contacts));
                    }}
                    neContactAdded={() => setnewContactAdded(false)}
                    {...props}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CareInstitutionForm;
