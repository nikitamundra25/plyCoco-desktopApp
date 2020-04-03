import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import {
  languageTranslation,
  stripHtml,
  HtmlToDraftConverter,
  errorFormatter
} from '../../../../helpers';
import {
  ProfileQueries,
  CareInstitutionQueries,
  EmailTemplateQueries,
  AppointmentsQueries
} from '../../../../graphql/queries';
import {
  IEmailAttachmentData,
  IReactSelectInterface,
  IEmailTemplateData,
  INewEmailAttachments
} from '../../../../interfaces';
import { CareInstitutionListComponent } from './CareInstitutionListComponent';
import filter from '../../../assets/img/filter.svg';
import refresh from '../../../assets/img/refresh.svg';
import './index.scss';
import { useHistory } from 'react-router';
import { client, CareInstTIMyoCYAttrId } from '../../../../config';
import { EmailEditorComponent } from './EmailFormComponent';
import { ConfirmBox } from '../../components/ConfirmBox';
import { IBulkEmailVariables } from '../../../../interfaces';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';
import { BulkEmailCareInstituion } from '../../../../graphql/Mutations/BulkEmailCareInstitution';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ConfirmAppointmentPdf from './PDF/ConfirmAppointmentPdf';
import { DocumentMutations } from '../../../../graphql/Mutations';

const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [BULK_EMAILS_CAREINSTITUTION] = BulkEmailCareInstituion;
const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID
] = CareInstitutionQueries;
const [ADD_DOCUMENT] = DocumentMutations;
const [VIEW_PROFILE] = ProfileQueries;
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;

let toastId: any = null;

const BulkEmailCareInstitution: FunctionComponent<any> = (props: any) => {
  const { selectedCellsCareinstitution, confirmAppointment } = props;
  let [selectedCareGiver, setselectedCareGiver] = useState<any>([]);
  const [pdfAppointmentDetails, setPdfAppointmentDetails] = useState<string[]>([]);
  const [temporaryWorkerPdf, setTemporaryWorkerPdf] = useState<any>();
  const history = useHistory();

  // To access data of loggedIn user
  let userData: any = '';
  try {
    userData = client.readQuery({
      query: VIEW_PROFILE
    });
  } catch (error) { }

  const { viewAdminProfile }: any = userData ? userData : {};
  const { firstName = '', lastName = '', id = '' } = viewAdminProfile
    ? viewAdminProfile
    : {};

    // Mutation to leasing document
    const [addUserDocuments,{data:documentRes}] = useMutation<
    { addUserDocuments: any },
    { documentInput: any }
  >(ADD_DOCUMENT);
  // To fetch caregivers by qualification id
  const [
    fetchCaregiverListFromQualification,
    {
      data: careInstitutionsList,
      called: careGiverListCalled,
      loading: caregiverLoading,
      refetch: caregiverQulliRefetch,
      fetchMore: caregiverListFetch
    }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache'
  });

  // To get careinstitution list from db
  const [
    getCareInstitutions,
    { data: careInstitutionListData, called, loading, refetch, fetchMore }
  ] = useLazyQuery<any, any>(GET_CARE_INSTITUTION_LIST, {
    fetchPolicy: 'no-cache'
  });

  const [
    fetchCareInstDetails,
    { data: careInstData, loading: dataLoading, refetch: careInstDetailsRetch }
  ] = useLazyQuery<any>(GET_CARE_INSTITUION_BY_ID);

  //To get all email templates of care giver addded in system
  const { data, loading: fetchTemplateListLoading } = useQuery<any>(
    GET_CAREGIVER_EMAIL_TEMPLATES,
    {
      variables: {
        type: languageTranslation('CAREINSTITUTION_EMAIL_TEMPLATE_TYPE')
      }
    }
  );

  const [page, setPage] = useState<number>(1);
  const [template, setTemplate] = useState<any>(undefined);
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<any>('');
  const [attachments, setAttachments] = useState<IEmailAttachmentData[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [bulkcareGivers, setBulkCareGivers] = useState<boolean>(false);
  const [careInstitutions, setCareInstitution] = useState<any>([]);

  const [bulkEmails, { loading: bulkEmailLoading }] = useMutation<{
    bulkEmailsInput: IBulkEmailVariables;
  }>(BULK_EMAILS_CAREINSTITUTION, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation('EMAIL_SENT_SUCCESS'));
      }
      props.handleClose();
      setSubject('');
      setBody(undefined);
      setAttachments([]);
      setIsSubmit(false);
      setTemplate({ label: '', value: '' });
      setselectedCareGiver([]);
      setBulkCareGivers(false);
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });

  useEffect(() => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      let careInstIds: string = selectedCellsCareinstitution.map(
        (careInst: any) => careInst.id
      );
      fetchCareInstDetails({
        variables: {
          careInstitutionId:
            careInstIds && careInstIds.length ? parseInt(careInstIds[0]) : ''
        }
      });
    }
  }, []);
  // To fetch users according to user selected
  useEffect(() => {
    if (props.label === 'appointment') {
      let userId: any = [];
      if (
        props.selectedCellsCareinstitution &&
        props.selectedCellsCareinstitution.length > 0
      ) {
        for (let i = 0; i < props.selectedCellsCareinstitution.length; i++) {
          let value = props.selectedCellsCareinstitution[i];
          userId.push(parseInt(value.id));
        }
      }
      // let temp: any = [];
      // if (props.qualification && props.qualification.length) {
      //   props.qualification.map((key: any, index: number) => {
      //     if (key.value) {
      //       temp.push(parseInt(key.value));
      //     } else {
      //       temp.push(parseInt(key));
      //     }
      //   });
      // }

      // get careInstitutions list
      // fetchCaregiverListFromQualification({
      //   variables: {
      //     qualificationId: temp ? temp : [],
      //     positiveAttributeId: [],
      //     negativeAttributeId: [],
      //     userRole: 'canstitution',
      //     limit: 30,
      //     page,
      //     gte: props.gte,
      //     lte: props.lte,
      //     userId: userId
      //   }
      // });
    }
  }, [props.qualification]);

  useEffect(() => {
    // Fetch list of care instituion
    if (props.label !== 'appointment') {
      getCareInstitutions({
        variables: {
          searchBy: '',
          sortBy: 3,
          limit: 30,
          page,
          isActive: ''
        }
      });
    }
  }, []);

  console.log('confirmAppointment ', confirmAppointment);


  useEffect(() => {
    const getUserByQualifications =
      careInstitutionsList && careInstitutionsList.getUserByQualifications
        ? careInstitutionsList.getUserByQualifications
        : {};
    if (getUserByQualifications) {
      const { result, totalCount } = getUserByQualifications;
      setCareInstitution({
        totalCount,
        careInstitutionData: result
      });
    }
  }, [careInstitutionsList]);

  // Refresh component
  const onRefresh = () => {
    // refetch();
    getCareInstitutions({
      variables: {
        searchBy: '',
        sortBy: 3,
        limit: 30,
        page: 1,
        isActive: ''
      }
    });
    setSubject('');
    setBody(undefined);
    setAttachments([]);
    setIsSubmit(false);
    setPage(page);
    setTemplate({ label: '', value: '' });
    setselectedCareGiver([]);
    setBulkCareGivers(false);
  };

  //Sort by division
  const sortByDivision = (a: any, b: any) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.division.toUpperCase();
    const bandB = b.division.toUpperCase();
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };
  let userId = '',
  appointmentIds:number[] = [],
  requirementIds:number[] = [],
  avabilityIds:number[] = [];
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length > 0) {
    let appointedCells = selectedCellsCareinstitution.filter((cell:any) => cell.item && cell.item.appointments && cell.item.appointments.length && cell.item.appointments[0].id);
    console.log(appointedCells,'appointedCells');  
    userId = selectedCellsCareinstitution[0].id;
    if (appointedCells && appointedCells.length) {
      appointmentIds = appointedCells.map((cell:any) => parseInt(cell.item.appointments[0].id));
      avabilityIds = appointedCells.map((cell:any) => parseInt(cell.item.appointments[0].avabilityId));
      requirementIds = appointedCells.map((cell:any) => parseInt(cell.item.appointments[0].requirementId));
    }
    console.log(appointmentIds,avabilityIds,requirementIds,'requirementIds+++'); 
  }
  useEffect(() => {
    console.log(temporaryWorkerPdf,'temporaryWorkerPdf in use effect');
    if (temporaryWorkerPdf) {
    let documentInput: any = {
      appointmentId: appointmentIds,
      userId: parseInt(userId),
      isDocumentTemplate: false,
      documentUploadType: 'confirmAppointment',
      document: temporaryWorkerPdf
    };
    addUserDocuments({
      variables: {
        documentInput
      }
    });}
  },[temporaryWorkerPdf])
  useEffect(() => {
    if (
      selectedCellsCareinstitution &&
      selectedCellsCareinstitution.length
    )
    setPdfAppointmentDetails(selectedCellsCareinstitution)
  },[selectedCellsCareinstitution])
  useEffect(()=>{
    if (documentRes) {
      const {addUserDocuments={}} = documentRes ? documentRes :{}
      const {fileSize=0,document='',id=''} = addUserDocuments ? addUserDocuments : {}
      setAttachments([{fileName: 'TIM Arbeitnehmerüberlassungsbogen - Supply temporary workers(Care Institution)',url:null,file:null,
        id,
        path:document,
        size:fileSize}])
    }
  },[documentRes])
  //Use Effect for set default email template data
  useEffect(() => {
    console.log(props,'props');
    
    if (data && props.label === 'appointment') {
      if (props.label === 'appointment') {
        if (props.statusTo === 'offered') {
          setSubject('offer appointments by day');
            let apointedCareGiver: any[] = [];
            if (
              selectedCellsCareinstitution &&
              selectedCellsCareinstitution.length
            ) {
              selectedCellsCareinstitution.forEach((element: any) => {
                const {
                  item = {},
                  firstName = '',
                  lastName = '',
                  name=''
                } = element;
                const { appointments = [], division = {} } = item;
                if (appointments && appointments.length) {
                  const { ca = {}, date = '' } =
                    appointments && appointments.length
                      ? appointments[0]
                      : {};
                  if (ca) {
                    let divisionData: string = division
                      ? division.name
                      : name;
                    apointedCareGiver.push({
                      caregivername: ca && ca.name ? ca.name : 'caregiver',
                      date: date,
                      division: divisionData
                    });
                  }
                }
              });
            }
            let divRow: string = '';
            if (props.sortBy === 'day') {
              apointedCareGiver = apointedCareGiver.sort(function (
                a: any,
                b: any
              ) {
                return a.date - b.date;
              });
            } else {
              apointedCareGiver = apointedCareGiver.sort(sortByDivision);
            }
            apointedCareGiver.map((data: any) => {
              divRow += `<span><b>${moment(data.date).format(
                'DD/MM'
              )}${' '}${' '}${data.division}:${' '}${' '}${
                data.caregivername
                }</b></span></br>`;
            });
            const bodyData: any = `<span>We are able to fill your request as follows:-</br></br>${divRow}</br>Please note that each independent caregiver has their own fee. We ask for a short-term confirmation.</span>`;
            const editorState = bodyData
              ? HtmlToDraftConverter(bodyData)
              : '';
            setBody(editorState);

            // setTemplate({
            //   label: emailData.menuEntry,
            //   value: emailData
            // });
          
        }
        if (props.statusTo === 'confirmed') {
          // console.log("in iff",emailData);
          // const { subject } = emailData;
            setSubject('Appointment confirmation');
            let apointedCareGiver: any[] = [];
            let isLeasing: boolean = false;
            if (
              selectedCellsCareinstitution &&
              selectedCellsCareinstitution.length
            ) {
              selectedCellsCareinstitution.forEach((element: any) => {
                const {
                  item = {},
                  firstName = '',
                  lastName = '',
                  name=''
                } = element;
                isLeasing = element.isLeasing;
                const { appointments = [], division = {} } = item;
                if (appointments && appointments.length) {
                  const { ca = {}, date = '' } =
                    appointments && appointments.length
                      ? appointments[0]
                      : {};
                  if (ca) {
                    let divisionData: string = division
                      ? division.name
                      : name;
                    apointedCareGiver.push({
                      caregivername: ca && ca.name ? ca.name : 'caregiver',
                      date: date,
                      division: divisionData
                    });
                  }
                }
              });
            }
            let divRow: string = '';
            if (props.sortBy === 'day') {
              apointedCareGiver = apointedCareGiver.sort(function (
                a: any,
                b: any
              ) {
                return a.date - b.date;
              });
            } else {
              apointedCareGiver = apointedCareGiver.sort(sortByDivision);
            }
            apointedCareGiver.map((data: any) => {
              divRow += `<span><b>${moment(data.date).format(
                'DD/MM'
              )}${' '}${' '}${data.division}:${' '}${' '}${
                data.caregivername
                }</b></span></br>`;
            });
            const bodyData: any = `<span>Appointment confirmation:-</br></br>${divRow}</br>Please note that each self-employed caregiver and assistant has their own fee. The caregiver is informed to contact you by phone before the assignment..</span><br />${
              isLeasing
                ? `<p>${languageTranslation(
                  'CONTRACT_LINE'
                )}</p><p>${languageTranslation('CONTRACT_MAIL_INFO')}</p>`
                : ''
              }`;
            const editorState = bodyData
              ? HtmlToDraftConverter(bodyData)
              : '';
            setBody(editorState);
            // setTemplate({
            //   label: emailData.menuEntry,
            //   value: emailData
            // });
          
        }
        else if (props.unlinkedBy) {
          if (props.unlinkedBy === 'canstitution') {
            let apointedCareGiver: any[] = [];
            if (
              selectedCellsCareinstitution &&
              selectedCellsCareinstitution.length
            ) {
              selectedCellsCareinstitution.forEach((element: any) => {
                const {
                  item = {},
                  firstName = '',
                  lastName = ''
                } = element;
                const { appointments = [], division = {} } = item;
                if (appointments && appointments.length) {
                  const { ca = {}, date = '' } =
                    appointments && appointments.length
                      ? appointments[0]
                      : {};
                  if (ca) {
                    let divisionData: string = division
                      ? division.name
                      : `${firstName}${' '}${lastName}`;
                    apointedCareGiver.push({
                      caregivername: ca && ca.name ? ca.name : 'caregiver',
                      date: date,
                      division: divisionData
                    });
                  }
                }
              });
            }
            let divRow: string = '';
            apointedCareGiver.map((data: any) => {
              divRow += `<span><b>${moment(data.date).format(
                'DD/MM'
              )}${' '}${' '}${data.division}:${' '}${' '}${
                data.caregivername
                }</b></span></br>`;
            });
            const bodyData: any = `<span>We have informed the specialists of your cancellation for the following dates:-</br></br>${divRow}</span>`;
            const editorState = bodyData
              ? HtmlToDraftConverter(bodyData)
              : '';

            let subject: string = `Cancellation confirmation for ${moment(
              apointedCareGiver[0].date
            ).format('DD.MM')},${' '}${apointedCareGiver[0].division}`;
            setBody(editorState);
            setSubject(subject);
            // setTemplate({
            //   label: emailData.menuEntry,
            //   value: emailData
            // });
          } else {
            let apointedCareGiver: any[] = [];
            if (
              selectedCellsCareinstitution &&
              selectedCellsCareinstitution.length
            ) {
              selectedCellsCareinstitution.forEach((element: any) => {
                const {
                  item = {},
                  firstName = '',
                  lastName = ''
                } = element;
                const { appointments = [], division = {} } = item;
                if (appointments && appointments.length) {
                  const { ca = {}, date = '' } =
                    appointments && appointments.length
                      ? appointments[0]
                      : {};
                  if (ca) {
                    let divisionData: string = division
                      ? division.name
                      : `${firstName}${' '}${lastName}`;
                    apointedCareGiver.push({
                      caregivername: ca && ca.name ? ca.name : 'caregiver',
                      date: date,
                      division: divisionData
                    });
                  }
                }
              });
            }
            let divRow: string = '';
            apointedCareGiver.map((data: any) => {
              divRow += `<span><b>${moment(data.date).format(
                'DD/MM'
              )}${' '}${' '}${data.division}:${' '}${' '}${
                data.caregivername
                }</b></span></br>`;
            });
            const bodyData: any = `<span>The specialist has unfortunately cancelled the following dates:-</br></br>${divRow}</span></br>We will immediately look for a replacement and contact you as soon as possible.`;
            const editorState = bodyData
              ? HtmlToDraftConverter(bodyData)
              : '';

            let subject: string = `Appointment cancellation for ${moment(
              apointedCareGiver[0].date
            ).format('MMM Do')},${' '}1:1 ${apointedCareGiver[0].division}`;
            setBody(editorState);
            setSubject(subject);
            setTemplate({
              label: '',
              value: ''
            });
          }
        }
        else if (
          // emailData.menuEntry === 'Acknowledge for offer sent' &&
          props.statusTo === '' &&
          !props.unlinkedBy
        ) {
          // const { subject, body, attachments } = emailData;
          setSubject('Acknowledge for offer sent');
          setBody(HtmlToDraftConverter('<span>we have just sent your request to all suitable nursing staff.<br /><br /><span> We will inform you immediately as soon as a nurse reports it.</span>'));
          // setAttachments(
          //   attachments
          //     ? attachments.map(
          //       ({ name, id, path, size }: INewEmailAttachments) => ({
          //         fileName: name,
          //         id,
          //         path,
          //         size
          //       })
          //     )
          //     : []
          // );

          // setTemplate({
          //   label: emailData.menuEntry,
          //   value: emailData
          // });
        }
      }
      // const {
      //   getEmailtemplate: { email_templates }
      // } = data;
      // if (email_templates && email_templates.length) {
      //   email_templates.map((emailData: IEmailTemplateData & any) => {
      //     if (props.label === 'appointment') {
      //       if (props.statusTo === 'offered') {
      //         if (emailData.menuEntry === 'offer appointments by day') {
      //           const { subject } = emailData;
      //           setSubject(subject);
      //           let apointedCareGiver: any[] = [];
      //           if (
      //             selectedCellsCareinstitution &&
      //             selectedCellsCareinstitution.length
      //           ) {
      //             selectedCellsCareinstitution.forEach((element: any) => {
      //               const {
      //                 item = {},
      //                 firstName = '',
      //                 lastName = ''
      //               } = element;
      //               const { appointments = [], division = {} } = item;
      //               if (appointments && appointments.length) {
      //                 const { ca = {}, date = '' } =
      //                   appointments && appointments.length
      //                     ? appointments[0]
      //                     : {};
      //                 if (ca) {
      //                   let divisionData: string = division
      //                     ? division.name
      //                     : `${firstName}${' '}${lastName}`;
      //                   apointedCareGiver.push({
      //                     caregivername: ca && ca.name ? ca.name : 'caregiver',
      //                     date: date,
      //                     division: divisionData
      //                   });
      //                 }
      //               }
      //             });
      //           }
      //           let divRow: string = '';
      //           if (props.sortBy === 'day') {
      //             apointedCareGiver = apointedCareGiver.sort(function (
      //               a: any,
      //               b: any
      //             ) {
      //               return a.date - b.date;
      //             });
      //           } else {
      //             apointedCareGiver = apointedCareGiver.sort(sortByDivision);
      //           }
      //           apointedCareGiver.map((data: any) => {
      //             divRow += `<span><b>${moment(data.date).format(
      //               'DD/MM'
      //             )}${' '}${' '}${data.division}:${' '}${' '}${
      //               data.caregivername
      //               }</b></span></br>`;
      //           });
      //           const bodyData: any = `<span>We are able to fill your request as follows:-</br></br>${divRow}</br>Please note that each independent caregiver has their own fee. We ask for a short-term confirmation.</span>`;
      //           const editorState = bodyData
      //             ? HtmlToDraftConverter(bodyData)
      //             : '';
      //           setBody(editorState);

      //           setTemplate({
      //             label: emailData.menuEntry,
      //             value: emailData
      //           });
      //         }
      //       }
      //       if (props.statusTo === 'confirmed') {
      //         console.log("in iff",emailData);
              
      //         if (emailData.menuEntry === 'Appointment Confirmation') {
      //           const { subject } = emailData;
      //           setSubject(subject);
      //           let apointedCareGiver: any[] = [];
      //           let isLeasing: boolean = false;
      //           if (
      //             selectedCellsCareinstitution &&
      //             selectedCellsCareinstitution.length
      //           ) {
      //             selectedCellsCareinstitution.forEach((element: any) => {
      //               const {
      //                 item = {},
      //                 firstName = '',
      //                 lastName = ''
      //               } = element;
      //               isLeasing = element.isLeasing;
      //               const { appointments = [], division = {} } = item;
      //               if (appointments && appointments.length) {
      //                 const { ca = {}, date = '' } =
      //                   appointments && appointments.length
      //                     ? appointments[0]
      //                     : {};
      //                 if (ca) {
      //                   let divisionData: string = division
      //                     ? division.name
      //                     : `${firstName}${' '}${lastName}`;
      //                   apointedCareGiver.push({
      //                     caregivername: ca && ca.name ? ca.name : 'caregiver',
      //                     date: date,
      //                     division: divisionData
      //                   });
      //                 }
      //               }
      //             });
      //           }
      //           let divRow: string = '';
      //           if (props.sortBy === 'day') {
      //             apointedCareGiver = apointedCareGiver.sort(function (
      //               a: any,
      //               b: any
      //             ) {
      //               return a.date - b.date;
      //             });
      //           } else {
      //             apointedCareGiver = apointedCareGiver.sort(sortByDivision);
      //           }
      //           apointedCareGiver.map((data: any) => {
      //             divRow += `<span><b>${moment(data.date).format(
      //               'DD/MM'
      //             )}${' '}${' '}${data.division}:${' '}${' '}${
      //               data.caregivername
      //               }</b></span></br>`;
      //           });
      //           const bodyData: any = `<span>Appointment confirmation:-</br></br>${divRow}</br>Please note that each self-employed caregiver and assistant has their own fee. The caregiver is informed to contact you by phone before the assignment..</span><br />${
      //             isLeasing
      //               ? `<p>${languageTranslation(
      //                 'CONTRACT_LINE'
      //               )}</p><p>${languageTranslation('CONTRACT_MAIL_INFO')}</p>`
      //               : ''
      //             }`;
      //           const editorState = bodyData
      //             ? HtmlToDraftConverter(bodyData)
      //             : '';
      //           setBody(editorState);
      //           setTemplate({
      //             label: emailData.menuEntry,
      //             value: emailData
      //           });
      //         }
      //       }
      //       if (props.unlinkedBy) {
      //         if (props.unlinkedBy === 'canstitution') {
      //           let apointedCareGiver: any[] = [];
      //           if (
      //             selectedCellsCareinstitution &&
      //             selectedCellsCareinstitution.length
      //           ) {
      //             selectedCellsCareinstitution.forEach((element: any) => {
      //               const {
      //                 item = {},
      //                 firstName = '',
      //                 lastName = ''
      //               } = element;
      //               const { appointments = [], division = {} } = item;
      //               if (appointments && appointments.length) {
      //                 const { ca = {}, date = '' } =
      //                   appointments && appointments.length
      //                     ? appointments[0]
      //                     : {};
      //                 if (ca) {
      //                   let divisionData: string = division
      //                     ? division.name
      //                     : `${firstName}${' '}${lastName}`;
      //                   apointedCareGiver.push({
      //                     caregivername: ca && ca.name ? ca.name : 'caregiver',
      //                     date: date,
      //                     division: divisionData
      //                   });
      //                 }
      //               }
      //             });
      //           }
      //           let divRow: string = '';
      //           apointedCareGiver.map((data: any) => {
      //             divRow += `<span><b>${moment(data.date).format(
      //               'DD/MM'
      //             )}${' '}${' '}${data.division}:${' '}${' '}${
      //               data.caregivername
      //               }</b></span></br>`;
      //           });
      //           const bodyData: any = `<span>We have informed the specialists of your cancellation for the following dates:-</br></br>${divRow}</span>`;
      //           const editorState = bodyData
      //             ? HtmlToDraftConverter(bodyData)
      //             : '';

      //           let subject: string = `Cancellation confirmation for ${moment(
      //             apointedCareGiver[0].date
      //           ).format('DD.MM')},${' '}${apointedCareGiver[0].division}`;
      //           setBody(editorState);
      //           setSubject(subject);
      //           setTemplate({
      //             label: emailData.menuEntry,
      //             value: emailData
      //           });
      //         } else {
      //           let apointedCareGiver: any[] = [];
      //           if (
      //             selectedCellsCareinstitution &&
      //             selectedCellsCareinstitution.length
      //           ) {
      //             selectedCellsCareinstitution.forEach((element: any) => {
      //               const {
      //                 item = {},
      //                 firstName = '',
      //                 lastName = ''
      //               } = element;
      //               const { appointments = [], division = {} } = item;
      //               if (appointments && appointments.length) {
      //                 const { ca = {}, date = '' } =
      //                   appointments && appointments.length
      //                     ? appointments[0]
      //                     : {};
      //                 if (ca) {
      //                   let divisionData: string = division
      //                     ? division.name
      //                     : `${firstName}${' '}${lastName}`;
      //                   apointedCareGiver.push({
      //                     caregivername: ca && ca.name ? ca.name : 'caregiver',
      //                     date: date,
      //                     division: divisionData
      //                   });
      //                 }
      //               }
      //             });
      //           }
      //           let divRow: string = '';
      //           apointedCareGiver.map((data: any) => {
      //             divRow += `<span><b>${moment(data.date).format(
      //               'DD/MM'
      //             )}${' '}${' '}${data.division}:${' '}${' '}${
      //               data.caregivername
      //               }</b></span></br>`;
      //           });
      //           const bodyData: any = `<span>The specialist has unfortunately canceled the following dates:-</br></br>${divRow}</span></br>We will immediately look for a replacement and contact you as soon as possible.`;
      //           const editorState = bodyData
      //             ? HtmlToDraftConverter(bodyData)
      //             : '';

      //           let subject: string = `Appointment cancellation for ${moment(
      //             apointedCareGiver[0].date
      //           ).format('MMM Do')},${' '}1:1 ${apointedCareGiver[0].division}`;
      //           setBody(editorState);
      //           setSubject(subject);
      //           setTemplate({
      //             label: '',
      //             value: ''
      //           });
      //         }
      //       }
      //       if (
      //         emailData.menuEntry === 'Acknowledge for offer sent' &&
      //         props.statusTo === '' &&
      //         !props.unlinkedBy
      //       ) {
      //         const { subject, body, attachments } = emailData;
      //         const editorState = body ? HtmlToDraftConverter(body) : '';
      //         setSubject(subject);
      //         setBody(editorState);
      //         setAttachments(
      //           attachments
      //             ? attachments.map(
      //               ({ name, id, path, size }: INewEmailAttachments) => ({
      //                 fileName: name,
      //                 id,
      //                 path,
      //                 size
      //               })
      //             )
      //             : []
      //         );

      //         setTemplate({
      //           label: emailData.menuEntry,
      //           value: emailData
      //         });
      //       }
      //     }
      //   });
      // }
    }
  }, [data]);

  const handleSelectAll = async () => {
    if (careInstitutions && careInstitutions.careInstitutionData.length) {
      let list: any = [];
      if (!bulkcareGivers) {
        careInstitutions.careInstitutionData.map((key: any) => {
          return (list = [...list, parseInt(key.id)]);
        });
        setselectedCareGiver(list);
        setBulkCareGivers(true);
      } else {
        setselectedCareGiver([]);
        setBulkCareGivers(false);
      }
    }
  };

  const handleCheckElement = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { target } = e;
    const { checked } = target;

    if (checked) {
      setselectedCareGiver((selectedCareGiver: any) => [
        ...selectedCareGiver,
        parseInt(id)
      ]);
      if (
        careInstitutions &&
        careInstitutions.length === selectedCareGiver.length + 1
      ) {
        setBulkCareGivers(true);
      } else {
        setBulkCareGivers(false);
      }
    } else {
      if (selectedCareGiver.indexOf(parseInt(id)) > -1) {
        selectedCareGiver.splice(selectedCareGiver.indexOf(parseInt(id)), 1);
        setselectedCareGiver([...selectedCareGiver]);
      }
      if (
        careInstitutions &&
        careInstitutions.length === selectedCareGiver.length
      ) {
        setBulkCareGivers(true);
      } else {
        setBulkCareGivers(false);
      }
    }
  };

  console.log("careInstData",careInstData);
  

  const handleSendEmail = (e: React.FormEvent<any>) => {
    e.preventDefault();
    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : '';
    const result = stripHtml(content);
    setIsSubmit(true);

    try {
      let careGiverIdList: any = [];
      const { getCareInstitution = {} } = careInstData ? careInstData : {};
      const {
        id = "",
        contact = []
      } = getCareInstitution ? getCareInstitution : {};

      if (selectedCareGiver && selectedCareGiver.length) {
        // Remove duplicate values from an array of objects
        let uniqueUser = selectedCareGiver.reduce((unique: any, key: any) => {
          if (
            !unique.some(
              (obj: any) => obj.label === key.label && obj.value === key.value
            )
          ) {
            unique.push(key);
          }
          return unique;
        }, []);

        for (let index = 0; index < selectedCareGiver.length; index++) {
          const element = selectedCareGiver[index];
          if (uniqueUser[uniqueUser.length - 1] !== element) {
            uniqueUser.push(element);
          }
        }

        uniqueUser.map((careGiverId: number) => {
          if(contact && contact.length){
            let tempC:any =  contact.filter((e:any) => parseInt(e.id) === careGiverId);
             if(tempC && tempC.length){
            careGiverIdList.push({ contactId: careGiverId });
             }else{
            careGiverIdList.push({ receiverUserId: careGiverId });
             }
          }else{
            careGiverIdList.push({ receiverUserId: careGiverId });
          }
        });

        if (subject && body && result && result.length >= 2) {
          const bulkEmailsInput: IBulkEmailVariables = {
            to: 'canstitution',
            from: 'plycoco',
            subject: subject /* .replace(/AW:/g, '') */,
            body: body ? content : '',
            parentId: null,
            status: 'unread',
            type: props.label === 'appointment' ? 'offer' : 'email',
            attachments:
              attachments && attachments.length
                ? attachments.filter((attachment: any) => attachment.path)
                : [],
            files:
              attachments && attachments.length
                ? attachments
                  .map((item: IEmailAttachmentData) => item.file)
                  .filter((file: File | null) => file)
                : null,
            canstitution: careGiverIdList,
            senderUserId: id ? parseInt(id) : null
          };
           bulkEmails({ variables: { bulkEmailsInput } });
        }
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.error(
            languageTranslation('EMAIL_SELECT_CARE_GIVERS', {
              userRole: languageTranslation('CAREINST_USERROLE')
            })
          );
        }
      }
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      toast.error(message);
    }
  };

  const onDelteDocument = async (
    attachmentId: string,
    attachmentIndex?: number
  ) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMAIL_ATTACHMENT_REMOVE_MSG')
    });
    if (!value) {
      return;
    } else {
      setAttachments((prevArray: any) =>
        prevArray.filter((_: any, index: number) => attachmentIndex !== index)
      );
    }
  };

  const uploadDocument = (data: IEmailAttachmentData) => {
    setAttachments((prevArray: any) => [data, ...prevArray]);
  };

  const onEditorStateChange = (editorState: any): void => {
    setBody(editorState);
  };

  const handleChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  // set subject & body on template selection
  const onTemplateSelection = (selectedOption: any) => {
    const {
      getEmailtemplate: { email_templates }
    } = data;
    setTemplate(selectedOption);
    const templateData = email_templates.filter(
      ({ id }: IEmailTemplateData) => id === parseInt(selectedOption.value)
    )[0];
    if (templateData) {
      const { subject, body, attachments } = templateData;
      const editorState = body ? HtmlToDraftConverter(body) : '';
      setSubject(subject);
      setBody(editorState);
      setAttachments(
        attachments
          ? attachments.map(
            ({ name, id, path, size }: INewEmailAttachments) => ({
              fileName: name,
              id,
              path,
              size
            })
          )
          : []
      );
    }
  };

  const templateOptions: IReactSelectInterface[] | undefined = [];
  if (data && data.getEmailtemplate) {
    const {
      getEmailtemplate: { email_templates }
    } = data;

    if (email_templates && email_templates.length) {
      email_templates.map(({ menuEntry, id }: IEmailTemplateData) => {
        templateOptions.push({
          label: menuEntry,
          value: id ? id.toString() : ''
        });
      });
    }
  }

  const isLeasingRequirement = selectedCellsCareinstitution.findIndex((cell:any) => cell.item && cell.item.isLeasing) > -1 ? true :false

  console.log(isLeasingRequirement,'isLeasingRequirement');
  
  console.log(temporaryWorkerPdf,'temporaryWorkerPdf',pdfAppointmentDetails,!temporaryWorkerPdf && confirmAppointment && pdfAppointmentDetails && pdfAppointmentDetails.length > 0);
  
  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <div className='sticky-common-header'>
            <div className='common-topheader d-flex align-items-center px-2 mb-1'>
              <div
                className={
                  props.label === 'appointment'
                    ? 'header-nav-item disabled-class'
                    : 'header-nav-item'
                }
                onClick={props.label !== 'appointment' ? onRefresh : undefined}
              >
                <span className='header-nav-icon'>
                  <img src={refresh} alt='' />
                </span>
                <span className='header-nav-text'>
                  {languageTranslation('REFRESH')}
                </span>
              </div>
              {/* <div className='header-nav-item'>
                <span className='header-nav-icon'>
                  <img src={filter} alt='' />
                </span>
                <span className='header-nav-text'>
                  {languageTranslation('ATTRIBUTES')}
                </span>
              </div> */}
              {/* <div className='ml-auto'>
                <Button
                  color='primary'
                  onClick={handleSendEmail}
                  className='btn-email-save ml-auto mr-2 btn btn-primary'
                >
                  <i className='fa fa-spinner fa-spin mr-2' />
                  <span>{languageTranslation('SEND')}</span>
                </Button>
              </div> */}
              <div className='ml-auto'>
                <Button
                  color='primary'
                  onClick={handleSendEmail}
                  className='btn-email-save ml-auto mr-2 btn btn-primary'
                >
                  {bulkEmailLoading ? (
                    <i className='fa fa-spinner fa-spin mr-2' />
                  ) : (
                      <i
                        className='fa fa-paper-plane mr-2'
                        aria-hidden='true'
                      ></i>
                    )}
                  <span>{languageTranslation('SEND')}</span>
                </Button>
              </div>
            </div>
          </div>

          <div className='common-content flex-grow-1'>
            <div className='bulk-email-section'>
              <Row>
              {isLeasingRequirement && !temporaryWorkerPdf && confirmAppointment && pdfAppointmentDetails && pdfAppointmentDetails.length > 0 ? (
                  <PDFDownloadLink
                    document={
                      <ConfirmAppointmentPdf
                        selectedCellsCareinstitution={pdfAppointmentDetails}
                      />
                    }
                  >
                    {({ blob, url, loading, error }: any) =>
                      !loading ?
                      setTemporaryWorkerPdf(blob) : null
                    }
                  </PDFDownloadLink>
                ) : null}
                <CareInstitutionListComponent
                  careInstData={careInstData}
                  handleSelectAll={handleSelectAll}
                  called={called}
                  loading={dataLoading}
                  careInstitutions={careInstitutions}
                  setCareInstitution={setCareInstitution}
                  selectedCareGiver={selectedCareGiver}
                  handleCheckElement={handleCheckElement}
                  page={page}
                  label={props.label}
                  bulkcareGivers={bulkcareGivers}
                />
                <EmailEditorComponent
                  body={body}
                  templateOptions={templateOptions}
                  subject={subject}
                  onTemplateSelection={onTemplateSelection}
                  onEditorStateChange={onEditorStateChange}
                  template={template}
                  handleChangeSubject={handleChangeSubject}
                  attachments={attachments}
                  uploadDocument={uploadDocument}
                  onDelteDocument={onDelteDocument}
                  isSubmit={isSubmit}
                />
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkEmailCareInstitution;
