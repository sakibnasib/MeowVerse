import {
  createBrowserRouter
} from "react-router";
import Home from "../Pages/Home";
import MainLayout from "../layouts/MainLayout";
import AboutPage from "../Pages/AboutPage/AboutPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
   Component: MainLayout,
   children:[
    {index:true, Component:Home},
    {path:'about',Component:AboutPage}
   ]
  },
  {path:'/auth',Component: AuthLayout,
    children:[
      {path:'login',Component:Login},
      {path:"register", Component:Register}
    ]
  }
]);

export default router;
