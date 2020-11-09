import { useLazyQuery } from "@apollo/react-hooks";
import classnames from "classnames";
import _, { filter } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BaseTable, { Column } from "react-base-table";
import "react-base-table/styles.css";
import { Link } from "react-router-dom";
import { createSelectable, SelectableGroup } from "react-selectable-fast";
import { Button } from "reactstrap";
import {
  APPOINTMENT_PAGE_LIMIT,
  AppRoutes,
  CareInstInActiveAttrId,
  CareInstPlycocoAttrId,
  CareInstTIMyoCYAttrId,
  dbAcceptableFormat,
  deactivatedListColor,
  leasingListColor,
  selfEmployesListColor,
} from "../../../../config";
import {
  AppointmentsQueries,
  CareInstitutionQueries,
} from "../../../../graphql/queries";
import { getDaysArrayByMonth, languageTranslation } from "../../../../helpers";
import CareinstitutionRightClickOptions from "./CareinstitutionRightClickOptions";
import Spinner, { MoreSpinner } from "../../components/Spinner";
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

const [, , GET_DEPARTMENT_LIST, , , ,] = CareInstitutionQueries;

const staticHeader = ["careinstitution", "H", "S", "U", "V"];
let allCaregivers: any[] = [];
let selectedCaregiver: any = {};
let starredFilterDeptList: any = [];
let starCareInstitution: any = {
  isStar: false,
  setIndex: -1,
  id: "",
  isSecondStar: false,
  divisionId: -1,
};
let selectedcareGiverApptId: number[] = [];
const SelectableCell = React.memo(
  createSelectable(
    ({
      selectableRef,
      isSelected,
      isSelecting,
      item,
      key,
      isWeekend,
      showSelectedCaregiver,
      selectedcareGiverApptId,
    }: any) => {
      let isRequirment: boolean = false,
        isMatching: boolean = false,
        isContract: boolean = false,
        isConfirm: boolean = false,
        isOffered: boolean = false,
        isOfferedFutureDate: boolean = false,
        showAppointedCareGiver: boolean = false,
        careinstitutionCell:any = -1;

      let caregiverId: string = "";
      if (item && item.appointments) {
        const { appointments = [] } = item;
        const { ca = {}, id = "" } =
          appointments && appointments.length ? appointments[0] : {};
        caregiverId = ca ? ca.userId : "";
        careinstitutionCell = id
      }

      if (caregiverId) {
        if (caregiverId === showSelectedCaregiver.id) {
          showAppointedCareGiver = true;
        }
      }

      let isFutureDate: boolean = false;
      if (item && item.date) {
        let dateStr = moment(item.date).add(1, "days").format("YYYY/MM/DD");
        isFutureDate = moment(dateStr, "YYYY/MM/DD").isAfter();
      }

      // Date condition to not display fsn if date is before today
      let isBeforedate = false;
      if (item && item.date) {
        isBeforedate = moment(item.date).isBefore(moment(), "day");
      }

      if (item) {
        if (item.status === "default") {
          isRequirment = true;
        } else if (item.status === "linked") {
          isMatching = true;
        } else if (item.status === "contract") {
          isContract = true;
        } else if (item.status === "confirmed") {
          isConfirm = true;
        } else if (item.status === "offered" && isFutureDate === false) {
          isOffered = true;
          // isOfferedFutureDate = false;
        } else if (item.status === "offered" && isFutureDate === true) {
          isOfferedFutureDate = true;
        }
      }

      return (
        <div
          key={key}
          className={classnames({
            "calender-col": true,
            "text-center": true,
            // weekend: daysArr,
            "selecting-cell-bg":
              isSelecting ||
              isSelected ||
              showAppointedCareGiver ||
              selectedcareGiverApptId.includes(careinstitutionCell),
            weekend: isWeekend,
            "availability-bg":
              isOffered && !isSelected && !isOfferedFutureDate
                ? isOffered
                : false,
            "availability-dark-bg":
              isOfferedFutureDate && !isSelected ? isOfferedFutureDate : false,
            "custom-appointment-col": true,
            "cursor-pointer": true,
            "requirement-bg":
              isRequirment && !isSelected ? isRequirment : false,
            "matching-bg":
              isMatching &&
              !isSelected &&
              !showAppointedCareGiver &&
              caregiverId !== showSelectedCaregiver.id
                ? isMatching
                : false,
            "contract-bg":
              isConfirm &&
              !isSelected &&
              !showAppointedCareGiver &&
              caregiverId !== showSelectedCaregiver.id
                ? isConfirm
                : false,
          })}
          ref={selectableRef}
          // onClick={() => handleSelectedUser(list, day, 'caregiver')}
        >
          {item ? (
            isBeforedate ? null : (
              <>
                {item.f ? item.f : null}
                {item.s ? item.s : null}
                {item.n ? item.n : null}
              </>
            )
          ) : null}
        </div>
      );
    }
  )
);

export const CareInstitutionList = React.memo(
  ({
    careinstitutionSelected,
    filters = {},
    setCareInstDeptList,
    updatedCareinstItem = [],
    qualificationList,
    selected,
    setMultipleRequirement,
    handleupdateData,
    selectedCaregiverData,
    caregiverSelected,
    updateCaregiverDataLeasing,
    filterUpdated,
    careInstDeptList,
    handleStarCareinst,
    starMarkCanstitution,
    correspondingData,
    setSelectedCareinstitution
  }: any) => {
    const [daysData, setDaysData] = useState(
      getDaysArrayByMonth(moment().month(), moment().year())
    );
    const [caregivers, setCaregiverData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [showRightClickOptions, setShowRightClickOptions] = useState(false);
    const [showSelectedCaregiver, setShowSelectedCaregiver] = useState<any>({
      id: "",
      isShow: false,
    });
    const [isDeptListLoaded, setIsDeptListLoaded] = useState(false);
    // maintain solo careinstitution
    const [starCanstitution, setstarCanstitution] = useState<IStarInterface>({
      isStar: false,
      setIndex: -1,
      id: "",
      isSecondStar: false,
      divisionId: -1,
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

    // To get department list
    const [
      getDepartmentList,
      { data: departmentList, loading: deptLoading },
    ] = useLazyQuery<any>(GET_DEPARTMENT_LIST, {
      // fetchPolicy: "no-cache",
      onCompleted: (daata: any) => {},
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
      caregiverSelected(data);
    };

    // Default value is start & end of month
    let gte: string = moment().startOf("month").format(dbAcceptableFormat);
    let lte: string = moment().endOf("month").format(dbAcceptableFormat);
    const getCareinstitutionList = () => {
      allCaregivers = [];
      setCaregiverData(allCaregivers);
      setCurrentPage(1);
      setIsLoading(true);
      const filterObject = {
        qualificationId: [],
        userRole: "canstitution",
        negativeAttributeId: [],
        limit: APPOINTMENT_PAGE_LIMIT,
        page: 1,
        showAppointments: null,
        positiveAttributeId: [],
        gte,
        lte,
        ...filters,
      };
      delete filterObject.caregiverId;
      delete filterObject.soloCareinstitution;

      fetchCaregiverList({
        variables: filterObject,
      });
      setDaysData(
        getDaysArrayByMonth(
          moment(filters.gte || gte).month(),
          moment(filters.gte || gte).year()
        )
      );
    };

    useEffect(() => {
      if (
        !filters.effects ||
        ["both", "careinstitution"].indexOf(filters.effects) > -1
      ) {
        getCareinstitutionList();
      }
      if (!filters.careInstitutionId || filters.careInstitutionId === null) {
        starCareInstitution = {
          isStar: false,
          setIndex: -1,
          id: "",
          isSecondStar: false,
          divisionId: -1,
        };
        setstarCanstitution({
          isStar: false,
          setIndex: -1,
          id: "",
          isSecondStar: false,
          divisionId: -1,
        });
      }
    }, [filters]);

    // Set department list according to careInstitution selected
    useEffect(() => {
      setCareInstDeptList(departmentList);
    }, [departmentList]);

    const handleUnlinkedList = (requirement: any, temp: any) => {
      const { unlinkedBy = "", deleteAll = "", id = "", cr = {} } = requirement
        ? requirement
        : {};
      let index: number = temp.findIndex(
        (caregiver: any) => caregiver.id === cr.userId
      );
      const checkId: any = (obj: any) => obj.id === cr.id;
      let existId = temp[index].careinstitution_requirements.findIndex(checkId);
      if (deleteAll) {
        if (unlinkedBy !== "caregiver") {
          temp[index].careinstitution_requirements[existId] = [];
        } else {
          temp[index].careinstitution_requirements[existId].appointments = [];
          temp[index].careinstitution_requirements[existId].status = "default";
        }
      } else {
        temp[index].careinstitution_requirements[existId].appointments = [];
        temp[index].careinstitution_requirements[existId].status = "default";
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
        (caregiver: any) => caregiver.id === cr.userId
      );
      const checkId = (obj: any) => obj.id === requirementId;
      let existId = temp[index].careinstitution_requirements.findIndex(checkId);
      const careinsti: any = [
        {
          avabilityId,
          ca,
          createdBy,
          date,
          id,
          requirementId,
        },
      ];

      temp[index].careinstitution_requirements[
        existId
      ].appointments = careinsti;
      temp[index].careinstitution_requirements[existId].status = "linked";    
      return temp;
    };

    // Update data in list after add/update/delete operation
    useEffect(() => {
      let temp: any = [...caregivers];
      updatedCareinstItem.forEach((requirement: any) => {
        if (requirement.unlinkedBy) {
          temp = handleUnlinkedList(requirement, temp);
        } else if (requirement.status === "appointment") {
          temp = handleLinkDataUpdate(requirement, temp);
        } else {
          let index: number = temp.findIndex(
            (careInst: any) =>
              parseInt(careInst.id) === parseInt(requirement.userId)
          );

          if (temp[index]) {
            const checkId = (obj: any) => obj.id === requirement.id;
            let existId = temp[index].careinstitution_requirements.findIndex(
              checkId
            );

            if (existId > -1) {
              if (requirement.date) {
                // id exist so update data at particular index
                temp[index].careinstitution_requirements[existId] = requirement;
              } else {
                // delete if response doen't return date
                temp[index].careinstitution_requirements[existId] = [];
              }
            } else {
              // id doen't exist so add data in array
              temp[index].careinstitution_requirements.push(requirement);
            }
          }
        }
      });

      setCaregiverData(temp);
    }, [updatedCareinstItem]);

    /**
     *
     * @param data
     */
    const formatCaregivers = (data: any[]) => {
      console.time("test");
      const newData: any[] = [];
      _.forEach(data, (value) => {
        const availibility = _.mapValues(
          _.groupBy(value.careinstitution_requirements, "date")
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
            ...(i === 0
              ? value
              : {
                  ...value,
                  firstName: "",
                  lastName: "",
                }),
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
      if (filters.careInstitutionId) {
        setIsDeptListLoaded(true);
      }
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
        careinstitution_requirements: [],
        row: allCaregivers[index].row + 1,
      });
      allCaregivers = newCaregivers;
      setCaregiverData(newCaregivers);
    };
    /**
     *
     * @param page
     */
    const getMoreCaregivers = (page: number = 1) => {
      setIsLoading(true);
      const filterObject = {
        qualificationId: [],
        userRole: "canstitution",
        negativeAttributeId: [],
        limit: 30,
        page,
        showAppointments: null,
        positiveAttributeId: [],
        gte,
        lte,
        ...filters,
      };
      delete filterObject.caregiverId;
      delete filterObject.soloCareinstitution;
      fetchMoreCareGiverList({
        variables: filterObject,
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
            setHasMore(
              result.length <= prev.getUserByQualifications.totalCount
            );
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
      if ((!loadingCaregiver && isLoading) || !hasMore) {
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
      setShowSelectedCaregiver({
        id: "",
        isShow: false,
      });
      selectedCaregiver = {
        id: "",
        isShow: false,
      };
      if (selected && selected.length) {
        let data: any = [];
        selected.map((key: any) => {
          const {canstitution, isWeekend,item } = key.props;
          let temp = {
            canstitution,
            isWeekend,
            item
          }
          data.push(temp);
        });
        careinstitutionSelected(data);

        let userId: string =
          selected &&
          selected.length &&
          selected[0].props.canstitution &&
          selected[0].props.canstitution.id
            ? selected[0].props.canstitution.id
            : "";

        if (userId) {
          fetchDepartmentList(userId);
        }
      }
    };

    /**
     *
     * @param userId
     *
     */
    const fetchDepartmentList = (userId: any) => {
      if (userId) {
        getDepartmentList({
          variables: {
            userId: parseInt(userId),
            locked: false,
          },
        });
      }
    };

    useEffect(() => {
      starCareInstitution = starMarkCanstitution;
    }, [starMarkCanstitution]);

    // call function to manage star functionality in form
    useEffect(() => {
      handleStarCareinst(starCareInstitution);
    }, [starCanstitution]);

    /**
     *
     * @param list
     * @param index
     *
     */
    const handleFirstStarCanstitution = async (list: any, index: number) => {
      if (!starCareInstitution.isStar) {
        starCareInstitution = {
          isStar: true,
          setIndex: index,
          id: list && list.id ? list.id : "",
          isSecondStar: false,
          divisionId: -1,
        };
        setstarCanstitution({
          isStar: true,
          setIndex: index,
          id: list && list.id ? list.id : "",
          isSecondStar: false,
          divisionId: -1,
        });
        const id = list && list.id ? parseInt(list.id) : null;
        let { companyName = "", shortName = "" } =
          list && list.canstitution ? list.canstitution : {};
        filterUpdated({
          ...filters,
          careInstitutionId: id,
          soloCareinstitution: {
            label: shortName ? shortName : id,
            value: id,
            companyName: companyName,
          },
          effects: "careinstitution",
        });

        if (list) {
          if (list.id && !starCanstitution.isStar) {
            await getDepartmentList({
              variables: {
                userId: parseInt(list.id),
                locked: false,
              },
            });
          }
        }
      } else {
        starCareInstitution = {
          isStar: false,
          setIndex: -1,
          id: "",
          isSecondStar: false,
          divisionId: -1,
        };
        setstarCanstitution({
          isStar: false,
          setIndex: -1,
          id: "",
          isSecondStar: false,
          divisionId: -1,
        });
        filterUpdated({
          ...filters,
          careInstitutionId: null,
          soloCareinstitution: undefined,
          effects: "careinstitution",
        });
      }
    };

    /**
     *
     * @param list
     */

    const handleSecondStarCanstitution = async (list: any) => {
      if (starCareInstitution.isStar) {
        // if first star is already marked
        if (!starCareInstitution.isSecondStar) {
          // mark second star and filter according to selected department
          starCareInstitution = {
            ...starCareInstitution,
            isSecondStar: true,
            divisionId: list.divisionId,
          };
          setstarCanstitution({
            ...starCanstitution,
            isSecondStar: true,
            divisionId: list.divisionId,
          });

          let temp = allCaregivers.filter(
            (item: any) => item.divisionId === list.divisionId
          );
          allCaregivers = temp;
          setCaregiverData(temp);
        } else {
          // reset department list when unstar
          starCareInstitution = {
            ...starCareInstitution,
            isSecondStar: false,
            divisionId: -1,
          };
          setstarCanstitution({
            ...starCanstitution,
            isSecondStar: false,
            divisionId: -1,
          });
          //  reset department list on unstar
          allCaregivers = starredFilterDeptList;
          setCaregiverData(starredFilterDeptList);
        }
      } else {
        handleFirstStarCanstitution(list, 1);
      }
    };

    useEffect(() => {
      if (filters.careInstitutionId && isDeptListLoaded) {
        handleDepartmentList(careInstDeptList);
      }
    }, [caregivers]);

    /**
     *
     * @param departmentList
     *
     */
    const handleDepartmentList = (departmentList: any) => {
      setIsDeptListLoaded(false);
      if (departmentList && departmentList.getDivision.length) {
        let careInstData: any;
        let temp: any = { ...departmentList };
        const { getDivision } = temp;
        if (starCanstitution.isStar) {
          careInstData = caregivers.filter(
            (item: any) => item.id === starCanstitution.id
          )[0];
        } else {
          careInstData = caregivers && caregivers.length ? caregivers[0] : {};
        }
        if (careInstData) {
          let tempData: any = [];
          let requirements: any[] = [].concat.apply(
            [],
            careInstData.careinstitution_requirements
          );
          getDivision
            // .filter((division: any) => !division.locked)
            .forEach((division: any, index: number) => {
              division.careinstitution_requirements = [];
              division.canstitution = careInstData.canstitution;
              division.qualificationId = careInstData.qualificationId;
              division.careInstId = careInstData.id;
              division.isActive = careInstData.isActive;
              division.deptId = division.id;
              // To group availabilities by division
              let deptRequirement = requirements.filter(
                (req: any) => req.divisionId === division.id
              );
              let temp = {
                ...careInstData,
                name: division.name,
                careinstitution_requirements: deptRequirement,
                key: `${careInstData.id}-${index}`,
                divisionId: division.id,
              };
              tempData.push(temp);
            });
          starredFilterDeptList = tempData;
          allCaregivers = tempData;
          setCaregiverData(tempData);
        }
      } else {
        const caregiverItems = allCaregivers.filter(
          (caregiver: any) => starCareInstitution.id === caregiver.id
        );

        allCaregivers = caregiverItems;
        setCaregiverData(caregiverItems);
      }
    };

    const handleToggleMenuItem = () => {
      setShowRightClickOptions((prev) => !prev);
    };

    useEffect(() => {
      if (correspondingData && correspondingData.length) {
         getCorrespondingconnectedcell(correspondingData);
      }
    }, [correspondingData]);

    /**
     * @param appointmentsData
     *
     */
    // Function to get corresponding connected cell
    const getCorrespondingconnectedcell = (appointmentsData: any) => {   
      let connectedCells: any[] = [];
      allCaregivers.forEach((element: any) => {
        element.careinstitution_requirements.forEach((row: any) => {
          const { canstitution = {} } = element ? element : {};
          let filteredCells: any =
            row.appointments &&
            row.appointments.length &&
            appointmentsData
              .map((cell: any) => cell.id)
              .includes(row.appointments[0].id);
          if (filteredCells) {    
      connectedCells.push({
              isWeekend: false,
              canstitution:element,
              isLeasing:
                canstitution &&
                canstitution.attributes &&
                canstitution.attributes.length
                  ? canstitution.attributes.includes(CareInstTIMyoCYAttrId)
                  : false,
              item: row,
            });
          }
        });
      });
      if (connectedCells && connectedCells.length) {
        let Cells = connectedCells[0] ? [connectedCells[0]] : [];
        setSelectedCareinstitution(Cells);
      } else {   
      fetchAppointmentFilterById({
          variables: {
            id: parseInt(appointmentsData[0].avabilityId),
            searchIn: "avability",
          },
        });
      }
    };

    
    if (selectedCaregiverData && selectedCaregiverData.length) {
      selectedcareGiverApptId = selectedCaregiverData
        .map((cell: any) =>
          cell.item && cell.item.appointments && cell.item.appointments.length
            ? cell.item.appointments[0].id
            : 0
        )
        .filter(Boolean);
    }

    const renderEmpty = () => {
      if(!loadingCaregiver && !isLoading){
      if (!allCaregivers.length || allCaregivers.length === 0 ){
        return  <div className='no-data-section pt-5 pb-5 bg-white text-center'>
        <div className='no-data-icon'>
          <i className='icon-ban' />
        </div>
        <h4 className='mb-1'>
          {languageTranslation('NO_CAREINSTITUTION_ADDED')}{' '}
        </h4>
      </div>
      } 
    }
    }
    /**
     *
     */
    const element = document.getElementById("appointment_list_section");
    return (
      <>
        <div
          className={classnames({
            "right-manu-close": true,
            "d-none": !showRightClickOptions,
          })}
          onClick={handleToggleMenuItem}
        ></div>
        <CareinstitutionRightClickOptions
          isOpen={showRightClickOptions}
          hide={() => setShowRightClickOptions(false)}
          onNewRequirement={() => setMultipleRequirement(true)}
          selectedCellsCareinstitution={selected}
          careinstitutionList={caregivers}
          careinstitutionSelected={setSelectedCareinstitution}
          handleupdateData={handleupdateData}
          qualificationList={qualificationList}
          filters={filters}
          selectedCells={selectedCaregiverData}
          caregiverSelected={caregiverSelected}
          setShowSelectedCaregiver={(data: any) => {
            setShowSelectedCaregiver(data);
            selectedCaregiver = data;
          }}
          updateCaregiverDataLeasing={updateCaregiverDataLeasing}
          
        />
        <div className="custom-appointment-calendar overflow-hidden">
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
              rowHeight={30}
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
                          d === "careinstitution" ? "name-col" : ""
                        }`}
                      >
                        <div className="position-relative  username-col align-self-center text-capitalize">
                        
                          {d === "careinstitution" ? (
                            <>
                            {languageTranslation("DOCUMENT_TYPE_CAREINST")}
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
                  
                  title={
                    rowData.canstitution && rowData.canstitution.shortName
                      ? rowData.canstitution.shortName
                      : [rowData.lastName, rowData.firstName].join(" ")
                  }
                >
                  {cells}
                </div>
              )}
              onEndReachedThreshold={300}
              onEndReached={handleEndReached}
              emptyRenderer={renderEmpty}
              headerClassName="custom-appointment-row"
              rowClassName="custom-appointment-row"
            >
              {columns.map((d: any, index: number) => (
                <Column
                  key={`col0-${index}-${
                    typeof d === "string" ? d : d.dateString
                  }`}
                  width={index === 0 ? 140 : 28}
                  className={`custom-appointment-col   ${
                    d === "careinstitution" ? "name-col" : ""
                  }`}
                  frozen={typeof d === "string"}
                  cellRenderer={({ rowData, rowIndex }: any) => {
                    switch (d) {
                      case "careinstitution":
                        return (
                          <div
                            key={rowIndex}
                            className="custom-appointment-col name-col appointment-color1 text-capitalize p-1 view-more-link one-line-text"
                            style={{
                              backgroundColor:
                                rowData.canstitution && rowData.canstitution.attributes
                                  ? rowData.canstitution.attributes.includes(
                                      CareInstInActiveAttrId,
                                    )
                                    ? deactivatedListColor
                                    : rowData.canstitution.attributes.includes(
                                        CareInstTIMyoCYAttrId,
                                      )
                                    ? leasingListColor
                                    : rowData.canstitution.attributes.includes(
                                        CareInstPlycocoAttrId,
                                      )
                                    ? selfEmployesListColor
                                    : ''
                                  : '',
                            }}
                            title={
                              rowData.name
                                ? rowData.name
                                : rowData.canstitution &&
                                  rowData.canstitution.shortName
                                ? rowData.canstitution.shortName
                                : [rowData.lastName, rowData.firstName].join(
                                    " "
                                  )
                            }
                            id={`caregiver-${rowData.id}-${index}-${rowData.row}`}
                          >
                            <Link
                              to={AppRoutes.CARE_INSTITUION_VIEW.replace(
                                ":id",
                                rowData.id
                              )}
                              target="_blank"
                              className="text-body"
                            >
                              {rowData.row === 0
                                ? rowData.name
                                  ? rowData.name
                                  : rowData.canstitution &&
                                    rowData.canstitution.shortName
                                  ? rowData.canstitution.shortName
                                  : [rowData.lastName, rowData.firstName].join(
                                      " "
                                    )
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
                              handleFirstStarCanstitution(rowData, rowIndex)
                            }
                          >
                            {starCareInstitution.id === rowData.id ||
                            starCareInstitution.isStar ? (
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
                              handleSecondStarCanstitution(rowData)
                            }
                          >
                            {starCareInstitution.divisionId ===
                              rowData.divisionId ||
                            starCareInstitution.isSecondStar ? (
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
                          rowData.careinstitution_requirements,
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
                              canstitution={rowData}
                              showSelectedCaregiver={selectedCaregiver}
                              selectedcareGiverApptId={selectedcareGiverApptId}
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
  }
);
