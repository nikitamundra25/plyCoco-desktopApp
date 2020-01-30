import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Card,
  Col,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { ILoginState } from '../../../../interfaces';

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
                  <FormGroup className='position-relative mb-4'>
                    <InputGroup>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='icon-user' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        type={'text'}
                        name={'email'}
                        className={'form-control'}
                        placeholder={'Enter email'}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className='position-relative mb-4'>
                    <InputGroup>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='icon-lock' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        type={'password'}
                        name={'password'}
                        className={'form-control'}
                        placeholder={'Enter Password'}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
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
