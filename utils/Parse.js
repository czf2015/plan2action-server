function format(raw, fields, convert) {
    const list = {}

    return function format(raw, fields, convert) {
        fields.forEach(field => {
            if (typeof list[field] === 'undefined') {
                list[field] = [raw]
            } else {
                list[field].push(raw)
            }
            for (const key in raw) {
                if (typeof raw[key] === 'object') {
                    if (Array.isArray(raw[key])) {
                        raw[key].forEach(item => item = format(item, [field], convert))
                    } else {
                        if (list[field].find(item => item === raw[key])) {
                            console.log(`{ ${key}: [Circular] }`)
                        } else {
                            raw[key] = format(raw[key], [field], convert)
                        }
                    }
                } else {
                    if (key === field) {
                        raw[key] = convert(raw[key])
                    }
                }
            }
        })

        return raw
    }(raw, fields, convert)
}


function adapt(raw, transform) {
    const list = []

    return function adapt(raw, transform) {
        list.push(raw)

        if (Array.isArray(raw)) {
            raw.forEach(item => item = adapt(item, transform))
        } else {
            Object.keys(raw).forEach(oldKey => {
                const newKey = transform[oldKey] || oldKey

                if (newKey !== oldKey) {
                    raw[newKey] = raw[oldKey]
                    delete raw[oldKey]
                }

                if (typeof raw[newKey] === 'object') {
                    if (list.find(item => item === raw[newKey])) {
                        console.log(`{ ${newKey}: [Circular] }`)
                    } else {
                        raw[newKey] = adapt(raw[newKey], transform)
                    }
                }
            })
        }

        return raw
    }(raw, transform)
}


function extract(raw, separate) {
    const list = []

    return function extract(raw, separate) {
        list.push(raw)

        const result = {}

        for (const key in raw) {
            if (key.includes(separate)) {
                result[key] = raw[key]
            }

            if (typeof raw[key] === 'object') {
                if (Array.isArray(raw[key])) {
                    continue
                } else {
                    if (list.find(item => item === raw[key])) {
                        console.log(`{ ${key}: [Circluar] }`)
                    } else {
                        Object.assign(result, extract(raw[key], separate))
                    }
                }
            }
        }

        return result
    }(raw, separate)
}


module.exports = {
    extract,
    format,
    adapt,
}