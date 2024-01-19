const categoryService = require('../../service/admin/categoryService');

const categoryController = {
  getCategoryList: async (req, res) => {
    const result1 = await categoryService.findAll(req.body);
    if (result1.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const result2 = await categoryService.findAll({ ...req.body, pagenum: 1, pagesize: 1000 })
    const categoryList = result1[Object.keys(req.body).length-2]
    const allCategory = result2[Object.keys(req.body).length-2]
    res.send({
      data: categoryList,
      code: 0,
      message: '获取文章目录列表',
      total: allCategory.length
    });
  },
  getSecondCategory: async (req, res) => {
    console.log(req.query)
    const result = await categoryService.find(req.query);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      data: result,
      code: 0,
      message: '获取二级分类',
    });
  },
  getFirstCategory: async (req, res) => {
    const result = await categoryService.find();
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      data: result,
      code: 0,
      message: '获取一级分类',
    });
  },
  updateCategory: async (req, res) => {
    const result = await categoryService.update(req.body);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '更新文章分类成功',
    });
  },
  addCategory: async (req, res) => {
    const result = await categoryService.add(req.body);
    if (result.length === 0) {
      return res.send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '新增文章分类',
    });
  },
  deleteCategory: async (req, res) => {
    const result = await categoryService.remove(req.query);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '删除文章分类成功',
    });
  },
};
module.exports = categoryController;
