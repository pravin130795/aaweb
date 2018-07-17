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
      username: 'root',
      password: 'root',
      database: 'node_mysql_connection',
      host: 'localhost',
      dialect: 'mysql',
      use_env_variable: 'DATABASE_URL'
    }
  };