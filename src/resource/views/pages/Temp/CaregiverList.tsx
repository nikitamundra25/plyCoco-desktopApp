import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import classnames from "classnames";
import _, { filter, map } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { Link } from "react-router-dom";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import {
  APPOINTMENT_PAGE_LIMIT,
  AppRoutes,
  CaregiverTIMyoCYAttrId,
  dbAcceptableFormat,
  deactivatedListColor,
  leasingListColor,
  selfEmployesListColor,
} from "../../../../config";
import { AppointmentsQueries } from "../../../../graphql/queries";
import { getDaysArrayByMonth, languageTranslation } from "../../../../helpers";
import { Button } from "reactstrap";
import Spinner, { MoreSpinner } from "../../components/Spinner";
import { CaregiverRightClickOptions } from "./CaregiverRightClickOptions";
import { IStarInterface } from "../../../../interfaces";

const [
  GET_USERS_BY_QUALIFICATION_ID,
  ,
  GET_CAREINSTITUTION_REQUIREMENT_BY_ID,
  ,
  ,
  ,
  ,
  ,
] = AppointmentsQueries;
const staticHeader = ["caregiver", "H", "S", "U", "V"];
let allCaregivers: any[] = [];
/**
 *
 */
let starCaregiverVar: any = {
  isStar: false,
  setIndex: -1,
  id: "",
};
let selectedcareInstApptId: number[] = [];

const SelectableCell = React.memo(
  createSelectable(
    ({ selectableRef, isSelecting, isSelected, isWeekend, item,selectedcareInstApptId }: any) => {
      let isMatching: boolean = false,
        isConfirm: boolean = false,
        isContractCancel: boolean = false,
        isContractInitiated: boolean = false,
        isSingleButtonAccepted: boolean = false,
        isTimeSheetPending: boolean = false,
        isInvoiceInitiated: boolean = false,
        caregiverCell:any = -1;
      if (item.status === "linked") {
        isMatching = true;
      } else if (item.status === "confirmed") {
        isConfirm = true;
      } else if (item.status === "contractCancelled") {
        isContractCancel = true;
      } else if (item.status === "contractInitiated") {
        isContractInitiated = true;
      } else if (item.status === "invoiceInitiated") {
        isInvoiceInitiated = true;
      } else if (item.status === "accepted") {
        isSingleButtonAccepted = true;
      } else if (
        item.status === "timeSheetPending" ||
        item.status === "timeSheetUpdated"
      ) {
        isTimeSheetPending = true;
      }

      if (item && item.appointments) {
        const { appointments = [] } = item;
        const {  id = "" } =
          appointments && appointments.length ? appointments[0] : {};
        caregiverCell = id
      }

      let isBlocked: boolean = false;
      if (item) {
        isBlocked =
          item.f === "block" || item.s === "block" || item.n === "block";
      }

      // Date condition to not display fsn if date is before today
      let isBeforedate = false;
      if (item && item.date) {
        isBeforedate = moment(item.date).isBefore(moment(), "day");
      }
      return (
        <>
          <span
            className={classnames({
              "calender-col": true,
              "text-center": true,
              "custom-appointment-col": true,
              "cursor-pointer": true,
              "selecting-cell-bg": isSelecting || isSelected ||  selectedcareInstApptId.includes(caregiverCell),
              weekend: isWeekend,
              "contact-initiate-bg":
                isContractInitiated && !isSelected
                  ? isContractInitiated
                  : false,

              "invoice-bg":
                isInvoiceInitiated && !isSelected ? isInvoiceInitiated : false,
              "cancel-contract-bg":
                isContractCancel && !isSelected ? isContractCancel : false,
              "block-bg": item ? (isBlocked ? true : false) : false,
              "matching-bg": isMatching && !isSelected ? isMatching : false,
              "confirmation-bg":
                isTimeSheetPending && !isSelected ? isTimeSheetPending : false,
              "contract-bg": isConfirm && !isSelected ? isConfirm : false,
              "accepted-bg":
                isSingleButtonAccepted && !isSelected
                  ? isSingleButtonAccepted
                  : false,
              "availability-dark-bg": !isSelected
                ? item
                  ? item.f === "available" ||
                    item.s === "available" ||
                    item.n === "available"
                    ? item && item.status === "default" && isBeforedate
                      ? false
                      : true
                    : false
                  : false
                : false,
              "availability-bg":
                !isSelected && item && item.status === "default" && isBeforedate
                  ? true
                  : false,
            })}
            ref={selectableRef}
          >
            {item.status === "timeSheetPending" ? (
              <i className="fa fa-circle-o"></i>
            ) : item.status === "timeSheetUpdated" ? (
              <i className="fa fa-check"></i>
            ) : item.status === "invoiceInitiated" ? (
              <i className="fa fa-euro"></i>
            ) : item.f === "block" ||
              item.s === "block" ||
              item.n === "block" ? (
              <i className="fa fa-ban"></i>
            ) : item.status === "default" &&
              new Date(item.date).toTimeString() <
                new Date().toTimeString() ? null : (
              <>
                {item.f === "available" ? "f" : null}
                {item.s === "available" ? "s" : null}
                {item.n === "available" ? "n" : null}
              </>
            )}
          </span>
        </>
      );
    }
  )
);
/**
 *
 */
export const CaregiverList = ({
  caregiverSelected,
  filters,
  filterUpdated,
  updatedCaregiverItem,
  setMultipleAvailability,
  handleupdateData,
  multipleAvailability,
  qualificationList,
  selectedCareinstitutionData,
  setSelectedCareinstitution,
  confirmLeasing,
  handleStarCaregiverValue,
  caregiverStarData,
  correspondingDataCaregiver,
  setSelectedCaregiver,
  selectedCaregiverData
}: any) => {
  const [daysData, setDaysData] = useState(
    getDaysArrayByMonth(moment().month(), moment().year())
  );
  const [caregivers, setCaregiverData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [starredCaregiver, setStarredCaregiver] = useState(0);
  const [showRightClickOptions, setShowRightClickOptions] = useState(false);
  const [selectedCells, setSelectedCells] = useState([]);
  const [starCaregiver, setstarCaregiver] = useState<IStarInterface>({
    isStar: false,
    id: "",
    isSecondStar: false,
  });


  // To fetch avabality & requirement by id
  const [
    fetchAppointmentFilterById,
    { data: appointmentFilterById, loading: idSearchAppointmentLoading },
  ] = useLazyQuery<any, any>(GET_CAREINSTITUTION_REQUIREMENT_BY_ID, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (
        appointmentFilterById &&
        appointmentFilterById.getRequirementAndAvabilityById
      ) {
        const { getRequirementAndAvabilityById } = appointmentFilterById;
        const {
          requirementData,
          avabilityData,
        } = getRequirementAndAvabilityById;
        updateRequirementData(requirementData);
        updateAvabilityData(avabilityData);
      }
    },
  });

  // To fetch caregivers by id filter
  const [
    fetchCaregiverList,
    {
      data: careGiversList,
      refetch: fetchingCareGiverData,
      fetchMore: fetchMoreCareGiverList,
      loading: loadingCaregiver,
    },
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: "no-cache",
  });

  /**
   *
   * @param requirementData
   */
  const updateRequirementData = (requirementData: any) => {
    const { user = {} } = requirementData ? requirementData : {};
    let temp = requirementData ? requirementData : {};
    delete temp.user;
    let data: any = [
      {
        isWeekend: "",
        canstitution: {
          ...user,
        },
        item: temp,
      },
    ];
    setSelectedCareinstitution(data);
  };

  /**
   *
   * @param avabilityData
   */
  const updateAvabilityData = (avabilityData: any) => {
    const { user = {} } = avabilityData ? avabilityData : {};
    let temp = avabilityData ? avabilityData : {};
    delete temp.user;
    let data: any = [
      {
        isWeekend: "",
        caregiver: {
          ...user,
        },
        item: temp,
      },
    ];
    setSelectedCaregiver(data);
  };

  // Default value is start & end of month
  let gte: string = moment().startOf("month").format(dbAcceptableFormat);
  let lte: string = moment().endOf("month").format(dbAcceptableFormat);
  const getCaregiverData = () => {
    allCaregivers = [];
    setCaregiverData(allCaregivers);
    setCurrentPage(1);
    const filterData = {
      qualificationId: [],
      userRole: "caregiver",
      negativeAttributeId: [],
      limit: APPOINTMENT_PAGE_LIMIT,
      page: 1,
      showAppointments: null,
      positiveAttributeId: [],
      caregiverId: null,
      gte,
      lte,
      ...filters,
    };
    delete filterData.careInstitutionId;
    delete filterData.soloCaregiver;
    delete filterData.soloCareinstitution;
    setDaysData(
      getDaysArrayByMonth(
        moment(filters.gte || gte).month(),
        moment(filters.gte || gte).year()
      )
    );
    fetchCaregiverList({
      variables: filterData,
    });
  };
  useEffect(() => {
    if (
      !filters.effects ||
      ["both", "caregiver"].indexOf(filters.effects) > -1
    ) {
      getCaregiverData();
    }
    if (!filters.caregiverId || filters.caregiverId === null) {
      starCaregiverVar = {
        isStar: false,
        id: '',
        isSecondStar: false,
      };
      setstarCaregiver({
        isStar: false,
        id: '',
        isSecondStar: false,
      });
    }     
  }, [filters]);

  useEffect(() => {
    starCaregiverVar = caregiverStarData;
  },[caregiverStarData]);

//  to update the state for runtime reflection
useEffect(()=>{
  setSelectedCells(selectedCaregiverData)
},[selectedCaregiverData])

  /**
   *
   * @param data
   */
  const formatCaregivers = (data: any[]) => {
    const newData: any[] = [];
    _.forEach(data, (value) => {
      const availibility = _.mapValues(
        _.groupBy(value.caregiver_avabilities, "date")
      );
      let max = 1;
      _.forEach(daysData.daysArr, (date) => {
        const arr = availibility[date.dateString || ""] || [];
        if (arr.length > max) {
          max = arr.length;
        }
      });
      for (let i = 0; i < max; i++) {
        newData.push({
          ...value,
          row: i,
          key: `${value.id}-${i}`,
        });
      }
    });
    console.timeEnd("test");
    return newData;
  };
  /**
   *
   */
  const setCaregivers = () => {
    const data =
      ((careGiversList || {}).getUserByQualifications || {}).result || [];
    const count =
      ((careGiversList || {}).getUserByQualifications || {}).totalCount || 0;
    const newData = formatCaregivers(data);
    allCaregivers = Object.assign([], newData);
    setHasMore(data.length <= count);
    setCaregiverData(newData);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!loadingCaregiver) {
      setCaregivers();
    }
  }, [loadingCaregiver]);

  const columns = [...staticHeader, ...daysData.daysArr];
  /**
   *
   * @param index
   */
  const onAddNewRow = (index: number) => {
    const newCaregivers = Object.assign([], allCaregivers);
    newCaregivers.splice(index + 1, 0, {
      ...allCaregivers[index],
      key: allCaregivers[index].key + allCaregivers.length,
      caregiver_avabilities: [],
      row: allCaregivers[index].row + 1,
    });

    allCaregivers = newCaregivers;
    setCaregiverData(newCaregivers);
  };

  const handleUnlinkedList = (availability: any, temp: any) => {
    const {
      unlinkedBy = "",
      deleteAll = "",
      id = "",
      ca = {},
      cr = {},
    } = availability ? availability : {};
    let index: number = temp.findIndex(
      (caregiver: any) => caregiver.id === ca.userId
    );
    const checkId = (obj: any) => obj.id === ca.id;
    let existId = temp[index].caregiver_avabilities.findIndex(checkId);
    if (deleteAll) {
      if (unlinkedBy !== "canstitution") {
        temp[index].caregiver_avabilities[existId] = [];
      } else {
        temp[index].caregiver_avabilities[existId].appointments = [];
        temp[index].caregiver_avabilities[existId].status = "default";
      }
    } else {
      temp[index].caregiver_avabilities[existId].appointments = [];
      temp[index].caregiver_avabilities[existId].status = "default";
    }
    return temp;
  };

  // Update status and appointment data onComplete
  const handleLinkDataUpdate = (availability: any, temp: any) => {
    const {
      avabilityId = "",
      ca = {},
      cr = {},
      createdBy = "",
      date = "",
      id = "",
      requirementId = "",
    } = availability ? availability : {};
    let index: number = temp.findIndex(
      (caregiver: any) => caregiver.id === ca.userId
    );
    const checkId = (obj: any) => obj.id === avabilityId;
    let existId = temp[index].caregiver_avabilities.findIndex(checkId);
    const caregi = [
      {
        avabilityId,
        cr,
        createdBy,
        date,
        id,
        requirementId,
      },
    ];
    
    temp[index].caregiver_avabilities[existId].appointments = caregi;
    temp[index].caregiver_avabilities[existId].status = "linked";
    return temp;
  };

  // Update data in list after add/update/delete/link/unlink operation
  useEffect(() => {
    if (updatedCaregiverItem && updatedCaregiverItem.length) {
      let temp: any = [...caregivers];
      updatedCaregiverItem.forEach((availability: any) => {
        if (availability.unlinkedBy) {
          temp = handleUnlinkedList(availability, temp);
        } else if (availability.status === "appointment") {
          temp = handleLinkDataUpdate(availability, temp);
        } else {
          let index: number = temp.findIndex(
            (caregiver: any) => caregiver.id === availability.userId
          );
          if (temp[index]) {
            const checkId = (obj: any) =>
              parseInt(obj.id) === parseInt(availability.id);
            let existId = temp[index].caregiver_avabilities.findIndex(checkId);
            if (existId > -1) {
              if (availability.date) {
                // id exist so update data at particular index
                temp[index].caregiver_avabilities[existId] = availability;
              } else {
                // delete if response doen't return date
                temp[index].caregiver_avabilities[existId] = [];
              }
            } else {
              //  add if id already not exist
              temp[index].caregiver_avabilities.push(availability);
            }
          }
        }
      });
      
      setCaregiverData(temp);
    }
  }, [updatedCaregiverItem]);

  
  useEffect(() => {
    let caregivList: any = [...caregivers];
    let caregiverIndex: number = caregivList.findIndex(
      (caregiver: any) =>
        confirmLeasing &&
        confirmLeasing.ca &&
        confirmLeasing.ca.userId &&
        caregiver.id === confirmLeasing.ca.userId
    );
    if (caregiverIndex > -1) {
      const checkId = (obj: any) =>
        parseInt(obj.id) === parseInt(confirmLeasing.avabilityId);
      let existId = caregivList[caregiverIndex].caregiver_avabilities.findIndex(
        checkId
      );
      if (existId > -1) {
        let itemData =
          caregivList[caregiverIndex].caregiver_avabilities[existId];
          console.log("itemDataitemData",itemData);
          
        const updateData = {
          ...itemData,
          appointments: [
            {
              ...itemData.appointments[0],
              cr: {
                ...itemData.appointments[0].cr,
                status: "confirmed",
              },
            },
          ],
        };
        caregivList[caregiverIndex].caregiver_avabilities[existId] = updateData;
        setCaregiverData(caregivList);
        if (selectedCells && selectedCells.length) {
          const { isWeekend = "", caregiver = {} } = selectedCells[0]
            ? selectedCells[0]
            : {};
          let data: any = [
            {
              isWeekend,
              caregiver: {
                ...caregiver,
              },
              item: updateData,
            },
          ];
          onUpdateStatus(data);
        }
      }
    }
  }, [confirmLeasing]);
  /**
   *
   * @param page
   */
  const getMoreCaregivers = (page: number = 1) => {
    setIsLoading(true);
    const filterData = {
      qualificationId: [],
      userRole: "caregiver",
      negativeAttributeId: [],
      limit: 30,
      page,
      showAppointments: null,
      positiveAttributeId: [],
      gte,
      lte,
      ...filters,
    };
    delete filterData.caregiverId;
    delete filterData.soloCareinstitution;
    delete filterData.soloCaregiver;
    fetchMoreCareGiverList({
      variables: filterData,
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }
        if (prev && prev.getUserByQualifications) {
          const newData = formatCaregivers(
            fetchMoreResult.getUserByQualifications.result
          );
          allCaregivers = [...allCaregivers, ...newData];
          setCaregiverData(allCaregivers);
          setIsLoading(false);
          const result = [
            ...prev.getUserByQualifications.result,
            ...fetchMoreResult.getUserByQualifications.result,
          ];
          setHasMore(result.length <= prev.getUserByQualifications.totalCount);
          return {
            getUserByQualifications: {
              ...prev.getUserByQualifications,
              result,
            },
          };
        }
      },
    });
  };
  /**
   *
   * @param arg
   */
  const handleEndReached = (arg: any) => {
    if ((!loadingCaregiver && isLoading) || !hasMore || starredCaregiver) {
      return;
    }
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getMoreCaregivers(nextPage);
  };
  /**
   *
   * @param selected
   */
  const onSelectFinish = (selected: any) => {
    setMultipleAvailability(false);
    if (selected && selected.length) {
      let data: any = [];
      selected.map((key: any) => {
        data.push(key.props);
      });
      caregiverSelected(data);
      setSelectedCells(data);
    } else {
      setSelectedCells([]);
    }
  };

  /**
   *
   * @param data
   */
  const onUpdateStatus = (data: any) => {
    setSelectedCaregiver(data);
    setSelectedCells(data);
  };
  /**
   *
   * @param caregiverId
   * @param index
   */
  // to filter caregiver data by clicking on first and second star
  const filterCaregiverWithFirstStar = (
    caregiverId: number,
    isSecondStar: boolean
  ) => {
    /* if (caregiverId === starredCaregiver) {
      setCaregiverData(allCaregivers);
      // setStarredCaregiver(0);
    } else */ if (
      starCaregiver &&
      (!starCaregiverVar.isStar || isSecondStar)
    ) {
      const caregiverItems = allCaregivers.filter(
        (caregiver: any) => caregiverId === caregiver.id
      );
      starCaregiverVar = {
        isStar: true,
        id: caregiverId ? caregiverId : "",
        isSecondStar,
      };
      setstarCaregiver({
        isStar: true,
        id: caregiverId ? caregiverId.toString() : "",
        isSecondStar,
      });
      setStarredCaregiver(() => caregiverId);
      setCaregiverData(caregiverItems);
      const { lastName = "", firstName = "" } =
        caregiverItems && caregiverItems.length ? caregiverItems[0] : {};
      filterUpdated({
        ...filters,
        caregiverId: caregiverId,
        soloCaregiver: {
          label: `${lastName}${" "}${firstName}`,
          value: caregiverId,
        },
        effects: "caregiver",
      });
    } else {
      starCaregiverVar = {
        isStar: false,
        id: "",
        isSecondStar,
      };
      setstarCaregiver({
        isStar: false,
        id: "",
        isSecondStar,
      });
      filterUpdated({
        ...filters,
        caregiverId: null,
        soloCaregiver: undefined,
        effects: "caregiver",
      });
    }
    handleStarCaregiverValue(starCaregiverVar);
  };

  const handleToggleMenuItem = () => {
    setShowRightClickOptions((prev) => !prev);
  };

  /**
   *@param qualification
   *
   */
  const handleQualificationFilter = (qualification: any) => {
    setCurrentPage(1);
    filterUpdated({
      ...filters,
      qualificationId: map(qualification, ({ value }) => value),
      effects: "both",
    });
  };

  useEffect(() => {
    
    if (correspondingDataCaregiver && correspondingDataCaregiver.length) {
       getCorrespondingconnectedcell(correspondingDataCaregiver);
    }
  }, [correspondingDataCaregiver]);

  /**
   * @param appointmentsData
   *
   */
  // Function to get corresponding connected cell
  const getCorrespondingconnectedcell = (appointmentsData: any) => {
    let connectedCells: any[] = [];
    allCaregivers.forEach((element: any) => {
      element.caregiver_avabilities.forEach((row: any) => {
        const { caregiver = {} } = element ? element : {};
        let filteredCells: any =
          row.appointments &&
          row.appointments.length &&
          appointmentsData
            .map((cell: any) => cell.id)
            .includes(row.appointments[0].id);
        if (filteredCells) {
          connectedCells.push({
            isWeekend: false,
            caregiver:element,
            item: row,
          });
        }
      });
    });
    if (connectedCells && connectedCells.length) {
      let Cells = connectedCells[0] ? [connectedCells[0]] : [];
      setSelectedCaregiver(Cells);
    } else {
      fetchAppointmentFilterById({
        variables: {
          id: parseInt(appointmentsData[0].requirementId),
          searchIn: "requirement",
        },
      });
    }
  };

  if (selectedCareinstitutionData && selectedCareinstitutionData.length) {
    selectedcareInstApptId = selectedCareinstitutionData
      .map((cell: any) =>
        cell.item && cell.item.appointments && cell.item.appointments.length
          ? cell.item.appointments[0].id
          : 0,
      )
      .filter(Boolean);
  }
  /**
   *
   */
  const element = document.getElementById("appointment_list_section");
  /**
   *
   */

 const renderEmpty = () => {
  if(!loadingCaregiver && !isLoading){
    if (!allCaregivers.length || allCaregivers.length === 0){
      return  <div className='no-data-section pt-5 pb-5 bg-white text-center'>
      <div className='no-data-icon'>
        <i className='icon-ban' />
      </div>
      <h4 className='mb-1'>
        {languageTranslation('NO_CAREGIVER_ADDED')}{' '}
      </h4>
    </div>
    } 
  }
  }

  return (
    <>
      <div
        className={classnames({
          "right-manu-close": true,
          "d-none": !showRightClickOptions,
        })}
        onClick={handleToggleMenuItem}
      ></div>
      <CaregiverRightClickOptions
        isOpen={showRightClickOptions}
        hide={() => setShowRightClickOptions(false)}
        selectedCells={selectedCells}
        setSelectedCells={setSelectedCells}
        onNewAvailability={() => setMultipleAvailability(true)}
        onUpdateStatus={onUpdateStatus}
        handleupdateData={handleupdateData}
        multipleAvailability={multipleAvailability}
        caregiversList={caregivers}
        formatCaregivers={formatCaregivers}
        qualificationList={qualificationList}
        handleQualificationFilter={handleQualificationFilter}
        selectedCareinstitutionData={selectedCareinstitutionData}
        setSelectedCareinstitution={setSelectedCareinstitution}
        filters={filters}
      />
      <div className="custom-appointment-calendar overflow-hidden mb-3">
        <SelectableGroup
          allowClickWithoutSelected
          className="custom-row-selector new-base-table"
          clickClassName="tick"
          resetOnStart={true}
          allowCtrlClick={false}
          onSelectionFinish={onSelectFinish}
          ignoreList={[".name-col", ".h-col", ".s-col", ".u-col", ".v-col"]}
        >
          <BaseTable
            fixed
            data={caregivers}
            width={element ? element.clientWidth - 40 : 800}
            height={element ? window.innerHeight / 2 - 80 : 300}
            rowKey="key"
            overlayRenderer={() =>
              loadingCaregiver || isLoading ? (
                currentPage > 1 ? (
                  <>
                    <MoreSpinner />
                  </>
                ) : (
                  <Spinner />
                )
              ) : null
            }
            headerRenderer={() =>
              columns.map((d: any, index: number) =>
                staticHeader.indexOf(d) > -1 ? (
                  <React.Fragment key={`${d.id}-${index}`}>
                    <span
                      className={`custom-appointment-col  ${
                        d === "caregiver" ? "name-col" : ""
                      }`}
                    >
                      <div className="position-relative  username-col align-self-center text-capitalize">
                       
                        {d === "caregiver" ? (
                          <>
                        {languageTranslation("MENU_CAREGIVER")}
                          <Button
                            className="btn-more d-flex align-items-center justify-content-center"
                            onClick={() => setShowRightClickOptions(true)}
                          >
                            <i className="icon-options-vertical" />
                          </Button>
                          </>
                        ) : d}
                      </div>
                    </span>
                  </React.Fragment>
                ) : (
                  <span key={d.date} className="custom-appointment-col  ">
                    {d.day}
                    <br />
                    {d.date}
                  </span>
                )
              )
            }
            rowRenderer={({ cells, rowData }) => (
              <div
                className="d-flex frozen-row"
                title={[rowData.lastName, rowData.firstName].join(" ")}
              >
                {cells}
              </div>
            )}
            onEndReachedThreshold={300}
            onEndReached={handleEndReached}
            emptyRenderer={renderEmpty}
            headerClassName="custom-appointment-row"
            rowClassName="custom-appointment-row"
            rowHeight={30}
          >
            {  columns.map((d: any, index: number) => (
              <Column
                key={`col0-${index}-${
                  typeof d === "string" ? d : d.dateString
                }`}
                width={index === 0 ? 140 : 28}
                className={`custom-appointment-col   ${
                  d === "caregiver" ? "name-col" : ""
                }`}
                frozen={typeof d === "string"}
                cellRenderer={({ rowData, rowIndex }: any) => {
                  switch (d) {
                    case "caregiver":
                      return (
                        <div
                          key={rowIndex}
                          style={{
                            backgroundColor: !rowData.isActive
                              ? deactivatedListColor
                              : rowData.caregiver &&
                                rowData.caregiver.attributes
                              ? rowData.caregiver.attributes.includes(
                                  CaregiverTIMyoCYAttrId,
                                )
                                ? leasingListColor
                                : rowData.caregiver.attributes.includes(
                                    'Plycoco',
                                  )
                                ? selfEmployesListColor
                                : ''
                              : '',
                          }}
                          className="custom-appointment-col name-col appointment-color1 p-1 text-capitalize view-more-link one-line-text"
                          title={[rowData.lastName, rowData.firstName].join(
                            " "
                          )}
                          id={`caregiver-${rowData.id}-${index}-${rowData.row}`}
                        >
                          <Link
                            to={AppRoutes.CARE_GIVER_VIEW.replace(
                              ":id",
                              rowData.id
                            )}
                            target="_blank"
                            className="text-body"
                          >
                            {rowData.row === 0
                              ? [rowData.lastName, rowData.firstName]
                                  .filter(Boolean)
                                  .join(" ")
                                  .trim()
                              : null}
                          </Link>
                        </div>
                      );
                    case "H":
                      return <span key={rowIndex}></span>;
                    case "S":
                      return (
                        <span
                          key={rowIndex}
                          className="custom-appointment-col s-col text-center cursor-pointer"
                          onClick={() =>
                            filterCaregiverWithFirstStar(rowData.id, false)
                          }
                        >
                          {starCaregiverVar.id === rowData.id ||
                          starCaregiverVar.isStar ? (
                            <i className="fa fa-star theme-text" />
                          ) : (
                            <i className="fa fa-star-o" />
                          )}
                        </span>
                      );
                    case "U":
                      return (
                        <span
                          key={rowIndex}
                          className="custom-appointment-col u-col text-center cursor-pointer"
                          onClick={() =>
                            filterCaregiverWithFirstStar(
                              rowData.id,
                              starCaregiverVar && !starCaregiverVar.isSecondStar
                            )
                          }
                        >
                          {starCaregiverVar &&
                          starCaregiverVar.isSecondStar &&
                          starCaregiverVar.id === rowData.id ? (
                            <i className="fa fa-star theme-text" />
                          ) : (
                            <i className="fa fa-star-o" />
                          )}
                        </span>
                      );
                    case "V":
                      return (
                        <span
                          key={rowIndex}
                          className="custom-appointment-col v-col text-center cursor-pointer"
                          onClick={() => onAddNewRow(rowIndex)}
                        >
                          <i className="fa fa-arrow-down" />
                        </span>
                      );
                    default:
                      const currentAvail = _.filter(
                        rowData.caregiver_avabilities,
                        (avail: any) => d.dateString === avail.date
                      );
                      return (
                        <React.Fragment key={rowIndex}>
                          <SelectableCell
                            isWeekend={d.isWeekend}
                            item={
                              currentAvail[rowData.row] || {
                                date: d.dateString,
                              }
                            }
                            caregiver={rowData}
                            selectedcareInstApptId={selectedcareInstApptId}
                          />
                        </React.Fragment>
                      );
                  }
                }}
              />
            ))}
          </BaseTable>
        </SelectableGroup>
      </div>
    </>
  );
};
