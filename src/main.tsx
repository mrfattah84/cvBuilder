import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPage from './auth/signIn/index.tsx';
import Home from './home/index.tsx';
import Dashboard from './dashboard/index.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import EditCV from './dashboard/cv/[cvid]/edit/index.tsx';
import ViewCV from './myCV/[CVID]/view/index.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/dashboard/cv/:cvid/edit',
        element: <EditCV />,
      },
    ],
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth/signIn',
    element: <SignInPage />,
  },
  {
    path: '/myCV/:CVID/view',
    element: <ViewCV />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
