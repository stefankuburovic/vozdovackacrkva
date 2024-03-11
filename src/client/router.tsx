import { Suspense, lazy} from 'react';
import {RouteObject} from 'react-router';

import LoadingScreen from "./components/layout/loading-screen/LoadingScreen";

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards


const Layout = Loader(lazy(() => import('./layouts/Layout')));
const Home = Loader(lazy(() => import('./pages/Home/Home')));
const Riznica = Loader(lazy(() => import('./pages/Riznica/Riznica')));


const routes: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'riznica',
        element: <Riznica />
      }
    ]
  },
];

export default routes;
