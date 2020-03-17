const sequelize = require('../mapper/sequelize');
const uuid = require('uuid')

/**
 * 表模型的基类
 */
class Model {
    constructor(tableName, tableStructure, option, callback) {
        /** 创建表的时候，指定字符集，兼容低版本的 mysql 数据库 */
        Object.assign(option, {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });

        this.orm = sequelize.define(tableName, tableStructure, option);

        sequelize.sync().then((result) => {
            // 同步了模型以后，执行回调
            if (result && callback) {
                callback(this.orm);
            }
        });
    }

    // 单个查询
    get(data) {
        return this.orm.findOne({
            where: data,
        });
    }

    // 批量查询
    async batchGet(obj) {
        const {
            page = 1,
            limit = 20,
            where = {},
        } = obj
        const offset = (page - 1) * limit
        const res = await this.orm.findAndCountAll({
            offset,
            limit,
            where,
            order: [['createdAt', 'DESC']]
        })
        const rsl = {
            records: res.rows,
            total: res.count,
            page,
            limit
        }
        return rsl
    }

    // 全部查询
    findAll() {
        return this.orm.findAll();
    }

    // 单个增加
    async add(data, ctx) {
        ctx.checkPower()
        if (!data.id) {
            data.id = uuid.v4()
        }
        return this.orm.create(data);
    }

    // 单个移出 传null表示删除全部
    remove(data, ctx) {
        ctx.checkPower()
        if (Object.keys(data).length > 0) {
            return this.orm
                .destroy({
                    where: data,
                })
                .then(
                    result => new Promise((resolve, reject) => {
                        resolve('ok');
                    }),
                );
        }
        return this.orm
            .destroy({
                truncate: true,
                cascade: false,
            })
            .then(
                result => new Promise((resolve, reject) => {
                    resolve('ok');
                }),
            );
    }

    /**
     * 批量删除，传入要删除的数据的要求什么的。
     * obj 格式示例 obj = {
     *                  id: idsArray,
     *              }
     */
    batchRemove(obj, ctx) {
        ctx.checkPower()
        return this.orm
            .destroy({
                where: obj,
            })
            .then(
                () => new Promise((resolve) => {
                    resolve('ok');
                }),
            );
    }

    // 单个更新
    update(obj, ctx) {
        ctx.checkPower()
        return this.orm
            .update(obj, {
                where: {
                    id: obj.id,
                },
            })
    }

    addOrUpdate(data, ctx) {
        ctx.checkPower()
        const self = this;
        return this.get({
            id: data.id,
        }).then((result) => {
            if (result) {
                return self.update(data);
            }
            return self.add(data);
        });
    }

    batchAddOrUpdate(data, ctx) {
        ctx.checkPower()
        const self = this;
        return Promise.each(data, d => self.addOrUpdate(d));
    }
}

module.exports = Model;
