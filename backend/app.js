const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require("koa-body");
const bodyParser = require("koa-bodyparser");
const router = require('koa-router')();
const staticFiles = require("koa-static");

const registerRoute = require('./router/router');
const extendContext = require('./extend/extend');

const {
    port,
    isDev,
} = require('./config')

const {
    decodeToken
} = require('./utils/utils')

const path = require("path")

const app = new Koa();

const handler = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(error)
        if (401 == error.status) {
            ctx.status = 401;
            ctx.body = error.message || 'Authorization failed'
        } else {
            ctx.status = 500
            ctx.body = {
                message: error.message
            }
        }
    }
}

app.use(handler);
app.use(staticFiles(path.join(__dirname, './dist')))

if (isDev) {
    app.use(cors({
        origin: '*'
    }))
}

const userHandler = async (ctx, next) => {
    const token = ctx.headers.authorization
    if (token) {
        const user = decodeToken(token)
        const {
            exp
        } = user
        if (exp >= Date.now()) {
            if (!ctx.state) {
                ctx.state = {}
            }
            ctx.state.user = user
        }
    }
    await next()
}
app.use(userHandler)

app.use(
    koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
        }
    })
)

app.use(bodyParser());
app.use(extendContext);

registerRoute(router);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(`${port}`, () => {
    console.log('server running at http://localhost:' + port);
})

