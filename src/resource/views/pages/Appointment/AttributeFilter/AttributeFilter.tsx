import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import close from "../../../../assets/img/cancel.svg";
import closehover from "../../../../assets/img/cancel-hover.svg";
import filter from "../../../../assets/img/filter.svg";
import {
  IAttributeFilterPage,
  ICollapseState,
} from "../../../../../interfaces";
import AddPreset from "./AddPreset";
import Loader from "../../../containers/Loader/Loader";

const AttributeFilterPage = (props: IAttributeFilterPage) => {
  const [categoryCollapse, setCatCollapse] = useState<ICollapseState[]>([]);

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
    presetListLoading,
    listLoading,
    setActivePreset,
  } = props;
  const { getCaregiverAtrributeWithCategory = [] } = attributeData
    ? attributeData
    : {};

  // To open all the categories by default
  useEffect(() => {
    if (
      getCaregiverAtrributeWithCategory &&
      getCaregiverAtrributeWithCategory.length
    ) {
      setCatCollapse(
        getCaregiverAtrributeWithCategory.map((category: any) => ({
          id: category.id,
          isPositive: true,
          isNegative: true,
        }))
      );
    }
  }, [getCaregiverAtrributeWithCategory]);

  // Function to manage toggle +ve & -ve categories
  const toggleCategories = (id: number, type: string) => {
    let temp = [...categoryCollapse];
    const index: number = categoryCollapse.findIndex(
      (cat: ICollapseState) => cat.id === id
    );
    if (index > -1 && temp[index]) {
      temp[index] = {
        ...temp[index],
        isPositive:
          type === "positive"
            ? !temp[index].isPositive
            : temp[index].isPositive,
        isNegative:
          type === "negative"
            ? !temp[index].isNegative
            : temp[index].isNegative,
      };
      setCatCollapse(temp);
    }
  };

  const externalCloseBtn = (
    <button
      className="close modal-close"
      onClick={() => {
        setActivePreset(null);
        handleClose();
      }}
    >
      <img src={close} alt="close" className="main-img" />
      <img src={closehover} alt="close" className="hover-img" />
    </button>
  );
  return (
    <div>
      <Modal
        isOpen={show}
        className="common-modal attribute-modal"
        centered
        size="xl"
      >
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation("ATTRIBUTES")}
        </ModalHeader>
        <ModalBody>
          <div
            className="d-flex align-items-center mb-2 "
            onClick={
              (isPositive && isPositive.length) ||
              (isNegative && isNegative.length)
                ? onApplyingFilter
                : undefined
            }
          >
            <div
              className={
                (isPositive && isPositive.length) ||
                (isNegative && isNegative.length)
                  ? "custom-header-nav-item mr-3"
                  : "custom-header-nav-item mr-3 disabled-class"
              }
            >
              <span className="custom-header-nav-icon">
                <img src={filter} alt="" />
              </span>
              <span className="custom-header-nav-text">
                {languageTranslation("APPLY_FILTER")}
              </span>
            </div>
          </div>
          <div className="common-attribute-section">
            <Row className="common-attribute-row">
              <Col md={4}>
                <div className="common-list-wrap">
                  <div className="common-list-header d-flex align-items-cente justify-content-between">
                    <div className="common-list-title align-middle">
                      {languageTranslation("PRESETS")}
                    </div>
                  </div>
                  <div className="common-list-body custom-scrollbar">
                    {presetListLoading ? (
                      <Loader />
                    ) : (
                      <ul className="common-list list-unstyled mb-0">
                        {presetList && presetList.getPresetAttribute
                          ? presetList.getPresetAttribute.map(
                              (item: any, index: number) => {
                                return (
                                  <li
                                    className={`cursor-pointer list-item text-capitalize ${
                                      activePreset === item.id ? "active" : ""
                                    }`}
                                    key={index}
                                  >
                                    <div
                                      className="list-item-text one-line-text"
                                      onClick={() => OnPresetClick(item)}
                                    >
                                      {item.name}
                                    </div>
                                    <div className="list-item-icon">
                                      <span
                                        id={`delete${index}`}
                                        className={`btn-icon `}
                                        onClick={() =>
                                          onDeletingPreset(item.id)
                                        }
                                      >
                                        <UncontrolledTooltip
                                          placement={"top"}
                                          target={`delete${index}`}
                                        >
                                          {languageTranslation("DELETE_PRESET")}
                                        </UncontrolledTooltip>
                                        <i className="fa fa-trash"></i>
                                      </span>
                                    </div>
                                  </li>
                                );
                              }
                            )
                          : null}
                      </ul>
                    )}
                  </div>
                </div>
              </Col>
              {["positive", "negative"].map((type: string, i: number) => (
                <Col
                  md={4}
                  className={type === "positive" ? "px-md-0" : " "}
                  key={i}
                >
                  <div className="common-list-wrap">
                    <div className="common-list-header d-flex align-items-cente justify-content-between">
                      <div className="common-list-title align-middle">
                        {languageTranslation(
                          type === "positive"
                            ? "POSITIVE_ATTRIBUTE"
                            : "NEGATIVE_ATTRIBUTE"
                        )}
                      </div>
                      <div>
                        <UncontrolledDropdown className="custom-dropdown">
                          <DropdownToggle
                            className={"text-capitalize btn-more"}
                            size="sm"
                          >
                            <i className="icon-options-vertical" />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              className={
                                (isNegative && isNegative.length) ||
                                (isPositive && isPositive.length)
                                  ? ""
                                  : "disabled-class"
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
                              <i className="fa fa-plus mr-2" />
                              {languageTranslation("ADD_PRESET")}
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleCheckAllElements(type)}
                            >
                              <i className="fa fa-check-square mr-2" />
                              {languageTranslation("SELECT_ALL")}
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>
                                type === "positive"
                                  ? setIsPositive([])
                                  : setIsNegative([])
                              }
                            >
                              <i className="fa fa-square-o mr-2" />
                              {languageTranslation("UNSELECT")}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>

                    <div className="common-list-body custom-scrollbar">
                      {listLoading ? (
                        <Loader />
                      ) : getCaregiverAtrributeWithCategory &&
                        getCaregiverAtrributeWithCategory.length ? (
                        getCaregiverAtrributeWithCategory.map(
                          (category: any, index: number) => {
                            const filteredData:
                              | ICollapseState
                              | undefined = categoryCollapse.filter(
                              (cat: ICollapseState) => cat.id === category.id
                            )[0];
                            const collapse: boolean = filteredData
                              ? type === "positive"
                                ? filteredData.isPositive
                                : filteredData.isNegative
                              : false;
                            return (
                              <div key={index}>
                                <div
                                  onClick={() =>
                                    toggleCategories(category.id, type)
                                  }
                                  className="attribute-title cursor-pointer"
                                >
                                  <span className="align-middle">
                                    {collapse ? (
                                      <i className="fa fa-minus mr-2" />
                                    ) : (
                                      <i className="fa fa-plus mr-2" />
                                    )}
                                  </span>

                                  <span className="align-middle">
                                    {category.name}
                                  </span>
                                </div>
                                {console.log(
                                  "category++++++++++++++++",
                                  category
                                )}
                                <Collapse isOpen={collapse}>
                                  <ul className="common-list list-unstyled mb-0 text-capitalize pl-3 attribute-list">
                                    {category &&
                                    category.attributes &&
                                    category.attributes.length
                                      ? category.attributes.map(
                                          (list: any, index: number) => {
                                            return (
                                              <li key={index}>
                                                <span className=" checkbox-custom ">
                                                  <input
                                                    type="checkbox"
                                                    id={`${type}${list.name}`}
                                                    name={`${type}${list.name}`}
                                                    className=""
                                                    checked={
                                                      type === "positive"
                                                        ? isPositive.indexOf(
                                                            list.id
                                                          ) > -1
                                                          ? true
                                                          : false
                                                        : isNegative.indexOf(
                                                            list.id
                                                          ) > -1
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={(
                                                      e: React.ChangeEvent<
                                                        HTMLInputElement
                                                      >
                                                    ) =>
                                                      type === "positive"
                                                        ? handleCheckPositiveElement(
                                                            e,
                                                            list.id
                                                          )
                                                        : handleCheckNegativeElement(
                                                            e,
                                                            list.id
                                                          )
                                                    }
                                                  />
                                                  <label
                                                    className=""
                                                    htmlFor={`${type}${list.name}`}
                                                  >
                                                    {list.name}
                                                  </label>
                                                </span>
                                              </li>
                                            );
                                          }
                                        )
                                      : null}
                                  </ul>
                                </Collapse>
                              </div>
                            );
                          }
                        )
                      ) : null}
                    </div>
                  </div>
                </Col>
              ))}
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
