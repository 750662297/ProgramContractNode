'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class CompanyService extends Service {
  async index() {
    console.log('company service 返回全部');
    // const res=await this.app.mysql.get('db1').select('companys')
    const res = await this.ctx.model.Companys.findAll();
    return res;
  }
  async create(p) {
    console.log(p);
    const res = await this.ctx.model.Companys.create({

      com_att: p.com_att,
      com_name: p.com_name,
      com_address: p.com_address,
      com_phone: p.com_phone,
      bank_name: p.bank_name,
      b_code: p.b_code,
      c_op_code: p.c_op_code,
      description: p.description,
    }).then(() => {
      const ini = 1;
      return ini;
    });
    return res;
  }
  //   async show(p) {

  //   }
  async search(re) {
    console.log(re);
    if (re.com_att === undefined) {
      console.log('单位筛选为空，只可前端搜索事件触发');
      const res = await this.ctx.model.Companys.findAll({
        where: {
          com_name: {
            [Op.like]: '%' + re.com_name + '%',
          },
        },
      });

      return res;
    } else if (re.com_name !== undefined) {
      console.log('单位名称不为空，单位筛选不为空');
      if (re.com_att === '甲方单位') {
        const res = await this.ctx.model.Companys.findAll({
          where: {
            com_name: {
              [Op.like]: '%' + re.com_name + '%',
            },
            com_att: '甲',
          },
        });
        return res;
      }

      const res = await this.ctx.model.Companys.findAll({
        where: {
          com_name: {
            [Op.like]: '%' + re.com_name + '%',
          },
          com_att: '乙',
        },
      });
      return res;

    }

    console.log('单位名称为空，单位筛选不为空');
    if (re.com_att === '甲方单位') {
      const res = await this.ctx.model.Companys.findAll({
        where: {
          com_att: '甲',
        },
      });
      return res;
    }

    const res = await this.ctx.model.Companys.findAll({
      where: {
        com_att: '乙',
      },
    });
    return res;


  }
  async destroy(p) {
    console.log(p);
    const res = await this.ctx.model.Companys.destroy({
      where: {
        id: p.id,
      },
    });
    console.log(res);
    return res;
  }
  async update_(p) {
    console.log(p);
    const row = {
      com_name: p.com_name,
      com_address: p.com_address,
      com_phone: p.com_phone,
      bank_name: p.bank_name,
      b_code: p.b_code,
      c_op_code: p.c_op_code,
      description: p.description,
    };
    const res = await this.ctx.model.Companys.update(row, {
      where: {
        id: p.id,
      },
    });
    return res;
  }
  async com_search(p) {
    console.log(p);
    const res = await this.ctx.model.Companys.findAll({
      where: {
        com_name: {
          [Op.like]: '%' + p.com_name + '%',
        },
        com_att: p.com_att,
      },
    });
    const r = [];
    for (let i = 0; i < res.length; i++) {
      r.push(res[i].com_name);
    }
    return r;
  }
}
module.exports = CompanyService;
