import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import fetchData from "../../../helpers/axiosHelper";
import { AppContext } from "../../../Context/ContextProvider";
import { validateEditPassword } from "../../../helpers/validateEditPassword";



export const FormEditPassword = ({setShowEditPassword, showEditPassword}) => {
  const [password, setPassword] = useState({})
  const [errors, setErrors] = useState({});
  const {token} = useContext(AppContext);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Reinicia el error al cambiar el input
  };

  const closeEditPassword = () =>{
    setShowEditPassword(false)
    setErrors({});
  }
  // const openEditPassword = () =>{
  //   setShowEditPassword(true)
  // }


 
  const onSubmit = async () => {
    const validationErrors = validateEditPassword(password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Establece errores específicos
      return;
    }

    try {
      const res = await fetchData('users/formEditPassword', 'post', password, {
        Authorization: `Bearer ${token}`
      });


      const res2 = await fetchData("users/editPassword", "post", password, {Authorization: `Bearer ${token}`});

      closeEditPassword();

    } catch (err) {
      console.log(err.response.data)
      if (err.response.data) {
        let path1="";
        let path2="";
        if(Array.isArray(err.response.data.errors)){
          err.response.data.errors.forEach((item)=>{
            if(item.path === "password2"){
              
              path1 += item.msg + "\n";
            }
            if(item.path === "password3"){
              path2 += item.msg + "\n";
            }
          })
          
          setErrors((prevErrors) => ({
            ...prevErrors,
            ...(path1 && { password2: path1 }),
            ...(path2 && { password3: path2 }),
          }));

        }else{
          setErrors({msg : err.response.data});
        }
      } else {
        setErrors({ msg: "Error al Guardar la contraseña"});
      }
    }
  };

 /*  useEffect(()=>{
    const fetchUserData = async () => {
      try {
        const res = await fetchData('users/formEditPassword', 'post', password, {
          Authorization: `Bearer ${token}`
        });
        
        
      } catch (err) {
        //setErrors({ msg: "Contraseña incorrecta" });
      }
    };

    // Llamar a la función asíncrona
    fetchUserData();
  },[token,password.password]) */

  return (
    <>
      
      <Modal show={showEditPassword} onHide={closeEditPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña antigua</Form.Label>
              <Form.Control
                type="password"
                name="password"
                /* value={register?.name} */
                onChange={handleChange}
                isInvalid={!!errors.password} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.password} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña nueva</Form.Label>
              <Form.Control
                type="password"
                name="password2"
                /* value={register?.name} */
                onChange={handleChange}
                isInvalid={!!errors.password2} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.password2} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Repita la contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password3"
                /* value={register?.name} */
                onChange={handleChange}
                isInvalid={!!errors.password3} // Muestra el estado de error
              />
              <Form.Control.Feedback type="invalid">
                {errors.password3} {/* Muestra el mensaje de error */}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>

          {errors.msg && (
            <div className="alert alert-danger">
              <p>{errors.msg}</p>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className='justify-content-center'>
          <Button variant="secondary" onClick={closeEditPassword}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Guardar
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
};
