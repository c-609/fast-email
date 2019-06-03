import request from 'axios'

//返回当前用户(未读）的消息列表
export function getNoReadMsg(status) {
  return request({
    url: '/msg',
    method: 'get',
    params: {
      status
    }
  })
}

//编辑当前用户对于的消息状态（0:未读 1：已读 -1：删除）
export function editMsgStatus(mid, status) {
  return request({
    url: '/msg/edit_state',
    method: 'post',
    params: {
      mid,
      status
    }
  })
}
