import React, { FunctionComponent, useEffect, useState } from "react";
import { Row, Button } from "reactstrap";
import { toast } from "react-toastify";
import { ApolloError } from "apollo-client";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import {
  languageTranslation,
  HtmlToDraftConverter,
  stripHtml,
} from "../../../../helpers";
import {
  CareGiverQueries,
  EmailTemplateQueries,
  ProfileQueries,
  AppointmentsQueries,
  SignatureQueries,
} from "../../../../graphql/queries";
import {
  BulkEmailCareGivers,
  DocumentMutations,
  LeasingContractMutations,
} from "../../../../graphql/Mutations";
import {
  IReactSelectInterface,
  IEmailTemplateData,
  INewEmailAttachments,
  IEmailAttachmentData,
  ITerminatePdfDetails,
} from "../../../../interfaces";
import { EmailEditorComponent } from "./EmailFormComponent";
import { ConfirmBox } from "../../components/ConfirmBox";
import { CareGiverListComponent } from "./CareGiverListComponent";
import { IBulkEmailVariables } from "../../../../interfaces";
import { errorFormatter } from "../../../../helpers";
import {
  client,
  dbAcceptableFormat,
  defaultDateFormat,
  AppConfig,
  BULK_INSTIUTION_LIST,
} from "../../../../config";
import moment from "moment";
import Loader from "../../containers/Loader/Loader";
import filter from "../../../assets/img/filter.svg";
import refresh from "../../../assets/img/refresh.svg";
import "./index.scss";

// import { emailContent } from '../../../../common';

const [, , , GET_CAREGIVER_EMAIL_TEMPLATES] = EmailTemplateQueries;
const [, , , , , , GET_CAREGIVERS_FOR_BULK_EMAIL] = CareGiverQueries;
const [BULK_EMAILS, SINGLE_BUTTON_BULK_EMAILS] = BulkEmailCareGivers;
const [VIEW_PROFILE] = ProfileQueries;
const [
  GET_USERS_BY_QUALIFICATION_ID,
  ,
  ,
  ,
  GET_REQUIRMENT_FOR_CAREGIVER_QUALIFICATION,
] = AppointmentsQueries;
const [ADD_DOCUMENT] = DocumentMutations;
const [GET_CARE_GIVER_SIGNATURE] = SignatureQueries;
const [
  UPDATE_LEASING_CONTRACT_STATUS,
  GENERATE_LEASING_CONTRACT_LINK_TOKEN,
] = LeasingContractMutations;

let toastId: any = null;

const BulkEmailCaregiver: FunctionComponent<any> = (props: any) => {
  const {
    selectedCellsCareinstitution,
    selectedCells,
    offerRequirements,
    leasingContract,
    qualificationList,
    terminateAggrement,
    handleClose,
    label,
  } = props;
  let [selectedCareGiver, setselectedCareGiver] = useState<any>([]);
  const [pdfAppointmentDetails, setPdfAppointmentDetails] = useState<string[]>(
    []
  );
  const [pdfTerminateAppointment, setPdfTerminateAppointment] = useState<
    ITerminatePdfDetails
  >({
    name: "",
    dateOfBirth: "",
    street: "",
    city: "",
    zipCode: "",
  });

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
  // To get caregiver list from db
  const [
    fetchCareGiverList,
    { data: careGivers, called, loading, refetch, fetchMore },
  ] = useLazyQuery<any, any>(GET_CAREGIVERS_FOR_BULK_EMAIL, {
    fetchPolicy: "no-cache",
  });

  // Mutation to temporary leasing aggreement
  const [addUserDocuments] = useMutation<
    { addUserDocuments: any },
    { documentInput: any }
  >(ADD_DOCUMENT);

  const [
    generateLeasingContractLinkToken,
    { data: tokenData, loading: generating, called: tokenAPICalled },
  ] = useMutation<
    any,
    {
      userId: number;
      appointmentId: number[];
      availabilityId: number[];
      status: string;
      pdfAppointmentDetails: any;
    }
  >(GENERATE_LEASING_CONTRACT_LINK_TOKEN);

  // Query to get uploaded signature
  const [getCareGiverSignature, { data: uploadedSignature }] = useLazyQuery<
    any
  >(GET_CARE_GIVER_SIGNATURE);

  // Mutation to leasing document
  const [UpdateLeasingContractStatus] = useMutation<
    { UpdateLeasingContractStatus: any },
    {
      appointmentId: any;
      availablityId: any;
      requirementId: any;
      status: string;
    }
  >(UPDATE_LEASING_CONTRACT_STATUS);

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
    fetchPolicy: "no-cache",
  });

  // To fetch requirments by selected caregiver qualification id
  const [
    fetchRequirmentFromQualification,
    { data: requirmentList, loading: requirmentListLoading },
  ] = useLazyQuery<any, any>(GET_REQUIRMENT_FOR_CAREGIVER_QUALIFICATION, {
    fetchPolicy: "no-cache",
  });

  //Get Data for selected cell
  useEffect(() => {
    if (selectedCells && selectedCells.length) {
      let userId = selectedCells[0].caregiver.id;
      const { qualificationId = [] } = selectedCells[0].caregiver;

      if (qualificationId && qualificationId.length && offerRequirements) {
        fetchRequirmentFromQualification({
          variables: {
            qualificationId: qualificationId,
          },
        });
      }
      if (userId && (terminateAggrement || leasingContract)) {
        getCareGiverSignature({
          variables: { userId: parseInt(userId) },
        });
      }
    }
  }, [selectedCells]);

  // set caregiver signature data
  // useEffect(() => {
  //   if (uploadedSignature) {
  //     const { getCareGiverSignature } = uploadedSignature;
  //     if (getCareGiverSignature) {
  //       setSignatureData(getCareGiverSignature);
  //     } else {
  //       setSignatureData({});
  //     }
  //   }
  // }, [uploadedSignature]);

  const setDefaultSignature = (body: any) => {
    const contentBlock = htmlToDraft(
      `${
        props.label === "appointment" ? body : `<div>${body}</div>`
      }<span style="font-size:15px; margin:0px 0px;">${languageTranslation(
        "BEST_WISHES"
      )}</span><br><span style="font-size:15px; margin:0px 0px;">${firstName} ${lastName}</span><br><span style="text-align:left;"><a href="https://www.plycoco.de/"><img alt="" src="${
        AppConfig.APP_ENDPOINT
      }/plycoco.png" style="height: auto; width: 180px; margin:0px;"></a></span></div><div><span><strong>Tel:</strong> <a href="tel:+49.30.644 99 444" style="color: #000; text-decoration: none;">+49.30.644 99 444</a></span><br><span><strong>Fax:</strong> <a href="fax: +49.30.644 99 445" style="color: #000; text-decoration: none;">+49.30.644 99 445</a></span><br><span><strong>E-Mail:</strong> <a href="mailto:kontakt@plycoco.de" style="color: #000; text-decoration: none;">kontakt@plycoco.de</a></span><br><span><a href="https://www.plycoco.de/" style="color: #000; text-decoration: none;">www.plycoco.de</a></span></div><div><span style="font-size: 12px;color: #b5b4b4;">Plycoco GmbH, Welfenallee 3-7, 13465 Berlin</span><br><span style="font-size: 12px;color: #b5b4b4;">Eintragung im Handelsregister: Registergericht: Amtsgericht Berlin-Charlottenburg, Registernummer: HRB 150746, Geschäftsführerin: Maren Krusch</span><br><span style="font-size: 12px;color: #b5b4b4;">Tel: +49.30.644 99 444, Fax: +49.30.644 99 445</span></div></div>`
    );
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
  };

  // To set default salutation & signature while composing the newemail
  useEffect(() => {
    let body = "<br /><br /><br /><br /><br /><br />";
    const updatedContent: any = setDefaultSignature(body);
    setBody(updatedContent);
  }, []);

  // To fetch users according to qualification selected in case of offer caregiver to care institution
  useEffect(() => {
    if (
      props.label === "appointment" &&
      props.offerCareGiver &&
      !props.unlinkedBy
    ) {
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
          userRole: "caregiver",
          limit: 30,
          page,
          gte: props.gte,
          lte: props.lte,
          lable: "Offer-caregiver",
        },
      });
    } else {
      let temp: any = [];
      selectedCells &&
        selectedCells.length &&
        selectedCells.map((cell: any) => {
          const { caregiver = {} } = cell ? cell : {};
          const {
            firstName = "",
            lastName = "",
            email = "",
            id = "",
          } = caregiver ? caregiver : {};
          if (temp.findIndex((item: any) => item.id === id) < 0) {
            temp.push({
              firstName,
              lastName,
              email,
              id,
            });
          }
        });

      setcareGiverData(temp);
    }
  }, [label]);

  // To get all the types of email template
  // const { data: typeList } = useQuery(GET_EMAIL_TEMPLATE_TYEPS);
  //To get all email templates of care giver addded in system
  const { data, loading: fetchTemplateListLoading } = useQuery<any>(
    GET_CAREGIVER_EMAIL_TEMPLATES,
    {
      variables: {
        type: languageTranslation("CAREGIVER_EMAIL_TEMPLATE_TYPE"),
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
  const [careGiverData, setcareGiverData] = useState<Object[]>([]);

  // const [leasingContactPdfData, setLeasingContactPdfData] = useState<any>();
  // const [
  //   terminationAgreementPdfData,
  //   setTerminationAgreementPdfData,
  // ] = useState<any>();

  const [bulkEmails, { loading: bulkEmailLoading }] = useMutation<{
    bulkEmailsInput: IBulkEmailVariables;
  }>(BULK_EMAILS, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("EMAIL_SENT_SUCCESS"));
      }
      if (handleClose) {
        handleClose();
      } else {
        setSubject("");
        let body = "<br /><br /><br /><br /><br /><br />";
        const updatedContent: any = setDefaultSignature(body);
        setBody(updatedContent);
        setAttachments([]);
        setIsSubmit(false);
        setTemplate({ label: "", value: "" });
        setselectedCareGiver([]);
        setBulkCareGivers(false);
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    },
  });

  // mutation for single button
  const [
    SingleButtonbulkEmails,
    { loading: singlebuttonBulkEmailLoading },
  ] = useMutation<{
    bulkEmailsInput: IBulkEmailVariables;
  }>(SINGLE_BUTTON_BULK_EMAILS, {
    onCompleted() {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("EMAIL_SENT_SUCCESS"));
      }
      // In case of modal popup
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

  useEffect(() => {
    // Fetch list of caregivers
    if (props.label !== "appointment") {
      fetchCareGiverList({
        variables: {
          searchBy: "",
          sortBy: 3,
          limit: BULK_INSTIUTION_LIST,
          page,
          isActive: "",
        },
      });
    }
  }, []);

  // get care giver list according to selected qualification in appointment section

  useEffect(() => {
    let list: any = [...careGiverData];
    if (props.offerCareGiver && !props.unlinkedBy) {
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
        searchBy: "",
        sortBy: 3,
        limit: BULK_INSTIUTION_LIST,
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
    setcareGiverData([]);
  };

  const handleInfiniteScroll = () => {
    setPage(page + 1);
    if (props.label !== "appointment") {
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
              list.forEach((caregiver) => {
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
              list.forEach((caregiver) => {
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

  // const getAppointmentDeatilsContent = (appointments:any) => {
  //   qualificationList && qualificationList.length
  //   ? qualificationList.filter(
  //     (qualification: any) => qualification.value === qId
  //   )[0].label
  //   : ''
  //   appointments.forEach((requirement: any) => {
  //     const {
  //       startTime = '',
  //       endTime = '',
  //       date = ''
  //     } = requirement ? requirement : {};
  //     let deptDetails = '';
  //     // To check if the department is there Then used its detail otherwise careinst details
  //     if (requirement && requirement.division) {
  //       let {name, address, qualifications} = requirement.division
  //       deptDetails = `${name}${address ? `of ${address}` :''}${qualifications && qualifications.length ? ` - ${qualifications.map((q:any) => q.label).join(', ')}` :''}`
  //     }else{
  //       let {name='',address='',qualificationId=[]} = requirement ? requirement :{}
  //       deptDetails = `${name}${address ? `of ${address}` :''}${qualificationId && qualificationId.length ? ` - ${qualificationList.filter(
  //         (qualification: any) => qualification.value === qId
  //       ).map((q:any) => q.label).join(', ')}` :''}`
  //     }
  //     if (!moment(date).isBefore(moment(), 'day')) {
  //       let shiftLabel =
  //         startTime === '06:00'
  //           ? 'FD'
  //           : startTime === '14:00'
  //             ? 'SD'
  //             : 'ND';
  //       let duration = moment
  //         .utc(
  //           moment(endTime, 'HH:mm').diff(
  //             moment(startTime, 'HH:mm')
  //           )
  //         )
  //         .format('H.m');
  //       qualificationReq += `<p>${
  //         date ? moment(date).format('DD.MM') : ''
  //       } ${shiftLabel} ${duration} ${deptDetails}
  //       </p>`;
  //     }
  //   });
  // }

  useEffect(() => {
    const { generateLeasingContractLinkToken = {} } = tokenData
      ? tokenData
      : {};
    const { token = "" } = generateLeasingContractLinkToken
      ? generateLeasingContractLinkToken
      : {};
    if (token) {
      let temp = body
        ? draftToHtml(convertToRaw(body.getCurrentContent()))
        : "";
      temp = temp.replace(new RegExp(`{token}`, "g"), token);
      const editorState = temp ? HtmlToDraftConverter(temp) : "";
      setBody(editorState);
    }
  }, [tokenData]);

  //Use Effect for email template data
  useEffect(() => {
    if (props.label === "appointment" && !offerRequirements) {
      if (props.sortBy === "division" || props.sortBy === "day") {
        let qualificationArray: any = [];
        let qualificationString: string = "";
        let remarkRow: string = "";
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
              object.item.startTime === "06:00"
                ? "FD"
                : object.item.startTime === "14:00"
                ? "SD"
                : "ND";

            obj.id = object.item.id;
            obj.division = object.item.division
              ? object.item.division.name
              : "";
            obj.shiftLabel = shiftLabel;
            obj.day = moment(object.item.date).format("D");
            obj.month = moment(object.item.date).format("MMM");
            obj.date = moment(object.item.date).format("DD.MM");
            obj.duration = moment
              .utc(
                moment(object.item.endTime, "HH:mm").diff(
                  moment(object.item.startTime, "HH:mm")
                )
              )
              .format("H.m");
            divisionArray.push(obj);
            if (object.item.departmentOfferRemarks) {
              remarkRow += `<p>${object.item.departmentOfferRemarks}</p>`;
            }
            if(object && object.item &&object.item.qualificationId && object.item.qualificationId.length){
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
          temp.push(i);
        });
        qualificationString = temp.join();

        let uniqueDivisions = subjectDivisions.filter(
          (item: any, i: any, ar: any) => ar.indexOf(item) === i
        );

        if (props.sortBy === "day") {
          divisionArray = divisionArray.sort(function (a: any, b: any) {
            return a.date - b.date;
          });
        } else {
          divisionArray = divisionArray.sort(sortByDivision);
        }

        let divRow: string = "";
        let customSub: string = `${languageTranslation("OFFER")} `;
        divisionArray.map((v: any, i: number) => {
          if (v.id) {
            divRow += `<p>${
              v.date +
              " " +
              v.shiftLabel +
              " " +
              v.duration +
              "h " +
              (v.division ? v.division : " - ") +
              "  " +
              languageTranslation("APPOINTMENTID") +
              "=" +
              v.id
            }</p>`;
            if (i == 0) {
              customSub += `${v.month + " " + v.day + "." + v.shiftLabel},`;
            } else {
              customSub += `${" " + v.day + "." + v.shiftLabel},`;
            }
          }
        });

        if (uniqueDivisions.length == 1) {
          customSub += `${" " + uniqueDivisions[0]}`;
        }

        let mailBody: any = "";
        mailBody = `<p>${languageTranslation("CAREGIVER_OFFER_EMAIL_HEADING")}
          </p>${
            isLeasing ? `<p>${languageTranslation("LEASING_OFFER")}</p>` : ""
          }<p>${
          languageTranslation("CAREGIVER_OFFER_EMAIL_QUALIFICATION_WANTED") +
          " " +
          qualificationString
        }</p><br/>${divRow}</br>${
          props.showButton
            ? `<p><a href="http://78.47.143.190:8000/">${languageTranslation(
                "DIRECT_BOOKING"
              )} </a></p></br>`
            : ""
        }${remarkRow}</br><p>${
          languageTranslation("FEE") + ":" + languageTranslation("FEE_TEXT")
        }</p></br>${
          isLeasing
            ? `<p>${languageTranslation(
                "LEASING_OFFERS_BEHALF_OF_TIMYOCY_FOOTER"
              )}</p>`
            : ""
        }`;
        // }

        // const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
        const updatedContent: any = mailBody
          ? setDefaultSignature(mailBody)
          : "";
        setBody(updatedContent);
        setSubject(customSub);
        // setBody(editorState);
      } else {
        let qualificationArray: any = [];
        let qualificationString: string = "";
        let remarkRow: string = "";
        let divisionArray: any = [];

        for (let i = 0; i < selectedCellsCareinstitution.length; i++) {
          let object = selectedCellsCareinstitution[i];
          if (object.item) {
            let obj: any = {};
            let shiftLabel =
              object.item.startTime === "06:00"
                ? "FD"
                : object.item.startTime === "14:00"
                ? "SD"
                : "ND";

            obj.id = object.item.id;
            obj.division = object.item.division
              ? object.item.division.name
              : object.item.name;
            obj.shiftLabel = shiftLabel;
            obj.day = moment(object.item.date).format("D");
            obj.month = moment(object.item.date).format("MMM");
            obj.date = moment(object.item.date).format("DD.MM");
            obj.duration = moment
              .utc(
                moment(object.item.endTime, "HH:mm").diff(
                  moment(object.item.startTime, "HH:mm")
                )
              )
              .format("H.m");
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

        if (props.sortBy === "day") {
          divisionArray = divisionArray.sort(function (a: any, b: any) {
            return a.date - b.date;
          });
        } else {
          divisionArray = divisionArray.sort(sortByDivision);
        }

        let divRow: string = "";
        divisionArray.map((v: any, i: number) => {
          if (v.id) {
            divRow += `<p>${
              v.date +
              " " +
              v.shiftLabel +
              " " +
              v.duration +
              "h " +
              (v.division ? v.division : " - ") +
              "  " +
              languageTranslation("APPOINTMENTID") +
              "=" +
              v.id
            }</p>`;
          }
        });

        if (!terminateAggrement && !leasingContract) {
          let mailBody = `<p>${languageTranslation(
            "CAREGIVER_OFFER_EMAIL_HEADING"
          )}</p><p>${languageTranslation("LEASING_OFFER")}</p><p>${
            languageTranslation("CAREGIVER_OFFER_EMAIL_QUALIFICATION_WANTED") +
            " " +
            qualificationString
          }</p><br/>${divRow}</br>${remarkRow}</br><p>${
            languageTranslation("FEE") + ":" + languageTranslation("FEE_TEXT")
          }</p><p>${languageTranslation(
            "LEASING_OFFERS_BEHALF_OF_TIMYOCY_FOOTER"
          )}</p></br>`;

          // const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
          setSubject(languageTranslation("CAREGIVER_OFFER_EMAIL_SUBJECT"));
          const updatedContent: any = mailBody
            ? setDefaultSignature(mailBody)
            : "";
          setBody(updatedContent);
          // setBody(editorState);
        }
      }
      if (props.confirmApp) {
        let apointedCareGiver: any = [];

        if (selectedCells && selectedCells.length) {
          selectedCells.forEach((element: any) => {
            const { item = {},  caregiver = "" } = element;
            const {firstName="", lastName = ""}  = caregiver;
            const { appointments = [], date="", name= `${lastName } ${firstName}`} = item;
            const { cr = {} } =
              appointments && appointments.length ? appointments[0] : [];
            const { division = {} } = cr ? cr : {};

            if (division) {
              let divisionData: string = division ? division.name : `${name}`;

              apointedCareGiver.push({
                date: date,
                division: divisionData,
              });
            }
          });
        }
        let divRow: string = "";
        if (
          apointedCareGiver &&
          apointedCareGiver.length &&
          apointedCareGiver[0]
        ) {
          divRow = `<span><b>${moment(apointedCareGiver[0].date).format(
            "DD/MM"
          )}${" "}${" "}${
            apointedCareGiver[0].division ? apointedCareGiver[0].division : ""
          }</b></span></br>`;
        }
        const bodyData: any = `<span>${divRow}</br>${languageTranslation(
          "FEEL_FREE_TO_CONTACT_INSTITUTION"
        )} </br></br>${languageTranslation(
          "YOU_CAN_USE_CORRESPONDING_WEB"
        )} </br></br>${languageTranslation(
          "CALL_INSTITUTION_BEFORE_TWO_DAYS"
        )} </span>`;
        // const editorState = bodyData ? HtmlToDraftConverter(bodyData) : '';
        setSubject(languageTranslation("APPOINTMENT_CONFIRM"));
        const updatedContent: any = bodyData
          ? setDefaultSignature(`<div>${bodyData}</div>`)
          : "";
        setBody(updatedContent);
        // setBody(editorState);
      }
      if (props.unlinkedBy) {
        if (props.unlinkedBy === "canstitution") {
          let apointedCareGiver: any[] = [];
          if (
            selectedCellsCareinstitution &&
            selectedCellsCareinstitution.length
          ) {
            selectedCellsCareinstitution.forEach((element: any) => {
              const { item = {},canstitution = {}, } = element;
              const {  firstName = "", lastName = ""} = canstitution? canstitution : {}
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
            "FACILITY_CANCELLED_ON_DATE"
          )} </br></br>${divRow}</br>${languageTranslation(
            "CANCELLED_DATE_MARKED_AS_FREE"
          )} </span>`;
          // const editorState = bodyData ? HtmlToDraftConverter(bodyData) : '';

          let subject: string = `${languageTranslation(
            "UNLINK_CAREGIVER_SUBJECT"
          )} ${moment(apointedCareGiver[0].date).format("DD.MM")}`;
          // setBody(editorState);
          const updatedContent: any = bodyData
            ? setDefaultSignature(`<div>${bodyData}</div>`)
            : "";
          setBody(updatedContent);
          setSubject(subject);
          setTemplate({
            label: "",
            value: "",
          });
        } else if (!props.confirmApp) {
          let apointedCareGiver: any[] = [];

          if (
            selectedCellsCareinstitution &&
            selectedCellsCareinstitution.length
          ) {
            selectedCellsCareinstitution.forEach((element: any) => {
              const { item = {}, canstitution = {} } = element;
              const {  firstName = "", lastName = ""} = canstitution? canstitution : {}
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
                    division: divisionData ? divisionData : "",
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
            "INFORM_CANSTITUTION_FOR_DATES"
          )} </br></br>${divRow}</br></span>`;
          // const editorState = bodyData ? HtmlToDraftConverter(bodyData) : '';
          let subject: string = `${languageTranslation(
            "APPOINTMENT_CANCEL_CONFIRMATION"
          )} ${moment(
            apointedCareGiver[0] && apointedCareGiver[0].date
              ? apointedCareGiver[0].date
              : ""
          ).format("MMM Do")},${" "}1:1 ${
            apointedCareGiver[0] && apointedCareGiver[0].division
              ? apointedCareGiver[0].division
              : ""
          }`;
          // setBody(editorState);
          const updatedContent: any = bodyData
            ? setDefaultSignature(`<div>${bodyData}</div>`)
            : "";
          setBody(updatedContent);
          setSubject(subject);
          setTemplate({
            label: "",
            value: "",
          });
        }
      }
      if (
        !leasingContract &&
        terminateAggrement &&
        !props.confirmApp &&
        !props.unlinkedBy
      ) {
        if (selectedCells && selectedCells.length) {
          let cname: string = "";
          selectedCells.forEach((element: any) => {
            const { item = {} } = element ? element : {};
            const { appointments = [] } = item;
            if (appointments && appointments.length) {
              const { cr = {} } =
                appointments && appointments.length ? appointments[0] : {};
              cname = cr.name;
            }
            let mailBody = "";
            mailBody = `<p>${
              `${languageTranslation(
                "SIGN_TERMINATION_AGREEMENT_TIMYOCY"
              )} ${" "}<span><b>${
                element && element.dateString
                  ? moment(element.dateString).format("DD.MM")
                  : ""
              }</b></span> ${cname ? cname : ""}` +
              `<p>${languageTranslation(
                "SIGN_UP_LINK"
              )} <a href="http://78.47.143.190:8000/confirm-leasing-appointment/cancellation-contract/{token}"/> http://78.47.143.190:8000/confirm-leasing-appointment/cancellation-contract/{token}</a>`
            }</p>`;
            // const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
            setSubject(languageTranslation("TERMINATE_AGREEMENT"));
            const updatedContent: any = mailBody
              ? setDefaultSignature(mailBody)
              : "";
            setBody(updatedContent);
            // setBody(editorState);
          });
        }
      }
      if (leasingContract) {
        let requirementEmailData: string = "";
        let qualificationArray: any = [];
        let qualificationString: string = "";
        let divisionArray: any = [];
        if (selectedCells && selectedCells.length) {
          let row: any[] = [];
          let appointmentTimings: string[] = [];
          let apptRowData: any[] = [];
          selectedCells
            .map((cell: any) =>
              cell.item && cell.item.appointments ? cell.item.appointments : []
            )
            .forEach((requirement: any, index: number) => {
              const { cr = {}, date = "" } =
                requirement && requirement.length ? requirement[0] : {};
              const {
                address = "",
                startTime = "",
                endTime = "",
                name = "",
                qualificationForCharge = [],
              } = cr ? cr : {};
              appointmentTimings = [
                ...appointmentTimings,
                moment(date).format(index == 0 ? "MMMM DD" : "DD"),
              ];
              // let { address = '' } = division ? division : {};
              let shiftLabel =
                startTime === "06:00"
                  ? "FD"
                  : startTime === "14:00"
                  ? "SD"
                  : "ND";
              let duration = moment
                .utc(moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm")))
                .format("H.m");
              apptRowData.push({
                shiftLabel,
                date,
                qualificationForCharge,
                address,
                duration,
              });
              requirementEmailData += `<p>${
                date ? moment(date).format("DD.MM") : ""
              } ${shiftLabel} ${duration} ${name}
              </p>`;
              //   if (index === selectedCells.length -1 ) {
              //     row.push(`${
              //       date ? `${selectedCells[0] && selectedCells[0].item && selectedCells[0].item.appointments && selectedCells[0].item.appointments.length && selectedCells.length > 1 ? `${moment(selectedCells[0].item.appointments[0].date).format('DD.')}-` : ''}${moment(date).format('DD.MM.YYYY')}` : ''
              //     } ${shiftLabel} ${duration}${
              //       address ? `, ${languageTranslation("PLACE_OF_WORK")} ${address}` : ''
              //     }, ${languageTranslation("JOB")}${
              //       qualificationForCharge && qualificationForCharge.length
              //         ? ` ${qualificationList
              //             .filter((qualification: any) =>
              //               qualificationForCharge.includes(qualification.value)
              //             )
              //             .map((q: any) => q.label)
              //             .join(', ')}`
              //         : ''
              //     }
              // `);
              //   }
            });

          // group by shift label
          let result = apptRowData.reduce(
            (h, obj) =>
              Object.assign(h, {
                [obj.shiftLabel]: (h[obj.shiftLabel] || []).concat(obj),
              }),
            {}
          );

          for (const property in result) {
            const {
              shiftLabel = "",
              date = "",
              qualificationForCharge = [],
              address = "",
              duration = "",
            } =
              result[property] && result[property].length
                ? result[property][0]
                : {};
            row.push(
              `${date ? `${moment(date).format(defaultDateFormat)}` : ""}${
                result[property] && result[property].length > 1
                  ? ` ${languageTranslation("TILL")} ${moment(
                      result[property][result[property].length - 1].date
                    ).format(defaultDateFormat)}`
                  : ""
              }, [${shiftLabel}] ${duration}${
                address
                  ? `, ${languageTranslation("PLACE_OF_WORK")} ${address}`
                  : ""
              }, ${languageTranslation("JOB")}${
                qualificationForCharge && qualificationForCharge.length
                  ? ` ${qualificationList
                      .filter((qualification: any) =>
                        qualificationForCharge.includes(qualification.value)
                      )
                      .map((q: any) => q.label)
                      .join(", ")}`
                  : "-"
              }`
            );
          }
          // if (index === selectedCells.length -1 ) {
          // }
          setSubject(
            `${languageTranslation(
              "TEMPORAY_EMPLOYEMENT_CONTRACT"
            )} ${appointmentTimings.join(", ")}`
          );
          setPdfAppointmentDetails(row);
        }
        for (let i = 0; i < selectedCellsCareinstitution.length; i++) {
          let object = selectedCellsCareinstitution[i];
          if (object.item) {
            let obj: any = {};
            let shiftLabel =
              object.item.startTime === "06:00"
                ? "FD"
                : object.item.startTime === "14:00"
                ? "SD"
                : "ND";

            obj.id = object.item.id;
            obj.address = object.item.address;
            obj.division = object.item.division
              ? object.item.division.name
              : object.item.name;
            obj.shiftLabel = shiftLabel;
            obj.day = moment(object.item.date).format("D");
            obj.month = moment(object.item.date).format("MMM");
            obj.date = moment(object.item.date).format("DD.MM");
            obj.duration = moment
              .utc(
                moment(object.item.endTime, "HH:mm").diff(
                  moment(object.item.startTime, "HH:mm")
                )
              )
              .format("H.m");
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

        if (props.sortBy === "day") {
          divisionArray = divisionArray.sort(function (a: any, b: any) {
            return a.date - b.date;
          });
        } else {
          divisionArray = divisionArray.sort(sortByDivision);
        }

        let divRow: string = "";
        let pdfDivData: any = [];
        divisionArray.map((v: any, i: number) => {
          if (v.id) {
            let pdfDivRow: string = "";
            divRow += `<p>${
              (v.date + " " + v.shiftLabel,
              +languageTranslation("PLACE_OF_WORK") +
                (v.division ? v.division : " - ") +
                "" +
                (v.address ? ", " + v.address : " "),
              +languageTranslation("JOB") + qualificationString)
            }
              </p>`;

            pdfDivRow += `${
              (v.date + " " + v.shiftLabel,
              +languageTranslation("PLACE_OF_WORK") +
                (v.division ? v.division : " - ") +
                "" +
                (v.address ? ", " + v.address : " "),
              +languageTranslation("JOB") + qualificationString)
            }`;

            pdfDivData.push(pdfDivRow);
          }
        });

        // setPdfAppointmentDetails(pdfDivData);

        let mailBody = `<p>${languageTranslation(
          "CAREGIVER_EMAIL_LEASING_CONTRACT"
        )}</p></br>${requirementEmailData}</br>
        <p>${languageTranslation(
          "USE_FOLLOWING_LINK"
        )} <br/> <a href="http://78.47.143.190:8000/confirm-leasing-appointment/employment-contract/{token}"/> http://78.47.143.190:8000/confirm-leasing-appointment/employment-contract/{token}</a>
        </p></br></br>`;
        // const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
        const updatedContent: any = mailBody
          ? setDefaultSignature(mailBody)
          : "";
        setBody(updatedContent);
        // setBody(editorState);
      }
    }
  }, []);

  useEffect(() => {
    if (terminateAggrement && selectedCells && selectedCells.length) {
      const { item = {}, caregiver = {} } = selectedCells[0]
        ? selectedCells[0]
        : {};
      const {
        firstName = "",
        lastName = "",
        street = "",
        city = "",
        zipCode = "",
        dateOfBirth = "",
      } = caregiver ? caregiver : {};
      setPdfTerminateAppointment({
        name: [firstName, lastName].filter(Boolean).join(" "),
        dateOfBirth: dateOfBirth
          ? `${moment(dateOfBirth, defaultDateFormat).format(
              defaultDateFormat
            )}`
          : "",
        street,
        city,
        zipCode,
      });
    }
  }, [terminateAggrement]);

  useEffect(() => {
    if (selectedCells && selectedCells.length) {
      const { caregiver = {} } = selectedCells[0] 
        ? selectedCells[0]
        : {};
        const { qualificationId:qualificationIds = [] } = caregiver ? caregiver : {};
      const { getQualificationMatching = [] } = requirmentList
        ? requirmentList
        : {};

      let mailBody = "";
      let qualificationReq = "";
      if (
        !leasingContract &&
        !props.confirmApp &&
        ((getQualificationMatching && getQualificationMatching.length) ||
          offerRequirements)
      ) {
        if (qualificationIds && qualificationIds.length) {
          qualificationIds.forEach((qId: string) => {
            qualificationReq += `<br /><p>${languageTranslation(
              "QUALIFICATION_HEAD"
            )}: ${
              qualificationList && qualificationList.length
                ? qualificationList.filter(
                    (qualification: any) => qualification.value === qId
                  )[0].label
                : ""
            }</p>`;
            let temp = getQualificationMatching.filter((requirement: any) =>
              requirement.qualificationId.includes(qId)
            );
            if (temp && temp.length) {
              temp
                .sort((a: any, b: any) => {
                  return (
                    new Date(a.date).valueOf() - new Date(b.date).valueOf()
                  );
                })
                .forEach((requirement: any) => {
                  const {
                    startTime = "",
                    endTime = "",
                    date = "",
                  } = requirement ? requirement : {};
                  let deptDetails = "";
                  // To check if the department is there Then used its detail otherwise careinst details
                  if (requirement && requirement.division) {
                    let {
                      name,
                      address,
                      qualifications,
                    } = requirement.division;
                    deptDetails = `${name}${address ? ` of ${address}` : ""}${
                      qualifications && qualifications.length
                        ? ` - ${qualifications
                            .map((q: any) => q.label)
                            .join(", ")}`
                        : ""
                    }`;
                  } else {
                    let {
                      name = "",
                      address = "",
                      qualificationId = [],
                    } = requirement ? requirement : {};
                    deptDetails = `${name}${address ? ` of ${address}` : ""}${
                      qualificationId && qualificationId.length
                        ? ` - ${qualificationList
                            .filter(
                              (qualification: any) =>
                                qualification.value === qId
                            )
                            .map((q: any) => q.label)
                            .join(", ")}`
                        : ""
                    }`;
                  }
                  if (!moment(date).isBefore(moment(), "day")) {
                    let shiftLabel =
                      startTime === "06:00"
                        ? "FD"
                        : startTime === "14:00"
                        ? "SD"
                        : "ND";
                    let duration = moment
                      .utc(
                        moment(endTime, "HH:mm").diff(
                          moment(startTime, "HH:mm")
                        )
                      )
                      .format("H.m");
                    qualificationReq += `<p>${
                      date ? moment(date).format("DD.MM") : ""
                    } ${shiftLabel} ${duration} ${deptDetails}
                    </p>`;
                  }
                });
            }
          });
        }

        mailBody = `<p>${languageTranslation(
          "OFFER_REQUIREMENTS_TO_CG"
        )}</p><p>${languageTranslation(
          "CAREGIVER_OFFER_EMAIL_HEADING"
        )}</p><p>${languageTranslation(
          "CAREGIVER_OFFER_EMAIL_QUALIFICATION_WANTED"
        )}</p>${qualificationReq}<br/><p>${
          languageTranslation("FEE") + ":" + languageTranslation("FEE_TEXT")
        }</br>`;
        // const editorState = mailBody ? HtmlToDraftConverter(mailBody) : '';
        setSubject(languageTranslation("OFFER_REQUIREMENTS_SUB"));
        const updatedContent: any = mailBody
          ? setDefaultSignature(mailBody)
          : "";
        setBody(updatedContent);
        // setBody(editorState);
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
          value: id ? id.toString() : "",
        });
      });
    }
  }

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
      // const editorState = body ? HtmlToDraftConverter(body) : '';
      const updatedContent: any = body ? setDefaultSignature(body) : "";
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

  let userId = "",
    appointmentIds: number[] = [],
    requirementIds: number[] = [],
    avabilityIds: number[] = [];

  if (selectedCells && selectedCells.length > 0) {
    let appointedCells = selectedCells.filter(
      (cell: any) =>
        cell.item &&
        cell.item.appointments &&
        cell.item.appointments.length &&
        cell.item.appointments[0].id
    );
    userId = selectedCells[0].caregiver.id;
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
    if (
      userId &&
      leasingContract &&
      pdfAppointmentDetails &&
      pdfAppointmentDetails.length
    ) {
      // let documentInput: any = {
      //   appointmentId: appointmentIds,
      //   userId: parseInt(userId),
      //   isDocumentTemplate: false,
      //   documentUploadType: 'leasingContract',
      //   document: leasingContactPdfData,
      // };

      // addUserDocuments({
      //   variables: {
      //     documentInput
      //   }
      // });

      UpdateLeasingContractStatus({
        variables: {
          appointmentId: appointmentIds,
          availablityId: avabilityIds,
          requirementId: requirementIds,
          status: "contractInitiated",
        },
      });
      generateLeasingContractLinkToken({
        variables: {
          appointmentId: appointmentIds,
          availabilityId: avabilityIds,
          userId: parseInt(userId),
          status: "leasingContract",
          pdfAppointmentDetails,
        },
      });
      // updateLinkedStatus('contractInitiated')
    }
  }, [pdfAppointmentDetails]);

  useEffect(() => {
    if (
      userId &&
      terminateAggrement &&
      pdfTerminateAppointment &&
      pdfTerminateAppointment.name
    ) {
      // let documentInput: any = {
      //   appointmentId: appointmentIds,
      //   userId: parseInt(userId),
      //   isDocumentTemplate: false,
      //   documentUploadType: 'terminateAgreement',
      //   document: terminationAgreementPdfData,
      // };
      // addUserDocuments({
      //   variables: {
      //     documentInput
      //   }
      // });
      UpdateLeasingContractStatus({
        variables: {
          appointmentId: appointmentIds,
          availablityId: avabilityIds,
          requirementId: requirementIds,
          status: "contractCancelled",
        },
      });
      generateLeasingContractLinkToken({
        variables: {
          appointmentId: appointmentIds,
          availabilityId: avabilityIds,
          userId: parseInt(userId),
          status: "terminateAgreement",
          pdfAppointmentDetails: [pdfTerminateAppointment],
        },
      });
      // updateLinkedStatus('contractCancelled')
    }
  }, [pdfTerminateAppointment]);

  const handleSendEmail = async (e: React.FormEvent<any>) => {
    e.preventDefault();

    let content = body
      ? draftToHtml(convertToRaw(body.getCurrentContent()))
      : "";
    const result = stripHtml(content);
    setIsSubmit(true);

    try {
      let appointmentId = "";
      if (leasingContract || terminateAggrement) {
        let userId = "";
        let requirementId = "";
        let avabilityId = "";
        if (selectedCells && selectedCells.length > 0) {
          userId = selectedCells[0].id;
          appointmentId = selectedCells.map((cell: any) =>
            cell.item && cell.item.appointments && cell.item.appointments.length
              ? cell.item.appointments[0].id
              : ""
          );
          avabilityId = selectedCells.map((cell: any) =>
            cell.item && cell.item.appointments && cell.item.appointments.length
              ? cell.item.appointments[0].avabilityId
              : ""
          );
        }
        if (
          selectedCellsCareinstitution &&
          selectedCellsCareinstitution.length > 0
        ) {
          if (
            selectedCellsCareinstitution[0].item &&
            selectedCellsCareinstitution[0].item.appointments
          ) {
            let appointments =
              selectedCellsCareinstitution[0].item.appointments;
            if (appointments.length > 0) {
              appointmentId = appointments[0].id;
              requirementId = appointments[0].requirementId;
              avabilityId = appointments[0].avabilityId;
            }
          }
        }
      }

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

        // set array of objects of userId and check attribute to disable link for single button
        let singleButtonCaregiverList: any = [];
        if (careGiverData && careGiverData.length) {
          careGiverData.map((key: any, index: number) => {
            let temp = uniqueUser.filter(
              (id: string) => parseInt(id) === parseInt(key.id)
            );

            if (temp && temp.length) {
              let checkAttribute: any;
              if (
                key.caregiver &&
                key.caregiver.attributes &&
                key.caregiver.attributes.length
              ) {
                checkAttribute = key.caregiver.attributes.includes(60);
              }
              singleButtonCaregiverList.push({
                receiverUserId: key && key.id ? parseInt(key.id) : null,
                disableLink: checkAttribute ? true : false,
              });
            }
          });
        }
        let condition: boolean =
          selectedCellsCareinstitution &&
          selectedCellsCareinstitution.length &&
          selectedCellsCareinstitution[0] 
            ? true
            : false;

        if (props.showButton) {
          const bulkEmailsInput: IBulkEmailVariables = {
            to: "caregiver",
            from: "plycoco",
            subject: subject /* .replace(/AW:/g, '') */,
            body: body ? content : "",
            parentId: null,
            status: "unread",
            type: "offer",
            requirementId:
              condition &&
              selectedCellsCareinstitution[0].item &&
              selectedCellsCareinstitution[0].item.id 
                ? parseInt(selectedCellsCareinstitution[0].item.id)
                : null,
            date: condition && 
          selectedCellsCareinstitution[0].item.date
              ? moment(selectedCellsCareinstitution[0].item.date).format(
                  dbAcceptableFormat
                )
              : "",
            caregiver: singleButtonCaregiverList,
            senderUserId: id ? parseInt(id) : null,
          };
          SingleButtonbulkEmails({ variables: { bulkEmailsInput } });
        } else {
          if (subject && body && result && result.length >= 2) {
            const bulkEmailsInput: IBulkEmailVariables = {
              to: "caregiver",
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
              caregiver: careGiverIdList,
              senderUserId: id ? parseInt(id) : null,
            };
            bulkEmails({ variables: { bulkEmailsInput } });
          }
        }
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.error(
            languageTranslation("EMAIL_SELECT_CARE_GIVERS", {
              userRole: languageTranslation("CAREGIVER_USERROLE"),
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
              <div
                className={
                  props.label === "appointment"
                    ? "header-nav-item disabled-class"
                    : "header-nav-item"
                }
              >
                <span className="header-nav-icon">
                  <img src={filter} alt="" />
                </span>
                <span className="header-nav-text">
                  {languageTranslation("ATTRIBUTES")}
                </span>
              </div>
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

          <div className="common-content flex-grow-1">
            <div className="bulk-email-section">
              <Row>
                {(leasingContract || terminateAggrement) &&
                (generating || !tokenAPICalled) ? (
                  <div style={{ minHeight: "200px" }}>
                    <Loader />
                  </div>
                ) : (
                  <>
                    <CareGiverListComponent
                      offerRequirements={offerRequirements}
                      careGivers={
                        props.label !== "appointment"
                          ? careGivers
                          : careGiversList
                      }
                      handleSelectAll={handleSelectAll}
                      called={
                        props.label !== "appointment"
                          ? called
                          : props.offerCareGiver
                          ? careGiverListCalled
                          : true
                      }
                      loading={
                        props.label !== "appointment"
                          ? loading
                          : props.offerCareGiver
                          ? caregiverLoading
                          : false
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
                      isFromUnlink={props.isFromUnlink}
                      terminateAggrement={terminateAggrement}
                      leasingContract={leasingContract}
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
                  </>
                )}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkEmailCaregiver;
