import express from 'express'
import productsControllers from '../controllers/productsControllers.js';
import uploadImage from '../middlewares/multerMulti.js';
import { tokenVerify } from './../middlewares/tokenVerify.js';
import uploadImageCat from '../middlewares/multer.js';

const router = express.Router();

router.post("/addProducts", tokenVerify, uploadImage("products"), productsControllers.addProducts)
router.get("/getAllCategories", productsControllers.getAllCategories)
router.post('/addCategories', uploadImageCat('categories'), productsControllers.addCategories);
router.get("/getAllProducts", productsControllers.getAllProducts)
router.post("/searchProducts", productsControllers.searchProducts)
router.get('/getOneProduct/:id', productsControllers.getOneProduct);
router.get('/getRandomProducts', productsControllers.getRandomProducts);
router.get('/newest', productsControllers.getNewestProducts);
router.put('/delProductImage', productsControllers.delProductImage);
router.post('/addFilesToProduct', uploadImage('products'), productsControllers.addFilesToProduct);




export default router;