import React from 'react'
import { useLoaderData, useRouteError } from 'react-router-dom'
import useSWR from 'swr'
import { getUserList } from '@/api/user'
import { Button } from 'antd'

interface UserManageProps {}

const UserManage: React.FC<UserManageProps> = (componentProps) => {
  // const userList: { name: string; age: number }[] = useLoaderData() as any
  const { data: userList } = useSWR<{ name: string; age: number }[]>(
    '123',
    getUserList
  )
  return (
    <div>
      用户列表
      {userList?.map((user) => {
        console.timeEnd('usermanage')
        return (
          <div key={user.name}>
            姓名：{user.name}
            年龄：{user.age}
          </div>
        )
      })}
    </div>
  )
}

export const userManageloader = async (): Promise<
  { name: string; age: number }[]
> => {
  console.log('userManageloader exec')
  console.timeLog('usermanage', 'userManageloader')
  return getUserList().then(
    (data) => data,
    (error) => {
      console.error('error', error)
      return []
    }
  )
}

export const ErrorPage = () => {
  const error = useRouteError() as Error
  return (
    <>
      出问题了{error?.message}
      <Button></Button>
    </>
  )
}

export default UserManage
