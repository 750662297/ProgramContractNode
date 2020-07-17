'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('companys', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      com_att:STRING(30),
      com_name:STRING(30),
      com_address:STRING(30),
      com_phone:INTEGER,
      bank_name:STRING(20),
      b_code:STRING(30),
      c_op_code:STRING(40),
      description:STRING(255),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companys');
  }
};
