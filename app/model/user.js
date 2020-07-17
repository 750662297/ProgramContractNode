'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username:STRING(30),
    password:STRING(255),
    department:STRING(30),
    user_op:STRING(30),
    token:STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};