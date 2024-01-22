const departmentService = require('../../service/admin/departmentService');
const userService = require('../../service/admin/userService');

const departmentController = {
  getDepartmentList: async (req, res) => {
    const result = await departmentService.findAll(req.body);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const departmentList = result[Object.keys(req.body).length];
    res.send({
      data: departmentList,
      code: 0,
      message: '获取职能部门列表'
    });
  },
  addDepartment: async (req, res) => {
    const hasData = await departmentService.find(req.body);
    if(hasData.length > 0) {
      return res.status(400).send({
        code: -1,
        message: '已经存在该职能部门，请重新输入'
      });
    }
    const result = await departmentService.add(req.body);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '新增职能部门'
    });
  },
  updateDepartment: async (req, res) => {
    const result = await departmentService.update(req.body);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '更新职能部门成功'
    });
  },
  deleteDepartment: async (req, res) => {
    const user = await userService.findByDepartment_id({department_id: req.query.id})
    console.log(user)
    if (user.length > 0) {
      return res.status(400).send({
        code: -1,
        message: '仍有人员挂靠在该部门，请删除该部门的所有人员'
      });
    }
    const result = await departmentService.remove(req.query);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '删除职能部门成功'
    });
  }
};
module.exports = departmentController;
