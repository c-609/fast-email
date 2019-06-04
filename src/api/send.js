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

//获取用户读取比列
// export function getReadRatio(mid) {
//   return request({
//     url: '/msg/proportion/' + mid,
//     method: 'post'
//   })
// }

//获取部门树
export function getDeptTree() {
  return request({
    url: "/manage/dept/tree",
    method: 'get',

  })

}
