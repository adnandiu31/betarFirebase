import Login from './../components/Login';
import Signup from './../components/Signup';

import Navbar from './../components/Navbar';
import FlashMessage from './../components/FlashMessage';

import AppProvider, {
    Consumer
  } from './AppProvider';
  
const routes = [
  {
    path: '/',
    name: 'home',
    component:() => 
        <h1 className="content">Welcome, Home!</h1>,
    exact: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    exact: true,
  },
  {
    path: '/loginrole',
    name: 'loginrole',
    component: LoginROle,
    exact: true,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => <Consumer>
    {
      ({ state }) => state.currentUser ?
        <h1 className="content">Protected dashboard!</h1> :
        <div className="content">
          <h1>Access denied.</h1>
          <p>You are not authorized to access this page.</p>
        </div>
    }
  </Consumer>,
  },
];

export default routes;