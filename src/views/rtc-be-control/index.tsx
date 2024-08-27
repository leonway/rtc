import React, { useEffect, useRef, useState } from 'react'
import s from './index.module.less'
import { init } from './lib'
import { Button } from 'antd'
interface HomeProps {}
const wssUrl  = "ws://10.90.0.40:3001/armaz-immersal-websocket"
// const wssUrl  = 'wss://rqkk-dev.rokid.com/armaz-immersal-websocket'
const Home: React.FC<HomeProps> = () => {
  const wsRef = useRef<WebSocket>()
  const startRef = useRef<()=>void>()
  const [ready, setReady] = useState(false)
  const [messages, setMessages] = useState([])
  const [readyState, setreadyState] = useState()
  useEffect(() => {
    const ws = new WebSocket(wssUrl,'glass')
    wsRef.current = ws;
    ws.addEventListener('message', (d) => {
      const {event} = JSON.parse(d.data)
      if(event==='logined'){
        init(
          ws,
          (s)=>{
          startRef.current = s
          setReady(true)
        },
        (e)=>{
          console.log('handleReceiveMessage',e);

          if(e?.data){
            setMessages(d=>[...d,e.data])
            console.log('reviceMessage',e.data);
          }

        },
        (e)=>{
          console.log('statechange',e);

          setreadyState(e)
        }
      )
      }
    })

    return () => {
      wsRef.current?.close()
    }
  }, [])



console.log('start',ready);

  return <div className={s['home-root']}>
    {!ready?<div>loading</div>:<Button onClick={()=>{
      startRef.current?.()
    }}>开始推流</Button>}
    <div>readyState:{readyState}</div>
    <div>
      {messages.map((m,i)=><div key={i}>{m}</div>)}
    </div>

  </div>
}

export default Home
