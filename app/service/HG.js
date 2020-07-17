'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class HGservice extends Service {

  async index() {
    console.log('service 已接收');
    console.log('一步已过');
    const re = await this.ctx.model.Contract.findAll();
    return re;
  }
  async show(p) {
    const a = await this.ctx.model.Contract.findAll({
      where: {
        ht_firstop: p.id,
      },
      attributes: [ 'ht_name', 'xm_ht', 'department', 'ht_date_start' ],
    });
    const b = await this.ctx.model.Contract.findAll({
      where: {
        ht_secondop: p.id,
      },
      attributes: [ 'ht_name', 'xm_ht', 'department', 'ht_date_start' ],
    });
    for (let i = 0; i < b.length; i++) {
      a.push(b[i]);
    }

    return a;
  }
  async create(p) {
    console.log('create service had got');

    const insert = await this.ctx.model.Contract.create({
      ht_id: p.ht_id,
      ht_name: p.ht_name,
      xm_ht: p.xm_ht,
      tag: p.tag,
      ht_firstop: p.ht_firstop,
      ht_firstopman: p.ht_firstopman,
      ht_secondop: p.ht_secondop,
      ht_secondopman: p.ht_secondopman,
      rate: p.rate,
      department: p.department,
      ht_date_start: p.ht_date_start,
      ht_date_finish: p.ht_date_finish,
      ht_money: p.ht_money,
      m_pay: p.m_pay,
      pay_first: p.pay_first,
      pay_first_date: p.pay_first_date,
      pay_second: p.pay_second,
      pay_second_date: p.pay_second_date,
      pay_third: p.pay_third,
      pay_third_date: p.pay_third_date,
      pay_fourth: p.pay_fourth,
      pay_fourth_date: p.pay_fourth_date,
      //    pay_fifth:p.pay_fifth,
      pay_fifth_date: p.pay_fifth_date,
    }).then(res => {


      return res.id;
    });
    return insert;
  }
  async update_(p) {
    console.log('update_ had got');
    const row = {
      ht_name: p.ht_name,
      ht_firstop: p.ht_firstop,
      ht_firstopman: p.ht_firstopman,
      ht_secondop: p.ht_secondop,
      ht_secondopman: p.ht_secondopman,
      ht_date_finish: p.ht_date_finish,
    };
    const abc = await this.ctx.model.Contract.update(row, {
      where: {
        id: p.id,
      },
    });
    console.log(abc);
    return abc;
  }

  async destroy(p) {
    console.log('destory service had got');

    const res = await this.ctx.model.Contract.destroy({
      where: {
        id: p.id,
      },
    });
    return res;
  }
  async search(params) {
    console.log('search XG');
    const res = await this.ctx.model.Contract.findAll({
      where: {
        ht_id: {
          [Op.like]: '%' + params.ht_id + '%',
        },
        ht_name: {
          [Op.like]: '%' + params.ht_name + '%',
        },
        xm_ht: {
          [Op.like]: '%' + params.xm_ht + '%',
        },

      },
    });
    return res;
  }
  async home_contract() {
    console.log('home_contract');
    const res = await this.ctx.model.Contract.findAll({
      where: {
        created_at: {
          [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    return res;
  }
  async file(p, t) {
    const f = { ht_file: t };
    const ab = await this.ctx.model.Contract.update(f, {
      where: {
        id: p,
      },
    });
    console.log(ab);
  }
  async download(p) {
    const res = await this.ctx.model.Contract.findOne({
      where: {
        id: p,
      },
      attributes: [ 'ht_file' ],
    });
    let b = JSON.stringify(res);
    b = b.replace(/\\/g, '/');
    b = b.replace(/\/\//g, '/');
    const d = JSON.parse(b).ht_file;
    const a = 'http://127.0.0.1:7001/' + d;
    console.log(a);
    return a;
  }
}
module.exports = HGservice;
