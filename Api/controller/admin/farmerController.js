const farmerService = require('../../service/admin/farmerService');

const farmerController = {
  getFarmerList: async (req, res) => {
    const result1 = await farmerService.findAll(req.body);
    if (result1.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const result2 = await farmerService.findAll({ ...req.body, pagenum: 1, pagesize: 1000 });
    const farmerList = result1[Object.keys(req.body).length - 2];
    const allFarmer = result2[Object.keys(req.body).length - 2];
    res.send({
      data: farmerList,
      code: 0,
      message: '获取农户列表',
      total: allFarmer.length
    });
  },
  addFarmer: async (req, res) => {
    const hasData = await farmerService.find(req.body);
    if(hasData.length > 0) {
      return res.status(400).send({
        code: -1,
        message: '已经存在该农户，请重新输入'
      });
    }
    const result = await farmerService.add(req.body);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '新增农户'
    });
  },
  updateFarmer: async (req, res) => {
    const result = await farmerService.update(req.body);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '更新农户成功'
    });
  },
  deleteFarmer: async (req, res) => {
    const result = await farmerService.remove(req.query);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '删除农户成功'
    });
  }
};
module.exports = farmerController;
