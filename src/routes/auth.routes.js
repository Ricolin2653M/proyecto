import { Router } from "express";
import { authJwt } from '../middlewares';
const router = Router();

import * as authCtrl from "../controllers/auth.controller";

router.post('/signup',[authJwt.verifyToken, authJwt.isLider], authCtrl.signUp)

router.post('/signin', authCtrl.SignIn)

export default router;