const userModel = require('../../model/userModel');
const baseUrl = require('../../utils/config')

const userService = {
  add: async ({ username, password, role, gender, phone, fullname }) => {
    let arr = await userModel.queryOneByUsername([username]);
    if (arr.length > 0) {
      return [];
    }
    return userModel.insert([username, password, fullname, role, gender, phone]);
  },
  
  remove: async ({ id }) => {
    return userModel.delete([id]);
  },

  updatePassword: async ({ username, confirmPassword }) => {
    return userModel.update({ password: confirmPassword }, { username });
  },
  updateAvatar: async ({ id }, file) => {
    const path = `${baseUrl}:3000/avatar_uploads/${file.filename}`;
    return userModel.update({ avatar: path }, { id });
  },
  updateUser: async ({ id, username, password, fullname, role, gender, phone }) => {
    return userModel.update({ username, password, fullname, role, gender, phone }, { id });
  },

  find: async ({ username, password }) => {
    return userModel.queryOne([username, password]);
  },
  findByUsername: async ({ username }) => {
    return userModel.queryOneByUsername([username]);
  },
  findByDepartment_id: async ({ department_id }) => {
    return userModel.queryOneByDepartment_id([department_id]);
  },
  login: async ({ username, password }) => {
    return userModel.query({ username, password });
  },
  findAll: async ({ fullname, role, gender, name, pagenum, pagesize }) => {
    pagenum = (pagenum - 1) * pagesize;
    return userModel.queryAll([fullname, role, gender, name, pagenum, pagesize]);
  }
};

module.exports = userService;
