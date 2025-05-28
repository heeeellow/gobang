// 简易 WS 管理：支持自动重连
export function createWS(path, onMsg){
  let ws
  function connect(){
    ws = new WebSocket(`${location.protocol==='https:'?'wss':'ws'}://${location.host}${path}`)
    ws.onopen = () => console.log('[WS] connected')
    ws.onmessage = e => onMsg(JSON.parse(e.data))
    ws.onclose = () => { console.log('[WS] closed, retry'); setTimeout(connect, 1000) }
  }
  connect()
  return { send: data => ws.readyState===1 && ws.send(JSON.stringify(data)) }
}
