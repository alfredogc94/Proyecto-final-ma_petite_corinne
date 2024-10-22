import express from 'express';
import usersController from '../controllers/usersController.js';
import { tokenVerify } from '../middlewares/tokenVerify.js';
import { loginValidator } from '../middlewares/loginValidator.js';
import { registerValidator} from './../middlewares/registerValidator.js';
import { editUserValidator } from '../middlewares/editUserValidator.js';
import { editPasswordValidator } from '../middlewares/editPasswordValidator.js';

const router = express.Router();

router.post('/createUser', registerValidator, usersController.createUser);

router.put('/api/verify', tokenVerify, usersController.verifyUser);

router.get('/getUserConfirmed', tokenVerify, usersController.getUserConfirmed);

router.get('/api/verifyEmail', usersController.verifyEmail);

router.get('/formEditUser',tokenVerify, usersController.formEditUser);

router.post('/editUser',tokenVerify, editUserValidator, usersController.editUser);

router.post('/formEditPassword',tokenVerify, usersController.formEditPassword);

router.post('/editPassword',tokenVerify, editPasswordValidator, usersController.editPassword);

router.get('/getOneUser', tokenVerify, usersController.getOneUser);

router.post('/login', loginValidator, usersController.login);

router.post("/forgotPassword", usersController.forgotPassword);

router.post("/resetPassword", usersController.resetPassword);

router.get('/getAllUsers', usersController.getAllUsers);

export default router;

