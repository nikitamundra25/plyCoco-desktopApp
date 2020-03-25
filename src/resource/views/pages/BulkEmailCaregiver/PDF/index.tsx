import React, { PureComponent } from 'react';
import { IPDFProps, IPDFStates } from './interface';
import MyDocument from './MyDocument';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'

class PDF extends PureComponent<IPDFProps, IPDFStates> {


  render() {
    return (
      <PDFViewer width="100%" height="600">
        <MyDocument />
      </PDFViewer>
      // 	<PDFDownloadLink
      // 		document={
      // 			<MyDocument />
      // 		}
      // 		fileName="leasing.pdf"
      // 		style={{
      // 			textDecoration: "none",
      // 			padding: "10px",
      // 			color: "#4a4a4a",
      // 			backgroundColor: "#f2f2f2",
      // 			border: "1px solid #4a4a4a"
      // 		}}
      // 	>
      // 		"Download Pdf"
      // </PDFDownloadLink>
    )
  }
}

export default PDF;
