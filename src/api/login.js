import request from 'axios'
export function loginObj (username,password) {
    return request({
      url: '/login',
      method: 'post',
      params:{username,password}
    })
}
