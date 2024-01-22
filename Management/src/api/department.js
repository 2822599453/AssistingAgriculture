import request from '@/utils/request';

// 获取职能部门
export const getDepartmentListService = (data) => request.post('/departments', data);
// 添加职能部门
export const addDepartmentService = (data) => request.post('/department/add', data);
// 修改职能部门
export const updateDepartmentService = (data) => request.post('/department/update', data);
// 删除职能部门
export const deleteDepartmentService = (id) => request.delete('/department/delete', { params: { id } });
