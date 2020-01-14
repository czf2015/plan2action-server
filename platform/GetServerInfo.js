const os = require('os')
const {inRange} = require('../utils/Number')


const getServerInfo = (env, lanInterfaceName = 'eth0') => {
    const result = {
        host: '0.0.0.0',
        port: 9343, // 好记
    }

    if (env !== 'local') {
        const networkInterfaces = os.networkInterfaces()
        networkInterfaces[lanInterfaceName].forEach(item => {
            // 是否为'IPv4'
            if (String(item.family).toLocaleLowerCase() !== 'ipv4') return

            const address = String(item.address)
            const secondary = +address.split('.')[1]

            // 参考： [IANA保留地址](http://baike.baidu.com/view/2558390.html)
            // 是否为局域网
            if (false
                // A类 (10.0.0.0-10.255.255.255)
                || address.startsWith('10.')
                // A类 (100.64.0.0-100.127.255.255)
                || address.startsWith('100.') && inRange([64, 127 + 1], secondary)
                // B类 (172.16.0.0-172.31.255.255)
                || address.startsWith('172.') && inRange([16, 31 + 1], secondary)
                // C类 (192.168.0.0-192.168.255.255)
                || address.startsWith('192.168')
            ) {
                result.host = address
                return false // ??? 
            }
        })
    }

    return result
}


module.exports = {
    getServerInfo,
}