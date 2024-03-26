import { Router } from "express";
import { authJwt } from '../middlewares';

const router = Router();

//export default router;
import * as taskUserCtrl from '../controllers/taskuser.controller';


router.get('/user/:userID', taskUserCtrl.getTasksByUserId); //Obtener tareas de usuario
router.get('/:userID/:status', taskUserCtrl.getTaskUserByStatus); //Obtener tareas del usuario por status

router.put('/:TaskUserID', [authJwt.verifyToken, authJwt.isOperatorOrAdmin], taskUserCtrl.updateTaskUserById); //Actualizar el estado y descripción de la tarea asignada al usuario

export default router;
