import React from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import SelectDashboard from "./pages/selectDashboard/SelectDashboard";
import Customer from "./pages/dashboard/customer/Customer";
import Account from "./pages/dashboard/account/Account";
import Payment from "./pages/dashboard/payment/Payment";
import Partner from "./pages/dashboard/partner/Partner";
import Analytics from "./pages/dashboard/analytics/Analytics";
import ElectricBill from "./pages/electricBill/ElectricBill";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <LandingPage />
      </div>
    ),
  },
  {
    path: "/Login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/Register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/SelectDashboard",
    element: (
      <div>
        <SelectDashboard />
      </div>
    ),
  },
  {
    path: "/Dashboard/Customer",
    element: (
      <div>
        <Customer />
      </div>
    ),
  },
  {
    path: "/Dashboard/Account",
    element: (
      <div>
        <Account />
      </div>
    ),
  },
  {
    path: "/Dashboard/Payment",
    element: (
      <div>
        <Payment />
      </div>
    ),
  },
  {
    path: "/Dashboard/Partner",
    element: (
      <div>
        <Partner />
      </div>
    ),
  },
  {
    path: "/Dashboard/Analytics",
    element: (
      <div>
        <Analytics />
      </div>
    ),
  },
  {
    path: "/ElectricBill",
    element: (
      <div>
        <ElectricBill />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
