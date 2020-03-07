import React, { useState, useEffect } from 'react';
import AttributeFilterPage from './AttributeFilter';
import { CareGiverQueries } from '../../../../../graphql/queries';
import { IAttributeFilter } from '../../../../../interfaces';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { AttributeFilterQueries } from '../../../../../graphql/queries';
import { AttributeFilterMutations } from '../../../../../graphql/Mutations';
import { languageTranslation, errorFormatter } from '../../../../../helpers';
import { ConfirmBox } from '../../../components/ConfirmBox';
import { toast } from 'react-toastify';
import { ApolloError } from 'apollo-client';
const [
  GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY,
  GET_PRESETS_LIST,
  GET_PRESETS_BY_ID
] = AttributeFilterQueries;
const [
  ADD_PRESET_ATTRIBUTE,
  DELETE_PRESET_ATTRIBUTE
] = AttributeFilterMutations;
const [, , , , , GET_CAREGIVER_ATTRIBUTES] = CareGiverQueries;
let toastId: any = '';
const AttributeFilter = (props: IAttributeFilter) => {
  const [isPositive, setIsPositive] = useState<number[]>([]);
  const [isNegative, setIsNegative] = useState<number[]>([]);
  const [preset, setPreset] = useState<string | null>(null);
  const [showPreset, setShowPreset] = useState<boolean>(false);
  const [presetNames, setPresetNames] = useState<any>(null);
  const { show, handleClose, setAttributeFilter, attributeFilter } = props;
  const [activePreset, setActivePreset] = useState<number | null>(null);

  // To get list of presets
  const [
    getPresetAttributeList,
    { data: presetList, loading, refetch }
  ] = useLazyQuery<any>(GET_PRESETS_LIST);
  useEffect(() => {
    getPresetAttributeList({
      variables: {
        userRole:
          attributeFilter && attributeFilter === 'caregiver'
            ? 'caregiver'
            : 'careInstitution'
      }
    });
  }, [attributeFilter]);

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
  //to add the preset in db
  const [addPreset, { loading: addPresetLoading }] = useMutation<any>(
    ADD_PRESET_ATTRIBUTE,
    {
      onCompleted({ addPreset }) {
        setShowPreset(false);
        setIsNegative([]);
        setIsPositive([]);
        setActivePreset(null);
        refetch();
        toast.dismiss();
        if (!toast.isActive(toastId)) {
          toastId = toast.success(languageTranslation('PRESET_ADDED_SUCCESS'));
        }
      },
      onError: (error: ApolloError) => {
        const message = errorFormatter(error);
        if (!toast.isActive(toastId)) {
          toastId = toast.error(message);
        }
      }
    }
  );

  // to delete presets from db
  const [deletePreset] = useMutation<any>(DELETE_PRESET_ATTRIBUTE, {
    onCompleted({ deletePreset }) {
      setShowPreset(false);
      setIsNegative([]);
      setIsPositive([]);
      setActivePreset(null);
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    }
  });

  //view a particular template by clicking on its menu entry
  const OnPresetClick = (data: any) => {
    setActivePreset(data.id);
    setIsPositive(data.positiveAttributeIds.map((e: any) => parseInt(e)));
    setIsNegative(data.negativeAttributeIds.map((e: any) => parseInt(e)));
  };
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setPresetNames(value);
  };

  //on clicking on button save as current preset
  const onAddingPreset = (positive: number[], negative: number[]) => {
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

  // on saving the current preset
  const onSavingPreset = async () => {
    await addPreset({
      variables: {
        presetAttributeInput: {
          name: presetNames,
          positiveAttributeIds: isPositive ? isPositive : [],
          negativeAttributeIds: isNegative ? isNegative : [],
          userRole:
            attributeFilter && attributeFilter === 'caregiver'
              ? 'caregiver'
              : 'careInstitution'
        }
      }
    });
  };
  const onDeletingPreset = async (id: number) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_PRESET_DELETE_MSG')
    });
    if (!value) {
      return;
    } else {
      try {
        await deletePreset({
          variables: {
            id: id ? id : null
          }
        });
        refetch();
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
      presetList={presetList}
      activePreset={activePreset}
      addPresetLoading={addPresetLoading}
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
      onSavingPreset={onSavingPreset}
      handleChange={handleChange}
      onDeletingPreset={onDeletingPreset}
      OnPresetClick={OnPresetClick}
      setActivePreset={setActivePreset}
    />
  );
};
export default AttributeFilter;
