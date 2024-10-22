import { useContext, useEffect, useState } from "react";
import { CartView } from "../CartView/CartView";
import { AppContext } from "../../../Context/ContextProvider";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../helpers/axiosHelper";

export const CartDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [orderOk, setOrderOk] = useState(false);
  const { cartItems, removeFromCart, isAuthenticated, setCartItems, token, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setOrderOk(false);
    if (cartItems) {
      if (cartItems.some(e => e.amount === 0 || e.amount === "")) {
        setOrderOk(true);
      }
    }
  }, [cartItems]);

  const handleOrderConfirmation = async () => {
    let products = cartItems.map(e => ({ product_id: e.product_id, amount: e.amount }));
    let data = { user_id: user.user_id, products };

    try {
      const res = await fetchData("orders/saveOrder", "post", data, { Authorization: `Bearer ${token}` });
      const { user_id, order_id } = res;
      setCartItems([]);
      localStorage.removeItem("cart");
      setShowModal(false);
      navigate(`/shop/order/${user_id}/${order_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAmounts = (productId, e) => {
    const regex = /^(0|[1-9][0-9]*)$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      const arrayTemp = cartItems.map(elem => {
        if (elem.product_id == productId) {
          return { ...elem, amount: e.target.value !== "" ? Number(e.target.value) : e.target.value };
        }
        return elem;
      });
      setCartItems(arrayTemp);
    }
  };

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <>
          <h2 className="text-center"></h2>
          <CartView 
            cartItems={cartItems} 
            removeFromCart={removeFromCart}
            setOrderOk={setOrderOk}
            handleAmounts={handleAmounts}
          />
          <div className="d-flex justify-content-center mt-4 flex-wrap gap-3">
            <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
            {cartItems && cartItems.length !== 0 && (
              <Button
                disabled={orderOk}
                onClick={() => setShowModal(true)}
                variant="primary"
              >
                Tramitar pedido
              </Button>
            )}
          </div>
        </>
      ) : (
        <p className="text-center">Por favor, inicia sesión para añadir productos al carrito.</p>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación de Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas tramitar el pedido?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleOrderConfirmation}>Confirmar Pedido</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
