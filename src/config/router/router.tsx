import {createBrowserRouter} from "react-router";
import {LoginPage, NotFoundPage, TestsPage, AddTestPage} from "@/pages";
import {ProtectedRoute} from "@/config/router/components/ProtectedRoute";
import {Layout} from "@/components";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {index: true, Component: TestsPage},
      {path: 'add-test', element: <ProtectedRoute allowedRoles={['admin']}><AddTestPage /></ProtectedRoute>}
    ],
  },
  {
    path: '/login',
    Component: LoginPage
  },
  {
    path: '*',
    Component: NotFoundPage,
  }
]);