import {
  createBrowserRouter,
} from "react-router-dom";

import DashboardPage from "./pages/dashboard";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    index: true, 
    element: <DashboardPage />,
  },
]);