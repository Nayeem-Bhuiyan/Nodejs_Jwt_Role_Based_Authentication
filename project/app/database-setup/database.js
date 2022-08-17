const mysql = require('mysql')
const { promisify } = require('util')

const mysqlConnection = mysql.createPool({
    host: 'localhost',
    database: 'nodejsjwtauthdb',
    user: 'root'
})

mysqlConnection.getConnection((error, connection) => {
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

mysqlConnection.query = promisify(mysqlConnection.query)

module.exports = mysqlConnection
