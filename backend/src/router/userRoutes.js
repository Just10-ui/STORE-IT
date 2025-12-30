import { Router } from 'express';
import { parseJson } from '../middleware/middleware.js';
import { userSignin, userSignup } from '../controller/usersController.js';

const userRoutes = Router();

userRoutes.post('/signup', parseJson, userSignup);
userRoutes.post('/signin', parseJson, userSignin);

export default userRoutes;