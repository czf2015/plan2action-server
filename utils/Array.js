
const  {equal} = require('./Object')

function remove(arr, value) {
    return arr.filter(item => !equal(item, value))
}

function counter(arr) {
    const store = {}
    arr.forEach(item => {
        if (typeof store[item] === 'undefined') {
            store[item] = 1
        } else {
            store[item] += 1
        }
    })
    return store
}
console.log({counter: counter(['x', 'y', 'z', 'x'])})

function most(arr) {}

function count(arr, value) {
    return arr.filter(item => equal(item, value)).length
}

function counts(arr, values) {
    return values.map(value => count(arr, value))
}

function contain(arr, value) {
    return count(arr, value) > 0
}

function dict([key, value]) {
    return  {[key]: value}
}
console.log(dict(['test', 1]))

function dicts(arrs) {
    return arrs.reduce((a, b) => ({...a, ...dict(b)}), {})
}

function table(arr) {
    const result = []
    for (let i = 0; i < arr.length; i += 2) {
        result.push([arr[i], arr[i+1]])
    }
    return result
}

function devide(arr, num = 2) {
  const rows = []
  const len = arr.length
  for (let i = 0; i < len; i += num) {
      const cols = []
      for (let j = 0; j < num; j++) {
          if (i + j < len) {
              cols.push(arr[i + j])
          } else {
              break
          }
      }
      rows.push(cols)
  }
  return rows
}

function pair(a, b) {
    return [a, b]
}

function pairs(arr, fn = pair) {
    return devide(arr).map(group => group.map(item => fn(item)))
}

function range(start, stop, step) {
    let result = []
    for (let i = start; i < stop; i += step) {
        result.push(i)
    }
    return result
}



// 置换函数
function swap(arr, indexA, indexB) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

 // 冒泡排序
 function bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
        }
      }
    }
    return arr;
}

/**
   * 二分算法
   * @param {*} arr 
   * @param {*} value 
   */
  function binarySearch(arr, value) {
    let min = 0;
    let max = arr.length - 1;
    
    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
  
      if (arr[mid] === value) {
        return mid;
      } else if (arr[mid] > value) {
        max = mid - 1;
      } else {
        min = mid + 1;
      }
    }
  
    return 'Not Found';
  }

  /**
 * 散列表
 * 以下方法会出现数据覆盖的问题
 */
function HashTable() {
    var table = [];
  
    // 散列函数
    var loseloseHashCode = function(key) {
      var hash = 0;
      for(var i=0; i<key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % 37
    };
  
    // put
    this.put = function(key, value) {
      var position = loseloseHashCode(key);
      table[position] = value;
    }
  
    // get
    this.get = function(key) {
      return table[loseloseHashCode(key)]
    }
  
    // remove
    this.remove = function(key) {
      table[loseloseHashCode(key)] = undefined;
    }
  }


// 数组去重
function distinct(arr = testArr) {
    return arr.filter((v, i, array) => array.indexOf(v) === i)
}

// 去重合并
function combine(){ 
    const arr = [].concat.apply([], arguments);  //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

// recursiveClone() 能够对数组的深拷贝，通过判断 数组的 item 是否是一个数组，如果是数组，就继续调用 recursiveClone() 来实现了对数组的深拷贝。
function recursiveClone(val) {
    return Array.isArray(val) ? Array.from(val, recursiveClone) : val;
}

function generate(length, init) {
    return typeof init === 'function' ? Array.from({ length }, init) : Array(length).fill(init)
}

// function 

// function cycle(arr) {
//     for (let i = 0;;) {

//     }
// }

function middle(arr) {
  const mid = (arr.length - 1) / 2
  return arr[Math.floor(mid)]
}


module.exports = {
    remove,
    counter,
    count,
    counts,
    contain,
    dict,
    dicts,
    table,
    devide,
    pair,
    pairs,
    swap,
    bubbleSort,
    distinct,
    middle,
}