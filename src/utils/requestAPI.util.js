const { default: axios } = require('axios');
const { METHOD } = require('../constant/method.constant');

// ENCODE QUERY STRING
const encodeQueryString = (params = {}) => {
  const newObj = {};
  for (const item in params) {
    if (params[item]) {
      newObj[item] = params[item];
    }
  }
  const keys = Object.keys(newObj);
  return keys.length
    ? '?' +
    keys.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&')
    : '';
};

const requestAPI = async (url, data, method) => {
  try {
    const options = {
      method: method,
      url: method === METHOD.GET ? url + encodeQueryString(data) : url,
      data: data,
      withCredentials: true,
    };
    const response = await axios(options);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  requestAPI,
};
