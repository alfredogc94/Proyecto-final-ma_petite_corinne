import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export const ConfirmedRegister = ({showConfirmed, setShowConfirmed}) => {

  

 
 

  return (
    <>
    <Modal show={showConfirmed} onHide={()=>setShowConfirmed(false)}>
      <Modal.Header closeButton>
        <Modal.Title><h1 className='text-center'>Te has registrado correctamente</h1></Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        <img src="/confirmedRegister.jpg" alt="registro confirmado" />
        <p className='text-center'>Le hemos enviado un correo electrónico con el enlace para verificar su cuenta</p>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
        <Button variant="secondary" onClick={()=>setShowConfirmed(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
