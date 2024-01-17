import request from '@/utils/request';

// // 登录
export const userLoginService = ({ username, password }) =>
  request.post('/login', { username, password });

// 更新用户头像
export const updateUserAvatarService = (data) =>
  request.post('/user/update/avatar', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
// 获取用户基本信息
export const getUserInfoService = () => request.get('/user/userinfo');
// 获取用户列表
export const getUserListService = (data) => request.post('/users', data);
// 删除用户
export const deleteUserService = (id) => request.delete('/user/delete', { params: { id } });
// 更新用户信息
export const updateUserService = (data) => request.post('user/update', data)
// 更新用户密码
export const updatePasswordService = (data) => request.post('user/update/password', data)
// 添加用户
export const addUserService = (data) => request.post('/user/add', data)