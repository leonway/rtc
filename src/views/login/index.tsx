import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useModelDispatchers, useModelEffectsLoading } from '@/store'
import s from './index.module.less'
interface LoginProps {}

const Login: React.FC<LoginProps> = (componentProps) => {
  const navigate = useNavigate()
  const { login } = useModelDispatchers('login')
  const onLogin = async () => {
    try {
      await login()
      setTimeout(() => {
        navigate('/')
      }, 0)
    } catch (error) {
      console.error('login --error', error)
    }
  }
  return (
    <div className={s['login-root']}>
      登录界面
      <Button onClick={onLogin} type="primary">
        登录
      </Button>
    </div>
  )
}

export default Login
export const abc = () => {}
