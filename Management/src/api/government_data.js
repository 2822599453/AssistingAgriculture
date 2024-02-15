import request from '@/utils/request';
/* gdp */
// 获取gdp列表
export const getGdpListService = (data) => request.post('/gdps', data);
// 添加 gdp
export const addGdpService = (data) => request.post('/gdp/add', data);
// 修改 gdp
export const updateGdpService = (data) => request.post('/gdp/update', data);
// 删除 gdp
export const deleteGdpService = (id) => request.delete('/gdp/delete', { params: { id } });

/* 人口就业 */
// 获取人口就业列表
export const getPopulationListService = (data) => request.post('/population', data);
// 添加人口就业
export const addPopulationService = (data) => request.post('/population/add', data);
// 修改人口就业
export const updatePopulationService = (data) => request.post('/population/update', data);
// 删除人口就业
export const deletePopulationService = (id) => request.delete('/population/delete', { params: { id } });