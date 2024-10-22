import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchData from '../../../../helpers/axiosHelper';
import { AppContext } from '../../../../Context/ContextProvider';
import { Button } from 'react-bootstrap';
import { OrderDetail } from '../OrderDetail/OrderDetail';
const url_base = import.meta.env.VITE_SERVER_URL
export const ConfirmationOrderDetails = () => {
  const [data, setData] = useState(null);
  const { user_id, order_id } = useParams();
  const { token } = useContext(AppContext);
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchOrderDetails = async (user_id, order_id) => {
      try {
        const res = await fetchData(
          `orders/getConfirmedOrder/${user_id}/${order_id}`,
          "get",
          null,
          { Authorization: `Bearer ${token}` }
        );
        console.log(res);
        setData(res); 
      } catch (error) {
        console.log(error);
      }
    };

    if (user_id && order_id && token) {
      fetchOrderDetails(user_id, order_id);
    }
  }, [user_id, order_id, token]);

  
  if (!data) {
    return <div>Cargando los detalles del pedido...</div>;
  }
  
  return (   
    <>
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 className='text-center'>Pedido confirmado</h1>
      <OrderDetail data={data}/>

  </div>
  <div className='d-flex justify-content-center gap-3 mt-3'>
    <Button onClick={()=>navigate("/shop")}>Volver a la tienda</Button>
    <Button onClick={()=>navigate("/shop/orderHistory")}>Historial de pedidos</Button>
  </div>
  </>
  );
};
