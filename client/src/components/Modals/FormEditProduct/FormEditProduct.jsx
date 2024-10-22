import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import fetchData from "../../../helpers/axiosHelper";
import { AppContext } from "../../../Context/ContextProvider";

const InitialValue = {
  title: "",
  description: "",
  price: "",
  colour: "",
  category_id: "",
};

export const FormEditProduct = ({ show, handleClose, productToEdit, setProductToEdit, filteredProducts, setFilteredProducts }) => {
  const { categories, updateProduct } = useContext(AppContext);
  const [product, setProduct] = useState(InitialValue);
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit[0]);
    }
  }, [productToEdit]);

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCloseAndReset = () => {
    setProduct(InitialValue);
    setMsg("");
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
  };

  const onSubmit = async () => {
    if (!productToEdit.title || !productToEdit.price || !productToEdit.category_id) {
      setMsg("Los campos obligatorios no están completos.");
      return;
    }

    try {
      const newFormData = new FormData();
      newFormData.append("editData", JSON.stringify(productToEdit));
      newFormData.append("file", image);

      const response = await fetchData("admin/editProduct", "put", newFormData);
      console.log(response);

      // if (response.img) {
      //   setProductToEdit({ ...productToEdit, img: response.img });
      // } else {
      //   setProductToEdit({ ...productToEdit });
      // }
      setFilteredProducts(filteredProducts.map( elem => {
        if (elem.product_id === productToEdit.product_id) {
          return productToEdit
        } else {
          return elem
        }
      }))
      setMsg("Producto editado con éxito.");
      handleCloseAndReset();
    } catch (err) {
      console.error("Error al editar el producto:", err);
      setMsg("Error al editar el producto.");
    }
  };

  console.log(productToEdit);
  

  return (
    <Modal show={show} onHide={handleCloseAndReset}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={productToEdit?.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={productToEdit?.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={productToEdit?.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="colour"
              value={productToEdit?.colour}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="category_id"
              value={productToEdit?.category_id}
              onChange={handleChange}
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

         
        </Form>

        {msg && <p>{msg}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAndReset}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
