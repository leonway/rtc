import React from 'react'
import { Menu } from 'antd'
import { useNavigate, useMatches } from 'react-router-dom'
import s from './index.module.less'
interface SideMenuProps {}

const items = [
  {
    label: '眼镜',
    key: '/rtc-be-controled'
  },
  {
    label: '小程序',
    key: '/rtc-control'
  }
]

const SideMenu: React.FC<SideMenuProps> = (componentProps) => {
  const navigate = useNavigate()
  const onClick = ({ key }: any) => {
    console.time('usermanage')
    navigate(key)
  }
  const matchPaths = useMatches()

  return (
    <div className={s['side-menu-root']}>
      我是菜单
      <Menu
        style={{ width: 200 }}
        mode="inline"
        items={items}
        onClick={onClick}
        selectedKeys={matchPaths.map((v) => v.pathname)}
      />
    </div>
  )
}

export default SideMenu
