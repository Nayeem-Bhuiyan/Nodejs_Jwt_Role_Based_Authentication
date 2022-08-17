const sqlConnection = require('../database-setup/database')

const isAdmin = async (id_user) => {
  try {
    const roles = await sqlConnection.query('SELECT * FROM roles')
    const user = await sqlConnection.query('SELECT * FROM users WHERE id = ?', [id_user])
    const id_role = user[0].id_role
    const admin = roles
      .filter(({ id }) => id === id_role)
      .filter(({ role }) => role === 'admin')
    if (!admin.length) {
      return false
    }
    return true
  } catch (error) {
    return error
  }
}

module.exports = { isAdmin }