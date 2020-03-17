const path = require("path")

module.exports = {
    db: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'w_site',
        timezone: '+08:00',
        logging: true,
    },
    port: '8002',
    isDev: true,
    tokenSecret: 'w_w',
    tokenExp: 1000 * 60 * 60 * 24 * 7,
    filePath: path.join(__dirname, "../userData/file")
}