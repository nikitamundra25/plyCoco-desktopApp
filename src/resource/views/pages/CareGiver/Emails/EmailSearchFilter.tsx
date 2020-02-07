import React, { FunctionComponent } from 'react';
import {
  Col,
  Row,
  Button,
  UncontrolledTooltip,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import { IEmailSearchFilterProps } from '../../../../../interfaces';
import { languageTranslation } from '../../../../../helpers';

export const EmailSearchFilter: FunctionComponent<IEmailSearchFilterProps> = ({
  searchBy,
  handleChange,
  handleSubmit,
  onReset,
}: IEmailSearchFilterProps) => {
  return (
    <div className='filter-form form-section'>
      <Form onSubmit={handleSubmit} className={'row'}>
        <Col lg={'9'}>
          <FormGroup className='mb-2'>
            <Input
              type='text'
              name='search'
              value={searchBy}
              id='search'
              placeholder={languageTranslation('SEARCH_PLACEHOLDER')}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col lg={'3'}>
          <div className='filter-btn-wrap mb-2'>
            <Button className='btn-filter mr-2' id='search1'>
              <UncontrolledTooltip placement='top' target='search1'>
                {languageTranslation('SEARCH_LABEL')}
              </UncontrolledTooltip>
              {languageTranslation('SEARCH_LABEL')}
            </Button>
            <Button className='btn-filter mr-2' id='reset' onClick={onReset}>
              <UncontrolledTooltip placement='top' target='reset'>
                {languageTranslation('RESET_LABEL')}
              </UncontrolledTooltip>
              {languageTranslation('RESET_LABEL')}
            </Button>
          </div>
        </Col>
      </Form>
    </div>
  );
};
