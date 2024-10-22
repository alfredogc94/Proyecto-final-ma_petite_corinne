import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../Pages/Dashboard/Home/Home';
import { NavBarApp } from '../components/NavBarApp/NavBarApp';
import { FooterApp } from '../components/FooterApp/FooterApp';
import { FormAddProduct } from '../components/Modals/FormAddProduct/FormAddProduct';
import { AllProducts } from './../Pages/Products/AllProducts/AllProducts';
import { ResetPasswordPage } from '../components/Modals/ResetPasswordPage/ResetPasswordPage';
import { UsersRegisterVerify } from '../Pages/Users/UsersRegisterVerify';
import { OneProduct } from '../Pages/Products/OneProduct/OneProduct';
import { OrderHistory } from './../Pages/Products/Orders/OrderHistory/OrderHistory';
import { OneOrderHistory } from '../Pages/Products/Orders/OneOrderHistory/OneOrderHistory';
import { CartDashboard } from '../Pages/Cart/CartDashboard/CartDashboard';
import { Shop } from './../Pages/Products/Shop/Shop';
import {ShowCategories } from '../Pages/ShowCategories/ShowCategories';
import { AdminUsers } from './../Pages/Admin/AdminUsers/AdminUsers';
import { ConfirmationOrderDetails } from '../Pages/Products/Orders/ConfirmationOrderDetails/ConfirmationOrderDetails';
import { AdminOrders } from '../Pages/Admin/AdminOrders/AdminOrders';
import { AdminCategories } from '../Pages/Admin/AdminCategories/AdminCategories';
import { AdminDashboard } from '../Pages/Admin/AdminDashboard/AdminDashboard';
import { AdminProducts } from '../Pages/Admin/AdminProducts/AdminProducts';

import '../components/FooterApp/footerApp.scss';


export const AppRoutes = () => {

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const toggleCart = () => {
    setShowCart(!showCart);
  };
 
  
  return (
    <div id='root'>
      <BrowserRouter >
        <main>
          <NavBarApp
            setShowRegister={setShowRegister}
            setShowLogin={setShowLogin}
            toggleCart={toggleCart}
            showCart={showCart}
            setShowCart={setShowCart}
            setShowEditUser={setShowEditUser}         // Pasar la prop
            setShowEditPassword={setShowEditPassword}
            showEditPassword={showEditPassword}
          />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route path='/shop' element={<Shop
                                          showRegister={showRegister}
                                          setShowRegister={setShowRegister}
                                          setShowLogin={setShowLogin}
                                          showLogin={showLogin}
                                          showCart={showCart}
                                          showEditUser={showEditUser}
                                          setShowEditUser={setShowEditUser}
                                          setShowEditPassword={setShowEditPassword}
                                          showEditPassword={showEditPassword}
                                          />}>
                <Route index element={<ShowCategories/>}/>
                <Route path='cart' element={<CartDashboard />} />
                <Route path='allProducts' element={<AllProducts />} />
                <Route path='OneProduct/:id' element={<OneProduct />} />
                <Route path='order/:user_id/:order_id' element={<ConfirmationOrderDetails />} />
                <Route path='orderHistory' element={<OrderHistory/>}/>
                <Route path='oneOrderHistory/:order_id' element={<OneOrderHistory/>}/>
            </Route>
            <Route path='/AdminDashboard' element={<AdminDashboard />} />
            <Route path='/AdminOrders' element={<AdminOrders />} />
            <Route path='/adminUsers' element={<AdminUsers />} />
            <Route path='/AdminCategories' element={<AdminCategories />} />
            <Route path='/usersRegisterVerify' element={<UsersRegisterVerify />} />
            <Route path='/AdminProducts' element={<AdminProducts />} />
          </Routes>
        </main>
        <FooterApp />
      </BrowserRouter>
    </div>
  );
};
