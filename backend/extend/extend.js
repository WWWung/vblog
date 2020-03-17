
function addSuccessFunc(ctx) {
    ctx.success = function success(data, message = 'success') {
        this.body = {
            code: 0,
            message,
            data
        }
    }
}

function addFailureFunc(ctx) {
    ctx.failure = function failure(message = 'failure', code = 1) {
        this.body = {
            code,
            message
        }
    }
}

function addCheckPowerFunc(ctx) {
    ctx.checkPower = function checkPower(message = '无操作权限', powerFn = () => true) {
        if (!ctx.state.user) {
            throw {
                status: 401,
                message
            }
        }
        if (!powerFn()) {
            throw {
                status: 401,
                message
            }
        }
    }
}


module.exports = async function extendContext(ctx, next) {
    addSuccessFunc(ctx);
    addFailureFunc(ctx);
    addCheckPowerFunc(ctx);
    await next();
}