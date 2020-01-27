import React, { FunctionComponent } from 'react';
import { Row } from 'reactstrap';
import { EmailTemplateMenu } from './Menu';
import { EmailTemplateList } from './List';
import { AddTemplate } from './AddTemplate';
import './index.scss';
import { IEmailTemplateValues } from '../../interfaces';
import { FormikHelpers } from 'formik';

export const EmailTemplateManagement: FunctionComponent = () => {
  const handleSubmit = async (
    values: IEmailTemplateValues,
    { setSubmitting }: FormikHelpers<IEmailTemplateValues>,
  ) => {
    console.log(values, 'values on handle submit');
  };
  return (
    <>
      <div className='common-detail-page'>
        <div className='common-detail-section'>
          <EmailTemplateMenu handleSubmit={handleSubmit} />
          <div className='common-content flex-grow-1'>
            <div>
              <Row>
                <EmailTemplateList />
                <AddTemplate handleSubmit={handleSubmit} />
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailTemplateManagement;
