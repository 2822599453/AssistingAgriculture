const userService = require('../../service/admin/userService');
const jwt = require('../../utils/jwt');

const userController = {
  // 登录
  login: async (req, res) => {
    // console.log(req.body)
    const result = await userService.find(req.body);
    if (result.length === 0) {
      res.status(404).send({
        code: -1,
        message: '用户名密码不匹配'
      });
    } else {
      const token = jwt.generate({ id: result[0].id, username: result[0].username }, '1d');
      res.header('Authoization', token);
      // console.log(result);
      res.send({
        data: result[0],
        code: 0,
        token
      });
    }
  },
  // 添加用户
  addUser: async (req, res) => {
    const result = await userService.add(req.body);
    if (result.length === 0) {
      res.status(400).send({
        code: -1,
        message: '该用户已经存在'
      });
    } else {
      res.send({
        code: 0,
        message: '添加成功'
      });
    }
  },
  // 更新用户密码
  updatePassword: async (req, res) => {
    const hasAccount = await userService.find(req.body);
    if (hasAccount.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '密码不正确'
      });
    }
    const result = await userService.updatePassword(req.body);
    if (result.length !== 0) {
      res.send({
        code: 0,
        message: '密码修改成功'
      });
    }
  },
  // 更新用户头像
  updateAvatar: async (req, res) => {
    // console.log(req.file)
    const result = await userService.updateAvatar(req.body, req.file);
    if (result.length === 0) {
      return res.status(400).send({
        code: '-1',
        message: '头像修改失败，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '头像修改成功'
    });
  },
  // 更新用户信息
  updateUser: async (req, res) => {
    const hasUser = await userService.findByUsername(req.body);
    if (hasUser.length === 0) {
      return res.status(403).send({
        code: -1,
        message: '找不到该用户'
      });
    }
    const result = await userService.updateUser(req.body);
    if (result.length === 0) {
      return res.send({
        code: -1,
        message: '更新用户信息失败，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '更新用户信息成功'
    });
  },
  // 获取用户信息
  getUserInfo: async (req, res) => {
    const token = req.headers['authorization'];
    if (token) {
      const payload = jwt.verify(token);
      const result = await userService.findByUsername(payload);
      if (result.length > 0) {
        return res.send({
          data: result[0],
          code: 0,
          message: '获取用户信息'
        });
      }
    }
    res.status(404).send({
      code: -1,
      message: '找不到该用户'
    });
  },
  // 获取所有用户
  getUserList: async (req, res) => {
    const result1 = await userService.findAll(req.body);
    if (result1.length === 0) {
      return res.send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const result2 = await userService.findAll({ ...req.body, pagenum: 1, pagesize: 1000 });
    const userList = result1[Object.keys(req.body).length - 2];
    const allUser = result2[Object.keys(req.body).length - 2];
    res.send({
      data: userList,
      code: 0,
      message: '获取用户列表',
      total: allUser.length
    });
  },
  // 删除用户
  deleteUser: async (req, res) => {
    const result = await userService.remove(req.query);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '删除失败，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '删除用户成功'
    });
  }
};
module.exports = userController;


