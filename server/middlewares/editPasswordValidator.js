import { body } from 'express-validator';

export const editPasswordValidator = [
 
  body('password2')
  .notEmpty().withMessage('La contraseña es obligatoria.')
  .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
  .matches(/\d/).withMessage('La contraseña debe contener al menos un número.')
  .matches(/[a-zA-Z]/).withMessage('La contraseña debe contener al menos una letra.'),

  body('password3')
  .notEmpty().withMessage('La contraseña es obligatoria.')
  .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
  .matches(/\d/).withMessage('La contraseña debe contener al menos un número.')
  .matches(/[a-zA-Z]/).withMessage('La contraseña debe contener al menos una letra.'),
];