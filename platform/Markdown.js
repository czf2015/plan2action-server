const { params } = require('../config')
const f = require('./File')


function convert(src, dst) {
    f.read(src)
        .then(txt => txt.replace(/\n/g, '\n\n'))
        .then(md => f.write(dst, md))
}

convert(...params)