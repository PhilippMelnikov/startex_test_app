const http = require('http');

module.exports = (options) => new Promise((resolve, reject) => {
    http.get(options, (result) => {
        const chunks = [];
        result.on('data', (data) => {
            chunks.push(data);
        }).on('end', () => {
            const data   = Buffer.concat(chunks);
            resolve(data);
        });
    }).on("error", (error) => {
        reject(error);
    });
})