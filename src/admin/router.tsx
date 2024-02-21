import { Suspense, lazy} from 'react';
import {Navigate} from 'react-router-dom';
import {RouteObject} from 'react-router';

import SidebarLayout from './layouts/SidebarLayout';
import SuspenseLoader from './components/SuspenseLoader';

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards

const Bogosluzenja = Loader(lazy(() => import('./content/dashboards/Bogosluzenja')));

// Components

const Buttons = Loader(
  lazy(() => import('./content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('./content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('./content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('./content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('./content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('./content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('./content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('./content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('./content/pages/Components/Forms')));


const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: 'bogosluzenja',
        element: <Bogosluzenja />
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
