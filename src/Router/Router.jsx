
import App from '../App';
import Login from '../auth/Login';
import Register from '../auth/Register';
import AdminPermission from '../components/AdminPermission';
import AdminHome from '../page/AdminHome';
import { createBrowserRouter } from 'react-router';
import Home from '../page/Home';




export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
            path: '/',
            element: <Home />

        },
        {
            path: '/login',
            element: <Login />

        },
        {
            path: '/register',
            element: <Register />

        },
        {
            path: '/admin',
            element:<AdminHome />  
        }
        
      ]
    },
  ]);