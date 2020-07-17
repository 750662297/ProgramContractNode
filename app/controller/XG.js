'use strict';
const Controller = require('egg').Controller;
// const checktoken = require('../token/checktoken.js');
class XGController extends Controller {
  async index() {
    console.log('index');
    const res = await this.ctx.service.xG.index();
    this.ctx.body = res;
  }
  async create() {
    console.log('XG create');
    const params = this.ctx.request.body;
    const res = await this.ctx.service.xG.create(params);
    this.ctx.body = {
      insert: res,
      message: 'had insert',
    };

  }
  async search() {
    const params = this.ctx.request.body;
    console.log(params);
    const res = await this.ctx.service.xG.search(params);
    this.ctx.body = res;
  }
  async show() {
    const ctx = this.ctx;
    const res = await this.ctx.service.xG.show(ctx.params);

    this.ctx.body = res;

  }
  async update_() {
    const ctx = this.ctx;
    const res = await this.ctx.service.xG.update_(ctx.request.body);
    this.ctx.body = res;
  }
  async destroy() {
    console.log('destroy已接收');
    const ctx = this.ctx;
    const res = await this.ctx.service.xG.destroy(ctx.params);
    this.ctx.body = res;
  }
  async home_program() {
    const res = await this.ctx.service.xG.home_program();
    this.ctx.body = res;
  }
}
module.exports = XGController;
