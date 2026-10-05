'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Members', [
      { teamId: 1, vorname: 'Lena', nachname: 'Huber', createdAt: new Date(), updatedAt: new Date() },
      { teamId: 1, vorname: 'Tom', nachname: 'Novak', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Members', null, {});
  }
};
