import React, { FunctionComponent } from 'react';

const CustomOption: FunctionComponent = (props: any) => {
  const { data, innerProps } = props;
  let style = {
    backgroundColor: data.color,
  };
  return (
    <div {...innerProps} className='custom-select-options'>
      <span style={style} className='custom-name-option'>
        {data.label}
      </span>
      <span style={style} className='custom-id-option'>
        {data.value}
      </span>
    </div>
  );
};

export default CustomOption;
