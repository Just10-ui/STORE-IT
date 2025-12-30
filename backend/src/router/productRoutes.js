import { Router } from 'express';
import { parseJson } from '../middleware/middleware.js';
import { viewProducts, findProduct, addProduct, updateProduct, deleteProduct } from '../controller/productController.js';

const productRoutes = Router();

productRoutes.get('/', parseJson, viewProducts);
productRoutes.get('/:productName', parseJson, findProduct);
productRoutes.post('/add', parseJson, addProduct);
productRoutes.put('/:productId', parseJson, updateProduct);
productRoutes.delete('/:productId', parseJson, deleteProduct);

export default productRoutes;