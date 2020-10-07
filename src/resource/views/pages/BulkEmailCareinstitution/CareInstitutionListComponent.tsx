import React, { FunctionComponent } from "react";
import { Col, Table } from "reactstrap";
import { ICareGiverListComponentProps } from "../../../../interfaces";
import Loader from "../../containers/Loader/Loader";
import { languageTranslation } from "../../../../helpers";
import InfiniteScroll from "react-infinite-scroll-component";

export const CareInstitutionListComponent: FunctionComponent<
  ICareGiverListComponentProps & any
> = (props: ICareGiverListComponentProps & any) => {
  const {
    careInstitutions,
    handleSelectAll,
    loading,
    selectedCareGiver,
    handleCheckElement,
    handleInfiniteScroll,
    page,
    bulkcareGivers,
    careInstData,
  } = props;

  const handleChecked = (id: string, list:any) => {
    if (selectedCareGiver && selectedCareGiver.length) {
      const found = selectedCareGiver.some(
        (el: any) => parseInt(el) === parseInt(id)
      );
      const e = {
        target: {
          checked: !found,
        },
      };
      handleCheckElement(e, id,list);
    } else {
      const e = {
        target: {
          checked: true,
        },
      };
      handleCheckElement(e, id,list);
    }
  };

  let temp: any = [];
  if (careInstData && careInstData.length) {
    careInstData.map((key: any, index: number) => {
      const {
        firstName = "",
        lastName = "",
        email = "",
        id = "",
        userId = "",
        canstitution = {},
        contacts = [],
      } = key ? key : {};
      const { companyName = "" } = canstitution ? canstitution : {};
      temp.push({
        companyName,
        contactType: languageTranslation("MAIN_CONTACT"),
        name: [lastName, firstName].join(" "),
        email,
        userId,
        id,
      });

      if (contacts && contacts.length) {
        contacts.forEach((item: any) => {
          const {
            firstName = "",
            surName = "",
            email = "",
            contact_type = {},
            id = "",
            userId = "",
          } = item ? item : {};
          temp.push({
            id,
            userId,
            companyName: "",
            contactType:
              contact_type && contact_type.contactType
                ? contact_type.contactType
                : "",
            name:
              firstName && surName
                ? [surName, firstName].join(" ")
                : firstName
                ? firstName
                : surName
                ? surName
                : "",
            email,
          });
        });
      }
    });
  }

  return (
    <Col lg={"6"} className="pr-lg-0">
      <div id="scrollableDiv" className="careinstitution-list custom-scroll">
        <InfiniteScroll
          dataLength={
            careInstData && careInstData.length ? careInstData.length : 0
          } //This is important field to render the next data totalCount
          next={() => {
            handleInfiniteScroll();
          }}
          scrollableTarget="scrollableDiv"
          hasMore={
            props.confirmAppointment || props.unlinkedBy
              ? false
              : props.label !== "appointment"
              ? careInstitutions &&
                careInstitutions.getCareInstitutions &&
                careInstitutions.getCareInstitutions.totalCount
                ? careInstitutions.getCareInstitutions.totalCount !==
                  careInstData.length
                  ? true
                  : false
                : false
              : careInstitutions &&
                careInstitutions.getUserByQualifications &&
                careInstitutions.getUserByQualifications.totalCount
              ? careInstitutions.getUserByQualifications.totalCount !==
                careInstData.length
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
                  {props.label !== "appointment" ? 
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
                        handleSelectAll(e, temp);
                      }}
                    />
                    <label className=""></label>
                  </span>
                  :null}
                </th>
                <th className="">{languageTranslation("MENU_INSTITUTION")}</th>
                <th className="">{languageTranslation("CONTACT")}</th>
                <th>{languageTranslation("NAME")}</th>
                <th className="">{languageTranslation("EMAIL")}</th>
                {/* <th>{languageTranslation('SALUTATION')}</th> */}
              </tr>
            </thead>
            <tbody>
            {page === 1 && loading ? (
                <tr>
                  <td className={"table-loader"} colSpan={8}>
                    <Loader />
                  </td>
                </tr>
              ) : temp && temp.length ? (
                temp.map((item: any, index: number) => {
                  const {
                    companyName = "",
                    contactType = "",
                    name = "",
                    email = "",
                  } = item ? item : {};
                  return (
                    <tr
                      key={index}
                      onClick={(e: any) => {
                        handleChecked(item.id, temp);
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
                              selectedCareGiver.indexOf(parseInt(item.id)) > -1
                                ? true
                                : false
                            }
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleCheckElement(e, item.id,temp);
                            }}
                          />
                          <label className=""></label>
                        </span>
                      </td>
                      <td>{companyName}</td>
                      <td>{contactType}</td>
                      <td>{name}</td>
                      <td>{email}</td>
                      {/* <td>{item.salutation}</td> */}
                    </tr>
                  );
                })
              ) : null}
            </tbody>
          </Table>
        </InfiniteScroll>
      </div>
    </Col>
  );
};
