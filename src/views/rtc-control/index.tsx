import React, { useEffect, useRef, useState } from 'react'
import s from './index.module.less'
import { init } from './lib'
import { Button } from 'antd'

interface HomeProps {}

const wssUrl  = 'wss://rqkk-dev.rokid.com/armaz-immersal-websocket'
// const wssUrl = "ws://10.90.0.40:3001/armaz-immersal-websocket"
function full(ele) {
  if (ele.requestFullscreen) {
      ele.requestFullscreen();
  } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
  } else if (ele.webkitRequestFullscreen) {
      ele.webkitRequestFullscreen();
  } else if (ele.msRequestFullscreen) {
      ele.msRequestFullscreen();
  }
}


const Home: React.FC<HomeProps> = () => {
  const wsRef = useRef<WebSocket>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [played, setPlayed] = useState(false)
  const [ready, setReady] = useState(false)
  const [messages, setMessages] = useState([])
  const [readyState, setreadyState] = useState()

  const handleStream = (stream)=>{
    console.log('handleStream',stream,videoRef);
    if(videoRef.current!.srcObject){
      return
    }
    if(!stream){
      return
    }
    videoRef.current!.srcObject = stream;
    setReady(true)

    // videoRef.current?.play()
  }
  useEffect(() => {
    const ws = new WebSocket(wssUrl,'mp')
    wsRef.current = ws;
    ws.addEventListener('message', (d) => {
      const {event} = JSON.parse(d.data)
      if(event==='logined'){
        init(
          ws,
          handleStream,
          (e)=>{
            console.log('statuschange',e);

            setreadyState(e)
          },
          (e)=>{
            console.log('reviceMessage',e.data);

            if(e?.data){
              setMessages(d=>[...d,e.data])
              console.log('reviceMessage',e.data);
            }
          },
        )
      }
    })
    return () => {
      wsRef.current?.close()
    }
  }, [])




  return <div className={s['home-root']}>
    我是小程序端
    <video ref={videoRef} className='video-instance'></video>
    <Button disabled={!ready} onClick={()=>{
      videoRef.current?.play()
    }}>
      播放
    </Button>
    <Button disabled={!ready} onClick={()=>{
      full(videoRef.current)
    }}>全屏</Button>
       <div>readyState:{readyState}</div>
    <div>
      {messages.map((m,i)=><div key={i}>{m}</div>)}
    </div>
    </div>
}

export default Home
