import { Router } from "express";
const router = Router();

//export default router;
import * as productsCtrl from '../controllers/products.controller';
import { verifyToken } from "../middlewares";

//Establecer la ruta de los productos mediante el método GET
router.get('/', productsCtrl.getProducts);
router.post('/',verifyToken, productsCtrl.createProduct);
router.get('/:productId', productsCtrl.getProductById);
router.put('/:productId',verifyToken, productsCtrl.updateProductById);
router.delete('/:productId',verifyToken, productsCtrl.deleteProductById);

export default router;