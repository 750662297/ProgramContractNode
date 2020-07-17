'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class XGService extends Service {
  async index() {
    const res = await this.ctx.model.Program.findAll();
    return res;
  }
  async create(params) {
    console.log(params);
    const re = await this.ctx.model.Program.create({
      xm_id: params.xm_id,
      xm_name: params.xm_name,
      xm_op: params.xm_op,
      xm_state: params.xm_state,
      xm_ht: params.xm_name,
      department: params.department,
      xm_date_start: params.xm_date_start,
      xm_date_finish: params.xm_date_finish,

    }).then(res => {
      console.log(res);
      const ini = '1';
      return ini;
    });
    console.log(re);
    return re;
  }
  async search(params) {
    console.log('search XG');
    const res = await this.ctx.model.Program.findAll({
      where: {
        xm_id: {
          [Op.like]: '%' + params.xm_id + '%',
        },
        xm_name: {
          [Op.like]: '%' + params.xm_name + '%',
        },
        xm_op: {
          [Op.like]: '%' + params.xm_op + '%',
        },

      },
    });
    return res;
  }
  async show(params) {
    const res = await this.ctx.model.Program.findAll({
      where: {
        xm_ht: {
          [Op.like]: '%' + params.id + '%',
        },
      },

    });
    const r = [];
    for (let i = 0; i < res.length; i++) {
      r.push(res[i].xm_ht);
    }
    return r;
  }
  async update_(p) {
    const row = {
      xm_name: p.xm_name,
      xm_op: p.xm_op,
      xm_state: p.xm_state,
      xm_date_finish: p.xm_date_finish,
    };
    console.log(p.xm_date_finish);
    const res = await this.ctx.model.Program.update(row, {
      where: {
        id: p.id,
      },
    });
    return res;
  }
  async destroy(p) {
    console.log('destory service had got');

    const res = await this.ctx.model.Program.destroy({
      where: {
        id: p.id,
      },
    });
    return res;
  }
  async home_program() {
    const res = await this.ctx.model.Program.findAll({
      where: {
        created_at: {
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    return res;
  }
}
module.exports = XGService;
