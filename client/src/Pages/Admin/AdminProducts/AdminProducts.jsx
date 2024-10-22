import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Modal, Card } from "react-bootstrap";
import "./adminProducts.scss";
import { AppContext } from "./../../../Context/ContextProvider";
import { FormAddProduct } from "../../../components/Modals/FormAddProduct/FormAddProduct";
import { FormEditProduct } from "../../../components/Modals/FormEditProduct/FormEditProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import fetchData from "../../../helpers/axiosHelper";

const apiUrl = import.meta.env.VITE_SERVER_URL;

export const AdminProducts = () => {
  const { products, resetProducts, setResetProducts } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [files, setFiles] = useState([]);
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (search.trim()) {
        try {
          console.log("Hola");

          const data = await fetchData("products/searchProducts", "post", {
            term: search,
          });
          setFilteredProducts(data);
        } catch (error) {
          console.error("Error al buscar productos:", error);
          setFilteredProducts([]);
        }
      } else {
        setFilteredProducts(products);
      }
    };

    fetchProducts();
  }, [search, products]);

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    openEditProductModal();
  };

  const openProductModal = () => {
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
  };

  const openEditProductModal = () => {
    setShowEditProductModal(true);
  };

  const closeEditProductModal = () => {
    setShowEditProductModal(false);
    setProductToEdit(null);
  };

  const openConfirmModal = (productId) => {
    setProductIdToDelete(productId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setProductIdToDelete(null);
    setShowConfirmModal(false);
  };

  const borrarImagen = async (image) => {
    console.log(image);

    try {
      let result = await fetchData("products/delProductImage", "put", {
        image,
      });
      setResetProducts(!resetProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDelete = async () => {
    if (productIdToDelete !== null) {
      try {
        await fetchData(`admin/delProduct/${productIdToDelete}`, "put");
        setFilteredProducts((prevProducts) =>
          prevProducts.filter(
            (product) => product.product_id !== productIdToDelete
          )
        );
        console.log(
          `Producto con ID: ${productIdToDelete} eliminado lógicamente`
        );
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
      closeConfirmModal();
    }
  };

  const handleFiles = async (e, id) => {
    try {
      console.log(e.target.files);

      const formData = new FormData();
      formData.append("id", JSON.stringify(id));
      for (const elem of e.target.files) {
        formData.append("file", elem);
      }
      const result = await fetchData(
        "products/addFilesToProduct",
        "post",
        formData
      );
      console.log(result);
      setResetProducts(!resetProducts);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(filteredProducts);

  return (
    <div className="admin-products-container">
      <h1>Lista de Productos</h1>
      <div className="d-flex mb-3 gap-3">
        <Button onClick={openProductModal} variant="primary">
          Agregar Producto
        </Button>
        <Button onClick={() => navigate("/adminDashboard")} variant="primary">
          Panel de control
        </Button>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Mostrar productos en tabla para pantallas grandes */}
      <Table striped bordered hover responsive className="d-none d-lg-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Color</th>
            <th>Imágenes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.product_id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.category_name}</td>
                <td>{product.price} €</td>
                <td>{product.colour}</td>
                <td>
                  <div className="image-gallery">
                    {product.images ? (
                      product.images.split(",").map((image) => (
                        <div key={image.split("&")[0]}>
                          <img
                            src={`${apiUrl}/images/products/${
                              image.split("&")[1]
                            }`}
                            alt={product.title}
                            className="product-image"
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="action-icon delete-image"
                            onClick={() => borrarImagen(image)}
                          />
                        </div>
                      ))
                    ) : (
                      <p>Sin imágenes</p>
                    )}
                  </div>
                </td>
                <td className="acciones">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="action-icon edit-icon"
                    onClick={() => handleEditProduct(product)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="action-icon delete-icon"
                    onClick={() => openConfirmModal(product.product_id)}
                  />
                  <label htmlFor={product.product_id}>
                    <FontAwesomeIcon icon={faUpload} />
                  </label>
                  <input
                    id={product.product_id}
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => handleFiles(e, product.product_id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Mostrar productos en forma de tarjetas en pantallas pequeñas y medianas */}
      {/* Mostrar productos en forma de tarjetas en pantallas pequeñas y medianas */}
      <div className="product-cards d-lg-none">
        {filteredProducts.length === 0 ? (
          <p className="text-center">No hay productos disponibles</p>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.product_id} className="product-card">
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <div>
                  <strong>Descripción:</strong> {product.description}
                  <br />
                  <strong>Categoría:</strong> {product.category_name}
                  <br />
                  <strong>Precio:</strong> {product.price} €<br />
                  <strong>Color:</strong> {product.colour}
                  <br />
                  {/* Mostrar imágenes */}
                  {product.images ? (
                    <div className="image-gallery">
                      {product.images.split(",").map((image) => (
                        <div key={image.split("&")[0]}>
                          <img
                            src={`${apiUrl}/images/products/${
                              image.split("&")[1]
                            }`}
                            alt={product.title}
                            className="product-image"
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="action-icon delete-image"
                            onClick={() => borrarImagen(image)}
                          />
                        </div>
                      ))}
                    
                    </div>
                  ) : (
                    "Sin imágenes"
                  )}
                </div>
                <div className="action-icons">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="action-icon edit-icon"
                    onClick={() => handleEditProduct(product)}
                  />
                    <label htmlFor={`card-file-${product.product_id}`}>
                        <FontAwesomeIcon icon={faUpload} />
                      </label>
                      <input
                        id={`card-file-${product.product_id}`}
                        type="file"
                        multiple
                        hidden
                        onChange={(e) => handleFiles(e, product.product_id)}
                      />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="action-icon delete-icon"
                    onClick={() => openConfirmModal(product.product_id)}
                  />
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>

      <FormAddProduct show={showProductModal} handleClose={closeProductModal} />

      {productToEdit && (
        <FormEditProduct
          show={showEditProductModal}
          handleClose={closeEditProductModal}
          productToEdit={productToEdit}
          setProductToEdit={setProductToEdit}
          setFilteredProducts={setFilteredProducts}
          filteredProducts={filteredProducts}
        />
      )}

      {/* Confirmation Modal for Deletion */}
      <Modal show={showConfirmModal} onHide={closeConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto?
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
