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
import CatDetails from "../Components/CatDetails/CatDetails";
import AllCats from "../Pages/AllCats/AllCats";
import AddCatFoodForm from "../Pages/Seller/AddCatFoodForm/AddCatFoodForm";
import FoodDetails from "../Components/FoodDetails/FoodDetails";
import AllFoods from "../Pages/AllFoods/AllFoods";
import ApprovedOrders from "../Pages/Dasboard/userPage/ApprovedOrders";
import PaymentPage from "../Pages/Dasboard/userPage/PaymentPage";
import PandingOrders from "../Pages/Dasboard/userPage/PandingOrders";
import ConfirmOrder from "../Pages/Dasboard/userPage/ConfirmOrder";

const router = createBrowserRouter([
  {
    path: "/",
   Component: MainLayout,
   errorElement:<ErrorPage/>,
   children:[
    {index:true, Component:Home},
    {path:'about',Component:AboutPage},
    {path:'blogPage',Component: BlogPage},
    {path:'cats/:id', Component: CatDetails},
    {path:'allCats',Component:AllCats},
    {path:'catfood/:id', Component:FoodDetails},
    {path:'allfoods',Component:AllFoods}
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
      // {path: 'AddCatForm',Component:AddCatForm},
      {path:'Sellerform',Component:Sellerform},
      {path:'addCatFoodForm',Component: AddCatFoodForm},
      {path:'PandingOrders',Component:PandingOrders},
      {path:'approvedOrders',Component:ApprovedOrders},
      {path:'confirm-order',Component:ConfirmOrder},
      {path:'payment',Component:PaymentPage}
    ]
   }
]);

export default router;
