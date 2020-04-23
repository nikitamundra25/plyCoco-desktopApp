import React, { FunctionComponent,useState } from "react";
import AsyncSelect from "react-select/async";
import { languageTranslation } from "../../../../helpers";
import CareInstCustomOption from "../CustomOptions/CustomCareInstOptions";

const CareInstitutionDropdownList: FunctionComponent<any> = (props: any) => {
  const {
    careInstitutionList,
    handleLoadMoreCanstitution,
    placeholderLabel,
  } = props;
  const [inputvalue, setinputvalue] = useState<string>("");

  const promiseOptions = (newValue: any, callback: any) => {
    const inputValue = newValue.replace(/\W/g, "");
    console.log("inputValue", inputValue);
    setTimeout(() => {
      callback(handleLoadMoreCanstitution(inputValue));
    }, 1000); 
  };

  const handleInputChange = (newValue: any)=>{
    const inputValue = newValue.replace(/\W/g, '');
    setinputvalue(inputValue)
    // return inputValue;
  }

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions={careInstitutionList}
        loadOptions={promiseOptions}
        onInputChange={handleInputChange}
        placeholder={placeholderLabel}
        classNamePrefix="custom-inner-reactselect"
        className={
          "custom-reactselect custom-reactselect-menu-width-careinstitution-appointment"
        }
        components={{ Option: CareInstCustomOption }}
        isClearable={true}
      />
    </>
  );
};

export default CareInstitutionDropdownList;
