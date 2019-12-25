import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Card,
  CardHeader, 
  Label,
  CardBody,
   CardGroup,
Container,
  Input,
  Col,
  Row,
  Form
} from "reactstrap";
import { AppRoutes } from '../../config';
import { ILoginProps, ILoginState } from '../../interfaces';

class Login extends Component<any, ILoginState> {
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
  componentDidMount = () => {
    if (localStorage.getItem('token')) {
      this.props.history.push(AppRoutes.HOME);
    }
  };

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
      const { email, password } = this.state;
      const data = {
        email,
        password,
      };
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <div className="logo">
                <img src={""} alt="" />
              </div>
              <CardGroup>
                <Card className="login-card">
                  <CardHeader>Sign In</CardHeader>
                  <CardBody>
                    <Form onSubmit={this.handleSubmit} className="form-section">
                      <p className="sub-title text-center">
                        Sign In to your account
                      </p>

                      <FormGroup row>
                        <Label for="exampleEmail" md={3}>
                          Email<span className="required"> *</span>
                        </Label>
                        <Col md={9}>
                          <Input
                            type={"text"}
                            name={"email"}
                            placeholder={"Enter email"}
                            onChange={this.handleChange}
                            value={email}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="examplepassword" md={3}>
                          Password<span className="required"> *</span>
                        </Label>
                        <Col md={9}>
                          <Input
                            type={"password"}
                            name={"password"}
                            placeholder={"Enter password"}
                            onChange={this.handleChange}
                            value={password}
                          />
                        </Col>
                      </FormGroup>

                      {/* <Form.Group className='position-relative mb-4'>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id='inputGroupPrepend'>
                              <i className='icon-user' />
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <input
                            type={'text'}
                            name={'email'}
                            value={email}
                            className={'form-control'}
                            placeholder={'Enter email'}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.email}
                        </div>
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
                            value={password}
                            className={'form-control'}
                            placeholder={'Enter Password'}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.password}
                        </div>
                      </Form.Group> */}
                      <Row>
                        <Col md="3"></Col>
                        <Col md="9">
                          <Button
                            type={"submit"}
                            color="link"
                            className="px-4 login-btn"
                          >
                            Login
                          </Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
