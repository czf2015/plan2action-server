function deepCopy(oldObj) {
    // const list = {}

    // return function deepCopy(oldObj) {
    //     list.push(oldObj)

    //     const newObj = Array.isArray(oldObj) ? [] : {}

    //     for (const key in oldObj) {
    //         if (oldObj.hasOwnProperty(key)) {
    //             if (typeof oldObj[key] === 'object') {
    //                 if (list.find(item => item === oldObj[key])) {
    //                     console.log(`{ ${key}: [Circular] }`)
    //                     newObj[key] = oldObj[key]
    //                 } else {
    //                     newObj[key] = deepCopy(oldObj[key])
    //                 }
    //             } else {
    //                 newObj[key] = oldObj[key]
    //             }
    //         }
    //     }

    //     return newObj
    // }(oldObj)
    return JSON.parse(JSON.stringify(oldObj))
}


// 判断对象或数组为空值
function isAvailable(x) {
    return typeof x === 'object' ?
        x ?
            (Array.isArray(x) ? x : Object.keys(x)).length > 0 :
            false :
        x
}

function keyValues(obj) {
    return Object.keys(obj).map(key => ({
        key,
        value: obj[key]
    }))
}

function keyValue(raw) {
    return typeof raw === 'object' ? keyValues(raw)[0] : raw
}

// 将origin字段值传入target
function pass(target, origin) {
    if (Array.isArray(origin)) {
        origin.forEach(item, pass(target, item))
    } else {
        Object.keys(origin).forEach(key => target[key] = origin[key])
    }
}

function k2o({ key, value }) {
    return { [key]: value }
}


module.exports = {
    deepCopy,
    isAvailable,
    keyValues,
    keyValue,
    pass,
    k2o,
}