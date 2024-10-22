import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import fetchData from "../../../helpers/axiosHelper";
import { AppContext } from "../../../Context/ContextProvider";
import { validateEditUserForm } from "../../../helpers/validateEditUserForm";

const initialValue = ({
  
})
export const FormEditUser = ({setShowEditUser, showEditUser}) => {
  const [register, setRegister] = useState({})
  const [register2, setRegister2] = useState({})
  const [errors, setErrors] = useState({});
  const {setUser, user, token} = useContext(AppContext);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Reinicia el error al cambiar el input
  };

  const handleSubscription = (e) => {
    setRegister({ ...register, subscription: e.target.checked });
  };

  //
  const closeEditUser = () =>{
    setShowEditUser(false)
    setErrors({});
  }
  // const openEditUser = () =>{
  //   closeLogin()
  //   setShowEditUser(true)
  // }


  const onSubmit = async () => {
    const validationErrors = validateEditUserForm(register);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Establece errores específicos
      return;
    }

    try {
      const res = await fetchData("users/editUser", "post", register, {Authorization: `Bearer ${token}`});
      setUser({...user, name:res.user})

      closeEditUser(false);

    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ msg: "Error al registrar el usuario" });
      }
    }
  };

  const onReset = ()=>{
    setRegister(register2)
  }

  useEffect(()=>{
    const fetchUserData = async () => {
      if(showEditUser){
        try {
          const res = await fetchData('users/formEditUser', 'get', null, {
            Authorization: `Bearer ${token}`
          });
          setRegister(res.user); // Guardar los datos en el estado
          setRegister2(res.user);
        } catch (err) {
          console.error('Error fetching data', err);
        }
      }
    };

    // Llamar a la función asíncrona
    fetchUserData();
  },[token,showEditUser])

  return (
    <>
      

      <Modal show={showEditUser} onHide={closeEditUser}>
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Edición</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={register.name?register.name:""}
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
                value={register.last_name?register.last_name:""}
                onChange={handleChange}
                isInvalid={!!errors.last_name} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.last_name} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={register.phone?register.phone:""}
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
                value={register.address?register.address:""}
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
                value={register.country?register.country:""}
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
                value={register.province?register.province:""}
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
                value={register.city?register.city:""}
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
                value={register.zip_code?register.zip_code:""}
                onChange={handleChange}
                isInvalid={!!errors.zip_code} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.zip_code} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Sí, quiero recibir actualizaciones y promociones."
                name="subscription"
                checked={register.subscription?register.subscription:""}
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
          <Button variant="secondary" onClick={closeEditUser}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Guardar
          </Button>
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};
