import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import fetchData from '../../../helpers/axiosHelper';


export const RegisterVerifyModal = ({showResendEmail, closeResendEmail, handleModal, showRegisterVerify, setShowRegisterVerify, verifyStatus, setShowLogin, enabled}) => {

  const [msgResend, setMsgResend] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(''); 
  

  const navigateLogin = () =>{
    setShowLogin(true)
    setShowRegisterVerify(false)
  }

  const handleChange = (e) => {
    setEmail(e.target.value);

  }
 
  const onSubmit = async() =>{
    try {
      if(token){
        const res = await fetchData (`users/api/verifyEmail?emailq=${email}`, "get", null ,{Authorization: `Bearer ${token}` })
        closeResendEmail();
      }else{
        const res2 = await fetchData (`users/api/verifyEmail?emailq=${email}`, "get", null)
        closeResendEmail();
      }
    } catch (err) {
      setMsgResend(err.response?.data)

    } 
  }

  
  return (
      <>
    <Modal show={showRegisterVerify} onHide={()=>setShowRegisterVerify()}>
      <Modal.Header closeButton>
        <Modal.Title><h1 className='text-center'>{verifyStatus.message}</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
      {(verifyStatus.verified && enabled===1) && <img className='d-block mx-auto' src="/confirmedEmail.jpg" style={{width:'70%'}} alt="Email confirmado" />}
      {(verifyStatus.verified && enabled===2) && <img className='d-block mx-auto' src="/resend.svg" style={{width:'70%'}} alt="Email ya ha sido confirmado" />}
      {!verifyStatus.verified && <img className='d-block mx-auto' src="/error-reg.svg" style={{width:'70%'}} alt="Error de confirmacion" />}
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        {verifyStatus.verified && <Button variant="secondary" onClick={navigateLogin}>
          Ir a login
        </Button>}
        {!verifyStatus.verified && <Button onClick={handleModal}>Reenviar correo de verificación</Button>}
      </Modal.Footer>
    </Modal>

    <Modal show={showResendEmail} onHide={closeResendEmail}>
      <Modal.Header closeButton>
        <Modal.Title><h1 className='text-center'>Reenvio de correo de verificación</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
      <input type="email" placeholder='email' name='email' value={email} onChange={handleChange}/>
      <p style={{color:'red'}}>{msgResend}</p>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant="secondary" onClick={onSubmit}>
          Reenviar
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
