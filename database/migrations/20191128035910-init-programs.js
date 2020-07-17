'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('programs', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      XM_ID:STRING(30),
      XM_NAME:STRING(30),
      department:STRING(20),
      XM_OP:STRING(30),
      XM_STATE:STRING(30),
      XM_HT:STRING(30),
      XM_DATE_start:STRING(20),
      XM_DATE_finish:STRING(20),
      created_at: DATE,
      updated_at: DATE,

     
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('programs');
  }
};
