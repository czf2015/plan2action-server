module.exports = (req, res) => {
    switch (req.method) {
        case 'POST':
            update(req, res)
            break
        case 'PUT':
            create(req, res)
            break
        case 'DELETE':
            remove(req, res)
            break
        default:
            get(req, res)
    }
}