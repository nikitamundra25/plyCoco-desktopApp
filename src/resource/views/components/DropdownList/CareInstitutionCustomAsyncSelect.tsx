import React, { FunctionComponent, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import { useLazyQuery } from "@apollo/react-hooks";
import CareInstCustomOption from "../CustomOptions/CustomCareInstOptions";
import { CareInstitutionQueries } from "../../../../graphql/queries";
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
  ASYNC_LIST_LIMIT,
} from "../../../../config";

const [GET_CARE_INSTITUTION_LIST, , , , , ,] = CareInstitutionQueries;

const CareInstitutionDropdownList: FunctionComponent<any> = (props: any) => {
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

  // To fetch all careinstitution list
  const [fetchCareInstitutionList, { data: careInstituition }] = useLazyQuery<
    any
  >(GET_CARE_INSTITUTION_LIST, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    fetchCareInstitutionList({
      variables: {
        searchBy: null,
        sortBy: 5,
        limit: ASYNC_LIST_LIMIT,
        page: 1,
        isActive: "",
      },
    });
  }, []);

  // set careInstitution list options
  const careInstitutionOptions: IReactSelectInterface[] | undefined = [];
  const formattedOPtions = (queryData: any) => {
    if (queryData && queryData.getCareInstitutions) {
      const { getCareInstitutions } = queryData;
      const { careInstitutionData, totalCount } = getCareInstitutions;
      if (careInstitutionData && careInstitutionData.length) {
        careInstitutionOptions.push({
          label: languageTranslation("SHORT_NAME"),
          value: languageTranslation("ID"),
          companyName: languageTranslation("COMPANY_NAME"),
        });

        careInstitutionData.map((data: any, index: any) => {
          const { canstitution } = data;
          let {
            attributes = [],
            companyName = "",
            shortName = "",
          } = canstitution ? canstitution : {};
          attributes = attributes ? attributes : [];
          careInstitutionOptions.push({
            label: shortName,
            value: data.id,
            color: attributes.includes(CareInstInActiveAttrId)
              ? deactivatedListColor
              : attributes.includes(CareInstTIMyoCYAttrId)
              ? leasingListColor
              : attributes.includes(CareInstPlycocoAttrId)
              ? selfEmployesListColor
              : "",
            companyName,
          });
          return true;
        });
      }
      if (totalCount > ASYNC_LIST_LIMIT) {
        careInstitutionOptions.push({
          label: languageTranslation("SEARCH_TIP"),
          value: "",
          companyName: "",
          isDisabled: true,
        });
      }
      return careInstitutionOptions;
    } else {
      return [];
    }
  };
  formattedOPtions(careInstituition);

  const handleLoadMoreCanstitution = async (input: string, callback: any) => {
    const { data } = await client.query({
      query: GET_CARE_INSTITUTION_LIST,
      variables: {
        searchBy: input ? input : "",
        sortBy: 5,
        limit: ASYNC_LIST_LIMIT,
        page: 1,
        isActive: "",
      },
    });
    const { getCareInstitutions } = data;
    const { careInstitutionData, totalCount } = getCareInstitutions;
    
    //   careInstitutionOptions.push({
    //     label: languageTranslation("SHORT_NAME"),
    //     value: languageTranslation("ID"),
    //     companyName: languageTranslation("COMPANY_NAME"),
    //   });
      let options: any[] = [];
      if(careInstitutionData && careInstitutionData.length){
      options.push({
        label: languageTranslation("SHORT_NAME"),
        value: languageTranslation("ID"),
        companyName: languageTranslation("COMPANY_NAME"),
      });
    }
      careInstitutionData.map((data: any) => {
        const { canstitution } = data;
        let { attributes = [], companyName = "", shortName = "" } = canstitution
          ? canstitution
          : {};
        attributes = attributes ? attributes : [];
        options.push({
          label: shortName,
          value: data.id,
          color: attributes.includes(CareInstInActiveAttrId)
            ? deactivatedListColor
            : attributes.includes(CareInstTIMyoCYAttrId)
            ? leasingListColor
            : attributes.includes(CareInstPlycocoAttrId)
            ? selfEmployesListColor
            : "",
          companyName,
        });
        // return true;
      });
      if (totalCount > ASYNC_LIST_LIMIT) {
        options.push({
          label: languageTranslation("SEARCH_TIP"),
          value: "",
          companyName: "",
          isDisabled: true,
        });
      }
      return callback(options);
  };

  let getOptions = (inputValue: any, callback: any) => {
    if (!inputValue) {
      return callback([]);
    }
    handleLoadMoreCanstitution(inputValue, callback);
  };

  return (
    <>
      <AsyncSelect
        isClearable
        cacheOptions
        value={props.value}
        defaultOptions={careInstitutionOptions}
        loadOptions={debounce(getOptions, 1000)}
        onChange={(e: any) => {
          if ((e && e.label !== languageTranslation("SHORT_NAME") && e.value !== languageTranslation("COMPANY_NAME") && e.label !== languageTranslation("ID")) || e === null) {
            props.onChange(e)
          }
        }}
        placeholder={placeholderLabel}
        classNamePrefix="custom-inner-reactselect"
        className={
          "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
        }
        components={{ Option: CareInstCustomOption }}
      />
    </>
  );
};

export default CareInstitutionDropdownList;
