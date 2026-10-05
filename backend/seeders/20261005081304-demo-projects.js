'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Projects', [
      {
        teamId: 1,
        titel: 'Dezentrale Wahl-App',
        beschreibung: 'Abstimmungssystem auf Basis einer Blockchain',
        praesentiertAm: '2026-06-12',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teamId: 2,
        titel: 'Autonomer Greifarm',
        beschreibung: 'Robotikarm mit Bilderkennung',
        praesentiertAm: '2026-06-12',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
