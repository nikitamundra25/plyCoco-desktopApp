import React, { FunctionComponent } from "react";
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { ILeasingContactPdfProps } from "../../../../../interfaces";
import { AppConfig } from "../../../../../config";
import { languageTranslation } from "../../../../../helpers";

const LeasingContactPdf: FunctionComponent<ILeasingContactPdfProps> = (
  props: ILeasingContactPdfProps
) => {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      marginBottom: "0",
      paddingBottom: "0",
      flexGrow: 1,
    },
    name: {
      fontSize: 24,
      color: "red",
      marginBottom: "20px",
    },
    subtitle: {
      fontSize: 15,
      fontWeight: "bold",

      marginBottom: "15px",
    },
    subtext: {
      fontSize: 12,
      color: "black",
      marginTop: "8px",
      marginBottom: "8px",
    },
    signaturecontainer: {
      flex: 1,
      flexDirection: "row",
      marginBottom: "0",
      flexGrow: 1,
      marginLeft: "10px",
      marginRight: "10px",
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
      fontSize: 12,
      fontWeight: "bold",
    },
    textwrapper: {
      margin: 10,
      padding: 10,
      marginBottom: "0",
      paddingBottom: "0",
      flexGrow: 1,
    },
    remarktext: {
      fontSize: 12,
      color: "black",
      marginBottom: "4px",
    },
    footerwrapper: {
      margin: 10,
      textAlign: "center",
      flexGrow: 1,
      justifyContent: "center",
    },
    footertext: {
      fontSize: 10,
      color: "gray",
      marginBottom: "2px",
      textAlign: "center",
    },
  });

  const { signatureData, pdfAppointmentDetails } = props;

  // Append base url to the signature
  let careGiverSignature: string =
    signatureData && signatureData.careGiverSignature
      ? `${AppConfig.APP_ENDPOINT}${signatureData.careGiverSignature}`
      : "";
  // Create Document Component

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.name}>TIMYOCY</Text>
          <Text style={styles.subtitle}>
            {languageTranslation("TEMPORARY_WORKING_AGREEMENT")}{" "}
          </Text>
          <Text style={styles.subtext}>{languageTranslation("BETWEEN")} </Text>
          <Text style={styles.subtext}>
            {languageTranslation("DIAMOND_PERSONAL_LABEL")} TIMyoCY{" "}
          </Text>
          <Text style={styles.subtext}>
            {" "}
            - {languageTranslation("HERE_DISTRIBUTOR")} –{" "}
          </Text>
          <Text style={styles.subtext}>{languageTranslation("AND")} </Text>
          <Text style={styles.subtext}>…. </Text>
          <Text style={styles.subtext}>
            -{languageTranslation("TEMPORARY_AGENCY_WORKERS")} –{" "}
          </Text>
          <Text style={styles.subtext}>
            {languageTranslation("EMPLOYEE_TEMPORARY_PERMIT")}{" "}
          </Text>

          {/* <Text key={index} style={styles.subtext}>24.-26.01.2020 FD, Place of work: Am Strengfeld, 14542 Werder, Seniorenwohnpark "Blütentraum", Haus 3, job: nursing assistant </Text> */}

          {pdfAppointmentDetails && pdfAppointmentDetails.length > 0
            ? pdfAppointmentDetails.map((item: any, index: number) => {
                return (
                  <Text key={index} style={styles.subtext}>
                    {item}
                  </Text>
                );
              })
            : null}

          <Text style={styles.subtext}>
            {languageTranslation("I_WOULD_LIKE_TO_BE_EMPLOYEED")} {" "}
          </Text>
        </View>
        <View style={styles.signaturecontainer}>
          <View style={styles.imagediv}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Richard_Feynman_signature.svg/1280px-Richard_Feynman_signature.svg.png"
              style={styles.image}
            />
            <Text style={styles.imgtext}>
              {languageTranslation("DISTRIBUTOR")}
            </Text>
          </View>
          <View style={styles.imagediv}>
            {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Richard_Feynman_signature.svg/1280px-Richard_Feynman_signature.svg.png"   style={styles.image}/> */}
            {careGiverSignature ? (
              <Image src={careGiverSignature} style={styles.image} />
            ) : null}
            <Text style={styles.imgtext}>
              {languageTranslation("TEMPORARY_WORKERS")}
            </Text>
          </View>
        </View>
        <View style={styles.textwrapper}>
          <Text style={styles.remarktext}>
            {" "}
            {languageTranslation("EMPLOYEE_CONFIRM_WITH_SIGNATURE")}{" "}
          </Text>
          <Text style={styles.remarktext}>
            {languageTranslation("NO_GUARANTEE_WAGE_CLAIM")}{" "}
          </Text>
          <Text style={styles.remarktext}>
            {languageTranslation("NO_ENTITLEMENT_OF_GRANTING_VACATION")}{" "}
          </Text>
        </View>
        <View style={styles.signaturecontainer}>
          <View style={styles.imagediv}>
            {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Richard_Feynman_signature.svg/1280px-Richard_Feynman_signature.svg.png" /> */}
            {careGiverSignature ? (
              <Image src={careGiverSignature} style={styles.image} />
            ) : null}
            <Text style={styles.imgtext}>
              {languageTranslation("TEMPORARY_WORKERS")}
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
            {languageTranslation("ENTRY_IN_COMMERCIAL_REGISTER")}
          </Text>
          <Text style={styles.footertext}>
            {languageTranslation("REGISTER_NUMBER_PDF")}{" "}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default LeasingContactPdf;
