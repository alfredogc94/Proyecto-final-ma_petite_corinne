import React, { useContext, useEffect, useState } from 'react'
import fetchData from '../../../../helpers/axiosHelper';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../../Context/ContextProvider';
import { OrderDetail } from '../OrderDetail/OrderDetail';

export const OneOrderHistory = () => {
  const { user_id, order_id } = useParams(); 
  const [order, setOrder] = useState([]);
  const { token, user } = useContext(AppContext);

  useEffect(() => {
    const fetchOneOrder= async () => {
      try {
        const data = await fetchData(`orders/getConfirmedOrder/${user.user_id}/${order_id}`, 'get', null, {
          Authorization: `Bearer ${token}` 
        });
        setOrder(data); 
        console.log(data);

      } catch (error) {
        console.error('Error al obtener la orden:', error);
      }
    };

    if(token ){
      fetchOneOrder();
    }
  }, [token]);

  return (
    <div>
      <OrderDetail data={order}/>
      
    </div>
  );
};


