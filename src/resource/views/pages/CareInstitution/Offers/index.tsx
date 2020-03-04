import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Col,
  Row,
} from "reactstrap";
import { languageTranslation, errorFormatter } from "../../../../../helpers";
import '../careinstitution.scss';
// import SearchPopup from "./SearchPopup";
import {
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
  const [negativeUsersList, setNegativeUsersList] = useState<any>([]);
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
  const [GET_CAREGIVERS, , , , , , , GET_NEGATIVE_USERS_LIST] = CareGiverQueries;
  let { id } = useParams();
  let userId: any | undefined = id;
  const [caregiverOptions, setCaregiverOptions] = useState<any>([]);
  // get care institution lists
  const [fetchCaregiverList, { data: caregiver, refetch }] = useLazyQuery<any>(GET_CAREGIVERS);

  // to get list of care institution
  useEffect(() => {
    fetchCaregiverList({
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
    if (caregiver && caregiver.getCaregivers && caregiver.getCaregivers.result && !caregiverOptions.length) {
      caregiver.getCaregivers.result.filter(
        (item: any) =>
          negativeUsersList.findIndex((ele: any) => ele.id === item.id) < 0
      );
      let temp: any = [];
      temp.push({
        label: languageTranslation("NAME"),
        value: languageTranslation("ID"),
        // companyName: languageTranslation("COMPANY_NAME")
      });
      caregiver.getCaregivers.result.forEach(
        ({ id, firstName, lastName, caregiver }: any) =>
          temp.push({
            label: `${firstName}${" "}${lastName}`,
            value: id,
            // companyName: caregiver && caregiver.companyName
          })
      );
      setCaregiverOptions(temp);
    }
  }, [caregiver]);

  //add negative user
  const [addNegativeUser] = useMutation<any>(ADD_NEGATIVE_USER, {
    onCompleted() {
      negativeListRefetch();
      toast.dismiss();
      toastId = toast.success(languageTranslation("NEGATIVE_CAREGIVER_ADDED"));
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
      text: languageTranslation("CAREGIVER_ALL_DELETE_MSG")
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
        toast.dismiss();
        toastId = toast.success(languageTranslation("NEGATIVE_CAREGIVER_DELETED"));
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
      text: languageTranslation("CAREGIVER_ONE_DELETE_MSG")
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
        toast.dismiss();
        toastId = toast.success(languageTranslation("NEGATIVE_CAREGIVER_DELETED"));
      } catch (error) {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };

  return (
    <div className="common-offer-section">
      <h5 className="content-title">{languageTranslation("OFFERS")}</h5>
      <Row className="common-offer-row custom-col">
        <Col md={6}>
          <NegativeList
            negativeUser={negativeUser}
            handleRemoveAll={handleRemoveAll}
            caregiverOptions={caregiverOptions}
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
    </div>
  );
};

export default Offer;
