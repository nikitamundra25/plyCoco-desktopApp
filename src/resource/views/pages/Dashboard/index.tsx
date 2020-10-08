import React, { FunctionComponent, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { AppBreadcrumb } from "@coreui/react";
import Select from "react-select";
import routes from "../../../../routes/routes";
import "./index.scss";
import { languageTranslation } from "../../../../helpers";
import { useLazyQuery } from "@apollo/react-hooks";
import { DashboardQueries } from "../../../../graphql/queries";
import { DayOptions } from "../../../../config";
import RegistrationList from "./RegistrationList";
import DocumentList from "./DocumentList";
import AppointmentList from "./AppointmentList";
import ConfirmBookingList from "./ConfirmBookingList";
import IncorrectLoginList from "./IncorrectLoginList";
import SuccessfulLoginList from "./SuccessfulLoginList";
import {Helmet} from "react-helmet";

const [
  GET_DASHBOARD_REGISTRATIONS_LIST,
  GET_DASHBOARD_DOCUMENTS_LIST,
  GET_DASHBOARD_LOGIN_HISTORY_LIST,
  GET_DASHBOARD_APPOINTMENT_LIST,
] = DashboardQueries;

const Dashboard: FunctionComponent<RouteComponentProps> = (props: any) => {
  const [daysValue, setDaysValue] = useState<any>({ value: 1, label: "1 Day" });

  // To get registrations list
  const [
    getDashboardRegistrations,
    {
      data: registrationList,
      refetch: refetchRegistrationList,
      loading: registrationListLoading
    }
  ] = useLazyQuery<any>(GET_DASHBOARD_REGISTRATIONS_LIST);

  // To get documents list
  const [
    getDashboardNewDocuments,
    {
      data: documentList,
      refetch: refetchDocumentList,
      loading: documentListLoading
    }
  ] = useLazyQuery<any>(GET_DASHBOARD_DOCUMENTS_LIST);

  // To get incorrect login list
  const [
    getDashboardIncorrectLoginHistory,
    {
      data: incorrectLoginList,
      refetch: refetchIncorrectLoginList,
      loading: incorrectLoginListLoading
    }
  ] = useLazyQuery<any>(GET_DASHBOARD_LOGIN_HISTORY_LIST);

  // To get successful login list
  const [
    getDashboardSuccessFulLoginHistory,
    {
      data: successfulLoginList,
      refetch: refetchSuccessfulLoginList,
      loading: successfulLoginListLoading
    }
  ] = useLazyQuery<any>(GET_DASHBOARD_LOGIN_HISTORY_LIST);

   // To get appointment list
    const [
      getDashboardAppointment,
      {
        data: appointmentList,
        refetch: refetchAppointmentList,
        loading: appointmentListLoading
      }
    ] = useLazyQuery<any>(GET_DASHBOARD_APPOINTMENT_LIST);

     // To get confirm booking list
     const [
      getDashboardBooking,
      {
        data: bookingList,
        refetch: refetchBookingList,
        loading: confirmBookingListLoading
      }
    ] = useLazyQuery<any>(GET_DASHBOARD_APPOINTMENT_LIST);

  useEffect(() => {
    // call queries
    getDashboardRegistrations({
      variables: {
        days: daysValue ? daysValue.value : 1
      }
    });

    getDashboardNewDocuments({
      variables: {
        days: daysValue ? daysValue.value : 1
      }
    });

    getDashboardIncorrectLoginHistory({
      variables: {
        days: daysValue ? daysValue.value : 1,
        loginAttempt: "fail"
      }
    });

    getDashboardSuccessFulLoginHistory({
      variables: {
        days: daysValue ? daysValue.value : 1,
        loginAttempt: "success"
      }
    });

    getDashboardAppointment({
      variables: {
        days: daysValue ? daysValue.value : 1,
        status:"appointment"
      }
    });

    getDashboardBooking({
      variables: {
        days: daysValue ? daysValue.value : 1,
        status:"confirmed"
      }
    });

  }, [registrationList, documentList, incorrectLoginList, successfulLoginList, appointmentList, bookingList]);

  const onDaysChange = async (value: any) => {
    await getDashboardRegistrations({
      variables: {
        days: value
      }
    });

    await getDashboardNewDocuments({
      variables: {
        days: value
      }
    });

    await getDashboardIncorrectLoginHistory({
      variables: {
        days: value,
        loginAttempt: "fail"
      }
    });

    await getDashboardSuccessFulLoginHistory({
      variables: {
        days: value,
        loginAttempt: "success"
      }
    });

    await getDashboardAppointment({
      variables: {
        days: value,
        status:"appointment"
      }
    });

    await getDashboardBooking({
      variables: {
        days: value,
        status:"confirmed"
      }
    });

    refetchRegistrationList();
    refetchDocumentList();
    refetchIncorrectLoginList();
    refetchSuccessfulLoginList();
    refetchAppointmentList();
    refetchBookingList();
  };

  return (
    <>
    <Helmet>
        <title>{languageTranslation("DASHBOARD")} </title>
    </Helmet>
    
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="flex-grow-1 mr-sm-3" />
        <div className="d-flex align-items-center  mt-1 mt-sm-0">
          <div className="common-label one-line-text mr-3">
            {languageTranslation("SHOW_DAY")}
          </div>
          <div className="day-select">
            <Select
              placeholder={languageTranslation("SELECT_DAY")}
              classNamePrefix="custom-inner-reactselect"
              className="custom-reactselect"
              options={DayOptions}
              value={daysValue}
              onChange={(item: any) => {
                onDaysChange(item.value);
                setDaysValue(item);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="dashboard-section">
          <Row>
            <Col lg="4" className="pr-lg-0">
              <RegistrationList
                {...props}
                registrationListLoading={registrationListLoading}
                registrationList={registrationList}
              />
              <DocumentList
                {...props}
                documentListLoading={documentListLoading}
                documentList={documentList}
              />
            </Col>
            <Col lg="4">
              <AppointmentList
                {...props}
                appointmentListLoading={appointmentListLoading}
                appointmentList={appointmentList}
              />
              <ConfirmBookingList
                {...props}
                confirmBookingListLoading={confirmBookingListLoading}
                bookingList={bookingList}
              />
            </Col>
            <Col lg="4" className="pl-lg-0">
              <IncorrectLoginList
                {...props}
                incorrectLoginListLoading={incorrectLoginListLoading}
                incorrectLoginList={incorrectLoginList}
              />
              <SuccessfulLoginList
                {...props}
                successfulLoginListLoading={successfulLoginListLoading}
                successfulLoginList={successfulLoginList}
              />
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
 </>
  );
};
export default Dashboard;
