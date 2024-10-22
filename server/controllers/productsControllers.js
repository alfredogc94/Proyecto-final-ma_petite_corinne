import connection from "../config/db.js";
import { deleteFile } from "../utils/delPicture.js";

class productsControllers {
  addProducts = (req, res) => {
    const { title, description, price, colour, category_id } = JSON.parse(
      req.body.dataProduct
    );

    let sql =
      "INSERT INTO product(title, description, price, colour, category_id) values (?, ?, ?, ?, ?)";
    let values = [title, description, price, colour, category_id];

    connection.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        let product_id = result.insertId;
        if (req.files && req.files.length) {
          this.saveImages(req.files, product_id);
        }

        const newProduct = {
          product_id,
          title,
          description,
          price,
          colour,
          category_id,
        };
        res.status(200).json(newProduct);
      }
    });
  };

  saveImages = (images, product_id) => {
    let sql = "INSERT INTO image (image_name, product_id) VALUES (?, ?)";

    images.forEach((img) => {
      let values = [img.filename, product_id];
      connection.query(sql, values, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  };

  getAllCategories = (req, res) => {
    let sql = "SELECT * FROM category WHERE disabled = 0";
    connection.query(sql, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  };

  addCategories = (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha subido ninguna imagen" });
    }

    const { category_name } = req.body;
    const imageFileName = req.file.filename;

    let sql = "INSERT INTO category (category_name, img) VALUES (?, ?)";
    let values = [category_name, imageFileName];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        res.status(201).json({
          category_id: result.insertId,
          image: imageFileName,
        });
      }
    });
  };

  getAllProducts = (req, res) => {
    const sql = `
      SELECT product.*, 
       GROUP_CONCAT(image.image_id, "&", image.image_name) AS images,
       category.category_name
       FROM product 
       LEFT JOIN image ON product.product_id = image.product_id
       LEFT JOIN category ON product.category_id = category.category_id
       WHERE product.disabled = 0 
       GROUP BY product.product_id;
    `;

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(result);
    });
  };

  searchProducts = (req, res) => {
    const { term } = req.body;
    const textos = term.trim().split(" ");
    let sql = `
      SELECT 
          product.product_id,
          product.title,
          product.description,
          product.price,
          product.colour,
          category.category_name,
          GROUP_CONCAT(image.image_name) AS images 
      FROM product 
      JOIN category ON product.category_id = category.category_id
      LEFT JOIN image ON product.product_id = image.product_id
      WHERE product.disabled = 0
  `;

    if (textos.length > 0) {
      for (let palabra of textos) {
        sql += ` AND (product.title LIKE '%${palabra}%' 
                        OR product.description LIKE '%${palabra}%' 
                        OR category.category_name LIKE '%${palabra}%' 
                        OR product.colour LIKE '%${palabra}%')`;
      }
    }

    sql += " GROUP BY product.product_id";

    connection.query(sql, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error en la consulta", details: err });
      }
      res.status(200).json(result);
    });
  };

  getOneProduct = (req, res) => {
    const { id } = req.params;
    const sql = `
      SELECT product.*, 
             GROUP_CONCAT(image.image_name) AS images 
      FROM product 
      LEFT JOIN image ON product.product_id = image.product_id 
      WHERE product.product_id = ? AND product.disabled = 0
      GROUP BY product.product_id
    `;

    connection.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(result[0]);
    });
  };

  getRandomProducts = (req, res) => {
    const sql = `
   SELECT 
      p.product_id, 
      p.title, 
      p.description, 
      p.price, 
      p.colour, 
      (SELECT MIN(i.image_name) FROM image i WHERE i.product_id = p.product_id) AS first_image -- Obtener la primera imagen
    FROM product p
    WHERE p.disabled = 0
    ORDER BY RAND() -- Selecciona productos aleatorios
    LIMIT 4
  `;

    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(result);
    });
  };

  getNewestProducts = (req, res) => {
    const sql = `
   SELECT 
      product.product_id, 
      product.title, 
      product.description, 
      product.price, 
      product.category_id, 
      product.created_at, 
    GROUP_CONCAT(image.image_name) AS images,
    category.category_name
    FROM product 
    LEFT JOIN image ON product.product_id = image.product_id
    LEFT JOIN category ON product.category_id = category.category_id
    WHERE product.disabled = 0
    GROUP BY product.product_id, 
         product.title, 
         product.description, 
         product.price, 
         product.category_id, 
         product.created_at, 
         category.category_name
ORDER BY product.created_at DESC
LIMIT 8;
  `;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);

        res.status(500).json(err);
      }
      res.status(200).json(result);
    });
  };

  delProductImage = (req, res) => {
    console.log(req.body);

    const image = req.body.image.split("&")[1];
    const id = parseInt(req.body.image.split("&")[0])
    console.log(image);
    
    let sql = `DELETE FROM image WHERE image_id = ?`;
    let values = [id];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        deleteFile(image)
        res.status(200).json(result);
      }
    });
  };


  addFilesToProduct = (req, res) => {
    console.log(req.files);
    const id = JSON.parse(req.body.id) 
    console.log(id);
    try {
      let sql = 'INSERT INTO image (product_id, image_name) values (?, ?)'
      req.files.forEach(elem => {
        connection.query(sql, [id, elem.filename], (err,result) => {
          if (err) {
            throw err
          }
        }) 
      })
      res.status(200).json(req.body);
      
    } catch (error) {
      res.status(500).json(error);
    }
  }


}
export default new productsControllers();
