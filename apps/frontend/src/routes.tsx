import { createBrowserRouter } from "react-router-dom"

import DashboardPage from "./pages/dashboard"
import LoginPage from "./pages/login"
import { ProtectedRoutes } from "./components"
import RegisterPage from "./pages/register"

export const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/menu",
        element: <DashboardPage />,
      },
      {
        path: "/orders",
        element: <DashboardPage />,
      },
    ],
  },
])
