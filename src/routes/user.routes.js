import { Router } from "express";
import * as userCtrl from '../controllers/user.controller';

const router = Router();

router.get('/:userID', userCtrl.getUserById);
router.put('/:')