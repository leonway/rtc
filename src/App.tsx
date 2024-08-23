import { Suspense } from 'react'
import { ConfigProvider } from 'antd'
import Routes from './routes'
import store from './store'
import { Loading } from '@/components'
import './App.less'

function App() {
  return (
    <ConfigProvider>
      <Suspense fallback={<Loading />}>
        <store.Provider>
          <Routes />
        </store.Provider>
      </Suspense>
    </ConfigProvider>
  )
}

export default App
