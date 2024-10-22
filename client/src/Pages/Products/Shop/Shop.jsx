import React, { useContext, useEffect, useState } from 'react';
import { FormAddProduct } from '../../../components/Modals/FormAddProduct/FormAddProduct';
import { FormAddCategory } from '../../../components/Modals/FormAddCategory/FormAddCategory';
import { Col, Row } from 'react-bootstrap';
import { CardOneCategory } from '../../../components/CardOneCategory/CardOneCategory';
import { AppContext } from '../../../Context/ContextProvider';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { FormRegister } from '../../../components/Modals/FormRegister/FormRegister';
import { ConfirmedRegister } from '../../../components/Modals/ConfirmedRegister.jsx/ConfirmedRegister';
import fetchData from '../../../helpers/axiosHelper';
import { RegisterVerifyModal } from '../../../components/Modals/ConfirmedEmail/RegisterVerifyModal';
import { FormLogin } from '../../../components/Modals/FormLogin/FormLogin';
import { FormForgotPassword } from '../../../components/Modals/FormForgotPassword/FormForgotPassword';
import { FormEditUser } from '../../../components/Modals/FormEditUser/FormEditUser';
import { FormEditPassword } from '../../../components/Modals/FormEditPassword/FormEditPassword';
import "./shop.scss"


export const Shop = ({showRegister,setShowRegister, showLogin, setShowLogin,showEditUser,setShowEditUser, showEditPassword, setShowEditPassword}) => {

  const navigate = useNavigate();

  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [enabled, setEnabled] = useState()
  const [showRegisterVerify, setShowRegisterVerify] = useState(false)
  const [searchParams] = useSearchParams();
  const [verifyStatus, setVerifyStatus] = useState({})
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  
  const tokenURLEmail = searchParams.get('tokenEmail')
  
  
  // Verificación de token para registro
  useEffect(()=>{
    const verifyToken = async ()=>{
      try {
        const response = await fetchData(`users/getUserConfirmed`, 'get', null, { Authorization: `Bearer ${tokenURLEmail}` });
        setEnabled(response);
      } catch (error) {
        console.log(error);
        setVerifyStatus({ message:"token no válido", verified:false });
        setShowRegisterVerify(true);
      }
    }
    if(tokenURLEmail){
      verifyToken();
    }
  }, [tokenURLEmail])
  
  // Actualización de estado del registro
  useEffect(()=>{
    const updateEnabledEstatus = async()=>{
      try {
        const response = await fetchData(`users/api/verify`, 'put', null, { Authorization: `Bearer ${tokenURLEmail}` });

        setVerifyStatus({ message:"Felicidades, te has registrado", verified:true });

      } catch (error) {
        setVerifyStatus({ message:"Token no válido", verified: false });
        setShowRegisterVerify(true);
      }
    }

      if(enabled === 1){
        navigate("/shop");
        updateEnabledEstatus();
        setShowRegisterVerify(true);
        setEnabled(2);
      } else if(enabled === 2){
        navigate("/shop");
        setShowRegisterVerify(true);
        setVerifyStatus({ message:"Ya estas registrado", verified: true });
      }

  }, [enabled, tokenURLEmail])

  const closeAddProduct = () => setShowProductModal(false);
  const closeAddCategory = () => setShowCategoryModal(false);

  const [showResendEmail, setShowResendEmail] = useState(false)
  const handleModal = ()=>{
    setShowRegisterVerify(false)
    setShowResendEmail(true);
  }

  const closeResendEmail = ()=>{
    setShowResendEmail(false);
  }

  return (
    <div className='container-xxl'>  
        
      <Outlet/>

      {/* Modals */}
      <FormAddProduct show={showProductModal} handleClose={closeAddProduct} />
      <FormAddCategory show={showCategoryModal} handleClose={closeAddCategory} />
      <FormRegister 
        showRegister={showRegister} 
        setShowRegister={setShowRegister}
        setShowConfirmed={setShowConfirmed}
        setShowLogin={setShowLogin}
      />
      <ConfirmedRegister
        showConfirmed={showConfirmed}
        setShowConfirmed={setShowConfirmed}
      />
      <RegisterVerifyModal
        setShowRegisterVerify={setShowRegisterVerify}
        showRegisterVerify={showRegisterVerify}
        verifyStatus={verifyStatus}
        setShowLogin={setShowLogin}
        handleModal={handleModal}
        showResendEmail={showResendEmail}
        closeResendEmail={closeResendEmail}
        enabled={enabled}
      />
      <FormLogin
        setShowLogin={setShowLogin}
        showLogin={showLogin}
        setShowRegister={setShowRegister}
        setShowForgotPassword={setShowForgotPassword}
      />
      <FormForgotPassword
        setShowForgotPassword={setShowForgotPassword} 
        showForgotPassword={showForgotPassword}
      />
      <FormEditUser 
      showEditUser={showEditUser} 
      setShowEditUser={setShowEditUser}/>

      <FormEditPassword
      showEditPassword={showEditPassword}
      setShowEditPassword={setShowEditPassword}/>
        
    </div>

  );
};
