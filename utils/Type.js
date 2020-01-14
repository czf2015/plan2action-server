export function isType(type) {
    // 
}

export function type(value)

function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]'
}

function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
}

function isArrayLike(value)

function isEmpty(value)


module.exports = {
    isType,
    type,
    isDate,
    isRegExp,
    isArrayLike,
    isEmpty,
}