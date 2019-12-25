import Validator, { ValidationTypes } from 'js-object-validation';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { AppRoutes } from '../../Config';
import ApiRoutes from '../../Config/ApiRoutes';
import FullPageLoader from '../../../containers/Loader/FullPageLoader';
import { ApiHelper } from '../../Helpers/ApiHelper';
import { logger } from '../../Helpers/Logger';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      oldPassword: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      errors: {},
    };
  }
  componentDidMount() {
    this.getAdminProfile();
  }
  handleChange = e => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getAdminProfile = async e => {
    try {
      const res = await new ApiHelper().FetchFromServer(
        ApiRoutes.GET_SETTINGS.service,
        ApiRoutes.GET_SETTINGS.url,
        ApiRoutes.GET_SETTINGS.method,
        ApiRoutes.GET_SETTINGS.authenticate,
      );
      delete res.data.data.password;
      this.setState(res.data.data);
    } catch (error) {
      logger(error);
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({
      errors: {},
      isLoading: true,
    });
    try {
      const validator = {
        email: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.EMAIL]: true,
        },
        fullName: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MAXLENGTH]: 255,
        },
      };
      const messages = {
        email: {
          [ValidationTypes.REQUIRED]: 'Please enter email address.',
          [ValidationTypes.EMAIL]: 'Please enter valid email address.',
        },
        fullName: {
          [ValidationTypes.REQUIRED]: 'Please enter full name',
          [ValidationTypes.MAXLENGTH]: 'Name must be 255 character long',
        },
      };
      const { email, fullName } = this.state;
      const data = {
        email,
        fullName,
      };
      const { isValid, errors } = Validator(data, validator, messages);
      if (!isValid) {
        this.setState({
          errors,
          isLoading: false,
        });
        return;
      }
      const res = await new ApiHelper().FetchFromServer(
        ApiRoutes.UPDATE_SETTINGS.service,
        ApiRoutes.UPDATE_SETTINGS.url,
        ApiRoutes.UPDATE_SETTINGS.method,
        ApiRoutes.UPDATE_SETTINGS.authenticate,
        undefined,
        data,
      );
      this.setState({
        isLoading: false,
      });
      if (!res.isError) {
        toast.success(res.messages[0], {
          position: toast.POSITION.TOP_RIGHT,
        });
        this.props.history.push(AppRoutes.HOME);
      } else {
        toast.error(res.messages[0], {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  handleChangePasswordSubmit = async event => {
    event.preventDefault();
    try {
      this.setState({
        errors: {},
        isLoading: true,
      });
      const validator = {
        oldPassword: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 6,
          [ValidationTypes.MAXLENGTH]: 255,
        },
        password: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 6,
          [ValidationTypes.MAXLENGTH]: 255,
        },
        confirmPassword: {
          [ValidationTypes.REQUIRED]: true,
          [ValidationTypes.MINLENGTH]: 6,
          [ValidationTypes.MAXLENGTH]: 255,
        },
      };
      const messages = {
        oldPassword: {
          [ValidationTypes.REQUIRED]: 'Please enter old password.',
          [ValidationTypes.MINLENGTH]: 'Password at least 6 character long.',
          [ValidationTypes.MAXLENGTH]: 'Password must be 20 character long',
        },
        password: {
          [ValidationTypes.REQUIRED]: 'Please enter new password',
          [ValidationTypes.MINLENGTH]: 'Password at least 6 character long.',
          [ValidationTypes.MAXLENGTH]: 'Password must be 20 character long',
        },
        confirmPassword: {
          [ValidationTypes.REQUIRED]: 'Please enter confirm password',
          [ValidationTypes.MINLENGTH]: 'Password at least 6 character long.',
          [ValidationTypes.MAXLENGTH]: 'Password must be 20 character long',
        },
      };
      const { oldPassword, password, confirmPassword } = this.state;
      const data = {
        oldPassword,
        password,
        confirmPassword,
      };

      const { isValid, errors } = Validator(data, validator, messages);
      if (!isValid) {
        this.setState({
          errors,
          isLoading: false,
        });
        return;
      }
      const res = await new ApiHelper().FetchFromServer(
        '/user',
        '/changePassword',
        'POST',
        true,
        undefined,
        data,
      );
      this.setState({
        isLoading: false,
      });
      if (!res.isError) {
        toast.success(res.messages[0], {
          position: toast.POSITION.TOP_RIGHT,
        });
        this.props.history.push(AppRoutes.USERS);
      } else {
        toast.error(res.messages[0], {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      logger(error);
    }
  };

  render() {
    const { email, fullName, errors, isLoading } = this.state;
    return (
      <div className='cr-page px-3 min-height650'>
        {isLoading ? <FullPageLoader /> : null}
        <Row>
          <Col xs='6' sm='6' lg='6'>
            <Card>
              <CardHeader>
                <h4>
                  <i className='fa fa-edit' />
                  &nbsp;My Profile
                </h4>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for='username' sm={2}>
                      Name
                    </Label>
                    <Col sm={10}>
                      <Input
                        type='text'
                        name='fullName'
                        id='username'
                        value={fullName}
                        placeholder='Enter Full Name'
                        onChange={this.handleChange}
                      />
                      {errors.fullName ? (
                        <p className={'text-danger'}>{errors.fullName}</p>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for='useremail' sm={2}>
                      Email
                    </Label>
                    <Col sm={10}>
                      <Input
                        type='email'
                        name='email'
                        id='useremail'
                        value={email}
                        placeholder='Enter email address'
                        onChange={this.handleChange}
                      />
                      {errors.email ? (
                        <p className={'text-danger'}>{errors.email}</p>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button
                        type='submit'
                        onClick={this.handleSubmit}
                        color={'primary'}
                        className={'pull-right'}
                      >
                        Update Profile
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col xs='6' sm='6' lg='6'>
            <Card>
              <CardHeader>
                <h4>
                  <i className='fa fa-lock' /> Change Password
                </h4>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for='oldpassword' sm={3}>
                      Old Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        type='password'
                        name='oldPassword'
                        id='oldpassword'
                        placeholder='Enter old password'
                        onChange={this.handleChange}
                      />
                      {errors.oldPassword ? (
                        <p className={'text-danger'}>{errors.oldPassword}</p>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for='newpassword' sm={3}>
                      New Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        type='password'
                        name='password'
                        id='newpassword'
                        placeholder='Enter new password'
                        onChange={this.handleChange}
                      />
                      {errors.password ? (
                        <p className={'text-danger'}>{errors.password}</p>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for='confirmpassword' sm={3}>
                      Confirm Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        type='password'
                        name='confirmPassword'
                        id='confirmpassword'
                        placeholder='Enter confirm password'
                        onChange={this.handleChange}
                      />
                      {errors.confirmPassword ? (
                        <p className={'text-danger'}>
                          {errors.confirmPassword}
                        </p>
                      ) : null}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button
                        type='button'
                        onClick={this.handleChangePasswordSubmit}
                        color={'primary'}
                        className={'pull-right'}
                      >
                        Change Password
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MyProfile;
