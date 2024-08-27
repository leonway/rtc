export const init = (ws:WebSocket,onReady: (start:() => void) => void,handleReceiveMessage:(event:any)=>void,handleReceiveChannelStatusChange: ((state:RTCDataChannelState) => any))=>{
  ws.addEventListener('message', (d) => {
    const { event, data } = JSON.parse(d.data)
    if(event === 'offer'){
      const start = ()=>{
        createAnswer(data).then((answer) => {
          ws.send(JSON.stringify({
            event: 'answer',
            data:{ type: answer?.type, sdp: answer?.sdp }
          }))
        })
      }
      onReady(start)

    }else if(event==='candidate'){
      addIceCandidate(data)
    }
  })

  const pc = new window.RTCPeerConnection({
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  })
  let sendChannel:RTCDataChannel;
  pc.ondatachannel = (e)=>{
    sendChannel = e.channel;
    sendChannel.onmessage = handleReceiveMessage;
    sendChannel.onopen = ()=>{
      handleReceiveChannelStatusChange(sendChannel?.readyState)
    };
    sendChannel.onclose = ()=>{
      handleReceiveChannelStatusChange(sendChannel?.readyState)
    };
  };
  // pc.ondatachannel = (e) => {
  //   console.log('data', e)
  //   e.channel.onmessage = (e) => {
  //     console.log('onmessage', e, JSON.parse(e.data))
  //     const { type, data } = JSON.parse(e.data)
  //     console.log('robot', type, data)
  //     // if (type === 'mouse') {
  //     //   data.screen = {
  //     //     width: window.screen.width,
  //     //     height: window.screen.height,
  //     //   }
  //     // }
  //     // ws.send(JSON.stringify({
  //     //   event: 'robot',
  //     //   data:{
  //     //     type, data
  //     //   }
  //     // }))
  //   }
  // }

  async function getScreenStream() {
    console.log('navigator.mediaDevices',navigator.mediaDevices);
    console.log('navigator',navigator);

    return  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: {
        aspectRatio:0.66666666666,
        width: { ideal: 720  },
        height: {  ideal: 1080 },
        frameRate: { max: 60 },
      },
    })
  }

  pc.onicecandidate = (e) => {
    console.log('pc.onicecandidate',e);

    if (e.candidate) {
      // 告知其他人
      ws.send(JSON.stringify({
        event: 'puppet-candidate',
        data:e.candidate
      }))
    }
  }

  async function addIceCandidate(candidate) {
    candidate = typeof candidate === 'string' ? JSON.parse(candidate) : candidate
    if (!candidate) return
    console.log('addIceCandidate---candidate', candidate, typeof candidate)
    await pc.addIceCandidate(new RTCIceCandidate(candidate))
  }
  window.addIceCandidate = addIceCandidate

  async function createAnswer(offer) {
    const stream = await getScreenStream()
    console.log('stream',stream);

    stream.getTracks().forEach((track) => {
      if(track.kind === 'video'){
        setInterval(() => {
          console.log('push track',track);

        }, 1000);
      }
      pc.addTrack(track, stream)
    })
    await pc.setRemoteDescription(offer)
    await pc.setLocalDescription(await pc.createAnswer())
    console.log('create answer \n', JSON.stringify(pc.localDescription))
    // send answer
    return pc.localDescription
  }
}
