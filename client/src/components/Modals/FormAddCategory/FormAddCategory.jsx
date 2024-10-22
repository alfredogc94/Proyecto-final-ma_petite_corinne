import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import fetchData from "../../../helpers/axiosHelper";
import { AppContext } from "../../../Context/ContextProvider";

const InitialValue = {
  category_name: "",
};

export const FormAddCategory = ({ show, handleClose }) => {
  const { addCategory, setResetCategories, resetCategories } = useContext(AppContext);
  const [category, setCategory] = useState(InitialValue);
  const [categoryImage, setCategoryImage] = useState(null); 
  const [msg, setMsg] = useState("");

  const handleCloseAndReset = () => {
    setCategory(InitialValue);
    setCategoryImage(null); 
    setMsg("");
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]); 
  };

  const onSubmit = async () => {
    if (category.category_name && categoryImage) {
      try {
        const formData = new FormData();
        formData.append("category_name", category.category_name);
        formData.append("file", categoryImage); 

        const res = await fetchData("products/addCategories", "post", formData);
        console.log(res);

        addCategory({ category_id: res.category_id, category_name: category.category_name });
        handleCloseAndReset();
        setResetCategories(!resetCategories)
      } catch (err) {
        console.log(err);
        setMsg("Error al añadir la categoría. Inténtalo de nuevo.");
      }
    } else {
      setMsg("Debes cumplimentar todos los campos");
    }
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category_name"
              value={category.category_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen de la Categoría</Form.Label>
            <Form.Control
              type="file"
              accept="image/*" 
              onChange={handleImageChange}
              required
            />
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
