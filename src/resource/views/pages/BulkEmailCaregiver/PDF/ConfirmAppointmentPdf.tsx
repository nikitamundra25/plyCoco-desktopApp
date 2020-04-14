import React, { FunctionComponent } from 'react';
import { Document, Page, Text, Image, View, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';
import { IConfirmAppointmentPdfProps } from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';

const ConfirmAppointmentPdf: FunctionComponent<IConfirmAppointmentPdfProps> = (
  props: IConfirmAppointmentPdfProps
) => {

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',

    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      marginBottom: '0',
      paddingBottom: '0',
    },
    name: {
      fontSize: 24,
      color: 'red',
      marginBottom: '20px'
    },
    subtitle: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    subtext: {
      fontSize: 11,
      color: 'black',
      marginTop: '8px',
      marginBottom: '8px',

    },
    subtextbold: {
      fontSize: 12,
      color: 'black',
      marginBottom: '10px',
      paddingBottom: '4px',
      fontWeight: 'bold',
      borderBottomWidth: 2,
      borderColor: 'black',
      borderStyle: 'solid',
    },
    signaturecontainer: {
      flex: 1,
      flexDirection: 'row',
      marginTop: '0px',
      marginBottom: '0px',
      flexGrow: 1,
      marginLeft: '10px',
      marginRight: '10px',
    },
    imagediv: {

      height: '50px',
      margin: 10,
    },
    imgtext: {
      marginLeft: '10px',
      marginRight: '10px',
      paddingTop: "10px",
      fontSize: 11,
      fontWeight: 'bold',
    },

    footerwrapper: {
      margin: 10,
      textAlign: 'center',
      flexGrow: 1,
      justifyContent: 'center'

    },
    footertext: {
      fontSize: 10,
      color: 'gray',
      marginBottom: '2px',
      textAlign: 'center'
    }
  });

  // Create Document Component
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.name}>TIMYOCY</Text>
          <Link
            style={styles.subtext}
            src="#"
          >
            {languageTranslation("PDF_DIAMOND_PERSONAL_GMBH")}
      </Link>
          <Text style={styles.subtext}>{languageTranslation("ARKADIA_PFLEGE")} </Text>
          <Text style={styles.subtext}>{languageTranslation("SENIOR_NURSING_HOME_PACK")}  </Text>
          <Text style={styles.subtext}>{languageTranslation("SENIOR_NURSING_HOME_PACK")} </Text>
          <Text style={styles.subtext}>{languageTranslation("WERDER")}  </Text>

        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>{languageTranslation("SUPPLY_TEMPORARY_WORKERS")}  </Text>
          <Text style={styles.subtext}>{languageTranslation("SUPPLY_TEMPORARY_WORKERS_LEASING_CONTRACT")}  </Text></View>
        <View style={styles.section}>
          <Text style={styles.subtextbold}>{languageTranslation("WORK_DETAILS")}   </Text>
          <Text style={styles.subtext}>24.01.2020, {languageTranslation("PAY_GROUP")} </Text>
          <Text style={styles.subtext}>25.01.2020, {languageTranslation("PAY_GROUP")} </Text>
          <Text style={styles.subtext}>26.01.2020, {languageTranslation("PAY_GROUP")} </Text>
        </View>

        <View style={styles.signaturecontainer}>
          <View>
            <Text style={styles.imagediv}>

            </Text>
            <Text style={styles.imgtext}>
              {languageTranslation("SIGN_IT_AND_SEND_BACK")}
              </Text>
          </View>
        </View>
        <View style={styles.footerwrapper}>
          <Text style={styles.footertext}>TIMyoCY {languageTranslation("TIMyoCY_SERVICE")} </Text>
          <Text style={styles.footertext}>{languageTranslation("TEL")}: +49.30.644 99 444 {languageTranslation("FAX")}: +49.30. 644 99 445 </Text>
          <Text style={styles.footertext}>{languageTranslation("SUPERVISORY_AUTHORITY")}, {languageTranslation("TEL")}: 0431 709 1010 </Text>
  <Text style={styles.footertext}>{languageTranslation("ENTRY_IN_COMMERCIAL_REGISTER")}</Text>
          <Text style={styles.footertext}>{languageTranslation("REGISTER_NUMBER_PDF")} </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ConfirmAppointmentPdf;