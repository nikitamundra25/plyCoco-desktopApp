import React, { FunctionComponent, useState, useEffect } from "react";
import {
  FormGroup,
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";
import Select from "react-select";
import { languageTranslation, errorFormatter } from "../../../../../helpers";
import { State } from "../../../../../config";
import "../caregiver.scss";
import positive from "../../../../assets/img/positive.svg";
import negative from "../../../../assets/img/negative.svg";
import SearchPopup from "./SearchPopup";
import {
  CareInstitutionQueries,
  CareGiverQueries
} from "../../../../../graphql/queries";
import { CareGiverMutations } from "../../../../../graphql/Mutations";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import CareInstCustomOption from "../../../components/CustomOptions/CustomCareInstOptions";
import { toast } from "react-toastify";
import { ApolloError } from "apollo-client";
import { ConfirmBox } from "../../../components/ConfirmBox";
let toastId: any = "";

const Offer: FunctionComponent = any => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [negativeUsersList, setNegativeUsersList] = useState<any>([]);
  const [searchValue, setSearch] = useState<any>(null);
  const [GET_CARE_INSTITUTION_LIST] = CareInstitutionQueries;
  const [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ADD_NEGATIVE_USER,
    DELETE_BLACKLIST_USER
  ] = CareGiverMutations;
  const [, , , , , , , GET_NEGATIVE_USERS_LIST] = CareGiverQueries;
  let { id } = useParams();
  let userId: any | undefined = id;
  const [careInstOptions, setCareInstOptions] = useState<any>([]);
  // get care institution lists
  const [
    fetchCareInstitutionList,
    { data: careInstituition, refetch }
  ] = useLazyQuery<any>(GET_CARE_INSTITUTION_LIST, {
    onCompleted: async ({ fetchCareInstitutionList }) => {
      if (searchValue != null) {
        if (
          careInstituition &&
          careInstituition.getCareInstitutions &&
          careInstituition.getCareInstitutions.careInstitutionData &&
          careInstituition.getCareInstitutions.totalCount > 0
        ) {
          let temp: any = [];
          careInstituition.getCareInstitutions.careInstitutionData.map(
            (item: any) => {
              temp.push(parseInt(item.id));
            }
          );
          const value = await ConfirmBox({
            title: languageTranslation("CONFIRM_LABEL"),
            text: `You want to add ${careInstituition.getCareInstitutions.totalCount} user`
          });
          if (!value) {
            return;
          } else {
            try {
              await addNegativeUser({
                variables: {
                  id: userId ? parseInt(userId) : "",
                  negativeIds: [
                    ...negativeUsersList.map((list: any) => parseInt(list.id)),
                    ...temp
                  ]
                }
              });
              refetch();
              if (!toast.isActive(toastId)) {
                toastId = toast.success(
                  languageTranslation("NEGATIVE_USER_DELETED")
                );
              }
            } catch (error) {
              const message = errorFormatter(error);
              if (!toast.isActive(toastId)) {
                toastId = toast.error(message);
              }
            }
          }
        } else {
          toast.error("no search found");
        }
        setShowSearch(false);
      }
    }
  });

  // to get list of care institution
  useEffect(() => {
    fetchCareInstitutionList({
      variables: {
        searchBy: null,
        sortBy: 3,
        limit: 200,
        page: 1,
        isActive: ""
      }
    });
  }, [userId]);

  // let careInstOptions: any = [];
  useEffect(() => {
    if (
      careInstituition &&
      careInstituition.getCareInstitutions &&
      careInstituition.getCareInstitutions.careInstitutionData &&
      !careInstOptions.length
    ) {
      careInstituition.getCareInstitutions.careInstitutionData.filter(
        (item: any) =>
          negativeUsersList.findIndex((ele: any) => ele.id === item.id) < 0
      );
      let temp: any = [];
      temp.push({
        label: languageTranslation("NAME"),
        value: languageTranslation("ID"),
        companyName: languageTranslation("COMPANY_NAME")
      });
      careInstituition.getCareInstitutions.careInstitutionData.forEach(
        ({ id, firstName, lastName, canstitution }: any) =>
          temp.push({
            label: `${firstName}${" "}${lastName}`,
            value: id,
            companyName: canstitution && canstitution.companyName
          })
      );
      setCareInstOptions(temp);
    }
  }, [careInstituition]);

  //add negative user
  const [addNegativeUser, { loading: addNegativeUserLoading }] = useMutation<
    any
  >(ADD_NEGATIVE_USER, {
    onCompleted({ addNegativeUser }) {
      console.log("in add careInstOptions", careInstOptions);
      negativeListRefetch();
      if (!toast.isActive(toastId)) {
        toastId = toast.success(languageTranslation("NEGATIVE_USER_ADDED"));
      }
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });

  //get negative users list
  const [
    fetchNegativeUserList,
    { data: negativeUser, refetch: negativeListRefetch }
  ] = useLazyQuery<any>(GET_NEGATIVE_USERS_LIST, {
    onCompleted({ getNegativeList }) {
      // console.log('negativeUser in oncomplete', getNegativeList.negativeList);
      // console.log('careInstOptions in oncomplete', careInstOptions);
      // const myArray = getNegativeList.negativeList;
      // const filteredArray = careInstOptions.filter(
      //   (item: any) =>
      //     myArray.findIndex((ele: any) => ele.id === item.value) < 0
      // );
      // setCareInstOptions(filteredArray.length === 1 ? [] : filteredArray);
      // console.log('filteredArray', filteredArray);
    }
  });

  useEffect(() => {
    console.log("negativeUserslistbvfgf", negativeUsersList);
    console.log("careinstopt bdf", careInstOptions);

    // const myArray = [...negativeUsersList];
    // const filteredArray = careInstOptions.filter(
    //   (item: any) => myArray.findIndex((ele: any) => ele.id === item.value) < 0
    // );
    setCareInstOptions((prevArray: any) =>
      prevArray.filter(
        (item: any) =>
          negativeUsersList.findIndex((ele: any) => ele.id === item.value) < 0
      )
    );
    // console.log('filteredArray', filteredArray);
  }, [negativeUsersList]);

  useEffect(() => {
    fetchNegativeUserList({
      variables: {
        id: userId ? parseInt(userId) : ""
      }
    });
    const { getNegativeList = {} } = negativeUser ? negativeUser : {};
    const { negativeList = [] } = getNegativeList ? getNegativeList : {};
    //alraedy added user
    setNegativeUsersList(
      negativeList.map((list: any) => ({
        id: list.id,
        firstName: list.firstName,
        lastname: list.lastName
        // companyName: list.companyName
      }))
    );
  }, [negativeUser]);
  //delete negative user mutation
  const [
    deleteNegativeUser,
    { loading: deleteNegativeUserLoading }
  ] = useMutation<any>(DELETE_BLACKLIST_USER, {
    onCompleted({ deleteNegativeUser }) {
      negativeListRefetch();
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });

  //on selecting care insitution from drop down
  const handleSelect = (careInstId: any) => {
    console.log("careInstId in handle", careInstId);
    const temp = careInstOptions.splice(
      careInstOptions.findIndex(function(i: any) {
        return i.value === careInstId.value;
      }),
      1
    );
    setCareInstOptions(careInstOptions);
    console.log("temp", temp);
    console.log("careInstOptions", careInstOptions);

    if (careInstId && careInstId.value) {
      addNegativeUser({
        variables: {
          id: userId ? parseInt(userId) : "",
          negativeIds: careInstId
            ? [
                ...negativeUsersList.map((list: any) => parseInt(list.id)),
                parseInt(careInstId.value)
              ]
            : null
        }
      });
    }
    setNegativeUsersList(careInstId);
  };
  //remove all
  const handleRemoveAll = async (careInstId: any) => {
    let temp: any = [];
    negativeUsersList.map((item: any) => {
      temp.push(parseInt(item.id));
    });
    console.log("stemp", temp);

    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("USER_DELETE_MSG")
    });
    if (!value) {
      return;
    } else {
      try {
        await deleteNegativeUser({
          variables: {
            id: userId ? userId : "",
            negativeIds: temp
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(languageTranslation("NEGATIVE_USER_DELETED"));
        }
      } catch (error) {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  // deleting nagative User
  const onDeleteNegativeUser = async (careInstId: string) => {
    const temp = negativeUsersList.findIndex(function(i: any) {
      return i.id === careInstId;
    });
    console.log("temp in careopt", temp);
    const rec = careInstOptions[temp];
    // console.log(rec, 'rec');

    // let tempVar: any = [];
    //   careInstituition.getCareInstitutions.careInstitutionData.forEach(
    //   ({ id, firstName, lastName, canstitution }: any) =>
    //     tempVar.push({
    //       label: `${firstName}${' '}${lastName}`,
    //       value: id,
    //       companyName: canstitution && canstitution.companyName
    //     })
    // );
    setCareInstOptions((prevArray: any) => [
      ...prevArray,
      careInstOptions[temp]
    ]);

    // const temp1=careInstOptions.push()
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("USER_DELETE_MSG")
    });
    if (!value) {
      return;
    } else {
      try {
        await deleteNegativeUser({
          variables: {
            id: userId ? userId : "",
            negativeIds: [careInstId ? parseInt(careInstId) : ""]
          }
        });
        refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(languageTranslation("NEGATIVE_USER_DELETED"));
        }
      } catch (error) {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    console.log("searchValue", value);
    setSearch(value);
  };
  const onSearch = async () => {
    fetchCareInstitutionList({
      variables: {
        searchBy: searchValue,
        sortBy: 0,
        limit: 0,
        page: 0,
        isActive: ""
      }
    });
  };

  return (
    <div className="common-offer-section">
      <h5 className="content-title">{languageTranslation("OFFERS")}</h5>
      <Row className="common-offer-row custom-col">
        <Col md={6}>
          <div className="common-list-wrap">
            <div className="common-list-header d-flex align-items-center justify-content-between">
              <div className="common-list-title ">
                {languageTranslation("NO_OFFER_FOR")}{" "}
                <span className="font-weight-bold">
                  ({languageTranslation("NEGATIVE")})
                </span>
              </div>
              <div>
                <UncontrolledDropdown className="custom-dropdown">
                  <DropdownToggle
                    className={"text-capitalize btn-more"}
                    size="sm"
                  >
                    <i className="icon-options-vertical" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => setShowSearch(true)}>
                      <i className="fa fa-plus mr-2" />
                      {languageTranslation("ADD_ALL_KEYWORD")}
                    </DropdownItem>
                    <DropdownItem>
                      <i className="fa fa-plus mr-2" />
                      {languageTranslation("ADD_ALL_LEASING_FACILITY")}
                    </DropdownItem>
                    <DropdownItem>
                      <span
                        onClick={() => handleRemoveAll(careInstOptions.value)}
                      >
                        <i className="fa fa-trash mr-2" />
                        {languageTranslation("REMOVE_ALL")}
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
            <div className="common-list-body">
              <ul className="common-list list-unstyled">
                {negativeUser &&
                negativeUser.getNegativeList &&
                negativeUser.getNegativeList.negativeList
                  ? negativeUser.getNegativeList.negativeList.map(
                      (item: any, index: number) => {
                        return (
                          <li
                            key={index}
                            className={
                              "cursor-pointer list-item text-capitalize active"
                            }
                          >
                            <div className="list-item-text">
                              {item && item.firstName + " " + item.lastName}
                            </div>
                            <div className="list-item-icon">
                              <span
                                id={`delete${index}`}
                                className={`btn-icon mr-2`}
                                onClick={() => onDeleteNegativeUser(item.id)}
                              >
                                <UncontrolledTooltip
                                  placement={"top"}
                                  target={`delete${index}`}
                                >
                                  {languageTranslation("DELETE_USER")}
                                </UncontrolledTooltip>

                                <i className="fa fa-trash"></i>
                              </span>
                            </div>
                          </li>
                        );
                      }
                    )
                  : null}
              </ul>
            </div>
            <div className="common-list-footer form-section ">
              <FormGroup className="mb-0">
                <Select
                  placeholder={"Select Care Institution"}
                  options={careInstOptions}
                  menuPlacement={"top"}
                  className="attribute-select"
                  classNamePrefix="attribute-inner-select"
                  onChange={selectedOption => {
                    console.log("careInstOptions.id", selectedOption);
                    handleSelect(selectedOption);
                  }}
                  components={{ Option: CareInstCustomOption }}
                  isOptionDisabled={option =>
                    option.value === languageTranslation("ID")
                  }
                />
              </FormGroup>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="common-list-wrap">
            <div className="common-list-header d-flex align-items-center justify-content-between">
              <div className="common-list-title ">
                {languageTranslation("WORKED_AT")}
              </div>
              <div>
                <UncontrolledDropdown className="custom-dropdown">
                  <DropdownToggle
                    className={"text-capitalize btn-more"}
                    size="sm"
                  >
                    <i className="icon-options-vertical" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <img src={positive} className="mr-2" alt="" />
                      <span className="align-middle">
                        {languageTranslation("ADD_ALL_POSITIVE_LIST")}
                      </span>
                    </DropdownItem>
                    <DropdownItem>
                      <img src={negative} className="mr-2" alt="" />
                      <span className="align-middle">
                        {languageTranslation("ADD_ALL_NEGATIVE_LIST")}
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
            <div className="common-list-body">
              <ul className="common-list list-unstyled">
                <li className={"cursor-pointer list-item text-capitalize "}>
                  <div className="list-item-text">Dialysis</div>
                  <div className="list-item-icon d-flex">
                    <div className="list-item-img mr-2">
                      <img src={positive} alt="" />
                    </div>
                    <div className="list-item-img">
                      <img src={negative} alt="" />{" "}
                    </div>
                  </div>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <div className="list-item-text">Nurse/carer</div>
                  <div className="list-item-icon d-flex">
                    <div className="list-item-img mr-2">
                      <img src={positive} alt="" />
                    </div>
                    <div className="list-item-img">
                      <img src={negative} alt="" />{" "}
                    </div>
                  </div>
                </li>
                <li className={"cursor-pointer list-item text-capitalize"}>
                  <div className="list-item-text">Home Management</div>
                  <div className="list-item-icon d-flex">
                    <div className="list-item-img mr-2">
                      <img src={positive} alt="" />
                    </div>
                    <div className="list-item-img">
                      <img src={negative} alt="" />{" "}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="common-list-footer form-section ">
              <FormGroup className="mb-0">
                <Select
                  placeholder={languageTranslation("REGION", "STATE")}
                  options={State}
                  menuPlacement={"top"}
                  className="attribute-select"
                  classNamePrefix="attribute-inner-select"
                />
              </FormGroup>
            </div>
          </div>
        </Col>
      </Row>
      <SearchPopup
        show={showSearch ? true : false}
        handleClose={() => setShowSearch(false)}
        handleChange={handleChange}
        onSearch={onSearch}
        searchValue={searchValue}
      />
    </div>
  );
};

export default Offer;
