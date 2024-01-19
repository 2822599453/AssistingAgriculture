import request from '@/utils/request'

// 获取文章分类
export const getCategoryListService = (data) => request.post('/article/categorys', data)
// 获取一级分类
export const getFirstCategoryService = () => request.get('/article/category/first')
// 获取二级分类
export const getSecondCategoryService = (parent_id) => request.get('/article/category/second', { params: { parent_id }})
// 更新文章分类
export const updateCategoryService = (data) => request.post('/article/category/update', data)
// 新增文章分类
export const addCategoryService = (data) => request.post('/article/category/add', data)
// 删除文章分类
export const deleteCategoryService = (id) => request.delete('/article/category/delete', { params: { id } });

// 获取文章列表
export const getArticleListService = (data) => request.post('/articles', data)

