import React from 'react';
import './CartView.css';
import { Button } from 'react-bootstrap';
import { OneCartItem } from '../../../components/OneCartItem/OneCartItem';
import { useAmount } from '../../../hook/useAmount';

export const CartView = ({ cartItems, removeFromCart, setOrderOk, handleAmounts }) => {
  
  const {totalAmount} = useAmount();
  
  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>

      {(!cartItems || cartItems.length === 0) ? (
        <p className="empty-cart">No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <OneCartItem
                item={item}
                setOrderOk={setOrderOk}
                removeFromCart={removeFromCart}
                handleAmounts={handleAmounts}
                key={item.product_id}
              />
            ))}
          </ul>
          <div className="total-price">
            <h3>Total de la compra: €{totalAmount.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};
