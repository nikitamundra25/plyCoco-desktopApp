import React, { FunctionComponent } from 'react';
import { Col } from 'reactstrap';
import moment from 'moment';
import {
  IEmailPreviewProps,
  IEmailInputAttachmenttypes,
} from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';
import { AttachmentList } from '../../../components/Attachments';

export const EmailPreview: FunctionComponent<IEmailPreviewProps> = ({
  emailData,
  selectedUserName,
  sendBy,
}: IEmailPreviewProps) => {
  return (
    <Col lg={'7'}>
      <div
        className={`mail-details ${
          sendBy &&
          emailData &&
          emailData.attachments &&
          emailData.attachments.length
            ? 'sent-box'
            : ''
        }`}
      >
        <div className='mail-body'>
          {emailData ? (
            <div>
              <h4 className='mb-3 subject-title text-capitalize'>
                {emailData.subject}
              </h4>
              <h5 className='mb-2'>{sendBy ? sendBy : selectedUserName}</h5>
              <div>
                <span className='gray-color'>
                  {languageTranslation('POSTED')}:
                </span>{' '}
                <span>
                  {moment(emailData.createdAt).format('DD.MM.YYYY HH:mm:ss')}
                </span>
              </div>
              {selectedUserName ? (
                <div className='mb-3'>
                  <span className='gray-color'>
                    {languageTranslation('TO')}:
                  </span>{' '}
                  <span>{selectedUserName}</span>
                </div>
              ) : null}
              <p className='mb-1'>
                {' '}
                -------------------------------------------------
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: emailData.body,
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
      {emailData && emailData.attachments && emailData.attachments.length ? (
        <AttachmentList
          attachment={emailData.attachments.map(
            ({ path, fileName }: IEmailInputAttachmenttypes) => ({
              url: null,
              fileName,
              size: 0,
              path,
              file: null,
              id: '',
            }),
          )}
          label={'preview'}
        />
      ) : null}
    </Col>
  );
};
