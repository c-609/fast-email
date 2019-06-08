import request from 'axios'
export function loginObj(username, password) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

//根据角色id数组获取角色
export function getRolesById(ids) {
  return request({
    url: '/manage/role',
    method: 'get',
    params: {
      ids
    }
  })
}

//根据部门ids获取部门列表
export function getDeptsById(ids) {
  return request({
    url: '/manage/dept/list',
    method: 'get',
    params: {
      dids: ids
    }
  })
}

//根据部门用户关系获取角色列表
export function getRoleByDept(deptId, userId) {
  return request({
    url: '/manage/role/list/dept_user',
    method: 'get',
    params: {
      deptId,
      userId
    }
  })
}
