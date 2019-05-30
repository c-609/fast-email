import request from 'axios'

export function sendMsg({senderId, content, recipientIds){
  return request({
    url: '/msg/process/send',
    method:'post',
    params:{senderId, content, recipientIds}
  })
}