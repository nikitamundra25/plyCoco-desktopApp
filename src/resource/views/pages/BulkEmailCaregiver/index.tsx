import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks';
import {
  languageTranslation,
  HtmlToDraftConverter,
  stripHtml
} from '../../../../helpers';
import {
  CareGiverQueries,
  EmailTemplateQueries,
  ProfileQueries,
  AppointmentsQueries,
  CareInstitutionQueries
} from '../../../../graphql/queries';
import { BulkEmailCareGivers, DocumentUploadMutations } from '../../../../graphql/Mutations';
import {
  IReactSelectInterface,
  IEmailTemplateData,
  INewEmailAttachments,
  IEmailAttachmentData
} from '../../../../interfaces';
import { EmailEditorComponent } from './EmailFormComponent';
import { ConfirmBox } from '../../components/ConfirmBox';
import { CareGiverListComponent } from './CareGiverListComponent';
import { IBulkEmailVariables } from '../../../../interfaces';
import { errorFormatter } from '../../../../helpers';
import filter from '../../../assets/img/filter.svg';
import refresh from '../../../assets/img/refresh.svg';
import './index.scss';
import { useHistory } from 'react-router';
import { AppRoutes, client } from '../../../../config';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './PDF/MyDocument';

const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [, , , , , , GET_CAREGIVERS_FOR_BULK_EMAIL] = CareGiverQueries;
const [BULK_EMAILS] = BulkEmailCareGivers;
const [VIEW_PROFILE] = ProfileQueries;
const [
  GET_USERS_BY_QUALIFICATION_ID,
  ,
  ,
  ,
  GET_REQUIRMENT_FOR_CAREGIVER_QUALIFICATION
] = AppointmentsQueries;

const [, , , , , , GET_DIVISION_DETAILS_BY_ID] = CareInstitutionQueries;
const [ADD_DOCUMENT] = DocumentUploadMutations;

let toastId: any = null;

const BulkEmailCaregiver: FunctionComponent<any> = (props: any) => {
  const {
    selectedCellsCareinstitution,
    selectedCells,
    offerRequirements,
    leasingContract,
    qualificationList,
    terminateAggrement
  } = props;
  let [selectedCareGiver, setselectedCareGiver] = useState<any>([]);
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
  // To get caregiver list from db
  const [
    fetchCareGiverList,
    { data: careGivers, called, loading, refetch, fetchMore }
  ] = useLazyQuery<any, any>(GET_CAREGIVERS_FOR_BULK_EMAIL, {
    fetchPolicy: 'no-cache'
  });

  // Mutation to leasing document
  const [addUserDocuments] = useMutation<
    { addUserDocuments: any },
    { documentInput: any }
  >(ADD_DOCUMENT);

  // To fetch caregivers by qualification id
  const [
    fetchCaregiverListFromQualification,
    {
      data: careGiversList,
      called: careGiverListCalled,
      loading: caregiverLoading,
      refetch: caregiverQulliRefetch,
      fetchMore: caregiverListFetch
    }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch requirments by selected caregiver qualification id
  const [
    fetchRequirmentFromQualification,
    { data: requirmentList, loading: requirmentListLoading }
  ] = useLazyQuery<any, any>(GET_REQUIRMENT_FOR_CAREGIVER_QUALIFICATION, {
    fetchPolicy: 'no-cache'
  });

  //Get requirment list data for qualificationid
  useEffect(() => {
  }, [requirmentList]);

  //Get Data for selected cell
  useEffect(() => {
    if (selectedCells && selectedCells.length) {
      const { qualificationIds = [] } = selectedCells[0];
      if (qualificationIds && qualificationIds.length) {
        fetchRequirmentFromQualification({
          variables: {
            qualificationId: qualificationIds
          }
        });
      }
    }
  }, [selectedCells]);

  // To fetch users according to qualification selected
  useEffect(() => {
    if (props.label === 'appointment') {
      let temp: any = [];
      if (props.qualification && props.qualification.length) {
        props.qualification.map((key: any, index: number) => {
          if (key.value) {
            temp.push(parseInt(key.value));
          } else {
            temp.push(parseInt(key));
          }
        });
      }
      // get careGivers list
      fetchCaregiverListFromQualification({
        variables: {
          qualificationId: temp ? temp : [],
          positiveAttributeId: [],
          negativeAttributeId: [],
          userRole: 'caregiver',
          limit: 30,
          page,
          gte: props.gte,
          lte: props.lte
        }
      });
    }
  }, [props.qualification]);

  // To get all the types of email template
  // const { data: typeList } = useQuery(GET_EMAIL_TEMPLATE_TYEPS);
  //To get all email templates of care giver addded in system
  const { data, loading: fetchTemplateListLoading } = useQuery<any>(
    GET_CAREGIVER_EMAIL_TEMPLATES,
    {
      variables: {
        type: languageTranslation('CAREGIVER_EMAIL_TEMPLATE_TYPE')
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
  const [pdfData, setPdfData] = useState<any>();

  const [bulkEmails, { loading: bulkEmailLoading }] = useMutation<{
    bulkEmailsInput: IBulkEmailVariables;
  }>(BULK_EMAILS, {
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
    // Fetch list of caregivers
    if (props.label !== 'appointment') {
      fetchCareGiverList({
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

  const [careGiverData, setcareGiverData] = useState<Object[]>([]);
  const [careGiverConfirm, setCaregiverConfirm] = useState<Object[]>([]);
  // get care giver list according to selected qualification in appointment section

  useEffect(() => {
    let list: any = [...careGiverData];
    if (selectedCells && (props.confirmApp || offerRequirements)) {
      if (selectedCells && selectedCells.length) {
        selectedCells.map((key: any) => {
          if (list && list.length) {
            if (list.findIndex((item: any) => item && item.id === key.id) < 0) {
              return (list = [...list, key]);
            }
          } else {
            return (list = [...list, key]);
          }
        });
        setcareGiverData(list);
      }
    } else if (selectedCells && props.unlinkedBy) {
      if (selectedCells && selectedCells.length) {
        selectedCells.map((key: any) => {
          if (list && list.length) {
            if (list.findIndex((item: any) => item && item.id === key.id) < 0) {
              return (list = [...list, key]);
            }
          } else {
            return (list = [...list, key]);
          }
        });
        setcareGiverData(list);
      }
    } else if (selectedCells && terminateAggrement) {
      if (selectedCells && selectedCells.length) {
        selectedCells.map((key: any) => {
          if (list && list.length) {
            if (list.findIndex((item: any) => item && item.id === key.id) < 0) {
              return (list = [...list, key]);
            }
          } else {
            return (list = [...list, key]);
          }
        });
        setcareGiverData(list);
      }
    } else {
      if (careGiversList) {
        const { getUserByQualifications } = careGiversList;
        const { result } = getUserByQualifications;
        if (result && result.length) {
          result.map((key: any) => {
            return (list = [...list, key]);
          });
        }
        setcareGiverData(list);
        let selectedId: any = [];
        if (bulkcareGivers) {
          list.map((key: any) => {
            return (selectedId = [...selectedId, parseInt(key.id)]);
          });
          setselectedCareGiver(selectedId);
        }
      }
    }
  }, [careGiversList]);

  useEffect(() => {
    let list: any = [...careGiverData];
    if (careGivers) {
      const { getCaregivers } = careGivers;
      const { result } = getCaregivers;
      if (result && result.length) {
        result.map((key: any) => {
          return (list = [...list, key]);
        });
      }
      setcareGiverData(list);
      let selectedId: any = [];
      if (bulkcareGivers) {
        list.map((key: any) => {
          return (selectedId = [...selectedId, parseInt(key.id)]);
        });
        setselectedCareGiver(selectedId);
      }
    }
  }, [careGivers]);

  // Refresh component
  const onRefresh = () => {
    // refetch();
    fetchCareGiverList({
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
    setcareGiverData([]);
  };

  const handleInfiniteScroll = () => {
    setPage(page + 1);
    if (props.label !== 'appointment') {
      fetchMore({
        variables: {
          page: page + 1
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          if (prev.getCaregivers) {
            let list = [
              ...careGiverData,
              ...fetchMoreResult.getCaregivers.result
            ];
            setcareGiverData((prevArray: any) => [
              ...prevArray,
              ...fetchMoreResult.getCaregivers.result
            ]);
            let selectedId: any = [];
            if (bulkcareGivers) {
              list.forEach(caregiver => {
                selectedId = [...selectedId, parseInt(caregiver.id)];
              });
              setselectedCareGiver(selectedId);
            }
            return Object.assign({}, prev, {
              getCaregivers: {
                ...prev.getCaregivers,
                result: [
                  ...prev.getCaregivers.result,
                  ...fetchMoreResult.getCaregivers.result
                ]
              }
            });
          }
        }
      });
    } else {
      caregiverListFetch({
        variables: {
          page: page + 1
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          if (prev.getUserByQualifications) {
            let list = [
              ...careGiverData,
              ...fetchMoreResult.getUserByQualifications.result
            ];
            setcareGiverData((prevArray: any) => [
              ...prevArray,
              ...fetchMoreResult.getUserByQualifications.result
            ]);
            let selectedId: any = [];
            if (bulkcareGivers) {
              list.forEach(caregiver => {
                selectedId = [...selectedId, parseInt(caregiver.id)];
              });
              setselectedCareGiver(selectedId);
            }
            return Object.assign({}, prev, {
              getUserByQualifications: {
                ...prev.getUserByQualifications,
                result: [
                  ...prev.getUserByQualifications.result,
                  ...fetchMoreResult.getUserByQualifications.result
                ]
              }
            });
          }
        }
      });
    }
  };

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

  //Use Effect for email template data
  useEffect(() => {
    if (props.label === 'appointment' && !offerRequirements) {
      if (props.sortBy === 'division' || props.sortBy === 'day') {
        let qualificationArray: any = [];
        let qualificationString: string = '';
        let remarkRow: string = '';
        let divisionArray: any = [];
        let subjectDivisions: any = [];
        let isLeasing: boolean = false;
        for (let i = 0; i < selectedCellsCareinstitution.length; i++) {
          let object = selectedCellsCareinstitution[i];
          // If careInstitution has leasing attribute
          isLeasing = object.isLeasing;
          if (object.item) {
            let obj: any = {};
            if (
              object.item.id &&
              object.item.division &&
              object.item.division.name
            ) {
              subjectDivisions.push(object.item.division.name);
            }
            let shiftLabel =
              object.item.startTime === '06:00'
                ? 'FD'
                : object.item.startTime === '14:00'
                  ? 'SD'
                  : 'ND';

            obj.id = object.item.id;
            obj.division = object.item.division
              ? object.item.division.name
              : '';
            obj.shiftLabel = shiftLabel;
            obj.day = moment(object.item.date).format('D');
            obj.month = moment(object.item.date).format('MMM');
            obj.date = moment(object.item.date).format('DD.MM');
            obj.duration = moment
              .utc(
                moment(object.item.endTime, 'HH:mm').diff(
                  moment(object.item.startTime, 'HH:mm')
                )
              )
              .format('H.m');
            divisionArray.push(obj);
            if (object.item.departmentOfferRemarks) {
              remarkRow += `<p>${object.item.departmentOfferRemarks}</p>`;
            }
            for (let j = 0; j < object.item.qualificationId.length; j++) {
              let q = object.item.qualificationId[j];
              if (!qualificationArray.includes(q)) {
                qualificationArray.push(q);
              }
            }
          }
        }
        let temp: any = [];
        qualificationArray.map((i: any) => {
          temp.push(i.label);
        });
        qualificationString = temp.join();

        let uniqueDivisions = subjectDivisions.filter(
          (item: any, i: any, ar: any) => ar.indexOf(item) === i
        );

        if (props.sortBy === 'day') {
          divisionArray = divisionArray.sort(function (a: any, b: any) {
            return a.date - b.date;
          });
        } else {
          divisionArray = divisionArray.sort(sortByDivision);
        }

        let divRow: string = '';
        let customSub: string = 'Offer ';
        divisionArray.map((v: any, i: number) => {
          if (v.id) {
            divRow += `<p>${v.date +
              ' ' +
              v.shiftLabel +
              ' ' +
              v.duration +
              'h ' +
              (v.division ? v.division : ' - ') +
              '  ' +
              languageTranslation('APPOINTMENTID') +
              '=' +
              v.id}</p>`;
            if (i == 0) {
              customSub += `${v.month + ' ' + v.day + '.' + v.shiftLabel},`;
            } else {
              customSub += `${' ' + v.day + '.' + v.shiftLabel},`;
            }
          }
        });

        if (uniqueDivisions.length == 1) {
          customSub += `${' ' + uniqueDivisions[0]}`;
        }

        let mailBody: any = '';
        mailBody = `<p>${languageTranslation('CAREGIVER_OFFER_EMAIL_HEADING')}
          </p><br/>${
          isLeasing
            ? `<p>${languageTranslation('LEASING_OFFER')}</p></BR>`
            : ''
          }<p>${languageTranslation(
            'CAREGIVER_OFFER_EMAIL_QUALIFICATION_WANTED'
          ) +
          ' ' +
          qualificationString}</p><br/>${divRow}</br>${
          props.showButton
            ? `</br><p><a href="http://78.47.143.190:8000/">Direct Booking</a></p></br>`
            : ''
          }${remarkRow}</br><p>${languageTranslation('FEE') +
          ':' +
          languageTranslation('FEE_TEXT')}</p>${
          isLeasing
            ? `<p>${languageTranslation(
              'LEASING_OFFERS_BEHALF_OF_TIMYOCY_FOOTER'
            )}</p>`
            : ''
          }`;
        // }

        const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
        setSubject(customSub);
        setBody(editorState);
      } else {
        let qualificationArray: any = [];
        let qualificationString: string = '';
        let remarkRow: string = '';
        let divisionArray: any = [];

        for (let i = 0; i < selectedCellsCareinstitution.length; i++) {
          let object = selectedCellsCareinstitution[i];
          if (object.item) {
            let obj: any = {};
            let shiftLabel =
              object.item.startTime === '06:00'
                ? 'FD'
                : object.item.startTime === '14:00'
                  ? 'SD'
                  : 'ND';

            obj.id = object.item.id;
            obj.division = object.item.division
              ? object.item.division.name
              : '';
            obj.shiftLabel = shiftLabel;
            obj.day = moment(object.item.date).format('D');
            obj.month = moment(object.item.date).format('MMM');
            obj.date = moment(object.item.date).format('DD.MM');
            obj.duration = moment
              .utc(
                moment(object.item.endTime, 'HH:mm').diff(
                  moment(object.item.startTime, 'HH:mm')
                )
              )
              .format('H.m');
            divisionArray.push(obj);
            if (object.item.departmentOfferRemarks) {
              remarkRow += `<p>${object.item.departmentOfferRemarks}</p>`;
            }

            if (object.item.qualificationId) {
              for (let j = 0; j < object.item.qualificationId.length; j++) {
                let q = object.item.qualificationId[j];
                if (!qualificationArray.includes(q)) {
                  qualificationArray.push(q);
                }
              }
            }
          }
        }
        let temp: any = [];
        qualificationArray.map((i: any) => {
          temp.push(i.label);
        });
        qualificationString = temp.join();

        if (props.sortBy === 'day') {
          divisionArray = divisionArray.sort(function (a: any, b: any) {
            return a.date - b.date;
          });
        } else {
          divisionArray = divisionArray.sort(sortByDivision);
        }

        let divRow: string = '';
        divisionArray.map((v: any, i: number) => {
          if (v.id) {
            divRow += `<p>${v.date +
              ' ' +
              v.shiftLabel +
              ' ' +
              v.duration +
              'h ' +
              (v.division ? v.division : ' - ') +
              '  ' +
              languageTranslation('APPOINTMENTID') +
              '=' +
              v.id}</p>`;
          }
        });

        let mailBody = `<p>${languageTranslation(
          'CAREGIVER_OFFER_EMAIL_HEADING'
        )}</p><br/><p>${languageTranslation(
          'LEASING_OFFER'
        )}</p></BR><p>${languageTranslation(
          'CAREGIVER_OFFER_EMAIL_QUALIFICATION_WANTED'
        ) +
        ' ' +
        qualificationString}</p><br/>${divRow}</br>${remarkRow}</br><p>${languageTranslation(
          'FEE'
        ) +
        ':' +
        languageTranslation('FEE_TEXT')}</p><p>${languageTranslation(
          'LEASING_OFFERS_BEHALF_OF_TIMYOCY_FOOTER'
        )}</p>`;

        const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
        setSubject(languageTranslation('CAREGIVER_OFFER_EMAIL_SUBJECT'));
        setBody(editorState);
      }

      if (props.unlinkedBy) {
        if (props.unlinkedBy === 'canstitution') {
          let apointedCareGiver: any[] = [];
          if (
            selectedCellsCareinstitution &&
            selectedCellsCareinstitution.length
          ) {
            selectedCellsCareinstitution.forEach((element: any) => {
              const { item = {}, firstName = '', lastName = '' } = element;
              const { appointments = [], division = {} } = item;
              if (appointments && appointments.length) {
                const { ca = {}, date = '' } =
                  appointments && appointments.length ? appointments[0] : {};
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
          const bodyData: any = `<span>The facility has unfortunately canceled the following dates::-</br></br>${divRow}</br>The canceled dates have been marked as "free" and you will immediately receive offers for these days</span>`;
          const editorState = bodyData ? HtmlToDraftConverter(bodyData) : '';

          let subject: string = `Appointment cancellation for ${moment(
            apointedCareGiver[0].date
          ).format('DD.MM')}`;
          setBody(editorState);
          setSubject(subject);
          setTemplate({
            label: '',
            value: ''
          });
        } else if (!props.confirmApp) {
          let apointedCareGiver: any[] = [];
          if (
            selectedCellsCareinstitution &&
            selectedCellsCareinstitution.length
          ) {
            selectedCellsCareinstitution.forEach((element: any) => {
              const { item = {}, firstName = '', lastName = '' } = element;
              const { appointments = [], division = {} } = item;
              if (appointments && appointments.length) {
                const { ca = {}, date = '' } =
                  appointments && appointments.length ? appointments[0] : {};
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
          const bodyData: any = `<span>We have informed the institution of your cancellation for the following dates:-</br></br>${divRow}</span>`;
          const editorState = bodyData ? HtmlToDraftConverter(bodyData) : '';

          let subject: string = `Appointment cancellation confirmation for ${moment(
            apointedCareGiver[0] ? apointedCareGiver[0].date : ''
          ).format('MMM Do')},${' '}1:1 ${apointedCareGiver[0].division}`;
          setBody(editorState);
          setSubject(subject);
          setTemplate({
            label: '',
            value: ''
          });
        }
      }
      if (!leasingContract && terminateAggrement) {
        if (selectedCells && selectedCells.length) {
          let mailBody = '';
          mailBody = `<p>${'Terminate caregiver aggrement main body content' +
            `<p><a href="http://192.249.123.124:8010/cancel-contract">Cancel Contract</a>`}</p>`;
          const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
          setSubject('Teminate aggrement');
          setBody(editorState);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (selectedCells && selectedCells.length) {
      const { qualificationIds = [] } = selectedCells[0]
        ? selectedCells[0]
        : {};
      const { getQualificationMatching = [] } = requirmentList
        ? requirmentList
        : {};
      let mailBody = '';
      let qualificationReq = '';
      if (!leasingContract &&
        ((getQualificationMatching && getQualificationMatching.length) ||
          offerRequirements)
      ) {

        if (qualificationIds && qualificationIds.length) {
          qualificationIds.forEach((qId: string) => {
            qualificationReq += `<br /><p>${languageTranslation(
              'QUALIFICATION_HEAD',
            )}: ${
              qualificationList && qualificationList.length
                ? qualificationList.filter(
                  (qualification: any) => qualification.value === qId,
                )[0].label
                : ''
              }</p>`;
            let temp = getQualificationMatching.filter((requirement: any) =>
              requirement.qualificationId.includes(qId),
            );
            if (temp && temp.length) {
              temp
                .sort((a: any, b: any) => b.date - a.date)
                .forEach((requirement: any) => {
                  const { startTime = '', endTime = '', date = '' } = requirement
                    ? requirement
                    : {};
                  if (!moment(date).isBefore(moment(), 'day')) {
                    let shiftLabel =
                      startTime === '06:00'
                        ? 'FD'
                        : startTime === '14:00'
                          ? 'SD'
                          : 'ND';
                    let duration = moment
                      .utc(
                        moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm')),
                      )
                      .format('H.m');
                    qualificationReq += `<p>${
                      date ? moment(date).format('DD.MM') : ''
                      } ${shiftLabel} ${duration} ${
                      requirement && requirement.division
                        ? requirement.division.name
                        : requirement.name
                      }</p>`;
                  }
                });
            }
          });
        }

        mailBody = `<p>${languageTranslation(
          'OFFER_REQUIREMENTS_TO_CG',
        )}</p><p>${languageTranslation(
          'CAREGIVER_OFFER_EMAIL_HEADING',
        )}</p><br/><p>${languageTranslation(
          'CAREGIVER_OFFER_EMAIL_QUALIFICATION_WANTED',
        )}</p>${qualificationReq}<br/><p>${languageTranslation('FEE') +
        ':' +
        languageTranslation('FEE_TEXT')}<br/>${languageTranslation(
          'LEASING_OFFERS_BEHALF_OF_TIMYOCY_FOOTER',
        )}`;
        const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
        setSubject(languageTranslation('OFFER_REQUIREMENTS_SUB'));
        setBody(editorState);
      }


      else if (
        (getQualificationMatching && getQualificationMatching.length) && leasingContract
      ) {

        console.log('leasing..........');

        let qualificationArray: any = [];
        let qualificationString: string = '';
        let divisionArray: any = [];

        for (let i = 0; i < selectedCellsCareinstitution.length; i++) {
          let object = selectedCellsCareinstitution[i];
          if (object.item) {
            let obj: any = {};
            let shiftLabel =
              object.item.startTime === '06:00'
                ? 'FD'
                : object.item.startTime === '14:00'
                  ? 'SD'
                  : 'ND';

            obj.id = object.item.id;
            obj.address = object.item.address;
            obj.division = object.item.division
              ? object.item.division.name
              : '';
            obj.shiftLabel = shiftLabel;
            obj.day = moment(object.item.date).format('D');
            obj.month = moment(object.item.date).format('MMM');
            obj.date = moment(object.item.date).format('DD.MM');
            obj.duration = moment
              .utc(
                moment(object.item.endTime, 'HH:mm').diff(
                  moment(object.item.startTime, 'HH:mm'),
                ),
              )
              .format('H.m');
            divisionArray.push(obj);

            if (object.item.qualificationId) {
              for (let j = 0; j < object.item.qualificationId.length; j++) {
                let q = object.item.qualificationId[j];
                if (!qualificationArray.includes(q)) {
                  qualificationArray.push(q);
                }
              }
            }
          }
        }
        let temp: any = [];
        qualificationArray.map((i: any) => {
          temp.push(i.label);
        });
        qualificationString = temp.join();

        if (props.sortBy === 'day') {
          divisionArray = divisionArray.sort(function (a: any, b: any) {
            return a.date - b.date;
          });
        } else {
          divisionArray = divisionArray.sort(sortByDivision);
        }

        let divRow: string = '';
        divisionArray.map((v: any, i: number) => {
          if (v.id) {
            divRow += `<p>${v.date +
              ' ' + v.shiftLabel +
              ', Place of work: ' + (v.division ? v.division : ' - ') +
              ', ' + v.address +
              ', job: ' + qualificationString
              }
              </p>`;
          }
        });

        let mailBody = `<p>${languageTranslation('CAREGIVER_EMAIL_LEASING_CONTRACT')}</p></br>${divRow}</br>
        <p>Please use the following link: <a href='https://www.plycoco.de/de/terminannehmen/befristeterarbeitsvertrag/BxmhddGGRoiwc4fwyEfluR1KS4QWsSkMirRwogkd37WlrtZQzlkrWpmZtn76bpCU36CMsoominj'cMMoqo_minc'36 temporary employment contract / BxmhddGGRoiwc4fwyEfluR1KS4QWsSkMirRwogkd37WlrtZQzlkrWpmZtn76bpCU36CMso6n7zc5eoVzjMOqBA'/> https://www.plycoco.de/de/terminannehmen/befristeterarbeitsvertrag/BxmhddGGRoiwc4fwyEfluR1KS4QWsSkMirRwogkd37WlrtZQzlkrWpmZtn76bpCU36CMsoominj'cMMoqo_minc'36 temporary employment contract / BxmhddGGRoiwc4fwyEfluR1KS4QWsSkMirRwogkd37WlrtZQzlkrWpmZtn76bpCU36CMso6n7zc5eoVzjMOqBA </a>
        </p>`;

        const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
        setSubject(languageTranslation('CAREGIVER_EMAIL_LEASING_CONTRACT_SUBJECT'));
        setBody(editorState);
      }

    }
  }, [requirmentList]);

  const handleSelectAll = async () => {
    if (careGiverData && careGiverData.length) {
      let list: any = [];
      if (!bulkcareGivers) {
        careGiverData.map((key: any) => {
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
        careGiverData &&
        careGiverData.length === selectedCareGiver.length + 1
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
      if (careGiverData && careGiverData.length === selectedCareGiver.length) {
        setBulkCareGivers(true);
      } else {
        setBulkCareGivers(false);
      }
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

  // useEffect(() => {
  //   if (!templateType) {
  //     // To set default email type
  //     setTemplateType(typeListOptions[0]);
  //   }
  // }, [typeListOptions]);

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

  const onEditorStateChange = (editorState: any): void => {
    setBody(editorState);
  };

  const handleChangeSubject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
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

  const handleSendEmail = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    if (leasingContract) {
      console.log('pdfData ', pdfData);
      let userId = '';
      if (selectedCells && selectedCells.length > 0) {
        userId = selectedCells[0].id;
      }

      if (pdfData) {
        let documentInput: any = {
          userId: parseInt(userId),
          isDocumentTemplate: false,
          documentUploadType: "leasingContract",
          document: pdfData
        };

        await addUserDocuments({
          variables: {
            documentInput
          }
        });

        if (!toast.isActive(toastId)) {
          toast.dismiss();
          toast.success(languageTranslation("DOCUMENT_UPLOAD_SUCCESS"));
        }
      }
    }

    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : '';
    const result = stripHtml(content);
    setIsSubmit(true);

    try {
      let careGiverIdList: any = [];

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
          careGiverIdList.push({ receiverUserId: careGiverId });
        });

        if (subject && body && result && result.length >= 2) {
          const bulkEmailsInput: IBulkEmailVariables = {
            to: 'caregiver',
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
            caregiver: careGiverIdList,
            senderUserId: id ? parseInt(id) : null
          };
          bulkEmails({ variables: { bulkEmailsInput } });
        }
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.error(
            languageTranslation('EMAIL_SELECT_CARE_GIVERS')
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
              <div
                className={
                  props.label === 'appointment'
                    ? 'header-nav-item disabled-class'
                    : 'header-nav-item'
                }
              >
                <span className='header-nav-icon'>
                  <img src={filter} alt='' />
                </span>
                <span className='header-nav-text'>
                  {languageTranslation('ATTRIBUTES')}
                </span>
              </div>
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
              {/* <div
                className="header-nav-item ml-auto"
                onClick={handleSendEmail}
              >
                <span className="header-nav-icon">
                  <img src={send} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("SEND")}
                </span>
              </div> */}
            </div>
          </div>

          <div className='common-content flex-grow-1'>
            <div className='bulk-email-section'>
              <Row>
                {leasingContract ?
                  <PDFDownloadLink
                    document={<MyDocument />}
                    fileName="test.pdf">
                    {({ blob, loading }: any) =>
                      (!loading && !pdfData ? setPdfData(blob) : null)
                    }
                  </PDFDownloadLink>
                  : null}
                <CareGiverListComponent
                  offerRequirements={offerRequirements}
                  careGivers={
                    props.label !== 'appointment' ? careGivers : careGiversList
                  }
                  handleSelectAll={handleSelectAll}
                  called={
                    props.label !== 'appointment' ? called : careGiverListCalled
                  }
                  loading={
                    props.label !== 'appointment' ? loading : caregiverLoading
                  }
                  careGiverData={careGiverData}
                  selectedCareGiver={selectedCareGiver}
                  handleCheckElement={handleCheckElement}
                  handleInfiniteScroll={handleInfiniteScroll}
                  page={page}
                  label={props.label}
                  bulkcareGivers={bulkcareGivers}
                  confirmApp={props.confirmApp}
                  unlinkedBy={props.unlinkedBy}
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

export default BulkEmailCaregiver;
