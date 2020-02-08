import React, { FunctionComponent } from 'react';
import { languageTranslation } from '../../../../helpers';

const CustomOption: FunctionComponent = (props: any) => {
  const { data, innerProps } = props;
  let style = {
    backgroundColor: data.color,
  };
  return (
    <div
      {...innerProps}
      className={`custom-select-options ${
        data.value === languageTranslation('ID') ? 'custom-sticky-head' : ''
      }`}
      style={style}
    >
      <span
        className={`custom-name-option ${
          data.value === languageTranslation('ID') ? 'custom-head' : ''
        }`}
      >
        {data.label}
      </span>
      <span
        className={`custom-id-option text-center ${
          data.value === languageTranslation('ID') ? 'custom-head' : ''
        }`}
      >
        {data.value}
      </span>
    </div>
  );
};

export default CustomOption;
