import {createBrowserRouter} from "react-router";
import {LoginPage, NotFoundPage, TestsPage, AddTestPage, TestResultPage, EditTestPage} from "@/pages";
import {ProtectedRoute} from "@/config/router/components/ProtectedRoute";
import {Layout} from "@/components";
import {PassTestPage} from "@/pages/PassTestPage/PassTestPage.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {index: true, Component: TestsPage},
      {
        path: 'add-test',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AddTestPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'tests/:id',
        Component: PassTestPage,
      },
      {
        path: 'tests/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <EditTestPage/>
          </ProtectedRoute>
        )
      },
      {
        path: 'test-result',
        Component: TestResultPage
      }
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