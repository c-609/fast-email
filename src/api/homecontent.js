import request from 'axios'
export function getMsg (username,password) {
    return request({
      url: '/msg',
      method: 'get'
    })
}
