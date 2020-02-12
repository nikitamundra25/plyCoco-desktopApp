import React, {
    Component,
    FunctionComponent,
    useCallback,
    useState,
} from 'react';
import { FormGroup, Label, Input, Col, Row, Form, Button,InputGroup,InputGroupAddon,InputGroupText,Table } from 'reactstrap';

import Select from 'react-select';
import { languageTranslation } from '../../../../helpers';
import { State } from '../../../../config';

import displaydoc from '../../../assets/img/display-doc.svg';
import upload from '../../../assets/img/upload.svg';
import visit from '../../../assets/img/visit.svg';
import './index.scss';
import { LanguageAction } from '../../../../store/actions';

const PageNotFound: FunctionComponent = () => {



    return (
        <>
        <div className="page-404">
            <div className="notfound-404">
            <h1 className="heading">4<span>0</span>4</h1>
            <h2 className="sub-heading">the page you requested could not found</h2>
            <Button color="primary ">Go To Home</Button>{' '}
            </div>
           
        </div>
            
        </>
    );
};

export default PageNotFound;
