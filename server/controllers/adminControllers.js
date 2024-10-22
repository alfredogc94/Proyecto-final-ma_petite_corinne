import connection from "../config/db.js";

class AdminControllers {
  admin = (req, res) => {
    res.status(200).json("pagina admin");
  };

  editCategory = (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const data = JSON.parse(req.body.editData)
    console.log(data);

    const { category_id, category_name } = data;

    if (!category_id || !category_name) {
      res.status(400).json({ message: "Faltan datos." });
    }

    let sql = 'UPDATE category SET category_name = ? WHERE category_id = ?';
    let values = [category_name, category_id];

    if (req.file) {
      sql = 'UPDATE category SET category_name = ?, img = ? WHERE category_id = ?'
      console.log(req.file);

      values = [category_name, req.file.filename, category_id]
    }

    console.log(sql, values);

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);

      } else {
        let img = null
        if (req.file) {
          img = req.file.filename
        }
        res.status(200).json({ img });
      }
    });
  };

  delCategory = (req, res) => {
    const { category_id } = req.params;
    let sql = "UPDATE category SET disabled = 1 WHERE category_id = ?";

    connection.query(sql, [category_id], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json("Categoría eliminada lógicamente");
      }
    });
  };


  delProduct = (req, res) => {
    const { product_id } = req.params;
    const sql = "UPDATE product SET disabled = 1 WHERE product_id = ?";

    connection.query(sql, [product_id], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json("Producto eliminado lógicamente");
      }
    });
  };




  editProduct = (req, res) => {

    const data = JSON.parse(req.body.editData);
    console.log(data);


    const { product_id, title, description, price, colour, category_id } = data;


    if (!product_id || !title || !price || !category_id) {
      res.status(400).json({ message: "Faltan datos obligatorios." });
    }


    let sql = 'UPDATE product SET title = ?, description = ?, price = ?, colour = ?, category_id = ? WHERE product_id = ?';
    let values = [title, description, price, colour, category_id, product_id];


    // if (req.file) {
    //   sql = 'UPDATE product SET title = ?, description = ?, price = ?, colour = ?, category_id = ?, img = ? WHERE product_id = ?';
    //   console.log(req.file);
    //   values = [title, description, price, colour, category_id, req.file.filename, product_id];
    // }


    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error en la base de datos." });
      } else {

        //   let img = null;
        //   if (req.file) {
        //     img = req.file.filename;
        //   }
        res.status(200).json("Modificación ok");
      }
    });
  };

  getAllOrders = (req, res) => {
    let sql = 'select distinct(concat("#",`order`.user_id, "-", `order`.order_id)) as order_number, user_id, order_id,is_process, order_date_time from `order` order by order_date_time desc';

    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);

        res.status(500).json(err)
      } else {

        res.status(200).json(result)
      }

    })

  }
  updateOrderStatus = (req, res) => {
    
    const { order_id, user_id, is_process } = req.body;

    let sql = 'UPDATE `order` SET is_process = ? WHERE order_id = ? and user_id = ?'
    connection.query(sql, [!is_process, order_id, user_id], (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json("se ha enviado correctamente");
      }
    });
  }
}



export default new AdminControllers();