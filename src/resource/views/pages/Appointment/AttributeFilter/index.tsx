import React, { useState, useEffect } from 'react';
import AttributeFilterPage from './AttributeFilter';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { IAttributeValues, IAttributeFilter } from '../../../../../interfaces';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { AppointmentsQueries } from '../../../../../graphql/queries';
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;

const [, , , , , GET_CAREGIVER_ATTRIBUTES] = CareGiverQueries;

const AttributeFilter = (props: IAttributeFilter) => {
  const [isPositive, setIsPositive] = useState<number[]>([]);
  const [isNegative, setIsNegative] = useState<number[]>([]);
  const { show, handleClose } = props;

  // To fetch caregivers by qualification id
  // const [
  //   fetchCaregiverList,
  //   { data: careGiversList, loading: caregiverLoading }
  // ] = useLazyQuery<any, any>(GET_USERS_BY_QUALIFICATION_ID, {
  //   fetchPolicy: 'no-cache'
  // });

  // Fetch attribute list from db
  const { data: attributeData } = useQuery<{
    getCaregiverAtrribute: IAttributeValues[];
  }>(GET_CAREGIVER_ATTRIBUTES);

  // if any element in positive list is checked
  const handleCheckPositiveElement = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { target } = e;
    const { checked } = target;
    console.log('isPositive in positive', isPositive);
    // If any id already exist in positive list then it will be removed from the array
    setIsNegative((prevArray: number[]) =>
      prevArray.filter((item: number) => item !== id)
    );

    if (checked) {
      let temp: number[] = [...isPositive];
      temp.push(id);
      setIsPositive(temp);
    } else {
      // to uncheck elements
      setIsPositive((prevArray: number[]) =>
        prevArray.filter((item: number) => item !== id)
      );
    }
  };

  // if any element in negative list is checked
  const handleCheckNegativeElement = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { target } = e;
    const { checked } = target;
    console.log('isNegative in negative', isNegative);
    // If any id already exist in negative list then it will be removed from the array
    setIsPositive((prevArray: number[]) =>
      prevArray.filter((item: number) => item !== id)
    );
    console.log('is positive in existing id', isPositive);

    if (checked) {
      let temp: number[] = [...isNegative];
      temp.push(id);
      setIsNegative(temp);
    } else {
      // to uncheck elements
      setIsNegative((prevArray: number[]) =>
        prevArray.filter((item: number) => item !== id)
      );
    }
  };

  // on applying filter and getting care giver according to filter
  const onApplyingFilter = () => {
    setIsPositive([]);
    setIsNegative([]);
    // get careGivers list
    // fetchCaregiverList({
    //   variables: {
    //     positive: isPositive,
    //     negative: isNegative,
    //     // qualificationId: temp ? temp : null,
    //     userRole: 'caregiver'
    //   }
    // });
    handleClose();
  };

  // on clicking select all option
  const handleCheckAllElements = (list: string) => {
    const selectedAttribute: any = [];
    attributeData &&
      attributeData.getCaregiverAtrribute &&
      attributeData.getCaregiverAtrribute.forEach(item => {
        selectedAttribute.push(item.id);
      });
    if (list === 'positive') {
      setIsPositive(selectedAttribute);
    } else {
      setIsNegative(selectedAttribute);
    }
  };
  console.log('isPosirtive', isPositive);
  console.log('isnegative', isNegative);

  return (
    <AttributeFilterPage
      // state
      show={show}
      attributeData={attributeData}
      isPositive={isPositive}
      isNegative={isNegative}
      // function
      setIsNegative={setIsNegative}
      setIsPositive={setIsPositive}
      handleCheckNegativeElement={handleCheckNegativeElement}
      handleCheckPositiveElement={handleCheckPositiveElement}
      handleClose={handleClose}
      onApplyingFilter={onApplyingFilter}
      handleCheckAllElements={handleCheckAllElements}
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
