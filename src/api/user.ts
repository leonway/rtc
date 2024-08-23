const userList = [
  {
    name: 'lili',
    age: 32,
  },
  {
    name: 'lili2',
    age: 34,
  },
  {
    name: 'lili3',
    age: 31,
  },
  {
    name: 'lil4',
    age: 11,
  },
]

// 获取用户列表

export const getUserList = () => {
  console.log('getUserList exec')
  console.timeLog('usermanage', 'getUserList')

  return new Promise<{ name: string; age: number }[]>((res, rej) =>
    setTimeout(() => {
      const ok = Math.random() < 0.8
      console.log('getUserList ok', ok)

      ok && res(userList)
      !ok && rej(new Error())
    }, 500),
  )
}
