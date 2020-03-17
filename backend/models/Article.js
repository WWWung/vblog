const Sequelize = require('sequelize');
const BaseModel = require('./BaseModel');
const uuid = require('uuid')

const tableName = 'article';

const tableStructure = {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        searchable: true,
        unique: true
    },
    userId: {
        type: Sequelize.STRING,
        searchable: true
    },
    userName: {
        type: Sequelize.STRING,
        searchable: true,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        searchable: true,
    },
    //  html内容
    htmlContent: {
        type: Sequelize.TEXT
    },
    //  markdown内容
    mdContent: {
        type: Sequelize.TEXT
    },
    //  状态: 10 已完成 20 草稿
    status: {
        type: Sequelize.INTEGER
    }
};

const option = {
    tableName,
};

class Article extends BaseModel {
    add(data, ctx) {
        ctx.checkPower()
        const {
            user,
            id
        } = ctx.state.user;
        data.userName = user;
        data.userId = id;
        data.id = uuid.v4()
        return this.orm.create(data);
    }

    // update(data, ctx) {
    //     const {
    //         id
    //     } = ctx.state.user;
    //     const item = await this.get({
    //         where: {
    //             id: data.id
    //         }
    //     })
    //     if (item && item.userId !== id) {
    //         ctx.failure('抱歉，您没有权限')
    //         return false;
    //     }
    //     BaseModel.prototype.update.call(this, data)
    // }
}

module.exports = new Article(tableName, tableStructure, option);
