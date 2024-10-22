import express from 'express'
import ordersControllers from '../controllers/ordersControllers.js';
import { tokenVerify } from '../middlewares/tokenVerify.js';

const router = express.Router();

router.get('/orderHistory', tokenVerify,  ordersControllers.getAllOrders)

router.get('/getOneOrder/:id', tokenVerify, ordersControllers.getOneOrder)

router.post("/saveOrder", tokenVerify,ordersControllers.saveOrder)

router.get("/getConfirmedOrder/:user_id/:order_id", tokenVerify,ordersControllers.getConfirmedOrder)

export default router;