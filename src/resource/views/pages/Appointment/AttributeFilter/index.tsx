import React, { useState, useEffect } from 'react';
import AttributeFilterPage from './AttributeFilter';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { IAttributeValues, IAttributeFilter } from '../../../../../interfaces';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import {
  AppointmentsQueries,
  AttributeFilterQueries
} from '../../../../../graphql/queries';
import { languageTranslation, errorFormatter } from '../../../../../helpers';
import { ConfirmBox } from '../../../components/ConfirmBox';
import { toast } from 'react-toastify';
import { element } from 'prop-types';
const [GET_USERS_BY_QUALIFICATION_ID] = AppointmentsQueries;
const [GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY] = AttributeFilterQueries;
const [, , , , , GET_CAREGIVER_ATTRIBUTES] = CareGiverQueries;
let toastId: any = '';
const AttributeFilter = (props: IAttributeFilter) => {
  const [isPositive, setIsPositive] = useState<number[]>([]);
  const [isNegative, setIsNegative] = useState<number[]>([]);
  const [preset, setPreset] = useState<string | null>(null);
  const [showPreset, setShowPreset] = useState<boolean>(false);
  const [presetNames, setPresetNames] = useState<any>(null);
  const { show, handleClose, setAttributeFilter, attributeFilter } = props;

  console.log('attributeFilter', attributeFilter);

  // Fetch attribute list from db
  const { data: attributeData } = useQuery<any>(
    GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY,
    {
      variables: {
        userRole:
          attributeFilter && attributeFilter === 'caregiver'
            ? 'caregiver'
            : 'careInstitution'
      }
    }
  );
  // if any element in positive list is checked
  const handleCheckPositiveElement = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { target } = e;
    const { checked } = target;
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
    // If any id already exist in negative list then it will be removed from the array
    setIsPositive((prevArray: number[]) =>
      prevArray.filter((item: number) => item !== id)
    );
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
    handleClose();
  };

  // on clicking select all option
  const handleCheckAllElements = (list: string) => {
    const selectedAttribute: any = [];
    attributeData &&
      attributeData.getCaregiverAtrributeWithCategory &&
      attributeData.getCaregiverAtrributeWithCategory.map((category: any) => {
        category.attribute_managements.map((subCategory: any) => {
          selectedAttribute.push(subCategory.id);
        });
      });
    if (list === 'positive') {
      setIsNegative([]);
      setIsPositive(selectedAttribute);
    } else {
      setIsPositive([]);
      setIsNegative(selectedAttribute);
    }
  };

  console.log('isnegative', isNegative);
  console.log('ispositive', isPositive);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setPreset(value);
  };

  const onAddingPreset = async (positive: number[], negative: number[]) => {
    let positiveNamesArr: any = [];
    let negativeNamesArr: any = [];
    // to get selcted positive attributes name
    attributeData && attributeData.getCaregiverAtrributeWithCategory
      ? attributeData.getCaregiverAtrributeWithCategory.map((category: any) => {
          category.attribute_managements.filter((item: any) => {
            let temp;
            temp = positive.includes(item.id);
            if (temp) {
              positiveNamesArr.push(item.name);
            }
          });
        })
      : [];
    // to get selcted negative attributes name
    attributeData && attributeData.getCaregiverAtrributeWithCategory
      ? attributeData.getCaregiverAtrributeWithCategory.map((category: any) => {
          category.attribute_managements.filter((item: any) => {
            let temp;
            temp = negative.includes(item.id);
            if (temp) {
              negativeNamesArr.push(item.name);
            }
          });
        })
      : [];
    let positiveName;
    let negativeName;
    // to join negative elements using -
    if (negativeNamesArr) {
      negativeName = negativeNamesArr
        .map((element: any) => `-${element}`)
        .join('');
    }
    // to join positive elements using +
    if (positiveNamesArr) {
      positiveName = positiveNamesArr
        .map((element: any) => `+${element}`)
        .join('');
    }
    // to join both negative and positive name
    const elements = [positiveName, negativeName].join(' ');
    setPresetNames(elements);
  };

  const onDeletingPreset = async () => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_PRESET_DELETE_MSG')
    });
    if (!value) {
      return;
    } else {
      try {
        // await deleteDocument({
        //   variables: {
        //     id: id ? parseInt(id) : null
        //   }
        // });
        // refetch();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(
            languageTranslation('PRESET_DELETED_SUCCESS')
          );
        }
      } catch (error) {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  };
  return (
    <AttributeFilterPage
      // state
      show={show}
      attributeData={attributeData}
      isPositive={isPositive}
      isNegative={isNegative}
      showPreset={showPreset}
      preset={preset}
      presetNames={presetNames}
      attributeFilter={attributeFilter}
      // function
      setPresetNames={setPresetNames}
      setIsNegative={setIsNegative}
      setIsPositive={setIsPositive}
      handleCheckNegativeElement={handleCheckNegativeElement}
      handleCheckPositiveElement={handleCheckPositiveElement}
      handleClose={handleClose}
      onApplyingFilter={onApplyingFilter}
      handleCheckAllElements={handleCheckAllElements}
      setShowPreset={setShowPreset}
      setPreset={setPreset}
      onAddingPreset={onAddingPreset}
      setAttributeFilter={setAttributeFilter}
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
