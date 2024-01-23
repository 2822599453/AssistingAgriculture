const articleService = require('../../service/admin/articleService');

const articleController = {
  getArticleList: async (req, res) => {
    const result1 = await articleService.findAll(req.body);
    if (result1.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const result2 = await articleService.findAll({...req.body, pagenum: 1, pagesize: 1000})
    console.log(result2)
    console.log(req.body)
    const articleList = result1[Object.keys(req.body).length-3]
    const allArticle = result2[Object.keys(req.body).length-3]
    res.send({
      data: articleList,
      code: 0,
      message: '获取文章列表',
      total: allArticle.length
    });
  },
  addArticle:async (req, res) => {
    console.log(req.body)
    const result = await articleService.add(req.body, req.file);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '新增文章',
    });
  },
  getArticleDetail: async (req, res) => {
    const result = await articleService.findOne(req.body);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      data: result[0],
      code: 0,
      message: '获取文章详情'
    });
  },
  updateArticle:async (req, res) => {
    const result = await articleService.update(req.body, req.file);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '修改文章',
    });
  },
  deleteArticle:async (req, res) => {
    const result = await articleService.remove(req.query);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '删除失败，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '删除文章成功'
    });
  },
};
module.exports = articleController;
