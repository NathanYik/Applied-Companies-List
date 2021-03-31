const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool(
  process.env.NODE_ENV === "production"
    ? { connectionString: process.env.DATABASE_URL }
    : {
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        port: process.env.PG_PORT,
      }
);

module.exports = pool;
