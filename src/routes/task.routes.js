import { Router } from "express";
import { authJwt } from '../middlewares';

const router = Router();

//export default router;
import * as taskCtrl from '../controllers/task.controller';

//Establecer las rutas de las tareas
router.get('/', taskCtrl.getTask);
router.post('/',  taskCtrl.createTask);
//Rutas para el lider y admin
router.get('/:taskId', taskCtrl.getTaskById);
router.put('/:taskId', taskCtrl.updateTaskById);
//Unicamente el admin elimina
router.delete('/:taskId', taskCtrl.deleteTaskById);

export default router;