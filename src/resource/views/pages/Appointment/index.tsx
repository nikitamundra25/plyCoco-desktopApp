import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { getDaysArrayByMonth, germanNumberFormat } from '../../../../helpers';
import './index.scss';
import AppointmentNav from './AppointmentNav';
import CaregiverListView from './Caregiver/CaregiverListView';
import CarinstituionListView from './Careinstituion/CareinstituionListView';
import {
  IGetDaysArrayByMonthRes,
  IQualifications,
  IReactSelectInterface,
  ICaregiverFormValue,
  ICareinstitutionFormValue
} from '../../../../interfaces';
import moment from 'moment';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  GET_QUALIFICATION_ATTRIBUTE,
  AppointmentsQueries
} from '../../../../graphql/queries';
import CaregiverFormView from './Caregiver/CaregiverForm';
import CareinstitutionFormView from './Careinstituion/CareinstitutionForm';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { CareGiverValidationSchema } from '../../../validations/AppointmentsFormValidationSchema';
import { toast } from 'react-toastify';
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const Appointment: FunctionComponent = () => {
  const [daysData, setDaysData] = useState<IGetDaysArrayByMonthRes | null>(
    null
  );
  const [activeMonth, setActiveMonth] = useState<number>(moment().month());
  const [activeYear, setActiveYear] = useState<number>(moment().year());
  const [qualification, setqualification] = useState<any>([]);
  const [caregiversList, setcaregiversList] = useState<Object[]>([]);
  const [careinstitutionList, setcareinstitutionList] = useState<Object[]>([]);
  const [selectedCareGiver, setselectedCareGiver] = useState<any>({});
  const [selectedCareinstitution, setselectedCareinstitution] = useState<any>(
    {}
  );

  // const [activeDate, setActiveDate] = useState<string>('');

  // To fetch caregivers by qualification id
  const [
    fetchCaregiverList,
    { data: careGiversList, loading: caregiverLoading }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch careinstitution by qualification id
  const [
    fetchCareinstitutionList,
    { data: careInstitutionList, loading: careinstitutionLoading }
  ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
    fetchPolicy: 'no-cache'
  });

  // To fetch qualification attributes list
  const { data } = useQuery<IQualifications>(GET_QUALIFICATION_ATTRIBUTE);
  const qualificationList: IReactSelectInterface[] | undefined = [];
  if (data && data.getQualifications) {
    data.getQualifications.forEach((quali: any) => {
      qualificationList.push({
        label: quali.name,
        value: quali.id
      });
    });
  }

  // To store users list into state
  useEffect(() => {
    if (careGiversList && careGiversList.getUserByQualifications) {
      const { getUserByQualifications } = careGiversList;
      if (getUserByQualifications && getUserByQualifications.length) {
        setcaregiversList(getUserByQualifications);
      }
    }
    if (careInstitutionList && careInstitutionList.getUserByQualifications) {
      const { getUserByQualifications } = careInstitutionList;
      if (getUserByQualifications && getUserByQualifications.length) {
        setcareinstitutionList(getUserByQualifications);
      }
    }
  }, [careGiversList, careInstitutionList]);

  // Reset the users list
  const handleReset = (name: string) => {
    if (name === 'caregiver') {
      if (careGiversList && careGiversList.getUserByQualifications) {
        const { getUserByQualifications } = careGiversList;
        if (getUserByQualifications && getUserByQualifications.length) {
          setcaregiversList(getUserByQualifications);
        }
      }
    } else {
      if (careInstitutionList && careInstitutionList.getUserByQualifications) {
        const { getUserByQualifications } = careInstitutionList;
        if (getUserByQualifications && getUserByQualifications.length) {
          setcareinstitutionList(getUserByQualifications);
        }
      }
    }
  };

  // Select qualification attribute
  const handleQualification = (selectedOption: IReactSelectInterface[]) => {
    setqualification(selectedOption);
  };

  // To fetch users according to qualification selected
  useEffect(() => {
    let temp: any = [];
    qualification.map((key: any, index: number) => {
      temp.push(parseInt(key.value));
    });
    // get careGivers list
    fetchCaregiverList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'caregiver'
      }
    });
    // get careInstitution list
    fetchCareinstitutionList({
      variables: {
        qualificationId: temp ? temp : null,
        userRole: 'canstitution'
      }
    });
  }, [qualification]);

  // set careGivers list options
  const careGiversOptions: IReactSelectInterface[] | undefined = [];
  if (careGiversList && careGiversList.getUserByQualifications) {
    const { getUserByQualifications } = careGiversList;
    if (getUserByQualifications && getUserByQualifications.length) {
      getUserByQualifications.map((list: any) => {
        return careGiversOptions.push({
          label: `${list.firstName} ${list.lastName} `,
          value: list.id ? list.id : ''
        });
      });
    }
  }

  // set careInstitution list options
  const careInstitutionOptions: IReactSelectInterface[] | undefined = [];
  if (careInstitutionList && careInstitutionList.getUserByQualifications) {
    const { getUserByQualifications } = careInstitutionList;
    if (getUserByQualifications && getUserByQualifications.length) {
      getUserByQualifications.map((list: any) => {
        return careInstitutionOptions.push({
          label: `${list.firstName} ${list.lastName} `,
          value: list.id ? list.id : ''
        });
      });
    }
  }
  // To set initial month and year
  useEffect(() => {
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(
      moment().month(),
      moment().year()
    );
    setDaysData(res);
  }, []);

  // On previous month click
  const handlePrevious = () => {
    let month: number = activeMonth - 1;
    let year: number = activeYear;

    // To check if active month is january than set month to december & year to previous year
    if (activeMonth === 0) {
      month = 11;
      year = activeYear - 1;
    }
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    setActiveMonth(month);
    setActiveYear(year);
    setDaysData(res);
  };

  // On next month click
  const handleNext = () => {
    let month: number = activeMonth + 1;
    let year: number = activeYear;
    // To check if active month is december than set month to january & year to next year
    if (activeMonth === 11) {
      month = 0;
      year = activeYear + 1;
    }
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    setActiveMonth(month);
    setActiveYear(year);
    setDaysData(res);
  };

  const handleDayClick = (selectedDay: any) => {
    let year: number = selectedDay.getFullYear();
    let month: number = selectedDay.getMonth();
    const res: IGetDaysArrayByMonthRes = getDaysArrayByMonth(month, year);
    setActiveMonth(month);
    setActiveYear(year);
    setDaysData(res);
  };

  // Adding Row into table
  const onAddingRow = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
    index: number
  ) => {
    e.preventDefault();
    if (name === 'caregiver') {
      let temp: any = [...caregiversList];
      temp.splice(index + 1, 0, {});
      setcaregiversList(temp);
    } else {
      let temp: any = [...careinstitutionList];
      temp.splice(index + 1, 0, {});
      setcareinstitutionList(temp);
    }
  };

  // select careGiver or careinstitution
  const handleSelectedUser = (list: object, name: string) => {
    if (name === 'caregiver') {
      setselectedCareGiver(list);
    } else {
      setselectedCareinstitution(list);
    }
  };

  // Select single user from list and hide the rest
  const handleSecondStar = (list: object, index: number, name: string) => {
    let temp: any = [];
    temp.push(list);
    if (name === 'caregiver') {
      setcaregiversList(temp);
    } else {
      setcareinstitutionList(temp);
    }
  };

  // submit caregiver form
  const handleSubmitCaregiverForm = async (
    values: ICaregiverFormValue,
    { setSubmitting, setFieldError }: FormikHelpers<ICaregiverFormValue>
  ) => {
    console.log('insideeee');

    const {
      firstName,
      lastName,
      fee,
      nightFee,
      nightAllowance,
      holidayAllowance,
      weekendAllowance,
      workingProofRecieved,
      distanceInKM,
      feePerKM,
      travelAllowance,
      otherExpenses,
      workingHoursFrom,
      workingHoursTo,
      breakFrom,
      breakTo,
      remarksCareGiver,
      remarksInternal,
      f,
      s,
      n
    } = values;
    try {
      let careGiverInput: any = {
        firstName: firstName ? firstName.trim() : '',
        lastName: lastName ? lastName.trim() : '',
        fee: fee ? parseFloat(fee.replace(/,/g, '.')) : null,
        weekendAllowance: weekendAllowance
          ? parseFloat(weekendAllowance.replace(/,/g, '.'))
          : null,
        holidayAllowance: holidayAllowance
          ? parseFloat(holidayAllowance.replace(/,/g, '.'))
          : null,
        nightFee: nightFee ? parseFloat(nightFee.replace(/,/g, '.')) : null,
        nightAllowance:
          nightAllowance && nightAllowance.value ? nightAllowance.value : null,
        workingProofRecieved: workingProofRecieved ? true : false,
        distanceInKM: distanceInKM ? distanceInKM : null,
        feePerKM: feePerKM ? feePerKM : null,
        otherExpenses: otherExpenses
          ? parseFloat(otherExpenses.replace(/,/g, '.'))
          : null,
        remarksCareGiver: remarksCareGiver ? remarksCareGiver : null,
        remarksInternal: remarksInternal ? remarksInternal : null,
        f: f ? 'available' : 'default',
        s: s ? 'available' : 'default',
        n: n ? 'available' : 'default'
      };
      console.log('careGiverInput', careGiverInput);
    } catch (error) {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '')
        .replace('GraphQL error: ', '');
      // setFieldError('email', message);
      toast.error(message);
    }
    setSubmitting(false);
  };

  // submit careinstitution form
  const handleSubmitCareinstitutionForm = () => {};

  // Fetch values in case of edit by default it will be null or undefined
  const {
    firstName = '',
    lastName = '',
    workingProofRecieved = false,
    distanceInKM = '',
    feePerKM = '',
    travelAllowance = '',
    otherExpenses = '',
    workingHoursFrom = '',
    workingHoursTo = '',
    breakFrom = '',
    breakTo = '',
    remarksCareGiver = '',
    remarksInternal = '',
    caregiver = {},
    f = false,
    s = false,
    n = false
  } = selectedCareGiver ? selectedCareGiver : {};

  const {
    nightAllowance = undefined,
    fee = null,
    nightFee = caregiver.night ? caregiver.night : null,
    weekendAllowance = null,
    holiday = null
  } = caregiver ? caregiver : {};

  const valuesForCaregiver: ICaregiverFormValue = {
    firstName,
    lastName,
    fee: fee !== null ? germanNumberFormat(caregiver.fee) : '',
    nightFee: nightFee !== null ? germanNumberFormat(nightFee) : '',
    nightAllowance: nightAllowance
      ? { value: caregiver.nightAllowance, label: caregiver.nightAllowance }
      : undefined,
    holidayAllowance: holiday !== null ? germanNumberFormat(holiday) : '',
    weekendAllowance:
      weekendAllowance !== null ? germanNumberFormat(weekendAllowance) : '',
    workingProofRecieved,
    distanceInKM,
    feePerKM,
    travelAllowance,
    otherExpenses,
    workingHoursFrom,
    workingHoursTo,
    breakFrom,
    breakTo,
    remarksCareGiver,
    remarksInternal,
    f,
    s,
    n
  };

  const valuesForCareinstitution: any = {
    firstName,
    lastName
  };
  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <AppointmentNav
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            daysData={daysData}
            qualificationList={qualificationList}
            handleQualification={handleQualification}
            careInstitutionList={careInstitutionOptions}
            careGiversList={careGiversOptions}
            handleDayClick={handleDayClick}
          />

          <div className='common-content flex-grow-1'>
            <div>
              <Row>
                <Col lg={'6'}>
                  <CaregiverListView
                    daysData={daysData}
                    loading={caregiverLoading}
                    careGiversList={caregiversList ? caregiversList : []}
                    onAddingRow={onAddingRow}
                    handleSelectedUser={handleSelectedUser}
                    handleSecondStar={handleSecondStar}
                    handleReset={handleReset}
                  />
                  <CarinstituionListView
                    daysData={daysData}
                    loading={careinstitutionLoading}
                    careInstitutionList={
                      careinstitutionList ? careinstitutionList : []
                    }
                    onAddingRow={onAddingRow}
                    handleSelectedUser={handleSelectedUser}
                    handleSecondStar={handleSecondStar}
                    handleReset={handleReset}
                  />
                </Col>
                <Col lg={'3'} className='px-lg-0'>
                  <Formik
                    initialValues={valuesForCaregiver}
                    onSubmit={handleSubmitCaregiverForm}
                    enableReinitialize={true}
                    validationSchema={CareGiverValidationSchema}
                    render={(props: FormikProps<ICaregiverFormValue>) => {
                      return (
                        <CaregiverFormView
                          {...props}
                          selectedCareGiver={selectedCareGiver}
                        />
                      );
                    }}
                  />
                </Col>
                <Col lg={'3'}>
                  <Formik
                    initialValues={valuesForCareinstitution}
                    onSubmit={handleSubmitCareinstitutionForm}
                    enableReinitialize={true}
                    // validationSchema={CareGiverValidationSchema}
                    render={(props: FormikProps<ICareinstitutionFormValue>) => {
                      return (
                        <CareinstitutionFormView
                          {...props}
                          selectedCareinstitution={selectedCareinstitution}
                        />
                      );
                    }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
