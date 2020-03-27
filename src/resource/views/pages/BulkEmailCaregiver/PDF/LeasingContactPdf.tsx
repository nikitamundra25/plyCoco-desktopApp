import React, { FunctionComponent } from 'react';
import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import { ILeasingContactPdfProps } from '../../../../../interfaces';
import { AppConfig } from '../../../../../config';

const LeasingContactPdf: FunctionComponent<ILeasingContactPdfProps> = (
  props: ILeasingContactPdfProps
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
      marginBottom: '0',
      paddingBottom: '0',
      flexGrow: 1
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
      fontSize: 12,
      color: 'black',
      marginTop: '8px',
      marginBottom: '8px'

    },
    signaturecontainer: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: '0',
      flexGrow: 1,
      marginLeft: '10px',
      marginRight: '10px',
    },
    image: {
      width: '50%',
      height: '50px',
      padding: 10,
    },
    imgtext: {
      borderTopWidth: 1,
      borderColor: 'black',
      borderStyle: 'solid',
      paddingTop: "10px",
      fontSize: 12,
      fontWeight: 'bold',
    },
    textwrapper: {
      margin: 10,
      padding: 10,
      marginBottom: '0',
      paddingBottom: '0',
      flexGrow: 1
    },
    remarktext: {
      fontSize: 12,
      color: 'black',
      marginBottom: '4px'
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

  const { signatureData, pdfAppointmentDetails } = props;
  console.log(signatureData && signatureData.careGiverSignature ? `${AppConfig.FILES_ENDPOINT}${signatureData.careGiverSignature}` : '','signature');
  
  // Create Document Component
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.name}>TIMYOCY</Text>
          <Text style={styles.subtitle}>Temporary working agreement  </Text>
          <Text style={styles.subtext}>Between </Text>
          <Text style={styles.subtext}>Diamond Personal GmbH, Welfenallee 3-7, 13465 Berlin under the label TIMyoCY </Text>
          <Text style={styles.subtext}> - hereinafter: distributor – </Text>
          <Text style={styles.subtext}>and </Text>
          <Text style={styles.subtext}>…. </Text>
          <Text style={styles.subtext}>- hereinafter: temporary agency workers – </Text>
          <Text style={styles.subtext}>The employer was given a temporary permit to provide temporary workers on June 19, 2017 by the Federal Employment Agency, Employment Agency in Düsseldorf. With reference to the framework agreement of the parties agree the following use: </Text>

          {/* <Text key={index} style={styles.subtext}>24.-26.01.2020 FD, Place of work: Am Strengfeld, 14542 Werder, Seniorenwohnpark "Blütentraum", Haus 3, job: nursing assistant </Text> */}

          {pdfAppointmentDetails && pdfAppointmentDetails.length > 0 ? (
            pdfAppointmentDetails.map((item: any, index: number) => {
              return (
                <Text key={index} style={styles.subtext}>{item}</Text>
              )
            })
          ) : null}

          <Text style={styles.subtext}>I would like to be employed indefinitely on identical terms: yes (     ) / no (    ) (please check). </Text>
        </View>
        <View style={styles.signaturecontainer}>
          <View style={styles.image}>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Richard_Feynman_signature.svg/1280px-Richard_Feynman_signature.svg.png" />
            <Text style={styles.imgtext}>
              Distributor
          </Text>
          </View>
          <View style={styles.image}>
            {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Richard_Feynman_signature.svg/1280px-Richard_Feynman_signature.svg.png" /> */}
            <Image src={signatureData && signatureData.careGiverSignature ? `${AppConfig.FILES_ENDPOINT}${signatureData.careGiverSignature}` : ''} />
            <Text style={styles.imgtext}>
              Temporary Worker
          </Text>
          </View>
        </View>
        <View style={styles.textwrapper}>
          <Text style={styles.remarktext}> With his further signature, the employee confirms that he identifies permanent part-time employment Conditions were offered, but he prefers this limited form of employment to a job in permanent employment. </Text>
          <Text style={styles.remarktext}>He is aware that in this case there is no guarantee wage claim beyond the agreed working hours and, as a rule, also </Text>
          <Text style={styles.remarktext}>there is no entitlement to the granting of vacation or continued payment of sickness. </Text>
        </View>
        <View style={styles.signaturecontainer}>
          <View style={styles.image}>
            {/* <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Richard_Feynman_signature.svg/1280px-Richard_Feynman_signature.svg.png" /> */}
            <Image src={signatureData ? signatureData.careGiverSignature : ''} />
            <Text style={styles.imgtext}>
              Temporary Worker
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

export default LeasingContactPdf;