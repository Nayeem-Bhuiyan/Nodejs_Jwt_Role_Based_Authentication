const pool = require('../database-setup/database')
const fileService=require('../service/fileService')




    const uploadFile = async (req, res) => {


      const reqFiles = [];
      //const url = req.protocol + '://' + req.get('host')
      for (var i = 0; i < req.files.length; i++) {
          //reqFiles.push(url + '/public/' + req.files[i].filename)
          reqFiles.push('/uploads/' + req.files[i].filename)
      }
      res.status(200).json("file upload successfully done!!");
    }


    const getAllFilesPath = async (req, res) => {
      try{
        let filesPath=[];
        fileService.getFilesPath((filepath, name, ext, stat) => {
          console.log('file path:', filepath);
          console.log('file name:', name);
          console.log('file extension:', ext);
          console.log('file information:', stat);
          filesPath.push(filepath);
        });
  
   
          filesPath.forEach(filePath=> {
            console.log('Current File Path'+filePath);
          });
          res.status(200).send(filesPath);
      }catch(e){
        console.log(e);
        res.status(404).json('Error :'+e.message);
      }

      
    }


const all = async (req, res) => {
  let roles

  try {
    roles = await pool.query('SELECT * FROM roles')
  } catch (error) {
    res.status(400).json(error)
  }

  try {
    const users = await pool.query(
      'SELECT id, id_role, name, lastname, email, country, phone, created_at, updated_at FROM users'
    )

    users.forEach(({ id_role }, i) => {
      users[i].role = roles.filter(({ id }) => id === id_role)[0].role
      delete users[i].id_role
    })

    return res.status(200).json({ users })
  } catch (error) {
    res.status(400).json(error)
  }
}

const edit = async (req, res) => {
  const { user } = req.body
  const { id } = req.params

  try {
    await pool.query('UPDATE users SET ? WHERE id =?', [user, id])

    res.status(200).json({ message: 'user edit successfully' })
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = { all, edit,uploadFile,getAllFilesPath }
