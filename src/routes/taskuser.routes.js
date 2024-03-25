import { Router } from "express";
import { authJwt } from '../middlewares';

const router = Router();

//export default router;
import * as taskUserCtrl from '../controllers/taskuser.controller';


router.get('/:userID',taskUserCtrl.getTasksByUserId ); //Obtener tareas de usuario
router.get('/:userID/:status', taskUserCtrl.getTaskUserByStatus); //Obtener tareas del usuario por status


router.put('/:TaskUserID',taskUserCtrl.updateTaskUserById);

export default router;
