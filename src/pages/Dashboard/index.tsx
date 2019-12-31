import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

class Dashboard extends Component {
  render() {
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col xs='12' sm='12' lg='12'>
            <Card>
              <Card.Body>
                <h4 className={'text-center'}>Coming Soon</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
