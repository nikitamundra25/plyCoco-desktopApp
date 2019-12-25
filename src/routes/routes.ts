import React from 'react';
import { AppRoutes } from '../config';

const Dashboard = React.lazy(() => import('../Pages/Dashboard'));
const Login = React.lazy(() => import('../Pages/Login'));
const MyProfile = React.lazy(() => import('../Pages/MyProfile'));
const AddEmployee = React.lazy(() => import('../Pages/Employee/AddEmployee'));

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
    path: AppRoutes.ADD_EMPLOYEE,
    name: 'Add Employee',
    component: AddEmployee,
    exact: true,
  },
];

export default routes;
