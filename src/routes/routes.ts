import React from 'react';
import { AppRoutes } from '../config';

const Dashboard = React.lazy(() => import('../Pages/Dashboard'));
const Login = React.lazy(() => import('../Pages/Login'));
const MyProfile = React.lazy(() => import('../Pages/MyProfile'));
const Employee = React.lazy(() => import('../Pages/Employee'));
const AddEmployee = React.lazy(() => import('../Pages/Employee/AddEmployee'));
const ViewEmployee = React.lazy(() => import('../Pages/Employee/ViewEmployee'));
// const Department = React.lazy(() => import('../Pages/Department'));
const AddDepartment = React.lazy(() => import('../Pages/Department/AddDepartment'));
const Region = React.lazy(() => import('../Pages/Region'));
const AddRegion = React.lazy(() => import('../Pages/Region/AddRegion'));

const routes = [
  { path: AppRoutes.MAIN, exact: true, name: 'Home' },
  {
    path: AppRoutes.HOME,
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    path: AppRoutes.LOGIN,
    name: '',
    component: Login,
    exact: true,
  },
  {
    path: AppRoutes.MY_PROFILE,
    name: 'Profile',
    component: MyProfile,
    exact: true,
  },
  {
    path: AppRoutes.EMPLOYEE,
    name: 'Employee',
    component: Employee,
    exact: true,
  },
  {
    path: AppRoutes.ADD_EMPLOYEE,
    name: 'Add Employee',
    component: AddEmployee,
    exact: true,
  },
  {
    path: AppRoutes.VIEW_EMPLOYEE,
    name: 'View Employee',
    component: ViewEmployee,
    exact: true,
  },
  // {
  //   path: AppRoutes.DEPARTMENT,
  //   name: 'Department',
  //   component: Department,
  //   exact: true,
  // },
  
  {
    path: AppRoutes.ADD_DEPARTMENT,
    name: 'Add Department',
    component: AddDepartment,
    exact: true,
  },
  {
    path: AppRoutes.REGION,
    name: 'Region',
    component: Region,
    exact: true,
  },
  {
    path: AppRoutes.ADD_REGION,
    name: 'Add Region',
    component: AddRegion,
    exact: true,
  },
];

export default routes;
