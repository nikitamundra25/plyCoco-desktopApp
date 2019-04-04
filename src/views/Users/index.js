import * as moment from "moment";
import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledTooltip,
  Label,
  Input,
  FormGroup,
  InputGroup,
  Form,
  Badge,
  Button,
} from "reactstrap";
import { AppConfig } from "../../Config";
import { AppRoutes } from "../../Config/AppRoutes";
import Loader from "../../containers/Loader/Loader";
import { logger } from "../../Helpers/Logger";
import PaginationHelper from "../../Helpers/Pagination";
import { ConfirmBox } from "../../Helpers/SweetAlert";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalCount: 0,
      selectedPage: 1,
      limit: 10,
      skip: 0,
      search: "",
      isActive: true,
      statusActive: "",
      isLoading: true,
    };
  }
  handleChange = e => {
    const { target } = e;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      this.setState({
        isLoading: true,
        users: [],
      });
      this.setState({
        users: [],
        totalCount: 100,
        isLoading: false,
      });
    } catch (error) {
      logger(error);
      this.setState({
        isLoading: false,
        users: [],
      });
    }
  };

  handleSelected = async page => {
    this.setState(
      {
        selectedPage: page,
        skip: this.state.limit * (page - 1),
      },
      () => {
        this.getUsers();
      }
    );
  };

  delete = async (id, isDeleted) => {
    const { value } = await ConfirmBox({
      title: "Are you sure?",
      text: "Do you want to delete this Project Manager!",
    });
    if (!value) {
      return;
    }
    toast.success("Project Manager deleted successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  activePM = async (id, isActive) => {
    try {
      const { value } = await ConfirmBox({
        title: "Are you sure?",
        text:
          isActive === true
            ? "Do you want to activate this PM"
            : "Do you want to deactivate this PM",
      });
      if (!value) {
        return;
      }
      toast.success(
        isActive === true
          ? "Project Manager activated successfully"
          : "Project Manager deactivated successfully",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    } catch (error) {
      logger(error);
    }
  };

  handleCheckAllCheckBox = e => {
    const { target } = e;
    const { checked } = target;
    const { users } = this.state;
    if (!checked) {
      this.setState({
        ids: [],
      });
    } else {
      const ids = [];
      for (let i = 0; i < users.length; i++) {
        const element = users[i];
        ids.push(element._id);
      }
      this.setState({
        ids: ids,
      });
    }
  };

  handleCheckboxChange = e => {
    const { target } = e;
    const { checked, value } = target;
    const { ids } = this.state;
    if (checked) {
      ids.push(value);
    } else {
      var index = ids.indexOf(value);
      if (index !== -1) {
        ids.splice(index, 1);
      }
    }
    this.setState({
      ids,
    });
  };

  handleActionChange = e => {
    const { ids } = this.state;
    if (!ids.length) {
      toast.info("Please select at least one user.");
      return;
    }
    const value = e.target.value;
    if (value.toLowerCase() === "active") {
      logger("Activate Users");
    } else if (value.toLowerCase() === "deactive") {
      logger("Deactivate Users");
    } else if (value.toLowerCase() === "Delete") {
      logger("Delete Users");
    }
  };
  onSearch = async e => {
    e.preventDefault();
    this.setState(
      {
        selectedPage: 1,
        skip: 0,
      },
      () => {
        this.getUsers();
      }
    );
  };

  onReset = async e => {
    e.preventDefault();
    this.setState(
      {
        search: "",
        selectedPage: 1,
        skip: 0,
        statusActive: "",
        ids: "",
      },
      () => {
        this.getUsers();
      }
    );
  };

  render() {
    const {
      users,
      isLoading,
      totalCount,
      limit,
      skip,
      selectedPage,
      search,
      statusActive,
      ids,
    } = this.state;
    return (
      <Row>
        <Col xs={"12"} lg={"12"}>
          <Card>
            <CardHeader>
              <h4>
                <i className="fa fa-users" /> Users
              </h4>
              <Button
                color={"primary"}
                className={"pull-right"}
                id={"add-new-pm-tooltip"}
                onClick={() => {
                  this.props.history.push(AppRoutes.PM_PROFILE_ADD);
                }}
              >
                <i className={"fa fa-plus"} />&nbsp; Add New User
              </Button>
              <UncontrolledTooltip target={"add-new-pm-tooltip"}>
                Add New User
              </UncontrolledTooltip>
            </CardHeader>
            <CardBody>
              <div className={"filter-block"}>
                <Form onSubmit={this.onSearch}>
                  <Row>
                    <Col lg={"3"} md={"3"} className="mb-0">
                      <FormGroup className="mb-0">
                        <Label className="label">Search</Label>
                        <InputGroup className="mb-2">
                          <input
                            type="text"
                            name="search"
                            onChange={this.handleChange}
                            className="form-control"
                            aria-describedby="searchUser"
                            placeholder="Search by name and email"
                            value={search}
                          />
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col lg={"3"} md={"3"} className="mb-0">
                      <FormGroup className="mb-0">
                        <Label for="exampleSelect" className="label">
                          Status
                        </Label>
                        <Input
                          type="select"
                          name="statusActive"
                          id="exampleSelect"
                          value={statusActive}
                          onChange={this.handleChange}
                        >
                          <option className="form-control" value={""}>
                            -- Select Status --
                          </option>
                          <option value={true}>Active</option>
                          <option value={false}>Deactive</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col lg={"3"} md={"3"} className="mb-0">
                      <div className="filter-btn-wrap">
                        <Label className="height17 label" />
                        <div className="form-group mb-0">
                          <span className="mr-2">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              id="Tooltip-1"
                            >
                              <i className="fa fa-search" />
                            </button>
                            <UncontrolledTooltip target="Tooltip-1">
                              Search
                            </UncontrolledTooltip>
                          </span>
                          <span className="">
                            <button
                              type="button"
                              className="btn btn-danger"
                              id="Tooltip-2"
                              onClick={this.onReset}
                            >
                              <i className="fa fa-refresh" />
                            </button>
                            <UncontrolledTooltip target={"Tooltip-2"}>
                              Reset all filters
                            </UncontrolledTooltip>
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th width="90px">
                      {users.length ? (
                        <div className="table-checkbox-wrap">
                          <span className="checkboxli checkbox-custom checkbox-default">
                            <Input
                              type="checkbox"
                              name="checkbox"
                              id="checkAll"
                              checked={ids.length === users.length}
                              onChange={this.handleCheckboxChange}
                            />
                            <label className="" for="checkAll" />
                          </span>
                          <Input
                            className="commonstatus"
                            type="select"
                            id="exampleSelect"
                            value={ids}
                            onChange={this.handleActionChange}
                          >
                            <option>Select Status</option>
                            <option value={"active"}>Active</option>
                            <option value={"deactive"}>Deactive</option>
                            <option value={"delete"}>Delete</option>
                          </Input>
                        </div>
                      ) : null}
                    </th>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company Name</th>
                    <th className="text-center">Invitation Status</th>
                    <th>Last Login</th>
                    <th>Created Date</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td className={"table-loader"} colSpan={12}>
                        <Loader />
                      </td>
                    </tr>
                  ) : users.length ? (
                    users.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="checkbox-custom checkbox-default coloum-checkbox">
                              <Input
                                type="checkbox"
                                value={item._id}
                                checked={this.state.ids.indexOf(item._id) > -1}
                                name="checkbox"
                                onChange={this.handleCheckboxChnage}
                              />
                              <label for={Math.random()}>
                                {skip + index + 1}.
                              </label>
                            </div>
                          </td>
                          <td>{skip + index + 1}</td>
                          <td
                            className={"view-link"}
                            onClick={() => {
                              logger("Open User details");
                              this.props.history.push(AppRoutes.USERS);
                            }}
                          >
                            {item.fullName}
                          </td>
                          <td>{item.email}</td>
                          <td className="text-center">
                            <Badge
                              color={
                                item.isAccept === "pending" ? (
                                  "warning"
                                ) : (
                                  "success"
                                )
                              }
                            >
                              {item.isAccept}
                            </Badge>
                          </td>
                          <td>
                            {item.isAccept === "pending" ? (
                              "-"
                            ) : (
                              moment(item.lastLogin).format(
                                AppConfig.defaultDateFormat
                              )
                            )}
                          </td>
                          <td>
                            {moment(item.createdAt).format(
                              AppConfig.defaultDateFormat
                            )}
                          </td>
                          <td className="text-center status-btn-wrap">
                            {item.isActive && item.isActive === true ? (
                              <React.Fragment>
                                <button
                                  type="button"
                                  onClick={() => {
                                    this.activePM(item._id, false);
                                  }}
                                  className="btn btn-primary btn-sm"
                                  id={`tooltip-active-${item._id}`}
                                >
                                  Active
                                </button>
                                <UncontrolledTooltip
                                  target={`tooltip-active-${item._id}`}
                                >
                                  {`Click to deactive ${item.fullName}`}
                                </UncontrolledTooltip>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <button
                                  type="button"
                                  onClick={() => {
                                    this.activePM(item._id, true);
                                  }}
                                  className="btn btn-danger btn-sm"
                                  id={`tooltip-deactive-${item._id}`}
                                >
                                  Deactive
                                </button>
                                <UncontrolledTooltip
                                  target={`tooltip-deactive-${item._id}`}
                                >
                                  {`Click to activate ${item.fullName}`}
                                </UncontrolledTooltip>
                              </React.Fragment>
                            )}
                          </td>
                          <td className="text-center action-btn-wrap">
                            <button
                              type="button"
                              className="btn btn-sm"
                              onClick={() =>
                                this.props.history.push(
                                  AppRoutes.PM_PROFILE_DETAILS.replace(
                                    ":id",
                                    item._id
                                  )
                                )}
                              id={`tooltip-view-${item._id}`}
                            >
                              <i className="fa fa-eye" />
                            </button>
                            <UncontrolledTooltip
                              target={`tooltip-view-${item._id}`}
                            >
                              {`View details of ${item.fullName}`}
                            </UncontrolledTooltip>

                            <button
                              type="button"
                              className="btn btn-sm"
                              onClick={() =>
                                this.props.history.push(
                                  AppRoutes.PM_PROFILE_EDIT.replace(
                                    ":id",
                                    item._id
                                  )
                                )}
                              id={`tooltip-edit-${item._id}`}
                            >
                              <i className="fa fa-edit" />
                            </button>
                            <UncontrolledTooltip
                              target={`tooltip-edit-${item._id}`}
                            >
                              {`Edit details of ${item.fullName}`}
                            </UncontrolledTooltip>
                            <button
                              type="button"
                              className="btn btn-sm red"
                              onClick={() => {
                                this.delete(item._id, true);
                              }}
                              id={`tooltip-delete-${item._id}`}
                            >
                              <i className="fa fa-trash" />
                            </button>
                            <UncontrolledTooltip
                              target={`tooltip-delete-${item._id}`}
                            >
                              {`Delete ${item.fullName}`}
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={"12"} className={"text-center"}>
                        No User Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {!isLoading && totalCount > limit ? (
                <PaginationHelper
                  totalRecords={totalCount}
                  onPageChanged={this.handleSelected}
                  currentPage={selectedPage}
                />
              ) : null}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Users;
