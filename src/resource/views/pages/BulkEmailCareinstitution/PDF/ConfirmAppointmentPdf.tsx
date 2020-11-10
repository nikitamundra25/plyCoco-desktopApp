import React, { FunctionComponent } from "react";
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import moment from "moment";
import { IConfirmAppointmentPdfProps } from "../../../../../interfaces";
import { defaultDateFormat, payGroups } from "../../../../../config";
import { languageTranslation } from "../../../../../helpers";
import timyocLogo from "../../../../assets/img/timyoc.png";

const ConfirmAppointmentPdf: FunctionComponent<
  IConfirmAppointmentPdfProps & { qualificationList: any }
> = (props: IConfirmAppointmentPdfProps & { qualificationList: any }) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      width: "100%",
      paddingRight: "40px",
      paddingLeft: "40px",
      marginRight: "auto",
      marginTop: "0px",
      marginLeft: "auto",
      // fontFamily: 'Roboto Normal',
    },
    section: {
      paddingRight: "10px",
      paddingLeft: "10px",
      marginRight: "10px",
      marginLeft: "10px",
      marginTop: "10",
      marginBottom: "10",
      paddingBottom: "10",
      paddingTop: "0",
      // fontFamily: 'Roboto Normal',
      // flexGrow: 1,
    },
    name: {
      width: "150px",
      marginBottom: "40px",
      marginTop: "30px",
      // fontFamily: 'Roboto Bold',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
      marginBottom: "15px",
      // fontFamily: 'Roboto Medium',
    },
    subtext: {
      fontSize: 10,
      color: "#333",
      marginTop: "10px",
      marginBottom: "10px",
      // fontFamily: 'Roboto Normal',
    },
    subtext1: {
      fontSize: 10,
      color: "#333",
      marginTop: "0px",
      marginBottom: "10px",
      // fontFamily: 'Roboto Normal',
    },
    subtextbold: {
      fontSize: 12,
      color: "black",
      marginBottom: "10px",
      paddingBottom: "4px",
      fontWeight: "bold",
      borderBottomWidth: 2,
      borderColor: "black",
      borderStyle: "solid",
      // fontFamily: 'Roboto Medium',
    },
    signaturecontainer: {
      flex: 1,
      flexDirection: "row",
      marginBottom: "0",
      flexGrow: 1,
      marginLeft: "10px",
      marginRight: "10px",
      paddingRight: "10px",
      paddingLeft: "10px",
      // fontFamily: 'Roboto Normal',
    },
    imagediv: {
      width: "50%",
      height: "50px",
      padding: 10,
    },
    image: {
      width: "120px",
    },
    imgtext: {
      borderTopWidth: 1,
      borderColor: "black",
      borderStyle: "solid",
      paddingTop: "10px",
      fontSize: 10,
      fontWeight: "bold",
      // fontFamily: 'Roboto Medium',
    },
    footerwrapper: {
      margin: 10,
      textAlign: "center",
      flexGrow: 1,
      justifyContent: "center",
      // fontFamily: 'Roboto Normal',
    },
    footertext: {
      fontSize: 9,
      color: "gray",
      marginBottom: "2px",
      textAlign: "center",
      // fontFamily: 'Roboto Normal',
    },
  });

  const { selectedCellsCareinstitution, qualificationList } = props;

  // Create Document Component
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image src={timyocLogo} style={styles.name} />
          <Link style={styles.subtext} src="#">
            {languageTranslation("PDF_DIAMOND_PERSONAL_GMBH")}
          </Link>
          {selectedCellsCareinstitution &&
          selectedCellsCareinstitution.length &&
          selectedCellsCareinstitution[0].canstitution &&
          selectedCellsCareinstitution[0].canstitution.canstitution ? (
            <>
              <Text style={styles.subtext}>
                {selectedCellsCareinstitution[0].canstitution.canstitution.companyName || ""}
              </Text>
              <Text style={styles.subtext}>
                {selectedCellsCareinstitution[0].canstitution.canstitution.street || "-"}
              </Text>
              <Text style={styles.subtext}>
                {selectedCellsCareinstitution[0].canstitution.canstitution.zipCode || ""}{" "}
                {selectedCellsCareinstitution[0].canstitution.canstitution.city || ""}
              </Text>
            </>
          ) : null}
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>
            {languageTranslation("SUPPLY_TEMPORARY_WORKERS")}{" "}
          </Text>
          <Text style={styles.subtext}>
            {languageTranslation("SUPPLY_TEMPORARY_WORKERS_LEASING_CONTRACT")}{" "}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtextbold}>
            {languageTranslation("WORK_DETAILS")}
          </Text>

          {selectedCellsCareinstitution && selectedCellsCareinstitution.length
            ? selectedCellsCareinstitution.map((cell: any, index: number) => {
                const { item = {} } = cell;
                const {
                  id = "",
                  startTime = "",
                  date = "",
                  appointments = [],
                  qualificationForCharge = "",
                } = item ? item : {};
                let payGroup: number = 4;
                let payGroupIndex = payGroups.findIndex((paygrp: any) =>
                  paygrp.includes(qualificationForCharge)
                );
                if (payGroupIndex > -1) {
                  payGroup = payGroupIndex + 1;
                }
                const { ca = {} } =
                  appointments && appointments.length ? appointments[0] : {};
                let qualificationforChargerData = qualificationList.filter(
                  (item: any) => item.value === qualificationForCharge
                );
                let shiftLabel: string =
                  startTime === "06:00"
                    ? "FD"
                    : startTime === "14:00"
                    ? "SD"
                    : "ND";
                return id ? (
                  <Text style={styles.subtext1} key={index}>
                    {date ? moment(date).format(defaultDateFormat) : ""},{" "}
                    {shiftLabel},{" "}
                    {ca && ca.name
                      ? `${languageTranslation("WORKER")}: ${ca.name},`
                      : ""}{" "}
                    {languageTranslation("QUALIFICATION")}:{" "}
                    {qualificationforChargerData &&
                    qualificationforChargerData.length
                      ? qualificationforChargerData[0].label
                      : ""}
                    , {languageTranslation("PAY_GROUP_TXT")}: {payGroup}{" "}
                  </Text>
                ) : null;
              })
            : null}
        </View>

        <View style={styles.signaturecontainer}>
          <View>
            <Text style={styles.imagediv}></Text>
            <Text style={styles.imgtext}>
              {languageTranslation("SIGN_IT_AND_SEND_BACK")}
            </Text>
          </View>
        </View>
        <View style={styles.footerwrapper}>
          <Text style={styles.footertext}>
            TIMyoCY {languageTranslation("TIMyoCY_SERVICE")}{" "}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("TEL")}: +49.30.644 99 444{" "}
            {languageTranslation("FAX")}: +49.30. 644 99 445{" "}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("SUPERVISORY_AUTHORITY")},{" "}
            {languageTranslation("TEL")}: 0431 709 1010{" "}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("ENTRY_IN_COMMERCIAL_REGISTER")}{" "}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("REGISTER_NUMBER_PDF")}{" "}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ConfirmAppointmentPdf;
