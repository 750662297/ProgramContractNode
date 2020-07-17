'use strict';
const Controller = require('egg').Controller;
// const createToken = require('../token/createtoken.js');
class usersController extends Controller {
  async search() {
    const params = this.ctx.request.body;
    console.log(params);
    console.log(params.username);
    const res = await this.ctx.service.users.search(params);
    this.ctx.body = res;

  }
  //   async update_item() {

  //   }
  async update_other() {
    const ctx = this.ctx;
    const res = await this.ctx.service.users.update_other(ctx.request.body);
    this.ctx.body = res;
  }
}
module.exports = usersController;
