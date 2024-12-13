const { getRequest, postRequest } = require('./apiService');
const { createAccessToken,connectSocket} = require('./common');
const { template } = require('./menu');
// const { getData, saveData } = require('./dataService');

module.exports = {
//   fetchData,
//   getUserDetails,
//   saveUser,
  getRequest,
  postRequest,
  connectSocket,
  createAccessToken,
  template,
};