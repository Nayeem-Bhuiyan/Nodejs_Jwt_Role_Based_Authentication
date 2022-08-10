const mysql = require('mysql')
const { promisify } = require('util')

const pool = mysql.createPool({
    host: 'localhost',
    database: 'nodejsjwtauthdb',
    user: 'root'
})

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('[database] connection close')
    }

    if (error.code === 'ER_CON_COUNT_ERROR') {
      console.error('[database] exceeds connection limit')
    }

    if (error.code === 'ECONNREFUSED') {
      console.error('[database] connection refused')
    }
  }

  if (connection) {
    connection.release()
  }

  console.log('[database] successful connection')
  return true
})

pool.query = promisify(pool.query)

module.exports = pool
