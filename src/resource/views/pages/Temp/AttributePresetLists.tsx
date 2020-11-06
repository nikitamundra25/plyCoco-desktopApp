import React, { useState } from "react";
import { languageTranslation } from "../../../../helpers";
import { UncontrolledTooltip } from "reactstrap";
import Spinner from "../../components/Spinner";
export const AttributePresetLists = ({
  updatePositiveAttributes,
  updatedNegetiveAttributes,
  presetList,
  loading,
  onDeletingPreset
}: any) => {
  const [selectedPreset, setSelectedPreset] = useState();
  const presets = (presetList || {}).getPresetAttribute || [];
  /**
   *
   * @param item
   */
  const updateSelectedAttributes = (item: any) => {
    updatedNegetiveAttributes(
      (item.negativeAttributeIds || []).map((i: string) => Number(i))
    );
    updatePositiveAttributes(
      (item.positiveAttributeIds || []).map((i: string) => Number(i))
    );
    setSelectedPreset(item.id);
  };
  return (
    <div className='common-list-wrap'>
      <div className='common-list-header d-flex align-items-cente justify-content-between'>
        <div className='common-list-title align-middle'>
          {languageTranslation("PRESETS")}
        </div>
      </div>
      <div className='common-list-body custom-scrollbar'>
        {loading ? (
          <Spinner />
        ) : (
          <ul className='common-list list-unstyled mb-0'>
            {presets.map((item: any, index: number) => (
              <li
                className={`cursor-pointer list-item text-capitalize ${
                  selectedPreset === item.id ? "active" : ""
                }`}
                key={index}>
                <div
                  className='list-item-text one-line-text'
                  onClick={() => updateSelectedAttributes(item)}>
                  {item.name}
                </div>
                <div className='list-item-icon'>
                  <span
                    id={`delete${index}`}
                    className={`btn-icon `}
                    onClick={() => onDeletingPreset(item.id)}
                  >
                    <UncontrolledTooltip
                      placement={"top"}
                      target={`delete${index}`}>
                      {languageTranslation("DELETE_PRESET")}
                    </UncontrolledTooltip>
                    <i className='fa fa-trash'></i>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
