//main
import Dashboard from "../MainPage/Main/Dashboard";
import Apps from "../MainPage/Main/Apps";
import ProfilePage from "../MainPage/Pages/Profile";
import Pages from "../MainPage/Pages/Pages";
import Employees from "../MainPage/Employees";
import Projects from "../MainPage/Employees/Projects";
import Employee from "../MainPage/Employees/Employees";

export default [
  {
    path: "main",
    component: Dashboard,
  },
  {
    path: "apps",
    component: Apps,
  },
  {
    path: "employee",
    component: Employee,
  },
  {
    path: "employees",
    component: Employees,
  },
  {
    path: "projects",
    component: Projects,
  },
  {
    path: "profile",
    component: ProfilePage,
  },
  {
    path: "pages",
    component: Pages,
  },
];
