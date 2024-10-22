import React, { useContext, useEffect, useState } from 'react';
import fetchData from '../../../helpers/axiosHelper';
import { AppContext } from '../../../Context/ContextProvider';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './adminOrders.scss';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData('admin/getAllOrders', 'get', null, {
          Authorization: `Bearer ${token}`,
        });
        console.log(res);
        setOrders(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [token]);

  const handleViewOrder = (order_id) => {
    navigate(`/shop/oneOrderHistory/${order_id}`);
  };

  const handleProcessed = async(order_id, user_id, is_process) => {
    try {
      const updateOrder = await fetchData(`admin/updateOrderStatus`, "put",{ order_id, user_id, is_process }, {Authorization: `Bearer ${token}`})
      setOrders((prevOrders) =>
        prevOrders.map((ord) =>
          ord.order_id === order_id ? { ...ord, is_process: !is_process } : ord
        ));
        console.log(`Order ${order_id} marked as processed.`);
    } catch (error) {
      console.error("Error updating order status:", error);
      
    }
    
  };

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-container">
        <div className='mb-3'>
          <h2 className="admin-orders-title">Admin Orders</h2>
          <Button onClick={() => navigate("/adminDashboard")} variant="primary" >
            Panel de control
          </Button>
        </div>


        <ul className="orders-list">
          {orders.map((e, i) => (
            <li className="order-card" key={i}>
              <div className="order-info">
                <p><strong>Fecha:</strong> {e.order_date_time}</p>
                <p><strong>Order ID:</strong> {e.order_number}</p>
                <p><strong>Enviado:</strong> {e.is_process ? 'Enviado' : 'Pendiente'}</p>
              </div>
              <div className="order-actions">
                <Button
                  className="admin-orders-btn admin-orders-btn-approve"
                  onClick={() => handleViewOrder(e.order_id)}
                >
                  Ver Pedido
                </Button>
                <Button
                  className="admin-orders-btn admin-orders-btn-pending"
                  onClick={() => handleProcessed(e.order_id, e.user_id, e.is_process)}
                >
                  {e.is_process ? "Cancelar": "Enviar"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
