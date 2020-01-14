/*
ssh 10.252.20.21
// rm -rf /raw/data/imagecache && mkdir -p /raw/data
scp -rf root@10.252.20.20:/raw/data/imagecache /raw/data/
*/


module.exports = {
    ips: ['10.252.20.20', '10.252.20.21'],
    root: '/data/imagecache',
    ops: [
        {
            type: '~',
            dir: 'open_proj/proj_qcloud_v2/gateway/homepage/mod/css',
            base: 'home-recommend.css'
        },
    ]
}