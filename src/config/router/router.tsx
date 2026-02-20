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
      {
        path: 'add-test',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AddTestPage />
          </ProtectedRoute>
        )
      },
      {
        path: '/tests/:id',
        element: <div>Пройти тест</div>
      },
      {
        path: '/tests/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <div>edit test</div>
          </ProtectedRoute>
        )
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