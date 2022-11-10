'use strict';
let fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/user.json', 'utf8')).map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      delete el.id
      return el
    })
    return queryInterface.bulkInsert('Users', data, {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
