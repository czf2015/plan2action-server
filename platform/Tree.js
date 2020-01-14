const { deepCopy } = require('../utils/Object.js')


function generate(levels) {
    const _levels = deepCopy(levels)
    let count = 0
    function _generate(pid) {
        for (let i = 0; i < _levels.length; i++) {
            if (_levels[i].pid == pid.split('/')[0]) {
                _levels[i].pid += `/${pid.split('/')[1] || 0}`
                _levels[i].id += `/${++count}`
                _generate(_levels[i].id)
            }
        }
    }
    _generate('root')
    return _levels.map(item => {
        item.pid = item.pid.split('/')[1]
        item.id = item.id.split('/')[1]
        return item
    })
}


function convert(nodes, root = { id: 0 }) {
    if (!root.children) {
        root.children = []
    }
    const children = []
    const len = nodes.length
    for (let i = 0; i < len; i++) {
        const node = nodes[i]
        if (node.pid === root.id) {
            root.children.push(node)
        } else {
            children.push(node)
        }
    }
    root.children.forEach(parent => convert(children, parent))
    return root
}


function revert(tree, root_id = 0) {
    const result = []
    function traverse(tree) {
        if (tree.id !== root_id) {
            const _tree = deepCopy(tree)
            delete _tree.children
            result.push(_tree)
        }
        tree.children.forEach(item => traverse(item))
    }
    traverse(tree)
    return result
}


module.exports = {
    generate,
    convert,
    revert,
}