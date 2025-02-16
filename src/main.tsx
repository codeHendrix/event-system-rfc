import { css, Global } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Dashboard, Error, Cop, Root } from './routes';
import { theme } from './theme';

const root = document.getElementById('root');
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Cop />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

const styles = css`
  html,
  body,
  #root {
    height: 100%;
    padding: 0;
    margin: 0;
  }
`;

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Global styles={styles} />
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}
