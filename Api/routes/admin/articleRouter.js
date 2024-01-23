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
articleRouter.post('/article/add',upload.single('cover'), articleController.addArticle);

articleRouter.delete('/article/delete', articleController.deleteArticle);

articleRouter.post('/article/update',upload.single('cover'), articleController.updateArticle);

articleRouter.post('/articles', articleController.getArticleList);
articleRouter.post('/article/detail', articleController.getArticleDetail);

/* 文章管理 */


module.exports = articleRouter;
