import React, { useEffect, useState } from "react";
import { languageTranslation } from "../../../../helpers";
import { UncontrolledTooltip } from "reactstrap";
import { useLazyQuery } from "@apollo/react-hooks";
import { AttributeFilterQueries } from "../../../../graphql/queries";
import Spinner from "../../components/Spinner";
const [_, GET_PRESETS_LIST] = AttributeFilterQueries;
export const AttributePresetLists = () => {
  const [selectedPreset, setSelectedPreset] = useState();
  // To get list of presets
  const [getPresetAttributeList, { data: presetList, loading }] = useLazyQuery<
    any
  >(GET_PRESETS_LIST);
  useEffect(() => {
    getPresetAttributeList({
      variables: {
        userRole: "caregiver",
      },
    });
  }, []);
  const presets = (presetList || {}).getPresetAttribute || [];

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
                className={`cursor-pointer list-item text-capitalize`}
                // ${selectedPreset === item.id ? "active" : ""}
                key={index}>
                <div
                  className='list-item-text one-line-text'
                  // onClick={() => OnPresetClick(item)}
                >
                  {item.name}
                </div>
                <div className='list-item-icon'>
                  <span
                    id={`delete${index}`}
                    className={`btn-icon `}
                    // onClick={() => onDeletingPreset(item.id)}
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
