import React, { FunctionComponent } from 'react';
import { Document, Page, Text, Image, View, StyleSheet } from '@react-pdf/renderer';
import { ITerminationAgreementPdfProps } from '../../../../../interfaces';
import { AppConfig } from '../../../../../config';
import { languageTranslation } from '../../../../../helpers';

const TerminationAgreementPdf: FunctionComponent<ITerminationAgreementPdfProps> = (
  {pdfTerminateAppointment, signatureData}: ITerminationAgreementPdfProps
) => {
  const {name='', dateOfBirth='', street='', city=''} = pdfTerminateAppointment ? pdfTerminateAppointment :{};
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
      marginBottom: '25px'
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: '15px',
    },
    subtext: {
      fontSize: 10,
      color: 'black',
      marginTop: '3px',
      marginBottom: '3px'

    },
    subaddresstext: {
      fontSize: 10,
      color: 'black',
      marginBottom: '2px'
    },
    subtextalignright: {
      fontSize: 10,
      color: 'black',
      marginTop: '3px',
      marginBottom: '3px',
      flexGrow: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      textAlign: 'right',
    },
    subaddresshighlighttext: {
      fontSize: 10,
      color: 'red',
      marginBottom: '2px'
    },
    signaturecontainer: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: '0',
      flexGrow: 1,
      marginLeft: '10px',
      marginRight: '10px',
      justifyContent: 'space-between',

    },
    imagediv: {
      width: '40%',
      height: '50px',
      padding: 10,
    },
     image: {
      width: '120px',
      
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
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '0px',

      flexGrow: 1,

    },
    textwrapper1: {
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '0px',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '0px',

      flexGrow: 1,

    },
    remarktext: {
      fontSize: 11,
      color: 'black',
      marginBottom: '10px'
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
  // Append base url to the signature
  let careGiverSignature:string = signatureData && signatureData.careGiverSignature ? `${AppConfig.APP_ENDPOINT}${signatureData.careGiverSignature}` : ''
  // Create Document Component
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.name}>TIMYOCY</Text>
          <Text style={styles.subtitle}>{languageTranslation("TERMINATION_AGREEMENT_TEMPORARY_WORK")} </Text>
          <Text style={styles.subtext}>{languageTranslation("BETWEEN")} </Text>
          <Text style={styles.subaddresstext}>{languageTranslation("DIAMOND_LABEL_FOR_TERMINATION")} TIMyoCY  </Text>
          <Text style={styles.subaddresstext}>{languageTranslation("WELFENALLEE")} 3-7  </Text>
          <Text style={styles.subaddresstext}>13465 {languageTranslation("BERLIN")}  </Text>
          <Text style={styles.subtextalignright}>– {languageTranslation("LEASING_COMPANY")} –  </Text>
          <Text style={styles.subtext}>{languageTranslation("AND")} </Text>
          <Text style={styles.subaddresshighlighttext}>{[name, dateOfBirth].filter(Boolean).join(', ')}</Text>
          <Text style={styles.subaddresshighlighttext}>{street}</Text>
          <Text style={styles.subaddresshighlighttext}>{city}</Text>
  <Text style={styles.subtextalignright}> – {languageTranslation("HERE_LEIHARBEITNEHMER")}–  </Text>
        </View>

        <View style={styles.textwrapper}>
          <Text style={styles.remarktext}>{languageTranslation("TERMINATION_PDF_TEMPORARY_EMPLOYMENT_RELATIONSHIP")} </Text>
          <Text style={styles.subaddresshighlighttext}>xx.xx.2020  </Text>

        </View>
        <View style={styles.textwrapper1}>
          <Text style={styles.subaddresshighlighttext}>{languageTranslation("BERLIN")}, xx.xx.2020  </Text>

        </View>
        <View style={styles.signaturecontainer}>
          <View style={styles.imagediv}>
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Richard_Feynman_signature.svg/1280px-Richard_Feynman_signature.svg.png" style={styles.image}/>
            <Text style={styles.imgtext}>
              TIMyoCY
          </Text>
          </View>
          <View style={styles.imagediv}>
            {careGiverSignature ? <Image src={careGiverSignature} style={styles.image} /> : null}
            <Text style={styles.imgtext}>
               {languageTranslation("LEIHARBEITNEHMER")}
          </Text>
          </View>
        </View>
        <View style={styles.footerwrapper}>
          <Text style={styles.footertext}>TIMyoCY {languageTranslation("TIMyoCY_SERVICE")} </Text>
          <Text style={styles.footertext}>{languageTranslation("TEL")}: +49.30.644 99 444 {languageTranslation("FAX")}: +49.30. 644 99 445 </Text>
          <Text style={styles.footertext}>{languageTranslation("SUPERVISORY_AUTHORITY")}, {languageTranslation("TEL")}: 0431 709 1010 </Text>
          <Text style={styles.footertext}>{languageTranslation("ENTRY_IN_COMMERCIAL_REGISTER")} </Text>
          <Text style={styles.footertext}>{languageTranslation("REGISTER_NUMBER_PDF")} </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TerminationAgreementPdf;