import React from "react";
import { Spinner as BSSpinner } from "reactstrap";
const Spinner = () => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
    }}>
    <BSSpinner color='warning' />
  </div>
);

export const MoreSpinner = () => (
  <div
    style={{
      pointerEvents: "none",
      background: "rgba(32, 60, 94, 0.3)",
      position: "absolute",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "5px 15px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
    }}>
    <span
      style={{
        color: "#fff",
        marginRight: "5px",
      }}>
      <BSSpinner color='warning' size='sm' /> Loading More...
    </span>
  </div>
);

export default Spinner;
