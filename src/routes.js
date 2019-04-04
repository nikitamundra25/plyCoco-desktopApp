import React from "react";
import { AppRoutes } from "./Config";

const Dashboard = React.lazy(() => import("./views/Dashboard/Dashboard"));
const MyProfile = React.lazy(() => import("./views/MyProfile/MyProfile"));

const Setting = React.lazy(() => import("./views/Settings"));

const Users = React.lazy(() => import("./views/Users"));

const routes = [
  { path: AppRoutes.MAIN, exact: true, name: "Home" },
  {
    path: AppRoutes.HOME,
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: AppRoutes.MY_PROFILE,
    exact: true,
    name: "My Profile",
    component: MyProfile,
  },
  {
    path: AppRoutes.SETTINGS,
    exact: true,
    name: "Settings",
    component: Setting,
  },
  {
    path: AppRoutes.USERS,
    exact: true,
    name: "Users",
    component: Users,
  },
];

export default routes;
