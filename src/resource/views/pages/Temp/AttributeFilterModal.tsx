import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import close from '../../../assets/img/cancel.svg';
import closehover from '../../../assets/img/cancel-hover.svg';
import filterIcon from '../../../assets/img/filter.svg';
import { errorFormatter, languageTranslation } from '../../../../helpers';
import { AttributePresetLists } from './AttributePresetLists';
import { AttributeList } from './AttributeList';
import { AttributeFilterQueries } from '../../../../graphql/queries';
import { AttributeFilterMutations } from '../../../../graphql/Mutations';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { toast } from 'react-toastify';
import { ConfirmBox } from '../../components/ConfirmBox';
const [
  GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY,
  GET_PRESETS_LIST,
] = AttributeFilterQueries;
const [
  ADD_PRESET_ATTRIBUTE,
  DELETE_PRESET_ATTRIBUTE,
] = AttributeFilterMutations;
let toastId: any = '';
export const AttributeFilterModal = ({
  isOpen,
  onClose,
  onFilterUpdated,
  filter,
}: any) => {
  const [selectedPositiveAttributes, setSelectedPositiveAttributes] = useState<
    any[]
  >([]);
  const [selectedNegetiveAttributes, setSelectedNegetiveAttributes] = useState<
    any[]
  >([]);
  const [showPreset, setShowPreset] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [presetNames, setPresetNames] = useState<any>(null);
  const [preset, setPreset] = useState<string | null>(null);
  /**
   *
   * @param type
   * @param isChecked
   */
  const selectAllAttributes = (type: string, isChecked: boolean) => {
    if (type === 'positive') {
      if (isChecked) {
        const newAttr: any[] = [];
        attributes.forEach((attr: any) => {
          attr.attributes.forEach(({ id }: any) => {
            newAttr.push(id);
          });
        });
        setSelectedPositiveAttributes(newAttr);
      } else {
        setSelectedPositiveAttributes([]);
      }
    } else {
      if (isChecked) {
        const newAttr: any[] = [];
        attributes.forEach((attr: any) => {
          attr.attributes.forEach(({ id }: any) => {
            newAttr.push(id);
          });
        });
        setSelectedNegetiveAttributes(newAttr);
      } else {
        setSelectedNegetiveAttributes([]);
      }
    }
  };
  // Fetch attribute list from db
  const [getAttributes, { data, loading }] = useLazyQuery<any>(
    GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY
  );
  useEffect(() => {
    getAttributes({
      variables: {
        userRole: filter,
      },
    });
  }, []);

  // To get list of presets
  const [
    getPresetAttributeList,
    { data: presetList, loading: presetLoading, refetch },
  ] = useLazyQuery<any>(GET_PRESETS_LIST);
  useEffect(() => {
    getPresetAttributeList({
      variables: {
        userRole: filter,
      },
    });
  }, []);

  //to add the preset in db
  const [addPreset, { loading: addPresetLoading }] = useMutation<any>(
    ADD_PRESET_ATTRIBUTE,
    {
      onCompleted() {
        setShowPreset(false);
        setSelectedNegetiveAttributes([]);
        setSelectedPositiveAttributes([]);
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
      },
    }
  );

  // to delete presets from db
  const [deletePreset] = useMutation<any>(DELETE_PRESET_ATTRIBUTE, {
    onCompleted() {
      setShowPreset(false);
      setSelectedNegetiveAttributes([]);
      setSelectedPositiveAttributes([]);
      setActivePreset(null);
    },
    onError: (error: ApolloError) => {
      const message = errorFormatter(error);
      if (!toast.isActive(toastId)) {
        toastId = toast.error(message);
      }
    },
  });
  /**
   *
   * @param positive
   * @param negative
   */
  //on clicking on button save as current preset
  const onAddingPreset = (positive: number[], negative: number[]) => {
    let positiveNamesArr: any = [];
    let negativeNamesArr: any = [];
    // to get selcted positive attributes name
    data &&
    data.getCaregiverAtrributeWithCategory &&
    data.getCaregiverAtrributeWithCategory.length
      ? data.getCaregiverAtrributeWithCategory.map((category: any) => {
          category.attributes.length
            ? category.attributes.map((list: any) => {
                let temp;
                temp = positive.includes(list.id);
                if (temp) {
                  positiveNamesArr.push(list.name);
                }
              })
            : null;
        })
      : null;
    // to get selcted negative attributes name
    data &&
    data.getCaregiverAtrributeWithCategory &&
    data.getCaregiverAtrributeWithCategory.length
      ? data.getCaregiverAtrributeWithCategory.map((category: any) => {
          category.attributes.length
            ? category.attributes.map((list: any) => {
                let temp;
                temp = negative.includes(list.id);
                if (temp) {
                  negativeNamesArr.push(list.name);
                }
              })
            : null;
        })
      : null;
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
          positiveAttributeIds: selectedPositiveAttributes
            ? selectedPositiveAttributes
            : [],
          negativeAttributeIds: selectedNegetiveAttributes
            ? selectedNegetiveAttributes
            : [],
          userRole: filter,
        },
      },
    });
  };
    /**
   *
   * @param id
   */
  // on deleting user created preset
  const onDeletingPreset = async (id: number) => {
    const { value } = await ConfirmBox({
      title: languageTranslation('CONFIRM_LABEL'),
      text: languageTranslation('CONFIRM_PRESET_DELETE_MSG'),
    });
    if (!value) {
      return;
    } else {
      try {
        await deletePreset({
          variables: {
            id: id ? id : null,
          },
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
    /**
   *
   * @param e
   */
  // on preset name change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setPresetNames(value);
  };
  /**
   *
   */
  const externalCloseBtn = (
    <button
      className='close modal-close'
      onClick={() => {
        onClose();
      }}
    >
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );
  const attributes = (data || {}).getCaregiverAtrributeWithCategory || [];
  return (
    <>
      <Modal
        isOpen={isOpen}
        className='common-modal attribute-modal'
        centered
        size='xl'
      >
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation('ATTRIBUTES')}
        </ModalHeader>
        <ModalBody>
          <div className='d-flex align-items-center mb-2 ' onClick={undefined}>
            <div
              className={
                selectedPositiveAttributes.length ||
                selectedNegetiveAttributes.length
                  ? 'custom-header-nav-item mr-3'
                  : 'custom-header-nav-item mr-3 disabled-class'
              }
              onClick={() => {
                onFilterUpdated({
                  positiveAttributeId: selectedPositiveAttributes,
                  negativeAttributeId: selectedNegetiveAttributes,
                });
                onClose();
              }}
            >
              <span className='custom-header-nav-icon'>
                <img src={filterIcon} alt='' />
              </span>
              <span className='custom-header-nav-text'>
                {languageTranslation('APPLY_FILTER')}
              </span>
            </div>
          </div>
          <div className='common-attribute-section'>
            <Row className='common-attribute-row'>
              <Col md={4}>
                <AttributePresetLists
                  updatePositiveAttributes={setSelectedPositiveAttributes}
                  updatedNegetiveAttributes={setSelectedNegetiveAttributes}
                  presetList={presetList}
                  loading={presetLoading}
                  onDeletingPreset={onDeletingPreset}
                />
              </Col>
              <Col md={4}>
                <AttributeList
                  key='positive'
                  type='positive'
                  isLoading={loading}
                  data={attributes}
                  selectedAttributes={selectedPositiveAttributes}
                  updateSelectedAttributes={setSelectedPositiveAttributes}
                  selectAllAttributes={selectAllAttributes}
                  isPositive={selectedPositiveAttributes}
                  isNegative={selectedNegetiveAttributes}
                  setShowPreset={setShowPreset}
                  onAddingPreset={onAddingPreset}
                  showPreset={showPreset}
                  preset={preset}
                  setPreset={setPreset}
                  setPresetNames={setPresetNames}
                  onSavingPreset={onSavingPreset}
                  handleChange={handleChange}
                  addPresetLoading={addPresetLoading}
                  presetNames={presetNames}
                />
              </Col>
              <Col md={4}>
                <AttributeList
                  key='negetive'
                  type='negetive'
                  isLoading={loading}
                  data={attributes}
                  selectedAttributes={selectedNegetiveAttributes}
                  updateSelectedAttributes={setSelectedNegetiveAttributes}
                  selectAllAttributes={selectAllAttributes}
                  isPositive={selectedPositiveAttributes}
                  isNegative={selectedNegetiveAttributes}
                  setShowPreset={setShowPreset}
                  onAddingPreset={onAddingPreset}
                  showPreset={showPreset}
                  preset={preset}
                  setPreset={setPreset}
                  setPresetNames={setPresetNames}
                  onSavingPreset={onSavingPreset}
                  handleChange={handleChange}
                  addPresetLoading={addPresetLoading}
                  presetNames={presetNames}
                />
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
