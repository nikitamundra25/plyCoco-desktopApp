import React, { FunctionComponent } from 'react';
import { Document, Page, Text, Image, View, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';
import { IConfirmAppointmentPdfProps } from '../../../../../interfaces';

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
            Diamond Personal GmbH, unter dem Label TIMyoCY · Welfenallee 3-7 · 13465 Berlin
      </Link>
          <Text style={styles.subtext}>Arkadia Pflege Betriebsgesellschaft mbH  </Text>
          <Text style={styles.subtext}>Senioren- und Pflegewohnpark Blütentraum  </Text>
          <Text style={styles.subtext}>Senioren- und Pflegewohnpark Blütentraum </Text>
          <Text style={styles.subtext}>14542 Werder  </Text>

        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Supply of temporary workers  </Text>
          <Text style={styles.subtext}>Supply of temporary workers according to the mutually agreed  leasing framework contract.   </Text></View>
        <View style={styles.section}>
          <Text style={styles.subtextbold}>No. Temporary work details   </Text>
          <Text style={styles.subtext}>24.01.2020, FD, Worker: Jaroslaw Majewski, Qualification: Pflegehelfer, pay group: 3 </Text>
          <Text style={styles.subtext}>25.01.2020, FD, Worker: Jaroslaw Majewski, Qualification: Pflegehelfer, pay group: 3 </Text>
          <Text style={styles.subtext}>26.01.2020, FD, Worker: Jaroslaw Majewski, Qualification: Pflegehelfer, pay group: 3 </Text>
        </View>

        <View style={styles.signaturecontainer}>
          <View>
            <Text style={styles.imagediv}>

            </Text>
            <Text style={styles.imgtext}>
              Please sign it and send it back via mail.
              </Text>
          </View>
        </View>
        <View style={styles.footerwrapper}>
          <Text style={styles.footertext}>TIMyoCY is a service of Diamond Personal GmbH · Welfenallee 3-7 · 13465 Berlin </Text>
          <Text style={styles.footertext}>Tel: +49.30.644 99 444 Fax: +49.30. 644 99 445 </Text>
          <Text style={styles.footertext}>Supervisory authority:  Agentur für Arbeit Kiel, 24131 Kiel, Tel: 0431 709 1010 </Text>
          <Text style={styles.footertext}>Entry in commercial register: Register court: District court Berlin-Charlottenburg</Text>
          <Text style={styles.footertext}>Register number: HRB 191079 B Managing Director: Maren Krusch </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ConfirmAppointmentPdf;