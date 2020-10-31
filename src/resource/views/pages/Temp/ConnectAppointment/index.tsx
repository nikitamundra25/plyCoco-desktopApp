import { useMutation } from "@apollo/react-hooks";
import React, { FunctionComponent, Suspense, useState } from "react";
import { toast } from "react-toastify";
import { Button, NavLink } from "reactstrap";
import moment from "moment";
import connect from "../../../../assets/img/dropdown/connect.svg";
import disconnect from "../../../../assets/img/dropdown/disconnect.svg";
import { dbAcceptableFormat } from "../../../../../config";
import { AppointmentMutations } from "../../../../../graphql/Mutations";
import { languageTranslation } from "../../../../../helpers";
import {
  IlinkAppointmentInput,
  IUnlinkAppointmentInput,
  IunlinkResponse,
} from "../../../../../interfaces";
import { ConfirmBox } from "../../../components/ConfirmBox";
import BulkEmailCareInstitutionModal from "../../Appointment/BulkEmailCareInstitution";
import BulkEmailCareGiverModal from "../../Appointment/BulkEmailCareGiver";
const [
  ,
  ,
  ,
  ,
  ,
  ,
  LINK_REQUIREMENT,
  UN_LINK_REQUIREMENT,
] = AppointmentMutations;
let toastId: any = null;

const ConnectAppointment: FunctionComponent<any> = ({
  selectedCaregiverData = [],
  selectedCareinstitutionData = [],
  qualifications = [],
  setSelectedCaregiver,
  setSelectedCareinstitution,
  handleupdateData,
  label,
  hide,
}: any) => {
  // Mutation to linkRequirement
  const [linkRequirement, { loading: linkLoading }] = useMutation<{
    appointmentInput: IlinkAppointmentInput;
  }>(LINK_REQUIREMENT, {
    onCompleted({ addAppointment }: any) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("LINKED_APPOINTMENTS"));
      }
      updateLinkItemData(addAppointment);
      handleupdateData(addAppointment, "both");
    },
  });

  // Mutation to unLink Requirement
  const [
    unLinkRequirement,
    { data: unlinkResponse, loading: unlinkLoading },
  ] = useMutation<{
    deleteAppointment: IunlinkResponse;
    appointmentInput: IUnlinkAppointmentInput;
  }>(UN_LINK_REQUIREMENT, {
    onCompleted({ deleteAppointment }: any) {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("UN_LINKED_APPOINTMENTS"));
      }
      handleupdateData(deleteAppointment, "both");
      updateUnlinkItemData(deleteAppointment);
    },
  });

  const [showUnlinkModal, setshowUnlinkModal] = useState<boolean>(false);
  const [unlinkedBy, setunlinkedBy] = useState<string>("");
  const [isFromUnlink, setisFromUnlink] = useState(false);
  // state for care giver bulk email
  const [openCareGiverBulkEmail, setopenCareGiverBulkEmail] = useState<boolean>(
    false
  );
  // state for care institution bulk email
  const [
    openCareInstitutionBulkEmail,
    setopenCareInstitutionBulkEmail,
  ] = useState<boolean>(false);

  // Update data in form when unlink appointments
  const updateUnlinkItemData = (itemData: any) => {
    if (itemData && itemData.length) {
      const {
        deleteAll = false,
        id: appointId = "",
        unlinkedBy = "",
      } = itemData[0] ? itemData[0] : {};
      if (deleteAll) {
        if (unlinkedBy === "caregiver") {
          updateCareinstitutionStatus("unlink", []);
          setSelectedCaregiver([]);
        } else if (unlinkedBy === "canstitution") {
          updateCaregiverStatus("unlink", []);
          setSelectedCareinstitution([]);
        } else if (unlinkedBy === "employee") {
          setSelectedCaregiver([]);
          setSelectedCareinstitution([]);
        }
      } else {
        updateCaregiverStatus("unlink", []);
        updateCareinstitutionStatus("unlink", []);
      }
    }
  };

  // Update data in form when link appointments
  const updateLinkItemData = (itemData: any) => {
    if (itemData && itemData.length) {
      const {
        avabilityId = "",
        ca = {},
        cr = {},
        createdBy = "",
        date = "",
        id = "",
        requirementId = "",
      } = itemData[0] ? itemData[0] : {};
      const careinst = [
        {
          avabilityId,
          ca,
          createdBy,
          date,
          id,
          requirementId,
        },
      ];
      const caregiver = [
        {
          avabilityId,
          cr,
          createdBy,
          date,
          id,
          requirementId,
        },
      ];

      updateCaregiverStatus("link", caregiver);
      updateCareinstitutionStatus("link", careinst);
    }
  };

  // Update status for caregiver
  const updateCaregiverStatus = (name: string, appointments: any) => {
    const { isWeekend = "", item = undefined, caregiver = {} } =
      selectedCaregiverData && selectedCaregiverData.length
        ? selectedCaregiverData[0]
        : {};
    let data: any = [
      {
        isWeekend,
        caregiver: {
          ...caregiver,
        },
        item: {
          ...item,
          status: name === "unlink" ? "default" : "linked",
          appointments,
        },
      },
    ];
    setSelectedCaregiver(data);
  };

  // Update status for careinstitution
  const updateCareinstitutionStatus = (name: string, appointment: any) => {
    const {
      isWeekend: careInstisWeekend = "",
      item: careInstItem = undefined,
      canstitution = {},
    } =
      selectedCareinstitutionData && selectedCareinstitutionData.length
        ? selectedCareinstitutionData[0]
        : {};
    let datacareInst: any = [
      {
        isWeekend: careInstisWeekend,
        canstitution: {
          ...canstitution,
        },
        item: {
          ...careInstItem,
          status: name === "unlink" ? "default" : "linked",
          appointments:
            appointment && appointment.length
              ? appointment
              : careInstItem.appointments,
        },
      },
    ];
    setSelectedCareinstitution(datacareInst);
  };

  // Handle unlink both
  const handleUnlinkBoth = () => {
    setshowUnlinkModal(!showUnlinkModal);
  };

  // Link both forms
  const handleLinkBoth = async () => {
    console.log("Hereeeeeeeeeeeeeeeeeee", selectedCareinstitutionData);
    console.log("selectedCaregiverData", selectedCaregiverData);

    let selectedData: any = [],
      checkError: boolean = false;
    if (
      selectedCareinstitutionData &&
      selectedCareinstitutionData.length &&
      selectedCaregiverData &&
      selectedCaregiverData.length
    ) {
      if (selectedCareinstitutionData.length !== selectedCaregiverData.length) {
        toast.dismiss();
        if (!toast.isActive(toastId)) {
          toastId = toast.error(languageTranslation("LINK_SAME_LENGTH"));
        }
      } else {
        if (
          selectedCaregiverData[0].caregiver &&
          selectedCaregiverData[0].caregiver.attributes &&
          selectedCaregiverData[0].caregiver.attributes.length
        ) {
          let checkAttribute = selectedCaregiverData[0].caregiver.attributes.includes(
            10060
          );
          if (checkAttribute) {
            const { value } = await ConfirmBox({
              title: languageTranslation("ATTRIBUTE_WARNING"),
              text: languageTranslation("LINKED_ATTRIBUTE_WARNING"),
            });
            if (!value) {
              checkError = true;
              return;
            }
          }
        }
        let qualiCheck: any[] = [];
        selectedCaregiverData.map(async (key: any, index: number) => {
          const element = selectedCareinstitutionData[index];

          if (
            key.item.fee &&
            key.item.weekendAllowance &&
            key.item.holidayAllowance &&
            key.item.nightFee
          ) {
            if (
              key.caregiver.qualificationId &&
              key.caregiver.qualificationId.length &&
              element.item.qualificationId &&
              element.item.qualificationId.length
            ) {
              qualiCheck = element.item.qualificationId.filter((e: any) =>
                key.caregiver.qualificationId.includes(e)
              );
            }
            if (qualiCheck && qualiCheck.length <= 0) {
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.warn(
                  languageTranslation("QUALIFICATION_UNMATCH")
                );
              }
              checkError = true;
              return true;
            }
            if (
              moment(key.item.date).format(dbAcceptableFormat) !==
              moment(element.item.date).format(dbAcceptableFormat)
            ) {
              checkError = true;
              toast.dismiss();
              if (!toast.isActive(toastId)) {
                toastId = toast.error(
                  languageTranslation("DATE_RANGE_MISMATCH")
                );
              }
              return false;
            } else if (key.item === undefined || element.item === undefined) {
              checkError = true;
              if (!toast.isActive(toastId)) {
                toastId = toast.error(languageTranslation("LINK_ERROR"));
              }
              return false;
            } else {
              if (!checkError) {
                selectedData.push({
                  avabilityId: parseInt(key.item.id),
                  requirementId: parseInt(element.item.id),
                  date: moment(element.dateString).format(dbAcceptableFormat),
                  status: "appointment",
                });
              }
            }
          } else {
            checkError = true;
            const { value } = await ConfirmBox({
              title: languageTranslation("FEES_ERROR_MESSAGE"),
              text: languageTranslation("LINKED_FEES_MESSAGE"),
              type: "error",
              showCancelButton: false,
              confirmButtonText: "Ok",
            });
            return;
          }
        });
        if (!checkError) {
          onLinkAppointment(selectedData, "link");
        }
      }
    }
  };

  const handleUnlinkData = (likedBy: string, check: boolean) => {
    setunlinkedBy(likedBy);
    let appointmentId: any = [];
    if (selectedCareinstitutionData && selectedCareinstitutionData.length) {
      selectedCareinstitutionData.map((key: any, index: number) => {
        return appointmentId.push({
          appointmentId: parseInt(
            key.item.appointments ? key.item.appointments[0].id : ""
          ),
          unlinkedBy: likedBy,
          deleteAll: check,
        });
      });
      onLinkAppointment(appointmentId, "unlink");
      if (likedBy !== "employee") {
        setisFromUnlink(true);
        setopenCareGiverBulkEmail(!openCareGiverBulkEmail);
        setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail);
      }
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(languageTranslation("SELECT_APPOINTMENT"));
      }
    }
  };

  // On link requirement
  const onLinkAppointment = async (selectedOption: any, name: string) => {
    if (name === "link") {
      await linkRequirement({
        variables: {
          appointmentInput: selectedOption,
        },
      });
    } else {
      await unLinkRequirement({
        variables: {
          appointmentInput: selectedOption,
        },
      });
    }
  };

  const renderUnlinkModal = () => {
    if (showUnlinkModal) {
      const UnlinkAppointment = React.lazy(() => import("./unlinkModal"));
      return (
        <Suspense fallback={null}>
          <UnlinkAppointment
            show={showUnlinkModal}
            handleClose={() => setshowUnlinkModal(false)}
            handleUnlinkData={handleUnlinkData}
          />
        </Suspense>
      );
    }
  };

  const { item = undefined } =
    selectedCaregiverData && selectedCaregiverData.length
      ? selectedCaregiverData[0]
      : [];

  const { item: careInstItem = undefined } =
    selectedCareinstitutionData && selectedCareinstitutionData.length
      ? selectedCareinstitutionData[0]
      : [];

  const isUnLinkable: boolean =
    item &&
    item.appointments &&
    item.appointments.length &&
    careInstItem &&
    careInstItem.appointments &&
    item.appointments[0] &&
    item.appointments[0].id &&
    careInstItem.appointments[0] &&
    careInstItem.appointments[0].id &&
    item.appointments[0].id === careInstItem.appointments[0].id
      ? true
      : false;

  return (
    <>
      {label === "link" ? (
        <NavLink
          onClick={() => {
            handleLinkBoth();
            hide();
          }}
        >
          <img src={connect} className="mr-2" alt="" />
          <span className="align-middle">
            {languageTranslation("CONNECT_APPOINTMENT")}
          </span>
        </NavLink>
      ) : label === "unlink" ? (
        <NavLink
          // disabled={selectedCells ? selectedCells.length === 0 : true}
          onClick={() => {
            hide();
            handleUnlinkBoth();
          }}
        >
          <img src={disconnect} className="mr-2" alt="" />
          <span className="align-middle">
            {languageTranslation("DISCONNECT_APPOINTMENT")}
          </span>
        </NavLink>
      ) : (
        <Button
          className="btn-common mt-0 mb-2 mx-2"
          color="secondary"
          // disabled={
          //   isUnLinkable ? false : isLinkable ? false : true
          // }
          onClick={() => (isUnLinkable ? handleUnlinkBoth() : handleLinkBoth())}
        >
          {linkLoading || unlinkLoading ? (
            <i className="fa fa-spinner fa-spin mr-2" />
          ) : (
            <i className="fa fa-link mr-2" />
          )}

          {isUnLinkable
            ? languageTranslation("UNLINK")
            : languageTranslation("LINK")}
        </Button>
      )}
      {renderUnlinkModal()}
      <BulkEmailCareInstitutionModal
        openModal={openCareInstitutionBulkEmail}
        handleClose={() =>
          setopenCareInstitutionBulkEmail(!openCareInstitutionBulkEmail)
        }
        qualification={qualifications}
        selectedCellsCareinstitution={selectedCareinstitutionData}
        selectedCells={selectedCaregiverData}
        unlinkedBy={unlinkedBy}
        isFromUnlink={isFromUnlink}
      />
      {/* {openCaregiverModal()} */}
      {openCareGiverBulkEmail ? (
        <BulkEmailCareGiverModal
          openModal={openCareGiverBulkEmail}
          qualification={qualifications}
          handleClose={() => setopenCareGiverBulkEmail(!openCareGiverBulkEmail)}
          selectedCells={selectedCaregiverData}
          selectedCellsCareinstitution={selectedCareinstitutionData}
          unlinkedBy={unlinkedBy}
        />
      ) : null}
    </>
  );
};

export default ConnectAppointment;
