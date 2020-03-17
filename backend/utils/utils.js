
const crypto = require('crypto')
const jwt = require('jwt-simple')
const fs = require("fs")
const path = require("path")
exports.crypt = function crypt(password) {
    return crypto.createHash('md5').update(password).digest("hex")
}

const {
    tokenSecret,
    tokenExp,
    filePath
} = require('../config')

exports.createToken = function createToken(info, jwtSecret = tokenSecret, exp = tokenExp) {
    const payload = Object.assign({
        exp: Date.now() + exp
    }, info)
    const token = jwt.encode(payload, jwtSecret)
    return token
}

exports.decodeToken = function decodeToken(token, jwtSecret = tokenSecret) {
    return jwt.decode(token.split(' ')[1], jwtSecret)
}

exports.saveFile = function saveFile(tempPath, name, relaPath) {
    mkdirsSync(relaPath)
    const reader = fs.createReadStream(tempPath);
    const filePath = path.join(relaPath, `/${name}`);
    const upStream = fs.createWriteStream(filePath);
    reader.pipe(upStream);
    return filePath;
}

function mkdirsSync(dirname) {
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

exports.mkdirSync = mkdirsSync