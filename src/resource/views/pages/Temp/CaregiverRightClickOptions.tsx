import React from "react";
import classnames from "classnames";
import { languageTranslation } from "../../../../helpers";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import reserve from "../../../assets/img/dropdown/block.svg";
import new_appointment from "../../../assets/img/dropdown/new_appointment.svg";
import delete_appointment from "../../../assets/img/dropdown/delete.svg";
import detail_list from "../../../assets/img/dropdown/detail_list.svg";
import filter from "../../../assets/img/filter.svg";
import offer_sent from "../../../assets/img/dropdown/offer_sent.svg";
import connect from "../../../assets/img/dropdown/connect.svg";
import disconnect from "../../../assets/img/dropdown/disconnect.svg";
import confirm_appointment from "../../../assets/img/dropdown/confirm_appointment.svg";
import set_confirm from "../../../assets/img/dropdown/confirm.svg";
import unset_confirm from "../../../assets/img/dropdown/not_confirm.svg";
import leasing_contact from "../../../assets/img/dropdown/leasing.svg";
import termination from "../../../assets/img/dropdown/aggrement.svg";
import { toast } from "react-toastify";
import moment from "moment";
import { IAddCargiverAppointmentRes } from "../../../../interfaces";
import { AppointmentMutations } from "../../../../graphql/Mutations";
import { useMutation } from "@apollo/react-hooks";
import { dbAcceptableFormat } from "../../../../config";
import { ConfirmBox } from "../../components/ConfirmBox";
const [
  ADD_CAREGIVER_AVABILITY,
  ,
  UPDATE_CAREGIVER_AVABILITY,
  ,
  ,
  DELETE_CAREGIVER_AVABILITY,
] = AppointmentMutations;

let toastId: any = null;
export const CaregiverRightClickOptions = ({
  isOpen,
  hide,
  selectedCells,
  onNewAvailability,
  onUpdateStatus,
  handleupdateData,
  multipleAvailability,
  caregiversList,
  formatCaregivers,
}: any) => {
  // Mutation to add careGiver data
  const [
    addCaregiverAvailability,
    { error, data: addCaregiverRes, loading: addCaregiverLoading },
  ] = useMutation<
    {
      addCareGiverAvability: [IAddCargiverAppointmentRes];
    },
    {
      careGiverAvabilityInput: any;
    }
  >(ADD_CAREGIVER_AVABILITY, {
    onCompleted({ addCareGiverAvability }) {
      handleupdateData(addCareGiverAvability, "caregiver");
      updateItemData(addCareGiverAvability);
      toast.dismiss();
    },
  });

  // Mutation to update careGiver data
  const [
    updateCaregiver,
    { data: updateCaregiverRes, loading: updateCaregiverLoading },
  ] = useMutation<
    {
      updateCareGiverAvability: IAddCargiverAppointmentRes;
    },
    {
      id: number;
      careGiverAvabilityInput: any;
    }
  >(UPDATE_CAREGIVER_AVABILITY, {
    onCompleted({ updateCareGiverAvability }) {
      handleupdateData([updateCareGiverAvability], "caregiver");
      updateItemData([updateCareGiverAvability]);
    },
  });

  // Mutation to delete caregiver
  const [deleteCaregiverAvailability, {}] = useMutation<
    {
      deleteCaregiverAvailability: any;
    },
    { id: number[] }
  >(DELETE_CAREGIVER_AVABILITY, {
    onCompleted({ deleteCareGiverAvability }: any) {
      onUpdateStatus([]);
      handleupdateData(deleteCareGiverAvability, "caregiver");
    },
  });

  /**
   *@param itemData
   *
   */
  const updateItemData = (itemData: any) => {
    let temp: any = [];
    selectedCells.forEach(async (element: any, index: number) => {
      const { isWeekend = "", item = undefined, caregiver = {} } = element
        ? element
        : {};
      let data: any = {
        isWeekend,
        caregiver: {
          ...caregiver,
        },
        item: itemData[index],
      };

      temp.push(data);
    });
    onUpdateStatus(temp);
  };
  /**
   *
   *
   */
  const onReserve = async () => {
    if (selectedCells && selectedCells.length) {
      let careGiverAvabilityInput: any = [];
      selectedCells.forEach(async (element: any) => {
        const { isWeekend = "", item = {}, caregiver = {} } = element
          ? element
          : {};
        if (item && item.id) {
          let availabilityId: number = item.id ? parseInt(item.id) : 0;
          delete item.id;
          delete item.__typename;
          delete item.appointments;
          delete item.updatedAt;
          await updateCaregiver({
            variables: {
              id: availabilityId,
              careGiverAvabilityInput: {
                ...item,
                f: "block",
                s: "block",
                n: "block",
                userId: caregiver.id,
                name:
                  caregiver && caregiver.firstName
                    ? `${caregiver.lastName} ${caregiver.firstName}`
                    : "",
              },
            },
          });
          toast.dismiss();
          if (!toast.isActive(toastId)) {
            toastId = toast.success(
              languageTranslation("CARE_GIVER_REQUIREMENT_UPDATE_SUCCESS_MSG")
            );
          }
        } else {
          careGiverAvabilityInput.push({
            userId: caregiver && caregiver.id ? parseInt(caregiver.id) : "",
            name:
              caregiver && caregiver.firstName
                ? `${caregiver.lastName} ${caregiver.firstName}`
                : "",
            date: item.date ? moment(item.date).format(dbAcceptableFormat) : "",
            fee: null,
            weekendAllowance: null,
            holidayAllowance: null,
            nightFee: null,
            nightAllowance: null,
            workingProofRecieved: false,
            distanceInKM: null,
            feePerKM: null,
            travelAllowance: null,
            otherExpenses: null,
            remarksCareGiver: null,
            remarksInternal: null,
            f: "block",
            s: "block",
            n: "block",
            status: "default",
          });
        }
      });
      if (careGiverAvabilityInput && careGiverAvabilityInput.length) {
        await addCaregiverAvailability({
          variables: {
            careGiverAvabilityInput: careGiverAvabilityInput,
          },
        });
      }
    }
  };

  /**
   *
   *
   */
  let { item = undefined } =
    selectedCells &&
    // to check multiple cells are free or reserve or you've clicked on new appointment to reflect the form
    (selectedCells.length === 1 ||
      multipleAvailability ||
      (selectedCells[0] && selectedCells[0].item)) &&
    selectedCells[0]
      ? selectedCells[0]
      : {};

  const onDeleteEntries = async () => {
    let temp: any = selectedCells ? [...selectedCells] : [];
    let linkedEntries = temp.filter(
      (element: any) => element.item && element.item.status === "linked"
    );

    if (linkedEntries && linkedEntries.length) {
      const { value } = await ConfirmBox({
        title: languageTranslation("APPOINTMENT_CANT_BE_DELETED"),
        text: languageTranslation("UNLINK_AND_DELETE"),
        showCancelButton: false,
        confirmButtonText: languageTranslation("OKAY_LABEL"),
      });
      if (!value) {
        return;
      }
    } else {
      if (temp && temp.length) {
        let freeEntries = temp.filter(
          (element: any) =>
            !element.item || (element.item && !element.item.status)
        );

        let reservedEntries = temp.filter(
          (element: any) => element.item && element.item.status === "default"
        );

        freeEntries.forEach(async (element: any) => {
          const { caregiver } = element;
          let index: number = -1;

          if (!item) {
            index = caregiversList.findIndex(
              (caregiv: any) => caregiv.id === caregiver.userId
            );

            if (index > -1) {
              formatCaregivers(caregiversList);
            }
          }
        });
        if (reservedEntries && reservedEntries.length) {
          const { value } = await ConfirmBox({
            title: languageTranslation("CONFIRM_LABEL"),
            text: languageTranslation("CONFIRM_DELETE_CAREGIVER_AVABILITY"),
          });
          if (value) {
            await deleteCaregiverAvailability({
              variables: {
                id: reservedEntries.map((element: any) =>
                  parseInt(element.item.id)
                ),
                // parseInt(item.id),
              },
            });

            if (!toast.isActive(toastId)) {
              toastId = toast.success(
                languageTranslation("DELETE_CAREGIVER_AVABILITY_SUCCESS")
              );
            }
          } else {
            return;
          }
        }
      }
    }
  };

  return (
    <>
      <div
        className={classnames({
          "rightclick-menu top-open": true,
          "d-none": !isOpen,
        })}
      >
        <Nav vertical>
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                hide();
                onNewAvailability ? onNewAvailability() : undefined;
              }}
            >
              <img src={new_appointment} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("NEW_APPOINTMENT")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                hide();
                onReserve ? onReserve() : undefined;
              }}
            >
              <img src={reserve} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("RESERVE")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                hide();
                onDeleteEntries ? onDeleteEntries() : undefined;
              }}
            >
              <img src={delete_appointment} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("DELETE_FREE_CALENDER")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                hide();
                // setShowList(true);
              }}
            >
              <img src={detail_list} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("DETAILED_LIST")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem
            disabled={selectedCells ? selectedCells.length === 0 : true}
            onClick={() => {
              hide();
              // onCaregiverQualificationFilter
              //   ? onCaregiverQualificationFilter()
              //   : undefined;
            }}
          >
            <NavLink
              disabled={selectedCells ? selectedCells.length === 0 : true}
            >
              <img src={filter} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("FILTER_BY_QUALI")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              /* disabled={
                selectedCells
                  ? selectedCells.length === 0 ||
                    (offferAll && offferAll.length !== 0) ||
                    (checkQuali && checkQuali.length === 0)
                  : true
              } */
              onClick={() => {
                hide();
                // setOfferRequirements(true);
                // setopenCareGiverBulkEmail(true);
              }}
            >
              <img src={offer_sent} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("OFFER_ALL_CALENDER")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              onClick={() => {
                hide();
                // handleLinkAppointments("link");
              }}
            >
              <img src={connect} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("CONNECT_APPOINTMENT")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              // disabled={selectedCells ? selectedCells.length === 0 : true}
              onClick={() => {
                hide();
                // handleUnLinkAppointments();
              }}
            >
              <img src={disconnect} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("DISCONNECT_APPOINTMENT")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem className="bordernav" />
          <NavItem>
            <NavLink
              onClick={() => {
                hide();
                // updateCaregiverStatus("confirmed");
                // setconfirmApp(true);
                // handleCareGiverBulkEmail();
              }}
            >
              <img src={confirm_appointment} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("CONFIRM_APPOINTMENT")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink>
              <img src={set_confirm} className="mr-2" alt="" />
              <span
                className="align-middle"
                onClick={() => {
                  hide();
                  // updateCaregiverStatus("confirmed");
                }}
              >
                {languageTranslation("SET_ON_CONF")}
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            // disabled={
            //   selectedCells
            //     ? selectedCells.length === 0 ||
            //       (selectedCells[0].item &&
            //         selectedCells[0].item.status !== "confirmed") ||
            //       isLeasingAppointment
            //     : true
            // }
            >
              <img src={unset_confirm} className="mr-2" alt="" />
              <span
                className="align-middle"
                onClick={() => {
                  hide();
                  // updateCaregiverStatus("notconfirmed");
                }}
              >
                {languageTranslation("SET_ON_NOT_CONF")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                hide();
                // setleasingContract(true);
                // handleCareGiverBulkEmail();
              }}
            >
              <img src={leasing_contact} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("REQUEST_TEMP_LEASING")}
              </span>
            </NavLink>{" "}
          </NavItem>
          <NavItem>
            <NavLink onClick={() => {}}>
              <img src={termination} className="mr-2" alt="" />
              <span className="align-middle">
                {languageTranslation("CREATE_TERMINATION_AGREEMENT")}
              </span>
            </NavLink>{" "}
          </NavItem>
        </Nav>
      </div>
    </>
  );
};
