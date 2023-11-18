import React, { FC } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { PageRout } from './shared/lib/routes';
import { AllShipsPage } from './pages/AllShipsPage';
import { ShipPage } from './pages/ShipPage';
import './styles/index.scss';

const AppLayout: FC = () => {
  return (
      <div className="app">
        <main>
          <Outlet />
        </main>
      </div>
  );
};

const router = createBrowserRouter([
  {
    path: PageRout.AllShips,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <AllShipsPage />
      },
      {
        path: PageRout.Ship,
        element: <ShipPage />
      }
    ]
  }
]);

export const App: FC = () => {
  return (
    <RouterProvider router={router} />
  );
};
