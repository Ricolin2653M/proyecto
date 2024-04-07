import { Router } from "express";
import { authJwt } from '../middlewares';

const router = Router();

//export default router;
import * as taskCtrl from '../controllers/task.controller';

//Establecer las rutas de las tareas
router.get('/', taskCtrl.getTask);
router.get('/:taskId', taskCtrl.getTaskById);

//Rutas para el lider y admin
router.post('/', [authJwt.verifyToken, authJwt.isLiderOrAdmin], taskCtrl.createTask);
router.put('/:taskId', [authJwt.verifyToken, authJwt.isLiderOrAdmin], taskCtrl.updateTaskById);

//Rutas para el admin
router.delete('/:taskId', [authJwt.verifyToken, authJwt.isAdmin], taskCtrl.deleteTaskById);

export default router;
