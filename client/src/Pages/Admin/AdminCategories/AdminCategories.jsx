import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Col, Row, Table, Card } from "react-bootstrap";
import { FormAddCategory } from "../../../components/Modals/FormAddCategory/FormAddCategory";
import { FormEditCategory } from "../../../components/Modals/FormEditCategory/FormEditCategory";
import { AppContext } from "../../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import fetchData from "../../../helpers/axiosHelper";
import "./adminCategories.scss";

const apiUrl = import.meta.env.VITE_SERVER_URL;

export const AdminCategories = () => {
  const navigate = useNavigate();
  const { categories, setCategories } = useContext(AppContext);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [searchCategory, setSearchCategory] = useState("");
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);

  useEffect(() => {
    if (categories) {
      setCategoriasFiltradas(categories);
    }
  }, [categories]);

  const handleSearchCategories = (e) => {
    setSearchCategory(e.target.value);
  
    setCategoriasFiltradas(
      categories.filter((category) => {
        return category.category_name.toLowerCase().includes(e.target.value.toLowerCase());
      })
    ); 
  };

  const openAddCategory = () => setShowCategoryModal(true);
  const closeAddCategory = () => setShowCategoryModal(false);

  const openEditCategory = (categoryId) => {
    setCategoryToEdit(categoriasFiltradas.filter(e => e.category_id === categoryId));
    setShowEditCategoryModal(true);
  };

  const closeEditCategory = () => {
    setCategoryToEdit(null);
    setShowEditCategoryModal(false);
  };

  const openConfirmModal = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setCategoryIdToDelete(null);
    setShowConfirmModal(false);
  };

  const handleConfirmDelete = async () => {
    if (categoryIdToDelete !== null) {
      try {
        await fetchData(`admin/delCategory/${categoryIdToDelete}`, "put");
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.category_id !== categoryIdToDelete
          )
        );
        console.log(`Categoría con ID: ${categoryIdToDelete} eliminada lógicamente`);
      } catch (error) {
        console.log("Error al eliminar la categoría:", error);
      }
      closeConfirmModal();
    }
  };

  const handleCategorySelect = (categoryName) => {
    navigate("/adminProducts", { state: { categoryName } });
  };

  return (
    <div className="admin-categories-page">
      <h1>Lista de categorias</h1>
      <div className="d-flex gap-3 mt-3">
        <Button className="boton-categories" onClick={openAddCategory}>Agregar Categoría</Button>
        <Button className="boton-categories" onClick={() => navigate("/adminDashboard")}>
          Panel de control
        </Button>
      </div>

      <FormAddCategory
        show={showCategoryModal}
        handleClose={closeAddCategory}
      />
      <FormEditCategory
        show={showEditCategoryModal}
        handleClose={closeEditCategory}
        categoryToEdit={categoryToEdit}
        setCategoryToEdit={setCategoryToEdit}
        categoriasFiltradas={categoriasFiltradas}
        setCategoriasFiltradas={setCategoriasFiltradas}
      />

      <Row>
        <Col>
         
          <input
            type="text"
            placeholder="Buscar categoría..."
            value={searchCategory}
            onChange={handleSearchCategories}
            className="mb-4 mt-4"
          />
        </Col>
      </Row>

      {/* Table for larger screens */}
      <Row className="d-none d-lg-block">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre de Categoría</th>
                <th>Imagen</th>
                <th className="action-column">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categoriasFiltradas.map((category) => (
                <tr key={category.category_id}>
                  <td className="align-content-center" onClick={() => handleCategorySelect(category.category_name)}>
                    {category.category_name}
                  </td>
                  <td className="d-flex justify-content-center">
                    {category.img ? (
                      <img
                        src={`${apiUrl}/images/categories/${category.img}`}
                        alt={category.category_name}
                        className="category-image"
                      />
                    ) : (
                      <span>No hay imagen disponible</span> // Mensaje si no hay imagen
                    )}
                  </td>
                  <td className="align-content-center">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => openEditCategory(category.category_id)}
                      className="icon-edit"
                      style={{ cursor: 'pointer', marginRight: '10px' }}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => openConfirmModal(category.category_id)}
                      className="icon-delete"
                      style={{ cursor: 'pointer', color: 'red' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Cards for smaller screens */}
      <Row className="d-lg-none">
        {categoriasFiltradas.map((category) => (
          <Col xs={12} sm={6} md={4} key={category.category_id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title onClick={() => handleCategorySelect(category.category_name)}>
                  {category.category_name}
                </Card.Title>
                {category.img ? (
                  <Card.Img
                    variant="top"
                    src={`${apiUrl}/images/categories/${category.img}`}
                    alt={category.category_name}
                    className="category-image"
                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>No hay imagen disponible</span> {/* Mensaje si no hay imagen */}
                  </div>
                )}
                <div className="d-flex justify-content-between mt-3">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => openEditCategory(category.category_id)}
                    className="icon-edit"
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => openConfirmModal(category.category_id)}
                    className="icon-delete"
                    style={{ cursor: 'pointer', color: 'red' }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showConfirmModal} onHide={closeConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta categoría?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
