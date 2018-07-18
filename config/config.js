module.exports = {
    development: {
        dialect: "sqlite",
        storage: "./db.development.sqlite"
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
    },
    redis:{
        host:"aautoapps.redis.cache.windows.net",
        port:6379,
        password:"9+kKJsLOaCsCgCKD8FWaUXIpX3sz2AazX5G5Cvbt8+w=" //chache key
    },
    production: {
        username: 'alan@aautoappdb', //'root',
        password: 'brainVire@123', //'root',
        database: 'autodb', //'node_mysql_connection',
        host: 'aautoappdb.database.windows.net', //'localhost',
        dialect: 'mssql', //'mysql',
        use_env_variable: 'DATABASE_URL',
        dialectOptions: {
            encrypt: true
        }
    }
};