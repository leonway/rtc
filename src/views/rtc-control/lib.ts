export const init = (ws, handleStream) => {
  ws.addEventListener('message', (d) => {
    const { event, data } = JSON.parse(d.data)
    if (event === 'answer') {
      setRemote(data)
    } else if (event === 'candidate') {
      console.log('get candidate msg',data);

      addIceCandidate(data)
    }
  })

  const pc = new window.RTCPeerConnection({})
  pc.getSenders().forEach((sender) => {
    console.log('sender', sender)
  })
  // const dc = pc.createDataChannel('robotchannel', { reliable: false })
  // dc.onopen = () => {
  //   peer.on('robot', (type, data) => {
  //     dc.send(JSON.stringify({ type, data }))
  //   })
  // }
  // dc.onmessage = (e) => {
  //   console.log('dc message', e)
  // }
  // dc.onerror = (e) => {
  //   console.log('dc error', e)
  // }
  // onicecandidate iceEvent
  // addIceCandidate
  pc.onicecandidate = function (e) {
    console.log('onicecandidate')
    if (e.candidate) {
      ws.send(
        JSON.stringify({
          event: 'control-candidate',
          data: JSON.stringify(e.candidate),
        }),
      )
    }
  }

  pc.onicecandidateerror = (...data) => {
    console.log('onicecandidateerror,,,', data)
  }

  async function createOffer(params) {
    const offer = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    })
    await pc.setLocalDescription(offer)
    console.log('create-offer\n', JSON.stringify(pc.localDescription))
    return pc.localDescription
  }
  createOffer().then((offer) => {
    // console.log('forward', 'offer', offer)
    ws.send(
      JSON.stringify({
        event: 'offer',
        data: { type: offer?.type, sdp: offer?.sdp },
      }),
    )
  })

  async function setRemote(answer) {
    try {
      console.log('setRemoteDescription start')
      await pc.setRemoteDescription(answer)
      console.log('setRemoteDescription end')

    } catch (error) {
      console.log('setRemote', setRemote)
    }
  }
  window.setRemote = setRemote

  let candidates = []
  async function addIceCandidate(candidate) {
    candidate = typeof candidate === 'string' ? JSON.parse(candidate) : candidate
    // for (const key in candidate) {
    //   if (Object.prototype.hasOwnProperty.call(candidate, key)) {
    //     const element = candidate[key]
    //     candidate[getHumpNamed(key)] = element
    //   }
    // }

    if (!candidate) return
    candidates.push(candidate)
    // console.log('pc.remoteDescription', pc.remoteDescription, candidates)
    if (pc.remoteDescription && pc.remoteDescription.type) {
      for (let i = 0; i < candidates.length; i++) {
        const element = candidates[i]
        console.log('for...addIceCandidate... candidate', element, typeof element)
        await pc.addIceCandidate(new RTCIceCandidate(element))
      }
      candidates = []
    }
  }
  window.addIceCandidate = addIceCandidate

  // pc.onaddstream = function (e) {
  //   console.log('add-stream', e.stream)
  //   handleStream(e.stream)
  // }

  pc.ontrack = function (e) {
    handleStream(e.streams[0])
  }
}
