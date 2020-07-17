'use strict';
const Service = require('egg').Service;
const createToken = require('../token/createtoken.js');
const crypto = require('crypto');

class UsersService extends Service {
  async search(params) {
    const password = crypto.createHash('sha256').update(params.password).digest('hex');
    const res = await this.ctx.model.User.findOne({
      where: {
        username: params.username,
      },
    });
    let re;
    console.log(res);
    if (res != null) {
      const pwd = res.password;
      if (password !== pwd) {
        re = {
          code: 2,
          token: '0',
          username: params.username,
          message: '密码错误',
        };
      } else {
        re = this.search_token(params, res);

      }

    } else {
      re = {
        code: 0,
        token: '0',
        username: params.username,
        message: '无此用户',
      };
    }
    // console.log(re);
    return re;


  }
  async search_token(params, res) {
    const toke = createToken(params.username);
    const to = { token: toke };
    const a = await this.ctx.model.User.update(to, {
      where: {
        username: params.username,
      },
    }).then(resp => {
      console.log('resp:' + resp);
      if (resp == 1) {//eslint-disable-line
        const a = {
          code: 1,
          token: toke,
          username: params.username,
          department: res.department,
          message: '校验成功',

        };
        console.log('a:' + JSON.stringify(a));
        return a;

      }
    }).catch(err => {
      console.log(err);
      const a = {
        code: 3,
      };
      return a;

    });
    return a;
  }

  async update_other(p) {
    const password = crypto.createHash('sha256').update(p.password).digest('hex');
    const re = await this.ctx.model.User.create({
      username: p.username,
      password,
      department: p.department,
      user_op: p.users_op,
    }).then(() => {
      const ini = '1';
      return ini;
    });
    return re;
  }
}
module.exports = UsersService;
