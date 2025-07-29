import {
  createBrowserRouter
} from "react-router";
import Home from "../Pages/Home";
import MainLayout from "../layouts/MainLayout";
import AboutPage from "../Pages/AboutPage/AboutPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Components/Error/Error";
import DashboardLayout from "../layouts/DasboardLayout";
import AddCatForm from "../Pages/Admin/AddCat/AddCat";
import Sellerform from "../Pages/SellerForm/Sellerform";
import BlogPage from "../Pages/BlogPage/BlogPage";

const router = createBrowserRouter([
  {
    path: "/",
   Component: MainLayout,
   errorElement:<ErrorPage/>,
   children:[
    {index:true, Component:Home},
    {path:'about',Component:AboutPage},
    {path:'/blogPage',Component: BlogPage}
   ]
  },
  {path:'/auth',Component: AuthLayout,
    children:[
      {path:'login',Component:Login},
      {path:"register", Component:Register}
    ]
  },
  {path:'/dashboard', Component:DashboardLayout,
    children:[
      {path: 'AddCatForm',Component:AddCatForm},
      {path:'Sellerform',Component:Sellerform}
    ]
   }
]);

export default router;
