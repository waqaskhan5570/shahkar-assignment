import { lazy } from 'react';
import { LOGIN, SIGNUP } from './pageUrls';

//React lazy loading for good application performance
const Login = lazy(() => import('../pages/Auth/login'));
const SignUp = lazy(() => import('../pages/Auth/signup'));

const PUBLIC_ROUTES = [
  {
    routeName: 'Login',
    path: LOGIN,
    component: Login,
  },
  {
    routeName: 'Signup',
    path: SIGNUP,
    component: SignUp,
  },
];

export default PUBLIC_ROUTES;
