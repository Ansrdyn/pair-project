'use strict';
let fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
   let data = JSON.parse(fs.readFileSync('./data/post.json', 'utf-8')).map((el)=>{
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
   })
     return queryInterface.bulkInsert('Posts', data, {});
  },

   down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Posts', null, {});
  }
};