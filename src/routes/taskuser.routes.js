import { Router } from "express";
import { authJwt } from '../middlewares';

const router = Router();

//export default router;
import * as taskUserCtrl from '../controllers/taskuser.controller';



//Obtener tareas de usuario
router.get('/user/:userID', taskUserCtrl.getTasksByUserId);

//Obtener tareas del usuario por status
router.get('/:userID/:status', taskUserCtrl.getTaskUserByStatus); 

//Actualizar el estado y descripción de la tarea asignada al usuario
router.put('/:TaskUserID', [authJwt.verifyToken, authJwt.isOperatorOrAdmin], taskUserCtrl.updateTaskUserById); 

export default router; 
