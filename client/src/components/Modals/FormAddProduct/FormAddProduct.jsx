import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import fetchData from "../../../helpers/axiosHelper";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/ContextProvider";

const InitialValue = {
  title: "",
  description: "",
  price: "",
  colour: "",
  category_id: "",
};

export const FormAddProduct = ({ show, handleClose}) => {
  const [product, setProduct] = useState(InitialValue);
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState([]);
  const { token, categories, setResetProducts, resetProducts } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCloseAndReset = () => {
    setProduct(InitialValue);
    setFiles([]);
    handleClose();
    setMsg("")
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const onSubmit = async () => {
    if (
      product.title &&
      product.description &&
      product.description.length <= 399 &&
      product.price &&
      product.colour &&
      product.category_id
    ) {
      if (files.length > 0) {
        try {
          const newFormData = new FormData();
          newFormData.append("dataProduct", JSON.stringify(product));
  
          for (const elem of files) {
            newFormData.append("file", elem);
          }
  
          const res = await fetchData(
            "products/addProducts",
            "post",
            newFormData,
            {
              Authorization: `Bearer ${token}`,
            }
          );
  
          handleCloseAndReset();
          navigate("/adminProducts");
          setResetProducts(!resetProducts);
          setMsg("")
        } catch (err) {
          console.log(err);
        }
      } else {
        setMsg("Debes subir al menos una foto del producto.");
      }
    } else {
      if (product.description && product.description.length > 399) {
        setMsg("La descripción no puede exceder los 400 caracteres.");
      } else {
        setMsg("Debes cumplimentar todos los campos.");
      }
    }
  };

  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir un producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="colour"
              value={product.colour}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="category_id"
              value={product.category_id}
              onChange={handleChange}
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imágenes</Form.Label>
            <Form.Control type="file" multiple onChange={handleFiles} />
          </Form.Group>
          {msg && <p style={{ color: "red" }}>{msg}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={onSubmit}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};