function add(...nums) {
    return nums.reduce((acc, num) => acc + num, 0)
}


function mult(...nums) {
    return nums.reduce((acc, num) => acc * num, 1)
}


function approxEqual(n1, n2, epsilon = 0.0001) {
    return Math.abs(n1 - n2) < epsilon
}

// 位数
function digit(x, y = 10) {
    let pos = 1
    let val = y

    while (val < x) {
        val *= y
        pos++
    }

    return pos
}

function format(x, y) {
    return String(10 ** y + x).slice(1)
}

function range(n, start = 0, step = 1) {
    const result = []
    for (let i = 0; i < n; i++) {
        result.push(start)
        start += step
    }
    return result
}

function inRange([min, max], val) {
    return val >= min && val <= max
}

function random(lower = 0, upper = 1) {
    return Math.random() * (upper - lower) + lower
}

function isNum(num) {
    return num == +num ? true : false;
}

function isInteger(num) {
    return num == ~~num ? true : false;
}

// 是否为质数
function isPrime(num) {
    if (!isNum(num) || !isInteger(num) || num == 0 || num == 1) {
        return false;
    }
    if (num == 2) {
        return true
    }
    if (num % 2 == 0) {
        return false
    } else {
        const sqrtRoot = Math.sqrt(num)
        if (isInteger(sqrtRoot)) {
            return false
        }
        for (let i = 3; i < sqrtRoot; i++) {
            if (num % i == 0) {
                return false;
            }
        };
    }
    return true;
}


module.exports = {
    add,
    mult,
    approxEqual,
    digit,
    format,
    range,
    inRange,
    random,
    isNum,
    isInteger,
    isPrime,
}