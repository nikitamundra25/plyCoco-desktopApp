import React, { FunctionComponent } from 'react';
import Select from 'react-select';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { Region, SortOptions } from '../../config';
import { languageTranslation, logger } from '../../helpers';
import { FormikProps, Form } from 'formik';
import { ISearchValues, IReactSelectInterface } from '../../interfaces';

const Search: FunctionComponent<FormikProps<ISearchValues>> = (
  props: FormikProps<ISearchValues>,
) => {
  const {
    values: { searchValue, sortBy },
    handleSubmit,
    handleChange,
    setFieldValue,
  } = props;

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, 'value');
    setFieldValue(name, selectOption);
  };
  return (
    <div className='filter-form form-section'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={'2'}>
            <FormGroup>
              <Label for='search' className='col-form-label'>
                {languageTranslation('SEARCH_LABEL')} :
              </Label>
              <Input
                type='text'
                name='searchValue'
                id='search'
                value={searchValue}
                onChange={handleChange}
                placeholder={languageTranslation('SEARCH_PLACEHOLDER')}
              />
            </FormGroup>
          </Col>
          {/* <Col lg={'2'}>
            <FormGroup>
              <Label className='col-form-label'>
                {languageTranslation('REGION')} :
              </Label>
              <div>
                <Select
                  placeholder={languageTranslation('REGION_PLACEHOLDER')}
                  options={Region}
                  value={IReactSelectInterface}
                />
              </div>
            </FormGroup>
          </Col> */}

          <Col lg={'2'}>
            <FormGroup>
              <Label for='Selectregion' className='col-form-label'>
                {languageTranslation('SORTBY_LABEL')} :
              </Label>
              <Select
                placeholder={languageTranslation('SORTBY_PLACEHOLDER')}
                options={SortOptions}
                value={sortBy}
                onChange={(value: any) => handleSelect(value, 'sortBy')}
              />
            </FormGroup>
          </Col>

          <Col lg={'2'}>
            <div className='label-height'></div>
            <div
              className='filter-btn-wrap'
              onClick={() => {
                handleSubmit();
              }}
            >
              <span className='btn-filter mr-2' id='search1'>
                <UncontrolledTooltip placement='top' target='search1'>
                  {languageTranslation('SEARCH_LABEL')}
                </UncontrolledTooltip>
                <i className='fa fa-search'></i>
              </span>
              <span className='btn-filter mr-2' id='reset'>
                <UncontrolledTooltip placement='top' target='reset'>
                  {languageTranslation('RESET_LABEL')}
                </UncontrolledTooltip>
                <i className='fa fa-refresh '></i>
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Search;
