'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const checkToken = require('./token/checktoken.js');
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/change', checkToken, controller.change.get);
  router.get('/XG', '/api/XG/home_program', checkToken, app.controller.xG.home_program);
  router.get('/HG', '/api/HG/home_contract', checkToken, app.controller.hG.home_contract);
  router.post('/HG', '/api/HG/download', checkToken, app.controller.hG.download);
  router.post('/HG', '/api/HG/file', checkToken, app.controller.hG.file);
  router.post('/users', controller.users.search);
  router.post('/users/update_other', checkToken, controller.users.update_other);
  router.resources('/XG', '/api/XG', checkToken, app.controller.xG);
  router.post('/XG', '/api/XG/search', checkToken, app.controller.xG.search);
  router.post('/HG', '/api/HG/search', checkToken, app.controller.hG.search);
  router.post('/HG', '/api/HG/update_', checkToken, app.controller.hG.update_);
  router.post('/company', '/api/company/update_', checkToken, app.controller.company.update_);
  router.post('/XG', '/api/XG/update_', checkToken, app.controller.xG.update_);
  router.post('/company', '/api/company/com_search', checkToken, app.controller.company.com_search);
  router.resources('/HG', '/api/HG', checkToken, app.controller.hG);
  router.resources('/company', '/api/company', checkToken, app.controller.company);
  router.post('/company', '/api/company/search', checkToken, app.controller.company.search);
};
