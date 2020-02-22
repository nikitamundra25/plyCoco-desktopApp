import React, { FunctionComponent } from 'react';
import Select from 'react-select';
import {
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  UncontrolledTooltip,
  Button
} from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import {
  SortOptions,
  StatusOptions,
  TodoFilter,
  Priority
} from '../../../../config';
import { languageTranslation, logger } from '../../../../helpers';
import { FormikProps, Form } from 'formik';
import {
  ISearchValues,
  IReactSelectInterface,
  ISearchProps,
  ISearchToDoValues
} from '../../../../interfaces';

const Search: FunctionComponent<FormikProps<ISearchValues & ISearchToDoValues> &
  ISearchProps &
  any> = (
  props: FormikProps<ISearchValues & ISearchToDoValues> & ISearchProps & any
) => {
  let history = useHistory();
  let { pathname } = useLocation();
  const {
    values: { searchValue, sortBy, isActive, toDoFilter, priority, futureOnly },
    label,
    handleSubmit,
    handleChange,
    setFieldValue,
    searchPlacholderText,
    resetForm
  } = props;

  // Custom function to handle react select fields
  const handleSelect = (selectOption: IReactSelectInterface, name: string) => {
    logger(selectOption, 'value');
    setFieldValue(name, selectOption);
  };
  return (
    <div className='filter-form form-section mb-2'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={'3'} md={'3'}>
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
                placeholder={
                  searchPlacholderText
                    ? searchPlacholderText
                    : label === 'employee'
                    ? languageTranslation('SEARCH_EMPLOYEE_PLACEHOLDER')
                    : label === 'care institution'
                    ? languageTranslation('SEARCH_CARE_INSTI_PLACEHOLDER')
                    : label === 'archive'
                    ? languageTranslation('SEARCH_ARCHIVE')
                    : label === 'toDos'
                    ? languageTranslation('SEARCH_BY_REMARKS')
                    : languageTranslation('SEARCH_REGION_PLACEHOLDER')
                }
              />
            </FormGroup>
          </Col>
          {label !== 'toDos' ? (
            <Col lg={'2'} md={'3'}>
              <FormGroup>
                <Label for='Selectregion' className='col-form-label'>
                  {languageTranslation('SORTBY_LABEL')} :
                </Label>
                <Select
                  placeholder={languageTranslation('SORTBY_PLACEHOLDER')}
                  options={SortOptions}
                  isSearchable={false}
                  isClearable={true}
                  value={sortBy && sortBy.value !== '' ? sortBy : null}
                  onChange={(value: any) => handleSelect(value, 'sortBy')}
                  classNamePrefix='custom-inner-reactselect'
                  className={'custom-reactselect'}
                />
              </FormGroup>
            </Col>
          ) : null}
          {label !== 'region' && label !== 'archive' ? (
            label !== 'toDos' ? (
              <Col lg={'2'} md={'3'}>
                <FormGroup>
                  <Label for='Selectregion' className='col-form-label'>
                    {languageTranslation('STATUS_LABEL')} :
                  </Label>
                  <Select
                    placeholder={languageTranslation('STATUS_PLACEHOLDER')}
                    options={StatusOptions}
                    isClearable={true}
                    isSearchable={false}
                    value={isActive && isActive.value !== '' ? isActive : null}
                    onChange={(value: any) => handleSelect(value, 'isActive')}
                    classNamePrefix='custom-inner-reactselect'
                    className={'custom-reactselect'}
                  />
                </FormGroup>
              </Col>
            ) : (
              <Col lg={'2'} md={'3'}>
                <FormGroup>
                  <Label for='Selectregion' className='col-form-label'>
                    {languageTranslation('STATUS_LABEL')} :
                  </Label>
                  <Select
                    placeholder={languageTranslation('STATUS_PLACEHOLDER')}
                    options={TodoFilter}
                    isClearable={true}
                    isSearchable={false}
                    value={
                      toDoFilter && toDoFilter.value !== '' ? toDoFilter : null
                    }
                    onChange={(value: any) => handleSelect(value, 'toDoFilter')}
                    classNamePrefix='custom-inner-reactselect'
                    className={'custom-reactselect'}
                  />
                </FormGroup>
              </Col>
            )
          ) : null}

          {label === 'toDos' ? (
            <Col lg={'2'} md={'3'}>
              <FormGroup>
                <Label for='Selectregion' className='col-form-label'>
                  {languageTranslation('PRIORITY')} :
                </Label>
                <Select
                  placeholder={languageTranslation('PRIORIRY_PLACEHOLDER')}
                  options={Priority}
                  isClearable={true}
                  isSearchable={false}
                  value={priority && priority.value !== '' ? priority : null}
                  onChange={(value: any) => handleSelect(value, 'priority')}
                  classNamePrefix='custom-inner-reactselect'
                  className={'custom-reactselect'}
                />
              </FormGroup>
            </Col>
          ) : null}

          {label === 'toDos' ? (
            <Col lg={'1'} md={'3'}>
              <FormGroup>
                <Label className='col-form-label'>
                  {languageTranslation('FUTURE_ONLY')} :
                </Label>
                <span className='checkboxli checkbox-custom checkbox-default'>
                  <input
                    type='checkbox'
                    id='check'
                    className=''
                    name={'futureOnly'}
                    checked={futureOnly}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const {
                        target: { checked }
                      } = e;
                      setFieldValue('futureOnly', checked);
                    }}
                  />
                  <Label for='check'></Label>
                </span>
              </FormGroup>
            </Col>
          ) : null}

          <Col lg={'2'} md={'3'}>
            <div className='label-height'></div>
            <div className='filter-btn-wrap'>
              <Button
                className='btn-filter mr-2'
                type='submit'
                id='search1'
                onClick={() => {
                  handleSubmit();
                }}
              >
                <UncontrolledTooltip placement='top' target='search1'>
                  {languageTranslation('SEARCH_LABEL')}
                </UncontrolledTooltip>
                <i className='fa fa-search'></i>
                <span className='search-text'>
                  {languageTranslation('SEARCH_LABEL')}
                </span>
              </Button>
              <Button
                className='btn-filter mr-2'
                id='reset'
                onClick={() => {
                  resetForm();
                  // setSearchValues({ searchValues: {} });
                  history.push(pathname);
                }}
              >
                <UncontrolledTooltip placement='top' target='reset'>
                  {languageTranslation('RESET_LABEL')}
                </UncontrolledTooltip>
                <i className='fa fa-refresh '></i>
                <span className='search-text'>
                  {languageTranslation('RESET_LABEL')}
                </span>
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Search;
