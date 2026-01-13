import { createBrowserRouter } from 'react-router-dom'

import Layout from './layout/Layout'
import AuthLayout from './layout/AuthLayout'

import Register from './views/Register'
import Home from './views/Home'
import Login from './views/Login'
import { AdminLayout } from './layout/AdminLayout'

import {Products} from './views/Products'
import { Orders } from './views/Orders'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,

      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />

      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    element: <div>404 Not Found</div>
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Orders />
      },
      {
        path:'/admin/products',
        element:<Products/>
      }
    ]
  }



])

export default router
