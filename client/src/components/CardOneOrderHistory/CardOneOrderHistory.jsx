import React, { useContext } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/ContextProvider';
import './cardOneOrderHistory.scss';

export const CardOneOrderHistory = ({ order }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  
  const handleClick = () => {
    navigate(`/shop/oneOrderHistory/${order.order_id}`);
  };

  return (
    <Card className="order-history-card">
      <Row className="g-0 order-history-row">
        <Col md={7}>
          <Card.Body className="order-history-body">
            <Card.Title>Pedido número: #{order.order_id}</Card.Title>
            <Card.Text>{order.order_date_time}</Card.Text>
          </Card.Body>
        </Col>
        <Col md={3} className="order-history-button-col">
          <Button className="order-history-button" onClick={handleClick}>Ver pedido</Button>
        </Col>
      </Row>
    </Card>
  );
};
