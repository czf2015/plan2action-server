const TEST = ''
const BASE = process.env.NODE_ENV === 'production' ? '' : TEST

const CRUD = ['create', 'get', 'update', 'delete']

const paths = ['home']

const apis = {}
paths.forEach(path => {
    CRUD.forEach(method => {
        const interface = `${method}_${path}`
        apis[interface.toUpperCase()] = `${BASE}/${interface}`
    })
})



module.exports = apis