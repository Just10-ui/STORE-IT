import { Router } from 'express';
import { parseJson } from '../middleware/middleware.js';
import { viewProducts, findProduct } from '../controller/productController.js';

const productRoutes = Router();

productRoutes.get('/', parseJson, viewProducts);
productRoutes.get('/:productName', parseJson, findProduct);

export default productRoutes;