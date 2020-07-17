'use strict';
const Controller = require('egg').Controller;
const createRule = {
  // accesstoken:'string',
};
class CompanyController extends Controller {
  async index() {
    const ctx = this.ctx;
    // ctx.validate(createRule,ctx.request.body);
    const res = await ctx.service.company.index();
    this.ctx.body = res;
  }
  async create() {
    const ctx = this.ctx;
    const res = await ctx.service.company.create(this.ctx.request.body);
    this.ctx.body = res;
  }
  //   async show() {

  //   }
  async search() {

    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const res = await ctx.service.company.search(ctx.request.body);
    this.ctx.body = res;
  }
  async destroy() {
    console.log('destroy');
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.params);
    const res = await ctx.service.company.destroy(ctx.params);
    this.ctx.body = res;
  }
  async update_() {
    console.log('company update_');
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const res = await ctx.service.company.update_(ctx.request.body);
    this.ctx.body = res;
  }
  async com_search() {
    const ctx = this.ctx;
    const res = await ctx.service.company.com_search(ctx.request.body);
    this.ctx.body = res;
  }

}
module.exports = CompanyController;
