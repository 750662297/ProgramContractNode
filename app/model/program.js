'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Program = app.model.define('program', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      xm_id:STRING(30),
      xm_name:STRING(30),
      department:STRING(20),
      xm_op:STRING(30),
      xm_state:STRING(30),
      xm_ht:STRING(30),
      xm_date_start:STRING(20),
      xm_date_finish:STRING(20),
      created_at: DATE,
      updated_at: DATE,
  });

  return Program;
};