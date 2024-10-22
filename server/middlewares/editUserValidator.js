import { body } from 'express-validator';

export const editUserValidator = [
  body('name')
  .notEmpty().withMessage('El nombre es obligatorio.')
  .isLength({ max: 50 }).withMessage('El nombre no puede superar los 50 caracteres.'),

body('last_name')
  .notEmpty().withMessage('Los apellidos son obligatorios.')
  .isLength({ max: 100 }).withMessage('Los apellidos no pueden superar los 100 caracteres.'),

body('phone')
  .notEmpty().withMessage('El teléfono es obligatorio.')
  .isLength({ max: 30 }).withMessage('El teléfono no puede superar los 30 caracteres.'),

body('address')
  .notEmpty().withMessage('La dirección es obligatoria.')
  .isLength({ max: 150 }).withMessage('La dirección no puede superar los 150 caracteres.'),

body('country')
  .notEmpty().withMessage('El país es obligatorio.')
  .isLength({ max: 100 }).withMessage('El país no puede superar los 100 caracteres.'),

body('province')
  .notEmpty().withMessage('La provincia es obligatoria.')
  .isLength({ max: 100 }).withMessage('La provincia no puede superar los 100 caracteres.'),

body('city')
  .notEmpty().withMessage('La ciudad es obligatoria.')
  .isLength({ max: 100 }).withMessage('La ciudad no puede superar los 100 caracteres.'),

body('zip_code')
  .notEmpty().withMessage('El código postal es obligatorio.')
  .isLength({ max: 20 }).withMessage('El código postal no puede superar los 20 caracteres.'),

body('subscription')
  .isBoolean().withMessage('El valor de la suscripción debe ser un booleano.')
];