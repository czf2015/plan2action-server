function getUserAgent(req, transToLowerCase = true) {
    let userAgent = req.headers['user-agent'] || ''
    if (transToLowerCase) {
        userAgent = userAgent.toLowerCase()
    }
    return userAgent
}

function getUserRemoteIp(req) {
    const remoteIp = req.get('x-real-ip') || req.ip
    return remoteIp
}

module.exports = {
    getUserAgent,
    getUserRemoteIp,
}