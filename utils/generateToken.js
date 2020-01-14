const { random } = require('./Number')
const TOKEN_CHARATERS = 'qwertyuiopasdfghjklzxcvbnm1QAz2WSX3EDC4RFV5TGB6YHN7UJM8IK9OL0P=_'


module.exports = function generateToken(length = 40) {
    let token = ''
    while (length--) {
        const pos = Math.floor(random(0, 40)) % 40
        token += TOKEN_CHARATERS[pos]
    }
    return token
}
