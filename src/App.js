import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PUBLIC_ROUTES from './routes/publicRoutes';
import { LOGIN } from './routes/pageUrls';
import { Suspense, lazy } from 'react';
import Loader from './components/Loader/loader';
import NotFound from './pages/NotFound';
import UserListings from './pages/UserListings';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import useUserData from './hooks/useUserData';
const UserDetails = lazy(() => import('./pages/UserDetails'));

function App() {
  const { isAuthorized, user } = useUserData();
  return (
    <BrowserRouter>
      {/* add suspense and wraps all routes in it */}
      <Suspense fallback={<Loader loading={true} />}>
        <Routes>
          <Route path="/" element={<Navigate to={LOGIN} />} />
          {/* Public Routes */}
          <Route>
            {PUBLIC_ROUTES.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              );
            })}
          </Route>
          <Route element={<ProtectedRoute isAuthorized={isAuthorized} />}>
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/users" element={<UserListings user={user} />} />
          </Route>

          {/* Not found*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
