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
const AccountChargeCulturePage = React.lazy(
  () => import('@/pages/account/charge/culture')
);
const AccountChargeResultPage = React.lazy(
  () => import('@/pages/account/charge/result')
);
const NotFound = React.lazy(
  () => import('@/components/ui/fallback/NotFoundFallback')
);

export const PAGE_PATH = {
  HOME: '/',
  ACCOUNT: '/account',
  ACCOUNT_CHARGE: '/account/charge',
  ACCOUNT_CHARGE_CULTURE: '/account/charge/culture',
  ACCOUNT_CHARGE_RESULT: '/account/charge/result',
} as const;

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: PAGE_PATH.HOME,
            element: <Navigate to={PAGE_PATH.ACCOUNT_CHARGE} replace />,
          },
          {
            path: PAGE_PATH.ACCOUNT,
            element: <Navigate to={PAGE_PATH.ACCOUNT_CHARGE} replace />,
          },
          {
            path: PAGE_PATH.ACCOUNT_CHARGE,
            element: <AccountChargePage />,
          },
          {
            path: PAGE_PATH.ACCOUNT_CHARGE_CULTURE,
            element: <AccountChargeCulturePage />,
          },
          {
            path: PAGE_PATH.ACCOUNT_CHARGE_RESULT,
            element: <AccountChargeResultPage />,
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
