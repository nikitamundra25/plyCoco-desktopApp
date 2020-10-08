import React, { FunctionComponent} from 'react';
import {  Button } from 'reactstrap';
import { languageTranslation } from '../../../../helpers';

const PageNotFound: FunctionComponent = () => {

    return (
        <>
        <div className="page-404">
            <div className="notfound-404">
            <h1 className="heading">4<span>0</span>4</h1>
            <h2 className="sub-heading">{languageTranslation("404_LABEL")} </h2>
            <Button color="primary ">{languageTranslation("GO_TO_HOME")} </Button>{' '}
            </div>
        </div>
        </>
    );
};

export default PageNotFound;
