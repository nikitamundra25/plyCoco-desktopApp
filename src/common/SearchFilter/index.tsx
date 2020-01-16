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
import { useHistory, useLocation } from 'react-router-dom';
import { Region, SortOptions, StatusOptions } from '../../config';
import { languageTranslation, logger } from '../../helpers';
import { FormikProps, Form } from 'formik';
import {
  ISearchValues,
  IReactSelectInterface,
  ISearchProps,
} from '../../interfaces';

const Search: FunctionComponent<FormikProps<ISearchValues> & ISearchProps> = (
  props: FormikProps<ISearchValues> & ISearchProps,
) => {
  let history = useHistory();
  let { pathname } = useLocation();
  const {
    values: { searchValue, sortBy, isActive },
    label,
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
          {label === 'employee' ? (
            <Col lg={'2'}>
              <FormGroup>
                <Label for='Selectregion' className='col-form-label'>
                  {languageTranslation('STATUS_LABEL')} :
                </Label>
                <Select
                  placeholder={languageTranslation('STATUS_LABEL')}
                  options={StatusOptions}
                  value={isActive}
                  onChange={(value: any) => handleSelect(value, 'isActive')}
                />
              </FormGroup>
            </Col>
          ) : (
            ''
          )}
          <Col lg={'2'}>
            <div className='label-height'></div>
            <div className='filter-btn-wrap'>
              <span
                className='btn-filter mr-2'
                id='search1'
                onClick={() => {
                  handleSubmit();
                }}
              >
                <UncontrolledTooltip placement='top' target='search1'>
                  {languageTranslation('SEARCH_LABEL')}
                </UncontrolledTooltip>
                <i className='fa fa-search'></i>
              </span>
              <span
                className='btn-filter mr-2'
                id='reset'
                onClick={() => {
                  history.push(pathname);
                }}
              >
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
