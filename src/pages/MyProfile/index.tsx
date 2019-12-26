import React, { Component } from './node_modules/react';
import { ILoginState } from '../../interfaces';
import {
  InputGroup,
  Button,
  Col,
  FormGroup,
  Card,
  Form,
  Row,
} from './node_modules/react-bootstrap';

class MyProfile extends Component<any, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: '',
      },
    });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
    } catch (error) {}
  };
  render() {
    return (
      <div className='cr-page px-3 min-height650'>
        <Row>
          <Col xs='6' sm='6' lg='6'>
            <Card>
              <Card.Body>
                <h4>
                  <i className='fa fa-edit' />
                  &nbsp;My Profile
                </h4>
                <Form>
                  <Form.Group className='position-relative mb-4'>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id='inputGroupPrepend'>
                          <i className='icon-user' />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <input
                        type={'text'}
                        name={'email'}
                        className={'form-control'}
                        placeholder={'Enter email'}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className='position-relative mb-4'>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id='inputGroupPrepend'>
                          <i className='icon-lock' />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <input
                        type={'password'}
                        name={'password'}
                        className={'form-control'}
                        placeholder={'Enter Password'}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Col sm={2}>
                    <Button
                      type='submit'
                      color={'primary'}
                      className={'pull-right'}
                    >
                      Update Profile
                    </Button>
                  </Col>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MyProfile;
