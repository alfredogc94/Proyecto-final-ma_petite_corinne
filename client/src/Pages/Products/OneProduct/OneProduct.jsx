import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import fetchData from "../../../helpers/axiosHelper";
import { AppContext } from "../../../Context/ContextProvider";
import { useAmount } from "../../../hook/useAmount";
import { CardOneProduct } from "../../../components/CardOneProduct/CardOneProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "./OneProduct.css"; // Asegúrate de tener estilos personalizados

const apiUrl = import.meta.env.VITE_SERVER_URL;

export const OneProduct = () => {
  const [product, setProduct] = useState(null);
  const [beenInCart, setBeenInCart] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const { id } = useParams();
  const { addToCart, isAuthenticated, cartItems } = useContext(AppContext);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { handleChange, amount, handleAmount, setAmount } = useAmount();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchData(`products/getOneProduct/${id}`, "get");
        setProduct(data);
        setBeenInCart(false)
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (cartItems && product) {
      let indexOfProduct = cartItems.findIndex(
        (e) => e.product_id === product.product_id
      );
      if (indexOfProduct !== -1) {
        setAmount(cartItems[indexOfProduct].amount);
        setBeenInCart(true);
      }
    }
  }, [cartItems, product, setAmount]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        const data = await fetchData("products/getRandomProducts", "get");
        setRecommendedProducts(data);
      } catch (error) {
        console.error("Error al obtener productos recomendados:", error);
      }
    };

    fetchRecommendedProducts();
  }, []);

  const handleAddToCart = () => {
    if (product && amount > 0) {
      let productTemp = { ...product, amount };
      addToCart(productTemp);     
      setShowConfirmModal(true);
    }
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    navigate(-1);
    
  };

  const handleNextImage = () => {
    if (product?.images) {
      const totalImages = product.images.split(",").length;
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }
  };

  const handlePreviousImage = () => {
    if (product?.images) {
      const totalImages = product.images.split(",").length;
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
      );
    }
  };

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  const imagesArray = product?.images ? product.images.split(",") : [];

  return (
    <div
      className="one-product-container"
      style={{ padding: "2rem", marginTop: "2rem" }}
    >
      <div className="product-details">
        <div className="image-carousel">
          {imagesArray.length > 0 && (
            <div className="d-flex align-items-center justify-content-center mb-3">
            <Button variant="light" className="arrow-button" onClick={handlePreviousImage}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <img
              src={`${apiUrl}images/products/${imagesArray[currentImageIndex]}`}
              alt={`Imagen ${currentImageIndex + 1}`}
              className="product-image"
            />
            <Button variant="light" className="arrow-button" onClick={handleNextImage}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
          
          )}
        </div>

        <div className="product-info">
          {beenInCart && isAuthenticated &&(
            <p className="text-danger">Este producto ya está en el carrito</p>
          )}
          <h2>{product?.title}</h2>
          <p>
            <strong>Descripción:</strong> {product?.description}
          </p>
          <p>
            <strong>Color:</strong> {product?.colour}
          </p>
          <p>
            <strong>Precio:</strong> {product?.price} €
          </p>

          <div className="quantity-selector">
            <Button
              className="custom-button"
              onClick={() => handleAmount("less")}
            >
              -1
            </Button>
            <input
              type="text"
              onChange={handleChange}
              value={amount}
              className="quantity-input"
            />
            <Button
              className="custom-button"
              onClick={() => handleAmount("add")}
            >
              +1
            </Button>
          </div>

          <div className="action-buttons pb-5">
            {isAuthenticated ? (
              <button
                disabled={amount === "" || amount <= 0}
                onClick={handleAddToCart}
                className="button-custom"
              >
                Añadir al Carrito
              </button>
            ) : (
              <p className="text-danger">
                Por favor, inicia sesión para añadir productos al carrito.
              </p>
            )}
          </div>
        </div>
      </div>

      <Modal show={showConfirmModal} onHide={closeConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Producto Añadido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {product.title} ha sido añadido al carrito correctamente.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="text-center justify-content-center ">
        <h3 className="pb-2 pt-4">Otros productos recomendados</h3>
        <Row className="justify-content-center">

          {recommendedProducts.map((product) => (
            <Col
              key={product.product_id}
              xs={12}
              sm={6}
              lg={3}
              className="my-3"
            >
              <CardOneProduct 
              product={product}
              
              />
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Button
            className="custom-button"
            onClick={() => navigate("/shop/AllProducts")}
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};
