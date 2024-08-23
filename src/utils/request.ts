import { createRequest } from '@rokid-library/utils'
import { notification, Modal } from 'antd'
import { getToken, redirectLogin } from './utils'
import { NoTokenUrls, loginInvalidCode, successCode } from './constants'

const baseURL = import.meta.env.VITE_HOST_NAME

console.log('baseURL', baseURL)

const request = createRequest({
  getToken,
  redirectLogin,
  showError: notification.error,
  NoTokenUrls,
  headerTokenValueMaker: (token: string) => `bearer ${token}`,
  redirectNotFound: () => {
    window.location.href = '/404'
  },
  loginInvalidWarn: Modal.warn,
  axiosCreateOptions: {
    baseURL,
  },
  successCode,
  loginInvalidCode,
})

export default request
