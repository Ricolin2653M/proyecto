import { Router } from "express";
import { authJwt } from '../middlewares';

const router = Router();

//export default router;
import * as taskUserCtrl from '../controllers/taskuser.controller';


router.get('/:userID', taskUserCtrl.getTaskUser);
router.get('/:userID/:status', taskUserCtrl.getTaskUserByStatus);

router.put('/:TaskUserID',taskUserCtrl.updateTaskUserById);

export default router;
