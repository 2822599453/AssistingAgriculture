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

/* 商户 */
// 获取商户列表
export const getStoreListService = (data) => request.post('/stores', data);
// 添加商户
export const addStoreService = (data) => request.post('/store/add', data);
// 修改商户
export const updateStoreService = (data) => request.post('/store/update', data);
// 删除商户
export const deleteStoreService = (id) => request.delete('/store/delete', { params: { id } });