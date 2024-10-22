import React from 'react';
import { useNavigate } from 'react-router-dom';
import './adminDashboard.scss';

export const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <h1 className='text-center'>Panel de Control</h1>
      <div className="button-container">
        <div className="button-row">
          <button className="admin-btn" onClick={() => navigate("/adminUsers")}>Usuarios</button>
          <button className="admin-btn" onClick={() => navigate("/AdminCategories")}>Categorías</button>
        </div>
        <div className="button-row">
          <button className="admin-btn" onClick={() => navigate("/AdminProducts")}>Productos</button>
          <button className="admin-btn" onClick={() => navigate("/AdminOrders")}>Pedidos</button>
        </div>
      </div>
    </div>
  );
};
