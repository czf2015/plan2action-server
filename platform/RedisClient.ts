// import * as redis from 'redis'
// import * as pify from 'pify'
// import * as _ from 'lodash'
// import {logger} from 'global'


// export class RedisClient {
//     client: RedisClient.RedisClient

//     _get: (key: string) => Promise<any>
//     _set: (key: string, value: string) => Promise<any>
//     _setex: (key: string, seconds: number, value: string) => Promise<any>
//     _del: (key: string) => Promise<any>

//     _err: (err: Error) => object

//     constructor({options = {}} = {}) {
//         const client = redis.createClient(options)
//         this.client = client

//         Object.assign(this, {
//             _get: pify(client.get.bind(client)),
//             _set: pify(client.set.bind(client)),
//             _setex: pify(client.setex.bind(client)),
//             _del: pify(client.del.bind(client)),
//             _err: err => _.pick(err, ['name', 'code', 'message', 'stack', 'command', 'args'])
//         })
//     }

//     async get(key, {prefix = ''} = {}) {
//         const begin = Date.now()
//         try {
//             key = prefix + key
//             const value = JSON.parse(await this._get(key))
//             const timeCost = Date.now() - begin
//             logger.debug(`REDIS [GET] => ${JSON.stringify({key, value, timeCost})}`)
//             return value
//         } catch (err) {
//             const timeCost = Date.now() - begin
//             logger.debug(`REDIS [GET] => ${JSON.stringify({key, error: this._err(err), timeCost})}`)
//             throw err
//         }
//     }

//     async set(key, value, ttl = 0, {prefix = ''} = {}) {
//         const begin = Date.now()
//         try {
//             key = prefix + key
//             value = JSON.stringify(value)
//             if (ttl > 0) {
//                 await this._setex(key, ttl, value)
//             } else {
//                 await this._set(key, value)
//             }
//             const timeCost = Date.now() - begin
//             logger.debug(`REDIS [SET] => ${JSON.stringify({key, value, timeCost})}`)
//         } catch (err) {
//             const timeCost = Date.now() - begin
//             logger.debug(`REDIS [SET] => ${JSON.stringify({key, error: this._err(err), timeCost})}`)
//             throw err
//         }
//     }

//     async del(key, {prefix = ''} = {}) {
//         const begin = Date.now()
//         try {
//             key = prefix + key
//             await this._del(key)
//             const timeCost = Date.now() - begin
//             logger.debug(`REDIS [DEL] => ${JSON.stringify({key, timeCost})}`)
//         } catch (err) {
//             const timeCost = Date.now() - begin
//             logger.debug(`REDIS [DEL] => ${JSON.stringify({key, error: this._err(err), timeCost})}`)
//             throw err
//         }
//     }
// }