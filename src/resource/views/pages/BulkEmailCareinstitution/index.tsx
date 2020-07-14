import React, { FunctionComponent, useEffect, useState } from "react";
import { Row, Button } from "reactstrap";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";

import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import {
  languageTranslation,
  stripHtml,
  HtmlToDraftConverter,
  errorFormatter,
} from "../../../../helpers";
import {
  ProfileQueries,
  CareInstitutionQueries,
  EmailTemplateQueries,
  AppointmentsQueries,
} from "../../../../graphql/queries";
import {
  IEmailAttachmentData,
  IReactSelectInterface,
  IEmailTemplateData,
  INewEmailAttachments,
} from "../../../../interfaces";
import { CareInstitutionListComponent } from "./CareInstitutionListComponent";
import filter from "../../../assets/img/filter.svg";
import refresh from "../../../assets/img/refresh.svg";
import "./index.scss";
import { useHistory } from "react-router";
import { client, CareInstTIMyoCYAttrId } from "../../../../config";
import { EmailEditorComponent } from "./EmailFormComponent";
import { ConfirmBox } from "../../components/ConfirmBox";
import { IBulkEmailVariables } from "../../../../interfaces";
import { toast } from "react-toastify";
import { ApolloError } from "apollo-client";
import { BulkEmailCareInstituion } from "../../../../graphql/Mutations/BulkEmailCareInstitution";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ConfirmAppointmentPdf from "./PDF/ConfirmAppointmentPdf";
import { DocumentMutations } from "../../../../graphql/Mutations";
import logo from "../../../assets/img/plycoco-orange.png";


const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [BULK_EMAILS_CAREINSTITUTION] = BulkEmailCareInstituion;
const [
  GET_CARE_INSTITUTION_LIST,
  GET_CARE_INSTITUION_BY_ID,
] = CareInstitutionQueries;
const [ADD_DOCUMENT] = DocumentMutations;
const [VIEW_PROFILE] = ProfileQueries;
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;

let toastId: any = null;

const BulkEmailCareInstitution: FunctionComponent<any> = (props: any) => {
  const { selectedCellsCareinstitution, confirmAppointment } = props;
  let [selectedCareGiver, setselectedCareGiver] = useState<any>([]);
  const [pdfAppointmentDetails, setPdfAppointmentDetails] = useState<string[]>(
    []
  );
  const [temporaryWorkerPdf, setTemporaryWorkerPdf] = useState<any>();

  const [careInstitutionData, setcareInstitutionData] = useState<Object[]>([]);

  // To access data of loggedIn user
  let userData: any = "";
  try {
    userData = client.readQuery({
      query: VIEW_PROFILE,
    });
  } catch (error) {}

  const { viewAdminProfile }: any = userData ? userData : {};
  const { firstName = "", lastName = "", id = "" } = viewAdminProfile
    ? viewAdminProfile
    : {};

  // Mutation to leasing document
  const [addUserDocuments, { data: documentRes }] = useMutation<
    { addUserDocuments: any },
    { documentInput: any }
  >(ADD_DOCUMENT);

  // To get careinstitution list from db
  const [
    getCareInstitutions,
    { data: careInstitutionListData, called, loading, refetch, fetchMore },
  ] = useLazyQuery<any, any>(GET_CARE_INSTITUTION_LIST, {
    fetchPolicy: "no-cache",
  });

  const [
    fetchCareInstDetails,
    { data: careInstData, loading: dataLoading, refetch: careInstDetailsRetch },
  ] = useLazyQuery<any>(GET_CARE_INSTITUION_BY_ID);

  //To get all email templates of care giver addded in system
  const { data, loading: fetchTemplateListLoading } = useQuery<any>(
    GET_CAREGIVER_EMAIL_TEMPLATES,
    {
      variables: {
        type: languageTranslation("CAREINSTITUTION_EMAIL_TEMPLATE_TYPE"),
      },
    }
  );

  const [page, setPage] = useState<number>(1);
  const [template, setTemplate] = useState<any>(undefined);
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<any>("");
  const [attachments, setAttachments] = useState<IEmailAttachmentData[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [bulkcareGivers, setBulkCareGivers] = useState<boolean>(false);
  const [careInstitutions, setCareInstitution] = useState<any>([]);

  const [bulkEmails, { loading: bulkEmailLoading }] = useMutation<{
    bulkEmailsInput: IBulkEmailVariables;
  }>(BULK_EMAILS_CAREINSTITUTION, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("EMAIL_SENT_SUCCESS"));
      }
      if (props.handleClose) props.handleClose();
      setSubject("");
      let body = "<br /><br /><br /><br /><br /><br />";
      const updatedContent: any = setDefaultSignature(body);
      setBody(updatedContent);
      setAttachments([]);
      setIsSubmit(false);
      setTemplate({ label: "", value: "" });
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

  const setDefaultSignature = (body: any) => {  
    const contentBlock = htmlToDraft(
      `<div>${body}<div><span style="font-size:13px; margin:0px 0px;">${languageTranslation(
        "BEST_WISHES"
      )}</span><br><span style="font-size:13px; margin:0px 0px;">${firstName} ${lastName}</span><br><span style="text-align:left;"><a href="https://www.plycoco.de/"><img alt="" src="${logo}" style="height: auto; width: 180px; margin:0px;"></a></span></div><div><span><strong>Tel:</strong> <a href="tel:+49-30-644 99 444" style="color: #000; text-decoration: none;">+49-30-644 99 444</a></span><br><span><strong>Fax:</strong> <a href="fax:+49-30-644 99 445" style="color: #000; text-decoration: none;">+49-30-644 99 445</a></span><br><span><strong>E-Mail:</strong> <a href="mailto:kontakt@plycoco.de" style="color: #000; text-decoration: none;">kontakt@plycoco.de</a></span><br><span><a href="https://www.plycoco.de/" style="color: #000; text-decoration: none;">www.plycoco.de</a></span></div><div><span style="font-size: 12px;color: #b5b4b4;">Plycoco GmbH, Welfenallee 3-7, 13465 Berlin</span><br><span style="font-size: 12px;color: #b5b4b4;">Vertreten durch: Maren Krusch</span><br><span style="font-size: 12px;color: #b5b4b4;">Eintragung im Handelsregister Amtsgericht Berlin-Charlottenburg, Registernummer: HRB 150746</span><br><span style="font-size: 12px;color: #b5b4b4;">Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz DE290375287</span></div></div>`
    );
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
  };

  useEffect(() => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
      let careInstIds: string = selectedCellsCareinstitution.map(
        (careInst: any) => careInst.id
      );
      fetchCareInstDetails({
        variables: {
          careInstitutionId:
            careInstIds && careInstIds.length ? parseInt(careInstIds[0]) : "",
        },
      });
    }
  // To set default salutation & signature while composing the newemail
    let body = "<br /><br /><br /><br /><br /><br />";
    const updatedContent: any = setDefaultSignature(body);
    setBody(updatedContent);
  }, []);

  // To fetch users according to user selected
  useEffect(() => {
    if (props.label === "appointment") {
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
    if (props.label !== "appointment") {
      getCareInstitutions({
        variables: {
          searchBy: "",
          sortBy: 1,
          limit: 60,
          page,
          isActive: "",
        },
      });
    }
  }, []);

  // useEffect(() => {
  //   const { getCareInstitution = {} } = careInstData ? careInstData : {};
  //   let temp = [];
  //   temp.push(getCareInstitution);
  //   if (temp && temp.length && props.label === "appointment") {
  //     setcareInstitutionData(temp);
  //   }
  // }, [careInstData]);

  useEffect(() => {
    let list: any = [...careInstitutionData];
    if (careInstitutionListData) {
      const { getCareInstitutions } = careInstitutionListData;
      const { careInstitutionData } = getCareInstitutions;
      if (careInstitutionData && careInstitutionData.length) {
        careInstitutionData.map((key: any) => {
          return (list = [...list, key]);
        });
      }
      setcareInstitutionData(list);
      let selectedId: any = [];
      if (bulkcareGivers) {
        list.map((key: any) => {
          return (selectedId = [...selectedId, parseInt(key.id)]);
        });
        setcareInstitutionData(selectedId);
      }
    }
  }, [careInstitutionListData]);

  // Refresh component
  const onRefresh = () => {
    // refetch();
    getCareInstitutions({
      variables: {
        searchBy: "",
        sortBy: 3,
        limit: 60,
        page: 1,
        isActive: "",
      },
    });
    setSubject("");
    let body = "<br /><br /><br /><br /><br /><br />";
    const updatedContent: any = setDefaultSignature(body);
    setBody(updatedContent);
    setAttachments([]);
    setIsSubmit(false);
    setPage(page);
    setTemplate({ label: "", value: "" });
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
  let userId = "",
    appointmentIds: number[] = [],
    requirementIds: number[] = [],
    avabilityIds: number[] = [];
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length > 0) {
    let appointedCells = selectedCellsCareinstitution.filter(
      (cell: any) =>
        cell.item &&
        cell.item.appointments &&
        cell.item.appointments.length &&
        cell.item.appointments[0].id
    );
    console.log(appointedCells, "appointedCells");
    userId = selectedCellsCareinstitution[0].id;
    if (appointedCells && appointedCells.length) {
      appointmentIds = appointedCells.map((cell: any) =>
        parseInt(cell.item.appointments[0].id)
      );
      avabilityIds = appointedCells.map((cell: any) =>
        parseInt(cell.item.appointments[0].avabilityId)
      );
      requirementIds = appointedCells.map((cell: any) =>
        parseInt(cell.item.appointments[0].requirementId)
      );
    }
  }

  useEffect(() => {
    if (temporaryWorkerPdf) {
      let documentInput: any = {
        appointmentId: appointmentIds,
        userId: parseInt(userId),
        isDocumentTemplate: false,
        documentUploadType: "confirmAppointment",
        document: temporaryWorkerPdf,
      };
      addUserDocuments({
        variables: {
          documentInput,
        },
      });
    }
  }, [temporaryWorkerPdf]);
  
  useEffect(() => {
    if (selectedCellsCareinstitution && selectedCellsCareinstitution.length)
      setPdfAppointmentDetails(selectedCellsCareinstitution);
  }, [selectedCellsCareinstitution]);
  useEffect(() => {
    if (documentRes) {
      const { addUserDocuments = {} } = documentRes ? documentRes : {};
      const { fileSize = 0, document = "", id = "" } = addUserDocuments
        ? addUserDocuments
        : {};
      setAttachments([
        {
          fileName:
            "TIM Arbeiterüberlassungsbogen - Versorgung von (Pflegeeinrichtung)",
          url: null,
          file: null,
          id,
          path: document,
          size: fileSize,
        },
      ]);
    }
  }, [documentRes]);

  //Use Effect for set default email template data
  useEffect(() => {
    if (data && props.label === "appointment") {
      if (props.label === "appointment") {
        if (props.statusTo === "offered") {
          setSubject(languageTranslation("SUBJECT_OFFER_APPOINTMENT_BY_DAY"));
          let apointedCareGiver: any[] = [];
          if (
            selectedCellsCareinstitution &&
            selectedCellsCareinstitution.length
          ) {
            selectedCellsCareinstitution.forEach((element: any) => {
              const {
                item = {},
                firstName = "",
                lastName = "",
                name = "",
              } = element;
              const { appointments = [], division = {} } = item;
              if (appointments && appointments.length) {
                const { ca = {}, date = "" } =
                  appointments && appointments.length ? appointments[0] : {};
                if (ca) {
                  let divisionData: string = division ? division.name : name;
                  apointedCareGiver.push({
                    caregivername: ca && ca.name ? ca.name : "caregiver",
                    date: date,
                    division: divisionData,
                  });
                }
              }
            });
          }
          let divRow: string = "";
          if (props.sortBy === "day") {
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
              "DD/MM"
            )}${" "}${" "}${data.division}:${" "}${" "}${
              data.caregivername
            }</b></span></br>`;
          });
          const bodyData: any = `<span>${languageTranslation(
            "OFFERED_BODY_WE_ARE_ABLE_TO_FILL"
          )}</br></br>${divRow}</br>${languageTranslation(
            "OFFERED_BODY_INDEPENDENT_CAREGIVER_HAS_OWN_FEE"
          )}</span>`;
          const updatedContent: any = bodyData ? setDefaultSignature(bodyData) : '';
          setBody(updatedContent);
          // const editorState = bodyData ? HtmlToDraftConverter(bodyData) : "";
          // setBody(editorState);

          // setTemplate({
          //   label: emailData.menuEntry,
          //   value: emailData
          // });
        }
        if (props.statusTo === "confirmed") {
          // console.log("in iff",emailData);
          // const { subject } = emailData;
          let apointedCareGiver: any[] = [];
          let appointmentTimings: string[] = [];
          let isLeasing: boolean = false;
          if (
            selectedCellsCareinstitution &&
            selectedCellsCareinstitution.length
          ) {
            selectedCellsCareinstitution.forEach(
              (element: any, index: number) => {
                const { item = {}, name = "" } = element;
                isLeasing = element.isLeasing;

                const { appointments = [], division = {} } = item;
                if (appointments && appointments.length) {
                  const { ca = {}, date = "" } =
                    appointments && appointments.length ? appointments[0] : {};
                  appointmentTimings = [
                    ...appointmentTimings,
                    moment(date).format(index == 0 ? "MMMM DD" : "DD"),
                  ];
                  if (ca) {
                    let divisionData: string = division ? division.name : name;
                    apointedCareGiver.push({
                      caregivername: ca && ca.name ? ca.name : "caregiver",
                      date: date,
                      division: divisionData,
                    });
                  }
                }
              }
            );
          }
          let divRow: string = "";

          if (props.sortBy === "day") {
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
              "DD/MM"
            )}${" "}${" "}${data.division}:${" "}${" "}${
              data.caregivername
            }</b></span></br>`;
          });
          const bodyData: any = `<span>${languageTranslation(
            "APPOINTMENT_CONFIRMATION"
          )}</br></br>${divRow}</br>${languageTranslation(
            "OFFERED_BODY_SELFEMPLOYEED_CAREGIVER_HAS_OWN_FEE"
          )}</span><br />${
            isLeasing
              ? `<p>${languageTranslation(
                  "CONTRACT_LINE"
                )}</p><p>${languageTranslation("CONTRACT_MAIL_INFO")}</p>`
              : ""
          }`;
          // const editorState = bodyData ? HtmlToDraftConverter(bodyData) : "";
          setSubject(
            `${languageTranslation(
              "SUBJECT_APPOINTMENT_CONFIRMATION"
            )} ${appointmentTimings.join(", ")}`
          );
          const updatedContent: any = bodyData ? setDefaultSignature(bodyData) : '';
          setBody(updatedContent);
          // setTemplate({
          //   label: emailData.menuEntry,
          //   value: emailData
          // });
        } else if (props.unlinkedBy) {
          if (props.unlinkedBy === "canstitution") {
            let apointedCareGiver: any[] = [];
            if (
              selectedCellsCareinstitution &&
              selectedCellsCareinstitution.length
            ) {
              selectedCellsCareinstitution.forEach((element: any) => {
                const { item = {}, firstName = "", lastName = "" } = element;
                const { appointments = [], division = {} } = item;
                if (appointments && appointments.length) {
                  const { ca = {}, date = "" } =
                    appointments && appointments.length ? appointments[0] : {};
                  if (ca) {
                    let divisionData: string = division
                      ? division.name
                      : `${firstName}${" "}${lastName}`;
                    apointedCareGiver.push({
                      caregivername: ca && ca.name ? ca.name : "caregiver",
                      date: date,
                      division: divisionData,
                    });
                  }
                }
              });
            }
            let divRow: string = "";
            apointedCareGiver.map((data: any) => {
              divRow += `<span><b>${moment(data.date).format(
                "DD/MM"
              )}${" "}${" "}${data.division}:${" "}${" "}${
                data.caregivername
              }</b></span></br>`;
            });

            const bodyData: any = `<span>${languageTranslation(
              "UNLINK_EMAIL_CAREINSTITUTION_BODY"
            )}</br></br>${divRow}</span>`;
            // const editorState = bodyData ? HtmlToDraftConverter(bodyData) : "";

            let subject: string = `${languageTranslation("UNLINK_SUBJECT")} ${
              apointedCareGiver &&
              apointedCareGiver.length &&
              apointedCareGiver[0] &&
              apointedCareGiver[0].date
                ? moment(apointedCareGiver[0].date).format("DD.MM")
                : ""
            },${" "}${
              apointedCareGiver &&
              apointedCareGiver.length &&
              apointedCareGiver[0] &&
              apointedCareGiver[0].division
                ? apointedCareGiver[0].division
                : ""
            }`;
            const updatedContent: any = bodyData ? setDefaultSignature(bodyData) : '';
            setBody(updatedContent);
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
                const { item = {}, firstName = "", lastName = "" } = element;
                const { appointments = [], division = {} } = item;
                if (appointments && appointments.length) {
                  const { ca = {}, date = "" } =
                    appointments && appointments.length ? appointments[0] : {};
                  if (ca) {
                    let divisionData: string = division
                      ? division.name
                      : `${firstName}${" "}${lastName}`;
                    apointedCareGiver.push({
                      caregivername: ca && ca.name ? ca.name : "caregiver",
                      date: date,
                      division: divisionData,
                    });
                  }
                }
              });
            }
            let divRow: string = "";
            apointedCareGiver.map((data: any) => {
              divRow += `<span><b>${moment(data.date).format(
                "DD/MM"
              )}${" "}${" "}${data.division}:${" "}${" "}${
                data.caregivername
              }</b></span></br>`;
            });
            const bodyData: any = `<span>${languageTranslation(
              "UNLINK_EMAIL_CAREGIVER_BODY_DATES"
            )}</br></br>${divRow}</span></br>${languageTranslation(
              "UNLINK_EMAIL_CAREGIVER_BODY_CONTACT"
            )}`;
            // const editorState = bodyData ? HtmlToDraftConverter(bodyData) : "";

            let subject: string = `${languageTranslation(
              "UNLINK_CAREGIVER_SUBJECT"
            )} ${
              apointedCareGiver && apointedCareGiver.length
                ? `${moment(apointedCareGiver[0].date).format("MMM Do")}, ${
                    apointedCareGiver[0].division
                  }`
                : ""
            }`;
            const updatedContent: any = bodyData ? setDefaultSignature(bodyData) : '';
            setBody(updatedContent);
            setSubject(subject);
            setTemplate({
              label: "",
              value: "",
            });
          }
        } else if (
          // emailData.menuEntry === 'Acknowledge for offer sent' &&
          props.statusTo === "" &&
          !props.unlinkedBy
        ) {
          // const { subject, body, attachments } = emailData;
          setSubject(languageTranslation("ACKNOWLEDGE_FOR_OFFER_SENT_SUBJECT"));
          const bodyData: any = `<span>${languageTranslation(
            "REQUEST_ALL_SUITABLE_NURSE_BODY"
          )}<br /><br /><span>${languageTranslation(
            "INFORM_YOU_IMMEDIATELY_BODY"
          )}</span>`
          const updatedContent: any = bodyData ? setDefaultSignature(bodyData) : '';
          setBody(updatedContent);
          // setBody(
          //   HtmlToDraftConverter(
          //     `<span>${languageTranslation(
          //       "REQUEST_ALL_SUITABLE_NURSE_BODY"
          //     )}<br /><br /><span>${languageTranslation(
          //       "INFORM_YOU_IMMEDIATELY_BODY"
          //     )}</span>`
          //   )
          // );
        }
      }
    }
  }, [data]);

  const handleSelectAll = async (e: any, file: any) => {
    if (file && file.length) {
      let list: any = [];
      if (!bulkcareGivers) {
        file.map((key: any) => {
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
    list:any
  ) => {
    const { target } = e;
    const { checked } = target;
    if (checked) {
      setselectedCareGiver((selectedCareGiver: any) => [
        ...selectedCareGiver,
        parseInt(id),
      ]);
      let checkMark = [
        ...selectedCareGiver,
        parseInt(id),
      ]
      if (
        list &&
        list.length === checkMark.length 
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
        list &&
        list.length === selectedCareGiver.length
      ) {
        setBulkCareGivers(true);
      } else {
        setBulkCareGivers(false);
      }
    }
  };

  const handleSendEmail = (e: React.FormEvent<any>) => {
    e.preventDefault();
    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : "";
    const result = stripHtml(content);
    setIsSubmit(true);

    try {
      let careGiverIdList: any = [];
    let temp:any = props.label === "appointment" && careInstData && careInstData.getCareInstitution ? [careInstData.getCareInstitution] : careInstitutionData;
  

      if (selectedCareGiver && selectedCareGiver.length) {
        if (temp && temp.length) {
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

          uniqueUser.map((careGiverId: any) => {
            let careInstData: any = temp.filter(
              (k: any, index: number) =>
                parseInt(k.id) === parseInt(careGiverId)
            );
            if (careInstData && careInstData.length) {
              careGiverIdList.push({ receiverUserId: careGiverId });
            } else {
              careGiverIdList.push({ contactId: careGiverId });
            }
          });
        }

        if (subject && body && result && result.length >= 2) {
          const bulkEmailsInput: IBulkEmailVariables = {
            to: "canstitution",
            from: "plycoco",
            subject: subject /* .replace(/AW:/g, '') */,
            body: body ? content : "",
            parentId: null,
            status: "unread",
            type: props.label === "appointment" ? "offer" : "email",
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
            senderUserId: id ? parseInt(id) : null,
          };
          bulkEmails({ variables: { bulkEmailsInput } });
        }
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.error(
            languageTranslation("EMAIL_SELECT_CARE_GIVERS", {
              userRole: languageTranslation("CAREINST_USERROLE"),
            })
          );
        }
      }
    } catch (error) {
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "")
        .replace("GraphQL error: ", "");
      toast.error(message);
    }
  };

  const onDelteDocument = async (
    attachmentId: string,
    attachmentIndex?: number
  ) => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("CONFIRM_EMAIL_ATTACHMENT_REMOVE_MSG"),
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
      getEmailtemplate: { email_templates },
    } = data;
    setTemplate(selectedOption);
    const templateData = email_templates.filter(
      ({ id }: IEmailTemplateData) => id === parseInt(selectedOption.value)
    )[0];
    if (templateData) {
      const { subject, body, attachments } = templateData;
      // const editorState = body ? HtmlToDraftConverter(body) : "";
      const updatedContent: any = body ? setDefaultSignature(body) : '';
      setSubject(subject);
      setBody(updatedContent);
      setAttachments(
        attachments
          ? attachments.map(
              ({ name, id, path, size }: INewEmailAttachments) => ({
                fileName: name,
                id,
                path,
                size,
              })
            )
          : []
      );
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
          value: id ? id.toString() : "",
        });
      });
    }
  }

  const handleInfiniteScroll = () => {
    setPage(page + 1);
    if (props.label !== "appointment") {
      fetchMore({
        variables: {
          page: page + 1,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          if (prev.getCareInstitutions) {
            let list = [
              ...careInstitutionData,
              ...fetchMoreResult.getCareInstitutions.careInstitutionData,
            ];
            setcareInstitutionData((prevArray: any) => [
              ...prevArray,
              ...fetchMoreResult.getCareInstitutions.careInstitutionData,
            ]);
            let selectedId: any = [];
            if (bulkcareGivers) {
              let temp: any = [];
              // To select institution data & contact data
              list.map((key: any, index: number) => {
                const {
                  firstName = "",
                  lastName = "",
                  email = "",
                  id = "",
                  userId = "",
                  canstitution = {},
                  contacts = [],
                } = key ? key : {};
                const { companyName = "" } = canstitution ? canstitution : {};
                temp.push({
                  companyName,
                  contactType: languageTranslation("MAIN_CONTACT"),
                  name: [lastName, firstName].join(" "),
                  email,
                  userId,
                  id,
                });

                if (contacts && contacts.length) {
                  contacts.forEach((item: any) => {
                    const {
                      firstName = "",
                      surName = "",
                      email = "",
                      contact_type = {},
                      id = "",
                      userId = "",
                    } = item ? item : {};
                    temp.push({
                      id,
                      userId,
                      companyName: "",
                      contactType:
                        contact_type && contact_type.contactType
                          ? contact_type.contactType
                          : "",
                      name:
                        firstName && surName
                          ? [surName, firstName].join(" ")
                          : firstName
                          ? firstName
                          : surName
                          ? surName
                          : "",
                      email,
                    });
                  });
                }
              });

              /*
               */
              temp.forEach((caregiver: any) => {
                selectedId = [...selectedId, parseInt(caregiver.id)];
              });
              setselectedCareGiver(selectedId);
            }
            return Object.assign({}, prev, {
              getCareInstitutions: {
                ...prev.getCareInstitutions,
                careInstitutionData: [
                  ...prev.getCareInstitutions.careInstitutionData,
                  ...fetchMoreResult.getCareInstitutions.careInstitutionData,
                ],
              },
            });
          }
        },
      });
    }
  };

  let isLeasingRequirement: boolean = false;
  if (selectedCellsCareinstitution && selectedCellsCareinstitution.length) {
    isLeasingRequirement =
      selectedCellsCareinstitution.findIndex(
        (cell: any) => cell.item && cell.item.isLeasing
      ) > -1
        ? true
        : false;
  }

  return (
    <>
      <div className="common-detail-page">
        <div className="common-detail-section">
          <div className="sticky-common-header">
            <div className="common-topheader d-flex align-items-center px-2 mb-1">
              <div
                className={
                  props.label === "appointment"
                    ? "header-nav-item disabled-class"
                    : "header-nav-item"
                }
                onClick={props.label !== "appointment" ? onRefresh : undefined}
              >
                <span className="header-nav-icon">
                  <img src={refresh} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("REFRESH")}
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
              <div className="ml-auto">
                <Button
                  color="primary"
                  onClick={handleSendEmail}
                  className="btn-email-save ml-auto mr-2 btn btn-primary"
                  disabled={bulkEmailLoading}
                >
                  {bulkEmailLoading ? (
                    <i className="fa fa-spinner fa-spin mr-2" />
                  ) : (
                    <i
                      className="fa fa-paper-plane mr-2"
                      aria-hidden="true"
                    ></i>
                  )}
                  <span>{languageTranslation("SEND")}</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="common-content flex-grow-1">
            <div className="bulk-email-section">
              <Row>
                {isLeasingRequirement &&
                !temporaryWorkerPdf &&
                confirmAppointment &&
                pdfAppointmentDetails &&
                pdfAppointmentDetails.length > 0 ? (
                  <PDFDownloadLink
                    document={
                      <ConfirmAppointmentPdf
                        selectedCellsCareinstitution={pdfAppointmentDetails}
                        qualificationList={props.qualificationList}
                      />
                    }
                  >
                    {({ blob, url, loading, error }: any) =>
                      !loading ? setTemporaryWorkerPdf(blob) : null
                    }
                  </PDFDownloadLink>
                ) : null}
                <CareInstitutionListComponent
                  careInstData={props.label === "appointment" && careInstData && careInstData.getCareInstitution ? [careInstData.getCareInstitution] : careInstitutionData}
                  handleSelectAll={handleSelectAll}
                  called={called}
                  loading={loading}
                  careInstitutions={
                    props.label !== "appointment"
                      ? careInstitutionListData
                      : []
                  }
                  setCareInstitution={setCareInstitution}
                  selectedCareGiver={selectedCareGiver}
                  handleCheckElement={handleCheckElement}
                  page={page}
                  label={props.label}
                  bulkcareGivers={bulkcareGivers}
                  handleInfiniteScroll={handleInfiniteScroll}
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
