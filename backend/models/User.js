const Sequelize = require('sequelize');
const BaseModel = require('./BaseModel');
const {
    crypt,
    createToken,
    decodeToken
} = require('../utils/utils')

const tableName = 'User';

const tableStructure = {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        searchable: true,
        unique: true
    },
    user: {
        type: Sequelize.STRING,
        primaryKey: true,
        searchable: true,
        unique: true
    },
    hash: {
        type: Sequelize.STRING
    }
};

const option = {
    tableName,
};

class User extends BaseModel {
    async loginIn(data, ctx) {
        const {
            password,
            user
        } = data
        const hash = crypt(password)
        const record = await this.orm.findOne({
            where: {
                user
            }
        })
        if (record) {
            if (record.hash === hash) {
                const token = createToken({
                    user,
                    id: record.id
                })
                return token
            } else {
                ctx.failure('账号或密码错误')
                return false
            }
        } else {
            const record = await this.add({
                hash,
                user
            })
            const token = createToken({
                user,
                id: record.id
            })
            return token
        }
    }

    getUserInfo(data, ctx) {
        return ctx.state.user
    }
}

module.exports = new User(tableName, tableStructure, option);
