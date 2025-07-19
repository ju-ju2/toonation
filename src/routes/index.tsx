import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import SuspenseFallback from '@/components/ui/fallback/SuspenseFallback';
import ErrorBoundaryLayout from '@/routes/layouts/ErrorBoundary';

const DefaultLayout = React.lazy(() => import('@/routes/layouts/Default'));
const AccountChargePage = React.lazy(() => import('@/pages/account/charge'));
const NotFound = React.lazy(
  () => import('@/components/ui/fallback/NotFoundFallback')
);

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="/account/charge" replace />,
          },
          {
            path: '/account',
            element: <Navigate to="/account/charge" replace />,
          },
          {
            path: '/account/charge',
            element: <AccountChargePage />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default function Router() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
