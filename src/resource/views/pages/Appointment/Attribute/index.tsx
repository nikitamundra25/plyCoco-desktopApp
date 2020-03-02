import React, { useState, useEffect } from 'react';
import AttributeFilterPage from './AttributeFilter';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { IAttributeValues } from '../../../../../interfaces';
import { useQuery } from '@apollo/react-hooks';
const [, , , , , GET_CAREGIVER_ATTRIBUTES] = CareGiverQueries;

const AttributeFilter = (props: any) => {
  const [isPositive, setIsPositive] = useState<any>([]);
  const [isNegative, setIsNegative] = useState<any>([]);
  const { show, handleClose } = props;

  // Fetch attribute list from db
  const { data: attributeData } = useQuery<{
    getCaregiverAtrribute: IAttributeValues[];
  }>(GET_CAREGIVER_ATTRIBUTES);

  // if any element in positive list is checked
  const handleCheckPositiveElement = (e: any, id: number) => {
    const { target } = e;
    const { checked } = target;
    console.log('checked in pos', checked);
    // If any id already exist in positive list then it will be removed from the array
    setIsNegative((prevArray: any) =>
      prevArray.filter((item: any) => item !== id)
    );

    if (checked) {
      let temp: any = [...isPositive];
      temp.push(id);
      setIsPositive(temp);
    } else {
      // to uncheck elements
      setIsPositive((prevArray: any) =>
        prevArray.filter((item: any) => item !== id)
      );
    }
  };

  // if any element in negative list is checked
  const handleCheckNegativeElement = (e: any, id: number) => {
    const { target } = e;
    const { checked } = target;
    console.log('checked in neg', checked);
    // If any id already exist in negative list then it will be removed from the array
    setIsPositive((prevArray: any) =>
      prevArray.filter((item: any) => item !== id)
    );
    console.log('is positive in existing id', isPositive);

    if (checked) {
      let temp: any = [...isNegative];
      temp.push(id);
      setIsNegative(temp);
    } else {
      // to uncheck elements
      setIsNegative((prevArray: any) =>
        prevArray.filter((item: any) => item !== id)
      );
    }
  };
  return (
    <AttributeFilterPage
      show={show}
      attributeData={attributeData}
      handleCheckNegativeElement={handleCheckNegativeElement}
      handleCheckPositiveElement={handleCheckPositiveElement}
      isPositive={isPositive}
      isNegative={isNegative}
      handleClose={handleClose}
    />
  );
};
export default AttributeFilter;
// const [,GET_PRESETS_LIST,GET_PRESETS_BY_ID]=AppointmentsQueries

// To get list of presets
//  const [
//     getPresetList,
//     {
//       data: attributeList,
//       loading: listLoading,
//       called,
//       refetch: attributeListRefetch
//     }
//   ] = useLazyQuery<any>(GET_PRESETS_LIST);

// useEffect(()=>
// {
// getPresetList({
//     variables:{

//     }
// })
// },[])

// To get presets detail by clicking on them
//  const [
//     getAttributesName,
//     {
//       data: attributeList,
//       loading: listLoading,
//       called,
//       refetch: attributeListRefetch
//     }
//   ] = useLazyQuery<any>(GET_PRESETS_BY_ID);
