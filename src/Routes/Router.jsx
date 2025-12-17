import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Rider from "../Pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendPercel from "../Pages/SendPercel/SendPercel";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/DashBoard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/DashBoard/ApproveRiders/ApproveRiders";
import UserManagement from "../Pages/DashBoard/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/DashBoard/AssignRiders/AssignRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/rider',
        element: <PrivateRoute>
          <Rider></Rider>
        </PrivateRoute>,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())
      },
      {
        path: '/send-percel',
        element: <PrivateRoute>
          <SendPercel />
        </PrivateRoute>,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: (<PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>),
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess />
      },
      {
        path: 'payment-cancelled',
        element: <PaymentCancelled />
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />
      },
      {
        path: 'approve-riders',
        element: <AdminRoute>
          <ApproveRiders />
        </AdminRoute>
      },
      {
        path: 'assign-riders',
        element: <AdminRoute>
          <AssignRiders />
        </AdminRoute>
      },
      {
        path: 'users-management',
        element: <AdminRoute>
          <UserManagement />
        </AdminRoute>
      }
    ]
  }
]);
