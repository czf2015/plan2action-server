const fs = require('fs')

const logdir = '.'

let info = fs.createWriteStream(`${logdir}/info.log`, {flags: 'a', mode: '0666'})
let error = fs.createWriteStream(`${logdir}/error.log`, {flags: 'a', mode: '0666'})
let logger = new console.Console(info, error)

module.exports = logger