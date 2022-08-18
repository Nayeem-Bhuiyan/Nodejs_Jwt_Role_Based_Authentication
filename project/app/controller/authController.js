const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto= require("crypto-js");
const sqlConnection = require('../database-setup/database')
const config = require('../helper/config')
const nodemailer =require('nodemailer'); 
const generatePassword = require("generate-password")
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
    const user = await sqlConnection.query('SELECT * FROM users WHERE email = ?', [email])

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
      const userFromDb = await sqlConnection.query('SELECT * FROM users WHERE email = ?', [email])
      

    var newPassword = generatePassword.generate({
      length: 6,
      numbers: true,
      lowercase:false,
      uppercase:false
      
      });

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
     subject: 'Forget Password',
     html: `
     <!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th{
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
tr:nth-child(even){background-color: #f2f2f2}
.card{
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
    transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
padding: 14px 80px 18px 36px;
cursor: pointer;
width: 100%;
margin: 0 auto;
}

.card:hover{
  transform: scale(1.05);
box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}

.card h2{
font-weight: 600;
color:#0000FF
}
@media(max-width: 990px){
  .card{
    margin: 20px;
  }
} 
</style>
</head>
<body>

<div class="card">
<h2>Forgot password Credentials</h2>
<div style="overflow-x:auto;">
  <table>
    <tr>
      <th>Email</th>
      <th>Password</th>
    </tr>
   <tr>
      <td>${email}</td>
      <td>${newPassword}</td>
    </tr>
  </table>
</div>
</div>
</body>
</html>

     `
    }

    transporter.sendMail(data, async () => {

     const salt = await bcrypt.genSalt(10)
     const updatePassword = await bcrypt.hash(newPassword, salt)
     userFromDb[0].password=updatePassword;
      const{id}=userFromDb[0];
   
   
      if(userFromDb[0]){
        await sqlConnection.query('UPDATE users set ? WHERE id = ?', [userFromDb[0],id]);
      }
      
      res.status(200).json({ message: 'Forgot Password emailed successfully!!'})
    
    })
}


module.exports = controller
