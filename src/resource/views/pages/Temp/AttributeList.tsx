import React, { useState } from 'react';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { languageTranslation } from '../../../../helpers';
import Spinner from '../../components/Spinner';
import AddPreset from '../DummyAppointment/AttributeFilter/AddPreset';
/**
 *
 * @param param0
 */
const CategoryItem = ({
  category,
  selectedAttributes = [],
  type,
  onSelect,
}: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='attribute-title cursor-pointer'
      >
        <span className='align-middle'>
          {isOpen ? (
            <i className='fa fa-minus mr-2' />
          ) : (
            <i className='fa fa-plus mr-2' />
          )}
        </span>
        <span className='align-middle'>{category.name}</span>
      </div>

      <Collapse isOpen={isOpen}>
        <ul className='common-list list-unstyled mb-0 text-capitalize pl-3 attribute-list'>
          {category.attributes.length
            ? category.attributes.map((list: any, index: number) => {
                return (
                  <li key={index}>
                    <span className=' checkbox-custom '>
                      <input
                        type='checkbox'
                        id={`${type}${list.name}`}
                        name={`${type}${list.name}`}
                        className=''
                        checked={
                          selectedAttributes.indexOf(list.id) > -1 ||
                          selectedAttributes.indexOf(list.id) > -1
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          onSelect(list.id)
                        }
                      />
                      <label className='' htmlFor={`${type}${list.name}`}>
                        {list.name}
                      </label>
                    </span>
                  </li>
                );
              })
            : null}
        </ul>
      </Collapse>
    </>
  );
};
export const AttributeList = ({
  type = 'positive',
  data = [],
  isLoading: listLoading,
  updateSelectedAttributes,
  selectedAttributes,
  selectAllAttributes,
  isNegative,
  isPositive,
  setShowPreset,
  onAddingPreset,
  showPreset,
  preset,
  setPresetNames,
  onSavingPreset,
  handleChange,
  addPresetLoading,
  presetNames,
  setPreset,
}: any) => {
  /**
   *
   * @param e
   * @param categoryId
   */
  const onSelect = (categoryId: number) => {
    const newSelectedAttributes = Object.assign([], selectedAttributes);
    const index = selectedAttributes.findIndex(
      (cat: number) => cat === categoryId
    );
    if (index > -1) {
      newSelectedAttributes.splice(index, 1);
    } else {
      newSelectedAttributes.push(categoryId);
    }
    updateSelectedAttributes(newSelectedAttributes);
  };
  /**
   *
   */
  return (
    <>
      <div className='common-list-wrap'>
        <div className='common-list-header d-flex align-items-cente justify-content-between'>
          <div className='common-list-title align-middle'>
            {languageTranslation(
              type === 'positive' ? 'POSITIVE_ATTRIBUTE' : 'NEGATIVE_ATTRIBUTE'
            )}
          </div>
          <div>
            <UncontrolledDropdown className='custom-dropdown'>
              <DropdownToggle className={'text-capitalize btn-more'} size='sm'>
                <i className='icon-options-vertical' />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  className={selectedAttributes.length ? '' : 'disabled-class'}
                  onClick={() => {
                    if (
                      (isNegative && isNegative.length) ||
                      (isPositive && isPositive.length)
                    ) {
                      setShowPreset(true);
                      onAddingPreset(isPositive, isNegative);
                    } else {
                      setShowPreset(false);
                    }
                  }}
                >
                  <i className='fa fa-plus mr-2' />
                  {languageTranslation('ADD_PRESET')}
                </DropdownItem>
                <DropdownItem onClick={() => selectAllAttributes(type, true)}>
                  <i className='fa fa-check-square mr-2' />
                  {languageTranslation('SELECT_ALL')}
                </DropdownItem>
                <DropdownItem onClick={() => selectAllAttributes(type, false)}>
                  <i className='fa fa-square-o mr-2' />
                  {languageTranslation('UNSELECT')}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className='common-list-body custom-scrollbar'>
          {listLoading ? (
            <Spinner />
          ) : data.length ? (
            data.map((category: any, index: number) => {
              return (
                <div key={index}>
                  <CategoryItem
                    selectedAttributes={selectedAttributes}
                    type={type}
                    category={category}
                    onSelect={onSelect}
                  />
                </div>
              );
            })
          ) : null}
        </div>
        <AddPreset
          show={showPreset ? true : false}
          preset={preset}
          handleClose={() => {
            setShowPreset(false);
            setPreset(null);
          }}
          presetNames={presetNames}
          setPresetNames={setPresetNames}
          onSavingPreset={onSavingPreset}
          handleChange={handleChange}
          addPresetLoading={addPresetLoading}
        />
      </div>
    </>
  );
};
