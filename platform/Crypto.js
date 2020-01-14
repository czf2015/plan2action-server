const crypto = require('crypto')


function getHash(str, mod = 'sha1') {
    const hash = crypto.createHash(mod)
    return hash.update(str).digest('base64')
}

function generateRandom(len) {
    return crypto.randomBytes(Math.ceil(len * 3 / 4))
                .toString('base64')
                .slice(0, len)
}

module.exports = {
    getHash,
    generateRandom,
}