import { AppRoutes } from './config';
export default {
  items: [
    {
      name: "Employees",
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
    }
  ]
};
