import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import fetchData from '../../../helpers/axiosHelper';
import { AppContext } from '../../../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  email: "",
  password: ""
}

export const FormLogin = ({ showLogin, setShowLogin, setShowRegister, setShowForgotPassword }) => {

  const [login, setLogin] = useState(initialValue);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({ email: false, password: false });

  const { setUser, setToken, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
    setError(""); // Limpiar error cuando se cambia el valor del input
    setFieldError({ ...fieldError, [name]: false }); // Limpiar error específico del campo
  }

  useEffect(() => {
    if (showLogin) {
      setError("");
      setFieldError({ email: false, password: false });
    }
  }, [showLogin]);

  const onSubmit = async () => {
    // Validar que los campos no estén vacíos
    if (!login.email || !login.password) {
      setFieldError({
        email: !login.email,
        password: !login.password
      });
      setError("El correo electrónico y la contraseña son obligatorios.");
      return;
    }

    try {
      const resToken = await fetchData("users/login", "post", login);
      localStorage.setItem("token", resToken);
      const res = await fetchData("users/getOneUser", "get", null, { Authorization: `Bearer ${resToken}` });

      setToken(resToken);
      setUser(res.user);
      setShowLogin(false);
      setIsAuthenticated(true);
      setLogin(initialValue);

      if (res.user.type === 1) {
        navigate("/shop");
      } else if (res.user.type === 2) {
        navigate("/AdminDashboard");
      } else {
        console.log("El usuario no tiene tipo o no está definido.");
      }
    } catch (error) {
      console.log(error);

      if (error.status === 406) {
        setError("Debes verificar tu correo antes de iniciar sesión.");
      } else {
        setError("El correo electrónico o la contraseña son incorrectos.");
      }
    }
  }

  const openForgotPasswordModal = () => {
    setShowForgotPassword(true);
    setShowLogin(false);
  };

  const closeLogin = () => {
    setLogin(initialValue);
    setShowLogin(false);
    setError("");
    setFieldError({ email: false, password: false });
  }

  const navigateRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
    setLogin(initialValue);
  }

  return (
    <>
      <Modal show={showLogin} onHide={closeLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={login.email}
                onChange={handleChange}
                isInvalid={fieldError.email || !!error} // Mostrar error si hay problema en el campo o un error general
              />
              <Form.Control.Feedback type="invalid">
                {fieldError.email ? "El correo electrónico es obligatorio." : error}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                isInvalid={fieldError.password || !!error} // Mostrar error si hay problema en el campo o un error general
              />
              <Form.Control.Feedback type="invalid">
                {fieldError.password ? "La contraseña es obligatoria." : error}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button variant="secondary" onClick={closeLogin}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
        <div className='text-center'>
          <p>¿No estás registrado? <span onClick={navigateRegister} style={{ cursor: 'pointer', color: 'blue' }}>Regístrate aquí</span> </p>
          <p>He olvidado la contraseña <span onClick={openForgotPasswordModal} style={{ cursor: 'pointer', color: 'blue' }}>Haz clic aquí</span> </p>
        </div>
      </Modal>
    </>
  );
}
