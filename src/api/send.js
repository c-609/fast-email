import request from 'axios'

//发送消息
export function sendMsg(senderId, content, recipientIds) {
  return request({
    url: '/msg/process/send',
    method: 'post',
    params: {
      senderId,
      content,
      recipientIds
    }
  })
}

//返回当前用户发送的消息列表
export function getSendList(status) {
  return request({
    url: '/msg/send_list',
    method: 'get'
  })
}

//根据消息id获取未读用户列表
export function getNoReadListById(mid) {
  return request({
    url: '/msg/' + mid,
    method: 'get'
  })
}

//获取部门树
export function getDeptTree() {
  return request({
    url: "/manage/dept/tree",
    method: 'get',

  })

}
