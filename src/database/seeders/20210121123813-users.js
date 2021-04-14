'use strict';
const bcrypt =  require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add user seed commands here.
    */

   await queryInterface.bulkInsert('users', [{
      displayName: 'John Doe',
      email: 'John@gmail.com',
      password : await bcrypt.hash('password', 10),
      reputation: 0,
      active : true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
