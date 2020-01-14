const url = require('url')

module.exports = (req, res) => {
    req.query = url.parse(req.url, true).query
}