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
  stripHtml,
} from '../../../../helpers';
import {
  CareGiverQueries,
  EmailTemplateQueries,
  ProfileQueries,
  AppointmentsQueries,
} from '../../../../graphql/queries';
import { BulkEmailCareGivers } from '../../../../graphql/Mutations';
import {
  IReactSelectInterface,
  IEmailTemplateData,
  INewEmailAttachments,
  IEmailAttachmentData,
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

const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [, , , , , , GET_CAREGIVERS_FOR_BULK_EMAIL] = CareGiverQueries;
const [BULK_EMAILS] = BulkEmailCareGivers;
const [VIEW_PROFILE] = ProfileQueries;
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;

let toastId: any = null;

const BulkEmailCaregiver: FunctionComponent<any> = (props: any) => {
  let [selectedCareGiver, setselectedCareGiver] = useState<any>([]);
  const history = useHistory();

  // To access data of loggedIn user
  let userData: any = '';
  try {
    userData = client.readQuery({
      query: VIEW_PROFILE,
    });
  } catch (error) {}

  const { viewAdminProfile }: any = userData ? userData : {};
  const { firstName = '', lastName = '', id = '' } = viewAdminProfile
    ? viewAdminProfile
    : {};

  // To get caregiver list from db
  const [
    fetchCareGiverList,
    { data: careGivers, called, loading, refetch, fetchMore },
  ] = useLazyQuery<any, any>(GET_CAREGIVERS_FOR_BULK_EMAIL, {
    fetchPolicy: 'no-cache',
  });

  // To fetch caregivers by qualification id
  const [
    fetchCaregiverListFromQualification,
    {
      data: careGiversList,
      called: careGiverListCalled,
      loading: caregiverLoading,
      refetch: caregiverQulliRefetch,
      fetchMore: caregiverListFetch,
    },
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache',
  });

  // To fetch users according to qualification selected
  useEffect(() => {
    if (props.label === 'appointment') {
      let temp: any = [];
      props.qualification.map((key: any, index: number) => {
        temp.push(parseInt(key.value));
      });
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
          lte: props.lte,
        },
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
        type: languageTranslation('CAREGIVER_EMAIL_TEMPLATE_TYPE'),
      },
    },
  );

  const [page, setPage] = useState<number>(1);
  const [template, setTemplate] = useState<any>(undefined);
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<any>('');
  const [attachments, setAttachments] = useState<IEmailAttachmentData[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [bulkcareGivers, setBulkCareGivers] = useState<boolean>(false);

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
    },
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
          isActive: '',
        },
      });
    }
  }, []);

  const [careGiverData, setcareGiverData] = useState<Object[]>([]);

  // get care giver list according to selected qualification in appointment section

  useEffect(() => {
    let list: any = [...careGiverData];
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

  // const handleInfiniteScroll = () => {
  //   setPage(page + 1);
  //   fetchCareGiverList({
  //     variables: {
  //       searchBy: "",
  //       sortBy: 3,
  //       limit: 30,
  //       page: page + 1,
  //       isActive: ""
  //     }
  //   });
  // };

  // Refresh component
  const onRefresh = () => {
    // refetch();
    fetchCareGiverList({
      variables: {
        searchBy: '',
        sortBy: 3,
        limit: 30,
        page: 1,
        isActive: '',
      },
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
          page: page + 1,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          if (prev.getCaregivers) {
            let list = [
              ...careGiverData,
              ...fetchMoreResult.getCaregivers.result,
            ];
            setcareGiverData((prevArray: any) => [
              ...prevArray,
              ...fetchMoreResult.getCaregivers.result,
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
                  ...fetchMoreResult.getCaregivers.result,
                ],
              },
            });
          }
        },
      });
    } else {
      caregiverListFetch({
        variables: {
          page: page + 1,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          if (prev.getUserByQualifications) {
            let list = [
              ...careGiverData,
              ...fetchMoreResult.getUserByQualifications.result,
            ];
            setcareGiverData((prevArray: any) => [
              ...prevArray,
              ...fetchMoreResult.getUserByQualifications.result,
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
                  ...fetchMoreResult.getUserByQualifications.result,
                ],
              },
            });
          }
        },
      });
    }
  };

  //Use Effect for email template data
  useEffect(() => {
    if (data && props.label === 'appointment') {
      const {
        getEmailtemplate: { email_templates },
      } = data;
      if (email_templates && email_templates.length) {
        email_templates.map((emailData: IEmailTemplateData & any) => {
          if (props.label === 'appointment') {
            if (props.showButton) {
              if (
                emailData.menuEntry ===
                  'Offer by care institution sort by Division (with button)' &&
                props.sortBy === 'division'
              ) {
                const { subject, body, attachments } = emailData;
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
                          size,
                        }),
                      )
                    : [],
                );

                setTemplate({
                  label: emailData.menuEntry,
                  value: emailData,
                });
              }
              if (
                emailData.menuEntry ===
                  'Offer By care institution Sort by Days (With Button)' &&
                props.sortBy === 'day'
              ) {
                const { subject, body, attachments } = emailData;
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
                          size,
                        }),
                      )
                    : [],
                );

                setTemplate({
                  label: emailData.menuEntry,
                  value: emailData,
                });
              }
            }
            if (!props.showButton) {
              if (
                emailData.menuEntry ===
                  'Offer by care institution sort by division (without button)' &&
                props.sortBy === 'division'
              ) {
                const { subject, body, attachments } = emailData;
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
                          size,
                        }),
                      )
                    : [],
                );

                setTemplate({
                  label: emailData.menuEntry,
                  value: emailData,
                });
              }
              if (
                emailData.menuEntry ===
                  'offer by care institution sort by days (without button)' &&
                props.sortBy === 'day'
              ) {
                const { subject, body, attachments } = emailData;
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
                          size,
                        }),
                      )
                    : [],
                );

                setTemplate({
                  label: emailData.menuEntry,
                  value: emailData,
                });
              }
            }

            if (
              emailData.menuEntry === 'Offers for care givers' &&
              !props.showButton
            ) {
              const { subject, body, attachments } = emailData;
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
                        size,
                      }),
                    )
                  : [],
              );

              setTemplate({
                label: emailData.menuEntry,
                value: emailData,
              });
            }
          }
        });
      }
    }
  }, [data]);

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
    id: string,
  ) => {
    const { target } = e;
    const { checked } = target;

    if (checked) {
      setselectedCareGiver((selectedCareGiver: any) => [
        ...selectedCareGiver,
        parseInt(id),
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
      getEmailtemplate: { email_templates },
    } = data;

    if (email_templates && email_templates.length) {
      email_templates.map(({ menuEntry, id }: IEmailTemplateData) => {
        templateOptions.push({
          label: menuEntry,
          value: id ? id.toString() : '',
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
      getEmailtemplate: { email_templates },
    } = data;
    setTemplate(selectedOption);
    const templateData = email_templates.filter(
      ({ id }: IEmailTemplateData) => id === parseInt(selectedOption.value),
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
                size,
              }),
            )
          : [],
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
    attachmentIndex?: number,
  ) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_EMAIL_ATTACHMENT_REMOVE_MSG'),
    });
    if (!value) {
      return;
    } else {
      setAttachments((prevArray: any) =>
        prevArray.filter((_: any, index: number) => attachmentIndex !== index),
      );
    }
  };

  const uploadDocument = (data: IEmailAttachmentData) => {
    setAttachments((prevArray: any) => [data, ...prevArray]);
  };

  const handleSendEmail = (e: React.FormEvent<any>) => {
    e.preventDefault();
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
              (obj: any) => obj.label === key.label && obj.value === key.value,
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
            senderUserId: id ? parseInt(id) : null,
          };
          bulkEmails({ variables: { bulkEmailsInput } });
        }
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.error(
            languageTranslation('EMAIL_SELECT_CARE_GIVERS'),
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
              <div className='header-nav-item' onClick={onRefresh}>
                <span className='header-nav-icon'>
                  <img src={refresh} alt='' />
                </span>
                <span className='header-nav-text'>
                  {languageTranslation('REFRESH')}
                </span>
              </div>
              <div className='header-nav-item'>
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
                <CareGiverListComponent
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
