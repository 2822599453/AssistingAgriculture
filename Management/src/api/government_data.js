import request from '@/utils/request';
/* gdp */
// 获取gdp列表
export const getGdpListService = (data) => request.post('/gdps', data);
// 添加gdp
export const addGdpService = (data) => request.post('/gdp/add', data);
// 修改gdp
export const updateGdpService = (data) => request.post('/gdp/update', data);
// 删除gdp
export const deleteGdpService = (id) => request.delete('/gdp/delete', { params: { id } });