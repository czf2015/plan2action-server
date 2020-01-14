/*
ssh 10.252.16.57
// rm -rf /raw/home/XXFB_DEV && mkdir -p /raw/home
scp -rf root@10.252.16.55:/raw/home/XXFB_DEV /raw/home/
*/


module.exports = {
    ips: ['10.252.16.55', '10.252.16.57'],
    root: '/home/XXFB_DEV',
    ops: [
        {
            type: '~',
            dir: 'tce-yehe-backend/tpls/qcloud-official/homePage/cn_zh',
            base: 'root.ejs'
        },
        {
            type: '~',
            dir: 'tce-yehe-backend/tpls/qcloud-official/qcFooter/cn_zh/module',
            base: 'navigation.ejs'
        }
    ],
}