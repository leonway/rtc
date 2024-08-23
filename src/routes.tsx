import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routConfig from '@/router/router'
import { Loading } from '@/components'

const router = createBrowserRouter(routConfig)

export default function Routes() {
  return <RouterProvider router={router} fallbackElement={<Loading />} />
}
