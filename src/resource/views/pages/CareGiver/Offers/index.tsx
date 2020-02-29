import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Col,
  Row,
} from "reactstrap";
import { languageTranslation, errorFormatter } from "../../../../../helpers";
import "../caregiver.scss";
import SearchPopup from "./SearchPopup";
import {
  CareInstitutionQueries,
  CareGiverQueries
} from "../../../../../graphql/queries";
import { CareGiverMutations } from "../../../../../graphql/Mutations";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import { toast } from "react-toastify";
import { ApolloError } from "apollo-client";
import { ConfirmBox } from "../../../components/ConfirmBox";
import NegativeList from "./NegativeList";
import WorkedList from "./WorkedList";
let toastId: any = "";

const Offer: FunctionComponent<RouteComponentProps> = () => {

  const [selectedOption, setSelectedOption] = useState<any>(null);
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
    onCompleted: async () => {
      if (searchValue != null) {
        if (
          careInstituition &&
          careInstituition.getCareInstitutions &&
          careInstituition.getCareInstitutions.careInstitutionData &&
          careInstituition.getCareInstitutions.totalCount > 0
        ) {
          const { value } = await ConfirmBox({
            title: languageTranslation("CONFIRM_LABEL"),
            text: `You want to add ${careInstituition.getCareInstitutions.totalCount} user`
          });
          if (!value) {
            return;
          } else {
            try {
              let temp: any = [];
              careInstituition.getCareInstitutions.careInstitutionData.map(
                (item: any) => {
                  temp.push(parseInt(item.id));
                }
              );
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
            } catch (error) {
              const message = errorFormatter(error);
              if (!toast.isActive(toastId)) {
                toastId = toast.error(message);
              }
            }
            setShowSearch(false);
          }
        } else {
          if (!toast.isActive(toastId)) {
            toastId = toast.error(
              languageTranslation("SEARCH_RECORD_NOT_FOUND")
            );
          }
        }
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
  const [addNegativeUser] = useMutation<any>(ADD_NEGATIVE_USER, {
    onCompleted() {
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
    onCompleted() { }
  });

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
      }))
    );
  }, [negativeUser]);

  //delete negative user mutation
  const [deleteNegativeUser] = useMutation<any>(DELETE_BLACKLIST_USER, {
    onCompleted() {
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
  const handleRemoveAll = async () => {
    const { value } = await ConfirmBox({
      title: languageTranslation("CONFIRM_LABEL"),
      text: languageTranslation("USER_DELETE_MSG")
    });
    if (!value) {
      return;
    } else {
      try {

        let temp: any = [];
        negativeUsersList.map((item: any) => {
          temp.push(parseInt(item.id));
        });

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
    setSearch(value);
  };

  const onSearch = async () => {
    await fetchCareInstitutionList({
      variables: {
        searchBy: searchValue,
        sortBy: 0,
        limit: 0,
        page: 0,
        isActive: ""
      }
    });
    refetch();
  };

  return (
    <div className="common-offer-section">
      <h5 className="content-title">{languageTranslation("OFFERS")}</h5>
      <Row className="common-offer-row custom-col">
        <Col md={6}>
          <NegativeList
            negativeUser={negativeUser}
            handleRemoveAll={handleRemoveAll}
            careInstOptions={careInstOptions}
            setShowSearch={setShowSearch}
            onDeleteNegativeUser={onDeleteNegativeUser}
            handleSelect={handleSelect}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </Col>
        <Col md={6}>
          <WorkedList />
        </Col>
      </Row>
      <SearchPopup
        show={showSearch ? true : false}
        handleClose={() => {
          setShowSearch(false);
          setSearch(null);
        }}
        handleChange={handleChange}
        onSearch={onSearch}
        searchValue={searchValue}
      />
    </div>
  );
};

export default Offer;
