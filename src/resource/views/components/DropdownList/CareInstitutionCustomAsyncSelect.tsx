import React, { FunctionComponent, useEffect } from "react";
import AsyncSelect from "react-select/async";
// import { languageTranslation } from "../../../../helpers";
import CareInstCustomOption from "../CustomOptions/CustomCareInstOptions";
import { debounce } from "lodash";
import { CareInstitutionQueries } from "../../../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import { languageTranslation } from "../../../../helpers";
import { IReactSelectInterface } from "../../../../interfaces";
import { CareInstInActiveAttrId, deactivatedListColor, CareInstTIMyoCYAttrId, leasingListColor, CareInstPlycocoAttrId, selfEmployesListColor, client } from "../../../../config";

const [
  GET_CARE_INSTITUTION_LIST,
  ,
  ,
  ,
  ,
  ,
] = CareInstitutionQueries;

let callbackFunc:any = null

const CareinstitutionCustomAsyncList: FunctionComponent<any> = (props: any) => {
  const {
    // careInstitutionList,
    // handleLoadMoreCanstitution,
    placeholderLabel
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
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    fetchCareInstitutionList({
      variables: {
        searchBy: null,
        sortBy: 5,
        limit: 50,
        page: 1,
        isActive: '',
      },
    });
  }, []);
  
    // set careInstitution list options
    const careInstitutionOptions: IReactSelectInterface[] | undefined = [];
    const formattedOPtions = (queryData:any) => {
      if (queryData && queryData.getCareInstitutions) {
        const { getCareInstitutions } = queryData;
        const { careInstitutionData, canstitution } = getCareInstitutions;
        console.log(careInstitutionData,'careInstitutionData');
        
        careInstitutionOptions.push({
          label: languageTranslation('NAME'),
          value: languageTranslation('ID'),
          companyName: languageTranslation('COMPANY_NAME'),
        });
    
        careInstitutionData.map((data: any, index: any) => {
          const { canstitution } = data;
          let { attributes = [], companyName = "", shortName = "" } = canstitution
            ? canstitution
            : {};
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
        return careInstitutionOptions
      }else{
        return []
      }
    }
    formattedOPtions(careInstituition);

  //   useEffect(() => {
  //     console.log(callbackFunc,'callbackFunc');
  //     if (callbackFunc && careInstituition && careInstituition.getCareInstitutions) {
  //       console.log(formattedOPtions(),'formattedOPtions(666)',careInstituition)
  //       callbackFunc([])
  //     }
  // },[careInstituition]);

  const handleLoadMoreCanstitution = async(input: string,callback:any) => {
    const {data} = await client.query({query:GET_CARE_INSTITUTION_LIST, variables:
      {
        searchBy: input ? input : "",
        sortBy: 5,
        limit: 50,
        page: 1,
        isActive: "",
      }
    });
    const { getCareInstitutions } = data;
    const { careInstitutionData } = getCareInstitutions;
    console.log(careInstitutionData,'careInstitutionData');
    careInstitutionOptions.push({
      label: languageTranslation('NAME'),
      value: languageTranslation('ID'),
      companyName: languageTranslation('COMPANY_NAME'),
    });
    let options:any[] = []
    careInstitutionData.map((data: any, index: any) => {
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
      return true;
    });
        // return careInstitutionOptions
    return callback(options)
  }
  
  let getOptions =  (inputValue: any, callback: any) => {
    // callbackFunc = callback;
    if (!inputValue) {
      return callback([]);
    }
    handleLoadMoreCanstitution(inputValue, callback);
    
    // return callback(careInstitutionOptions);
  };

  return (
    <>
      <AsyncSelect
        isClearable
        cacheOptions
        value={props.value}
        defaultOptions={careInstitutionOptions}
        loadOptions={debounce(getOptions, 1000)}
        onChange={props.onChange}
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

export default CareinstitutionCustomAsyncList;