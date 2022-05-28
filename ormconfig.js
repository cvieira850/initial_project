module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/pg/migrations/*.{js,ts}`
  ],
  entities: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/pg/entities/index.{js,ts}`
  ],
  cli: {
    migrationsDir: `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/pg/migrations`,
    entitiesDir: `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/pg/entities`
  }
}
