function render()

function compile()

function escape(str) {
    const patterns = {
        '"': '&quot;',
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    }
    return str.replace(/["<>&]/g, match => {
        return patterns[match]
    })
}


module.exports = {
    render,
    compile,
    escape,
}