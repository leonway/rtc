import { Loading } from '@/components'
import { message } from 'antd'
import React, { Suspense } from 'react'
import { useOutlet, redirect } from 'react-router-dom'

const fakeAuthApi = async (): Promise<boolean> =>
  new Promise<boolean>((res) => {
    setTimeout(() => {
      res(Math.random() < 0.8)
    }, 0)
  })

interface userLayoutProps {}

const userLayout: React.FC<userLayoutProps> = (componentProps) => {
  const outlet = useOutlet()
  return <Suspense fallback={<Loading />}>{outlet}</Suspense>
}

export const userLayoutLoader = async () => {
  console.log('userLayoutLoader exec')
  console.timeLog('usermanage', 'userLayoutLoader')

  const hasAuth = await fakeAuthApi()
  if (!hasAuth) {
    message.info('抱歉，您没有 user 页面权限')
    return redirect('/')
  }
  return null
}

export default userLayout
