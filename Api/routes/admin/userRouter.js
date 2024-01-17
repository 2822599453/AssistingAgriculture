var express = require('express');
var userRouter = express.Router();
const userController = require('../../controller/admin/userController.js');

// 图片上传
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatar_uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

userRouter.post('/login', userController.login);
userRouter.post('/user/add', userController.addUser);

userRouter.delete('/user/delete', userController.deleteUser);

userRouter.post('/user/update', userController.updateUser);
userRouter.post('/user/update/password', userController.updatePassword);
userRouter.post('/user/update/avatar', upload.single('rawFile'), userController.updateAvatar);

userRouter.get('/user/userinfo', userController.getUserInfo);
userRouter.post('/users', userController.getUserList);



module.exports = userRouter;
