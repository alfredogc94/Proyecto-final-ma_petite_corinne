import React, { useContext } from "react";
import "./orderDetail.scss";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../Context/ContextProvider";

const url_base = import.meta.env.VITE_SERVER_URL;

export const OrderDetail = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  function sumatorio(data) {
    let total = 0;
    data.forEach((product) => {
      total += product.price * product.amount;
    });
    return total;
  }

  return (
    <>
      <div className="order-detail">
        <h3>Detalles del Pedido</h3>
        <h4>Fecha de Compra:</h4>
        {data.length > 0 && (
          <p>
            <strong>{data[0].order_date_time}</strong>
          </p>
        )}

        <h4>Productos en el pedido:</h4>
        {data.length === 0 ? (
          <p>No hay productos en este pedido.</p>
        ) : (
          <Row className="justify-content-center"> {/* Centramos los productos */}
            {data.map((item, index) => (
              <Col xs={12} sm={6} md={4} key={index} className="mb-4"> {/* Tamaño ajustado */}
                <Card>
                  <Card.Img
                    variant="top"
                    src={`${url_base}images/products/${item.image_name}`}
                    alt={item.title}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      <strong>Color:</strong> {item.colour}
                      <br />
                      <strong>Cantidad:</strong> {item.amount}
                      <br />
                      <strong>Precio:</strong> {item.price}€
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginTop: "20px" }}
        >
          <h4>
            <strong>Precio Total: {sumatorio(data).toFixed(2)}€</strong>
          </h4>
          <div className="d-flex justify-content-center">
            {user.type === 2 && (
              <Button onClick={() => navigate("/adminDashboard")}>
                Panel de control
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
