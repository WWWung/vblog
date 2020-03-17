const modelManager = require('../models')
const send = require('koa-send');
const path = require("path");
const {
    filePath
} = require("../config")

module.exports = function registerRoute(router) {
    router.all('/test', async ctx => {
        ctx.checkPower()
        ctx.success('123456')
        ctx.success('654321')
    })
    router.all('/err', async ctx => {
        throw new Error('error')
    })
    router.all("/api/:controllerName/:method", async ctx => {
        const { params } = ctx;
        const { controllerName, method } = params;
        const controller = modelManager[controllerName];
        if (!controller) {
            throw new Error(
                `controller '${controllerName}' doesn't exist!`
            )
        }
        if (controller[method]) {
            const data = ctx.request.body;
            const rsl = await controller[method](data, ctx);
            //  当 rsl 返回false的时候，返回值在method内部处理
            if (rsl !== false) {
                ctx.success(rsl)
            }
        } else {
            throw new Error(
                `cannot reslove controller'${controllerName}' with method'${method}'!`
            );
        }
    })
    router.get("/file/:year/:month/:id", async ctx => {
        const record = await modelManager.file.get({ id: ctx.params.id })
        if (!record) {
            ctx.failure("文件不存在")
        }
        const {
            md5,
            ext
        } = record;
        const {
            year,
            month,
        } = ctx.params
        const resolveUrl = path.join(filePath, `/${year}/${month}/${md5}.${ext}`)
        const {
            dir: root
        } = path.parse(resolveUrl)
        //  加这句代码就会下载文件
        //  ctx.attachment(resolveUrl)
        await send(ctx, `/${md5}.${ext}`, {
            root
        })
    })
}