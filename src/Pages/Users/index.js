import React, { Component } from 'react';
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  UncontrolledTooltip,
} from 'reactstrap';
import { Query } from '@apollo/react-components';
import gql from 'graphql-tag';
// import PaginationHelper from '../../helpers/Pagination';
import Adduser from './Adduser';
import { Mutation } from '@apollo/react-components';
import { toast } from 'react-toastify';
import { ConfirmBox } from '../../helpers/SweetAlert';

const GET_USERS = gql`
  query userList {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedPage: 1,
      limit: 10,
      skip: 0,
      search: '',
      isLoading: true,
      show: false,
      setShow: false,
      isEditable: false,
      setEditable: false,
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        id: '',
      },
      setUserData: {},
    };
  }
  handleChange = e => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      userData: {
        [name]: value,
      },
    });
  };
  handleEditUser = userData => {
    this.setState({
      userData: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        id: userData.id,
      },
      show: true,
      setEditable: true,
    });
  };
  handleUserModal = () => {
    this.setState({
      show: !this.state.show,
      setEditable: false,
    });
  };

  render() {
    const {
      isLoading,
      totalCount,
      limit,
      selectedPage,
      setEditable,
      show,
      isEditable,
      userData,
    } = this.state;

    return (
      <Query query={GET_USERS}>
        {({ data, refetch }) => {
          return (
            <>
              <Row>
                <Col xs={'12'} lg={'12'}>
                  <Card>
                    <CardHeader>
                      <h4>
                        <i className='fa fa-users' /> Users
                      </h4>
                      <Button
                        color={'primary'}
                        className={'pull-right'}
                        id={'add-new-pm-tooltip'}
                        onClick={this.handleUserModal}
                      >
                        <i className={'fa fa-plus'} />
                        &nbsp; Add New User
                      </Button>
                      <UncontrolledTooltip target={'add-new-pm-tooltip'}>
                        Add New User
                      </UncontrolledTooltip>
                    </CardHeader>
                    <CardBody>
                      <Table striped bordered hover responsive>
                        <thead className='thead-dark'>
                          <tr className='text-center'>
                            <th>S No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data &&
                            data.users &&
                            data.users.length &&
                            data.users.map((user, index) => (
                              <tr key={user.id} className='text-center'>
                                <td>{index + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                  <button
                                    className='btn btn-primary'
                                    aria-hidden='true'
                                    onClick={() => {
                                      this.handleEditUser(user);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  &nbsp;&nbsp;&nbsp;
                                  <Mutation mutation={DELETE_USER}>
                                    {(deleteUser, { error, data }) => {
                                      return (
                                        <button
                                          className='btn btn-danger'
                                          aria-hidden='true'
                                          onClick={async () => {
                                            const { value } = await ConfirmBox({
                                              text:
                                                'You want to delete this user!',
                                            });
                                            if (value) {
                                              deleteUser({
                                                variables: {
                                                  firstName: user.firstName,
                                                  lastName: user.lastName,
                                                  email: user.email,
                                                  id: user.id,
                                                },
                                              });
                                              await refetch(GET_USERS);
                                              toast.success(
                                                'User Deleted Successfully!',
                                              );
                                            }
                                          }}
                                        >
                                          Delete
                                        </button>
                                      );
                                    }}
                                  </Mutation>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      {/* {!isLoading && totalCount > limit ? (
                        <PaginationHelper
                          totalRecords={totalCount}
                          onPageChanged={this.handleSelected}
                          currentPage={selectedPage}
                        />
                      ) : null} */}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Adduser
                show={show}
                userData={userData}
                isEditable={isEditable}
                setEditable={setEditable}
                refetch={refetch}
                GET_USERS={GET_USERS}
                handleClose={this.handleUserModal}
                handleChange={this.handleChange}
              />
            </>
          );
        }}
      </Query>
    );
  }
}

export default Users;
