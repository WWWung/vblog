const Sequelize = require('sequelize');

const {
    user, password, database, host, port, timezone, logging,
} = require('../config/').db;
console.log(user, password, database, host, port, timezone, logging)

/**
 * 新建 Sequelize 实例
 * @function
 * @name sequelize
 * @param {string} database 数据库名称
 * @param {string} user 用户名
 */
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone,
    // 请参考 Querying - 查询 操作符 章节
    operatorsAliases: false,
    logging,
});


module.exports = sequelize;
