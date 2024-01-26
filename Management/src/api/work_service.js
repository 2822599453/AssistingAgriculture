import request from '@/utils/request';

/* 农户 */
// 获取农户列表
export const getFarmerListService = (data) => request.post('/farmers', data);
// 添加农户
export const addFarmerService = (data) => request.post('/farmer/add', data);
// 修改农户
export const updateFarmerService = (data) => request.post('/farmer/update', data);
// 删除农户
export const deleteFarmerService = (id) => request.delete('/farmer/delete', { params: { id } });