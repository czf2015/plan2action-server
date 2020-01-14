function reflex(params) {
    const caller = reflex.caller.toString();
    const re = /function\s*(\w*)/ig;
    const matches = re.exec(caller); //正则原因只能获取一个，获取多个需循环获取 函数形式 function xxx() 
    console.log(`${matches[1]}(${params})`)
}


function bind(fn, context) {
    return function (...args) {
        fn.apply(context, args)
    }
}



// 柯里化
function curry(fn) {
    const args = Array.prototype.slice.call(arguments, 1)
    const _curry = function () {
        if (arguments.length === 0) {
            return fn.apply(null, args)
        } else {
            args = args.concat(Array.prototype.slice.call(arguments))
            return _curry
        }
    }
    return _curry
}


// 去柯里化
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
}


// 高阶函数--管道函数
function pipe(...fns) {
    return (...args) => fns.reduce((rets, fn) => Array.isArray(rets) ? fn(...rets) : fn(rets), args)
}

// 高阶函数--
function filter(fn) {
    return (...args) => args.filter(fn)
}


// 分时：一旦某个函数需要花50ms以上的时间完成，那么最好可靠能否将任务分割为一系列可以使用定时器的小任务
function chunk(arr, process, context) {
    setTimeout(() => {
        const item = arr.shift()
        process.call(context, item)
        if (arr.length > 0) {
            setTimeout(arguments.callee, 100)
        }
    })
}


// 节流
function throttle(method, context) {
    clearTimeout(method.tId)
    method.tId = setTimeout(() => {
        method.call(context)
    }, 100)
}

/**
 * 防抖函数--在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 */
function debounce(fun, delay) {
    return function (args) {
        let that = this
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, args)
        }, delay)
    }
}

function sleep(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration)
    })
}

function memorize(fn) {
    const memory = {}
    return function () {
        const key = arguments.length + Array.prototype.join.call(arguments)
        if (!memory[key]) {
            memory[key] = fn.apply(this, arguments)
        }
        return memory[key]
    }
}


module.exports = {
    reflex,
    bind,
    curry,
    pipe,
    filter,
    chunk,
    throttle,
    debounce,
    sleep,
    memorize,
}