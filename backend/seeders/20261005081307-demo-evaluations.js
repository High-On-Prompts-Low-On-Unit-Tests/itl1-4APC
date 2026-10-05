'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Evaluations', [
      {
        projectId: 1,
        criterionId: 1,
        jurorId: 1,
        score: 8,
        comment: 'Konzept klar erklärt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: 1,
        criterionId: 2,
        jurorId: 1,
        score: 7,
        comment: 'Etwas zu textlastige Folien',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        projectId: 2,
        criterionId: 3,
        jurorId: 2,
        score: 9,
        comment: 'Saubere Hardware-Dokumentation',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Evaluations', null, {});
  }
};
