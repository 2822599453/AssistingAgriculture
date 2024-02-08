const storeService = require('../../service/admin/storeService');

const storeController = {
  getStoreList: async (req, res) => {
    const result1 = await storeService.findAll(req.body);
    if (result1.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const result2 = await storeService.findAll({ ...req.body, pagenum: 1, pagesize: 1000 });
    const storeList = result1[Object.keys(req.body).length - 2];
    const allStore = result2[Object.keys(req.body).length - 2];
    res.send({
      data: storeList,
      code: 0,
      message: '获取商户列表',
      total: allStore.length
    });
  },
  addStore: async (req, res) => {
    const hasData = await storeService.find(req.body);
    if(hasData.length > 0) {
      return res.status(400).send({
        code: -1,
        message: '已经存在该商户，请重新输入'
      });
    }
    const result = await storeService.add(req.body);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '新增商户'
    });
  },
  updateStore: async (req, res) => {
    const result = await storeService.update(req.body);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '更新商户成功'
    });
  },
  deleteFarmer: async (req, res) => {
    const result = await storeService.remove(req.query);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '删除商户成功'
    });
  }
};
module.exports = storeController;
