const articleService = require('../../service/admin/articleService');
const jwt = require('../../utils/jwt');

const articleController = {
  getCategoryList: async (req, res) => {
    const result = await articleService.findAll(req.body);
    if (result.length === 0) {
      return res.send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const allCategory = await articleService.findAll(req.body, 'all')
    const categoryList = result[Object.keys(req.body).length-2]
    res.send({
      data: categoryList,
      code: 0,
      message: '获取文章目录列表',
      total: allCategory.length
    });
  },
  getFirstCategory: async (req, res) => {
    const result = await articleService.find();
    if (result.length === 0) {
      return res.send({
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
    const result = await articleService.update(req.body);
    if (result.length === 0) {
      return res.send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      data: result,
      code: 0,
      message: '更新文章分类',
    });
  }
};
module.exports = articleController;
