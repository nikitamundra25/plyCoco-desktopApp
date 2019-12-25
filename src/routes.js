import React from 'react';
import { AppRoutes } from './config';

const Users = React.lazy(() => import('./Pages/Users'));

const routes = [
  { path: AppRoutes.MAIN, exact: true, name: 'Home' },
  {
    path: AppRoutes.USERS,
    exact: true,
    name: 'Users',
    component: Users,
  },
];

export default routes;
