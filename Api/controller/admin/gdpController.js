const gdpService = require('../../service/admin/gdpService');

const gdpController = {
  getGdpList: async (req, res) => {
    const result1 = await gdpService.findAll(req.body);
    if (result1.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const result2 = await gdpService.findAll({ ...req.body, pagenum: 1, pagesize: 1000 });
    const gdpList = result1[Object.keys(req.body).length - 2];
    const allGdp = result2[Object.keys(req.body).length - 2];
    res.send({
      data: gdpList,
      code: 0,
      message: '获取生产总值列表',
      total: allGdp.length
    });
  },
  addGdp: async (req, res) => {
    const hasData = await gdpService.find(req.body);
    if (hasData.length > 0) {
      return res.status(400).send({
        code: -1,
        message: '已存在该年份的生产总值，请重新选择'
      });
    }
    const result = await gdpService.add(req.body);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '出错了，请联系管理员'
      });

    }
    res.send({
      code: 0,
      message: '新增gdp'
    });
  },
  updateGdp: async (req, res) => {
    const result = await gdpService.update(req.body);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '更新gdp成功'
    });
  },
  deleteGdp: async (req, res) => {
    const result = await gdpService.remove(req.query);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '删除gdp成功'
    });
  }
};
module.exports = gdpController;

