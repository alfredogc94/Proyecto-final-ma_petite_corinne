export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = "El nombre es obligatorio.";
  } else if (formData.name.length > 50) {
    errors.name = "El nombre no puede superar los 50 caracteres.";
  }

  if (!formData.last_name) {
    errors.last_name = "Los apellidos son obligatorios.";
  } else if (formData.last_name.length > 100) {
    errors.last_name = "Los apellidos no pueden superar los 100 caracteres.";
  }

  if (!formData.email) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Debe ser un correo electrónico válido.";
  }

  if (!formData.phone) {
    errors.phone = "El teléfono es obligatorio.";
  } else if (!/^\d{9,15}$/.test(formData.phone)) { 
    errors.phone = "El teléfono debe contener entre 9 y 15 dígitos y solo números.";
  } else if (formData.phone.length > 30) {
    errors.phone = "El teléfono no puede superar los 30 caracteres.";
  }

  if (!formData.address) {
    errors.address = "La dirección es obligatoria.";
  } else if (formData.address.length > 150) {
    errors.address = "La dirección no puede superar los 150 caracteres.";
  }

  if (!formData.country) {
    errors.country = "El país es obligatorio.";
  } else if (formData.country.length > 100) {
    errors.country = "El país no puede superar los 100 caracteres.";
  }

  if (!formData.province) {
    errors.province = "La provincia es obligatoria.";
  } else if (formData.province.length > 100) {
    errors.province = "La provincia no puede superar los 100 caracteres.";
  }

  if (!formData.city) {
    errors.city = "La ciudad es obligatoria.";
  } else if (formData.city.length > 100) {
    errors.city = "La ciudad no puede superar los 100 caracteres.";
  }

  if (!formData.zip_code) {
    errors.zip_code = "El código postal es obligatorio.";
  } else if (formData.zip_code.length > 20) {
    errors.zip_code = "El código postal no puede superar los 20 caracteres.";
  }

  if (!formData.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (formData.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  } else if (!/\d/.test(formData.password)) {
    errors.password = "La contraseña debe contener al menos un número.";
  } else if (!/[a-zA-Z]/.test(formData.password)) {
    errors.password = "La contraseña debe contener al menos una letra.";
  }

  if (typeof formData.subscription !== 'boolean') {
    errors.subscription = "La suscripción debe ser un booleano.";
  }

  return errors;
};