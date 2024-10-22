import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import fetchData from "../../../helpers/axiosHelper";
import { AppContext } from "../../../Context/ContextProvider";

const InitialValue = {
  category_name: "",
  img: null
};

export const FormEditCategory = ({ show, handleClose, categoryId, categoryToEdit, setCategoryToEdit, categoriasFiltradas, setCategoriasFiltradas }) => {
  const { categories, updateCategory } = useContext(AppContext);
  const [category, setCategory] = useState(InitialValue);
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState()

  useEffect(() => {
    if (categoryToEdit) {
      setCategory(categoryToEdit[0])
    }
  }, [categoryToEdit])

  const handleFile = (e) => {
    setImage(e.target.files[0])
  }

  const handleCloseAndReset = () => {
    setCategory(InitialValue);
    setMsg(""); 
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const onSubmit = async () => {
   
    if (!category.category_name) {
      setMsg("Debes ingresar un nuevo nombre para la categoría.");
      return;
    }

    try {
      const newFormData = new FormData()
      newFormData.append("editData", JSON.stringify(category))
      newFormData.append("file", image)

      const response = await fetchData(`admin/editCategory`, "put", newFormData);
      console.log(response);
      
      if (response.img) {
        setCategoriasFiltradas(categoriasFiltradas.map(e => {
          if (e.category_id === category.category_id) {
            return {...category, img: response.img}
          } else {
            return e
          }
        })) 
      } else {
        setCategoriasFiltradas(categoriasFiltradas.map(e => {
          if (e.category_id === category.category_id) {
            return {...category}
          } else {
            return e
          }
        })) 
      }
      setCategory({});
      setImage();
      setMsg("Categoría editada con éxito.");
      handleCloseAndReset(); 
     
    } catch (err) {
      console.error("Error en onSubmit:", err.response || err); 
      setMsg("Error al editar la categoría");
    }
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category_name"
              value={category?.category_name}
              onChange={handleChange}
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="imagen">Imagen</Form.Label>
            <Form.Control
              type="file"
              id="imagen"
              onChange={handleFile}
            
            />
          </Form.Group>
          {msg && <p style={{ color: "red" }}>{msg}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="secondary" onClick={onSubmit}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
