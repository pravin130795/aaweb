module.exports = {
    development: {
        dialect: "sqlite",
        storage: "./db.development.sqlite"
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
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