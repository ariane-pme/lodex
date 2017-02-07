module.exports = {
    api_url: '',
    port: 3010,
    mongo: {
        host: 'localhost:27017',
        dbName: 'lodex_test',
    },
    auth: {
        cookieSecret: 'cookie',
        headerSecret: 'header',
        expiresIn: 10 * 3600 // 10 hours
    },
    csv: {
        quote: '"',
        delimiter: ';',
    }
};