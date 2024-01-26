

const farmerModel = require('../../model/farmerModel');

const farmerService = {
  add: async ({ name, gender, ID_card, phone, address }) => {
    return farmerModel.insert([name, gender, ID_card, phone, address]);
  },
  remove: async ({ id }) => {
    return farmerModel.delete([id]);
  },
  update: async ({ name, gender, ID_card, phone, address, id}) => {
    return farmerModel.update([name, gender, ID_card, phone, address, id]);
  },
  find: async ({ ID_card }) => {
    return farmerModel.query([ID_card]);
  },
  findAll: async ({ name, ID_card, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return farmerModel.queryAll([name, ID_card, pagenum, pagesize]);
  }
};

module.exports = farmerService;
