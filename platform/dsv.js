const f = require('./File.js')


function encode(table, separator = '\n') {
    return table.map(row => row.map(item => `'${item}'`).join(',')).join(separator)
}

function decode(dsv, separator = '\n') {
    if (typeof dsv !== 'string') {
        dsv = dsv.toString()
    }
    return dsv.split(separator).map(row => row.split(','))
}

function read(filename) {
    return f.read(filename).then(decode)
}

function write(filename, table) {
    f.write(filename, encode(table))
}


module.exports = {
    encode,
    decode,
    read,
    write,
}
