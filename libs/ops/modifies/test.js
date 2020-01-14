module.exports = {
    ips: ['10.252.16.56', '10.252.16.58'],
    root: 'G:/playground/server/pkg/raw',
    ops: [
        {
            type: '~',
            dir: 'views/common',
            base: 'header.ejs'
        },
        {
            type: '~',
            dir: 'views/home',
            base: 'layout.ejs'
        },
        {
            type: '+',
            dir: 'public/common/js',
            base: 'jquery-1.8.3.min.js'
        },
        {
            type: '+',
            dir: 'public/common/js',
            base: 'browser.min.js'
        },
    ]
}