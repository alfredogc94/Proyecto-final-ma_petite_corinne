import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .isEmail().withMessage("Debes ingresar un correo electrónico válido."),
    
  body("password").notEmpty().withMessage("La contraseña es obligatoria."),
];
