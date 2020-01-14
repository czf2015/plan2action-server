const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')
const {getPage} = require('../lib/Request')
const { ensureDirectoryExistence } = require('./File.js')


function download(url, file) {
    ensureDirectoryExistence(file)
    request(url).on('error', error => {
        console.log(error)
    })
    .pipe(fs.createWriteStream(file)).on('error', error => {
        console.log(error)
    })
}


/*
** 2019.12.15 版本1 已验证 获取图片信息再爬取图片
*/
// const url = 'https://pvp.qq.com/web201605/js/herolist.json'
// const src = 'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info'
// const dst = '/home/czf/playground/koa/test/images'

// getPage(url)
//     .then(body => {
//         const heros = JSON.parse(body || '[]')
//         heros.forEach(hero => {
//             const skins = (hero.skin_name || '').split('|')
//             skins.forEach((skin, index) => {
//                 const file = `${dst}/${hero.cname}/${skin}.jpg`
//                 download(`${src}/${hero.ename}/${hero.ename}-bigskin-${index + 1}.jpg`, file)
//             })
//         })
//     })


/* 
** 2019.12.16 版本2 已验证 只能爬取初始url及其链接页面的图片
*/
// function downloadSiteImgs(url, dst, patterns, solved = false) {
//     getPage(url)
//         .then(body => {
//             const $ = cheerio.load(body)
//             $('a').map((i, el) => {
//                 const href = $(el).attr('href')
//                 if (!solved) {
//                     patterns.forEach(pattern => {
//                         if (pattern.reg.test(href)) {
//                             downloadSiteImgs(`${pattern.root}${href}`, dst, patterns, true)
//                         }
//                     })
//                 }
//             })
//             const imgUrls = $('img').map((i, el) => {
//                 return $(el).attr('src')
//             });
//             for (let i = 0; i < imgUrls.length; i++) {
//                 const imgUrl = imgUrls[i]
//                 const file = `${dst}/${imgUrl.split('//')[1]}` //可提取函数
//                 download(imgUrl, file)
//             }
//         })
// }

// const url = 'https://ant.design/docs/spec/article-cn'
// const dst = '/home/czf/playground/yehe/koa/test/antd'
// const patterns = [{
//     reg: /\/\/ant.design/,
//     root: ''
// }, {
//     reg: /^\/docs/,
//     root: 'https://ant.design'
// }]

// downloadSiteImgs(url, dst, patterns)


/*  
** 2019.12.17 版本3 
*/
function downloadSiteImgs(url, dst, patterns) {
    const pageMap = {}
    const imgMap = {}
    // let imgCount = 0
    // let pageCount = 1
    return function downloadPageImgs(url) {
        if (!pageMap[url]) {
            pageMap[url] = 1
            console.log(`-----pageMap: ${Object.keys(pageMap).length}-----`)
            console.log({url})
            getPage(url)
                .then(body => {
                    const $ = cheerio.load(body)
                    $('img').each((i, el) => {
                        // console.log(`+++++imgCount: ${imgCount++}-----`)
                        const imgUrl = $(el).attr('src')
                        if (imgUrl && !imgMap[imgUrl]) {
                            imgMap[imgUrl] = 1
                            console.log(`-----imgMap: ${Object.keys(imgMap).length}+++++`)
                            // console.log(typeof imgUrl)
                            if (/^(https+\:)?\/?\.?\/{1}/.test(imgUrl)) {
                                const path = imgUrl.replace(/^(\w+:\/{2})[\w.]+\w+|(\?+\S+)$/g, '')
                                const file = `${dst}/${path}` //可提取函数
                                const uri = encodeURI(`${/^(.?\/\w+)/.test(imgUrl) ? 'https://csdn.net/' : ''}${imgUrl.trim()}`)
                                console.log({path, file, uri})
                                download(uri, file)
                            }
                        }
                    });
                    $('a').each((i, el) => {
                        const href = $(el).attr('href')
                        patterns.forEach(pattern => {
                            if (pattern.regexp.test(href)) {
                                // console.log(`+++++pageCount: ${pageCount++}+++++`)
                                downloadPageImgs(encodeURI(href.trim().replace(pattern.regexp, pattern.domain)))
                            }
                        })
                    })
                })
                .catch(err => console.log(err))
        }
    }(url)
} 

const url = 'https://csdn.net'
const dst = '/home/czf/playground/yehe/koa/test/csdn'
const patterns = [{
    regexp: /^(https+\:)?\/\/csdn.net/,
    domain: 'https://csdn.net'
// }, {
//     reg: /^\/{1}/,
//     domain: 'https://yun.ccb.com/'
}]
downloadSiteImgs(url, dst, patterns)

module.exports = {
    download,
    downloadSiteImgs
}