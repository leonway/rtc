import React, { useEffect, useRef } from 'react'
import s from './index.module.less'
import { init } from './lib'
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const wsRef = useRef<WebSocket>()
  useEffect(() => {
    const ws = new WebSocket("ws://10.90.0.126:3001/armaz-immersal-websocket",'glass')
    wsRef.current = ws;
    ws.addEventListener('message', (d) => {
      const {event} = JSON.parse(d.data)
      if(event==='logined'){
        init(ws)
      }
    })

    return () => {
      wsRef.current?.close()
    }
  }, [])




  return <div className={s['home-root']}>我是首页</div>
}

export default Home
