export const validateLoginForm = (formData) => {
  const errors = {};

  if (!formData.email) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Debe ser un correo electrónico válido.";
  }

  if (!formData.password) {
    errors.password = "La contraseña es obligatoria.";
  }

  return errors;
};