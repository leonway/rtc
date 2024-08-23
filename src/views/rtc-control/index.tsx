import React, { useEffect, useRef, useState } from 'react'
import s from './index.module.less'
import { init } from './lib'
import { Button } from 'antd'

interface HomeProps {}

const wssUrl  = 'wss://rqkk-dev.rokid.com/armaz-immersal-websocket'
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
  const [ready, setReady] = useState(false)

  const handleStream = (stream)=>{
    console.log('handleStream',stream,videoRef);

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
        init(ws,handleStream)
      }
    })
    return () => {
      wsRef.current?.close()
    }
  }, [])




  return <div className={s['home-root']}>
    我是小程序端
    <video ref={videoRef}></video>
    <Button disabled={!ready} onClick={()=>{
      videoRef.current?.play()
    }}>
      播放
    </Button>
    <Button disabled={!ready} onClick={()=>{
      full(videoRef.current)
    }}>全屏</Button>
    </div>
}

export default Home
