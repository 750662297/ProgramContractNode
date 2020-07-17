'use strict';
const Controller = require('egg').Controller;

class changeController extends Controller {
  async get() {
    this.ctx.body = {
      code: 200,
    };
  }
}
module.exports = changeController;
