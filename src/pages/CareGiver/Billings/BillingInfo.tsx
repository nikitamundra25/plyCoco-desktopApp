import React, { Component } from "react";

class BillingInfo extends Component {
  render() {
    return (
      <div>
        <h5>WHEN IS THE INVOICE AUTOMATICALLY GENERATED?</h5>
        <p>
          The invoices are created automatically at 10 a.m. on the billing day
          set in the profile. monthly for the 1st - the 1st of the following
          month at 10 a.m. semi-monthly for the 1st & 16th - on the 16th of the
          current month and on the 1st of the following month at 10 a.m. weekly
          Mondays - on Monday of the following week at 10 a.m. Important!the
          invoices are drawn up at 9 a.m. The respective invoice can only be
          created automatically if all working hours have been entered by 10
          a.m. !
        </p>

        <h5>SUPPLEMENTS</h5>
        <p>
          Surcharges are calculated as follows:
          <ul>
            <li>Holiday surcharge for all public holidays</li>
            <li>
              Regional holidays apply at the location of the facility's branch.
            </li>
            <li>
              Night surcharge adjustable between 8 p.m. and 10 p.m. and 6 a.m.
            </li>
          </ul>
          Weekend surcharge for Saturday and Sunday If "felt" holidays like
          Christmas Eve or New Year's Eve are more important to you, then simply
          agree a higher hourly rate with the facility for that day.
        </p>

        <h5>SERVICE CERTIFICATES</h5>
        <p>
          If proof of service is required, this will be shown in the appointment
          overview under the details of the respective appointment. A pre-filled
          form can be downloaded under the respective date. Proof of service is
          of course also possible as long as at least the same data is included.
          If you send us the completed proof of service by email or fax, we will
          add it to your invoice. Without proof of service, the facility can
          usually not process the respective invoice! Even if the institution
          does not require proof of service, it is a good idea to keep one for
          yourself so that you can document your own working hours if anything
          is unclear.
        </p>
      </div>
    );
  }
}
export default BillingInfo;
