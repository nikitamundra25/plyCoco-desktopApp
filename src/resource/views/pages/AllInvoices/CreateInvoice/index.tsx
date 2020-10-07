import React, { useState, FunctionComponent, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import {
  languageTranslation,
  errorFormatter,
  getNightMinutes,
  getSaturdayAndSundayMinutes,
  getHolidayMinutes,
  getSelfEmployeeExclusiveMinutes,
  convertIntoHours,
} from '../../../../../helpers';
import { RouteComponentProps, useLocation } from 'react-router';
import '../index.scss';
import {
  ARCHIVE_PAGE_LIMIT,
  dbAcceptableFormat,
} from '../../../../../config';
import { IReactSelectInterface } from '../../../../../interfaces';
import {
  CareInstitutionQueries,
  InvoiceQueries,
  GlobalHolidaysQueries,
} from '../../../../../graphql/queries';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import InvoiceList from './InvoiceList';
import InvoiceNavbar from './InvoiceNavbar';
import * as qs from 'query-string';
import { toast } from 'react-toastify';
import { InvoiceMutations } from '../../../../../graphql/Mutations';

let toastId: any = null;

const [
  ,
  ,
  GET_DEPARTMENT_LIST,
  ,
  ,
  ,
] = CareInstitutionQueries;
const [GET_INVOICE_LIST] = InvoiceQueries;
const [, GET_GLOBAL_CAREGIVER_HOLIDAYS] = GlobalHolidaysQueries;
//Create New Invoice PDF
const [CREATE_INVOICE] = InvoiceMutations;
const CreateInvoice: FunctionComponent<RouteComponentProps> & any = (
  mainProps: any,
) => {
  const { search } = useLocation();
  const query = qs.parse(search);
  // select Careinstitution
  const [careinstitutionFilter, setcareinstitutionFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  // selected Appointment data
  const [selectedAppointment, setselectedAppointment] = useState<any[]>([]);

  // select Careinstitution
  const [caregiverFilter, setcaregiverFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  // select Careinstitution
  const [monthFilter, setmonthFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  const [currentPage, setCurrentPage] = useState<number>(1);

  //   Store selectedDepartment
  const [departmentFilter, setdepartmentFilter] = useState<
    IReactSelectInterface | undefined
  >(undefined);

  //  State for handling date filter
  const [dateFilter, setDateFilter] = useState<string>('');

  //  State for Total amount selected
  const [totalAmount, settotalAmount] = useState<string>('');

  // State for department options
  const [
    careInstitutionDepartmentOption,
    setcareInstitutionDepartmentOption,
  ] = useState<IReactSelectInterface[] | undefined>([]);

  //
  const [CreateInvoice, { loading: createInvoiceLoading }] = useMutation<{
    invoiceInput: any;
  }>(CREATE_INVOICE, {
    onCompleted() {
      toast.dismiss();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation('CREATE_INVOICE_SUCCESS'));
      }
    },
  });

  // Default value is start & end of month
  let gte: string = moment()
    .startOf('month')
    .format(dbAcceptableFormat);
  let lte: string = moment()
    .endOf('month')
    .format(dbAcceptableFormat);
  // To get caregiver list from db
  const [
    getDepartmentList,
    { data: departmentList, loading: deptLoading },
  ] = useLazyQuery<any>(GET_DEPARTMENT_LIST);

  // To fetch invoice list
  const [
    fetchInvoiceList,
    { data: invoiceList, loading: invoiceListLoading, refetch },
  ] = useLazyQuery<any, any>(GET_INVOICE_LIST, {
    fetchPolicy: 'no-cache',
    // notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    if (
      invoiceList &&
      invoiceList.getAllAppointment &&
      invoiceList.getAllAppointment.result.length
    ) {
      const { result } = invoiceList.getAllAppointment;
      const startDate: string = result[0].date;
      const endDate: string = result[result.length - 1].date;
      getAllHolidays(startDate, endDate);
    }
  }, [invoiceList]);

  // To Fetch golbal holidays and weekends
  const [getGlobalHolidays, { data: careGiverHolidays }] = useLazyQuery<
    any,
    any
  >(GET_GLOBAL_CAREGIVER_HOLIDAYS, {
    fetchPolicy: 'no-cache',
    // notifyOnNetworkStatusChange: true
  });


  useEffect(() => {
    let activeDate = moment().format(dbAcceptableFormat);
    setDateFilter(activeDate);
  }, []);



  //To get all holidays and weekends
  const getAllHolidays = (startDate: string, endDate: string) => {
    getGlobalHolidays({
      variables: {
        gte: startDate,
        lte: endDate,
      },
    });
  };
  // to get list of all invoices
  const getInvoiceListData = () => {

    fetchInvoiceList({
      variables: {
        searchBy: null,
        caregiverId:
          caregiverFilter && caregiverFilter.value
            ? parseInt(caregiverFilter.value)
            : null,
        careInstitutionId:
          careinstitutionFilter && careinstitutionFilter.value
            ? parseInt(careinstitutionFilter.value)
            : null,
        divisionId:
          departmentFilter && departmentFilter.value
            ? parseInt(departmentFilter.value)
            : null,
        startDate: gte ? gte : null,
        endDate: lte ? lte : null,
        limit: ARCHIVE_PAGE_LIMIT,
        page: query.page ? parseInt(query.page as string) : 1,
        isLeasing: false,
      },
    });
  };

  useEffect(() => {
    if (query) {
      setCurrentPage(query.page ? parseInt(query.page as string) : 1);
    }
    // call query
    getInvoiceListData();
  }, [search]); // It will run when the search value gets changed

  // Call function to fetch invoice list
  useEffect(() => {
    if (monthFilter && monthFilter.value) {
      const { value } = monthFilter;
      if (value === 'weekly') {
        gte = moment()
          .startOf('week')
          .format(dbAcceptableFormat);
        lte = moment()
          .endOf('week')
          .format(dbAcceptableFormat);
      } else if (value === 'everySixMonths') {
        gte = moment()
          .startOf('month')
          .format(dbAcceptableFormat);
        lte = moment(gte)
          .add(6, 'M')
          .endOf('month')
          .format(dbAcceptableFormat);
      } else if (value === 'perMonth') {
        gte = moment()
          .startOf('month')
          .format(dbAcceptableFormat);
        lte = moment()
          .endOf('month')
          .format(dbAcceptableFormat);
      } else if (value === 'all') {
        gte = '';
        lte = '';
      }
    }
    getInvoiceListData();
  }, [careinstitutionFilter, departmentFilter, caregiverFilter, monthFilter]);


  // Options to show department data
  useEffect(() => {
    let careInstitutionDepartment: IReactSelectInterface[] = [];
    if (departmentList && departmentList.getDivision.length) {
      const { getDivision } = departmentList;
      careInstitutionDepartment = getDivision.map((dept: any) => ({
        label: dept.name,
        value: dept && dept.id ? dept.id.toString() : '',
      }));
      if (careInstitutionDepartment && careInstitutionDepartment.length) {
        setcareInstitutionDepartmentOption(careInstitutionDepartment);
      }
    }
  }, [departmentList]);

  // Select careinstitution or caregiver from navbar
  const onhandleSelection = (value: IReactSelectInterface, name: string) => {
    if (name === 'careinstitution') {
      setcareinstitutionFilter(value);
    } else if (name === 'department') {
      setdepartmentFilter(value);
    } else if (name === 'caregiver') {
      setcaregiverFilter(value);
    } else if (name === 'monthSummary') {
      setmonthFilter(value);
    }
  };

  //  call department list query with every selection of care institution
  useEffect(() => {
    let userId: string =
      careinstitutionFilter && careinstitutionFilter.value
        ? careinstitutionFilter.value
        : '';
    if (userId) {
      getDepartmentList({
        variables: {
          userId: parseInt(userId),
          locked: false,
        },
      });
    } else {
      setcareInstitutionDepartmentOption([]);
    }
  }, [careinstitutionFilter]);

  const handleDayClick = (selectedDay: any) => {
    let date = moment(selectedDay).format(dbAcceptableFormat);
    setDateFilter(date);
  };

  const handleArrowDayChange = (name: string) => {
    let date: any = '';
    if (name === 'previous') {
      date = moment(dateFilter)
        .subtract(1, 'months')
        .format(dbAcceptableFormat);
    } else {
      date = moment(dateFilter)
        .add(1, 'months')
        .format(dbAcceptableFormat);
    }
    setDateFilter(date);
  };

  const handleCheckedChange = (e: any, list: any) => {
    const { checked } = e.target;
    if (checked === true) {
      selectedAppointment.push(list);
      setselectedAppointment(selectedAppointment);
    } else {
      const arrayIndex: number = selectedAppointment.findIndex(
        (data: any) => data.id === list.id,
      );
      selectedAppointment.splice(arrayIndex, 1);
      setselectedAppointment(selectedAppointment);
    }
  };

  const handleCreateInvoice = async () => {
    let singleCareGiverData: any[] = [],
      selectedAppointmentId: any[] = [],
      singleCareInstData: any[] = [],
      amount: number = 0,
      subTotal: number = 0;
    // all selected caregivers id
    let selectedCareGiverId: string[] = selectedAppointment
      .map((appointment: any) =>
        appointment.ca && appointment.ca.userId ? appointment.ca.userId : '',
      )
      .filter(Boolean);
    // all selected care institutions id
    let selectedCareInstId: string[] = selectedAppointment
      .map((appointment: any) =>
        appointment.cr && appointment.cr.userId ? appointment.cr.userId : '',
      )
      .filter(Boolean);
    try {
      // To check appointment is bettween the same caregiver or careinstitution or not
      let isInvoiceComaptible: boolean =
        selectedCareGiverId.length &&
        selectedCareInstId.length &&
        selectedCareGiverId.length === selectedCareInstId.length &&
        selectedCareGiverId.every(
          (val: string, i: number, arr: string[]) => val === arr[0],
        ) &&
        selectedCareInstId.every(
          (val: string, i: number, arr: string[]) => val === arr[0],
        )
          ? true
          : false;
      if (!isInvoiceComaptible) {
        if (!toast.isActive(toastId)) {
          toastId = toast.warn(
            "You can't create invoice with the selected appointment because of mismatch beetween caregiver & care-institutions",
          );
        }
        return;
      } else {
        if (selectedAppointment && selectedAppointment.length) {
          selectedAppointment.forEach((appointmentData: any) => {
            if (appointmentData.ca && appointmentData.cr) {
              singleCareGiverData.push(appointmentData.ca.userId);

              singleCareInstData.push(appointmentData.cr.userId);
              selectedAppointmentId.push(appointmentData.id);

              let workBegain: any, workEnd: any;
              if (
                appointmentData &&
                appointmentData.ca &&
                appointmentData.ca.workingHoursFrom
              ) {
                workBegain = appointmentData.ca.workingHoursFrom.split(',');
                workEnd = appointmentData.ca.workingHoursTo.split(',');
              }
              //Combime date and time
              let initialdate =
                workBegain && workBegain.length ? workBegain[0] : null;
              let start_time =
                workBegain && workBegain.length ? workBegain[1] : null;
              let enddate = workEnd && workEnd.length ? workEnd[0] : null;
              let end_time = workEnd && workEnd.length ? workEnd[1] : null;
        

              let datetimeA: any = initialdate
                ? moment(
                    `${initialdate} ${start_time}`,
                    `${dbAcceptableFormat} HH:mm`,
                  ).format()
                : '';
              let datetimeB: any = enddate
                ? moment(
                    `${enddate} ${end_time}`,
                    `${dbAcceptableFormat} HH:mm`,
                  ).format()
                : null;

              // let duration = datetimeB && datetimeA ? moment.duration(datetimeB.diff(datetimeA)) : null;
              // let hours = duration ? duration.asHours() : null;
              let diffDate: any =
                (new Date(datetimeB).getTime() -
                  new Date(datetimeA).getTime()) /
                (3600 * 1000);

              //Show Weekend day
              const dayData = new Date(appointmentData.date).getDay();
              let isWeekendDay: boolean =
                dayData === 6 || dayData === 0 ? true : false;
              let hasHoliday: any;
              if (careGiverHolidays && careGiverHolidays.length) {
                hasHoliday = careGiverHolidays.filter(
                  (data: any) => data.date === appointmentData.date,
                );
              }
              let weekendRate: any = appointmentData.ca.weekendAllowance
                ? appointmentData.ca.weekendAllowance
                : 0;
              let holidayRate: any = appointmentData.ca.holidayAllowance
                ? appointmentData.ca.holidayAllowance
                : 0;
              let nightRate: any = appointmentData.ca.nightFee
                ? appointmentData.ca.nightFee
                : 0;
              let fees: any = appointmentData.ca.fee * 100;
              let transportation: any = appointmentData.ca.distanceInKM
                ? appointmentData.ca.distanceInKM
                : 0 * appointmentData.ca.feePerKM
                ? appointmentData.ca.feePerKM
                : 0;
              let hours: any = appointmentData.ca.workingHoursFrom
                ? parseFloat(diffDate).toFixed(2)
                : 0;
              let expenses =
                appointmentData.ca && appointmentData.ca.otherExpenses
                  ? appointmentData.ca.otherExpenses
                  : 0;
              if (isWeekendDay && hasHoliday && hasHoliday.length) {
                if (weekendRate > holidayRate) {
                  subTotal =
                    (fees + weekendRate) * hours + transportation + expenses;
                } else if (holidayRate > weekendRate) {
                  subTotal =
                    (fees + holidayRate) * hours + transportation + expenses;
                }
              } else {
                subTotal += fees * hours + transportation + expenses;
              }
            } else {
              const message = errorFormatter(
                "Selected appointment don't have care giver",
              );
              if (!toast.isActive(toastId)) {
                toastId = toast.warn(message);
              }
            }
          });
          const totalAmount: any = subTotal + subTotal * 0.19;
          settotalAmount(totalAmount);
          const invoiceInput: any = {
            caregiverId: singleCareGiverData[singleCareGiverData.length - 1],
            careInstitutionId:
              singleCareInstData[singleCareInstData.length - 1],
            appointmentIds: selectedAppointmentId,
            status: 'unpaid',
            subTotal: `${subTotal}`,
            amount: `${totalAmount}`,
            tax: `${subTotal * 0.19}`,
            careInstitutionName:
              selectedAppointment &&
              selectedAppointment.length &&
              selectedAppointment[0].cr
                ? selectedAppointment[0].cr.name
                : '',
            careGiverName:
              selectedAppointment &&
              selectedAppointment.length &&
              selectedAppointment[0].ca
                ? selectedAppointment[0].ca.name
                : '',
            invoiceType: 'selfEmployee',
          };
          await CreateInvoice({
            variables: {
              invoiceInput: invoiceInput,
            },
          });
        }
      }
    } catch (error) {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  };

  if (
    !invoiceListLoading &&
    invoiceList &&
    invoiceList.getAllAppointment &&
    invoiceList.getAllAppointment.result.length
  ) {
 
    invoiceList.getAllAppointment.result.forEach(async (ele: any) => {
      const { ca = {}, cr = {} } = ele ? ele : {};
      let nightWorkingMinutes: any = 0,
        sundayWorkingMinutes: any = 0,
        holidayWorkingMinutes: any = 0,
        appointmentDate: any = cr ? cr.date : '',
        startHourNight: any =
          ca && ca.nightAllowance ? ca.nightAllowance : '22:00';
      if (
        ca &&
        ca.user &&
        ca.user.caregiver &&
        ca.user.caregiver.supplements === 'Cumulative'
      ) {

        if (ca && ca.workingHoursFrom && ca.workingHoursTo) {
          let startT = ca.workingHoursFrom.split(',')[1];
          let endT = ca.workingHoursTo.split(',')[1];
          nightWorkingMinutes = await getNightMinutes(
            appointmentDate,
            startHourNight,
            startT,
            endT,
          );
        } else {
          let startT = cr.startTime;
          let endT = cr.endTime;
          nightWorkingMinutes = await getNightMinutes(
            appointmentDate,
            startHourNight,
            startT,
            endT,
          );
        }
        // SATURDAY & SUNDAY MINUTES (Weekend) =>  (WORKING ON IT!!)
        if (ele && ca && ca.workingHoursFrom && ca.workingHoursTo) {
          let startT = ca.workingHoursFrom.split(',')[1];
          let endT = ca.workingHoursTo.split(',')[1];
          sundayWorkingMinutes = await getSaturdayAndSundayMinutes(
            appointmentDate,
            startT,
            endT,
          );
        } else {
          let startT = cr.startTime;
          let endT = cr.endTime;
          sundayWorkingMinutes = await getSaturdayAndSundayMinutes(
            appointmentDate,
            startT,
            endT,
          );
        }

        // HOLIDAY MINUTES (Holiday)
        if (ca && ca.workingHoursFrom && ca.workingHoursTo) {
          let startT = ca.workingHoursFrom.split(',')[1];
          let endT = ca.workingHoursTo.split(',')[1];
          holidayWorkingMinutes = await getHolidayMinutes(
            appointmentDate,
            startT,
            endT,
            '1359',
          );
        } else {
          let startT = cr.startTime;
          let endT = cr.endTime;
          holidayWorkingMinutes = await getHolidayMinutes(
            appointmentDate,
            startT,
            endT,
            '1359',
          );
        }
      } else {
        let exclusiveMinutes: any = {};
        if (ca && ca.workingHoursFrom && ca.workingHoursTo) {
          let startT = ca.workingHoursFrom.split(',')[1];
          let endT = ca.workingHoursTo.split(',')[1];
          exclusiveMinutes = await getSelfEmployeeExclusiveMinutes(
            appointmentDate,
            startT,
            endT,
            startHourNight,
            '1359',
          );
        } else {
          let startT = cr.startTime;
          let endT = cr.endTime;
          exclusiveMinutes = await getSelfEmployeeExclusiveMinutes(
            appointmentDate,
            startT,
            endT,
            startHourNight,
            '1359',
          );
        }

        holidayWorkingMinutes = exclusiveMinutes.holidayMinutes;
        sundayWorkingMinutes = exclusiveMinutes.saturdaySundayMinutes;
        nightWorkingMinutes = exclusiveMinutes.nightMinutes;

        
      }
      let requirementStartTime = null;
      let requirementEndTime = null;

      let requirementBreakStartTime = null;
      let requirementBreakEndTime = null;
      if (ca && ca.workingHoursFrom && ca.workingHoursTo) {
        requirementStartTime = new Date(
          moment(ca.workingHoursFrom, `${dbAcceptableFormat},hh:mm`).format(),
        );
        requirementEndTime = new Date(
          moment(ca.workingHoursTo, `${dbAcceptableFormat},hh:mm`).format(),
        );
      } else {
        let startTime = cr && cr.startTime ? cr.startTime : null;
        let endTime = cr && cr.endTime ? cr.endTime : null;

        requirementStartTime = moment(
          appointmentDate + ' ' + startTime,
        ).format();
        requirementEndTime = moment(appointmentDate + ' ' + endTime).format();

        let requirementStartT = moment(requirementStartTime);
        let requirementEndT = moment(requirementEndTime);

        var diff = requirementEndT.diff(requirementStartT, 'minutes');
        if (diff < 0) {
          requirementEndTime = moment(requirementEndTime)
            .add('days', 1)
            .format();
        }
      }
      if (ca && ca.breakFrom && ca.breakTo) {
        requirementBreakStartTime = new Date(
          moment(ca.breakFrom, `${dbAcceptableFormat},hh:mm`).format(),
        );
        requirementBreakEndTime = new Date(
          moment(ca.breakTo, `${dbAcceptableFormat},hh:mm`).format(),
        );
      }
      // MAIN MINUTES
      let workingMinutes: any =
        (new Date(requirementEndTime).getTime() -
          new Date(requirementStartTime).getTime()) /
        (60 * 1000);
   

      // await getMinutes(
      //   requirementStartTime,
      //   requirementEndTime,
      // );

      let totalBreakMinutes: any = 0;
      if (requirementBreakEndTime && requirementBreakStartTime) {
        totalBreakMinutes =
          (new Date(requirementBreakEndTime).getTime() -
            new Date(requirementBreakStartTime).getTime()) /
          (60 * 1000);
      }
      // await getMinutes(
      //   requirementBreakStartTime,
      //   requirementBreakEndTime,
      // );
      let totalBreakHours = await convertIntoHours(totalBreakMinutes);

      let totalWorkingMinutes: any = workingMinutes - totalBreakMinutes;
      let workingHours = await convertIntoHours(totalWorkingMinutes);
      let sundayWorkingHours = await convertIntoHours(sundayWorkingMinutes);
      let holidayWorkingHours = await convertIntoHours(holidayWorkingMinutes);
      let nightWorkingHours = await convertIntoHours(nightWorkingMinutes);
      let feeAllowance = Number(totalWorkingMinutes * (Number(ca.fee) / 60));

      let PlycocoFeePerHour = 4;
      let commission = Number(
        totalWorkingMinutes * Number(PlycocoFeePerHour / 60),
      );

      let nightAllowance = Number(
        nightWorkingMinutes * (Number(ca.nightFee) / 60),
      );

      let sundayAllowance = Number(
        sundayWorkingMinutes * (Number(ca.weekendAllowance) / 60),
      );

      let holidayAllowance = Number(
        holidayWorkingMinutes * (Number(ca.holidayAllowance) / 60),
      );
      let otherExpenses = ca.otherExpenses ? Number(ca.otherExpenses) : 0;
      let travelAllowance = Number(ca.distanceInKM) * Number(ca.feePerKM);
      let amount =
        Number(feeAllowance) +
        Number(sundayAllowance) +
        Number(nightAllowance) +
        Number(holidayAllowance) +
        Number(travelAllowance) +
        Number(otherExpenses);
      ele.workingHours = workingHours;
      ele.nightWorkingHours = nightWorkingHours;
      ele.sundayWorkingHours = sundayWorkingHours;
      ele.holidayWorkingHours = holidayWorkingHours;
      ele.commission = commission;
      ele.amount = amount;
    });
  }


  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <InvoiceNavbar
            onhandleSelection={onhandleSelection}
            careinstitutionFilter={careinstitutionFilter}
            careInstitutionDepartmentOption={careInstitutionDepartmentOption}
            departmentFilter={departmentFilter}
            caregiverFilter={caregiverFilter}
            handleDayClick={handleDayClick}
            handleArrowDayChange={handleArrowDayChange}
            dateFilter={dateFilter}
            handleCreateInvoice={() => handleCreateInvoice()}
            createInvoiceLoading={createInvoiceLoading}
          />

          <div className='common-content flex-grow-1'>
            <div className='common-content flex-grow-1  p-0 all-invoice'>
              <InvoiceList
                invoiceListLoading={invoiceListLoading}
                currentPage={currentPage}
                selectedAppointment={selectedAppointment}
                careGiverHolidays={careGiverHolidays}
                handleCheckedChange={(e: any, list: any) =>
                  handleCheckedChange(e, list)
                }
                invoiceList={
                  invoiceList &&
                  invoiceList.getAllAppointment &&
                  invoiceList.getAllAppointment.result.length
                    ? invoiceList.getAllAppointment.result
                    : []
                }
                totalCount={
                  invoiceList && invoiceList.getAllAppointment
                    ? invoiceList.getAllAppointment.totalCount
                    : 0
                }
              />
              <Form className='form-section total-form-section bg-white'>
                <div className='d-flex flex-wrap total-form-block'>
                  <Col xs={'12'} sm={'6'} md={'6'} lg={'6'}>
                    <FormGroup>
                      <Row className='align-items-center'>
                        <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                          <Label className='form-label col-form-label'>
                            Total
                          </Label>
                        </Col>
                        <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                          <div className='required-input'>
                            <Input
                              type='text'
                              name={'firstName'}
                              placeholder={'Total Amount'}
                              disable={true}
                              value={totalAmount}
                              className='text-input text-capitalize'
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col xs={'12'} sm={'6'} md={'6'} lg={'6'}>
                    <FormGroup>
                      <Row className='align-items-center'>
                        <Col xs={'12'} sm={'4'} md={'4'} lg={'4'}>
                          <Label className='form-label col-form-label'>
                            Total selection
                          </Label>
                        </Col>
                        <Col xs={'12'} sm={'8'} md={'8'} lg={'8'}>
                          <div className='required-input'>
                            <Input
                              type='text'
                              name={'firstName'}
                              placeholder={'Total selection'}
                              disable={true}
                              value={selectedAppointment.length}
                              className='text-input text-capitalize'
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateInvoice;
