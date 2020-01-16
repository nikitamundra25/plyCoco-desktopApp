import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Card,
  CardHeader,
  Label,
  CardBody,
  Input,
  Col,
  Row,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip
} from "reactstrap";
import { AppRoutes } from "../../config";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import { CareInstitutionQueries } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import { ICareInstitutionFormValues } from "../../interfaces";
import { RouteComponentProps } from "react-router";

const [
  GET_CARE_INSTITUTION_LIST,
  DELETE_CARE_INSTITUTION,
  UPDATE_CARE_INSTITUTION,
  ADD_CARE_INSTITUTION
] = CareInstitutionQueries;

const CareInstitution = (props: RouteComponentProps) => {
  const { data, loading, error, refetch } = useQuery<any>(
    GET_CARE_INSTITUTION_LIST
  );
  console.log("This is reqired Data", data);
  let userData: [Object] | any;
  if (data) {
    userData = data.getCareInstitutions;
  }
  const tableData: any[] = [];
  <>
    {userData && userData.length
      ? userData.map((user: ICareInstitutionFormValues, index: number) => {
          return tableData.push(
            <tr>
              <td>
                <div className="table-checkbox-wrap">
                  <div className="btn-group btn-check-action-wrap">
                    <span className="btn">
                      <span className="checkboxli checkbox-custom checkbox-default">
                        <input type="checkbox" id="checkAll" className="" />
                        <label className=""></label>
                      </span>
                    </span>
                    <span className="checkbox-no">{index + 1}</span>
                  </div>
                </div>
              </td>
              <td>
                <div className="info-column">
                  <div className="description-column">
                    <div className="info-title">
                      {user.firstName} {user.lastName}
                    </div>
                    <p className="description-text">
                      <i className="fa fa-envelope mr-2"></i>
                      <span className="align-middle">{user.email}</span>
                    </p>
                    <p className="description-text">
                      <i className="fa fa-phone mr-2"></i>
                      <span className="align-middle">
                        {user.phoneNumber ? user.phoneNumber : "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <div className="description-column">
                  <div className="info-title">
                    {user.companyName ? user.companyName : "N/A"}
                  </div>
                  <p className="description-text">
                    <span className="align-middle">
                      {user.shortName ? user.shortName : "N/A"}
                    </span>
                  </p>
                  <p className="description-text">
                    <span className="align-middle">
                      {user.userName ? user.userName : "N/A"}
                    </span>
                  </p>
                </div>
              </td>
              <td className="text-center">
                <span
                  className={`status-btn ${
                    index % 2 === 0 ? "active" : "inactive"
                  }`}
                >
                  {userData.isActive === null ? "Active" : "Disable"}
                </span>
              </td>
              <td>
                <div className="action-btn">
                  <span
                    className="btn-icon mr-2"
                    id={`edit${index}`}
                    onClick={() =>
                      props.history.push(AppRoutes.CARE_INSTITUION_VIEW)
                    }
                  >
                    <UncontrolledTooltip
                      placement="top"
                      target={`edit${index}`}
                    >
                      Click here to edit employee
                    </UncontrolledTooltip>
                    <i className="fa fa-pencil"></i>
                  </span>
                  <span className="btn-icon mr-2" id={`view${index}`}>
                    <UncontrolledTooltip
                      placement="top"
                      target={`view${index}`}
                    >
                      Click here to view Constitution
                    </UncontrolledTooltip>
                    <i className="fa fa-eye"></i>
                  </span>
                  <span
                    className="btn-icon "
                    id={`delete${index}`}
                    onClick={() => props.history.push("")}
                  >
                    <UncontrolledTooltip
                      placement="top"
                      target={`delete${index}`}
                    >
                      Click here to delete employee
                    </UncontrolledTooltip>
                    <i className="fa fa-trash"></i>
                  </span>
                </div>
              </td>
            </tr>
          );
        })
      : tableData.push(
          <tr className={"text-center"}>
            <td colSpan={5}>
              <div className="no-data-section">
                <div className="no-data-icon">
                  <i className="icon-ban" />
                </div>
                <h4 className="mb-1">
                  Currently there are No care institution Added.{" "}
                </h4>
                <p>Please click above button to add new. </p>
              </div>

              <div className="no-search-section">
                <div className="no-data-icon">
                  <i className="icon-magnifier" />
                </div>
                <h4 className="mb-1">No details found related your search </h4>
                <div className="text-left search-text">
                  <p>
                    <span className="pr-2">&#8226;</span>Try to simplify your
                    search
                  </p>
                  <p>
                    <span className="pr-2">&#8226;</span>Use different keywords
                  </p>
                  <p>
                    <span className="pr-2">&#8226;</span>Make sure words are
                    spelled correctly
                  </p>
                </div>
              </div>
            </td>
          </tr>
         
        )}
  </>;
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <Button
          color={"primary"}
          className={"btn-add"}
          id={"add-new-pm-tooltip"}
          onClick={() => props.history.push(AppRoutes.ADD_CARE_INSTITUTION)}
          
        >
          <i className={"fa fa-plus"} />
          &nbsp; Add New Care Institution
        </Button>
      </CardHeader>
      <CardBody>
        <div className="filter-form form-section">
          <Row>
            <Col lg={"2"}>
              <FormGroup>
                <Label for="search" className="col-form-label">
                  Search:
                </Label>
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search.."
                />
              </FormGroup>
            </Col>
            <Col lg={"2"}>
              <FormGroup>
                <Label for="Selectregion" className="col-form-label">
                  Region:
                </Label>
                <Input type="select" name="region" id="Selectregion">
                  <option>Western India</option>
                  <option>East India</option>
                  <option>South India</option>
                  <option>Northeast India</option>
                  <option>Central India</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg={"2"}>
              <FormGroup>
                <Label for="Selectregion" className="col-form-label">
                  Sort By:
                </Label>
                <Input type="select" name="region" id="Selectregion">
                  <option>Popularity</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg={"2"}>
              <div className="label-height"></div>
              <div className="filter-btn-wrap">
                <span className="btn-filter mr-2" id="search1">
                  <UncontrolledTooltip placement="top" target="search1">
                    Search
                  </UncontrolledTooltip>
                  <i className="fa fa-search"></i>
                </span>
                <span className="btn-filter mr-2" id="reset">
                  <UncontrolledTooltip placement="top" target="reset">
                    Reset
                  </UncontrolledTooltip>
                  <i className="fa fa-refresh "></i>
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <Table bordered hover responsive>
          <thead className="thead-bg">
            <tr>
              <th>
                <div className="table-checkbox-wrap">
                  <div className="btn-group btn-check-action-wrap">
                    <span className="btn">
                      <span className="checkboxli checkbox-custom checkbox-default">
                        <input type="checkbox" id="checkAll" className="" />
                        <label className=""></label>
                      </span>
                    </span>
                    <UncontrolledDropdown className="custom-dropdown">
                      <DropdownToggle caret color="link" />
                      <DropdownMenu>
                        <DropdownItem>Delete</DropdownItem>
                        <DropdownItem>Active</DropdownItem>
                        <DropdownItem>Disable</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </th>
              <th>Constitution Information</th>
              <th>Company Details</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
export default CareInstitution;
