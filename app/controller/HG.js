'use strict';
const Controller = require('egg').Controller;
const send = require('stream-wormhole');
const fs = require('fs');
const path = require('path');
// const querystring = require('querystring');
const createRule = {
  // accesstoken:'string',
};
class HGController extends Controller {
  async index() {
    console.log('已接收');
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const res = await ctx.service.hG.index(ctx.request.body);
    this.ctx.body = res;
  }
  async show() {
    console.log('show已接收');
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.params);
    console.log('valdate finish');
    console.log('111:' + JSON.stringify(ctx.params));
    const res = await this.ctx.service.hG.show(ctx.params);

    this.ctx.body = res;


  }
  async create() {
    console.log('create已接收');
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    console.log('valdate finish');
    const reg = await this.ctx.service.hG.create(ctx.request.body);
    const re = {
      id: reg,
      message: 'had insert',
    };
    // console.log(re)
    this.ctx.body = re;
  }
  //   async update() {
  //   }
  async update_() {
    console.log('update_已接收');
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    // console.log()
    const res = await this.ctx.service.hG.update_(ctx.request.body);
    this.ctx.body = res;
  }
  async destroy() {
    console.log('destory已接收');
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.params);
    console.log('valdate finish');
    const res = await this.ctx.service.hG.destroy(ctx.params);
    this.ctx.body = res;
  }
  async search() {
    const params = this.ctx.request.body;
    console.log(params);
    const res = await this.ctx.service.hG.search(params);
    this.ctx.body = res;
  }
  async home_contract() {
    const res = await this.ctx.service.hG.home_contract();
    this.ctx.body = res;
  }
  async file() {
    console.log('file');
    const stream = await this.ctx.getFileStream();
    const filename = stream.filename;
    const zip = 'zip';
    const rar = 'rar';
    console.log(filename);
    const data = this.ctx.header.data;
    let target;
    let tar;
    if (filename.includes(zip)) {
      target = path.join('./app/public/', `uploadfile/${data}.zip`);
      tar = path.join('./public/', `uploadfile/${data}.zip`);
    }
    if (filename.includes(rar)) {
      target = path.join('./app/public/', `uploadfile/${data}.rar`);
      tar = path.join('./public/', `uploadfile/${data}.rar`);
    }


    const result = await new Promise((resolve, reject) => {
      const remoteFileStream = fs.createWriteStream(target);
      stream.pipe(remoteFileStream);

      let errFlag;
      remoteFileStream.on('error', err => {

        errFlag = true;
        send(stream);
        remoteFileStream.destroy();
        reject(err);
      });

      remoteFileStream.on('finish', () => {

        if (errFlag) return;
        resolve({ filename, name: stream.fields.name });
      });

    });
    await this.ctx.service.hG.file(this.ctx.request.header.data, tar);
    const re = {
      code: 200,
      data: result,
      message: '文件上传成功',
    };
    this.ctx.body = re;

  }
  async download() {
    const b = this.ctx.request.body;
    const a = await this.ctx.service.hG.download(b.id);
    this.ctx.body = a;
  }
}
module.exports = HGController;
