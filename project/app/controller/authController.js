const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto= require("crypto-js");
const sqlConnection = require('../database-setup/database')
const config = require('../helper/config')
const nodemailer =require('nodemailer'); 
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
    const rol = await sqlConnection.query('SELECT * FROM roles WHERE role = ?', [role])
    user.id_role = rol[0].id
  } else {
    const rol = await sqlConnection.query('SELECT * FROM roles WHERE role = ?', ['user'])
    user.id_role = rol[0].id
  }

  try {
    await sqlConnection.query('INSERT INTO users set ?', [user])

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

controller.forgotPassword=async (req, res) => {

    const { email } = req.body
    console.log("Request Email  :"+email);
      const userFromDb = await pool.query('SELECT * FROM users WHERE email = ?', [email])
      
    const newPassword = "123456";

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'idb40nayeem@gmail.com',
          pass: 'zyoquucfexnyskdb'
        }
    })

    const data = {
     to: email,
     from: 'idb40nayeem@gmail.com',
     subject: 'Forgot Password Verification Password',
     html: `<p>this is your new password to login :${newPassword}</p>`
    }

    transporter.sendMail(data, async () => {

     const salt = await bcrypt.genSalt(10)
     const updatePassword = await bcrypt.hash(newPassword, salt)
     userFromDb[0].password=updatePassword;
      const{id}=userFromDb[0];
   
   
      if(userFromDb[0]){
        await pool.query('UPDATE users set ? WHERE id = ?', [userFromDb[0],id]);
      }
      
      res.status(200).json({ message: 'Forgot Password emailed successfully!!'})
    
    })
}


module.exports = controller
