import React, { Component, FunctionComponent } from 'react';
import {
  Col,
  Row,
  FormGroup,
  Input,
  Table,
  UncontrolledTooltip,
  Label
} from 'reactstrap';

import { languageTranslation } from '../../../../helpers';
import Select from 'react-select';
import { Priority, TodoFilter } from '../../../../config';
import CareInstitutionTodo from '../CareInstitutionTodo';

const CareGiverTodo: FunctionComponent = () => {
  return (
    <>
      <CareInstitutionTodo />
    </>
  );
};

export default CareGiverTodo;
