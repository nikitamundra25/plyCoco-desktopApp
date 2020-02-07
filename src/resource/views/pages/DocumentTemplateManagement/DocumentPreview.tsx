import React, {
  FunctionComponent,
} from 'react';
import { languageTranslation } from '../../../../helpers';
import { IDocumentPreviewInterface } from '../../../../interfaces';
import visit from '../../../assets/img/visit.svg';
import './index.scss';

const DocumentPreview: FunctionComponent<IDocumentPreviewInterface> = (props: IDocumentPreviewInterface) => {

  const {
    documentUrls,
    imageUrls,
  } = props;

  return (
    <>
      <h5 className="content-title">{languageTranslation("PREVIEW")}</h5>
      <div className="document-preview d-flex justify-content-center working-height">
        {documentUrls ?
          <div className="d-flex align-items-center justify-content-center w-100 preview-section">
            <embed src={documentUrls} type="application/pdf" width="100%" height="100%" />
          </div>
          :
          imageUrls ?
            <div className="d-flex align-items-center justify-content-center preview-section">
              <img className="img-fluid" src={imageUrls} alt="" />
            </div>
            :
            <div className="d-flex align-items-center justify-content-center flex-column nodocument-section">
              <span className="doc-icon mb-3">
                <img src={visit} alt="" className="img-fluid" />
              </span>
              <span>{languageTranslation("EMPTY_DOCUMENT_TEMPLATE_MSG")}</span>
            </div>
        }
      </div>
    </>
  );
};

export default DocumentPreview;
