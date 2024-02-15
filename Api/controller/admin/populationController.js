const populationService = require('../../service/admin/populationService');

const populationController = {
  getPopulationList: async (req, res) => {
    const result1 = await populationService.findAll(req.body);
    if (result1.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    const result2 = await populationService.findAll({ ...req.body, pagenum: 1, pagesize: 1000 });
    const populationList = result1[Object.keys(req.body).length - 2];
    const allPopulation = result2[Object.keys(req.body).length - 2];
    res.send({
      data: populationList,
      code: 0,
      message: '获取人口就业列表',
      total: allPopulation.length
    });
  },
  addPopulation: async (req, res) => {
    const hasData = await populationService.find(req.body);
    if (hasData.length > 0) {
      return res.status(400).send({
        code: -1,
        message: '已存在该年份的人口就业情况，请重新选择'
      });
    }
    const result = await populationService.add(req.body);
    if (result.length === 0) {
      return res.status(400).send({
        code: -1,
        message: '出错了，请联系管理员'
      });

    }
    res.send({
      code: 0,
      message: '新增人口'
    });
  },
  updatePopulation: async (req, res) => {
    const result = await populationService.update(req.body);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '更新人口成功'
    });
  },
  deletePopulation: async (req, res) => {
    const result = await populationService.remove(req.query);
    if (result.length === 0) {
      return res.status(404).send({
        code: -1,
        message: '出错了，请联系管理员'
      });
    }
    res.send({
      code: 0,
      message: '删除人口成功'
    });
  }
};
module.exports = populationController;

