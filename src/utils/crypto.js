const Crypto = require('crypto')

const SECRET_KEY = 'gkkshgikjak23mbj'

function sha256(content) {
    let sha256 = Crypto.createHash('sha256')
    return sha256.update(content).digest('hex')
}

function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return sha256(str)
}

module.exports = {
    genPassword
}