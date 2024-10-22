import express from 'express';
import adminControllers from '../controllers/adminControllers.js';
import multer from '../middlewares/multer.js'
import multerMulti from '../middlewares/multerMulti.js'


const router = express.Router();
router.get('/', adminControllers.admin);
router.put('/editCategory', multer('categories'), adminControllers.editCategory);
router.put('/editProduct', multerMulti('products'), adminControllers.editProduct);
router.put('/delProduct/:product_id', adminControllers.delProduct);
router.put('/delCategory/:category_id', adminControllers.delCategory);
router.get('/getAllOrders', adminControllers.getAllOrders);
router.put('/updateOrderStatus', adminControllers.updateOrderStatus)


export default router;
