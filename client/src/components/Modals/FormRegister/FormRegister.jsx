import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import fetchData from "../../../helpers/axiosHelper";
import { validateRegisterForm } from "../../../helpers/validateRegisterForm";

const InitialValue = {

  name:"",
  last_name:"",
  email:"",
  phone:"",
  address:"",
  country:"",
  province:"",
  city:"",
  zip_code:"",
  password:"",
  subscription:false
}
export const FormRegister = ({setShowLogin, showRegister, setShowRegister, openLogin, setShowConfirmed}) => {
  const [register, setRegister] = useState(InitialValue)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const closeRegister =() =>{
    setRegister(InitialValue);
    setShowRegister(false);
    setErrors("")
  }
  const navigateLogin = () =>{
    setShowRegister(false);
    setShowLogin(true)
    setRegister(InitialValue)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Reinicia el error al cambiar el input
  };

  const handleSubscription = (e) => {
    setRegister({ ...register, subscription: e.target.checked });
  };  

  const onSubmit = async () => {
    const validationErrors = validateRegisterForm(register);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Establece errores específicos
      return;
    }

    try {
      const res = await fetchData("users/createUser", "post", register);

      setShowRegister(false);
      //openConfirmed();
      setShowConfirmed(true)

    } catch (err) {
      
      if (err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response.data) {
        setErrors({ msg: err.response.data });
      } else {
        setErrors({ msg: "Error al registrar el usuario" });
      }
    }
  };

  return (
    <>
      

      <Modal show={showRegister} onHide={closeRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={register.name}
                onChange={handleChange}
                isInvalid={!!errors.name} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.name} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={register.last_name}
                onChange={handleChange}
                isInvalid={!!errors.last_name} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.last_name} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={register.email}
                onChange={handleChange}
                isInvalid={!!errors.email} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.email} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={register.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={register.address}
                onChange={handleChange}
                isInvalid={!!errors.address} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.address} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={register.country}
                onChange={handleChange}
                isInvalid={!!errors.country} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.country} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                name="province"
                value={register.province}
                onChange={handleChange}
                isInvalid={!!errors.province} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.province} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={register.city}
                onChange={handleChange}
                isInvalid={!!errors.city} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.city} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                name="zip_code"
                value={register.zip_code}
                onChange={handleChange}
                isInvalid={!!errors.zip_code} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.zip_code} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={register.password}
                onChange={handleChange}
                isInvalid={!!errors.password} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.password} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Sí, quiero recibir actualizaciones y promociones."
                name="subscription"
                checked={register.subscription}
                onChange={handleSubscription}
              />
            </Form.Group>
          </Form>

          {errors.msg && (
            <div className="alert alert-danger">
              <p>{errors.msg}</p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className='justify-content-center'>
          <Button variant="secondary" onClick={closeRegister}>

            Cerrar
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Enviar
          </Button>
        </Modal.Footer>

        <div className='text-center'>
          <p>¿Ya estás registrado? <span onClick={navigateLogin} style={{ cursor: 'pointer', color: 'blue' }}>Inicia sesión aquí</span></p>
        </div>
      </Modal>
    </>
  );
};
