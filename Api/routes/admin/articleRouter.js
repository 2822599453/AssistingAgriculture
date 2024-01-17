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

// articleRouter.post('/login', articleController.login);
// articleRouter.post('/user/add', articleController.addUser);

// articleRouter.delete('/user/delete', articleController.deleteUser);

articleRouter.post('/article/category/update', articleController.updateCategory);
// articleRouter.post('/user/update/password', articleController.updatePassword);
// articleRouter.post('/user/update/avatar', upload.single('rawFile'), articleController.updateAvatar);

articleRouter.post('/article/category', articleController.getCategoryList);
articleRouter.get('/article/category/first', articleController.getFirstCategory);
// articleRouter.post('/users', articleController.getUserList);



module.exports = articleRouter;
