import React from 'react';
import { Card, Col } from 'react-bootstrap';
import './cardOneCategory.scss';

const apiUrl = import.meta.env.VITE_SERVER_URL;

export const CardOneCategory = ({ category, onClick }) => {
  const placeholderImage = `${apiUrl}/images/categories/default.jpg`;

  return (
    <Col xs={12} className="d-flex justify-content-center pt-5 p-4">
      <Card className="card-category" onClick={onClick}>
        <img
          src={`${apiUrl}/images/categories/${category.img}`}
          alt={category.category_name}
          className="category-image rounded-4"
          onError={(e) => { e.target.src = placeholderImage; }}
        />
        <Card.Body className="card-body-categories">
          <div className="title-box">
            <Card.Title> {category.category_name}</Card.Title>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
