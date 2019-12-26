import React from 'react';
import { AppRoutes } from '../config';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Login = React.lazy(() => import('../pages/Login'));
const MyProfile = React.lazy(() => import('../pages/MyProfile'));
const Employee = React.lazy(() => import('../pages/Employee'));
const AddEmployee = React.lazy(() => import('../pages/Employee/AddEmployee'));
const ViewEmployee = React.lazy(() => import('../pages/Employee/ViewEmployee'));
const EditEmployee = React.lazy(() => import('../pages/Employee/EditEmployee'));
const Department = React.lazy(() => import('../pages/Department'));
const AddDepartment = React.lazy(() => import('../pages/Department/AddDepartment'));
const Region = React.lazy(() => import('../pages/Region'));
const AddRegion = React.lazy(() => import('../pages/Region/AddRegion'));

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
  {
    path: AppRoutes.EDIT_EMPLOYEE,
    name: 'Edit Employee',
    component: EditEmployee,
    exact: true,
  },
  {
    path: AppRoutes.DEPARTMENT,
    name: 'Department',
    component: Department,
    exact: true,
  },
  
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
