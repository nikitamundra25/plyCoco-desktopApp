import React, { Component, FunctionComponent } from 'react';
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
  Form,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from 'reactstrap';
import { AppRoutes } from '../../config';
import { useHistory } from 'react-router-dom';
import { AppBreadcrumb } from '@coreui/react';
import routes from '../../routes/routes';
import Search from '../../common/SearchFilter';
import { languageTranslation } from '../../helpers';
import ButtonTooltip from '../../common/Tooltip/ButtonTooltip';
import { useQuery } from '@apollo/react-hooks';
import { EmployeeQueries } from '../../queries';
const userData = [
  {
    name: 'Sir John Doe',
    email: 'john@gmail.com',
    phone: '+49 564575678',
    region: ['North Germany', 'Cologne', ' Frankfurt'],
    assignedCanstitution: '3',
  },
  {
    name: 'Sir Martin Lee',
    email: 'martinlee@gmail.com',
    phone: '+49 564575678',
    region: ['Cologne', 'Munich', ' Frankfurt'],
    assignedCanstitution: '3',
  },
  {
    name: 'Sir Tim Cooper',
    email: 'coopert@gmail.com',
    phone: '+49 564575678',
    region: ['Central Germany', ' Frankfurt'],
    assignedCanstitution: '3',
  },
  {
    name: 'Sir Ritchie Hudson',
    email: 'hudson@gmail.com',
    phone: '+49 564575678',
    region: ['Central Germany', 'Munich'],
    assignedCanstitution: '3',
  },
  {
    name: 'Sir Mark Potter',
    email: 'mark@gmail.com',
    phone: '+49 564575678',
    region: ['Central Germany', 'North Germany'],
    assignedCanstitution: '3',
  },
];

const Employee: FunctionComponent = () => {
  let history = useHistory();
  // const [, , GET_EMPLOYEES] = EmployeeQueries;
  // // To fetch the list of employees
  // const { data, loading, error, refetch } = useQuery<any>(GET_EMPLOYEES);
  const tableData: any[] = [];
  userData.map((user, index): any => {
    return tableData.push(
      <tr>
        <td>
          <div className='table-checkbox-wrap'>
            <div className='btn-group btn-check-action-wrap'>
              <span className='btn'>
                <span className='checkboxli checkbox-custom checkbox-default'>
                  <input type='checkbox' id='checkAll' className='' />
                  <label className=''></label>
                </span>
              </span>
              <span className='checkbox-no'>{index + 1}</span>
            </div>
          </div>
        </td>
        <td>
          <div className='info-column'>
            <div className='img-column'>
              <img
                src='https://www.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg'
                className='img-fluid'
              />
            </div>
            <div className='description-column'>
              <div className='info-title'>{user.name}</div>
              <p className='description-text'>
                <i className='fa fa-envelope mr-2'></i>
                <span className='align-middle'>{user.email}</span>
              </p>
              <p className='description-text'>
                <i className='fa fa-phone mr-2'></i>
                <span className='align-middle'>{user.phone}</span>
              </p>
            </div>
          </div>
        </td>
        <td>
          <div className='description-column  ml-0'>
            {user.region
              ? user.region.map(region => (
                  <p className='description-text '>
                    <span className='text-label mr-1'>
                      <i className='fa fa-angle-right'></i>
                    </span>
                    <span className='align-middle'>{region}</span>
                  </p>
                ))
              : null}
          </div>
        </td>
        <td className='text-center'>
          <div>{user.assignedCanstitution}</div>
        </td>
        <td className='text-center'>
          <span
            className={`status-btn ${index % 2 === 0 ? 'active' : 'inactive'}`}
          >
            {index % 2 === 0
              ? languageTranslation('ACTIVE')
              : languageTranslation('DISABLE')}
          </span>
        </td>
        <td>
          <div className='action-btn'>
            <ButtonTooltip
              id={`edit${index}`}
              message={languageTranslation('EMP_EDIT')}
              // onclick={() => this.props.history.push(AppRoutes.EDIT_EMPLOYEE)}
            >
              {' '}
              <i className='fa fa-pencil'></i>
            </ButtonTooltip>
            <ButtonTooltip
              id={`view${index}`}
              message={languageTranslation('EMP_VIEW')}
              // onclick={() => this.props.history.push(AppRoutes.VIEW_EMPLOYEE)}
            >
              {' '}
              <i className='fa fa-eye'></i>
            </ButtonTooltip>

            <ButtonTooltip
              id={`delete${index}`}
              message={languageTranslation('EMP_DELETE')}
              // onclick={() => this.props.history.push('')}
            >
              {' '}
              <i className='fa fa-trash'></i>
            </ButtonTooltip>
          </div>
        </td>
      </tr>,
    );
  });
  return (
    <Card>
      <CardHeader>
        <AppBreadcrumb appRoutes={routes} className='w-100 mr-3' />
        <Button
          color={'primary'}
          className={'btn-add'}
          id={'add-new-pm-tooltip'}
          onClick={() => history.push(AppRoutes.ADD_EMPLOYEE)}
        >
          <i className={'fa fa-plus'} />
          &nbsp; Add New Empolyee
        </Button>
      </CardHeader>
      <CardBody>
        <div>
          <Search />
        </div>
        <Table bordered hover responsive>
          <thead className='thead-bg'>
            <tr>
              <th>
                <div className='table-checkbox-wrap'>
                  <div className='btn-group btn-check-action-wrap'>
                    <span className='btn'>
                      <span className='checkboxli checkbox-custom checkbox-default'>
                        <input type='checkbox' id='checkAll' className='' />
                        <label className=''></label>
                      </span>
                    </span>
                    <UncontrolledDropdown className='custom-dropdown'>
                      <DropdownToggle caret color='link' />
                      <DropdownMenu>
                        <DropdownItem>Delete</DropdownItem>
                        <DropdownItem>Active</DropdownItem>
                        <DropdownItem>Disable</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </th>
              <th>{languageTranslation('TABLE_HEAD_EMP_INFO')}</th>
              <th>{languageTranslation('REGION')}</th>
              <th>{languageTranslation('TABLE_HEAD_ASSIGNED_CANSTITUTION')}</th>
              <th>{languageTranslation('STATUS')}</th>
              <th>{languageTranslation('TABLE_HEAD_ACTION')}</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
};
//
//     return (
//       <Card>
//         <CardHeader>
//           <AppBreadcrumb appRoutes={routes} className="w-100 mr-3" />
//           <Button
//             color={"primary"}
//             className={"btn-add"}
//             id={"add-new-pm-tooltip"}
//             onClick={() => this.props.history.push(AppRoutes.ADD_EMPLOYEE)}
//           >
//             <i className={"fa fa-plus"} />
//             &nbsp; Add New Empolyee
//           </Button>
//         </CardHeader>
//         <CardBody>
//           <div>
//             <Search />
//           </div>
//           <Table bordered hover responsive>
//             <thead className="thead-bg">
//               <tr>
//                 <th>
//                   <div className="table-checkbox-wrap">
//                     <div className="btn-group btn-check-action-wrap">
//                       <span className="btn">
//                         <span className="checkboxli checkbox-custom checkbox-default">
//                           <input type="checkbox" id="checkAll" className="" />
//                           <label className=""></label>
//                         </span>
//                       </span>
//                       <UncontrolledDropdown className="custom-dropdown">
//                         <DropdownToggle caret color="link" />
//                         <DropdownMenu>
//                           <DropdownItem>Delete</DropdownItem>
//                           <DropdownItem>Active</DropdownItem>
//                           <DropdownItem>Disable</DropdownItem>
//                         </DropdownMenu>
//                       </UncontrolledDropdown>
//                     </div>
//                   </div>
//                 </th>
//                 <th>{languageTranslation("TABLE_HEAD_EMP_INFO")}</th>
//                 <th>{languageTranslation("REGION")}</th>
//                 <th>
//                   {languageTranslation("TABLE_HEAD_ASSIGNED_CANSTITUTION")}
//                 </th>
//                 <th>{languageTranslation("STATUS")}</th>
//                 <th>{languageTranslation("TABLE_HEAD_ACTION")}</th>
//               </tr>
//             </thead>
//             <tbody>{tableData}</tbody>
//           </Table>
//         </CardBody>
//       </Card>
//     );
//   }
// }

export default Employee;
