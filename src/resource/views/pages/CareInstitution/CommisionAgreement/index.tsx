import React, { FunctionComponent } from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';

const CommisionAgreement: FunctionComponent = () => {
  return (
    <div>
      <Row>
        <Col xs={'12'} lg={'12'}>
          <Card>
            <CardBody>{languageTranslation("COMISSION_AGREEMENT")} </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CommisionAgreement;
