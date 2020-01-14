const os = require('os')

// 获取本机的ip地址
function getLocalIPAddress() {
    const networkInterfaces = os.networkInterfaces()
    for (let key in networkInterfaces) {
        const networkInterface = networkInterfaces[key]
        for (let i = 0; i < networkInterface.length; i++) {
            const {family, address, internal} = networkInterface[i]
            if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                return address
            }
        }
    }
}



/**
 * ip 转 整型
 */
function ip2int(ip) {
    var num = 0;
    ip = ip.split(".");
    num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256
            + Number(ip[2]) * 256 + Number(ip[3]);
    num = num >>> 0;
    return num;
}
 
/**
 * 整型解析为IP地址
 */
function int2ip(num) {
    var str;
    var tt = new Array();
    tt[0] = (num >>> 24) >>> 0;
    tt[1] = ((num << 8) >>> 24) >>> 0;
    tt[2] = (num << 16) >>> 24;
    tt[3] = (num << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "."
            + String(tt[3]);
    return str;
}


module.exports = {
    getLocalIPAddress,
    ip2int,
    int2ip,
}