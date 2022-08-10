const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const pool = require('../database-setup/database')
const config = require('../helper/config')

const controller = {}

controller.signUp = async (req, res) => {

 
  const { name, lastname, email, password, country, phone, role } = req.body

  console.log(`sign u values ${name},${lastname},${email},${password},${country},${phone},${role}`);
  const salt = await bcrypt.genSalt(10)
  const passwordEncrypt = await bcrypt.hash(password, salt)

  const user = {
    name,
    lastname,
    email,
    country,
    phone,
    password: passwordEncrypt
  }

  if (role) {
    const rol = await pool.query('SELECT * FROM roles WHERE role = ?', [role])
    user.id_role = rol[0].id
  } else {
    const rol = await pool.query('SELECT * FROM roles WHERE role = ?', ['user'])
    user.id_role = rol[0].id
  }

  try {
    await pool.query('INSERT INTO users set ?', [user])

    res.status(200).json({ message: 'user added successfully' })
  } catch (error) {
    res.status(400).json({ error })
  }
}




controller.signIn = async (req, res) => {

//console.log("sign in info :"+req.body.email,req.body.password);

  const { email,password} = req.body

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = ?', [email])

    if (!user.length) {
      return res.status(400).json({ error: 'email not registered' })
    }

    const { id, password: userPassword } = user[0]

    const verifyPassword = await bcrypt.compare(password, userPassword)

    if (!verifyPassword) {
      return res.status(400).json({ error: 'invalid password' })
    }
    
    const jwt_secret_Key=config.jwtSecretKey;
    const token = jwt.sign(
      {id},
      jwt_secret_Key,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({ token })
  } catch (error) {
    return res.status(400).json({ error })
  }
}



module.exports = controller
