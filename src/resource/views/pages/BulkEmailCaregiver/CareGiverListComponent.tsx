import React, { FunctionComponent } from "react";
import { Col, Table } from "reactstrap";

import { ICareGiverListComponentProps } from "../../../../interfaces/BulkEmailCaregiver";
import Loader from "../../containers/Loader/Loader";
import { languageTranslation } from "../../../../helpers";

export const CareGiverListComponent: FunctionComponent<ICareGiverListComponentProps> = (
  props: ICareGiverListComponentProps
) => {
  const {
    careGivers,
    handleSelectAll,
    called,
    loading,
    careGiverData,
    selectedCareGiver,
    handleCheckElement
  } = props;
  return (
    <Col lg={"5"}>
      <div className="caregiver-list custom-scroll">
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th className="checkbox-th-column">
                <span className="checkboxli checkbox-custom checkbox-default mr-2">
                  <input
                    type="checkbox"
                    id="checkAll"
                    name="checkbox"
                    className=""
                    checked={
                      careGivers &&
                      careGivers.getCaregivers &&
                      careGivers.getCaregivers.result.length ===
                        selectedCareGiver.length
                        ? true
                        : false
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleSelectAll(e);
                    }}
                  />
                  <label className=""></label>
                </span>
              </th>
              <th>{languageTranslation("NAME")}</th>
              <th>{languageTranslation("EMAIL")}</th>
            </tr>
          </thead>
          <tbody>
            {!called || loading ? (
              <tr>
                <td className={"table-loader"} colSpan={8}>
                  <Loader />
                </td>
              </tr>
            ) : careGiverData && careGiverData.length ? (
              careGiverData.map((careGivers: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      <span className="checkboxli checkbox-custom checkbox-default mr-2">
                        <input
                          type="checkbox"
                          id="check"
                          name="checkbox"
                          className=""
                          checked={
                            selectedCareGiver &&
                            selectedCareGiver.length &&
                            selectedCareGiver.indexOf(parseInt(careGivers.id)) >
                              -1
                              ? true
                              : false
                          }
                          onChange={(e: any) => {
                            handleCheckElement(e, careGivers.id);
                          }}
                        />
                        <label className=""></label>
                      </span>
                    </td>
                    <td>{`${careGivers.firstName} ${careGivers.lastName}`}</td>
                    <td>{careGivers.email}</td>
                  </tr>
                );
              })
            ) : null}
          </tbody>
        </Table>
      </div>
    </Col>
  );
};
