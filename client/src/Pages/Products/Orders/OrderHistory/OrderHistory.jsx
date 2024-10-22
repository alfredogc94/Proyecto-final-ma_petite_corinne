import React, { useContext, useEffect, useState } from 'react'
import fetchData from '../../../../helpers/axiosHelper';
import { AppContext } from '../../../../Context/ContextProvider';
import { Col, Row } from 'react-bootstrap';
import { CardOneOrderHistory } from "../../../../components/CardOneOrderHistory/CardOneOrderHistory";
import './orderHistory.scss'

export const OrderHistory = () => {
  
  const [ordersHistory, setOrdersHistory] = useState([]);
  const { token, products } = useContext(AppContext);
  console.log(products);
  

  useEffect(() => {
    
    const fetchOrderHistory = async () => {
     
      try {
        const res = await fetchData('orders/orderHistory', 'get', null, {
          Authorization: `Bearer ${token}`
        });

        const groupedOrders = res.reduce((acc, order) => {
          if (!acc[order.order_id]) {
            acc[order.order_id] = {
              order_id: order.order_id,
              items: [],
              ...order, 
            };
          }
          acc[order.order_id].items.push(order); 
          return acc;
        }, {});
        
        setOrdersHistory(Object.values(groupedOrders));
  
      } catch (err) {
        console.error("Error fetching order history", err);  
      }
    };

    if(token){
    fetchOrderHistory();
    }
   
  }, [token])



  return (
    <div className='ppal-mis-pedidos'>
      <h2 style={{marginBottom:'2rem'}}>Mis pedidos</h2>
      {ordersHistory.length === 0 && <p>De momento no tiene ningún pedido realizado</p>}
      <Row>
        <Col>
          <div className="d-flex flex-column align-items-center gap-5">
            {ordersHistory?.map((order) => (
              <CardOneOrderHistory key={order.order_id} order={order}/>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}
