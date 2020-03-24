import React, { useState, useEffect } from "react";
// import Axios from "axios";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PdfDocument } from "./PdfDocument";


export default function LeasingContractPDF() {

  return (
    <div className="container">
      <PDFViewer>
        <PdfDocument />
      </PDFViewer>
      {/* <PDFDownloadLink
        document={
          <PdfDocument />
        }
        fileName="leasing.pdf"
        style={{
          textDecoration: "none",
          padding: "10px",
          color: "#4a4a4a",
          backgroundColor: "#f2f2f2",
          border: "1px solid #4a4a4a"
        }}
      >
        "Download Pdf"
      </PDFDownloadLink>      */}
    </div>
  );
}
