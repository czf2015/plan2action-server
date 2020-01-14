/*
ssh 10.252.16.58
// rm -rf /raw/data/release/qcmain && mkdir -p /raw/data/release
scp -rf root@10.252.16.56:/raw/data/release/qcmain /raw/data/release/
*/


module.exports = {
    ips: ['10.252.16.56', '10.252.16.58'], 
    root: '/data/release/qcmain',
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