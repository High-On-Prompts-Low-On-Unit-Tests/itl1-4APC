'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Criteria', [
      { name: 'Inhalt', maxScore: 10, weight: 1.0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Präsentationstechnik', maxScore: 10, weight: 1.0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Technische Umsetzung', maxScore: 10, weight: 1.5, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Criteria', null, {});
  }
};
