import React, { useEffect, useState, FunctionComponent } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { AppRoutes } from "../../config";
import { RouteComponentProps } from "react-router";
import { AppBreadcrumb } from "@coreui/react";
import routes from "../../routes/routes";
import Search from "../../common/SearchFilter";
import { toast } from "react-toastify";
import ButtonTooltip from "../../common/Tooltip/ButtonTooltip";
import { languageTranslation } from "../../helpers";
const userData = [
  {
    region: 'Central Germany',
    canstitution: '1',
    careGiver: '5',
    appointment: '12',
  },
  {
    region: 'Frankfurt',
    canstitution: '3',
    careGiver: '2',
    appointment: '10',
  },
  {
    region: 'Munich',
    canstitution: '1',
    careGiver: '8',
    appointment: '15',
  },
  {
    region: 'North Germany',
    canstitution: '4',
    careGiver: '1',
    appointment: '10',
  },
];
export const Region: FunctionComponent = () => {
  // class Region extends Component<RouteComponentProps, any> {
  //   render() {
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
        <Button
          color={"primary"}
          className={"btn-add"}
          id={"add-new-pm-tooltip"}
          onClick={() => {
            toast.error("Add region");
            // this.props.history.push(AppRoutes.ADD_REGION);
          }}
        >
          <i className={"fa fa-plus"} />
          &nbsp; Add New Region
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          {/* <Search /> */}
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
              <th>Region Name</th>
              <th className="text-center">Number of Canstitution</th>
              <th className="text-center">Number of Care Givers</th>
              <th className="text-center">
                Current ongoing appointments counter
              </th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index): any => {
              return (
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
                  <td>{user.region}</td>
                  <td className="text-center">{user.canstitution}</td>
                  <td className="text-center">{user.careGiver}</td>
                  <td className="text-center">{user.appointment}</td>
                  <td>
                    <div className="action-btn">
                      <ButtonTooltip
                        id={`careGiverDelete${index}`}
                        message={languageTranslation("REGION_DELETE")}
                      >
                        <i className="fa fa-trash"></i>
                      </ButtonTooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Region;
