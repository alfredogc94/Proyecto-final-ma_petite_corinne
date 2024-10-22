import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ResetPasswordModal from '../ResetPasswordModal/ResetPasswordModal';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(true);  // Para controlar el modal
  const [error, setError] = useState(false); // Para manejar errores de token
  
  const navigate = useNavigate();

  const tokenURLResPassword = searchParams.get('tokenResPassword')

  const handleClose = () => {
    setShowModal(false);
    navigate('/');  // Redirigir a home al cerrar el modal
  };

  useEffect(() => {
    if (!tokenURLResPassword) {
      // Si no hay token, mostrar error y redirigir
      setError(true);
      navigate('/');
    }
  }, [tokenURLResPassword, navigate]);

  return (
    <>
      {error ? (
        <p>Token inválido o inexistente. Redirigiendo...</p>
      ) : (
        <ResetPasswordModal show={showModal} handleClose={handleClose} token={tokenURLResPassword} />
        
      )}
    </>
  );
};


