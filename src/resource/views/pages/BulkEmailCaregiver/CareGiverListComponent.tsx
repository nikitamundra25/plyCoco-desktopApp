import React, { FunctionComponent } from "react";
import { Col, Table } from "reactstrap";
import { ICareGiverListComponentProps } from "../../../../interfaces";
import Loader from "../../containers/Loader/Loader";
import { languageTranslation } from "../../../../helpers";
import InfiniteScroll from "react-infinite-scroll-component";

export const CareGiverListComponent: FunctionComponent<
  ICareGiverListComponentProps & any
> = (props: ICareGiverListComponentProps & any) => {
  const {
    careGivers,
    handleSelectAll,
    called,
    loading,
    careGiverData,
    selectedCareGiver,
    handleCheckElement,
    handleInfiniteScroll,
    page,
    bulkcareGivers,
    terminateAggrement,
    label,
  } = props;

  const handleChecked = (id: string) => {
    if (selectedCareGiver && selectedCareGiver.length) {
      const found = selectedCareGiver.some(
        (el: any) => parseInt(el) === parseInt(id)
      );
      const e = {
        target: {
          checked: !found,
        },
      };
      handleCheckElement(e, id);
    } else {
      const e = {
        target: {
          checked: true,
        },
      };
      handleCheckElement(e, id);
    }
  };

  
  return (
    <Col lg={"5"} className="pr-lg-0">
      <div id="scrollableDivCareGiver" className="caregiver-list custom-scroll">
        <InfiniteScroll
          dataLength={
            careGiverData && careGiverData.length ? careGiverData.length : 0
          } //This is important field to render the next data totalCount
          next={() => {
             handleInfiniteScroll();
          }}
          scrollableTarget="scrollableDivCareGiver"
          hasMore={
            props.confirmApp ||
            props.unlinkedBy ||
            props.isFromUnlink ||
            props.offerRequirements ||
            terminateAggrement
              ? false
              : props.label !== "appointment"
              ? careGivers &&
                careGivers.getCaregivers &&
                careGivers.getCaregivers.totalCount
                ? careGivers.getCaregivers.totalCount !== careGiverData.length
                  ? true
                  : false
                : false
              : careGivers &&
                careGivers.getUserByQualifications &&
                careGivers.getUserByQualifications.totalCount
              ? careGivers.getUserByQualifications.totalCount !==
                careGiverData.length
                ? true
                : false
              : false
          }
          loader={
            <div className="infinite-loader">
              <Loader />
            </div>
          }
        >
          <Table bordered hover responsive className="mb-0">
            <thead className="thead-bg">
              <tr>
                <th className="checkbox-th-column">
                  <span className=" checkbox-custom ">
                    <input
                      type="checkbox"
                      id="checkAll"
                      name="checkbox"
                      className=""
                      checked={
                        bulkcareGivers ? true : false
                        // careGivers &&
                        // careGivers.getCaregivers &&
                        // careGivers.getCaregivers.result.length ===
                        //   selectedCareGiver.length
                        //   ? true
                        //   : false
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
              {page === 1 && (!called || loading) &&  !props.isFromUnlink ? (
                <tr>
                  <td className={"table-loader"} colSpan={8}>
                     <Loader />  
                  </td>
                </tr>
              ) : careGiverData && careGiverData.length ? (
                careGiverData.map((careGivers: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      onClick={(e: any) => {
                        handleChecked(careGivers.id);
                      }}
                      className="cursor-pointer"
                    >
                      <td>
                        <span className=" checkbox-custom  ">
                          <input
                            type="checkbox"
                            id="check"
                            name="checkbox"
                            className=""
                            checked={
                              selectedCareGiver &&
                              selectedCareGiver.length &&
                              selectedCareGiver.indexOf(
                                parseInt(careGivers.id)
                              ) > -1
                                ? true
                                : false
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleCheckElement(e, careGivers.id);
                            }}
                          />
                          <label className=""></label>
                        </span>
                      </td>
                      <td>{`${careGivers.lastName} ${careGivers.firstName}`}</td>
                      <td>{careGivers.email}</td>
                    </tr>
                  );
                })
              ) : label === "appointment" ? (
                <tr className={"text-center no-hover-row"}>
                  <td colSpan={8} className={"pt-5 pb-5"}>
                    <div className="no-data-section">
                      <div className="no-data-icon">
                        <i className="icon-ban" />
                      </div>
                      <h4 className="mb-1">
                        {languageTranslation(
                          "NO_CAREGIVER_AVAILABLE_FOR_OFFER"
                        )}{" "}
                      </h4>
                      <p>
                        {languageTranslation("PLEASE_CHECK_OFFER_ATTRIBUTE")}{" "}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </Table>
        </InfiniteScroll>
      </div>
    </Col>
  );
};
