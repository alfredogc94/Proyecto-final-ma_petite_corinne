import connection from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/emailServices.js";
import { validationResult } from "express-validator";
import { sendPasswordResetMail } from "../services/sendPasswordResetMail.js";

class UsersControllers {
  createUser = (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      password,
      name,
      last_name,
      phone,
      address,
      province,
      city,
      country,
      zip_code,
      subscription,
    } = req.body;

    let sqlEmail = "SELECT * FROM user WHERE email = ?";

    connection.query(sqlEmail, [email], (errEmail, result) => {
      if (errEmail) {
        return res.status(500).json(errEmail);
      } else {
        if (result.length) {
          console.log("holaaaaaaa")
          return res.status(500).json("Email repetido");
        } else {
          bcrypt.hash(password, 8, (err, hash) => {
            if (err) {
              return res.status(500).json(err);
            } else {
              let values = [
                email,
                hash,
                name,
                last_name,
                phone,
                address,
                province,
                city,
                country,
                zip_code,
                subscription,
              ];
              let sql =
                "INSERT INTO user (email, password, name, last_name, phone, address, province, city, country, zip_code, subscription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
              connection.query(sql, values, (errSql, result) => {
                if (errSql) {
                  return res.status(500).json(errSql);
                } else {
                 
                  let token = jwt.sign(
                    { email, name, last_name },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "1h" }
                  );
                
                  sendMail(email, token, name);
                  return res.status(200).json("Email enviado");
                }
              });
            }
          });
        }
      }
    });
  };

  verifyUser = (req, res)=>{
   
    let token = req.token
    
    const {email} = jwt.decode(token)
    let sql = 'UPDATE user SET enabled_status = ? WHERE email = ?';
    connection.query(sql, [2,email], (err, result)=>{
        if(err){
          res.status(500).json(err)
        }else{
          res.status(200).json({enabled_status:2})
        }
    } )
  }

  verifyEmail = (req,res)=>{
    const {emailq} = req.query;

    let email
    if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.decode(token);
      console.log(payload)
      email = payload.email;
    }else{
      email = emailq;
    }

    if(!emailq){
      return res.status(406).json("Debes escribir un correo")
    }

    let sqlEmail = "SELECT * FROM user WHERE email = ?";
    connection.query(sqlEmail, [email], (errEmail, result) => {
      if (errEmail) {
        res.status(500).json(errEmail);
      }else{
        if (result.length && email === emailq) {
          const {name, last_name} = result[0]
          let token2 = jwt.sign(
            { email, name, last_name },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" }
          );
          sendMail(email, token2, name)
          return res.status(200).json("Email enviado")
        } else {
          return res.status(404).json("Usuario no registrado")
        }
      }

    })
  }

  formEditUser = (req,res) =>{

    const {token} = req;
    const user_id = jwt.decode(token).user_id;

    let sql = 'SELECT * FROM user WHERE user_id = ? AND enabled_status = 2'
    connection.query(sql, [user_id], (err, result)=>{
      if(err){    
        res.status(500).json({message: 'error en el servidor'})
      }else{
        result[0].subscription ? result[0].subscription=true : result[0].subscription=false;
        res.status(200).json({ user: result[0] });
      }      
    });
  }

  editUser = (req,res) =>{

    const {token} = req;
    let payload = jwt.decode(token);
    const { user_id } = payload;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      last_name,
      phone,
      address,
      province,
      city,
      country,
      zip_code,
      subscription,
    } = req.body;

    console.log(req.body)

    let values = [
      name,
      last_name,
      phone,
      address,
      province,
      city,
      country,
      zip_code,
      subscription,
      user_id
    ];
          
    let sql =
      "UPDATE user SET name = ?, last_name = ?, phone = ?, address = ?, province = ?, city = ?, country = ?, zip_code = ?, subscription = ? WHERE user_id = ?";
    connection.query(sql, values, (errSql, result) => {
      if (errSql) {
        return res.status(500).json(errSql);
      } else {
        
        return res.status(200).json({message: "Datos Modificados", user: name});
      }
    });   
  }

  formEditPassword = (req,res)=>{
    const {token} = req;
    const user_id = jwt.decode(token).user_id;
    const {password} = req.body

    console.log(req.body)

    let sql = "SELECT password FROM user WHERE user_id = ? AND enabled_status = 2";
    connection.query(sql, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      } else if (!result.length) {
        return res.status(401).json("No estás autorizado");
      }  else {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (err) {
            return res.status(500).json(err);
          } else if (response === false) {
            return res.status(401).json("Contraseña antigua incorrecta");
          }else {
            return res.status(200).json("Contraseña correcta");
          }
        });
      }
    });

  }

  editPassword = (req, res)=>{
    const {token} = req;
    const user_id = jwt.decode(token).user_id;
    const {password2, password3} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }

    if(password2 !== password3){
      res.status(406).json("Las contraseñas no coinciden")
    }else{
    
      bcrypt.hash(password2, 8, (err, hash) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          let values = [hash, user_id];

          let sql =
          "UPDATE user SET password = ? WHERE user_id = ?";

          connection.query(sql, values, (errSql, result) => {
            if (errSql) {
              return res.status(500).json(errSql);
            } else {
              
              return res.status(200).json("Contraseña guardada");
            }
          });
        }
      });
    }
  }

  getAllUsers = (req, res) => {
    let sql = "SELECT * FROM user";
  
    connection.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "No hay usuarios disponibles" });
      }
  
      return res.status(200).json(results);
    });
  };

  getOneUser = (req, res) => {
    const {token} = req;
    let payload = jwt.decode(token);
    const { user_id } = payload;

    let sql = `SELECT user_id, email, name, type, enabled_status FROM user WHERE user_id = ? AND enabled_status = 2`;

    connection.query(sql, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      
      if (!result.length) {
        return res.status(404).json({ message: "Usuario no encontrado o deshabilitado" });
      }

      let sqlOrder = "SELECT * FROM `order` WHERE user_id = ?";
      connection.query(sqlOrder, [user_id], (errOrder, resultOrder) => {
        if (errOrder) {
          return res.status(500).json(errOrder);
        }
       
        return res.status(200).json({ user: result[0], order: resultOrder });
      });
    });
  };

  login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let sqlEmail = "SELECT * FROM user WHERE email = ? AND enabled_status != 3";
    connection.query(sqlEmail, [email], (errEmail, resultEmail) => {
      if (errEmail) {
        return res.status(500).json(errEmail);
      } else if (!resultEmail.length) {
        return res.status(401).json("No estás autorizado 1");
      }  else {
        bcrypt.compare(password, resultEmail[0].password, (err, response) => {
          if (err) {
            return res.status(500).json(err);
          } else if (response === false) {
            return res.status(401).json("No estás autorizado 2");
          }else if(resultEmail[0].enabled_status === 1){
            return res.status(406).json("Necesario validar correo");
          } else {
            let token = jwt.sign(
              {
                user_id: resultEmail[0].user_id,
              },
              process.env.TOKEN_SECRET,
              { expiresIn: "10h" }
            );
            return res.status(200).json(token);
          }
        });
      }
    });
  };

  forgotPassword = (req, res) => {
    const { email } = req.body;
    let sqlEmail = "SELECT * FROM user WHERE email = ?";
    connection.query(sqlEmail, [email], (errEmail, result) => {
      if (errEmail) {
        return res.status(500).json({ message: "Error en el servidor" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "El email no está registrado" });
      }
  
      const { user_id, name } = result[0];
      const resetToken = jwt.sign({ user_id, email }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      const resetLink = `${frontendUrl}/resetPassword?token=${resetToken}`;
  
      // Usar la nueva función específica para enviar el correo de restablecimiento
      sendPasswordResetMail(email, resetToken, name);
  
      return res.status(200).json({ message: "Correo de restablecimiento enviado" });
    });
  };
  
  resetPassword = (req, res) => {
    const { token, password } = req.body;
  
    console.log('Token recibido:', token);
    console.log('Contraseña recibida:', password);
  
    try {
      
      const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      const { user_id } = payload;
      console.log('User ID:', user_id);  
      
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error al hashear la contraseña:', err);
          return res.status(500).json({ message: 'Error al hashear la contraseña' });
        }  
        
        let sql = 'UPDATE user SET password = ? WHERE user_id = ?';
        connection.query(sql, [hash, user_id], (err, result) => {
          if (err) {
            console.error('Error al actualizar la contraseña:', err); 
            return res.status(500).json({ message: 'Error al actualizar la contraseña' });
          }
          console.log('Contraseña actualizada correctamente');
          return res.status(200).json({ message: 'Contraseña restablecida con éxito' });
        });
      });
    } catch (error) {
      console.error('Token inválido o expirado:', error); 
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }
  };

  getUserConfirmed = (req, res) =>{
    const {token} = req;
    const {email} = jwt.decode(token);
    let sql = "SELECT * FROM user WHERE email = ?"
    connection.query(sql, [email], (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        if(result.length){
          res.status(200).json(result[0].enabled_status)
          
        }else{
          res.status(500).json("Email no existe")
        }
      }
    })
  }
}


export default new UsersControllers();
