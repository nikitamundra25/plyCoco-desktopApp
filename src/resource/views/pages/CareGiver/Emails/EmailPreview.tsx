import React, { FunctionComponent } from 'react';
import { Col } from 'reactstrap';
import moment from 'moment';
import { IEmailPreviewProps } from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';

export const EmailPreview: FunctionComponent<IEmailPreviewProps> = ({
  emailData,
  selectedUserName,
  sendBy,
}: IEmailPreviewProps) => {
  return (
    <Col lg={'7'}>
      <div className='mail-details'>
        <div className='mail-body'>
          {emailData ? (
            <div>
              <h4 className='mb-3'>{emailData.subject}</h4>
              <h5 className='mb-3'>{sendBy ? sendBy : selectedUserName}</h5>
              <div>
                <span className='gray-color'>Posted:</span>{' '}
                <span>
                  {moment(emailData.createdAt).format('DD.MM.YYYY HH:MM:SS')}
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
          {/* Hello Denis,
                </p>

                <p>we have the following offer for you: Searched for</p>

                <p>qualification: Elderly care</p>

                <p>
                  01.01. ND 8.0h: old people's home near Bielefeld (code: Q9T3M)
                  Services by arrangement. Accommodation is provided. Double
                  services possible. Please let us know your availability by
                  email ! Fee: freely negotiable Best regards Marc Erdtmann Tel:
                  +49.30.644 99 444 Fax: +49.30.644 99 445 E-Mail:
                  Kontakt@plycoco.de www.plycoco.de Plycoco GmbH Am Borsigturm 6
                  13507 Berlin Entry in the commercial register: Register court
                  : District court Berlin-Charlottenburg, registration number:
                  HRB 150746, managing 
                  </p>*/
          /* <div className='mt-3  mb-1'>Thanks and Regards</div>
                <div className='h6'>John die</div>*/}
        </div>
      </div>
    </Col>
  );
};
