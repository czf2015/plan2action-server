function hasBody(req) {
    return ['transfer-encoding', 'content-length'].some(key => key in req.headers)
}

function bodyParse(req, res) {
    return new Promise((resolve, reject) => {
        if (hasBody) {
            const buffers = []
            req.on('data', (chunk) => {
                buffers.push(chunk)
            })
            req.on('end', () => {
                req.rawBody = Buffer.concat(buffers).toString()
                // 处理
                resolve(req, res)
            })
        } else {
            // 处理
            // handle(req, res)
            resolve(req, res)
        }
    })
}


module.exports = {
    hasBody,
    bodyParse,
}