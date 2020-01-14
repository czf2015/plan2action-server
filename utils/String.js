const charsets = []

function cutStr(str, maxLen, remains = '') {
    for (let i = j = 0; i < str.length; i++) {
        j += /[\x00-\xff]/.test(str[i]) ? 1 : 2
        if (j > maxLen) {
            return str.slice(0, i) + remains
        }
    }
    return str
}


function removeRepeat(str) {
    return [...new Set(str.split(''))].join('')
}

function repeat(str, n) {
    let res = '';
    while(n) {
        if(n % 2 === 1) {
            res += str;
        }
        if(n > 1) {
            str += str;
        }
        n >>= 1;
    }
    return res
};
//repeat('123',3) ==> 123123123

function encode(str, charset)

function decode(str, charset)

function recover(str)

function tag(strs)

function latex(strs)

function noSpecialCharacter(tip='不允许有特殊字符', regexp) {
    return function (rule, value, callback) {
        return new Promise((resolve, reject) => {
            const  reg = regexp || /[&%\*\(\)【】~`:$]/
            if (reg.test(value)) {
                 reject(new Error(tip));
            } else {
                resolve()
            }
        })
    }
}


module.exports = {
    charsets,
    cutstr,
    repeat,
    noSpecialCharacter,
}
