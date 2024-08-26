import React, { Suspense, useEffect, useRef } from 'react'
import { useOutlet, useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '@/utils/utils'
import { Loading } from '@/components'
import { SideMenu, Header } from '@/modules'

import s from './index.module.less'
interface LayoutProps {}

const Layout: React.FC<LayoutProps> = (componentProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const curPathNameRef = useRef('')
  const outlet = useOutlet()
  useEffect(() => {
    console.log('location')
    // console.log('getToken()', getToken());

    // if (!getToken()) {
    //   setTimeout(() => {
    //     navigate('/login')
    //   }, 0)
    //   return
    // }
    if (location.pathname !== curPathNameRef.current) {
      curPathNameRef.current = location.pathname
    }
  }, [location])

  return (
    <div className={s['layout-root']}>
      {/* <div className={s['side-menu-box']}>
        <SideMenu />
      </div>
      <div className={s['content-box']}>
        <div className={s['header-box']}>
          <Header />
        </div>
        <div className={s['children-box']}>
          <Suspense fallback={<Loading />}>{outlet}</Suspense>
        </div>
      </div> */}
      <Suspense fallback={<Loading />}>{outlet}</Suspense>
    </div>
  )
}

export default Layout
