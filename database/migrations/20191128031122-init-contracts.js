'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('contracts', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      ht_id:STRING(40),
      ht_name:STRING(30),
      XM_HT:STRING(30),
      department:STRING(20),
      tag:STRING(30),
      ht_firstop:STRING(20),
      ht_firstopman:STRING(30),
      ht_secondop:STRING(20),
      ht_secondopman:STRING(20),
      rate:STRING(20),
      ht_date_start:STRING(30),
      ht_date_finish:STRING(30),
      ht_money:INTEGER,
      m_pay:STRING(30),
      pay_first:STRING(30),
      pay_first_date:STRING(30),
      pay_second:STRING(30),
      pay_second_date:STRING(30),
      pay_third:STRING(30),
      pay_third_date:STRING(30),
      pay_fourth:STRING(30),
      pay_fourth_date:STRING(30),
      pay_fifth:STRING(30),
      pay_fifth_date:STRING(30),
      ht_file:STRING(255),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contracts');
  }
};
