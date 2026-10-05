'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Teams', [
      { name: 'Team Blockchain', klasse: '4AHITL', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Team RoboArm', klasse: '4AHITL', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
