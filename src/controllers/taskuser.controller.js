import TaskUser from '../models/TaskUser';

// Función para obtener tareas del usuario por status
export const getTaskUserByStatus = async (req, res) => {
    try {
        const userID = req.params.userID;
        const status = req.params.status;

        // Buscar las tareas del usuario por su ID y estado
        const tasks = await TaskUser.find({ userID: userID, statusTask: status });

        // Responder con las tareas encontradas
        res.status(200).json(tasks);
    } catch (error) {
        // Manejar errores
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ message: "Error al obtener tareas: " + error.message });
    }
}
//FUNCION OBETNER TAREAS POR USUARIO
export const getTasksByUserId = async (req, res) => {
    try {
        const { userID } = req.params; // Obtener el ID 

        // Verificar ID 
        if (!userID) {
            throw new Error("Debe proporcionar un ID de usuario válido.");
        }

        // Buscar las entradas en TaskUser 
        const userTasks = await TaskUser.find({ userID: userID })
            .populate('taskID') // Poblar los datos de la tarea asociada
            .populate('userID'); // Poblar los datos del usuario asociado

        // Verificar 
        if (!userTasks || userTasks.length === 0) {
            return res.status(404).json({ message: "No se encontraron tareas para el usuario especificado." });
        }

        res.status(200).json(userTasks);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas: " + error.message });
    }
}
//editar tareas disponibles del usuario
export const updateTaskUserById = async (req, res) => {
    try {
        const TaskUserID = req.params.TaskUserID; // Obtener el ID de la tarea desde los parámetros de la URL
        const { status, description } = req.body; // Obtener los datos actualizados de la tarea desde el cuerpo de la solicitud

        const updatedTask = await TaskUser.findByIdAndUpdate(
            TaskUserID,
            { status, description },
            { new: true } // Para obtener la tarea actualizada
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        res.status(200).json({ message: "Tarea actualizada" }); // Enviar un mensaje de éxito como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarea por ID: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}

// Función para eliminar una tarea por su ID
/*

export const deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId; // Obtener el ID de la tarea desde los parámetros de la URL

        const deletedTask = await Task.findByIdAndDelete(taskId); // Eliminar la tarea de la base de datos

        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' }); // Enviar un mensaje de error si la tarea no se encuentra
        }

        res.json({ message: 'Tarea eliminada exitosamente' }); // Enviar un mensaje de éxito como respuesta
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarea por ID: " + error.message }); // Enviar un mensaje de error si ocurre algún problema en el servidor
    }
}
*/