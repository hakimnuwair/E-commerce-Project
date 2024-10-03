import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React, { useState } from "react";
import Layout from "./components/Layout.jsx";
import Perfumes from "./components/Perfumes.jsx";
import Bodysparys from "./components/Bodysparys.jsx";
import Watches from "./components/Watches.jsx";
import ViewProduct from "./components/ViewProduct.jsx";
import Auth from "./components/Auth.jsx";
import { action as authActions } from "./components/AuthLayout.jsx";
import Upload from "./components/Upload.jsx"
import Test from "./components/ProductList.jsx";
import Goggles from "./components/Goggles.jsx";
import CreateAccount from "./components/CreateAccount.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import {action as logoutAction} from "./components/Logout.jsx"
import {loader as authLoader, loader} from "./util/getAuthenticationToken.js"
import { action } from "./components/Auth.jsx";
import Cart from "./components/Cart.jsx";
import { loader as cartLoader } from "./components/CartLoader.jsx"
import CartLoader from "./components/CartLoader.jsx";
import OrderProduct from "./components/OrderProduct.jsx";
import { checkAdminAuthorizationLoader } from "./util/getAuthenticationToken.js";
import Authentication from "./components/Authenctication.jsx";
import AuthWithAction from "./util/AuthWithAction.js";
import FeaturedProductList from "./components/FeaturedProductsList.jsx";
import AboutsUs from "./components/AboutsUs.jsx";
import ContactUs from "./components/ContactUs.jsx";
import AboutAndContactUs from "./components/AboutAndContactUs.jsx";
import AboutUsLayout from "./components/AboutUsLayout.jsx";
import AllCategories from "./components/AllCategories.jsx";
import Orders from "./components/Orders.jsx";
import Order from "./components/Order.jsx";
import OrderStatus from "./components/OrderStatus.jsx";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    id: 'root',
    loader: async () => await authLoader(),
    children: [
      {
        index: true,
        path: "/",
        element: <App />,
      },
      {
        path: "/account",
        element: <Authentication />,
        action: authActions,
      },
      {
        path: "/uploads",
        element: <Upload />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/featured",     
        element: <FeaturedProductList />,
      },
      {
        path: "/perfumes",
        element: <Perfumes />,
      },
      {
        path: "/bodysprays",
        element: <Bodysparys />,
      },
      {
        path: "/watches",     
        element: <Watches />,
      },
      {
        path: "/goggles",
        element: <Goggles />
      },
      {
        path: "/view-product/:productId",
        element: <ViewProduct />
      },
      {
        path: "/logout",
        action : logoutAction,
      },
      {
        path: "/cart",
        id: "cart",
        element : <CartLoader />,
        loader : cartLoader,
      },
      {
        path: "/order",
        element: <OrderProduct />
      },
      {
        path: `/order-overview`,
        element: <Order />
      },
      {
        path: "/categories",
        element: <AllCategories />
      },
      {
        path: "/order-status",
        element: <OrderStatus />
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    loader : checkAdminAuthorizationLoader,
    id : 'admin',
  },
  {
    path: "/about-us",
    element: <AboutUsLayout />,
    children: [
      {
        index : true,
        path: "/about-us",
        element: <AboutAndContactUs />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
