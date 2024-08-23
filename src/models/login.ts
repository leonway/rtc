import { setToken } from '@/utils/utils'

const defaultState = {}

const stores = {
  state: defaultState,
  reducers: {},
  effects: () => ({
    async login(payload: any) {
      console.log('login payload', payload)
      setToken('123')
    }
  })
}
export default stores
