const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { Sequelize } = require('sequelize');

////////////////////////////////////////////////////////////////////
//                         _           _                          //
//                __ _  __| |_ __ ___ (_)_ __                     //
//               / _` |/ _` | '_ ` _ \| | '_ \                    //
//              | (_| | (_| | | | | | | | | | |                   //
//               \__,_|\__,_|_| |_| |_|_|_| |_|                   //
//                                                                //
////////////////////////////////////////////////////////////////////

// LIST SEND CONTACT DAPP
const listSendDApp = (keyword = '', limit = 10, page = 1) =>
  new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit;
      const data = await db.tb_contactDApp.findAndCountAll({
        where: {
          [Sequelize.Op.or]: [
            { email: { [Sequelize.Op.like]: `%${keyword}%` } },
            { your_name: { [Sequelize.Op.like]: `%${keyword}%` } },
          ],
        },
        offset: Number(offset),
        limit: Number(limit),
        order: [['id', 'DESC']],
      });
      return resolve(handleSuccess(data, 'Get list successfully !'));
    } catch (error) {
      reject(error);
    }
  });

// DELETE SEND CONTACT DAPP
const deleteSendDApp = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await db.tb_contactDApp.findOne({ where: { id } });

      if (!data) {
        return resolve(handleFailed('Not found id !'));
      }
      await data.destroy();
      return resolve(handleSuccess(null, 'Delete successfully!'));
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  listSendDApp,
  deleteSendDApp,
};
