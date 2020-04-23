import React, { FunctionComponent, useEffect } from "react";
import AsyncSelect from "react-select/async";
// import { languageTranslation } from "../../../../helpers";
import CareInstCustomOption from "../CustomOptions/CustomCareInstOptions";
import { debounce } from "lodash";
import { CareGiverQueries } from "../../../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { languageTranslation } from "../../../../helpers";
import { IReactSelectInterface } from "../../../../interfaces";
import {
  CareInstInActiveAttrId,
  deactivatedListColor,
  CareInstTIMyoCYAttrId,
  leasingListColor,
  CareInstPlycocoAttrId,
  selfEmployesListColor,
  client,
  CaregiverTIMyoCYAttrId,
  ASYNC_LIST_LIMIT,
} from "../../../../config";
import CustomOption from "../CustomOptions";

const [, , , , , , , , GET_CAREGIVER_BY_NAME] = CareGiverQueries;

let callbackFunc: any = null;

const CaregiverCustomAsyncList: FunctionComponent<any> = (props: any) => {
  const {
    // careInstitutionList,
    // handleLoadMoreCanstitution,
    placeholderLabel,
  } = props;

  const handleChange = (selectedOption: any) => {
    if (props.actionOnSelectedOption) {
      props.actionOnSelectedOption(selectedOption.value);
    }
  };

  // To fetch the list of all caregiver
  const [
    fetchCareGivers,
    { data: careGivers, refetch: refetchCaregivers },
  ] = useLazyQuery<any>(GET_CAREGIVER_BY_NAME, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    // Fetch list of caregivers
    fetchCareGivers({
      variables: {
        searchBy: "",
        limit: ASYNC_LIST_LIMIT,
        page: 1,
      },
    });
  }, []);

  // set careInstitution list options
  const careGiversOptions: IReactSelectInterface[] | undefined = [];
  const formattedOPtions = (queryData: any) => {
    if (
      queryData &&
      queryData.getCaregiverByName &&
      queryData.getCaregiverByName.result
    ) {
      const { getCaregiverByName } = queryData;
      const { result,totalCount } = getCaregiverByName;

      careGiversOptions.push({
        label: languageTranslation("NAME"),
        value: languageTranslation("ID"),
        color: "",
      });

      result.forEach(
        ({ id, firstName, lastName, isActive, caregiver }: any) => {
          let { attributes = [] } = caregiver ? caregiver : {};
          // To check null values
          attributes = attributes ? attributes : [];
          careGiversOptions.push({
            label: `${lastName}${" "}${firstName}`,
            value: id,
            color: !isActive
              ? deactivatedListColor
              : attributes.includes(CaregiverTIMyoCYAttrId)
              ? leasingListColor
              : attributes.includes("Plycoco")
              ? selfEmployesListColor
              : "",
          });
          return true;
        }
      );
      if (totalCount > ASYNC_LIST_LIMIT) {
        careGiversOptions.push({
          label: languageTranslation('SEARCH_TIP'),
          value: "",
          color: "",
          isDisabled:true
        });
      }
      return careGiversOptions;
    } else {
      return [];
    }
  };
  formattedOPtions(careGivers);

  const handleLoadMoreCaregiver = async (input: string, callback: any) => {
    console.log("input", input);
    const { data } = await client.query({
      query: GET_CAREGIVER_BY_NAME,
      variables: {
        searchBy: input ? input : "",
        limit: ASYNC_LIST_LIMIT,
        page: 1,
      },
    });
    console.log("data", data);

    const { getCaregiverByName } = data;
    const { result, totalCount } = getCaregiverByName;

    careGiversOptions.push({
      label: languageTranslation("NAME"),
      value: languageTranslation("ID"),
      color: "",
    });

    let options: any[] = [];
    result.forEach(({ id, firstName, lastName, isActive, caregiver }: any) => {
      let { attributes = [] } = caregiver ? caregiver : {};
      // To check null values
      attributes = attributes ? attributes : [];
      options.push({
        label: `${lastName}${" "}${firstName}`,
        value: id,
        color: !isActive
          ? deactivatedListColor
          : attributes.includes(CaregiverTIMyoCYAttrId)
          ? leasingListColor
          : attributes.includes("Plycoco")
          ? selfEmployesListColor
          : "",
      });
    });
    if (totalCount > ASYNC_LIST_LIMIT) {
        careGiversOptions.push({
            label: languageTranslation('SEARCH_TIP'),
            value: "",
            color: "",
            isDisabled:true
          });
      }
    // return careInstitutionOptions
    return callback(options);
  };

  let getOptions = (inputValue: any, callback: any) => {
    // callbackFunc = callback;
    if (!inputValue) {
      return callback([]);
    }
    handleLoadMoreCaregiver(inputValue, callback);

    // return callback(careInstitutionOptions);
  };

  return (
    <>
      <AsyncSelect
        isClearable
        cacheOptions
        value={props.value}
        defaultOptions={careGiversOptions}
        loadOptions={debounce(getOptions, 1000)}
        onChange={props.onChange}
        placeholder={placeholderLabel}
        classNamePrefix="custom-inner-reactselect"
        className={
              "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
        }
        components={{ Option: CustomOption }}
      />
    </>
  );
};

export default CaregiverCustomAsyncList;
