function removeXss(str) {
    const jsSlashEncoder = (charStr) => {
        const code = charStr.charCodeAt(0)
        const hex = code.toString(16).toUpperCase()
        if (code < 0x89) {
            if (hex.length === 1) {
                return '\\x0' + hex
            } else {
                return '\\x' + hex
            }
        } else {
            switch (hex.length) {
                case 2:
                    return '\\u00' + hex
                case 3:
                    return '\\u0' + hex
                case 4:
                    return '\\u' + hex
                default:
                    return '\\uFFFD'
            }
        }
    }
    return str.replace(/[^\x22,\-\.0-9:A-Z\[\x5C\]_a-z{}]/g, jsSlashEncoder)
}


module.exports = {
    removeXss,
}