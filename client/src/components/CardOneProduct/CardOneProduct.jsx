import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CardOneProduct.css';

const apiUrl = import.meta.env.VITE_SERVER_URL;

export const CardOneProduct = ({ product }) => {

  
  const navigate = useNavigate();

  const handleClick = () => {
    
    navigate(`/shop/oneProduct/${product.product_id}`);
  };

  const cleanImageName = (image) => {
    return image.replace(/^.*Id-/, 'Id-');
  };
  
  const imagesString = product.images;
  let firstImage = null;
  
  if (imagesString && imagesString.includes(',')) {
    const imagesArray = imagesString.split(',');
    firstImage = cleanImageName(imagesArray[0]);
  } else if (imagesString) {
    firstImage = cleanImageName(imagesString);
  }
  const placeholderImage = `${apiUrl}/images/products/productoDefault.png`;
  
  const imageSrc = product?.first_image
    ? `${apiUrl}/images/products/${product.first_image}`
    : firstImage
      ? `${apiUrl}/images/products/${firstImage}`
      : placeholderImage;
  

      const truncatedDescription = product.description?.length > 75
      ? product.description.substring(0, 75) + '...'
      : product.description;

  return (
    <Card 
      onClick={handleClick}
      className="product-card shadow-sm mb-4"
    >
      {imageSrc && (
        <Card.Img 
          variant="top" 
          src={imageSrc} 
          alt={product.title} 
          className="card-image"
        />
      )}
      <Card.Body className="text-center">
        <Card.Title className="product-title">{product?.title}</Card.Title>
        <Card.Text className="product-description">
          <strong>Descripción:</strong> {truncatedDescription}
        </Card.Text>
        <Card.Text className="product-colour">
          <strong>Color:</strong> {product?.colour}
        </Card.Text>
        <Card.Text className="product-price">
          <strong>Precio:</strong> {product?.price} €
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
