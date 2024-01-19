var express = require('express');
var articleRouter = express.Router();
const articleController = require('../../controller/admin/articleController.js');

// 图片上传
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/article_uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
/* 文章分类 */
// articleRouter.post('/article/category/add', articleController.addCategory);

// articleRouter.delete('/article/category/delete', articleController.deleteCategory);

// articleRouter.post('/article/category/update', articleController.updateCategory);

articleRouter.post('/articles', articleController.getArticleList);
// articleRouter.get('/article/category/first', articleController.getFirstCategory);
// articleRouter.get('/article/category/second', articleController.getSecondCategory);

/* 文章管理 */


module.exports = articleRouter;
