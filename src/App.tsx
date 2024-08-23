import { Suspense, useEffect } from 'react'
import { ConfigProvider } from 'antd'
import Routes from './routes'
import store from './store'
import { Loading } from '@/components'
import './App.less'
import VConsole from 'vconsole'

function App() {
  useEffect(() => {


const vConsole = new VConsole();

    return () => {
      vConsole.destroy()
    }
  }, [])
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
