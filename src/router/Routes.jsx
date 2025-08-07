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
import ApproveOrde from "../Pages/Seller/ApproveOrde/ApproveOrde";
import SellerAllCats from "../Pages/Seller/AllCat/AllCats";
import SellerAllCatFood from "../Pages/Seller/AllCatFood/SellerAllCatFood";
import SellerApprove from "../Pages/Admin/AproveSeller/SellerApprove";
import AllUsers from "../Pages/Admin/AllUsers/AllUsers";
import Allsellers from "../Pages/Admin/Allsellers/Allsellers";
import AdminPendingorder from "../Pages/Admin/AdminPendingOrder/AdminPendingorder";
import AdminapprovedOrder from "../Pages/Admin/AdminShowAllApproved/AdminapprovedOrder";
import AdminConfirmed from "../Pages/Dasboard/Adminconfirmed/AdminConfirmed";
import PrivateRouter from "./PrivateRouter";
import SellerRouter from "./SellerRouter";
import UserRouter from "./UserRouter";
import AdminRoute from "./AdminRoute";
import Profile from "../Pages/Profile/Profile";

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
  {path:'/dashboard', element:
  <PrivateRouter>
<DashboardLayout/>
  </PrivateRouter>  ,
    children:[
      {index:true,Component:Profile},
      {path:'Sellerform',element:<UserRouter>
        <Sellerform/>
      </UserRouter>},
     {path:'addCatFoodForm',Component: AddCatFoodForm},
      {path:'PandingOrders',element:<UserRouter>
        <PandingOrders/>
      </UserRouter>},
      {path:'approvedOrders',element:<UserRouter>
        <ApprovedOrders/>
      </UserRouter>},
      {path:'confirm-order',element:<UserRouter>
        <ConfirmOrder/>
      </UserRouter>},
      {path:'payment',element:<UserRouter>
        <PaymentPage/>
      </UserRouter>},


      {path:"sellerApproveOrde",element:<SellerRouter>
        <ApproveOrde/>
      </SellerRouter>},
      {path:'seller/add-category',element:<SellerRouter>
        <AddCatForm/>
      </SellerRouter>},
      {path:'seller/add-category-food',element:<SellerRouter>
        <AddCatFoodForm/>
      </SellerRouter>},
      {path:'seller/all-categories',element:<SellerRouter>
        <SellerAllCats/>
      </SellerRouter>},
      {path:'seller/all-category-food',element:<SellerRouter>
        <SellerAllCatFood/>
      </SellerRouter>},


      {path:'sellersapprove',element:<AdminRoute>
        <SellerApprove/>
      </AdminRoute>},
      {path:'allUsers',element:<AdminRoute>
        <AllUsers/>
      </AdminRoute>},
      {path:'allsellers',element:<AdminRoute>
        <Allsellers/>
      </AdminRoute>},
      {path:'adminpending',element:<AdminRoute>
        <AdminPendingorder/>
      </AdminRoute>},
      {path:'adminapproved',element:<AdminRoute>
        <AdminapprovedOrder/>
      </AdminRoute>},
      {path:'adminconfirmed',element:<AdminRoute>
        <AdminConfirmed/>
      </AdminRoute>}
    ]

   }
]);

export default router;
