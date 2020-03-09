import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
import close from '../../../../assets/img/cancel.svg';
import closehover from '../../../../assets/img/cancel-hover.svg';
import filter from '../../../../assets/img/filter.svg';
import { IAttributeFilterPage } from '../../../../../interfaces';
import AddPreset from './AddPreset';

const AttributeFilterPage = (props: IAttributeFilterPage) => {
  const [collapse1, setCollapse1] = useState(true);
  const [collapse2, setCollapse2] = useState(true);
  const [collapse3, setCollapse3] = useState(true);
  const [collapse4, setCollapse4] = useState(true);
  const [collapse5, setCollapse5] = useState(true);
  const [collapse6, setCollapse6] = useState(true);

  const toggle1 = () => setCollapse1(!collapse1);
  const toggle2 = () => setCollapse2(!collapse2);
  const toggle3 = () => setCollapse3(!collapse3);
  const toggle4 = () => setCollapse4(!collapse4);
  const toggle5 = () => setCollapse5(!collapse5);
  const toggle6 = () => setCollapse6(!collapse6);
  const {
    show,
    handleClose,
    attributeData,
    handleCheckPositiveElement,
    handleCheckNegativeElement,
    isPositive,
    isNegative,
    onApplyingFilter,
    handleCheckAllElements,
    setIsPositive,
    setIsNegative,
    setShowPreset,
    showPreset,
    preset,
    setPreset,
    onAddingPreset,
    presetNames,
    setPresetNames,
    onSavingPreset,
    handleChange,
    presetList,
    onDeletingPreset,
    OnPresetClick,
    activePreset,
    addPresetLoading,

    setActivePreset,
  } = props;
  const externalCloseBtn = (
    <button
      className='close modal-close'
      onClick={() => {
        setActivePreset(null);
        setIsPositive([]);
        setIsNegative([]);
        handleClose();
      }}
    >
      <img src={close} alt='close' className='main-img' />
      <img src={closehover} alt='close' className='hover-img' />
    </button>
  );
  return (
    <div>
      <Modal
        isOpen={show}
        className='common-modal attribute-modal'
        centered
        size='xl'
      >
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation('ATTRIBUTES')}
        </ModalHeader>
        <ModalBody>
          <div className='d-flex align-items-center mb-2'>
            <div className='custom-header-nav-item mr-3'>
              <span className='custom-header-nav-icon'>
                <img src={filter} alt='' />
              </span>
              <span
                className='custom-header-nav-text'
                onClick={onApplyingFilter}
              >
                {languageTranslation('APPLY_FILTER')}
              </span>
            </div>
          </div>
          <div className='common-attribute-section'>
            <Row className='common-attribute-row'>
              <Col md={4}>
                <div className='common-list-wrap'>
                  <div className='common-list-header d-flex align-items-cente justify-content-between'>
                    <div className='common-list-title align-middle'>
                      {languageTranslation('PRESETS')}
                    </div>
                  </div>
                  <div className='common-list-body custom-scrollbar'>
                    <ul className='common-list list-unstyled mb-0'>
                      {presetList && presetList.getPresetAttribute
                        ? presetList.getPresetAttribute.map(
                            (item: any, index: number) => {
                              return (
                                <li
                                  className={`cursor-pointer list-item text-capitalize ${
                                    activePreset === item.id ? 'active' : ''
                                  }`}
                                >
                                  <div
                                    className='list-item-text one-line-text'
                                    onClick={() => OnPresetClick(item)}
                                  >
                                    {item.name}
                                  </div>
                                  <div className='list-item-icon'>
                                    <span
                                      id={`delete${index}`}
                                      className={`btn-icon `}
                                      onClick={() => onDeletingPreset(item.id)}
                                    >
                                      <UncontrolledTooltip
                                        placement={'top'}
                                        target={`delete${index}`}
                                      >
                                        {languageTranslation('DELETE_PRESET')}
                                      </UncontrolledTooltip>
                                      <i className='fa fa-trash'></i>
                                    </span>
                                  </div>
                                </li>
                              );
                            },
                          )
                        : null}
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={4} className='px-md-0'>
                <div className='common-list-wrap'>
                  <div className='common-list-header d-flex align-items-cente justify-content-between'>
                    <div className='common-list-title align-middle'>
                      {languageTranslation('POSITIVE_ATTRIBUTE')}
                    </div>
                    <div>
                      <UncontrolledDropdown className='custom-dropdown'>
                        <DropdownToggle
                          className={'text-capitalize btn-more'}
                          size='sm'
                        >
                          <i className='icon-options-vertical' />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            className={
                              (isNegative && isNegative.length) ||
                              (isPositive && isPositive.length)
                                ? ''
                                : 'disabled-class'
                            }
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
                          <DropdownItem
                            onClick={() => handleCheckAllElements('positive')}
                          >
                            <i className='fa fa-check-square mr-2' />
                            {languageTranslation('SELECT_ALL')}
                          </DropdownItem>
                          <DropdownItem onClick={() => setIsPositive([])}>
                            <i className='fa fa-square-o mr-2' />
                            {languageTranslation('UNSELECT')}
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>

                  <div className='common-list-body custom-scrollbar'>
                    <div>
                      <div
                        onClick={toggle1}
                        className='attribute-title cursor-pointer'
                      >
                        <span className='align-middle'>
                          {collapse1 ? (
                            <i className='fa fa-minus mr-2' />
                          ) : (
                            <i className='fa fa-plus mr-2' />
                          )}
                        </span>

                        <span className='align-middle'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory
                            ? attributeData.getCaregiverAtrributeWithCategory[0]
                                .name
                            : null}
                        </span>
                      </div>

                      <Collapse isOpen={collapse1}>
                        <ul className='common-list list-unstyled mb-0 text-capitalize pl-3 attribute-list'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory &&
                          attributeData.getCaregiverAtrributeWithCategory[0]
                            ? attributeData.getCaregiverAtrributeWithCategory[0].attribute_managements.map(
                                (list: any, index: number) => {
                                  return (
                                    <li key={index}>
                                      <span className=' checkbox-custom '>
                                        <input
                                          type='checkbox'
                                          id={`positive${list.name}`}
                                          name={`positive${list.name}`}
                                          className=''
                                          checked={
                                            isPositive.indexOf(list.id) > -1
                                              ? true
                                              : false
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >,
                                          ) =>
                                            handleCheckPositiveElement(
                                              e,
                                              list.id,
                                            )
                                          }
                                        />
                                        <label
                                          className=''
                                          htmlFor={`positive${list.name}`}
                                        >
                                          {list.name}
                                        </label>
                                      </span>
                                    </li>
                                  );
                                },
                              )
                            : null}
                        </ul>
                      </Collapse>
                    </div>

                    <div>
                      <div
                        onClick={toggle2}
                        className='attribute-title cursor-pointer'
                      >
                        <span className='align-middle'>
                          {collapse2 ? (
                            <i className='fa fa-minus mr-2' />
                          ) : (
                            <i className='fa fa-plus mr-2' />
                          )}
                        </span>
                        <span className='align-middle'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory
                            ? attributeData.getCaregiverAtrributeWithCategory[1]
                                .name
                            : null}
                        </span>
                      </div>
                      <Collapse isOpen={collapse2}>
                        <ul className='common-list list-unstyled mb-0 text-capitalize pl-3 attribute-list'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory &&
                          attributeData.getCaregiverAtrributeWithCategory[1]
                            ? attributeData.getCaregiverAtrributeWithCategory[1].attribute_managements.map(
                                (list: any, index: number) => {
                                  return (
                                    <li key={index}>
                                      <span className=' checkbox-custom '>
                                        <input
                                          type='checkbox'
                                          id={`positive${list.name}`}
                                          name={`positive${list.name}`}
                                          className=''
                                          checked={
                                            isPositive.indexOf(list.id) > -1
                                              ? true
                                              : false
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >,
                                          ) =>
                                            handleCheckPositiveElement(
                                              e,
                                              list.id,
                                            )
                                          }
                                        />
                                        <label
                                          className=''
                                          htmlFor={`positive${list.name}`}
                                        >
                                          {list.name}
                                        </label>
                                      </span>
                                    </li>
                                  );
                                },
                              )
                            : null}
                        </ul>
                      </Collapse>
                    </div>

                    <div>
                      <div
                        onClick={toggle3}
                        className='attribute-title cursor-pointer'
                      >
                        <span className='align-middle'>
                          {collapse3 ? (
                            <i className='fa fa-minus mr-2' />
                          ) : (
                            <i className='fa fa-plus mr-2' />
                          )}
                        </span>

                        <span className='align-middle'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory
                            ? attributeData.getCaregiverAtrributeWithCategory[2]
                                .name
                            : null}
                        </span>
                      </div>

                      <Collapse isOpen={collapse3}>
                        <ul className='common-list list-unstyled mb-0 text-capitalize pl-3 attribute-list'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory &&
                          attributeData.getCaregiverAtrributeWithCategory[2]
                            ? attributeData.getCaregiverAtrributeWithCategory[2].attribute_managements.map(
                                (list: any, index: number) => {
                                  return (
                                    <li key={index}>
                                      <span className=' checkbox-custom '>
                                        <input
                                          type='checkbox'
                                          id={`positive${list.name}`}
                                          name={`positive${list.name}`}
                                          className=''
                                          checked={
                                            isPositive.indexOf(list.id) > -1
                                              ? true
                                              : false
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >,
                                          ) =>
                                            handleCheckPositiveElement(
                                              e,
                                              list.id,
                                            )
                                          }
                                        />
                                        <label
                                          className=''
                                          htmlFor={`positive${list.name}`}
                                        >
                                          {list.name}
                                        </label>
                                      </span>
                                    </li>
                                  );
                                },
                              )
                            : null}
                        </ul>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={4}>
                <div className='common-list-wrap'>
                  <div className='common-list-header d-flex align-items-cente justify-content-between'>
                    <div className='common-list-title align-middle'>
                      {languageTranslation('NEGATIVE_ATTRIBUTE')}
                    </div>
                    <div>
                      <UncontrolledDropdown className='custom-dropdown'>
                        <DropdownToggle
                          className={'text-capitalize btn-more'}
                          size='sm'
                        >
                          <i className='icon-options-vertical' />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            className={
                              (isNegative && isNegative.length) ||
                              (isPositive && isPositive.length)
                                ? ''
                                : 'disabled-class'
                            }
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
                          <DropdownItem
                            onClick={() => handleCheckAllElements('negative')}
                          >
                            <i className='fa fa-check-square mr-2' />
                            {languageTranslation('SELECT_ALL')}
                          </DropdownItem>
                          <DropdownItem onClick={() => setIsNegative([])}>
                            <i className='fa fa-square-o mr-2' />
                            {languageTranslation('UNSELECT')}
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>

                  <div className='common-list-body custom-scrollbar'>
                    <div>
                      <div
                        onClick={toggle4}
                        className='attribute-title cursor-pointer'
                      >
                        <span className='align-middle'>
                          {collapse4 ? (
                            <i className='fa fa-minus mr-2' />
                          ) : (
                            <i className='fa fa-plus mr-2' />
                          )}
                        </span>
                        <span className='align-middle'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory
                            ? attributeData.getCaregiverAtrributeWithCategory[0]
                                .name
                            : null}
                        </span>
                      </div>
                      <Collapse isOpen={collapse4}>
                        <ul className='common-list list-unstyled mb-0 text-capitalize pl-3 attribute-list'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory &&
                          attributeData.getCaregiverAtrributeWithCategory[0]
                            ? attributeData.getCaregiverAtrributeWithCategory[0].attribute_managements.map(
                                (list: any, index: number) => {
                                  return (
                                    <li key={index}>
                                      <span className=' checkbox-custom '>
                                        <input
                                          type='checkbox'
                                          id={`negative${list.name}`}
                                          name={`negative${list.name}`}
                                          className=''
                                          checked={
                                            isNegative.indexOf(list.id) > -1
                                              ? true
                                              : false
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >,
                                          ) =>
                                            handleCheckNegativeElement(
                                              e,
                                              list.id,
                                            )
                                          }
                                        />
                                        <label
                                          className=''
                                          htmlFor={`negative${list.name}`}
                                        >
                                          {list.name}
                                        </label>
                                      </span>
                                    </li>
                                  );
                                },
                              )
                            : null}
                        </ul>
                      </Collapse>
                    </div>
                    <div>
                      <div
                        onClick={toggle5}
                        className='attribute-title cursor-pointer'
                      >
                        <span className='align-middle'>
                          {collapse5 ? (
                            <i className='fa fa-minus mr-2' />
                          ) : (
                            <i className='fa fa-plus mr-2' />
                          )}
                        </span>
                        <span className='align-middle'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory
                            ? attributeData.getCaregiverAtrributeWithCategory[1]
                                .name
                            : null}
                        </span>
                      </div>
                      <Collapse isOpen={collapse5}>
                        <ul className='common-list list-unstyled mb-0 pl-3 text-capitalize attribute-list'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory &&
                          attributeData.getCaregiverAtrributeWithCategory[1]
                            ? attributeData.getCaregiverAtrributeWithCategory[1].attribute_managements.map(
                                (list: any, index: number) => {
                                  return (
                                    <li key={index}>
                                      <span className=' checkbox-custom '>
                                        <input
                                          type='checkbox'
                                          id={`negative${list.name}`}
                                          name={`negative${list.name}`}
                                          className=''
                                          checked={
                                            isNegative.indexOf(list.id) > -1
                                              ? true
                                              : false
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >,
                                          ) =>
                                            handleCheckNegativeElement(
                                              e,
                                              list.id,
                                            )
                                          }
                                        />
                                        <label
                                          className=''
                                          htmlFor={`negative${list.name}`}
                                        >
                                          {list.name}
                                        </label>
                                      </span>
                                    </li>
                                  );
                                },
                              )
                            : null}
                        </ul>
                      </Collapse>
                    </div>
                    <div>
                      <div
                        onClick={toggle6}
                        className='attribute-title cursor-pointer'
                      >
                        <span className='align-middle'>
                          {collapse6 ? (
                            <i className='fa fa-minus mr-2' />
                          ) : (
                            <i className='fa fa-plus mr-2' />
                          )}
                        </span>

                        <span className='align-middle'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory
                            ? attributeData.getCaregiverAtrributeWithCategory[2]
                                .name
                            : null}
                        </span>
                      </div>

                      <Collapse isOpen={collapse6}>
                        <ul className='common-list list-unstyled mb-0 text-capitalize pl-3 attribute-list'>
                          {attributeData &&
                          attributeData.getCaregiverAtrributeWithCategory &&
                          attributeData.getCaregiverAtrributeWithCategory[2]
                            ? attributeData.getCaregiverAtrributeWithCategory[2].attribute_managements.map(
                                (list: any, index: number) => {
                                  return (
                                    <li key={index}>
                                      <span className=' checkbox-custom '>
                                        <input
                                          type='checkbox'
                                          id={`negative${list.name}`}
                                          name={`negative${list.name}`}
                                          className=''
                                          checked={
                                            isNegative.indexOf(list.id) > -1
                                              ? true
                                              : false
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<
                                              HTMLInputElement
                                            >,
                                          ) =>
                                            handleCheckNegativeElement(
                                              e,
                                              list.id,
                                            )
                                          }
                                        />
                                        <label
                                          className=''
                                          htmlFor={`negative${list.name}`}
                                        >
                                          {list.name}
                                        </label>
                                      </span>
                                    </li>
                                  );
                                },
                              )
                            : null}
                        </ul>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
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
  );
};

export default AttributeFilterPage;
