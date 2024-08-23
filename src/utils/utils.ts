/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
import jsCookie from 'js-cookie'

export const exportFile = ({
  data,
  url,
  filename,
}: {
  data?: Blob
  url?: string
  filename?: string
}) => {
  const download = (href: string) => {
    const a = document.createElement('a')
    a.href = href
    if (filename) {
      a.download = filename
    }

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  if (url) {
    download(url)
    return true
  }

  if (data instanceof Blob) {
    const link = window.URL.createObjectURL(data)
    download(link)
    window.URL.revokeObjectURL(link)
    return true
  }
  return false
}

export const hasOwnProperties = (obj: object, keys: Array<string | number>) =>
  !keys.some((key) => !Object.prototype.hasOwnProperty.call(obj, key))

export const getLanguage = () => {
  const lang = localStorage.getItem('language') || window.navigator.language
  const region = lang.split('-')[0]
  const langMap = { zh: 'zh-CN', en: 'en-US' }

  if (['zh', 'en'].indexOf(region) > -1) {
    // @ts-ignore
    return langMap[region]
  }
  return langMap.en
}

export const getParameterByName = (name: string, url?: string) => {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

/** 获取所有参数
 * @returns json/object
 */
export const getQueryString = () => {
  // 定义返回结果
  const result: Record<string, any> = {}
  // 获取url上的参数（使用decodeURIComponent对url参数进行解码）
  const search = decodeURIComponent(window.location.search)
  const tempArr = search !== '' ? search.substr(1).split('&') : []

  tempArr.forEach((item) => {
    if (item) {
      // 将参数名和参数值拆分
      const itemArr = item.split('=')
      // 参数名作为key, 参数值为value
      // eslint-disable-next-line prefer-destructuring
      result[itemArr[0]] = itemArr[1]
    }
  })

  return result
}

export const getCompanyCode = () => {
  const tmp = getQueryString()
  if (tmp.state === '1212' && tmp.code && Object.keys(tmp).length === 2) {
    return localStorage.getItem('companyCode')
  }
  return getParameterByName('code') || localStorage.getItem('companyCode')
}

export const getToken = () => jsCookie.get('Admin-Token') || ''
export const removeToken = () => jsCookie.remove('Admin-Token')

export const setToken = (value: string) => jsCookie.set('Admin-Token', value)

export const redirectLogin = () => {
  removeToken()
  const currentUrl = window.location.pathname + window.location.search
  let redirectUrl = encodeURIComponent(currentUrl)
  let companyCode = ''
  // 已经是登录页面
  if (getParameterByName('redirect')) {
    redirectUrl = getParameterByName('redirect') || ''
  }
  console.log('redirectUrl', redirectUrl)

  // 企业号
  if (getCompanyCode()) {
    companyCode = `&code=${getCompanyCode()}`
  }
  if (window.location.pathname === '/login') {
    window.location.reload()
  } else if (redirectUrl === '%2Fempty') {
    // 如果是从/empty跳登录  就不加重定向
    window.location.href = `/login?${companyCode}`
  } else {
    window.location.href = `/login?redirect=${redirectUrl}${companyCode}`
  }
}
