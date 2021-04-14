'use strict';
const bcrypt =  require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('users', [{
      name: 'Mono Admin',
      email: 'admin@mono-api.com',
      password : await bcrypt.hash('password', 10),
      active : true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
