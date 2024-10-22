import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import fetchData from '../../../helpers/axiosHelper';
import { useNavigate } from 'react-router-dom';


const ResetPasswordModal = ({ show, handleClose, token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
  
    try {
      console.log('Token:', token);
      console.log('Password:', password);
  
     
      const res = await fetchData('users/resetPassword', 'post', { password, token });
      
  
      setSuccess('Contraseña restablecida con éxito.');
      setTimeout(handleClose, 2000);
      setTimeout(() => {
        handleClose;
        navigate("/shop")
      }, 2000);
    } catch (error) {
      setError('Hubo un problema al restablecer la contraseña.');
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Restablecer contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success ? (
          <p className="text-success">{success}</p>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                isInvalid={!!error}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
                isInvalid={!!error}
              />
            </Form.Group>
            {error && <div className="text-danger">{error}</div>}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!success && (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Restablecer contraseña
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPasswordModal;
