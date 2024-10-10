import { useUser } from '@clerk/clerk-react';
import './styles/App.css';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './components/ui/custom/Header';

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/signIn'} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
