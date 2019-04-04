import { AppRoutes } from "./Config";

export default {
  items: [
    {
      name: "Dashboard",
      url: AppRoutes.HOME,
      icon: "fa fa-dashboard",
    },
    {
      name: "Users",
      icon: "fa fa-users",
      url: AppRoutes.USERS,
    },
    {
      name: "Settings",
      icon: "fa fa-cog",
      url: AppRoutes.SETTINGS,
    },
  ],
};
