import { AppRoutes } from "./config";
export default {
  items: [
    {
      name: "Employee",
      icon: "fa fa-users",
      url: AppRoutes.EMPLOYEE
    },
    {
      name: "Department",
      icon: "fa fa-address-book",
      url: AppRoutes.ADD_DEPARTMENT
    },
    {
      name: "Region",
      icon: "fa fa-sitemap",
      url: AppRoutes.REGION
    },
    {
      name: "Care Givers ",
      icon: "fa fa-h-square",
      url: AppRoutes.CARE_GIVER
    },

    {
      name: "Canstitutions",
      icon: "fa fa-sitemap",
      // url: AppRoutes.REGION
    },
    {
      name: "Public Holiday Calendar",
      icon: "fa fa-calendar",
      // url: AppRoutes.REGION
    },
    {
      name: "Attributes ",
      icon: "fa fa-sitemap",
      // url: AppRoutes.REGION
    },
    {
      name: "Documents Templates ",
      icon: "fa fa-file",
      // url: AppRoutes.CARE_GIVER
    },
    {
      name: "Email Templates ",
      icon: "fa fa-envelope",
      // url: AppRoutes.REGION
    }
  ]
};
