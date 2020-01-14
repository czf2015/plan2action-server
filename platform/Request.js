const request = require('request')
const f = require('./File')

function getPage(url, dst) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) {
                reject({ err })
            } else {
                if (res.statusCode == 200) {
                    if (typeof dst === 'string') {
                        f.write(dst, body)
                    }
                    resolve(body)
                } else {
                    reject({url})
                }
            }
        })
    })
}


module.exports = {
    getPage,
}