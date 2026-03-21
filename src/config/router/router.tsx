import {createHashRouter} from "react-router";
import {LoginPage, NotFoundPage, TestsPage, AddTestPage, TestResultPage, EditTestPage} from "@/pages";
import {ProtectedRoute} from "@/config/router/components/ProtectedRoute";
import {Layout} from "@/components";
import {PassTestPage} from "@/pages/PassTestPage/PassTestPage.tsx";
import {PageWrapper} from "@/components/common/PageWrapper.tsx";

export const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {index: true, Component: TestsPage},
      {
        path: 'add-test',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PageWrapper>
              <AddTestPage />
            </PageWrapper>
          </ProtectedRoute>
        )
      },
      {
        path: 'tests/:id',
        element: (
          <PageWrapper>
            <PassTestPage/>
          </PageWrapper>
        ),
      },
      {
        path: 'tests/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <PageWrapper>
              <EditTestPage/>
            </PageWrapper>
          </ProtectedRoute>
        )
      },
      {
        path: 'test-result',
        element: (
          <PageWrapper>
            <TestResultPage/>
          </PageWrapper>
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