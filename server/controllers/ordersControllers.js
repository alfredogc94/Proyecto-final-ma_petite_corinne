import connection from './../config/db.js';
import jwt  from 'jsonwebtoken';

class OrdersControllers {

  getAllOrders = (req,res) =>{
    const {token} = req
    const user_id = jwt.decode(token).user_id;
  
    console.log(user_id);
    
    // let sql = 'SELECT * FROM `order` WHERE user_id = ?';

    // let sql = 'SELECT `order`.*, product.title, product.description, product.price, product.colour, (SELECT image.image_name FROM image WHERE image.product_id = product.product_id ORDER BY image.image_id ASC LIMIT 1) AS first_image FROM `order` JOIN product ON `order`.product_id = product.product_id WHERE `order`.user_id = ? ORDER BY `order`.order_date_time ASC LIMIT 1';
    let sql = "SELECT * FROM `order` WHERE user_id = ?"

    connection.query(sql, [user_id], (err, result)=>{
      if(err){    
        res.status(500).json({message: 'error en el servidor'})
      }else{
        
        
        res.status(200).json(result);
      }      
    });
  }


  getOneOrder =(req,res)=>{
    const {id} = req.params;
    const {user_id} = jwt.decode(req.token)
    console.log(id)
    
    // let sql = 'SELECT product.*, `order`.amount, `order`.order_date_time, image.image_name FROM  product, `order`, image WHERE product.product_id = image.product_id and product.product_id = `order`.product_id and `order`.order_id = ? AND image.image_id = (SELECT MIN(image_id) FROM image AS img WHERE img.product_id = product.product_id) and `order`.user_id = ?';
    

    connection.query(sql, [id, user_id], (err, result)=>{
      if(err){    
        res.status(500).json({message: 'error en el servidor'})
      }else{
        console.log(result);
        
        res.status(200).json(result);
      }      
    });

  }
  saveOrder = (req, res) => {
   console.log(req.body);
    const {user_id, products} = req.body;
    let sqlInsert = "INSERT INTO `order` (product_id, user_id, order_id, amount) value (?,?,?,?)"

    let sqlGetID = "SELECT MAX(order_id) as order_id FROM `order` WHERE user_id = ?"
 
    try {
      let order_id = 0;
      connection.query(sqlGetID, [user_id], (err, result)=>{ 
        if(err){
          throw err;
        }else{
          console.log(result);
          order_id = result[0].order_id ? result[0].order_id + 1 : 1;
          products.forEach((e)=>{
            connection.query(sqlInsert, [e.product_id, user_id, order_id, e.amount], (errInsert, resultInsert)=>{
              if(errInsert){
                throw errInsert
              }
            })
          })
        } 
         res.status(200).json({user_id, order_id})
      })
      } catch (error) {
        console.log(error);
        res.status(500).json(error)
      }
  }
  getConfirmedOrder = (req, res) =>{
    const {user_id, order_id} = req.params
    console.log(user_id, order_id);
    
    let sql = "select `order`.* , product.title, product.price, product.colour, i.image_name from `order` left join product on `order`.product_id = product.product_id left join (select product_id, MIN(image_name) as image_name from image group by product_id)as i on product.product_id = i.product_id where `order`.user_id = ? and `order`.order_id = ?"
    connection.query(sql, [user_id, order_id], (err, result)=>{
      if(err){
        res.status(500).json(err)
      }else{
        res.status(200).json(result)

      }
    })
  }
}

export default new OrdersControllers;