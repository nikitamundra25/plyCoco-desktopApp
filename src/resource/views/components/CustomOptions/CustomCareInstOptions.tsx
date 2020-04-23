import React, { FunctionComponent } from 'react';
import { languageTranslation } from '../../../../helpers';

const CareInstCustomOption: FunctionComponent = (props: any) => {
  console.log(props,'in custom options');
  
  const { data, innerProps, isDisabled, isSelected } = props;
  let style = {
    backgroundColor: data.color,
  };
  return (
    <div
      {...innerProps}
      className={`custom-select-options${
        data.value === languageTranslation('ID') ? ' custom-sticky-head' : ''
      } ${isSelected ? (data.color ? 'text-black' : 'active') : ''}`}
      style={style}
    >
      {!isDisabled ? <><span
        className={`custom-name-option${
          data.value === languageTranslation('ID') ? ' custom-head' : ''
        }`}
      >
        {data.label}
      </span>
      <span
        className={`custom-companyname-option one-line-text${
          data.value === languageTranslation('ID') ? ' custom-head' : ''
        }`}
      >
        {data.companyName}
      </span>
      <span
        className={`custom-id-option text-center${
          data.value === languageTranslation('ID') ? ' custom-head' : ''
        }`}
      >
        {data.value}
      </span></> : 
        // To display search tip
        <span className={'text-center'}>{data.label}</span>
      }
    </div>
  );
};

export default CareInstCustomOption;
