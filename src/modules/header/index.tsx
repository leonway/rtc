import { removeToken } from '@/utils/utils'
import { Button } from 'antd'
import React, { useEffect } from 'react'
import s from './index.module.less'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (componentProps) => {
  const onLogout = () => {
    removeToken()
    window.location.href = `/login`
  }
  return (
    <div className={s['header-root']}>
      我是header
      <Button type="primary" onClick={onLogout}>
        退出
      </Button>
    </div>
  )
}

export default Header
