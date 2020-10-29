import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import close from "../../../assets/img/cancel.svg";
import closehover from "../../../assets/img/cancel-hover.svg";
import filter from "../../../assets/img/filter.svg";
import { languageTranslation } from "../../../../helpers";
import { AttributePresetLists } from "./AttributePresetLists";
import { AttributeList } from "./AttributeList";
import { AttributeFilterQueries } from "../../../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";
const [GET_CAREGIVER_ATTRIBUTES_WITH_CATEGORY] = AttributeFilterQueries;

export const AttributeFilterModal = ({
  isOpen,
  onClose,
  onFilterUpdated,
}: any) => {
  const [selectedPositiveAttributes, setSelectedPositiveAttributes] = useState<
    any[]
  >([]);
  const [selectedNegetiveAttributes, setSelectedNegetiveAttributes] = useState<
    any[]
  >([]);
  const selectAllAttributes = (type: string, isChecked: boolean) => {
    if (type === "positive") {
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
        userRole: "caregiver",
      },
    });
  }, []);
  /**
   *
   */
  const externalCloseBtn = (
    <button
      className='close modal-close'
      onClick={() => {
        onClose();
      }}>
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
        size='xl'>
        <ModalHeader close={externalCloseBtn}>
          {languageTranslation("ATTRIBUTES")}
        </ModalHeader>
        <ModalBody>
          <div className='d-flex align-items-center mb-2 ' onClick={undefined}>
            <div
              className={
                selectedPositiveAttributes.length ||
                selectedNegetiveAttributes.length
                  ? "custom-header-nav-item mr-3"
                  : "custom-header-nav-item mr-3 disabled-class"
              }
              onClick={() => {
                onFilterUpdated({
                  positiveAttributeId: selectedPositiveAttributes,
                  negativeAttributeId: selectedNegetiveAttributes,
                });
                onClose();
              }}>
              <span className='custom-header-nav-icon'>
                <img src={filter} alt='' />
              </span>
              <span className='custom-header-nav-text'>
                {languageTranslation("APPLY_FILTER")}
              </span>
            </div>
          </div>
          <div className='common-attribute-section'>
            <Row className='common-attribute-row'>
              <Col md={4}>
                <AttributePresetLists />
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
                />
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
