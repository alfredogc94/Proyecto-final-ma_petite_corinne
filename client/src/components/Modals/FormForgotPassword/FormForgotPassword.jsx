import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import fetchData from '../../../helpers/axiosHelper';

export const FormForgotPassword = ({ showForgotPassword, setShowForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false); 
  

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setEmail('');
    setError('');
    setEmailSent(false); 
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const OnSubmit = async () => {
    if (!email) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      await fetchData("users/forgotPassword", "post", { email });
      setEmailSent(true);
    } catch (error) {
      setError("Hubo un problema al enviar el correo de restablecimiento.");
      console.error(error);
    }
  };

  return (
    <Modal show={showForgotPassword} onHide={closeForgotPassword}>
      <Modal.Header closeButton>
        <Modal.Title>Restablecer contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {emailSent ? (
          <p className="text-success">El correo de restablecimiento ha sido enviado a tu email.</p>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ingresa tu correo electrónico</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                isInvalid={!!error}
              />
              {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!emailSent ? (
          <>
            <Button variant="secondary" onClick={closeForgotPassword}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={OnSubmit}>
              Enviar correo
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={closeForgotPassword

          }>
            Cerrar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
