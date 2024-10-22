export const validateEditPassword = (formData) => {
  const errors = {};

  if (!formData.password && !formData.password2 && !formData.password3) {
    errors.password = "La contraseña es obligatoria.";
  } else if (formData.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  } else if (!/\d/.test(formData.password)) {
    errors.password = "La contraseña debe contener al menos un número.";
  } else if (!/[a-zA-Z]/.test(formData.password)) {
    errors.password = "La contraseña debe contener al menos una letra.";
  }

  return errors;
};