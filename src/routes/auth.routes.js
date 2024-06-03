import { Router } from "express";
import { authJwt } from '../middlewares';
const router = Router();

import * as authCtrl from "../controllers/auth.controller";

router.post('/signup', authCtrl.signUp)

router.post('/signin', authCtrl.SignIn)

export default router;