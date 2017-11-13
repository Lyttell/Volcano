const config = require('./config.js')
const r = require('rethinkdbdash')({
  host: config.rethink.host,
  port: 28015,
  user: config.rethink.username,
  password: config.rethink.password,
  db: config.rethink.db,
  pool: true
})
module.exports = r