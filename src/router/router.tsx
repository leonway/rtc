import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Layout = lazy(() => import('@/layout'))
const Home = lazy(() => import('@/views/home'))
const NotFound = lazy(() => import('@/views/404'))
const Login = lazy(() => import('@/views/login'))
const RTCControl = lazy(() => import('@/views/rtc-control'))
const RTCBeControled = lazy(() => import('@/views/rtc-be-control'))

// user module
import UserLayout, { userLayoutLoader } from '@/views/user/layout'
// import UserManage, { userManageloader, ErrorPage } from '@/views/user/manage'
const UserManage = lazy(() => import('@/views/user/manage'))

// users/routes.tsx

const config: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: 'user/*',
        element: <UserLayout />,
        loader: userLayoutLoader,
        children: [
          {
            index: true,
            element: <UserManage />,
            // loader: userManageloader
            // errorElement: <ErrorPage />
            // loader: getUserList
          },
          {
            element: <Navigate to="/404" />,
            path: '*',
          },
        ],
      },
      {
        element: <RTCControl />,
        path: 'rtc-control',
      },
      {
        element: <RTCBeControled />,
        path: 'rtc-be-controled',
      },
      {
        element: <NotFound />,
        path: '404',
      },
      {
        element: <Navigate to="/404" />,
        path: '*',
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]

export default config
