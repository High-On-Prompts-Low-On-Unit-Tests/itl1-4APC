'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Jurors', [
      { name: 'M. Huber', email: 'm.huber@schule.at', createdAt: new Date(), updatedAt: new Date() },
      { name: 'S. Novak', email: 's.novak@schule.at', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Jurors', null, {});
  }
};
