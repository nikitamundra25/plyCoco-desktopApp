import React from "react";
import { AppRoutes } from "./Config";

const Users = React.lazy(() => import("./views/Users"));

const routes = [
  { path: AppRoutes.MAIN, exact: true, name: "Home" },
  {
    path: AppRoutes.USERS,
    exact: true,
    name: "Users",
    component: Users,
  },
];

export default routes;
