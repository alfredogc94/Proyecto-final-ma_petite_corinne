import React, { useContext, useEffect } from 'react';
import { useAmount } from '../../hook/useAmount';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../Context/ContextProvider';

const apiUrl = import.meta.env.VITE_SERVER_URL;

export const OneCartItem = ({ item, handleAmounts, removeFromCart }) => {
  const { handleChange, amount, handleAmount, setAmount } = useAmount();
  const { cartItems, setCartItems } = useContext(AppContext);

  useEffect(() => {
    if (cartItems && item) {
      let indexOfProduct = cartItems.findIndex(e => e.product_id === item.product_id);
      if (indexOfProduct !== -1) {
        setAmount(cartItems[indexOfProduct].amount);
      }
    }
  }, [cartItems, item, setAmount]);

  const handleButton = (type) => {
    const arrayTemp = cartItems.map(e => {
      if (e.product_id === item.product_id) {
        if (e.amount === 0 && type === "less") {
          return e;
        } else if (e.amount === "") {
          return { ...e, amount: 0 };
        } else if (type === "add") {
          return { ...e, amount: e.amount + 1 };
        } else if (type === "less") {
          return { ...e, amount: e.amount - 1 };
        }
      } else {
        return e;
      }
    });
    setCartItems(arrayTemp);
  };

  const imageArray = item.images ? item.images.split(',') : []; 


  const firstImage = imageArray.length > 0 ? imageArray[0].trim() : null;


  const firstImageUrl = firstImage ? `${apiUrl}/images/products/${firstImage}` : null;

  return (
    <li className="cart-item">
      <div className="item-details">
      
        {firstImageUrl && (
          <img src={firstImageUrl} alt={item.title} className="item-image" />
        )}
        
        <p className="item-name">{item.title}</p>
        <p className="item-description">{item.description}</p>
        <p className="item-price">Precio: {item.price}</p>
        <div>
          <Button onClick={() => handleButton("less")}>-1</Button>
          <input 
            type="text"
            value={amount}
            onChange={(e) => handleAmounts(item.product_id, e)}
          />
          <Button onClick={() => handleButton("add")}>+1</Button>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button className="remove-button" onClick={() => removeFromCart(item.product_id)}>Eliminar</Button>
      </div>
    </li>
  );
};

