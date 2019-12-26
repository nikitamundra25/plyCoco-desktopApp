import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';

const ADD_USER = gql`
  mutation AddUser($firstName: String!, $lastName: String, $email: String) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String!
    $lastName: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      id
      firstName
      lastName
    }
  }
`;

class Adduser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      isSuccess: false,
      isUpdateSubmitted: false,
      isAddSubmmitted: false,
      error: false,
      isInvalidEmail: false
    };
  }
  componentDidUpdate = ({ show, setEditable }) => {
    const { userData } = this.props
    if (setEditable !== this.props.setEditable) {
      this.setState({
        userData: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          id: userData.id,
          isSuccess: false,
          isUpdateSubmitted: false,
          isAddSubmmitted: false,
          error: false,
          isInvalidEmail: false
        }
      })
    }
    if (show !== this.props.show && !this.props.setEditable) {
      this.setState({
        isSuccess: false,
        isUpdateSubmitted: false,
        isAddSubmmitted: false,
        error: false,
        isInvalidEmail: false,
        userData: {},
      })
    }
  }

  handleChange = e => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      userData: {
        ...this.state.userData,
        [name]: value
      }
    });
  };

  render() {
    const {
      isEditable,
      show,
      handleClose,
      setEditable,
      refetch,
      GET_USERS
    } = this.props;

    const {
      userData
    } = this.state

    return (
      <>
        <Modal
          isOpen={show}
          toggle={() => {
            handleClose();
          }}
        >
          <ModalHeader toggle={() => {
            handleClose();
          }}>
            {this.props.setEditable === true ? 'Edit Details' : 'Add User'}
          </ModalHeader>
          <ModalBody>
            <Mutation onCompleted={
              () => {
                if (this.state.isUpdateSubmitted) {
                  handleClose()
                  toast.success("User Data updated successfully!")
                }
                if (this.state.isAddSubmmitted) {
                  handleClose()
                  refetch(GET_USERS)
                  toast.success("User Data added successfully!")
                }
                this.setState({
                  isSuccess: true
                })
              }
            } mutation={setEditable ? UPDATE_USER : ADD_USER}
              onError={(error) => {
                if (error) {
                  toast.error("Email already exit!")
                  this.setState({
                    isSuccess: false
                  })
                }
              }}>
              {
                !setEditable ?
                  (addUser, { error, data }) =>
                    (
                      <Form onSubmit={(e) => {
                        e.preventDefault();
                        const { firstName, lastName, email } = userData
                        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!firstName || !lastName || !email) {
                          this.setState({
                            error: true
                          })
                          return
                        } else if (!(re.test(String(userData.email).toLowerCase()))) {
                          this.setState({
                            isInvalidEmail: true
                          })
                          return
                        }
                        addUser({
                          variables: {
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email
                          }
                        });
                        this.setState({
                          isAddSubmmitted: true
                        });
                      }}>
                        <FormGroup>
                          <Label>
                            First Name<span className='required'>*</span>
                          </Label>
                          <Input
                            type='text'
                            name={'firstName'}
                            value={userData.firstName}
                            placeholder='Please Enter First Name'
                            onChange={this.handleChange}
                          />
                          <p className={"text-danger"}>
                            {
                              this.state.error && !userData.firstName ?
                                "First name is required" : null
                            }
                          </p>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Last Name<span className='required'>*</span>
                          </Label>
                          <Input
                            type='text'
                            name={'lastName'}
                            value={userData.lastName}
                            placeholder='Please Enter Last Name'
                            onChange={this.handleChange}
                          />
                          <p className={"text-danger"}>
                            {
                              this.state.error && !userData.lastName ?
                                "Last name is required" : null
                            }
                          </p>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Email Id<span className='required'>*</span>
                          </Label>
                          <Input
                            type='text'
                            disabled={isEditable === true}
                            name={'email'}
                            value={userData.email}
                            placeholder='Please Enter Email'
                            onChange={this.handleChange}
                          />
                          <p className={"text-danger"}>
                            {
                              this.state.error && !userData.email ?
                                "Email name is required" : null
                            }
                            {
                              this.state.isInvalidEmail ?
                                "Enter a valid email address" : null
                            }
                          </p>
                        </FormGroup>
                        <div className={"text-right"}>
                          <Button variant='secondary' type='submit'>
                            Submit
                        </Button>
                        </div>
                      </Form>
                    ) :
                  (updateUser, { error, data }) =>
                    (
                      <Form onSubmit={(e) => {
                        e.preventDefault();
                        try {
                          const { firstName, lastName, email } = userData
                          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                          if (!firstName || !lastName || !email) {
                            this.setState({
                              error: true
                            })
                            return
                          } else if (!(re.test(String(userData.email).toLowerCase()))) {
                            this.setState({
                              isInvalidEmail: true
                            })
                            return
                          }
                          updateUser({
                            variables: {
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              email: userData.email,
                              id: userData.id
                            }
                          });
                          this.setState({
                            isUpdateSubmitted: true,
                          })
                        } catch (error1) {
                          console.log("Errorrrrrrrrrrrrrrrrr", error1);
                        }
                      }}>
                        <FormGroup>
                          <Label>
                            First Name<span className='required'>*</span>
                          </Label>
                          <Input
                            type='text'
                            name={'firstName'}
                            value={userData.firstName}
                            placeholder='Please Enter First Name'
                            onChange={this.handleChange}
                          />
                          <p className={"text-danger"}>
                            {
                              this.state.error && !userData.firstName ?
                                "First name is required" : null
                            }
                          </p>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Last Name<span className='required'>*</span>
                          </Label>
                          <Input
                            type='text'
                            name={'lastName'}
                            value={userData.lastName}
                            placeholder='Please Enter Last Name'
                            onChange={this.handleChange}
                          />
                          <p className={"text-danger"}>
                            {
                              this.state.error && !userData.lastName ?
                                "Last name is required" : null
                            }
                          </p>
                        </FormGroup>
                        <FormGroup>
                          <Label>
                            Email Id<span className='required'>*</span>
                          </Label>
                          <Input
                            type='text'
                            disabled={isEditable === true}
                            name={'email'}
                            value={userData.email}
                            placeholder='Please Enter Email'
                            onChange={this.handleChange}
                          />
                          <p className={"text-danger"}>
                            {
                              this.state.error && !userData.email ?
                                "Email name is required" : null
                            }
                            {
                              this.state.isInvalidEmail ?
                                "Enter a valid email address" : null
                            }
                          </p>
                        </FormGroup>
                        <div className={"text-right"}>
                          <Button variant='secondary' type='submit'>
                            Update
                        </Button>
                        </div>
                      </Form>
                    )
              }
            </Mutation>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
export default Adduser;
