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
  CareGiverQueries,
  InvoiceQueries
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
import {
  deactivatedListColor,
  leasingListColor,
  selfEmployesListColor,
} from '../../../../../config';
let toastId: any = "";

const Offer: FunctionComponent<RouteComponentProps> = () => {

  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [negativeUsersList, setNegativeUsersList] = useState<any>([]);
  const [searchValue, setSearch] = useState<any>('');
  const [GET_CARE_INSTITUTION_LIST] = CareInstitutionQueries;
const [GET_INVOICE_LIST] = InvoiceQueries;

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
  const [fetchCareInstitutionList, { data: careInstituition, refetch }] = useLazyQuery<any>(GET_CARE_INSTITUTION_LIST, {
    onCompleted: async () => {
      if (searchValue != '') {
        if (
          careInstituition &&
          careInstituition.getCareInstitutions &&
          careInstituition.getCareInstitutions.careInstitutionData &&
          careInstituition.getCareInstitutions.totalCount > 0
        ) {
          const { value } = await ConfirmBox({
            title: languageTranslation("CONFIRM_LABEL"),
            text: `You want to add ${careInstituition.getCareInstitutions.totalCount} care institution`
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
            setSearch('');
          }
        } else {
          toast.dismiss();
          toastId = toast.error(
            languageTranslation("SEARCH_RECORD_NOT_FOUND")
          );
        }
      }
    }
  });


    // To fetch workedAt list
    const [
      fetchInvoiceList,
      { data: workedAtList, loading: workedAtListLoading },
    ] = useLazyQuery<any, any>(GET_INVOICE_LIST, {
      fetchPolicy: "no-cache",
      // notifyOnNetworkStatusChange: true
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
    fetchInvoiceList({
      variables: {
        searchBy: null,
        caregiverId:userId,
        careInstitutionId: null,
        divisionId: null,
        startDate:  null,
        endDate: null,
        limit: 100000,
        page: 1,
      },
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
        ({ id, firstName, lastName, canstitution, isActive }: any) => {
          let attributes: any = [];
          if (canstitution) {
            attributes = canstitution.attributes;
            if (!attributes) {
              attributes = [];
            }
          }
          temp.push({
            label: `${lastName}${" "}${firstName}`,
            value: id,
            color: !isActive
              ? deactivatedListColor
              : attributes.includes('TIMyoCY')
                ? leasingListColor
                : attributes.includes('Plycoco')
                  ? selfEmployesListColor
                  : '',
            companyName: canstitution && canstitution.companyName
          })
        }
      );
      setCareInstOptions(temp);
    }
  }, [careInstituition]);

  //add negative user
  const [addNegativeUser] = useMutation<any>(ADD_NEGATIVE_USER, {
    onCompleted() {
      negativeListRefetch();
      toast.dismiss();
      toastId = toast.success(languageTranslation("NEGATIVE_CAREINSTITUTION_ADDED"));
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

 
  }, [negativeUser, userId]);

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

  const addToNegativeList = (id: any) => {
    if (id) {
      addNegativeUser({
        variables: {
          id: userId ? parseInt(userId) : "",
          negativeIds: id
            ? [
              ...negativeUsersList.map((list: any) => parseInt(list.id)),
              parseInt(id)
            ]
            : null
        }
      });
    }
  };

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
      text: languageTranslation("CAREINSTITUTION_ALL_DELETE_MSG")
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
        toastId = toast.success(languageTranslation("NEGATIVE_CAREINSTITUTION_DELETED"));
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
      text: languageTranslation("CAREINSTITUTION_ONE_DELETE_MSG")
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
        toastId = toast.success(languageTranslation("NEGATIVE_CAREINSTITUTION_DELETED"));
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
          <WorkedList 
          workedAtList = {workedAtList && workedAtList.getAllAppointment && workedAtList.getAllAppointment.result && workedAtList.getAllAppointment.result.length ? workedAtList.getAllAppointment.result : []}
          workedAtListLoading ={workedAtListLoading}
          addToNegativeList={addToNegativeList}
          />
        </Col>
      </Row>
      <SearchPopup
        show={showSearch ? true : false}
        handleClose={() => {
          setShowSearch(false);
          setSearch('');
        }}
        handleChange={handleChange}
        onSearch={onSearch}
        searchValue={searchValue}
      />
    </div>
  );
};

export default Offer;
