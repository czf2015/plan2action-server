const { exec } = require('child_process')

function command(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                if (stderr) {
                    reject(stderr)
                } else {
                    resolve(stdout)
                }
            }
        })
    });
}


module.exports = {
    command,
}

// command('dir').then(stdout => console.table(stdout))