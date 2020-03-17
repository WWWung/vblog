const Sequelize = require('sequelize');
const BaseModel = require('./BaseModel');
const crypto = require("crypto");
const fs = require("fs")
const path = require("path")

const tableName = 'File';
const {
    saveFile
} = require("../utils/utils")
const {
    filePath
} = require("../config")

const tableStructure = {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        searchable: true,
        unique: true
    },
    user: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.STRING,
    },
    md5: {
        type: Sequelize.STRING,
        searchable: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    ext: {
        type: Sequelize.STRING,
    },
    sizeKb: {
        type: Sequelize.INTEGER
    }
};

const option = {
    tableName,
};

class File extends BaseModel {
    async uploadFile(data, ctx) {
        ctx.checkPower()
        const {
            file
        } = ctx.request.files;
        const {
            name,   //  带后缀名
            size,   //  单位字节
            path: tempPath    //  临时储存的位置
        } = file

        //读取一个Buffer
        const buffer = fs.readFileSync(tempPath);
        const fsHash = crypto.createHash('md5');
        fsHash.update(buffer);
        const md5 = fsHash.digest('hex');

        const info = path.parse(name);
        const ext = info.ext.replace(/./, '');
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const monthPath = path.join(filePath, `/${year}/${month}`);
        saveFile(tempPath, `${md5}.${ext}`, monthPath);
        const sizeKb = Math.ceil(size / 1024);

        const {
            user,
            id
        } = ctx.state.user
        const row = {
            sizeKb,
            user,
            userId: id,
            ext,
            name: info.name,
            md5,
        }
        const {
            id: recordId
        } = await this.add(row, ctx)
        return {
            sizeKb,
            ext,
            name: info.name,
            url: `/file/${year}/${month}/${recordId}`,
            id: recordId
        }
    }
}

module.exports = new File(tableName, tableStructure, option);
